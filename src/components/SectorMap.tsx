"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { categories, projects } from "@/data/projects";

const CENTER = { x: 200, y: 190 };
const MIN_RADIUS = 55;
const MAX_RADIUS = 170;
const NODE_R = 26; // radio visual del círculo de cada nodo
const MIN_DIST = NODE_R * 2 + 6; // distancia mínima entre centros para no traspasarse
const SPRING_K = 0.5; // qué tan fuerte "jala" el nodo de regreso a su órbita
const STEER_RATE = 0.5; // qué tan rápido retoma la velocidad tangencial deseada
const RESTITUTION = 1.35; // "rebote": >1 exagera el cambio de dirección al chocar
const BOUNCE_BOOST = 2; // multiplicador extra sobre el impulso del choque
const MAX_SPEED = 320; // px/s, evita que un choque lo mande volando

type NodeState = {
  category: string;
  code: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetRadius: number;
  spin: number; // radianes/seg deseados (signo = sentido de giro)
};

// Configuración inicial: radio de órbita, ángulo de arranque y sentido/
// velocidad de giro de cada nodo. A partir de ahí cada uno se mueve como
// una partícula (posición + velocidad) que tiende a su órbita, y que
// rebota en vez de traspasar a los demás.
const initialConfig: { category: string; code: string; radius: number; angle: number; spin: number }[] = [
  { category: categories[0], code: "SEC-01", radius: 120, angle: (-110 * Math.PI) / 180, spin: 0.1 },
  { category: categories[1], code: "SEC-02", radius: 145, angle: (-40 * Math.PI) / 180, spin: -0.08 },
  { category: categories[2], code: "SEC-03", radius: 130, angle: (50 * Math.PI) / 180, spin: 0.11 },
  { category: categories[3], code: "SEC-04", radius: 115, angle: (150 * Math.PI) / 180, spin: -0.13 },
  { category: categories[4] ?? "Gimnasios", code: "SEC-05", radius: 85, angle: (-90 * Math.PI) / 180, spin: 0.16 },
];

function makeInitialNodes(): NodeState[] {
  return initialConfig.map((c) => {
    const x = CENTER.x + c.radius * Math.cos(c.angle);
    const y = CENTER.y + c.radius * Math.sin(c.angle);
    // Velocidad tangencial inicial (derivada del movimiento circular).
    const tangentialSpeed = c.radius * c.spin;
    const vx = -Math.sin(c.angle) * tangentialSpeed;
    const vy = Math.cos(c.angle) * tangentialSpeed;
    return {
      category: c.category,
      code: c.code,
      x,
      y,
      vx,
      vy,
      targetRadius: c.radius,
      spin: c.spin,
    };
  });
}

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

function clampSpeed(vx: number, vy: number) {
  const speed = Math.hypot(vx, vy);
  if (speed <= MAX_SPEED) return { vx, vy };
  const scale = MAX_SPEED / speed;
  return { vx: vx * scale, vy: vy * scale };
}

