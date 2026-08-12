export type ProjectCategory = "Veterinarias" | "Salud" | "Belleza" | "Industria" | "Gimnasios";

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;
  url: string;
  technologies: string[];
  year: string;
  featured: boolean;
  status: "Publicado" | "Demostración";
  updatedAt: string; // ISO "YYYY-MM-DD" — se muestra como "Actualizado: <fecha>" en la tarjeta
};

/**
 * Cómo agregar un proyecto nuevo: ver README.md, sección
 * "Cómo agregar un proyecto nuevo".
 */
export const projects: Project[] = [
  {
    id: 1,
    slug: "clinica-veterinaria-acanceh",
    title: "Clínica Veterinaria de Especialidades Acanceh",
    category: "Veterinarias",
    description:
      "Landing page para una clínica veterinaria que atiende las 24 horas, con reservación por WhatsApp.",
    url: "https://acanceh.vercel.app/",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 2,
    slug: "k-nito-veterinaria",
    title: "K-NITO Consultorio Veterinario",
    category: "Veterinarias",
    description:
      "Sitio para un consultorio veterinario en Celaya: consulta, cirugía, vacunación y agenda de citas por WhatsApp.",
    url: "https://k-nitoveterinaria.vercel.app/",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 3,
    slug: "innovacion-dental",
    title: "Innovación Dental",
    category: "Salud",
    description:
      "Sitio para un consultorio dental en Querétaro, con servicios explicados paso a paso y agenda por WhatsApp.",
    url: "https://innovacion-dental.vercel.app/",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 4,
    slug: "ortodem",
    title: "Ortodem",
    category: "Salud",
    description:
      "Sitio para una clínica dental con siete especialidades y dos sucursales en Querétaro, con reservación en línea.",
    url: "https://ortodem.com/",
    technologies: ["Next.js"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 5,
    slug: "clinica-dental-el-rocio",
    title: "Clínica Dental El Rocío",
    category: "Salud",
    description:
      "Sitio para una clínica dental con dos sucursales en Querétaro y atención de urgencias 24/7.",
    url: "https://clinicadentalelrocio.com/",
    technologies: ["GoHighLevel"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 6,
    slug: "vanite-beauty-lounge",
    title: "Vanité Beauty Lounge",
    category: "Belleza",
    description: "Sitio de presentación para un salón de belleza, construido en Canva Sites.",
    url: "https://vanitebeautylounge.my.canva.site/oficial-vanite",
    technologies: ["Canva Sites"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 7,
    slug: "paradise-beauty-center",
    title: "Paradise Beauty Center & Barber",
    category: "Belleza",
    description:
      "Catálogo de servicios y tienda en línea para un salón de belleza y barbería en Querétaro.",
    url: "https://paradisebeautycenter.com/",
    technologies: ["WordPress", "WooCommerce"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-07-31",
  },
  {
    id: 8,
    slug: "king-glove",
    title: "King Glove",
    category: "Industria",
    description:
      "Rediseño del sitio de una empresa de equipo de protección personal, con SEO on/off-page y campañas de Google Ads y Meta Ads.",
    url: "https://kingglove.com/",
    technologies: ["WordPress", "Elementor"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-02-15",
  },
  {
    id: 9,
    slug: "animal-house",
    title: "Animal House",
    category: "Veterinarias",
    description:
      "Sitio para una clínica veterinaria en Apodaca, Nuevo León: consulta, cirugía, diagnóstico y atención para perros, gatos y animales exóticos.",
    url: "https://github.com/Z0o3/animal-house",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-08-07",
  },
  {
    id: 10,
    slug: "4u-wellness-gym",
    title: "4U Wellness Gym",
    category: "Gimnasios",
    description:
      "Sitio para el gimnasio 4U Wellness Gym: presentación de planes, clases y contacto para agendar. Repo: https://github.com/Z0o3/4u-gym",
    url: "https://4u-wellness-gym.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "",
    featured: false,
    status: "Publicado",
    updatedAt: "2026-08-10",
  },
];

export const categories: ProjectCategory[] = ["Veterinarias", "Salud", "Belleza", "Industria", "Gimnasios"];
