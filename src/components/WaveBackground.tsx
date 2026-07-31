/**
 * Fondo animado de ondas para el Hero. Es puramente CSS (transform/opacity),
 * nada de canvas ni JS en cada frame, así que es barato en móviles y respeta
 * `prefers-reduced-motion` automáticamente (ver globals.css).
 */
export default function WaveBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Resplandor suave, respira lentamente */}
      <div className="glow-breathe absolute -left-24 top-[-10%] h-[420px] w-[420px] rounded-full bg-blue-primary/25 blur-[110px]" />
      <div
        className="glow-breathe absolute -right-16 bottom-[-15%] h-[380px] w-[380px] rounded-full bg-accent-cyan/20 blur-[100px]"
        style={{ animationDelay: "-4s" }}
      />

      {/* Líneas de onda, tres capas a distinta profundidad/velocidad */}
      <svg
        className="wave-layer wave-layer--slow absolute bottom-[8%] left-0 h-[140px] w-[2880px] opacity-[0.16] sm:h-[180px]"
        viewBox="0 0 2880 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,110 C120,60 240,60 360,110 C480,160 600,160 720,110 C840,60 960,60 1080,110 C1200,160 1320,160 1440,110 C1560,60 1680,60 1800,110 C1920,160 2040,160 2160,110 C2280,60 2400,60 2520,110 C2640,160 2760,160 2880,110"
          fill="none"
          stroke="#42B6FF"
          strokeWidth="2"
        />
      </svg>

      <svg
        className="wave-layer wave-layer--mid absolute bottom-[16%] left-0 h-[110px] w-[2880px] opacity-[0.14] sm:h-[140px]"
        viewBox="0 0 2880 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,140 C120,90 240,190 360,140 C480,90 600,190 720,140 C840,90 960,190 1080,140 C1200,90 1320,190 1440,140 C1560,90 1680,190 1800,140 C1920,90 2040,190 2160,140 C2280,90 2400,190 2520,140 C2640,90 2760,190 2880,140"
          fill="none"
          stroke="#64D8FF"
          strokeWidth="1.5"
        />
      </svg>

      <svg
        className="wave-layer wave-layer--fast absolute bottom-[2%] left-0 h-[90px] w-[2880px] opacity-[0.10] sm:h-[110px]"
        viewBox="0 0 2880 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C120,140 240,40 360,90 C480,140 600,40 720,90 C840,140 960,40 1080,90 C1200,140 1320,40 1440,90 C1560,140 1680,40 1800,90 C1920,140 2040,40 2160,90 C2280,140 2400,40 2520,90 C2640,140 2760,40 2880,90"
          fill="none"
          stroke="#1677FF"
          strokeWidth="2"
        />
      </svg>

      {/* Degradado para apagar las ondas contra los bordes y no competir con el texto */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-bg)_85%)]" />
    </div>
  );
}
