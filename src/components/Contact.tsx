"use client";

import { useRef, useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import GridContainer from "@/components/GridContainer";
import { siteConfig } from "@/config/site";
import { runBackgroundTask } from "@/lib/schedule";
import { trackEvent } from "@/lib/tracking";

const INSURANCE_OPTIONS = [
  "Salud",
  "Vida",
  "Gastos Finales",
  "Dental",
  "Visión",
  "Medicare",
  "Indemnización",
  "Otro",
] as const;

type InsuranceType = (typeof INSURANCE_OPTIONS)[number];
type FormStatus = "idle" | "loading" | "success" | "error";
type LeadField = "name" | "phone" | "email" | "insuranceType" | "message" | "contact";

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  insuranceType: InsuranceType;
  message: string;
  website: string;
}

interface LeadResponse {
  ok: boolean;
  error?: string;
  field?: LeadField;
}

const DEFAULT_FORM: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  insuranceType: "Salud",
  message: "",
  website: "",
};

const FIELD_HINTS: Record<LeadField, string> = {
  name: "Ingresa tu nombre completo.",
  phone: "Ejemplo: (469) 123-4567.",
  email: "Ejemplo: nombre@correo.com.",
  insuranceType: "Selecciona la cobertura que más te interesa.",
  message: "Puedes añadir contexto adicional (opcional).",
  contact: "Comparte al menos un canal de contacto (teléfono o email).",
};

