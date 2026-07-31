import ProjectFilters from "./ProjectFilters";
import ProjectGrid from "./ProjectGrid";

export default function ProjectExplorer() {
  return (
    <section id="proyectos" className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="label-mono mb-3 text-xs uppercase tracking-wider text-blue-bright">
            Explorador
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white-blue sm:text-4xl">
            Proyectos seleccionados
          </h2>
          <p className="mt-4 text-muted">
            Ocho proyectos creados para negocios de diferentes sectores, cada uno desarrollado con
            una identidad y un objetivo propios.
          </p>
        </div>

        <div className="mb-6">
          <ProjectFilters />
        </div>

        <ProjectGrid />
      </div>
    </section>
  );
}
