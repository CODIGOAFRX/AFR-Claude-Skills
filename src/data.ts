// El catálogo entero. Añadir una skill nueva es añadir una entrada aquí y, si se quiere, su demo en demos.ts.
// Las descripciones son mías; las estrellas son las de GitHub el día de `REVISADO`.

export const REVISADO = '10 nov 2026';

export type Estado = 'global' | 'proyecto' | 'opcional' | 'ideas' | 'radar';

export const ESTADOS: Record<Estado, { nombre: string; explica: string }> = {
  global: { nombre: 'Global', explica: 'Instalada en ~/.claude: funciona en todos los proyectos.' },
  proyecto: { nombre: 'Por proyecto', explica: 'Se instala dentro de cada proyecto con su prompt.' },
  opcional: { nombre: 'Opcional', explica: 'Útil, con letra pequeña: se solapa o instala servicios.' },
  ideas: { nombre: 'Solo ideas', explica: 'La leí y saqué ideas, pero no construyo con ella.' },
  radar: { nombre: 'En el radar', explica: 'Todavía no la he descargado.' },
};

export interface Bloque {
  id: string;
  nombre: string;
  lema: string;
  repo?: { url: string; estrellas: string; licencia?: string };
  instalar?: string;
  /** Prompt que graba el bloque entero cuando no hay un único comando de pack. */
  prompt?: string;
}

export interface Skill {
  id: string;
  nombre: string;
  bloque: string;
  autor: string;
  repo: string;
  estrellas?: string;
  licencia?: string;
  estado: Estado;
  hace: string;
  cuando?: string;
  ojo?: string;
  instalar?: string;
  prompt?: string;
  /** Sin demo propia: se pinta como ficha compacta. */
  compacta?: boolean;
  /** Lo que no es una skill: un programa o librería que el agente maneja, o una web de referencia. */
  tipo?: 'herramienta' | 'web';
}

const TASTE = 'https://github.com/Leonxlnx/taste-skill';
const UIPRO = 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill';
const EMIL = 'https://github.com/emilkowalski/skills';
const TRANSITIONS = 'https://github.com/Jakubantalik/transitions.dev';
const HYPERFRAMES = 'https://github.com/heygen-com/hyperframes';

/** Una skill del pack de Emil Kowalski: todas comparten repo y se instalan sueltas con --skill. */
const emil = (id: string, hace: string, cuando?: string): Skill => ({
  id, nombre: id, bloque: 'motion', autor: 'Emil Kowalski', repo: `${EMIL}/tree/main/skills/${id}`, estrellas: '56 k', licencia: 'MIT', estado: 'radar', compacta: true,
  hace, cuando, instalar: `npx skills@latest add emilkowalski/skills --skill ${id}`,
});

/** Una pista en el radar, sin demo propia: su botón graba un prompt genérico de instalación. */
const radar = (bloque: string, id: string, nombre: string, autor: string, repo: string, estrellas: string | undefined, licencia: string | undefined, hace: string, extra: Partial<Skill> = {}): Skill => ({
  id, nombre, bloque, autor, repo: repo.startsWith('http') ? repo : `https://github.com/${repo}`, estrellas, licencia, estado: 'radar', compacta: true, hace, ...extra,
});
const util = (id: string, nombre: string, autor: string, repo: string, estrellas: string, licencia: string | undefined, hace: string) =>
  radar('taller', id, nombre, autor, repo, estrellas, licencia, hace, { tipo: 'herramienta' });
const web = (id: string, url: string, hace: string) =>
  radar('refs', id, url, 'Web', `https://${url}`, undefined, undefined, hace, { tipo: 'web', estado: 'ideas' });

export const BLOQUES: Bloque[] = [
  {
    id: 'taste',
    nombre: 'Dirección de arte',
    lema: 'Taste Skill: criterio para que una web no parezca una plantilla de IA. Cada ficha de este bloque está maquetada con la regla de su skill.',
    repo: { url: TASTE, estrellas: '111 k', licencia: 'MIT' },
    instalar: 'claude plugin marketplace add Leonxlnx/taste-skill\nclaude plugin install taste-skill@taste-skill --scope user',
  },
  {
    id: 'scroll',
    nombre: 'Mundos con scroll',
    lema: 'Landings en las que el scroll mueve una cámara: entra en cada escena y sigue a la siguiente sin cortes.',
  },
  {
    id: 'sistema',
    nombre: 'Sistema de diseño',
    lema: 'UI UX Pro Max y las skills de ClaudeKit que trae: paletas, tipografías, tokens, marca y piezas.',
    repo: { url: UIPRO, estrellas: '146 k', licencia: 'MIT' },
    instalar: 'npx -y ui-ux-pro-max-cli init --ai claude --global',
  },
  { id: 'pulir', nombre: 'Pulir y copiar estilos', lema: 'Para dejar un diseño fino o partir del estilo de una marca o de una web que te guste.' },
  {
    id: 'motion',
    nombre: 'Animación de interfaz',
    lema: 'El pack de Emil Kowalski y la skill de transitions.dev: que el agente elija bien la curva, la duración y qué no animar.',
    repo: { url: EMIL, estrellas: '56 k', licencia: 'MIT' },
    instalar: 'npx skills@latest add emilkowalski/skills',
  },
  { id: 'revisar', nombre: 'Revisar, probar y ordenar', lema: 'Auditar la interfaz, abrirla en un navegador de verdad, desenredar el código y buscar la skill que falta.' },
  {
    id: 'slides',
    nombre: 'Presentaciones',
    lema: 'Las que he mirado para hacer decks. Ninguna construye los míos: todas generan HTML o imágenes, así que me quedo con sus ideas de ritmo.',
    prompt: `Instala solo en este proyecto las skills de presentaciones que uso de referencia. Para cada una, lee su README y sigue la instalación que indique para Claude Code; si no trae instalador, copia la carpeta de la skill a .claude/skills.
- frontend-slides | https://github.com/zarazhangrui/frontend-slides
- html-ppt | https://github.com/lewislulu/html-ppt-skill
- slidev | https://github.com/slidevjs/slidev/tree/main/skills/slidev
- slideshow (HyperFrames) | https://github.com/heygen-com/hyperframes/tree/main/skills/slideshow
- baoyu-slide-deck | https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-slide-deck
Antes de instalar dime qué añade cada una y si alguna pide dependencias o servicios de pago. Al acabar, dame una tabla: skill | instalada sí/no | ruta | cuándo usarla.`,
  },
  {
    id: 'video',
    nombre: 'Vídeo: guion, efectos y sonido',
    lema: 'Un equipo de vídeo dentro de Claude Code: montaje con HTML o React, storyboard, efectos y banda sonora.',
    prompt: `Quiero montar vídeo desde Claude Code. Instala solo en este proyecto estas skills, leyendo el README de cada una y siguiendo su instalación para Claude Code:
- HyperFrames | https://github.com/heygen-com/hyperframes
  claude plugin marketplace add heygen-com/hyperframes y claude plugin install hyperframes@hyperframes --scope project
- Remotion skills | https://github.com/remotion-dev/skills
- DirectorSKILL | https://github.com/wuwangzhang1216/DirectorSKILL
- pixelfx | https://github.com/patch-gg/pixelfx
- shader-skills | https://github.com/gokayfem/shader-skills
- ElevenLabs skills | https://github.com/elevenlabs/skills
Las de ElevenLabs necesitan API key y cuenta: pídemela cuando toque y no generes nada de pago sin preguntarme.
Antes de instalar dime qué añade cada una. Al acabar, dame una tabla: skill | instalada sí/no | ruta | cuándo usarla.`,
  },
  {
    id: 'taller',
    nombre: 'Taller de motion',
    lema: 'No son skills: son los veinte programas y librerías abiertos que un agente puede manejar para animar, simular, sonorizar y exportar.',
  },
  { id: 'agentes', nombre: 'Agentes y automatización', lema: 'Especialistas a los que delegar, workflows de n8n y el paquete gordo, con cuidado.' },
  { id: 'memoria', nombre: 'Memoria y conocimiento', lema: 'Que Claude recuerde entre sesiones y que una app responda sobre tus documentos.' },
  { id: 'refs', nombre: 'Referencias', lema: 'Tampoco son skills: son las webs que se le enseñan al agente para que el resultado no salga genérico.' },
];

