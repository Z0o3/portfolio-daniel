"use client";

import { categories } from "@/data/projects";
import { useFilter, type FilterValue } from "./FilterProvider";
import { cn } from "@/lib/utils";

const options: FilterValue[] = ["Todos", ...categories];

export default function ProjectFilters() {
  const { filter, setFilter } = useFilter();

  return (
    <div
      role="tablist"
      aria-label="Filtrar proyectos por sector"
      className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {options.map((option) => {
        const active = option === filter;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setFilter(option)}
            className={cn(
              "label-mono shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors",
              active
                ? "border-blue-bright bg-blue-primary/15 text-blue-bright"
                : "border-line text-muted hover:text-white-blue",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
