"use client";

import { PawPrint, HeartPulse, Sparkles, Factory, Dumbbell, ArrowRight } from "lucide-react";
import { useFilter } from "./FilterProvider";
import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

const sectors: {
  category: ProjectCategory;
  code: string;
  icon: typeof PawPrint;
  description: string;
  accent: string;
}[] = [
  {
    category: "Veterinarias",
    code: "01",
    icon: PawPrint,
    description:
      "Sitios pensados para mostrar servicios, horarios, ubicación, atención de urgencias y contacto directo.",
    accent: "#42B6FF",
  },
  {
    category: "Salud",
    code: "02",
    icon: HeartPulse,
    description:
      "Experiencias digitales claras y tranquilas para clínicas, consultorios y profesionales de la salud.",
    accent: "#64D8FF",
  },
  {
    category: "Belleza",
    code: "03",
    icon: Sparkles,
    description:
      "Páginas visuales para presentar servicios, trabajos, identidad de marca y facilitar reservaciones.",
    accent: "#1677FF",
  },
  {
    category: "Industria",
    code: "04",
    icon: Factory,
    description:
      "Sitios estructurados para comunicar servicios, capacidad operativa, procesos y datos de contacto.",
    accent: "#0B3B75",
  },
  {
    category: "Gimnasios",
    code: "05",
    icon: Dumbbell,
    description:
      "Sitios para mostrar planes, clases, horarios e instalaciones, con contacto directo para inscribirse.",
    accent: "#22C55E",
  },
];

export default function SectorSection() {
  const { setFilter } = useFilter();

  return (
    <section id="sectores" className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="label-mono mb-3 text-xs uppercase tracking-wider text-blue-bright">
            Sectores
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white-blue sm:text-4xl">
            Soluciones para diferentes sectores
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <a
                key={sector.category}
                href="#proyectos"
                onClick={() => setFilter(sector.category)}
                className={cn(
                  "grid-backdrop group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-bg-secondary p-5",
                  "transition-colors hover:border-blue-bright/50",
                )}
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-6 w-6" style={{ color: sector.accent }} strokeWidth={1.75} />
                  <span className="label-mono text-xs text-muted">{sector.code}</span>
                </div>

                <div className="mt-8">
                  <h3 className="font-display text-lg font-semibold text-white-blue">
                    {sector.category}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{sector.description}</p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-blue-bright opacity-80 transition-opacity group-hover:opacity-100">
                  Ver proyectos
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
