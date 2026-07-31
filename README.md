# Portafolio de Daniel — Blue Sector Atlas

Portafolio web personal construido con Next.js (App Router), TypeScript, Tailwind
CSS y Framer Motion. Sitio 100% estático, sin base de datos, sin backend y sin
panel administrativo — todo el contenido vive en archivos de datos dentro de
`src/data/`. No usa fotografías ni capturas de pantalla; las tarjetas de
proyecto son solo texto/datos.

## 1. Instalar dependencias

Necesitas Node.js 18.18 o superior.

```bash
npm install
```

## 2. Ejecutar el proyecto en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para probar la build de producción localmente:

```bash
npm run build
npm run start
```

## 3. Cambiar tus datos personales

Todo tu perfil (resumen, educación, experiencia, habilidades, certificaciones,
idiomas) vive en:

```
src/data/profile.ts
```

Ese contenido se extrajo de tu CV, más las habilidades que confirmaste
directamente (React, Angular, Node.js). Si actualizas tu CV, edita este
archivo a mano — no hay una conexión automática entre ambos documentos.

Los datos de contacto, disponibilidad y el enlace de WhatsApp están
centralizados en:

```
src/data/site.ts
```

Ahí puedes cambiar: correo, WhatsApp, GitHub, LinkedIn (déjalo como cadena
vacía `""` para ocultar el botón), si estás disponible para nuevos proyectos
(`availableForWork`), y si el botón "Ver mi CV" debe mostrarse (`hasCv`).

## 4. Agregar o editar proyectos

Todos los proyectos están en:

```
src/data/projects.ts
```

Actualmente tiene tus 8 proyectos reales:

| # | Proyecto | Sector | URL |
|---|----------|--------|-----|
| 1 | Clínica Veterinaria de Especialidades Acanceh | Veterinarias | acanceh.vercel.app |
| 2 | K-NITO Consultorio Veterinario | Veterinarias | k-nitoveterinaria.vercel.app |
| 3 | Innovación Dental | Salud | innovacion-dental.vercel.app |
| 4 | Ortodem | Salud | ortodem.com |
| 5 | Clínica Dental El Rocío | Salud | clinicadentalelrocio.com |
| 6 | Vanité Beauty Lounge | Belleza | vanitebeautylounge.my.canva.site |
| 7 | Paradise Beauty Center & Barber | Belleza | paradisebeautycenter.com |
| 8 | King Glove | Industria | kingglove.com |

### Cómo agregar un proyecto nuevo

Agrega un objeto al arreglo `projects` siguiendo esta forma:

```ts
{
  id: 9,
  slug: "nombre-del-proyecto",
  title: "Nombre del proyecto",
  category: "Veterinarias", // o "Salud" | "Belleza" | "Industria"
  description: "Descripción breve de una línea.",
  longDescription: "Descripción más detallada (opcional).",
  url: "https://url-del-proyecto.com",
  technologies: ["WordPress", "Elementor"],
  year: "2026", // opcional, déjalo como "" si no lo quieres mostrar
  featured: false, // true = la tarjeta ocupa dos columnas
  status: "Publicado", // o "Demostración"
}
```

## 5. Cambiar URLs de los proyectos

Edita el campo `url` de cada proyecto en `src/data/projects.ts`. Si un
proyecto no tiene URL todavía, déjalo como cadena vacía `""` — la tarjeta
mostrará "Enlace pendiente" en vez de un botón roto.

## 6. Agregar o reemplazar tu CV

Tu CV real ya está incluido en:

```
public/cv/daniel-cv.pdf
```

El botón "Ver mi CV" en la sección "Sobre mí" apunta ahí automáticamente. Si
quieres reemplazarlo, sobrescribe ese archivo (mantén el mismo nombre) o
cambia la ruta en `src/data/site.ts` (`cvPath`).

## 7. Cambiar el número de WhatsApp

Edita `whatsappNumber` en `src/data/site.ts`. Debe incluir el código de país
sin espacios ni símbolos (por ejemplo `524613154489`).

> Nota: algunos números mexicanos registrados antes de 2021 necesitan un "1"
> extra después del "52" para que `wa.me` abra el chat correctamente
> (`5214613154489`). Si el botón no abre tu chat como esperas, prueba con ese
> formato.

El mensaje predeterminado se edita en `whatsappDefaultMessage`, en el mismo
archivo. El enlace se construye una sola vez con `buildWhatsAppLink()` y se
reutiliza en el botón flotante y en la sección de contacto — no lo repitas
manualmente en ningún componente.

## 8. Configurar NEXT_PUBLIC_SITE_URL

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Y coloca tu dominio real una vez que lo tengas:

```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

Esta variable se usa para el `metadataBase`, el canonical, Open Graph y el
sitemap. Mientras no la configures, el sitio usa `http://localhost:3000` como
respaldo solo en desarrollo.

## 9. Publicar en Vercel

1. Sube el proyecto a un repositorio en tu GitHub (`https://github.com/Z0o3`).
2. Entra a [vercel.com](https://vercel.com) e importa el repositorio.
3. Agrega la variable de entorno `NEXT_PUBLIC_SITE_URL` con tu dominio final
   de Vercel (o tu dominio propio) en la configuración del proyecto.
4. Despliega. Vercel detecta Next.js automáticamente — no necesitas
   configuración adicional.

## Estructura del proyecto

```
src/
  app/
    layout.tsx        Metadatos SEO, JSON-LD, fuentes, elementos globales
    page.tsx           Composición de todas las secciones
    globals.css        Paleta de colores y tokens de diseño (Tailwind v4)
    robots.ts           robots.txt generado
    sitemap.ts          sitemap.xml generado
  components/          Un componente por sección/pieza de UI
  data/
    site.ts            Contacto, WhatsApp, disponibilidad, feature flags
    profile.ts          Contenido extraído del CV + habilidades confirmadas
    projects.ts          Los 8 proyectos del portafolio
    navigation.ts        Enlaces del menú
  lib/
    utils.ts            Helper cn() para clases condicionales
public/
  cv/daniel-cv.pdf       Tu CV real
  favicon.svg
```

## Pendiente / a revisar

- **`NEXT_PUBLIC_SITE_URL`**: configúralo cuando tengas el dominio final de
  Vercel.
- **LinkedIn**: no incluido a propósito; el botón aparece automáticamente si
  algún día agregas una URL en `site.ts` (`linkedin`).
- **Clínica Dental El Rocío**: el sitio en vivo dice en su pie de página
  "Sitio diseñado por NoneSoft". Revísalo antes de publicar — puede que la URL
  no sea la correcta, o que tu participación haya sido en otra parte del
  proyecto (contenido, SEO, etc.) y valga la pena aclararlo en la descripción.
