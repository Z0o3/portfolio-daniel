"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#hero" className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-white-blue">
            {site.name}
          </span>
          <span className="label-mono hidden text-[10px] uppercase text-muted sm:inline">
            {site.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-blue-bright"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-full bg-blue-primary px-4 py-2 text-sm font-medium text-white-blue transition-colors hover:bg-blue-bright hover:text-bg"
          >
            Hablemos
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white-blue md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="grid-backdrop border-t border-line bg-bg/98 px-5 pb-8 pt-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="label-mono flex min-h-[44px] items-center text-sm uppercase tracking-wider text-white-blue"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex min-h-[44px] items-center justify-center rounded-full bg-blue-primary text-sm font-medium text-white-blue"
            >
              Hablemos
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
