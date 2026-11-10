# AFR · Claude Skills — catálogo

Las skills y herramientas **externas** que uso con Claude Code: las que he instalado o probado yo. No están las que ya vienen de serie con Claude (docx, pdf, pptx, xlsx, code-review, loop…).

Revisado el 10 de noviembre de 2026 contra el disco y contra cada repositorio. Las estrellas son las de GitHub ese día.

**95 entradas en 12 bloques**, más una plantilla de prompt:

| Bloque | Entradas |
|---|---|
| [1. Dirección de arte · Taste Skill](#1-dirección-de-arte--taste-skill) | 13 |
| [Mundos con scroll](#mundos-con-scroll) | 1 |
| [2. Sistema de diseño · UI UX Pro Max](#2-sistema-de-diseño--ui-ux-pro-max) | 7 |
| [3. Pulir y copiar estilos](#3-pulir-y-copiar-estilos) | 3 |
| Animación de interfaz | 20 |
| [4. Revisar, probar y ordenar](#4-revisar-probar-y-ordenar) | 4 |
| [5. Presentaciones](#5-presentaciones) | 5 |
| Vídeo: guion, efectos y sonido | 12 |
| Taller de motion | 20 |
| [6. Agentes y automatización](#6-agentes-y-automatización) | 3 |
| [7. Memoria y conocimiento](#7-memoria-y-conocimiento) | 2 |
| Referencias | 5 |
| [Extra · Plantilla de prompt «Misión»](#extra--plantilla-de-prompt-misión) | 1 |

**Estados:**

| Estado | Qué significa |
|---|---|
| **Global** | Instalada en `~/.claude`, funciona en todos los proyectos. |
| **Por proyecto** | Se instala dentro de cada proyecto con el prompt de su `.txt`. |
| **Opcional** | Útil, pero con letra pequeña: se solapa con otras o instala servicios. |
| **Solo ideas** | La descargué y la leí, pero no la uso para construir. |
| **En el radar** | No la he descargado. |

---

## 1. Dirección de arte · Taste Skill

- **Repo:** [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) · MIT · ★ 111 k
- **Estado:** Global, como plugin `taste-skill@taste-skill`.
- **Instalar:**
  ```
  claude plugin marketplace add Leonxlnx/taste-skill
  claude plugin install taste-skill@taste-skill --scope user
  ```

Son skills «antislop»: dan criterio de dirección de arte para que las webs no parezcan plantillas de IA.

| Skill | Qué hace |
|---|---|
| `design-taste-frontend` | La principal (v2): lee el brief, elige la dirección de diseño y entrega landings y portfolios con chequeo previo estricto. |
| `design-taste-frontend-v1` | La v1 original, para proyectos que dependan de su comportamiento exacto. |
| `gpt-taste` | Motion con GSAP: estructura AIDA, tipografía editorial ancha, bento sin huecos, ScrollTrigger con pin, apilado y scrub. |
| `high-end-visual-design` | Diseña como una agencia cara: fuentes, espaciado, sombras y animaciones concretas, y prohíbe los defaults baratos. |
| `minimalist-ui` | Editorial limpio: monocromo cálido, contraste tipográfico, bento plano. Sin degradados ni sombras fuertes. |
| `industrial-brutalist-ui` | Imprenta suiza más terminal militar: rejilla rígida, escala tipográfica extrema, degradación analógica. |
| `redesign-existing-projects` | Audita una web existente y la sube a calidad premium sin romper lo que funciona. |
| `image-to-code` | Genera primero la imagen del diseño, la analiza y luego la implementa fiel en código. |
| `imagegen-frontend-web` | Referencias de diseño web: una imagen horizontal por sección, con una sola paleta. |
| `imagegen-frontend-mobile` | Conceptos de pantallas de app dentro de un mockup de teléfono. Solo imágenes. |
| `stitch-design-taste` | Genera `DESIGN.md` para Google Stitch con reglas de tipografía, color y maquetación. |
| `full-output-enforcement` | Impide que el modelo recorte el código con «…resto igual». |
| `brandkit` | Láminas de guía de marca: sistemas de logo, decks de identidad, mundos visuales. |

## Mundos con scroll

| Skill | Repo | Estado | Qué hace |
|---|---|---|---|
| `scroll-world` | [oso95/scroll-world](https://github.com/oso95/scroll-world) · MIT · ★ 10,8 k | Por proyecto | Convierte cualquier marca en una landing de «vuelo por un mundo»: genera dioramas isométricos con IA y los vídeos de cámara entre ellos, y el scroll los avanza fotograma a fotograma, sin cortes. |

- **Instalar:**
  ```
  claude plugin marketplace add oso95/scroll-world
  claude plugin install scroll-world@scroll-world --scope project
  ```
- **Ojo:** genera imagen y vídeo con servicios de pago, la CLI de Monid (unos 27 $ por un vuelo de 6 escenas) o créditos de Higgsfield, y necesita ffmpeg y Python con Pillow.

## 2. Sistema de diseño · UI UX Pro Max

- **Repo:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · MIT · ★ 146 k · autor en las skills: `claudekit`
- **Estado:** Global.
- **Instalar:** `npx -y ui-ux-pro-max-cli init --ai claude --global`

| Skill | Qué hace |
|---|---|
| `ui-ux-pro-max` | Datos de diseño consultables: 50 estilos, 192 paletas por tipo de producto, 74 parejas tipográficas, 119 pautas de UX, 25 tipos de gráfico y 22 stacks. |
| `design` | Identidad de marca, logos (55 estilos), identidad corporativa con mockups, iconos SVG, banners y fotos para redes. |
| `brand` | Voz de marca, identidad visual, marcos de mensaje y coherencia entre piezas. |
| `design-system` | Tokens en tres capas (primitivo → semántico → componente), escalas de espaciado y tipografía, especificación de componentes. |
| `banner-design` | Banners para redes, anuncios, héroes web e impresión, en 22 estilos. |
| `slides` | Presentaciones HTML con Chart.js, tokens y fórmulas de copy. |
| `ui-styling` | Interfaces con shadcn/ui (Radix + Tailwind), modo oscuro y componentes accesibles. |

## 3. Pulir y copiar estilos

| Herramienta | Repo | Estado | Qué hace |
|---|---|---|---|
| **Impeccable** | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · Apache-2.0 · ★ 105 k | Por proyecto | Vocabulario de diseño para el agente: `/impeccable audit`, `polish`, `critique`, `bolder`, `quieter`… Detecta el aspecto de IA antes de publicar. |
| **Awesome Design MD** | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) · MIT · ★ 126 k | Por proyecto | Colección de `DESIGN.md` que analizan el sistema de diseño de marcas conocidas (Stripe, Linear, Notion, Apple, Vercel…). Pones uno en la raíz y el agente diseña con ese estilo. |
| **SkillUI** | [amaancoderx/npxskillui](https://github.com/amaancoderx/npxskillui) · ★ 2,5 k | Por proyecto | CLI que rastrea una web, un repo o tu código y extrae su sistema de diseño (colores, tipografía, espaciado, animaciones) en una skill. Sin IA ni API keys. |

**Cómo se instalan:**

- **Impeccable:** `npx -y impeccable install --project --providers=claude -y` en la raíz del proyecto (sin esas opciones se instala global, para todos los agentes), y después `/impeccable init`.
- **Awesome Design MD:** se descarga el `DESIGN.md` de la marca a la raíz y se añade una línea en `CLAUDE.md`.
- **SkillUI:** `npx skillui --url <web>`, y el resultado va a `.claude/skills` del proyecto.

## Animación de interfaz

El pack de Emil Kowalski y la skill de transitions.dev: que el agente elija bien la curva, la duración y qué no animar.

| Skill | Repo | Estado | Qué hace |
|---|---|---|---|
| `emil-design-eng` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng) · MIT · ★ 56 k | En el radar | La principal del pack: sobre todo animación, con algo de criterio de diseño. Recoge los fallos pequeños que cometen los agentes y cómo se arreglan. |
| `animate` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/animate) · MIT · ★ 56 k | En el radar | Construye una animación desde cero eligiendo bien la curva, la duración y las propiedades. |
| `review-animations` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/review-animations) · MIT · ★ 56 k | En el radar | Revisa tus animaciones con las reglas de Emil, sin contemplaciones. |
| `improve-animations` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/improve-animations) · MIT · ★ 56 k | En el radar | Audita todas las animaciones del código y devuelve planes priorizados que cualquier agente puede ejecutar por separado. |
| `find-animation-opportunities` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/find-animation-opportunities) · MIT · ★ 56 k | En el radar | Busca en la interfaz los sitios donde el movimiento aportaría de verdad y avisa de lo que no conviene animar. |
| `remove-animations` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/remove-animations) · MIT · ★ 56 k | En el radar | Lo contrario: quita las animaciones que sobran, como el fundido en cada sección o el retardo en cada tooltip. |
| `choreograph` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/choreograph) · MIT · ★ 56 k | En el radar | Coordina varios elementos que se mueven a la vez: quién entra primero, quién le sigue, qué va en paralelo y qué se queda quieto. |
| `animation-performance` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/animation-performance) · MIT · ★ 56 k | En el radar | Arregla las animaciones que pierden fotogramas, con los problemas finos que los agentes suelen pasar por alto. |
| `animation-vocabulary` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/animation-vocabulary) · MIT · ★ 56 k | En el radar | El vocabulario para pedirle a una IA la animación exacta que quieres. |
| `apple-design` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/apple-design) · MIT · ★ 56 k | En el radar | Los principios de Apple sobre interfaz y movimiento fluido, sacados de sus charlas de la WWDC y llevados a la web. |
| `gestures` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/gestures) · MIT · ★ 56 k | En el radar | Arrastres, deslizamientos y hojas que siguen al dedo, conservan la velocidad al soltar y se pueden atrapar a mitad de animación. |
| `prototype` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/prototype) · MIT · ★ 56 k | En el radar | Construye varias versiones de una pieza de interfaz y te deja pasar de una a otra con un selector. |
| `mobile-native` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/mobile-native) · MIT · ★ 56 k | En el radar | Hace que una web se sienta nativa en el móvil: hover pegajoso, el fallo de 100vh, inputs que hacen zoom, zonas seguras y demás. |
| `break-ui` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/break-ui) · MIT · ★ 56 k | En el radar | Intenta romper tu interfaz con los peores datos: nombres larguísimos, listas vacías, cifras enormes. |
| `pick-ui-library` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/pick-ui-library) · MIT · ★ 56 k | En el radar | Elige la librería adecuada para cada tarea entre las que Emil usa, en vez de dejar que la IA escriba un toast a mano. |
| `animate-expo` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/animate-expo) · MIT · ★ 56 k | En el radar | El mismo listón que animate, para React Native y Expo: gestos, hojas, hápticos y transiciones de pantalla. |
| `write-swift` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/write-swift) · MIT · ★ 56 k | En el radar | Swift moderno: tipos por valor, concurrencia de Swift 6, genéricos, rendimiento y Swift Testing. |
| `ask-sonner` | [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills/ask-sonner) · MIT · ★ 56 k | En el radar | La guía de Sonner, la librería de toasts de Emil: montaje, estilos, recetas y arreglos de los problemas habituales. |
| `transitions.dev` | [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) · ★ 6,2 k | En el radar | Enseña al agente movimiento de producto: una biblioteca de más de 27 transiciones listas para producción y comandos para listarlas, revisar el proyecto, aplicarlas y pasar las duraciones sueltas a tokens. **Ojo:** Las transiciones Pro son de pago; la skill principal y la de pulido son gratis. |
| `transitions-polish` | [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) · ★ 6,2 k | En el radar | El complemento de pulido: alinea el movimiento que ya tienes con la escala de tokens de transitions.dev (abrir y cerrar, hover, escalonados y distancias). Solo informa, no edita. |

