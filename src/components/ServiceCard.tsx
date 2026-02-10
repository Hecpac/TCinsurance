import Link from "next/link";
import { HOME_SECTION_PATHS } from "@/config/site";
import type { InsuranceService } from "@/data/services";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ServiceCardProps {
  service: InsuranceService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <CardContainer
      containerClassName="h-full w-full"
      className="h-full w-full"
      maxTilt={9}
      scale={1.015}
      perspective={1350}
    >
      <CardBody
        as="article"
        data-carousel-card
        data-service-card
        className="service-card service-card--carousel h-full"
      >
        <CardItem translateZ={14}>
          <header className="service-card__header">
            <p
              className="service-card__number"
              aria-label={`Servicio número ${service.number}`}
            >
              {service.number}
            </p>
          </header>
        </CardItem>

        <CardItem translateZ={28}>
          <h3 className="service-card__title">{service.titleEs}</h3>
          <p className="service-card__title-es">{service.titleEn}</p>
        </CardItem>

        <CardItem translateZ={20}>
          <p className="service-card__description">{service.description}</p>
        </CardItem>

        <CardItem
          translateZ={18}
          className="service-card__signals"
          aria-label="Ideal para y resultado esperado"
        >
          <p className="service-card__signal">
            <span className="service-card__signal-label">Ideal para:</span> {service.idealFor}
          </p>
          <p className="service-card__signal">
            <span className="service-card__signal-label">Resultado:</span> {service.result}
          </p>
        </CardItem>

        <CardItem as="ul" translateZ={16} className="service-card__bullet-list" aria-label="Incluye">
          {service.bullets.map((bullet) => (
            <li key={`${service.slug}-${bullet}`} className="service-card__bullet-item">
              {bullet}
            </li>
          ))}
        </CardItem>

        <CardItem translateZ={30} className="service-card__cta">
          <Link
            href={HOME_SECTION_PATHS.contact}
            className="service-card__link tap-target"
            aria-label={`Consultar opciones de ${service.titleEs}`}
          >
            Consultar opciones
            <span className="service-card__link-arrow" aria-hidden>
              &rarr;
            </span>
          </Link>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