export default function SectorMap() {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<NodeState[]>(() => makeInitialNodes());
  const draggingIndex = useRef<number | null>(null);
  const lastFrame = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function frame(now: number) {
      if (lastFrame.current == null) lastFrame.current = now;
      const dt = Math.min((now - lastFrame.current) / 1000, 0.05);
      lastFrame.current = now;

      if (!reduceMotion) {
        setNodes((prev) => {
          // 1) Mover cada nodo: los libres siguen su órbita (con un
          // resorte suave hacia su radio objetivo), el que se arrastra
          // sigue el puntero (ver handlePointerMove).
          const moved = prev.map((node, i) => {
            if (i === draggingIndex.current) return node;

            const rx = node.x - CENTER.x;
            const ry = node.y - CENTER.y;
            const r = Math.max(Math.hypot(rx, ry), 0.001);
            const nx = rx / r;
            const ny = ry / r;
            const tx = -ny;
            const ty = nx;

            const desiredTangential = node.targetRadius * node.spin;
            const desiredVx = tx * desiredTangential;
            const desiredVy = ty * desiredTangential;
            const radialError = node.targetRadius - r;

            let vx = node.vx + (desiredVx - node.vx) * STEER_RATE * dt + nx * radialError * SPRING_K * dt;
            let vy = node.vy + (desiredVy - node.vy) * STEER_RATE * dt + ny * radialError * SPRING_K * dt;
            ({ vx, vy } = clampSpeed(vx, vy));

            let x = node.x + vx * dt;
            let y = node.y + vy * dt;

            // Muro circular suave: no se sale del lienzo.
            const nr = Math.hypot(x - CENTER.x, y - CENTER.y);
            if (nr > MAX_RADIUS || nr < MIN_RADIUS) {
              const clamped = nr > MAX_RADIUS ? MAX_RADIUS : MIN_RADIUS;
              const ux = (x - CENTER.x) / (nr || 1);
              const uy = (y - CENTER.y) / (nr || 1);
              x = CENTER.x + ux * clamped;
              y = CENTER.y + uy * clamped;
              const radialVel = vx * ux + vy * uy;
              vx -= (1 + RESTITUTION) * radialVel * ux;
              vy -= (1 + RESTITUTION) * radialVel * uy;
            }

            return { ...node, x, y, vx, vy };
          });

          // 2) Resolver colisiones entre nodos: separarlos y rebotar.
          for (let i = 0; i < moved.length; i++) {
            for (let j = i + 1; j < moved.length; j++) {
              const a = moved[i];
              const b = moved[j];
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const dist = Math.hypot(dx, dy);
              if (dist === 0 || dist >= MIN_DIST) continue;

              const overlap = MIN_DIST - dist;
              const ux = dx / dist;
              const uy = dy / dist;
              const aDragged = i === draggingIndex.current;
              const bDragged = j === draggingIndex.current;

              // Separar para que no se traspasen.
              if (!aDragged && !bDragged) {
                moved[i] = { ...a, x: a.x - ux * overlap * 0.5, y: a.y - uy * overlap * 0.5 };
                moved[j] = { ...b, x: b.x + ux * overlap * 0.5, y: b.y + uy * overlap * 0.5 };
              } else if (aDragged) {
                moved[j] = { ...b, x: b.x + ux * overlap, y: b.y + uy * overlap };
              } else if (bDragged) {
                moved[i] = { ...a, x: a.x - ux * overlap, y: a.y - uy * overlap };
              }

              // Rebote: reflejar la velocidad relativa a lo largo de la normal.
              const relVx = moved[j].vx - moved[i].vx;
              const relVy = moved[j].vy - moved[i].vy;
              const relNormal = relVx * ux + relVy * uy;
              if (relNormal < 0) {
                const impulse = (1 + RESTITUTION) * relNormal * 0.5 * BOUNCE_BOOST;
                if (!aDragged) {
                  moved[i] = { ...moved[i], vx: moved[i].vx + impulse * ux, vy: moved[i].vy + impulse * uy };
                }
                if (!bDragged) {
                  moved[j] = { ...moved[j], vx: moved[j].vx - impulse * ux, vy: moved[j].vy - impulse * uy };
                }
              }
            }
          }

          return moved;
        });
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
    const r = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, Math.hypot(dx, dy)));
    const angle = Math.atan2(dy, dx);
    const x = CENTER.x + r * Math.cos(angle);
    const y = CENTER.y + r * Math.sin(angle);
    setNodes((prev) => prev.map((node, i) => (i === index ? { ...node, x, y, vx: 0, vy: 0 } : node)));
  }

  function handlePointerUp() {
    draggingIndex.current = null;
  }

  return (
    <>
      <span className="sr-only">
        Mapa de los cinco sectores de trabajo: {nodes.map((n) => n.category).join(", ")}.
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
          const from = nodes[a];
          const to = nodes[b];
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

        {nodes.map((node, i) => (
          <g key={node.category}>
            <circle
              cx={node.x}
              cy={node.y}
              r={NODE_R}
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
          {`CONTADOR DE PROYECTOS — ${String(projects.length).padStart(2, "0")}`}
        </text>
      </svg>
    </>
  );
}
