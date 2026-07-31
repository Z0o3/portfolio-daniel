"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ProjectCategory } from "@/data/projects";

export type FilterValue = ProjectCategory | "Todos";

type FilterContextValue = {
  filter: FilterValue;
  setFilter: (value: FilterValue) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<FilterValue>("Todos");
  const value = useMemo(() => ({ filter, setFilter }), [filter]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilter debe usarse dentro de un FilterProvider");
  }
  return ctx;
}
