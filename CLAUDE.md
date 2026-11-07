# AFR · Claude Skills

Landing estática con el estante de skills externas que uso con Claude Code: una ficha y una demo por skill, buscador, filtros y packs para copiar. Vite + TypeScript sin framework; GSAP solo para la demo de `gpt-taste`, cargado bajo demanda. Se publica en `pedrogomez.dev/proyecto/skills` con un Worker de Cloudflare (`npm run deploy`) y el código vive en github.com/CODIGOAFRX/AFR-Claude-Skills.

- **Catálogo:** `src/data.ts` (skills, bloques, packs y plantilla «Misión»). Cada skill nueva va también en `SKILLS.md`.
- **Demos:** `src/demos.ts`, una función por skill registrada en `DEMOS`. Con `prefers-reduced-motion` todas se quedan quietas.
- **Textos:** en español, descripciones escritas con mis palabras, nunca copiadas de los repos.
- **Diseño:** el mundo «cinta de recopilación» está en `DESIGN.md` (tokens en `.impeccable/design.json`), el producto en `PRODUCT.md` y el contrato de dirección en `.impeccable/surfaces/index-html.md`. Cualquier cambio visual parte de ahí.

## Skills de este proyecto

| Herramienta | Dónde | Cuándo usarla |
|---|---|---|
| Impeccable | `.claude/skills/impeccable` + hooks en `.claude/settings.local.json` | Init ya hecho (`PRODUCT.md`). `/impeccable audit` o `critique` antes de dar un diseño por terminado; `polish`, `bolder` o `quieter` para afinar. |
| untangle-codebase (Caldo AI) | `.claude/skills/untangle-codebase` | Se lanza a mano con `/untangle-codebase` cuando `demos.ts` o `styles.css` crezcan a base de parches. |
| scroll-world | plugin de proyecto (`.claude/settings.json`) | Landings de «vuelo por un mundo». Genera imagen y vídeo con servicios de pago (Monid o Higgsfield): no generar nada sin preguntar. |
| Subagentes VoltAgent | `.claude/agents/` | `typescript-pro` (tipos y config), `frontend-developer` (componentes y demos), `ui-designer` (dirección visual), `code-reviewer` (antes de cada push), `accessibility-tester` (foco, contraste, movimiento reducido). |
| Taste Skill | global (plugin) | `design-taste-frontend` para decisiones de diseño; la skill de cada sección para su demo (`gpt-taste`, `minimalist-ui`…). |
| UI UX Pro Max | global (`~/.claude/skills`) | Paletas, tipografías y pautas de UX con datos. |
| web-design-guidelines | global | «Revisa mi UI» antes de publicar. |
| playwright-cli | global | Abrir la landing en un navegador real y comprobar demos, filtros y botones de copiar. |
| find-skills | global | Buscar skills nuevas para el estante. |
| Claude Mem | global (plugin) | Memoria entre sesiones, automática. |
