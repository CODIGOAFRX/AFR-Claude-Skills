# AFR · Claude Skills

El estante de skills y herramientas externas que uso con Claude Code: qué hace cada una, de quién es y cómo instalarla, con una demo hecha a la manera de su skill.

**En vivo:** [pedrogomez.dev/proyecto/skills](https://pedrogomez.dev/proyecto/skills/)

- **Una ficha por skill.** Autor, licencia, estrellas, estado (global, por proyecto, opcional, solo ideas, en el radar), botón para copiar el comando y, cuando lo hay, el prompt que se le pega a Claude para instalarla.
- **Una demo por skill**, hecha con la idea de esa skill:
  - `gpt-taste` apila cartas con GSAP ScrollTrigger;
  - `minimalist-ui` es un bento plano;
  - `industrial-brutalist-ui` es un expediente desclasificado;
  - `SkillUI` extrae de verdad el sistema de diseño de la propia página;
  - `find-skills` busca en este catálogo.
- **Buscador y filtros por estado.**
- **Sin framework:** Vite, TypeScript y CSS. GSAP solo para la sección de `gpt-taste`, cargado bajo demanda. Con «reducir movimiento» activado, todo se queda quieto y se maneja a mano.

## Añadir una skill

1. Añade una entrada en [`src/data.ts`](src/data.ts).
2. Si quieres demo, escribe su función en [`src/demos.ts`](src/demos.ts) y regístrala en `DEMOS`. Sin demo, márcala `compacta: true` y sale como ficha pequeña.
3. Añádela también a [`SKILLS.md`](SKILLS.md), el catálogo en texto.

## Desarrollo

```
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/proyecto/skills
npm run deploy   # Cloudflare Workers, ruta pedrogomez.dev/proyecto/skills
```

## Créditos

Las descripciones son mías. Cada skill pertenece a su autor y tiene su propia licencia: el enlace de cada ficha lleva a su repositorio. Las demos son ilustraciones propias, no código de esas skills.