export const SKILLS: Skill[] = [
  // ——— Dirección de arte · Taste Skill
  {
    id: 'design-taste-frontend', nombre: 'design-taste-frontend', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'La principal del pack. Lee el brief, decide una dirección de diseño y entrega landings y portfolios que no parecen de plantilla, con un chequeo previo estricto.',
    cuando: 'Al empezar cualquier landing, portfolio o rediseño.',
  },
  {
    id: 'gpt-taste', nombre: 'gpt-taste', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Motion con GSAP: estructura AIDA, tipografía editorial ancha, bento sin huecos y ScrollTrigger con pin, apilado y scrub.',
    cuando: 'Cuando la página tiene que contarse con el scroll.',
  },
  {
    id: 'high-end-visual-design', nombre: 'high-end-visual-design', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Diseña como una agencia cara: fuentes, espaciado, sombras, tarjetas y animaciones concretas, y prohíbe los defaults que abaratan.',
    cuando: 'Producto premium, marca de lujo, cualquier cosa que tenga que parecer cara.',
  },
  {
    id: 'minimalist-ui', nombre: 'minimalist-ui', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Editorial limpio: monocromo cálido, contraste tipográfico, bento plano y pasteles apagados. Sin degradados ni sombras fuertes.',
    cuando: 'Blogs, documentación, herramientas que tienen que respirar.',
  },
  {
    id: 'industrial-brutalist-ui', nombre: 'industrial-brutalist-ui', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Imprenta suiza cruzada con terminal militar: rejilla rígida, escala tipográfica extrema, color utilitario y degradación analógica.',
    cuando: 'Dashboards con muchos datos o portfolios que quieran parecer un plano desclasificado.',
  },
  {
    id: 'redesign-existing-projects', nombre: 'redesign-existing-projects', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Audita una web que ya existe y la sube a calidad premium sin romper lo que funciona. Sirve con cualquier framework o CSS a pelo.',
    cuando: 'Webs heredadas, de clientes o tuyas de hace años.',
  },
  {
    id: 'image-to-code', nombre: 'image-to-code', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Primero genera la imagen del diseño, la analiza a fondo y después la implementa en código lo más fiel posible.',
    cuando: 'Cuando lo visual manda y quieres ver el diseño antes de escribir HTML.',
  },
  {
    id: 'imagegen-frontend-web', nombre: 'imagegen-frontend-web', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Genera referencias de diseño web: una imagen horizontal por cada sección, con composiciones y llamadas a la acción variadas y una sola paleta.',
    cuando: 'Para enseñar una propuesta antes de programar, sección a sección.',
  },
  {
    id: 'imagegen-frontend-mobile', nombre: 'imagegen-frontend-mobile', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Conceptos de pantallas de app para iOS y Android, coherentes entre sí y dentro de un mockup de teléfono. Solo imágenes, no código.',
    cuando: 'Para pensar un flujo móvil antes de abrir Figma o el editor.',
  },
  {
    id: 'stitch-design-taste', nombre: 'stitch-design-taste', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Escribe un DESIGN.md para Google Stitch con reglas estrictas de tipografía, color calibrado, maquetación asimétrica y movimiento.',
    cuando: 'Si diseñas con Stitch o quieres un DESIGN.md que otro agente entienda.',
  },
  {
    id: 'full-output-enforcement', nombre: 'full-output-enforcement', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Impide que el modelo recorte el código con «…el resto igual» y le obliga a partir bien las respuestas que no caben.',
    cuando: 'Archivos largos, componentes enteros, cualquier entrega que tenga que ser completa.',
  },
  {
    id: 'brandkit', nombre: 'brandkit', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global',
    hace: 'Láminas de guía de marca: sistemas de logo, decks de identidad y mundos visuales, con composición cuidada y poca tipografía.',
    cuando: 'Al arrancar una marca o presentar una identidad.',
  },
  {
    id: 'design-taste-frontend-v1', nombre: 'design-taste-frontend-v1', bloque: 'taste', autor: 'Leon Lin', repo: TASTE, estrellas: '111 k', licencia: 'MIT', estado: 'global', compacta: true,
    hace: 'La primera versión de design-taste-frontend, conservada tal cual para proyectos que dependan de su comportamiento exacto. Para lo nuevo, la v2.',
  },

  // ——— Mundos con scroll
  {
    id: 'scroll-world', nombre: 'scroll-world', bloque: 'scroll', autor: 'cyw', repo: 'https://github.com/oso95/scroll-world', estrellas: '10,8 k', licencia: 'MIT', estado: 'proyecto',
    hace: 'Convierte cualquier marca en una landing de «vuelo por un mundo»: genera dioramas isométricos con IA y los vídeos de cámara entre ellos, y el scroll los avanza fotograma a fotograma, sin cortes. El motor de scrub es JavaScript a pelo y sirve con cualquier stack.',
    cuando: 'Landings de producto o de marca que tengan que impresionar al primer scroll.',
    ojo: 'Genera imágenes y vídeo con servicios de pago: la CLI de Monid (un vuelo de 6 escenas en 1080p sale por unos 27 $) o créditos de Higgsfield. También necesita ffmpeg y Python con Pillow.',
    instalar: 'claude plugin marketplace add oso95/scroll-world\nclaude plugin install scroll-world@scroll-world',
    prompt: 'Instala la skill scroll-world (https://github.com/oso95/scroll-world) como plugin de este proyecto:\n"claude plugin marketplace add oso95/scroll-world" y "claude plugin install scroll-world@scroll-world --scope project".\nDespués comprueba si tengo ffmpeg, Python con Pillow y la CLI de Monid o la de Higgsfield, y dime qué me falta antes de generar nada.',
  },

  // ——— Sistema de diseño · UI UX Pro Max
  {
    id: 'ui-ux-pro-max', nombre: 'ui-ux-pro-max', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'La skill madre: datos de diseño consultables con 50 estilos, 192 paletas por tipo de producto, 74 parejas tipográficas, 119 pautas de UX, 25 tipos de gráfico y 22 stacks.',
    cuando: 'Siempre que haya que elegir paleta, fuentes o estilo con criterio y no a ojo.',
  },
  {
    id: 'design', nombre: 'design', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'El paraguas: identidad de marca, logos en 55 estilos, programa de identidad corporativa con mockups, iconos SVG, banners y fotos para redes.',
    cuando: 'Logos, iconos y piezas de identidad.',
  },
  {
    id: 'brand', nombre: 'brand', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'Voz de marca, identidad visual, marcos de mensaje, gestión de assets y coherencia entre todas las piezas.',
    cuando: 'Para que los textos y las piezas suenen a la misma marca.',
  },
  {
    id: 'design-system', nombre: 'design-system', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'Tokens en tres capas (primitivo, semántico y componente), variables CSS, escalas de espaciado y tipografía y especificación de componentes.',
    cuando: 'Cuando el proyecto va a crecer y hace falta un sistema, no colores sueltos.',
  },
  {
    id: 'banner-design', nombre: 'banner-design', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'Banners para redes, anuncios, cabeceras web e impresión, con varias direcciones de arte y 22 estilos.',
    cuando: 'Una misma campaña en todos los formatos.',
  },
  {
    id: 'slides', nombre: 'slides', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'Presentaciones HTML estratégicas con Chart.js, tokens de diseño, maquetación adaptable y fórmulas de copy.',
    cuando: 'Decks con datos que vayan a verse en el navegador.',
  },
  {
    id: 'ui-styling', nombre: 'ui-styling', bloque: 'sistema', autor: 'ClaudeKit', repo: UIPRO, estrellas: '146 k', licencia: 'MIT', estado: 'global',
    hace: 'Interfaces con shadcn/ui (Radix y Tailwind): modo oscuro, componentes accesibles como diálogos, desplegables y formularios, y diseño en canvas.',
    cuando: 'Proyectos React con Tailwind.',
  },

  // ——— Pulir y copiar estilos
  {
    id: 'impeccable', nombre: 'Impeccable', bloque: 'pulir', autor: 'Paul Bakaus', repo: 'https://github.com/pbakaus/impeccable', estrellas: '105 k', licencia: 'Apache-2.0', estado: 'proyecto',
    hace: 'Vocabulario de diseño para el agente: /impeccable audit, polish, critique, bolder, quieter… Detecta el aspecto de IA antes de publicar.',
    cuando: 'Proyectos web que quieras dejar con aspecto profesional, como un portfolio.',
    instalar: 'npx -y impeccable install --project --providers=claude -y',
    prompt: 'Instala la skill Impeccable solo en este proyecto: ejecuta "npx -y impeccable install --project --providers=claude -y"\nen la raíz del proyecto (repo oficial: https://github.com/pbakaus/impeccable).\nDespués dime cómo lanzar "/impeccable init" para configurarla.',
  },
  {
    id: 'awesome-design-md', nombre: 'Awesome Design MD', bloque: 'pulir', autor: 'VoltAgent', repo: 'https://github.com/VoltAgent/awesome-design-md', estrellas: '126 k', licencia: 'MIT', estado: 'proyecto',
    hace: 'Una colección de DESIGN.md que analizan el sistema de diseño de marcas conocidas. Pones uno en la raíz del proyecto y el agente diseña con ese estilo.',
    cuando: 'Al empezar un diseño y querer una referencia clara.',
    prompt: 'Descarga el DESIGN.md de la marca [MARCA] desde https://github.com/VoltAgent/awesome-design-md\ny ponlo en la raíz de este proyecto. A partir de ahora usa ese DESIGN.md como guía de diseño\ny añade una línea en el CLAUDE.md del proyecto para que siempre lo tengas en cuenta.',
  },
  {
    id: 'skillui', nombre: 'SkillUI', bloque: 'pulir', autor: 'Amaan Khan', repo: 'https://github.com/amaancoderx/npxskillui', estrellas: '2,5 k', estado: 'proyecto',
    hace: 'Una CLI que rastrea una web, un repo o tu código y extrae su sistema de diseño (colores, tipografía, espaciado, animaciones) en una skill que Claude lee sola. Sin IA ni API keys.',
    cuando: 'Cuando ves una web y piensas «quiero que lo mío se vea así».',
    instalar: 'npx skillui --url https://la-web-que-te-gusta.com',
    prompt: 'Usa SkillUI (npm "skillui", repo https://github.com/amaancoderx/npxskillui) para extraer\nel sistema de diseño de [URL]. Instálalo si hace falta, genera la skill y colócala en\n.claude/skills de este proyecto para que la uses al diseñar.',
  },

  // ——— Animación de interfaz · Emil Kowalski y transitions.dev
  emil('emil-design-eng', 'La principal del pack: sobre todo animación, con algo de criterio de diseño. Recoge los fallos pequeños que cometen los agentes y cómo se arreglan.', 'Como base en cualquier interfaz que se mueva.'),
  emil('animate', 'Construye una animación desde cero eligiendo bien la curva, la duración y las propiedades.', 'Cuando hace falta una animación nueva y no quieres un ease-in donde iba un ease-out.'),
  emil('review-animations', 'Revisa tus animaciones con las reglas de Emil, sin contemplaciones.', 'Antes de dar por buena una interacción.'),
  emil('improve-animations', 'Audita todas las animaciones del código y devuelve planes priorizados que cualquier agente puede ejecutar por separado.'),
  emil('find-animation-opportunities', 'Busca en la interfaz los sitios donde el movimiento aportaría de verdad y avisa de lo que no conviene animar.'),
  emil('remove-animations', 'Lo contrario: quita las animaciones que sobran, como el fundido en cada sección o el retardo en cada tooltip.'),
  emil('choreograph', 'Coordina varios elementos que se mueven a la vez: quién entra primero, quién le sigue, qué va en paralelo y qué se queda quieto.'),
  emil('animation-performance', 'Arregla las animaciones que pierden fotogramas, con los problemas finos que los agentes suelen pasar por alto.'),
  emil('animation-vocabulary', 'El vocabulario para pedirle a una IA la animación exacta que quieres.'),
  emil('apple-design', 'Los principios de Apple sobre interfaz y movimiento fluido, sacados de sus charlas de la WWDC y llevados a la web.'),
  emil('gestures', 'Arrastres, deslizamientos y hojas que siguen al dedo, conservan la velocidad al soltar y se pueden atrapar a mitad de animación.'),
  emil('prototype', 'Construye varias versiones de una pieza de interfaz y te deja pasar de una a otra con un selector.'),
  emil('mobile-native', 'Hace que una web se sienta nativa en el móvil: hover pegajoso, el fallo de 100vh, inputs que hacen zoom, zonas seguras y demás.'),
  emil('break-ui', 'Intenta romper tu interfaz con los peores datos: nombres larguísimos, listas vacías, cifras enormes.'),
  emil('pick-ui-library', 'Elige la librería adecuada para cada tarea entre las que Emil usa, en vez de dejar que la IA escriba un toast a mano.'),
  emil('animate-expo', 'El mismo listón que animate, para React Native y Expo: gestos, hojas, hápticos y transiciones de pantalla.'),
  emil('write-swift', 'Swift moderno: tipos por valor, concurrencia de Swift 6, genéricos, rendimiento y Swift Testing.'),
  emil('ask-sonner', 'La guía de Sonner, la librería de toasts de Emil: montaje, estilos, recetas y arreglos de los problemas habituales.'),
  radar('motion', 'transitions-dev', 'transitions.dev', 'Jakub Antalik', TRANSITIONS, '6,2 k', undefined,
    'Enseña al agente movimiento de producto: una biblioteca de más de 27 transiciones listas para producción y comandos para listarlas, revisar el proyecto, aplicarlas y pasar las duraciones sueltas a tokens.',
    { cuando: 'Menús, modales, cambios de icono: las transiciones de siempre, bien hechas. Su galería de la comunidad sirve de inspiración.', ojo: 'Las transiciones Pro son de pago; la skill principal y la de pulido son gratis.', instalar: 'npx skills add Jakubantalik/transitions.dev' }),
  radar('motion', 'transitions-polish', 'transitions-polish', 'Jakub Antalik', TRANSITIONS, '6,2 k', undefined,
    'El complemento de pulido: alinea el movimiento que ya tienes con la escala de tokens de transitions.dev (abrir y cerrar, hover, escalonados y distancias). Solo informa, no edita.',
    { instalar: 'npx skills add Jakubantalik/transitions.dev -s transitions-polish' }),

  // ——— Revisar, probar y encontrar
  {
    id: 'web-design-guidelines', nombre: 'web-design-guidelines', bloque: 'revisar', autor: 'Vercel', repo: 'https://github.com/vercel-labs/agent-skills', estrellas: '34 k', estado: 'global',
    hace: 'Revisa el código de la interfaz contra las Web Interface Guidelines de Vercel: accesibilidad, UX y buenas prácticas.',
    cuando: 'Antes de dar algo por terminado. Basta con pedir «revisa mi UI».',
    instalar: 'npx -y skills add vercel-labs/agent-skills --skill web-design-guidelines -g -a claude-code -y',
  },
  {
    id: 'modern-web-guidance', nombre: 'modern-web-guidance', bloque: 'revisar', autor: 'Google Chrome', repo: 'https://github.com/GoogleChrome/modern-web-guidance', estrellas: '4,8 k', licencia: 'Apache-2.0', estado: 'proyecto', compacta: true,
    hace: 'Pone al día al agente con la plataforma web: unas 200 guías sobre CSS, HTML, accesibilidad, rendimiento, formularios y seguridad, con datos de compatibilidad entre navegadores. Antes de escribir, busca la guía que toca y deja de tirar de patrones viejos.',
    cuando: 'En cualquier frontend, para que use lo que el navegador ya trae (dialog, popover, anclajes de CSS) antes que una librería. También revisa un proyecto en busca de código anticuado.',
    ojo: 'Las guías se bajan con npx cada vez que el agente las consulta. La cuidan los equipos de Chrome, Edge, Firefox y MDN.',
    instalar: 'npx -y skills add GoogleChrome/modern-web-guidance -a claude-code -y',
  },
  {
    id: 'playwright-cli', nombre: 'playwright-cli', bloque: 'revisar', autor: 'Microsoft', repo: 'https://github.com/microsoft/playwright-cli', estrellas: '15 k', licencia: 'Apache-2.0', estado: 'global',
    hace: 'Claude abre tu web en un navegador real, la recorre, rellena formularios, hace capturas y escribe los tests de Playwright.',
    cuando: 'Para comprobar que algo funciona de verdad, no solo que compila.',
    instalar: 'npm install -g @playwright/cli@latest\nplaywright-cli install --skills --global',
  },
  {
    id: 'find-skills', nombre: 'find-skills', bloque: 'revisar', autor: 'Vercel', repo: 'https://github.com/vercel-labs/skills', estrellas: '38 k', licencia: 'MIT', estado: 'global',
    hace: 'Busca e instala skills cuando preguntas «¿hay alguna skill que haga X?». Es la skill de la CLI abierta npx skills.',
    cuando: 'Cuando echas en falta algo y sospechas que alguien ya lo ha hecho.',
    instalar: 'npx skills add vercel-labs/skills --skill find-skills',
  },
  {
    id: 'untangle-codebase', nombre: 'untangle-codebase', bloque: 'revisar', autor: 'Caldo AI', repo: 'https://github.com/caldoai/skills/blob/main/skills/untangle-codebase/SKILL.md', estrellas: '738', licencia: 'MIT', estado: 'proyecto',
    hace: 'Refactoriza todo el código de una pasada preguntando solo una cosa: ¿estas piezas deberían cambiar juntas? Primero apunta cada vínculo oculto, vínculo innecesario y código sobrante, y luego los deshace para que los agentes lean menos, rompan menos y depuren antes.',
    cuando: 'Cuando un proyecto ha crecido a base de parches y cada cambio rompe algo lejos. Se lanza a mano con /untangle-codebase.',
    instalar: 'npx -y skills add caldoai/skills -a claude-code -y',
  },

  // ——— Presentaciones
  {
    id: 'frontend-slides', nombre: 'frontend-slides', bloque: 'slides', autor: 'Zara Zhang', repo: 'https://github.com/zarazhangrui/frontend-slides', estrellas: '32 k', licencia: 'MIT', estado: 'ideas', compacta: true,
    hace: 'Presentaciones web hechas con las skills de frontend del agente. De aquí saqué el ritmo: una idea por diapositiva.',
  },
  {
    id: 'html-ppt', nombre: 'html-ppt', bloque: 'slides', autor: 'lewislulu', repo: 'https://github.com/lewislulu/html-ppt-skill', estrellas: '9 k', licencia: 'MIT', estado: 'ideas', compacta: true,
    hace: 'Estudio de presentaciones HTML con 24 temas, 31 layouts y más de 20 animaciones. Me quedé con cuánto texto cabe por diapositiva.',
  },
  {
    id: 'slidev', nombre: 'slidev', bloque: 'slides', autor: 'Slidev', repo: 'https://github.com/slidevjs/slidev/tree/main/skills/slidev', estrellas: '49 k', estado: 'radar', compacta: true,
    hace: 'La skill oficial de Slidev: presentaciones para desarrolladores escritas en Markdown. Genera HTML.',
  },
  {
    id: 'slideshow', nombre: 'slideshow', bloque: 'slides', autor: 'HyperFrames · HeyGen', repo: 'https://github.com/heygen-com/hyperframes/tree/main/skills/slideshow', estrellas: '82 k', licencia: 'Apache-2.0', estado: 'radar', compacta: true,
    hace: 'Pases de diapositivas con HyperFrames, que escribe HTML y lo renderiza a vídeo. Genera HTML.',
  },
  {
    id: 'baoyu-slide-deck', nombre: 'baoyu-slide-deck', bloque: 'slides', autor: 'Jim Liu', repo: 'https://github.com/JimLiu/baoyu-skills/tree/main/skills/baoyu-slide-deck', estrellas: '27 k', licencia: 'MIT', estado: 'radar', compacta: true,
    hace: 'Genera decks como imágenes. Quedan bonitos, pero sin texto editable.',
  },

  // ——— Vídeo: guion, efectos y sonido
  radar('video', 'hyperframes', 'HyperFrames', 'HeyGen', HYPERFRAMES, '82 k', 'Apache-2.0',
    'Escribes HTML y sale un vídeo: convierte HTML, CSS, medios y animaciones en MP4 deterministas, pensado para que lo maneje un agente. Trae skills para la CLI, el catálogo de bloques, medios, Figma, pasar de Remotion y pases de diapositivas.',
    { cuando: 'Vídeos de producto, explicativos o para redes hechos con lo que ya sabes de web.', ojo: 'Pide Node 22 o superior. El framework y la app Studio son gratis; el plan Pro añade los modelos de vídeo, voz y música de HeyGen.', instalar: 'claude plugin marketplace add heygen-com/hyperframes\nclaude plugin install hyperframes@hyperframes' }),
  radar('video', 'remotion-skills', 'Remotion skills', 'Remotion', 'remotion-dev/skills', '6,8 k', undefined, 'Las skills oficiales de Remotion: Claude monta vídeos de verdad escribiendo componentes de React.', { ojo: 'Remotion tiene licencia propia: es gratis para particulares y equipos pequeños, de pago para empresas.' }),
  radar('video', 'claude-animated-shorts', 'claude-animated-shorts', 'mromidev', 'mromidev/claude-animated-shorts', '2,7 k', 'MIT', 'Cortos animados para redes con three.js: personajes en 2D dentro de un mundo en 3D.'),
  radar('video', 'director-skill', 'DirectorSKILL', 'wuwangzhang1216', 'wuwangzhang1216/DirectorSKILL', '340', 'MIT', 'Dirección de cine con IA: le das el guion y devuelve la lista de planos y los prompts de fotograma clave y de vídeo.'),
  radar('video', 'drama-skills', 'drama-skills', 'zenstory-ai', 'zenstory-ai/drama-skills', '4 k', 'MIT', 'De una idea a una serie corta: adapta novelas a guion y saca fichas de personaje, storyboards y prompts de imagen y vídeo.', { ojo: 'La documentación está sobre todo en chino.' }),
  radar('video', 'seedance-storyboard', 'Seedance2 Storyboard', 'liangdabiao', 'liangdabiao/Seedance2-Storyboard-Generator', '2,8 k', undefined, 'Convierte una historia en storyboards y en planos con prompts estructurados para Seedance 2.0.', { ojo: 'Sin licencia declarada y documentada en chino. Seedance es un modelo de pago.' }),
  radar('video', 'pixelfx', 'pixelfx', 'patch-gg', 'patch-gg/pixelfx', '6,5 k', 'MIT', '244 efectos de pixel art, cada uno un trozo pequeño de código, y una skill para que Claude invente más.'),
  radar('video', 'shader-skills', 'shader-skills', 'gokayfem', 'gokayfem/shader-skills', '434', 'MIT', 'Shaders GLSL y de Shadertoy: 186 funciones, raymarching con SDF, agua y nubes.'),
  radar('video', 'webgpu-claude-skill', 'webgpu-claude-skill', 'Daniel Greenheck', 'dgreenheck/webgpu-claude-skill', '1,3 k', undefined, 'Para desarrollar con WebGPU en three.js: TSL y partículas por compute shader.'),
  radar('video', 'comfyui-mcp', 'comfyui-mcp', 'artokun', 'artokun/comfyui-mcp', '906', 'MIT', 'Un servidor MCP con el que Claude construye y ejecuta tu grafo de ComfyUI para generar imagen y vídeo en local.', { ojo: 'Necesita ComfyUI instalado y una gráfica que lo mueva.' }),
  radar('video', 'elevenlabs-skills', 'ElevenLabs skills', 'ElevenLabs', 'elevenlabs/skills', '547', 'MIT', 'Las skills oficiales de ElevenLabs: efectos de sonido, música y voces.', { ojo: 'Necesita cuenta y API key de ElevenLabs, que es de pago por uso.' }),
  radar('video', 'claude-ai-music-skills', 'claude-ai-music-skills', 'bitwize-music-studio', 'bitwize-music-studio/claude-ai-music-skills', '648', 'CC0-1.0', 'Un flujo completo para producir un álbum con Suno: skills, plantillas y herramientas.', { ojo: 'Suno es un servicio de pago.' }),

  // ——— Taller de motion: programas y librerías, no skills
  util('remotion', 'Remotion', 'Remotion', 'remotion-dev/remotion', '72 k', undefined, 'Motor de vídeo en React: el vídeo se programa con componentes.'),
  util('animejs', 'Anime.js', 'Julian Garnier', 'juliangarnier/anime', '74 k', 'MIT', 'Motor de animación en JavaScript: líneas de tiempo, curvas y coreografía.'),
  util('glaxnimate', 'Glaxnimate', 'KDE', 'KDE/glaxnimate', '44', undefined, 'Programa de animación vectorial con fotogramas clave.'),
  util('curtainsjs', 'Curtains.js', 'Martin Laxenaire', 'martinlaxenaire/curtainsjs', '1,8 k', 'MIT', 'Convierte imágenes y vídeos del DOM en planos WebGL para deformarlos con shaders.'),
  util('vfx-js', 'VFX-JS', 'fand', 'fand/vfx-js', '1,2 k', 'MIT', 'Efectos WebGL sobre elementos de la página: glitch, bloom y píxel.'),
  util('threejs', 'Three.js', 'mrdoob', 'mrdoob/three.js', '118 k', 'MIT', 'La librería 3D de la web: escenas, luces y cámaras.'),
  util('blender', 'Blender', 'Blender Foundation', 'blender/blender', '22 k', undefined, 'Modelado, rigging y render de cine. El repo de GitHub es un espejo del oficial.'),
  util('uikit', 'UIKit', 'pmndrs', 'pmndrs/uikit', '3,3 k', undefined, 'Interfaces construidas dentro de escenas 3D con react-three-fiber.'),
  util('gaussian-splats-3d', 'GaussianSplats3D', 'Mark Kellogg', 'mkkellogg/GaussianSplats3D', '2,9 k', 'MIT', 'Render de gaussian splats en Three.js.'),
  util('nvidia-warp', 'NVIDIA Warp', 'NVIDIA', 'NVIDIA/warp', '7,3 k', 'Apache-2.0', 'Framework de Python para simulación física acelerada por GPU.'),
  util('origami-simulator', 'Origami Simulator', 'Amanda Ghassaei', 'amandaghassaei/OrigamiSimulator', '1,4 k', 'MIT', 'Simulador de plegado de papel en WebGL, en tiempo real.'),
  util('materialx', 'MaterialX', 'Academy Software Foundation', 'AcademySoftwareFoundation/MaterialX', '2,3 k', 'Apache-2.0', 'Estándar abierto para materiales procedurales y grafos de shader.'),
  util('alembic', 'Alembic', 'Alembic', 'alembic/alembic', '1,2 k', undefined, 'Formato para guardar y compartir geometría animada entre programas.'),
  util('comfyui', 'ComfyUI', 'Comfy Org', 'Comfy-Org/ComfyUI', '146 k', 'GPL-3.0', 'Generación de imagen y vídeo con modelos de difusión, montada con nodos.'),
  util('lmms', 'LMMS', 'LMMS', 'LMMS/lmms', '11 k', 'GPL-2.0', 'Producción musical: ritmos, sintetizadores y banda sonora.'),
  util('essentia', 'Essentia', 'MTG · UPF', 'MTG/essentia', '3,8 k', 'AGPL-3.0', 'Análisis de audio y música, en C++ con bindings de Python.'),
  util('wavesurfer', 'WaveSurfer.js', 'katspaugh', 'katspaugh/wavesurfer.js', '10 k', 'BSD-3-Clause', 'Reproductor con forma de onda interactiva para la web.'),
  util('obs-studio', 'OBS Studio', 'OBS Project', 'obsproject/obs-studio', '79 k', 'GPL-2.0', 'Captura y grabación de pantalla.'),
  util('opentimelineio', 'OpenTimelineIO', 'Academy Software Foundation', 'AcademySoftwareFoundation/OpenTimelineIO', '2,1 k', 'Apache-2.0', 'Formato de intercambio para mover líneas de tiempo de montaje entre herramientas.'),
  util('ffmpeg', 'FFmpeg', 'FFmpeg', 'FFmpeg/FFmpeg', '67 k', undefined, 'Codificar, comprimir y entregar. El repo de GitHub es un espejo del oficial.'),

  // ——— Agentes y automatización
  {
    id: 'voltagent', nombre: 'Subagentes de VoltAgent', bloque: 'agentes', autor: 'VoltAgent', repo: 'https://github.com/VoltAgent/awesome-claude-code-subagents', estrellas: '26 k', licencia: 'MIT', estado: 'proyecto',
    hace: 'Más de cien especialistas a los que Claude delega tareas: react-specialist, typescript-pro, code-reviewer, accessibility-tester…',
    cuando: 'Proyectos grandes en React, Next o TypeScript. Cinco como mucho, nunca categorías enteras.',
    prompt: 'Instala solo en este proyecto los subagentes de https://github.com/VoltAgent/awesome-claude-code-subagents\nque encajen con su stack (mira el package.json): normalmente react-specialist, typescript-pro,\ncode-reviewer y accessibility-tester. Cópialos a .claude/agents del proyecto, no los instales globales.',
  },
  {
    id: 'n8n-mcp', nombre: 'n8n MCP', bloque: 'agentes', autor: 'Romuald Członkowski', repo: 'https://github.com/czlonkowski/n8n-mcp', estrellas: '23 k', licencia: 'MIT', estado: 'proyecto',
    hace: 'Un servidor MCP para que Claude cree y valide workflows de n8n por ti.',
    cuando: 'Solo si trabajas con n8n.',
    ojo: 'Necesita la URL de tu n8n y una API key (Settings → n8n API). La clave la pegas tú cuando te la pida.',
    prompt: 'Configura el servidor MCP n8n-mcp (https://github.com/czlonkowski/n8n-mcp) solo para este\nproyecto, siguiendo su docs/CLAUDE_CODE_SETUP.md. Cuando llegue el momento, pídeme la URL de\nmi n8n y la API key.',
  },
  {
    id: 'ecc', nombre: 'Everything Claude Code', bloque: 'agentes', autor: 'Affaan Mustafa', repo: 'https://github.com/affaan-m/ECC', estrellas: '299 k', licencia: 'MIT', estado: 'opcional',
    hace: 'Un paquete gigante de skills, agentes, hooks y reglas para Claude Code, Codex, Cursor y compañía.',
    ojo: 'Se solapa con lo que ya tengo y puede llenar el contexto. Si lo quieres, mejor el perfil mínimo.',
    instalar: 'npx ecc-universal@2.2.3 install --profile minimal --target claude',
    prompt: 'Instala Everything Claude Code (https://github.com/affaan-m/ECC) en su perfil mínimo con\n"npx ecc-universal@2.2.3 install --profile minimal --target claude". Antes dime qué va a\nañadir y si choca con las skills que ya tengo (taste-skill, ui-ux-pro-max,\nweb-design-guidelines, playwright-cli).',
  },

  // ——— Memoria y conocimiento
  {
    id: 'claude-mem', nombre: 'Claude Mem', bloque: 'memoria', autor: 'Alex Newman', repo: 'https://github.com/thedotmack/claude-mem', estrellas: '114 k', licencia: 'Apache-2.0', estado: 'opcional',
    hace: 'Memoria automática entre sesiones: captura lo que hace el agente, lo comprime con IA y le devuelve lo relevante en la siguiente.',
    ojo: 'Instala un servicio en segundo plano y hooks. Claude Code ya tiene memoria y CLAUDE.md, así que pruébalo solo si echas algo en falta.',
    instalar: 'claude plugin marketplace add thedotmack/claude-mem\nclaude plugin install claude-mem',
    prompt: 'Instala el plugin Claude Mem (https://github.com/thedotmack/claude-mem) con\n"claude plugin marketplace add thedotmack/claude-mem" y "claude plugin install claude-mem".\nNo uses npm install -g. Explícame qué instala y cómo desactivarlo si no me convence.',
  },
  {
    id: 'lightrag', nombre: 'LightRAG', bloque: 'memoria', autor: 'HKU Data Intelligence Lab', repo: 'https://github.com/HKUDS/LightRAG', estrellas: '41 k', licencia: 'MIT', estado: 'proyecto',
    hace: 'No es una skill: es una librería de Python para hacer un buscador inteligente sobre tus documentos, con RAG y grafos de conocimiento.',
    cuando: 'Solo si construyes una app o un agente que tenga que responder sobre una base de documentos.',
    instalar: 'pip install "lightrag-hku[api]"',
    prompt: 'Quiero usar LightRAG (https://github.com/HKUDS/LightRAG) en este proyecto. Instálalo en un\nentorno virtual de Python dentro del proyecto y explícame cómo conectarlo a mis documentos.',
  },

  // ——— Referencias: webs, no skills
  web('scrolltide', 'scrolltide.co', 'Más de 600 prompts de diseño y 200 componentes con su código para webs 3D y movidas por scroll.'),
  web('scrollshaders', 'scrollshaders.com', '117 shaders animados en 11 estilos.'),
  web('backgrounds-supply', 'backgrounds.supply', 'Fondos de diseño para no tirar del degradado de siempre.'),
  web('cta-gallery', 'cta.gallery', 'Galería de llamadas a la acción para inspirarse.'),
  web('refero-styles', 'styles.refero.design', 'Estilos de diseño sacados de productos reales.'),
];