**Cómo se instala el pack:**

```bash
npx skills@latest add emilkowalski/skills
```

## 4. Revisar, probar y ordenar

| Skill | Repo | Estado | Qué hace | Instalar |
|---|---|---|---|---|
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) · ★ 34 k | Global | Audita la interfaz contra las Web Interface Guidelines de Vercel (pide «revisa mi UI»). | `npx -y skills add vercel-labs/agent-skills --skill web-design-guidelines -g -a claude-code -y` |
| `playwright-cli` | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) · Apache-2.0 · ★ 15 k | Global | Claude abre tu web, la recorre, hace capturas y genera tests de Playwright. | `npm install -g @playwright/cli@latest` y, desde tu carpeta de usuario, `playwright-cli install --skills --global` |
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) · MIT · ★ 38 k | Global | Busca e instala skills cuando preguntas «¿hay alguna skill que haga X?». | `npx skills add vercel-labs/skills --skill find-skills` |
| `untangle-codebase` | [caldoai/skills](https://github.com/caldoai/skills/blob/main/skills/untangle-codebase/SKILL.md) · MIT · ★ 738 | Por proyecto | Refactoriza todo el código de una pasada preguntando «¿estas piezas deberían cambiar juntas?»: apunta vínculos ocultos, vínculos innecesarios y código sobrante, y luego los deshace. Se lanza a mano con `/untangle-codebase`. | `npx -y skills add caldoai/skills -a claude-code -y` (todas las de Caldo AI) |

## 5. Presentaciones

| Skill | Repo | Estado | Qué hace |
|---|---|---|---|
| `frontend-slides` | [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) · MIT · ★ 32 k | Solo ideas | Presentaciones web con las skills de frontend del agente. |
| `html-ppt` | [lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill) · MIT · ★ 9 k | Solo ideas | Estudio de presentaciones HTML: 24 temas, 31 layouts y más de 20 animaciones. |
| `slidev` | [slidevjs/slidev](https://github.com/slidevjs/slidev/tree/main/skills/slidev) · ★ 49 k | En el radar | La skill oficial de Slidev, presentaciones para desarrolladores escritas en Markdown. |
| `slideshow` | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes/tree/main/skills/slideshow) · Apache-2.0 · ★ 82 k | En el radar | Skill de HyperFrames («escribe HTML, renderiza vídeo») para montar pases de diapositivas. |
| `baoyu-slide-deck` | [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-slide-deck) · MIT · ★ 27 k | En el radar | Genera decks como imágenes, sin texto editable. |

**Mis notas:**

- De `frontend-slides` y `html-ppt` solo saqué ideas de ritmo y de cuánto texto poner por diapositiva. No las uso para construir porque generan HTML.
- `slidev` y `slideshow` también generan HTML.
- `baoyu-slide-deck` genera imágenes, sin texto editable.

## 6. Agentes y automatización

| Herramienta | Repo | Estado | Qué hace |
|---|---|---|---|
| **Subagentes de VoltAgent** | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) · MIT · ★ 26 k | Por proyecto | Más de 100 especialistas a los que Claude delega tareas: react-specialist, typescript-pro, code-reviewer, accessibility-tester… |
| **n8n MCP** | [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) · MIT · ★ 23 k | Por proyecto | Servidor MCP para que Claude cree y valide workflows de n8n. |
| **Everything Claude Code (ECC)** | [affaan-m/ECC](https://github.com/affaan-m/ECC) · MIT · ★ 299 k | Opcional | Paquete enorme de skills, agentes, hooks y reglas para Claude Code, Codex, Cursor y otros. |

**Cómo usar cada una:**

- **VoltAgent:** usa como mucho 5 subagentes, los que encajen con el stack del proyecto, y nunca categorías enteras. Van en `.claude/agents`.
- **n8n MCP:** solo si trabajas con n8n. Necesita la URL de tu n8n y una API key, que se saca en Settings → n8n API.
- **ECC:** se solapa con lo que ya tengo y puede llenar el contexto. Mejor el perfil mínimo: `npx ecc-universal@2.2.3 install --profile minimal --target claude`.

## 7. Memoria y conocimiento

| Herramienta | Repo | Estado | Qué hace |
|---|---|---|---|
| **Claude Mem** | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) · Apache-2.0 · ★ 114 k | Opcional | Memoria automática entre sesiones: captura lo que hace el agente, lo comprime y lo inyecta después. |
| **LightRAG** | [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) · MIT · ★ 41 k | Por proyecto | No es una skill: librería de Python para RAG con grafos de conocimiento, un buscador inteligente sobre tus documentos. |

