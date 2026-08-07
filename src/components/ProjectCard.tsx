"use client";

import { ArrowUpRight, Calendar } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn, formatUpdatedDate } from "@/lib/utils";

export default function ProjectCard({
  project,
  span,
}: {
  project: Project;
  span?: "wide" | "normal";
}) {
  const hasUrl = Boolean(project.url);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-line bg-bg-secondary p-5 transition-colors",
        "[@media(hover:hover)]:hover:border-blue-bright/60 [@media(hover:hover)]:hover:-translate-y-0.5",
        "transition-transform duration-300 ease-out",
        span === "wide" ? "sm:col-span-2" : "",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="label-mono text-[11px] uppercase tracking-widest text-blue-bright">
          {String(project.id).padStart(2, "0")} — {project.category}
        </span>
        <span
          className={cn(
            "label-mono shrink-0 rounded-full px-2 py-1 text-[10px] uppercase tracking-wider",
            project.status === "Publicado"
              ? "bg-blue-primary/20 text-blue-bright"
              : "bg-white-blue/10 text-muted",
          )}
        >
          {project.status}
        </span>
      </div>

      <h3 className="font-display mt-3 text-lg font-semibold text-white-blue">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.description}</p>

      {project.technologies.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologías usadas">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="label-mono rounded border border-line px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-4 pt-1">
        <span
          className="label-mono inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted"
          title="Fecha de actualización"
        >
          <Calendar className="h-3 w-3" aria-hidden="true" />
          Actualizado: {formatUpdatedDate(project.updatedAt)}
        </span>
        {hasUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-bright [@media(hover:hover)]:group-hover:underline"
          >
            Ver proyecto
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="label-mono text-xs uppercase tracking-wide text-muted">
            Enlace pendiente
          </span>
        )}
      </div>
    </article>
  );
}
