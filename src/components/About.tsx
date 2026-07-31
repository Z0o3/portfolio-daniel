import { Download, GraduationCap, BadgeCheck } from "lucide-react";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="label-mono mb-3 text-xs uppercase tracking-wider text-blue-bright">
            Sobre mí
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white-blue sm:text-4xl">
            Diseño con intención. Desarrollo con estructura.
          </h2>

          {site.hasCv ? (
            <a
              href={site.cvPath}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-white-blue transition-colors hover:border-blue-bright hover:text-blue-bright"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Ver mi CV
            </a>
          ) : null}
        </div>

        <div>
          <p className="text-base leading-relaxed text-muted">
            Soy Daniel y me dedico a crear páginas web para negocios locales. Mi objetivo es
            transformar la información de cada negocio en una experiencia clara, profesional y
            fácil de usar.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">{profile.summary}</p>

          <div className="mt-10">
            <h3 className="label-mono mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-blue-bright">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Educación
            </h3>
            <ul className="space-y-4">
              {profile.education.map((edu) => (
                <li key={edu.degree} className="border-l border-line pl-4">
                  <p className="font-medium text-white-blue">{edu.degree}</p>
                  <p className="text-sm text-muted">
                    {edu.institution} · {edu.period}
                  </p>
                  {edu.note ? <p className="text-sm text-muted">{edu.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="label-mono mb-4 text-xs uppercase tracking-wider text-blue-bright">
              Experiencia
            </h3>
            <ul className="space-y-6">
              {profile.experience.map((exp) => (
                <li key={`${exp.role}-${exp.period}`} className="border-l border-line pl-4">
                  <p className="font-medium text-white-blue">
                    {exp.role} <span className="text-muted">· {exp.company}</span>
                  </p>
                  <p className="text-sm text-muted">{exp.period}</p>
                  <ul className="mt-2 space-y-1.5">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-muted">
                        — {bullet}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="label-mono mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-blue-bright">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Certificaciones
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {profile.certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="rounded-lg border border-line bg-bg-secondary p-3 text-sm"
                >
                  <p className="font-medium text-white-blue">{cert.name}</p>
                  <p className="text-muted">
                    {cert.issuer} · {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
