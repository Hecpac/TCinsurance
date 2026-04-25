"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/config/site";

type ServiceKey =
  | "salud"
  | "vida"
  | "gastos-finales"
  | "medicare"
  | "dental-vision";

type FormState = {
  service: ServiceKey | null;
  fullName: string;
  age: string;
  zip: string;
  email: string;
  phone: string;
  notes: string;
};

const SERVICES: { key: ServiceKey; label: string; hint: string }[] = [
  { key: "salud", label: "Seguro de salud", hint: "ACA / Marketplace" },
  { key: "vida", label: "Seguro de vida", hint: "Term / Whole / IUL" },
  { key: "gastos-finales", label: "Gastos finales", hint: "Final expense" },
  { key: "medicare", label: "Medicare", hint: "Advantage / Suplemento" },
  { key: "dental-vision", label: "Dental y visión", hint: "Familia o individual" },
];

const TOTAL_STEPS = 5;

export default function CotizarFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    service: null,
    fullName: "",
    age: "",
    zip: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => {
    if (step >= TOTAL_STEPS) return;
    trackEvent("cotizador_step", {
      from: step,
      to: step + 1,
      service: form.service,
    });
    setStep(step + 1);
  };

  const goBack = () => {
    if (step <= 1) return;
    setStep(step - 1);
  };

  const submit = () => {
    trackEvent("cotizador_submit_stub", {
      service: form.service,
    });
    setSubmitted(true);
  };

  const canAdvance = (() => {
    if (step === 1) return form.service !== null;
    if (step === 2) return form.fullName.trim().length > 1 && form.age.trim().length > 0;
    if (step === 3) return form.zip.trim().length >= 5;
    if (step === 4) return form.email.includes("@") && form.phone.trim().length >= 7;
    return true;
  })();

  if (submitted) {
    return (
      <div className="border border-m3-outline-variant p-8" data-testid="cotizar-success">
        <h1 className="text-headline text-swiss-black">Solicitud recibida</h1>
        <p className="mt-4 text-body text-swiss-black/80">
          Gracias{form.fullName ? `, ${form.fullName.split(" ")[0]}` : ""}. Tatiana
          revisará tu información y te contactará por el medio que prefieras
          dentro de las próximas horas hábiles.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="primary-cta tap-target inline-flex items-center border px-5 py-3 text-meta"
          >
            Volver al inicio
          </Link>
          <a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center border border-m3-outline-variant px-5 py-3 text-meta text-swiss-black"
          >
            Hablar por WhatsApp
          </a>
        </div>
        <p className="mt-6 text-meta text-swiss-gray">
          Nota: este flujo es un placeholder. La persistencia de leads se activa
          en la siguiente fase del rediseño.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="cotizar-flow">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <h1 className="mt-6 text-headline text-swiss-black">
        {step === 1 && "¿Qué tipo de seguro buscas?"}
        {step === 2 && "Cuéntanos sobre ti"}
        {step === 3 && "¿Dónde vives?"}
        {step === 4 && "¿Cómo te contactamos?"}
        {step === 5 && "Confirma y envía"}
      </h1>

      <div className="mt-6 space-y-4">
        {step === 1 && (
          <div className="grid gap-3" role="radiogroup" aria-label="Tipo de seguro">
            {SERVICES.map((service) => {
              const selected = form.service === service.key;
              return (
                <button
                  key={service.key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setForm({ ...form, service: service.key })}
                  className={`tap-target flex w-full items-center justify-between border px-4 py-4 text-left transition-colors ${
                    selected
                      ? "border-[var(--color-tic-orange)] bg-[var(--color-m3-surface-container-high)]"
                      : "border-m3-outline-variant hover:border-m3-outline-variant-strong"
                  }`}
                >
                  <span className="text-body text-swiss-black">{service.label}</span>
                  <span className="text-meta text-swiss-gray">{service.hint}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <>
            <Field
              label="Nombre completo"
              value={form.fullName}
              onChange={(value) => setForm({ ...form, fullName: value })}
              autoComplete="name"
              testId="cotizar-fullName"
            />
            <Field
              label="Edad"
              value={form.age}
              onChange={(value) => setForm({ ...form, age: value })}
              type="number"
              testId="cotizar-age"
            />
          </>
        )}

        {step === 3 && (
          <Field
            label="Código postal (Texas)"
            value={form.zip}
            onChange={(value) => setForm({ ...form, zip: value })}
            inputMode="numeric"
            maxLength={5}
            autoComplete="postal-code"
            testId="cotizar-zip"
          />
        )}

        {step === 4 && (
          <>
            <Field
              label="Correo electrónico"
              value={form.email}
              onChange={(value) => setForm({ ...form, email: value })}
              type="email"
              autoComplete="email"
              testId="cotizar-email"
            />
            <Field
              label="Teléfono"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value })}
              type="tel"
              autoComplete="tel"
              testId="cotizar-phone"
            />
            <Field
              label="¿Algo más que debamos saber? (opcional)"
              value={form.notes}
              onChange={(value) => setForm({ ...form, notes: value })}
              multiline
              testId="cotizar-notes"
            />
          </>
        )}

        {step === 5 && (
          <dl className="grid gap-3 border border-m3-outline-variant p-5">
            <Row label="Tipo de seguro" value={form.service ?? ""} />
            <Row label="Nombre" value={form.fullName} />
            <Row label="Edad" value={form.age} />
            <Row label="Código postal" value={form.zip} />
            <Row label="Email" value={form.email} />
            <Row label="Teléfono" value={form.phone} />
            {form.notes && <Row label="Notas" value={form.notes} />}
          </dl>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="tap-target border border-m3-outline-variant px-5 py-3 text-meta text-swiss-black disabled:opacity-40"
          data-testid="cotizar-back"
        >
          Atrás
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            className="primary-cta tap-target inline-flex items-center border px-6 py-3 text-meta disabled:opacity-40"
            data-testid="cotizar-next"
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            className="primary-cta tap-target inline-flex items-center border px-6 py-3 text-meta"
            data-testid="cotizar-submit"
          >
            Enviar solicitud
          </button>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-meta text-swiss-gray">
        <span>
          Paso {step} de {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="mt-2 h-1 w-full bg-[var(--color-m3-outline-variant)]"
      >
        <div
          className="h-full bg-[var(--color-tic-orange)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
  multiline?: boolean;
  testId?: string;
};

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  multiline,
  testId,
}: FieldProps) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-meta text-swiss-gray">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-control mt-2 px-3 py-3 text-body"
          rows={3}
          data-testid={testId}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          className="form-control mt-2 px-3 py-3 text-body"
          data-testid={testId}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-meta text-swiss-gray">{label}</dt>
      <dd className="text-body text-swiss-black text-right break-words">{value}</dd>
    </div>
  );
}