export default function Contact() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<LeadFormData>(DEFAULT_FORM);
  const [fieldError, setFieldError] = useState<LeadField | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      if (!isMounted) return;

      void (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!isMounted || !sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger);
        const triggers: ScrollTrigger[] = [];
        const ctx = gsap.context(() => {
          const titleTween = gsap.from("[data-contact-title]", {
            scrollTrigger: { trigger: "[data-contact-title]", start: "top 84%" },
            yPercent: 100,
            duration: 1.1,
            ease: "expo.out",
          });
          if (titleTween.scrollTrigger) triggers.push(titleTween.scrollTrigger);

          const panelTween = gsap.from("[data-contact-panel]", {
            scrollTrigger: { trigger: "[data-contact-panel]", start: "top 90%" },
            y: 26,
            opacity: 0,
            duration: 0.7,
            ease: "expo.out",
          });
          if (panelTween.scrollTrigger) triggers.push(panelTween.scrollTrigger);
        }, sectionRef);

        cleanup = () => {
          triggers.forEach((trigger) => trigger.kill());
          ctx.revert();
        };
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  function handleFieldChange<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (fieldError === key || fieldError === "contact") setFieldError(null);
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function validateClient(data: LeadFormData): LeadResponse {
    const name = data.name.trim();
    if (name.length < 2) {
      return { ok: false, error: "El nombre es obligatorio.", field: "name" };
    }

    const phone = data.phone.trim();
    const email = data.email.trim().toLowerCase();
    const hasPhone = phone.length > 0;
    const hasEmail = email.length > 0;

    if (!hasPhone && !hasEmail) {
      return {
        ok: false,
        error: "Para ayudarte, comparte al menos un canal de contacto: teléfono o email.",
        field: "contact",
      };
    }

    if (hasPhone) {
      const normalizedPhone = phone.replace(/[^\d]/g, "");
      if (normalizedPhone.length < 10) {
        return { ok: false, error: "Ingresa un teléfono válido.", field: "phone" };
      }
    }

    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { ok: false, error: "Ingresa un email válido.", field: "email" };
      }
    }

    if (!INSURANCE_OPTIONS.includes(data.insuranceType)) {
      return {
        ok: false,
        error: "Selecciona un tipo de seguro válido.",
        field: "insuranceType",
      };
    }

    const optionalMessage = data.message.trim();
    if (optionalMessage.length > 600) {
      return {
        ok: false,
        error: "El mensaje no debe superar 600 caracteres.",
        field: "message",
      };
    }

    return { ok: true };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateClient(formData);
    if (!validation.ok) {
      setStatus("error");
      setFieldError(validation.field ?? null);
      if (validation.field === "message") setShowMessage(true);
      setMessage(validation.error ?? "Hay campos pendientes por revisar.");
      return;
    }

    setStatus("loading");
    setFieldError(null);
    setMessage("Enviando...");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: pathname || "/",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = (await response.json()) as LeadResponse;
      if (!response.ok || !data.ok) {
        setStatus("error");
        setFieldError(data.field ?? null);
        if (data.field === "message") setShowMessage(true);
        setMessage(data.error ?? "No pudimos enviar tu solicitud. Intenta de nuevo.");
        return;
      }

      trackEvent(
        "lead_submit",
        {
          source: pathname || "/",
          insurance_type: formData.insuranceType,
        },
        {
          dedupeKey: `lead_submit:${pathname || "/"}:${formData.insuranceType}`,
          dedupeWindowMs: 2000,
        }
      );

      setStatus("success");
      setMessage("Gracias. Recibimos tu solicitud y te contactaremos en menos de 24 horas.");
      setFormData(DEFAULT_FORM);
      setShowMessage(false);
    } catch {
      setStatus("error");
      setMessage("Error de red. Verifica tu conexión e intenta nuevamente.");
    }
  }

  function describedBy(field: LeadField) {
    const baseHelp = `lead-${field}-help`;
    const baseError = `lead-${field}-error`;

    if (fieldError === field) {
      return `${baseHelp} ${baseError}`;
    }

    if ((field === "phone" || field === "email") && fieldError === "contact") {
      return `${baseHelp} lead-contact-error`;
    }

    return baseHelp;
  }

  return (
    <div ref={sectionRef}>
      <section id="contacto-section" aria-labelledby="contacto" className="scroll-mt-28 bg-swiss-paper pt-1 md:pt-2">
        <GridContainer as="div" data-testid="contact-section" data-agent-context="lead-capture">
          <span id="asesoria" className="sr-only" aria-hidden />

          <div className="col-span-12 overflow-hidden pt-16 md:col-start-2 md:col-span-10 md:pt-20">
            <h2
              id="contacto"
              data-contact-title
              className="text-display tracking-[-0.055em] text-swiss-black"
            >
              Asesoría{" "}
              <br />
              gratuita.
            </h2>
          </div>

          <div data-contact-panel className="col-span-12 pt-10 pb-12 md:col-start-2 md:col-span-6 md:pt-12">
            <p className="text-body text-swiss-black/80">
              Comparte tus datos y te proponemos una ruta de cobertura clara para tu caso.
            </p>

            <form className="mt-8 grid grid-cols-12 gap-4" onSubmit={handleSubmit} noValidate>
              <div className="hidden" aria-hidden>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => handleFieldChange("website", event.target.value)}
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <label htmlFor="name" className="text-meta text-swiss-gray">
                  Nombre <span className="text-swiss-red">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(event) => handleFieldChange("name", event.target.value)}
                  aria-invalid={fieldError === "name"}
                  aria-describedby={describedBy("name")}
                  className={`form-control mt-2 px-3 py-3 text-body ${
                    fieldError === "name" ? "form-control--error" : ""
                  }`}
                />
                {fieldError === "name" ? (
                  <p id="lead-name-error" className="form-error mt-2 text-meta">
                    {message}
                  </p>
                ) : null}
                <p id="lead-name-help" className="form-help mt-2 text-meta">
                  {FIELD_HINTS.name}
                </p>
              </div>

              <div className="col-span-12">
                <p className="text-meta text-swiss-black font-semibold">
                  Cómo te contactamos <span className="text-swiss-red">*</span>
                </p>
                <p className="mt-1 text-meta text-swiss-gray">
                  Comparte al menos un canal de contacto (teléfono o email).
                </p>
              </div>

              <div className="col-span-12 md:col-span-6">
                <label htmlFor="phone" className="text-meta text-swiss-gray">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(469) 123-4567"
                  value={formData.phone}
                  onChange={(event) => handleFieldChange("phone", event.target.value)}
                  aria-invalid={fieldError === "phone" || fieldError === "contact"}
                  aria-describedby={describedBy("phone")}
                  className={`form-control mt-2 px-3 py-3 text-body ${
                    fieldError === "phone" || fieldError === "contact" ? "form-control--error" : ""
                  }`}
                />
                {fieldError === "phone" ? (
                  <p id="lead-phone-error" className="form-error mt-2 text-meta">
                    {message}
                  </p>
                ) : null}
                <p id="lead-phone-help" className="form-help mt-2 text-meta">
                  {FIELD_HINTS.phone}
                </p>
              </div>

              <div className="col-span-12 md:col-span-6">
                <label htmlFor="email" className="text-meta text-swiss-gray">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="nombre@correo.com"
                  value={formData.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  aria-invalid={fieldError === "email" || fieldError === "contact"}
                  aria-describedby={describedBy("email")}
                  className={`form-control mt-2 px-3 py-3 text-body ${
                    fieldError === "email" || fieldError === "contact" ? "form-control--error" : ""
                  }`}
                />
                {fieldError === "email" ? (
                  <p id="lead-email-error" className="form-error mt-2 text-meta">
                    {message}
                  </p>
                ) : null}
                <p id="lead-email-help" className="form-help mt-2 text-meta">
                  {FIELD_HINTS.email}
                </p>
              </div>

              {fieldError === "contact" ? (
                <div className="col-span-12">
                  <p id="lead-contact-error" className="form-error text-meta">
                    {message}
                  </p>
                </div>
              ) : null}

              <div className="col-span-12 md:col-span-6">
                <label htmlFor="insuranceType" className="text-meta text-swiss-gray">
                  Tipo de seguro
                </label>
                <select
                  id="insuranceType"
                  value={formData.insuranceType}
                  onChange={(event) =>
                    handleFieldChange("insuranceType", event.target.value as InsuranceType)
                  }
                  aria-invalid={fieldError === "insuranceType"}
                  aria-describedby={describedBy("insuranceType")}
                  className={`form-control mt-2 px-3 py-3 text-body ${
                    fieldError === "insuranceType" ? "form-control--error" : ""
                  }`}
                >
                  {INSURANCE_OPTIONS.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[var(--color-bg)] text-[var(--color-fg)]"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                {fieldError === "insuranceType" ? (
                  <p id="lead-insuranceType-error" className="form-error mt-2 text-meta">
                    {message}
                  </p>
                ) : null}
                <p id="lead-insuranceType-help" className="form-help mt-2 text-meta">
                  {FIELD_HINTS.insuranceType}
                </p>
              </div>

              <div className="col-span-12">
                <button
                  type="button"
                  onClick={() => setShowMessage((visible) => !visible)}
                  aria-expanded={showMessage}
                  aria-controls="lead-optional-message"
                  className="tap-target text-meta text-swiss-black/80 hover:text-swiss-red-ink"
                >
                  {showMessage ? "Ocultar mensaje opcional" : "Agregar mensaje opcional"}
                </button>

                {showMessage ? (
                  <div id="lead-optional-message" className="mt-3">
                    <label htmlFor="message" className="text-meta text-swiss-gray">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(event) => handleFieldChange("message", event.target.value)}
                      aria-invalid={fieldError === "message"}
                      aria-describedby={describedBy("message")}
                      className={`form-control mt-2 px-3 py-3 text-body ${
                        fieldError === "message" ? "form-control--error" : ""
                      }`}
                    />
                    {fieldError === "message" ? (
                      <p id="lead-message-error" className="form-error mt-2 text-meta">
                        {message}
                      </p>
                    ) : null}
                    <p id="lead-message-help" className="form-help mt-2 text-meta">
                      {FIELD_HINTS.message}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="col-span-12 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="primary-cta tap-target border px-6 py-3 text-meta disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Enviando..." : "Solicitar asesoría"}
                </button>
                <p className="mt-3 text-meta text-swiss-gray">
                  No spam. No ventas agresivas. Solo claridad.
                </p>
                <p className="mt-1 text-meta text-swiss-gray">
                  Respuesta inicial en menos de 24 horas.
                </p>
                <p
                  role="status"
                  className={`mt-4 min-h-6 text-meta ${status === "error" ? "form-error" : "text-swiss-gray"}`}
                >
                  {status === "idle" ? "" : message}
                </p>
              </div>
            </form>
          </div>

          <div data-contact-panel className="col-span-12 pt-12 pb-28 md:col-start-9 md:col-span-4 md:pb-20">
            <p className="text-meta text-swiss-gray">Canales directos</p>

            <div className="flex flex-col gap-3 pt-6">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
              >
                {siteConfig.contact.email} &rarr;
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
              >
                {siteConfig.contact.phoneDisplay} &rarr;
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
              >
                WhatsApp &rarr;
              </a>
            </div>

            {siteConfig.business.maps.embedUrl ? (
              <div className="pt-8">
                <p className="text-meta text-swiss-gray">Ubicación</p>
                <div className="mt-4 overflow-hidden border border-m3-outline-variant bg-m3-surface-container-low">
                  {showMap ? (
                    <iframe
                      title="Mapa de ubicación de TC Insurance en Texas"
                      src={siteConfig.business.maps.embedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-56 w-full"
                    />
                  ) : (
                    <div className="flex h-56 flex-col items-center justify-center gap-3 px-5 text-center">
                      <p className="text-body text-swiss-gray">
                        Carga el mapa interactivo cuando lo necesites.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="tap-target border border-m3-outline-variant px-4 py-2 text-meta text-swiss-black hover:border-m3-outline-variant-strong hover:text-swiss-red-ink"
                      >
                        Cargar mapa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </GridContainer>
      </section>
    </div>
  );
}
