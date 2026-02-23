import Link from "next/link";
import { HOME_SECTION_PATHS } from "@/config/site";
import type { InsuranceService } from "@/data/services";

interface ServiceCardProps {
  service: InsuranceService;
}

const serviceDetailHrefBySlug: Partial<Record<InsuranceService["slug"], string>> = {
  "gastos-finales": "/servicios/seguro-gastos-finales-texas",
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const detailHref = serviceDetailHrefBySlug[service.slug] ?? HOME_SECTION_PATHS.contact;
  const isDetailPage = Boolean(serviceDetailHrefBySlug[service.slug]);

  return (
    <article className="service-card service-card--carousel h-full">
      <header className="service-card__header">
        <p
          className="service-card__number"
          aria-label={`Servicio número ${service.number}`}
        >
          {service.number}
        </p>
      </header>

      <div>
        <h3 className="service-card__title">{service.titleEs}</h3>
        <p className="service-card__title-es">{service.titleEn}</p>
      </div>

      <div>
        <p className="service-card__description">{service.description}</p>
      </div>

      <div
        className="service-card__signals"
        aria-label="Ideal para y resultado esperado"
      >
        <p className="service-card__signal">
          <span className="service-card__signal-label">Ideal para:</span> {service.idealFor}
        </p>
        <p className="service-card__signal">
          <span className="service-card__signal-label">Resultado:</span> {service.result}
        </p>
      </div>

      <ul className="service-card__bullet-list" aria-label="Incluye">
        {service.bullets.map((bullet) => (
          <li key={`${service.slug}-${bullet}`} className="service-card__bullet-item">
            {bullet}
          </li>
        ))}
      </ul>

      <div className="service-card__cta">
        <Link
          href={detailHref}
          className="service-card__link tap-target"
          aria-label={
            isDetailPage
              ? `Ver detalles de ${service.titleEs}`
              : `Consultar opciones de ${service.titleEs}`
          }
        >
          {isDetailPage ? "Ver detalles" : "Consultar opciones"}
          <span className="service-card__link-arrow" aria-hidden>
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
