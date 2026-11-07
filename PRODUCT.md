# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Cualquier desarrollador de la comunidad que trabaje con Claude Code y busque skills buenas, sin conocer a Pedro de antemano. Llega con prisa, a menudo desde un enlace compartido o desde pedrogomez.dev, y quiere salir con algo instalado.

## Product Purpose

AFR · Claude Skills es el estante curado de skills y herramientas externas para Claude Code que usa Pedro Gómez. Cada entrada dice qué hace, de quién es, en qué estado la tiene Pedro (global, por proyecto, opcional, solo ideas, en el radar) y cómo instalarla, con un comando o un prompt listo para pegar.

El éxito tiene tres caras:
- copiar un pack (web, backend o Everything Claude Code) en segundos y pegarlo en Claude Code;
- descubrir skills que el visitante no conocía;
- ver el criterio de Pedro: es una selección con opinión, no una lista agregada.

## Positioning

Lo que otros directorios de skills no pueden copiar: es la selección personal de un desarrollador. Lleva el estado real de uso de cada skill, notas honestas («se come el contexto», «genera vídeo de pago») y packs probados que instalan la combinación que él usa de verdad. Cada skill tiene además una demostración propia en la página.

## Operating Context

- El visitante copia un comando o un prompt y lo pega en Claude Code dentro de su proyecto.
- Los packs instalan skills globales que falten y skills de proyecto, y escriben el CLAUDE.md.
- Pedro añade skills nuevas con frecuencia: el catálogo vive en `src/data.ts` y en `SKILLS.md`.

## Capabilities and Constraints

- **Contenido:** 38 entradas en 8 bloques, buscador, filtro por estado, un bloque de packs y la plantilla de prompt «Misión».
- **Técnica:** sitio estático con Vite y TypeScript, sin framework, desplegado como Worker de Cloudflare en `pedrogomez.dev/proyecto/skills`. Repo público CODIGOAFRX/AFR-Claude-Skills.
- **Copy:** en español, con descripciones escritas con palabras propias, nunca copiadas de los repos. El idioma para un público internacional queda sin decidir.
- **Datos:** las estrellas son fotos fechadas (revisado el 7 nov 2026), no datos en vivo.

## Brand Commitments

- El nombre «AFR · Claude Skills» se mantiene.

## Evidence on Hand

- Catálogo verificado contra cada repositorio: autor, licencia, estrellas y comando de instalación.
- No hay testimonios, métricas de uso ni número de visitantes, y no se deben inventar.

## Product Principles

1. **De la llegada al portapapeles en segundos.** Los packs y los botones de copiar mandan.
2. **Curado y honesto.** Cada skill lleva su estado y su letra pequeña; el criterio de Pedro es el producto.
3. **Enseñar, no describir.** Cada skill se entiende sin abrir su repo.
4. **Fácil de ampliar.** Añadir una skill es añadir una entrada; el diseño tiene que aguantar 38 o 80.

## Accessibility & Inclusion

Respetar `prefers-reduced-motion`: las demos se quedan quietas y se manejan a mano. Botones de copiar accesibles por teclado, con aviso anunciado.
