import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <section id="habilidades" className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="label-mono mb-3 text-xs uppercase tracking-wider text-blue-bright">
            Panel de capacidades
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white-blue sm:text-4xl">
            Herramientas que utilizo
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {profile.skillGroups.map((group, i) => (
            <div
              key={group.label}
              className="grid-backdrop rounded-xl border border-line bg-bg-secondary p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-white-blue">
                  {group.label}
                </h3>
                <span className="label-mono text-[10px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="label-mono rounded border border-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-blue-bright"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {profile.languages.map((lang) => (
            <div key={lang.label} className="rounded-lg border border-line px-4 py-3">
              <p className="label-mono text-[10px] uppercase tracking-wider text-muted">
                {lang.label}
              </p>
              <p className="mt-1 text-sm text-white-blue">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
