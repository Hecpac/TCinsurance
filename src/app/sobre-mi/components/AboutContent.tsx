import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import EmpresasDeSeguros from "@/components/EmpresasDeSeguros";

export default function AboutContent() {
  return (
    <div className="bg-swiss-paper pb-24">
      <GridContainer as="section" className="pt-16 pb-16">
        <div className="col-span-12 md:col-start-3 md:col-span-8 text-body text-swiss-black/90 space-y-7">
          <p className="text-xl leading-relaxed font-medium">
            Crecí entendiendo lo que significa empezar de nuevo en otro país, hablar dos idiomas y cuidar a los tuyos sin red de seguridad.
          </p>
          <p>
            Por eso me hice agente de seguros: vi a demasiada gente firmar pólizas que no entendía, pagar por cobertura que no servía, y descubrirlo en el peor momento. Decidí que conmigo eso no iba a pasar.
          </p>
          <p>
            Trabajo con cada familia con una sola promesa: <strong>claridad para proteger a tu familia.</strong> Te explico cada opción en tu idioma, comparo planes contigo, y solo te recomiendo lo que tiene sentido para tu vida real — no para mi comisión.
          </p>
          
          <h2 className="text-headline text-swiss-black mt-12 mb-6">Cómo trabajo</h2>
          <p>
            Mi enfoque no es venderte la primera póliza disponible. Es entender tu situación familiar, tus prioridades y tu presupuesto para diseñar una combinación de cobertura que realmente funcione.
          </p>
          <p>
            Empezamos con una llamada de 15 minutos donde definimos juntos qué necesitas resolver primero. Luego comparo opciones de múltiples aseguradoras, te presento escenarios claros con costos reales, y tú decides con información completa. Sin presión, sin jerga técnica, sin sorpresas.
          </p>
          <p>
            Después de la contratación, no desaparezco. Hago seguimiento de renovaciones, reviso tu cobertura cuando cambia tu situación familiar y estoy disponible cuando surgen dudas. Para mí, acompañarte es tan importante como encontrarte el plan correcto.
          </p>

          <h2 className="text-headline text-swiss-black mt-12 mb-6">Especialidades</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-swiss-black">Seguros de salud (ACA / Marketplace)</h3>
              <p className="mt-2 text-swiss-black/80">Comparo planes HMO, PPO y EPO en Texas según tus médicos, medicamentos y presupuesto. Reviso subsidios disponibles para reducir tu costo real.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-swiss-black">Seguros de vida</h3>
              <p className="mt-2 text-swiss-black/80">Diseño cobertura temporal o permanente para proteger los ingresos y compromisos de tu hogar — hipoteca, educación, deudas — ante un imprevisto.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-swiss-black">Gastos finales (Final Expense)</h3>
              <p className="mt-2 text-swiss-black/80">Planifico cobertura para que tu familia tenga liquidez inmediata para funeral, trámites y gastos urgentes sin recurrir a deuda.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-swiss-black">Dental, Visión y Medicare</h3>
              <p className="mt-2 text-swiss-black/80">Comparo opciones complementarias y planes Medicare (Advantage, suplementos, Part D) para adultos mayores según médicos y recetas actuales.</p>
            </div>
          </div>
        </div>
      </GridContainer>

      <EmpresasDeSeguros />

      <GridContainer as="section" className="pt-16 pb-16">
        <div className="col-span-12 md:col-start-3 md:col-span-8 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black mb-6">A quién atiendo</h2>
          <p className="mb-4">Trabajo principalmente con familias latinas e hispanas que buscan asesoría de seguros en español — pero atiendo a cualquier persona que necesite claridad en su cobertura.</p>
          <ul className="space-y-2 list-disc pl-5 mb-12 marker:text-swiss-red">
            <li><strong>Ubicación:</strong> Lewisville, Texas. Oficina en 883 Union Station Parkway, Apt 20212, Lewisville, TX 75057.</li>
            <li><strong>Cobertura presencial:</strong> Dallas, Fort Worth, Lewisville, Irving, Denton, Arlington y todo el metroplex DFW.</li>
            <li><strong>Cobertura remota:</strong> Todo el estado de Texas vía teléfono, WhatsApp y videollamada.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mb-6">Credenciales y licencia</h2>
          <ul className="space-y-2 list-none p-0">
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>Licensed Insurance Agent, Texas Department of Insurance</span></li>
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>Licencia TDI #: <strong>2629251</strong></span></li>
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>NPN: <strong>19630324</strong></span></li>
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>Agencia: TC Insurance Agency Services, LLC</span></li>
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>Activa desde: 2020</span></li>
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>Idiomas: Español (nativo) · Inglés (fluido)</span></li>
            <li className="flex gap-2 items-start"><span className="text-swiss-red mt-1">✓</span> <span>Atención: Personalizada 1:1 — no call centers</span></li>
          </ul>
        </div>
      </GridContainer>

      <GridContainer
        as="section"
        className="pt-16 pb-20 mt-10"
        style={{ background: "var(--color-tic-cream)" }}
      >
        <div className="col-span-12 md:col-start-3 md:col-span-8 text-center space-y-6">
          <p
            className="text-meta uppercase tracking-[0.18em]"
            style={{ color: "var(--color-tic-orange)" }}
          >
            Claridad para proteger a tu familia
          </p>
          <h2
            className="text-display tracking-[-0.05em]"
            style={{
              color: "var(--color-tic-navy)",
              fontFamily: "var(--font-tic-headline)",
            }}
          >
            ¿Hablamos 15 minutos?
          </h2>
          <p
            className="text-body max-w-xl mx-auto"
            style={{
              color: "var(--color-tic-navy)",
              fontFamily: "var(--font-tic-body)",
            }}
          >
            Revisamos tu situación, te doy un siguiente paso claro y respondo todas tus dudas en español o inglés. Sin costo, sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="https://wa.me/12039932369?text=Hola%20Tatiana%2C%20quiero%20agendar%20una%20asesor%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center justify-center px-8 py-4 text-meta uppercase tracking-[0.12em] font-semibold transition-colors"
              style={{
                background: "var(--color-tic-orange)",
                color: "var(--color-tic-navy)",
              }}
            >
              Escríbeme por WhatsApp &rarr;
            </a>
            <Link
              href="/cotizar"
              className="tap-target inline-flex items-center justify-center px-8 py-4 text-meta uppercase tracking-[0.12em] font-semibold border-2 transition-colors"
              style={{
                borderColor: "var(--color-tic-navy)",
                color: "var(--color-tic-navy)",
              }}
            >
              Cotiza ahora &rarr;
            </Link>
          </div>
        </div>
      </GridContainer>
    </div>
  );
}