**Cómo usar cada una:**

- **Claude Mem:** instala un servicio en segundo plano y hooks. Claude Code ya tiene memoria y `CLAUDE.md`, así que pruébalo solo si echas algo en falta. Se instala con `claude plugin marketplace add thedotmack/claude-mem` y `claude plugin install claude-mem`.
- **LightRAG:** solo para apps o agentes que respondan sobre una base de documentos. Va en un entorno virtual del proyecto: `pip install "lightrag-hku[api]"`.

## Referencias

Tampoco son skills: son las webs que se le enseñan al agente para que el resultado no salga genérico.

| Web | Enlace | Estado | Qué hace |
|---|---|---|---|
| **scrolltide.co** | [scrolltide.co](https://scrolltide.co) | Solo ideas | Más de 600 prompts de diseño y 200 componentes con su código para webs 3D y movidas por scroll. |
| **scrollshaders.com** | [scrollshaders.com](https://scrollshaders.com) | Solo ideas | 117 shaders animados en 11 estilos. |
| **backgrounds.supply** | [backgrounds.supply](https://backgrounds.supply) | Solo ideas | Fondos de diseño para no tirar del degradado de siempre. |
| **cta.gallery** | [cta.gallery](https://cta.gallery) | Solo ideas | Galería de llamadas a la acción para inspirarse. |
| **styles.refero.design** | [styles.refero.design](https://styles.refero.design) | Solo ideas | Estilos de diseño sacados de productos reales. |

## Extra · Plantilla de prompt «Misión»

No es una skill: es una forma de pedirle tareas grandes a Claude. Se rellenan los corchetes y se pega.

```
Necesito [resultado que quiero, ej: automatizar el alta de clientes].
1. Analiza cómo se hace ahora.
2. Construye la lógica para conectar [Herramienta A] con [Herramienta B].
3. Si algo falla, crea un plan B que me avise.
4. Haz una prueba y enséñame los resultados.
```

## Packs para copiar

Al final de la landing hay tres botones. Cada uno copia un prompt que se pega en Claude Code, dentro del proyecto:

- **Pack web.** Instala, sin duplicar nada:
  - **Diseño:** Taste Skill, UI UX Pro Max, Impeccable, scroll-world, Awesome Design MD o SkillUI (pregunta antes).
  - **Revisión y pruebas:** web-design-guidelines, playwright-cli y find-skills.
  - **Lo demás:** los subagentes frontend de VoltAgent, las skills de Caldo AI y Claude Mem.

  Después escribe el CLAUDE.md y te recuerda lanzar `/impeccable init`.
- **Pack backend.** Instala los subagentes de VoltAgent de tu lenguaje más code-reviewer, las skills de Caldo AI, Claude Mem y find-skills. n8n MCP y LightRAG solo los instala si el proyecto los necesita.
- **Everything Claude Code.** Va aparte. Antes de instalar te dice qué añade y si choca con lo que ya tienes, instala el perfil mínimo y te deja elegir el resto una a una, porque se come el contexto.
