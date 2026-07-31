"use client";

import { motion, useReducedMotion } from "framer-motion";
import { categories } from "@/data/projects";

// Coordenadas fijas de los 4 nodos dentro de un viewBox de 400x400.
const nodes = [
  { category: categories[0], x: 90, y: 110, code: "SEC-01" },
  { category: categories[1], x: 300, y: 80, code: "SEC-02" },
  { category: categories[2], x: 320, y: 290, code: "SEC-03" },
  { category: categories[3], x: 100, y: 300, code: "SEC-04" },
];

// Conexiones entre nodos (forma un lazo que recorre los 4 sectores).
const connections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
];

export default function SectorMap() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Mapa de los cuatro sectores de trabajo: Veterinarias, Salud, Belleza e Industria, conectados entre sí."
      className="h-full w-full"
    >
      <defs>
        <pattern id="atlas-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M 28 0 L 0 0 0 28"
            fill="none"
            stroke="rgba(120,190,255,0.12)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect x="0" y="0" width="400" height="400" fill="url(#atlas-grid)" />

      {connections.map(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#1677FF"
            strokeOpacity={0.45}
            strokeWidth={1.25}
            initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeInOut" }}
          />
        );
      })}

      {nodes.map((node, i) => (
        <g key={node.category}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={26}
            fill="#0A1F35"
            stroke="#42B6FF"
            strokeWidth={1}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
          />
          <circle cx={node.x} cy={node.y} r={3.5} fill="#64D8FF" />
          <text
            x={node.x}
            y={node.y + 44}
            textAnchor="middle"
            className="label-mono"
            fill="#9DB2C9"
            fontSize="9"
            letterSpacing="0.05em"
          >
            {node.code}
          </text>
          <text
            x={node.x}
            y={node.y + 56}
            textAnchor="middle"
            fill="#F4F9FF"
            fontSize="11"
            fontWeight={600}
          >
            {node.category}
          </text>
        </g>
      ))}

      <text
        x="200"
        y="24"
        textAnchor="middle"
        className="label-mono"
        fill="#42B6FF"
        fontSize="10"
        letterSpacing="0.12em"
      >
        BLUE SECTOR ATLAS — 08 PROYECTOS
      </text>
    </svg>
  );
}
