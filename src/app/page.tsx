import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import EmpresasDeSeguros from "@/components/EmpresasDeSeguros";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import BlogList from "@/components/BlogList";
import FAQ from "@/components/FAQ";
import FaqJsonLd from "@/components/FaqJsonLd";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CTAInline from "@/components/CTAInline";
import SectionPinTiltGroup from "@/components/SectionPinTiltGroup";
import { HOME_SECTION_PATHS } from "@/config/site";

export default function Home() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      data-testid="home-main"
      data-agent-context="landing-page"
    >
      <FaqJsonLd />
      <HeroSection />
      <Services />
      <EmpresasDeSeguros />
      <section className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-20 md:py-10">
        <div className="grid grid-cols-12 gap-6">
          <CTAInline
            title="¿Quieres comparar opciones sin perder tiempo?"
            subtitle="Te entregamos un plan claro para tu caso en una sola conversación."
            primaryButton={{ label: "Compara tus opciones", href: HOME_SECTION_PATHS.contact }}
            secondaryButton={{ label: "Ver proceso", href: "/#como-funciona" }}
            trackingId="after_services"
          />
        </div>
      </section>
      <SectionPinTiltGroup
        minWidth={768}
        parallaxDistance={130}
        scrubValue={0.8}
      >
        <div data-pin-tilt-section="true">
          <Process />
        </div>
        <section className="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-20 md:py-10">
          <div className="grid grid-cols-12 gap-6">
            <CTAInline
              title="Ya tienes la ruta, ahora toca ejecutarla."
              subtitle="En 15 minutos definimos tu siguiente paso concreto de cobertura."
              primaryButton={{ label: "Inicia tu estrategia", href: HOME_SECTION_PATHS.contact }}
              secondaryButton={{ label: "Ver servicios", href: "/#servicios" }}
              trackingId="after_process"
            />
          </div>
        </section>
        <div data-pin-tilt-section="true">
          <Stats />
        </div>
        <div data-pin-tilt-section="true">
          <Testimonials />
        </div>
      </SectionPinTiltGroup>
      <BlogList />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
