import CTAInline from "@/components/CTAInline";
import { HOME_SECTION_PATHS } from "@/config/site";

interface PostCTAProps {
  trackingId?: string;
}

export default function PostCTA({ trackingId = "blog_post" }: PostCTAProps) {
  return (
    <CTAInline
      title="¿Quieres saber cómo aplica a tu caso?"
      subtitle="Te guiamos en 15 minutos para priorizar la cobertura correcta según tu etapa de vida y presupuesto."
      primaryButton={{ label: "Consulta tu caso gratis", href: HOME_SECTION_PATHS.contact }}
      secondaryButton={{ label: "Ver servicios", href: "/servicios" }}
      trackingId={trackingId}
    />
  );
}
