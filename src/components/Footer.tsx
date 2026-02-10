"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, LEGAL_PATHS, siteConfig } from "@/config/site";

interface NewsletterResponse {
  ok: boolean;
  error?: string;
  field?: "email";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [emailError, setEmailError] = useState(false);

  const socialLinks = [
    {
      label: "Instagram",
      href: siteConfig.social.instagramUrl,
      icon: "IG",
    },
    {
      label: "Facebook",
      href: siteConfig.social.facebookUrl,
      icon: "FB",
    },
    {
      label: "LinkedIn",
      href: siteConfig.social.linkedinUrl,
      icon: "IN",
    },
    {
      label: "WhatsApp",
      href: siteConfig.contact.whatsappHref,
      icon: "WA",
    },
  ].filter(
    (item): item is { label: string; href: string; icon: string } => Boolean(item.href)
  );

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = newsletterEmail.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setEmailError(true);
      setNewsletterStatus("error");
      setNewsletterMessage("Ingresa un correo electrónico válido.");
      return;
    }

    setEmailError(false);
    setNewsletterStatus("loading");
    setNewsletterMessage("Enviando...");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const data = (await response.json()) as NewsletterResponse;
      if (!response.ok || !data.ok) {
        setNewsletterStatus("error");
        setEmailError(data.field === "email");
        setNewsletterMessage(data.error ?? "No se pudo registrar tu suscripción.");
        return;
      }

      setNewsletterStatus("success");
      setNewsletterMessage("Suscripción confirmada. Recibirás novedades pronto.");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Error de red. Intenta nuevamente.");
    }
  }

  return (
    <footer className="border-t border-[var(--color-border-soft)] bg-swiss-paper">
      <GridContainer
        as="div"
        data-testid="footer-section"
        data-agent-context="footer-navigation"
        className="h-full py-14 md:py-16"
      >
        <div className="col-span-12">
          <Link href="/" aria-label={siteConfig.brand.name} className="tap-target inline-flex items-center">
            <Image
              src={siteConfig.brand.logoPath}
              alt="TC Insurance"
              width={siteConfig.brand.logoWidth}
              height={siteConfig.brand.logoHeight}
              sizes="(min-width: 768px) 270px, 214px"
              className="h-[5rem] w-auto object-contain object-center md:h-[5.9rem]"
            />
          </Link>
        </div>

        <div className="col-span-12 min-w-0">
          <p className="footer-watermark" aria-hidden>
            {siteConfig.brand.footerName}
          </p>
        </div>

        <div className="col-span-12 pt-8 md:pt-10">
          <form onSubmit={handleNewsletterSubmit} noValidate className="max-w-2xl">
            <label htmlFor="newsletter-email" className="text-meta text-swiss-gray">
              Newsletter
            </label>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="nombre@correo.com"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  if (emailError) setEmailError(false);
                  if (newsletterStatus !== "idle") {
                    setNewsletterStatus("idle");
                    setNewsletterMessage("");
                  }
                }}
                aria-invalid={emailError}
                aria-describedby="newsletter-status"
                className={`form-control px-3 py-3 text-body ${emailError ? "form-control--error" : ""}`}
              />

              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="primary-cta tap-target border px-6 py-3 text-meta disabled:cursor-not-allowed disabled:opacity-60 sm:border-l-0"
              >
                {newsletterStatus === "loading" ? "Enviando..." : "Suscribirme"}
              </button>
            </div>

            <p
              id="newsletter-status"
              role="status"
              className={`mt-3 min-h-6 text-meta ${newsletterStatus === "error" ? "form-error" : "text-swiss-gray"}`}
            >
              {newsletterMessage || "Recibe guías estratégicas en tu correo."}
            </p>
          </form>
        </div>

        <div className="col-span-12 mt-10 border-t border-[var(--color-border-soft)] pt-10">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-4 md:gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="text-meta text-swiss-gray">Oficina</h3>
              <p className="text-body text-swiss-black/78">{siteConfig.location.full}</p>
              <p className="text-body text-swiss-black/58">{siteConfig.legal.licenseStatement}</p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-meta text-swiss-gray">Navegación</h3>
              <Link
                href={HOME_SECTION_PATHS.services}
                className="tap-target text-body text-swiss-black/82 hover:text-swiss-red-ink"
              >
                Servicios
              </Link>
              <Link
                href={HOME_SECTION_PATHS.about}
                className="tap-target text-body text-swiss-black/82 hover:text-swiss-red-ink"
              >
                Sobre mí
              </Link>
              <Link
                href={HOME_SECTION_PATHS.blog}
                className="tap-target text-body text-swiss-black/82 hover:text-swiss-red-ink"
              >
                Blog
              </Link>
              <Link
                href={HOME_SECTION_PATHS.contact}
                className="tap-target text-body text-swiss-black/82 hover:text-swiss-red-ink"
              >
                Contacto
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-meta text-swiss-gray">Legal</h3>
              <Link
                href={LEGAL_PATHS.privacy}
                className="tap-target text-body text-swiss-black/82 hover:text-swiss-red-ink"
              >
                Privacidad &rarr;
              </Link>
              <Link
                href={LEGAL_PATHS.terms}
                className="tap-target text-body text-swiss-black/82 hover:text-swiss-red-ink"
              >
                Términos &rarr;
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-meta text-swiss-gray">Social</h3>
              {socialLinks.length > 0 ? (
                socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tap-target inline-flex items-center gap-2 text-body text-swiss-black/82 hover:text-swiss-red-ink"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center border border-current text-[9px] font-semibold leading-none">
                      {item.icon}
                    </span>
                    {item.label} &rarr;
                  </a>
                ))
              ) : (
                <p className="text-body text-swiss-black/58">Próximamente</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border-soft)] pt-6">
          <p className="text-meta text-swiss-black/55">© 2026 {siteConfig.brand.name}</p>
          <Link href="/blog" className="tap-target text-meta text-swiss-black/55 hover:text-swiss-red-ink">
            Blog &rarr;
          </Link>
        </div>
      </GridContainer>
    </footer>
  );
}
