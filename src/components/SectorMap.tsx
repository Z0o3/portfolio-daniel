"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { categories, projects } from "@/data/projects";

const CENTER = { x: 200, y: 190 };
const MIN_RADIUS = 55;
const MAX_RADIUS = 170;

type NodeConfig = {
  category: string;
  code: string;
  radius: number;
  angle: number; // radianes
  speed: number; // radianes / segundo
};

// Configuración inicial: radio, ángulo de arranque y velocidad de cada
// nodo alrededor del centro. Cada uno gira a su propio ritmo, como una
// órbita, y además se puede arrastrar con el mouse o el dedo.
const initialNodes: NodeConfig[] = [
  { category: categories[0], code: "SEC-01", radius: 120, angle: (-110 * Math.PI) / 180, speed: 0.1 },
  { category: categories[1], code: "SEC-02", radius: 145, angle: (-40 * Math.PI) / 180, speed: -0.08 },
  { category: categories[2], code: "SEC-03", radius: 130, angle: (50 * Math.PI) / 180, speed: 0.11 },
  { category: categories[3], code: "SEC-04", radius: 115, angle: (150 * Math.PI) / 180, speed: -0.13 },
  { category: categories[4] ?? "Gimnasios", code: "SEC-05", radius: 85, angle: (-90 * Math.PI) / 180, speed: 0.16 },
];

// Conexiones entre nodos (índices): un lazo por los 4 sectores
// originales + el nodo 4 conectado a los cuatro como hub.
const connections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
];

function toXY(node: NodeConfig) {
  return {
    x: CENTER.x + node.radius * Math.cos(node.angle),
    y: CENTER.y + node.radius * Math.sin(node.angle),
  };
}

export default function SectorMap() {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<NodeConfig[]>(() => initialNodes.map((n) => ({ ...n })));
  const draggingIndex = useRef<number | null>(null);
  const lastFrame = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function frame(now: number) {
      if (lastFrame.current == null) lastFrame.current = now;
      const dt = (now - lastFrame.current) / 1000;
      lastFrame.current = now;

      if (!reduceMotion) {
        setNodes((prev) =>
          prev.map((node, i) =>
            i === draggingIndex.current ? node : { ...node, angle: node.angle + node.speed * dt },
          ),
        );
      }

      rafId.current = requestAnimationFrame(frame);
    }

    rafId.current = requestAnimationFrame(frame);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduceMotion]);

  function getSvgPoint(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  }

  function handlePointerDown(index: number) {
    return (e: React.PointerEvent<SVGCircleElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingIndex.current = index;
    };
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const index = draggingIndex.current;
    if (index == null) return;
    const p = getSvgPoint(e.clientX, e.clientY);
    if (!p) return;
    const dx = p.x - CENTER.x;
    const dy = p.y - CENTER.y;
    const radius = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, Math.hypot(dx, dy)));
    const angle = Math.atan2(dy, dx);
    setNodes((prev) => prev.map((node, i) => (i === index ? { ...node, radius, angle } : node)));
  }

  function handlePointerUp() {
    draggingIndex.current = null;
  }

  const positioned = nodes.map((node) => ({ ...node, ...toXY(node) }));

  return (
    <>
      <span className="sr-only">
        Mapa de los cinco sectores de trabajo: {positioned.map((n) => n.category).join(", ")}.
      </span>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        role="presentation"
        aria-hidden="true"
        className="h-full w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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

        {connections.map(([a, b]) => {
          const from = positioned[a];
          const to = positioned[b];
          if (!from || !to) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#1677FF"
              strokeOpacity={0.45}
              strokeWidth={1.25}
            />
          );
        })}

        {positioned.map((node, i) => (
          <g key={node.category}>
            <circle
              cx={node.x}
              cy={node.y}
              r={26}
              fill="#0A1F35"
              stroke="#42B6FF"
              strokeWidth={1}
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={handlePointerDown(i)}
            />
            <circle cx={node.x} cy={node.y} r={3.5} fill="#64D8FF" className="pointer-events-none" />
            <text
              x={node.x}
              y={node.y + 44}
              textAnchor="middle"
              className="label-mono pointer-events-none select-none"
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
              className="pointer-events-none select-none"
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
          className="label-mono pointer-events-none select-none"
          fill="#42B6FF"
          fontSize="10"
          letterSpacing="0.12em"
        >
          {`CONTADOR DE PROYECTOS — ${String(projects.length).padStart(2, "0")} PROYECTOS`}
        </text>
      </svg>
    </>
  );
}
