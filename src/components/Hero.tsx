"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { projects, categories } from "@/data/projects";
import SectorMap from "./SectorMap";
import WaveBackground from "./WaveBackground";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stats = [
  { value: String(projects.length).padStart(2, "0"), label: "proyectos" },
  { value: String(categories.length).padStart(2, "0"), label: "sectores" },
  { value: "Mobile-first", label: "diseño" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      <WaveBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="label-mono mb-5 text-xs uppercase tracking-[0.18em] text-blue-bright"
          >
            Diseño y desarrollo web para negocios locales
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white-blue sm:text-5xl lg:text-[3.4rem]"
          >
            Construyo{" "}
            <span className="text-blue-bright">páginas web</span> que convierten ideas en{" "}
            <span className="text-blue-bright">experiencias claras</span>.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            Soy {profile.name}. Diseño y desarrollo sitios web personalizados para negocios. Cada
            proyecto combina estrategia, diseño, experiencia de usuario y desarrollo enfocado en
            dispositivos móviles.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="rounded-full bg-blue-primary px-6 py-3 text-sm font-medium text-white-blue transition-colors hover:bg-blue-bright hover:text-bg"
            >
              Explorar proyectos
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-white-blue transition-colors hover:border-blue-bright hover:text-blue-bright"
            >
              Solicitar una página
            </a>
          </motion.div>

          <motion.dl variants={item} className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-line pl-3">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-lg font-semibold text-white-blue">
                  {stat.value}
                </dd>
                <dd className="label-mono text-[10px] uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto aspect-square w-full max-w-md"
          aria-hidden={false}
        >
          <SectorMap />
        </motion.div>
      </div>
    </section>
  );
}
