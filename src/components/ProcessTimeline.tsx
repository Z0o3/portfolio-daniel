"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const steps = [
  {
    code: "01",
    title: "Descubrimiento",
    description: "Conozco el negocio, sus servicios, clientes y objetivo principal.",
  },
  {
    code: "02",
    title: "Estructura",
    description: "Organizo la información para que el visitante encuentre rápidamente lo importante.",
  },
  {
    code: "03",
    title: "Diseño",
    description: "Creo una identidad visual adaptada a la marca y a dispositivos móviles.",
  },
  {
    code: "04",
    title: "Desarrollo",
    description: "Construyo una página rápida, accesible y preparada para buscadores.",
  },
  {
    code: "05",
    title: "Publicación",
    description: "Realizo las pruebas finales y preparo el despliegue en Vercel.",
  },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32 });

  return (
    <section id="proceso" className="scroll-mt-20 border-t border-line px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="label-mono mb-3 text-xs uppercase tracking-wider text-blue-bright">
            Proceso
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white-blue sm:text-4xl">
            Del negocio a una experiencia digital
          </h2>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-line sm:left-[19px]" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-blue-bright sm:left-[19px]"
          />

          <ol className="flex flex-col gap-10">
            {steps.map((step) => (
              <li key={step.code} className="relative flex gap-6 pl-10 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg-secondary sm:h-10 sm:w-10"
                >
                  <span className="label-mono text-[10px] text-blue-bright">{step.code}</span>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white-blue">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
