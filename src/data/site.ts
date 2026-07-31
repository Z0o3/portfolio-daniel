/**
 * Configuración central del sitio.
 * Cambia aquí los datos de contacto y disponibilidad — no los repitas
 * manualmente en los componentes.
 */

export const site = {
  name: "Daniel",
  fullName: "Daniel Enrique Carmona Cardona",
  tagline: "Web Designer & Developer",
  title: "Daniel | Diseño y desarrollo web para negocios",
  description:
    "Portafolio de Daniel, diseñador y desarrollador de páginas web para negocios de Veterinaria, Salud, Belleza e Industria.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "es-MX",

  // Marca esto en false si por ahora no buscas nuevos proyectos.
  availableForWork: true,

  // Número con código de país, sin espacios ni símbolos (formato wa.me).
  // Si el enlace no abre el chat correctamente en algunos teléfonos con
  // números mexicanos, prueba anteponiendo un "1" tras el "52"
  // (521 4613154489) — es una particularidad conocida de WhatsApp con
  // números de México migrados antes de 2021.
  whatsappNumber: "524613154489",
  whatsappDefaultMessage:
    "Hola Daniel, vi tu portafolio y me gustaría solicitar información para crear una página web.",

  email: "danicarcardona@hotmail.com",
  github: "https://github.com/Z0o3",
  // Sin LinkedIn por ahora — el botón se oculta automáticamente si está vacío.
  linkedin: "",

  // Solo se muestra el botón "Ver mi CV" si este archivo existe en /public/cv/
  // y hasCv está en true. Ya se incluyó tu CV real en el proyecto.
  cvPath: "/cv/daniel-cv.pdf",
  hasCv: true,
};

export function buildWhatsAppLink(message: string = site.whatsappDefaultMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${encoded}`;
}

export function buildMailtoLink(subject = "Quiero solicitar una página web") {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
