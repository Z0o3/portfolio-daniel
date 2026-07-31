/**
 * Todo el contenido de este archivo proviene del CV de Daniel
 * (CV_DANIEL_CARMONA.pdf). No se agregó ninguna herramienta, cifra
 * o logro que no apareciera ahí. Si actualizas tu CV, actualiza este
 * archivo a mano — no hay conexión automática entre ambos.
 */

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  note?: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const profile = {
  name: "Daniel",
  fullName: "Daniel Enrique Carmona Cardona",
  role: "Diseñador y desarrollador web",
  location: "Celaya, Guanajuato",
  summary:
    "Estudiante de Ingeniería en Sistemas Computacionales (TecNM Celaya, 9° semestre), con más de 3 años de experiencia multifuncional en una empresa de comercialización de equipo de protección personal: almacén, ventas, análisis de datos y desarrollo web, con participación activa en mejora de procesos y soporte tecnológico.",

  education: [
    {
      degree: "Ingeniería en Sistemas Computacionales",
      institution: "Tecnológico Nacional de México en Celaya",
      period: "ago 2022 – presente (egreso estimado nov 2027)",
    },
    {
      degree: "Técnico en Programación, Bachillerato Técnico",
      institution: "CBTis 198",
      period: "2019 – 2022",
      note: "Mejor promedio de generación: 9.2",
    },
  ] satisfies EducationItem[],

  experience: [
    {
      role: "Analista de Datos y Desarrollo Web",
      company: "King Glove",
      period: "nov 2023 – junio 2026",
      bullets: [
        "Automaticé reportes de inventario y ventas con tablas dinámicas y macros VBA, reduciendo el tiempo de generación.",
        "Diseñé dashboards de KPI para detectar cuellos de botella y apoyar decisiones de compra.",
        "Administré la base de datos del sitio web, incorporando información constantemente.",
        "Rediseñé el sitio en WordPress/Elementor y apliqué SEO on-page y off-page, mejorando el posicionamiento en Google.",
        "Administré campañas en Google Ads y Meta Ads para bajar el costo por adquisición.",
        "Colaboré en estrategias y reportes para incrementar ventas en plataformas como Mercado Libre y Amazon, administrando inventarios y creando proyecciones para impulsar las ventas.",
      ],
    },
    {
      role: "Auxiliar de Almacén",
      company: "King Glove",
      period: "agosto 2023 – enero 2024",
      bullets: [
        "Gestioné recepción, clasificación y despacho de más de 500 SKU de equipo de protección personal.",
        "Concilié inventarios físicos contra Excel.",
        "Di soporte técnico a los equipos de cómputo del área: mantenimiento, periféricos y resolución de fallas de software.",
      ],
    },
    {
      role: "Asesor de Ventas",
      company: "King Glove",
      period: "noviembre 2022 – agosto 2023",
      bullets: [
        "Asesoré a clientes industriales en la selección de equipo de protección conforme a normativa NOM y ANSI/ISEA.",
        "Mantuve al día el CRM y cumplí las metas mensuales de venta.",
        "Diseñé un Forecast para administrar el estimado de compra de los clientes y eficientizar la post venta.",
        "Mantuve y actualicé la base de datos de clientes; generé reportes de seguimiento que contribuyeron a incrementar la tasa de recompra en clientes activos.",
      ],
    },
  ] satisfies ExperienceItem[],

  // Agrupadas tal cual aparecen en el CV, organizadas por área para la
  // sección de habilidades (panel de capacidades, no nube de etiquetas).
  skillGroups: [
    {
      label: "Desarrollo web",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Angular",
        "Node.js",
        "WordPress",
        "WooCommerce",
        "Shopify",
        "Elementor",
      ],
    },
    {
      label: "Datos y automatización",
      skills: ["Python", "Java", "PHP", "VBA", "Excel avanzado", "macros", "MySQL", "Power BI"],
    },
    {
      label: "SEO y marketing digital",
      skills: [
        "SEO",
        "Rank Math SEO",
        "Google Analytics",
        "Search Console",
        "Google Ads",
        "Meta Ads",
        "Smush",
      ],
    },
  ] satisfies SkillGroup[],

  certifications: [
    { name: "Introduction to Networks", issuer: "Cisco Networking Academy", year: "2025" },
    {
      name: "CCNA: Switching, Routing and Wireless Essentials",
      issuer: "Cisco",
      year: "2026",
    },
    { name: "Ethical Hacker", issuer: "Cisco Networking Academy", year: "2026" },
  ] satisfies Certification[],

  languages: [
    { label: "Inglés", level: "Avanzado (lectura técnica, escritura, oral profesional)" },
    { label: "Español", level: "Nativo" },
    { label: "Francés", level: "Básico" },
  ],
};