// ——— Packs: un prompt que se pega en Claude Code y deja el proyecto listo para trabajar.

export interface Pack {
  id: string;
  nombre: string;
  para: string;
  incluye: string[];
  nota?: string;
  prompt: string;
}

const MEMORIA = `PASO 3 - Memoria
- Claude Mem | https://github.com/thedotmack/claude-mem
  claude plugin marketplace add thedotmack/claude-mem y claude plugin install claude-mem (no uses npm install -g).
  Explícame en dos líneas qué instala y cómo desactivarlo.`;

const CIERRE = `ÚLTIMO PASO - CLAUDE.md y resumen
Crea o actualiza el CLAUDE.md del proyecto con una sección "Skills de este proyecto": qué hay instalado y cuándo usar cada cosa.
Dame una tabla: herramienta | instalada sí/no | por qué | ruta. Recuérdame reiniciar Claude Code para que se carguen.`;

const CALDO = `- Skills de Caldo AI (untangle-codebase y las que vayan publicando) | https://github.com/caldoai/skills
  npx -y skills add caldoai/skills -a claude-code -y`;

export const PACKS: Pack[] = [
  {
    id: 'web',
    nombre: 'Pack web',
    para: 'Webs, landings y cualquier frontend: diseño, scroll, subagentes, revisión, memoria y código limpio.',
    incluye: ['design-taste-frontend', 'gpt-taste', 'ui-ux-pro-max', 'impeccable', 'scroll-world', 'awesome-design-md', 'skillui', 'emil-design-eng', 'review-animations', 'break-ui', 'web-design-guidelines', 'modern-web-guidance', 'playwright-cli', 'find-skills', 'voltagent', 'untangle-codebase', 'claude-mem'],
    nota: 'Al reiniciar Claude Code, lanza /impeccable init y a trabajar.',
    prompt: `Hola Claude. Deja este proyecto listo para hacer webs con mis skills. Hazlo todo tú, sin preguntarme salvo donde lo indico o si algo falla.

PASO 0 - Mira qué hay
Comprueba node 18+, npm, git y el CLI "claude". Lista ~/.claude/skills, .claude/ del proyecto y "claude plugin list" para no duplicar nada.
Lee package.json, el README y la estructura, y dime en 3 líneas qué es el proyecto y qué stack usa.

PASO 1 - Globales (solo las que falten)
- Taste Skill | https://github.com/Leonxlnx/taste-skill
  claude plugin marketplace add Leonxlnx/taste-skill
  claude plugin install taste-skill@taste-skill --scope user
- UI UX Pro Max | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
  npx -y ui-ux-pro-max-cli init --ai claude --global
- Web Design Guidelines | https://github.com/vercel-labs/agent-skills
  npx -y skills add vercel-labs/agent-skills --skill web-design-guidelines -g -a claude-code -y
- Playwright CLI | https://github.com/microsoft/playwright-cli
  npm install -g @playwright/cli@latest y, desde mi carpeta de usuario, playwright-cli install --skills --global
- find-skills | https://github.com/vercel-labs/skills
  npx -y skills add vercel-labs/skills --skill find-skills -g -a claude-code -y

PASO 2 - De este proyecto
- Impeccable | https://github.com/pbakaus/impeccable
  npx -y impeccable install --project --providers=claude -y en la raíz (sin esas opciones se instala global y para todos los agentes).
${CALDO}
- Tres skills de Emil Kowalski, solo esas tres | https://github.com/emilkowalski/skills
  npx -y skills@latest add emilkowalski/skills --skill emil-design-eng review-animations break-ui -a claude-code -y
  emil-design-eng para animar con criterio, review-animations para revisar el movimiento y break-ui para probar la interfaz con datos feos.
- Modern Web Guidance | https://github.com/GoogleChrome/modern-web-guidance
  npx -y skills add GoogleChrome/modern-web-guidance -a claude-code -y
  Guías de Chrome, Edge, Firefox y MDN: consúltalas antes de escribir HTML, CSS o JavaScript de interfaz.
- scroll-world | https://github.com/oso95/scroll-world
  claude plugin marketplace add oso95/scroll-world
  claude plugin install scroll-world@scroll-world --scope project
  Genera imagen y vídeo con servicios de pago (Monid o Higgsfield): instálala, pero no generes nada sin preguntarme.
- Subagentes de VoltAgent | https://github.com/VoltAgent/awesome-claude-code-subagents
  Copia a .claude/agents como mucho 5, los que encajen con el stack: react-specialist, nextjs-developer, vue-expert,
  typescript-pro, frontend-developer, ui-designer, code-reviewer, accessibility-tester. Nunca categorías enteras.
- PREGÚNTAME si quiero un estilo de referencia. Si digo una marca, descarga su DESIGN.md de
  https://github.com/VoltAgent/awesome-design-md a la raíz. Si digo una web, usa SkillUI (npx skillui --url <web>,
  https://github.com/amaancoderx/npxskillui) y deja el resultado en .claude/skills. Si digo que no, sáltalo.

${MEMORIA}

${CIERRE}
Y dime que, al reiniciar, lance /impeccable init para configurar Impeccable.`,
  },
  {
    id: 'backend',
    nombre: 'Pack backend',
    para: 'APIs, servicios y datos: subagentes de tu lenguaje, código limpio, memoria y, si toca, n8n o RAG.',
    incluye: ['voltagent', 'untangle-codebase', 'claude-mem', 'find-skills', 'playwright-cli', 'n8n-mcp', 'lightrag'],
    nota: 'n8n MCP y LightRAG solo se instalan si el proyecto los necesita.',
    prompt: `Hola Claude. Deja este proyecto backend listo para trabajar con mis skills. Hazlo todo tú, sin preguntarme salvo donde lo indico o si algo falla.

PASO 0 - Mira qué hay
Comprueba node 18+, npm, git, python 3 y el CLI "claude". Lista ~/.claude/skills, .claude/ del proyecto y "claude plugin list" para no duplicar nada.
Lee pom.xml, build.gradle, package.json, requirements.txt, pyproject.toml o go.mod, el README y la estructura, y dime en 3 líneas qué es y qué stack usa.

PASO 1 - Globales (solo las que falten)
- find-skills | https://github.com/vercel-labs/skills
  npx -y skills add vercel-labs/skills --skill find-skills -g -a claude-code -y
- Playwright CLI, solo si hay alguna interfaz web que probar | https://github.com/microsoft/playwright-cli
  npm install -g @playwright/cli@latest y, desde mi carpeta de usuario, playwright-cli install --skills --global

PASO 2 - De este proyecto
${CALDO}
- Subagentes de VoltAgent | https://github.com/VoltAgent/awesome-claude-code-subagents
  Copia a .claude/agents como mucho 5: los del stack más code-reviewer. Por ejemplo:
  Java/Spring: java-architect, spring-boot-engineer · Python: python-pro, fastapi-developer o django-developer ·
  Node: node-specialist, typescript-pro · Go: golang-pro · Datos: sql-pro o postgres-pro ·
  APIs: api-designer, backend-developer · Seguridad: security-auditor. Nunca categorías enteras.
- n8n MCP, SOLO si el proyecto usa n8n | https://github.com/czlonkowski/n8n-mcp
  Configúralo con alcance de proyecto siguiendo su docs/CLAUDE_CODE_SETUP.md. Pídeme la URL de mi n8n y la API key cuando toque.
- LightRAG, SOLO si tiene que responder sobre documentos | https://github.com/HKUDS/LightRAG
  En un entorno virtual de Python dentro del proyecto: pip install "lightrag-hku[api]".

${MEMORIA}

${CIERRE}`,
  },
  {
    id: 'ecc',
    nombre: 'Everything Claude Code',
    para: 'Aparte: un paquete enorme de skills, agentes, hooks y reglas del que eliges lo que quieras.',
    incluye: ['ecc'],
    nota: 'Se come mucho contexto y se solapa con los otros dos. Mejor el perfil mínimo y añadir solo lo que uses.',
    prompt: `Hola Claude. Quiero probar Everything Claude Code (https://github.com/affaan-m/ECC), pero con cuidado con el contexto.

1. Antes de instalar nada, dime qué añade su perfil mínimo y si choca con lo que ya tengo
   (mira ~/.claude/skills, .claude/ del proyecto y "claude plugin list": taste-skill, ui-ux-pro-max, web-design-guidelines, playwright-cli…).
2. Si te digo que sí, instálalo en su perfil mínimo:
   npx ecc-universal@2.2.3 install --profile minimal --target claude
3. Enséñame qué otras skills y agentes trae el repo, agrupados por tema, para que elija cuáles añadir una a una.
4. Dime cuánto contexto ocupa lo instalado y cómo desinstalarlo si no me convence.`,
  },
];

export const MISION = `Necesito [resultado que quiero, ej: automatizar el alta de clientes].
1. Analiza cómo se hace ahora.
2. Construye la lógica para conectar [Herramienta A] con [Herramienta B].
3. Si algo falla, crea un plan B que me avise.
4. Haz una prueba y enséñame los resultados.`;
