import { Code2, Mail } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-white-blue">{site.name}</p>
            <p className="text-sm text-muted">{profile.role}</p>

            {site.availableForWork ? (
              <span className="label-mono mt-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-wider text-blue-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" />
                Disponible para nuevos proyectos
              </span>
            ) : null}
          </div>

          <nav aria-label="Navegación del pie de página" className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label-mono text-xs uppercase tracking-wider text-muted hover:text-blue-bright"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-start gap-4">
            <a
              href={`mailto:${site.email}`}
              aria-label="Enviar correo"
              className="text-muted hover:text-blue-bright"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver GitHub de Daniel (abre en una pestaña nueva)"
              className="flex items-center gap-1.5 text-muted hover:text-blue-bright"
            >
              <Code2 className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs">GitHub</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Diseñado y desarrollado por Daniel.</p>
          <p>© {year} {profile.fullName}</p>
        </div>
      </div>
    </footer>
  );
}
