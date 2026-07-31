"use client";

import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useFilter } from "./FilterProvider";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const { filter } = useFilter();

  const visible = projects.filter((project) => filter === "Todos" || project.category === filter);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="label-mono text-xs uppercase tracking-wider text-muted">
          {String(visible.length).padStart(2, "0")} / proyectos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={project.featured ? "sm:col-span-2" : ""}
            >
              <ProjectCard project={project} span={project.featured ? "wide" : "normal"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-line bg-bg-secondary p-8 text-center text-sm text-muted">
          Todavía no hay proyectos cargados en este sector.
        </p>
      ) : null}
    </div>
  );
}
