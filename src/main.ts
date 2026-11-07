import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/permanent-marker';
import '@fontsource/reenie-beanie';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/eb-garamond';
import './styles.css';
import './demos.css';
import { BLOQUES, ESTADOS, MISION, PACKS, REVISADO, SKILLS, type Estado, type Pack, type Skill } from './data';
import { DEMOS, RM, pausaBucle, posicion, tieneBucle, tieneCinta } from './demos';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

const ICONO = {
  fuera: '<svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  play: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>',
  pausa: '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>',
  estrella: '<svg class="estrella" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="m6 .8 1.6 3.4 3.7.4-2.8 2.5.8 3.7L6 8.9l-3.3 1.9.8-3.7L.7 4.6l3.7-.4z" fill="currentColor"/></svg>',
};

/** Estrellas de GitHub con su icono y sin que «111 k» se parta en dos líneas. */
const estrellas = (n: string) => `<span class="estrellas">${ICONO.estrella}<span class="sr">estrellas:</span> ${esc(n.replace(' ', ' '))}</span>`;

// Número de pista de cada skill: su posición en la cinta, de la primera a la última.
const PISTA = new Map(SKILLS.map((s, i) => [s.id, i + 1]));
const num = (id: string) => String(PISTA.get(id) ?? 0).padStart(2, '0');
const nombre = (id: string) => SKILLS.find((s) => s.id === id)?.nombre ?? id;
const skill = (id: string) => SKILLS.find((s) => s.id === id)!;

// Nombres cortos para el lomo, que solo tiene el ancho de una cinta.
const CORTO: Record<string, string> = { taste: 'Arte', scroll: 'Scroll', sistema: 'Sistema', pulir: 'Pulir', revisar: 'Revisar', slides: 'Slides', agentes: 'Agentes', memoria: 'Memoria' };

function rec(texto: string, etiqueta: string, cls = '') {
  return `<button class="rec ${cls}" type="button" data-copia="${esc(texto)}"><span class="rec-piloto" aria-hidden="true"></span>${esc(etiqueta)}</button>`;
}

function dymo(e: Estado) {
  return `<span class="dymo dymo-${e}" title="${esc(ESTADOS[e].explica)}">${esc(ESTADOS[e].nombre)}</span>`;
}

function ticket(s: Skill) {
  return [s.autor && `<span>${esc(s.autor)}</span>`, s.licencia && `<span>${esc(s.licencia)}</span>`, s.estrellas && estrellas(s.estrellas)].filter(Boolean).join('');
}

// ——— Carátula: las dos caras y la cinta pirata

function cara(p: Pack, lado: string) {
  const pistas = [...p.incluye].sort((a, b) => PISTA.get(a)! - PISTA.get(b)!);
  return `<article class="cara cara-${p.id}" aria-labelledby="cara-${p.id}">
    <header class="cara-cabeza">
      <h2 id="cara-${p.id}"><span class="cara-lado">Cara ${lado}</span> ${esc(p.nombre)}</h2>
      ${rec(p.prompt, `Grabar ${p.nombre.toLowerCase()}`, 'rec-grande')}
    </header>
    <p class="cara-para">${esc(p.para)}</p>
    <details class="cara-lista" open>
      <summary>${pistas.length} pistas en esta cara</summary>
      <ol class="cara-pistas">${pistas.map((id) => `<li><a href="#s-${id}"><b>${num(id)}</b>${esc(nombre(id))}</a></li>`).join('')}</ol>
    </details>
    ${p.nota ? `<p class="cara-nota">${esc(p.nota)}</p>` : ''}
    <details class="cara-prompt"><summary>Ver lo que se graba</summary><pre>${esc(p.prompt)}</pre></details>
  </article>`;
}

function caratula() {
  const [web, backend, todo] = PACKS;
  $('#caras-lista').innerHTML = cara(web, 'A') + cara(backend, 'B');
  $('#pirata').innerHTML = `<p class="pirata-cinta" aria-hidden="true"><s>copia de una copia</s> · no apta para cintas cortas</p>
    <h2>${esc(todo.nombre)}</h2>
    <p>${esc(todo.para)} ${esc(todo.nota ?? '')}</p>
    ${rec(todo.prompt, 'Grabar con cuidado', 'rec-pirata')}
    <details class="cara-prompt"><summary>Ver lo que se graba</summary><pre>${esc(todo.prompt)}</pre></details>`;
  $('#total-pistas').textContent = String(SKILLS.length);
  $('#revisado').textContent = REVISADO;
  // En el móvil, las dos caras caben en la primera pantalla con sus listas plegadas.
  if (matchMedia('(max-width: 999px)').matches) document.querySelectorAll<HTMLDetailsElement>('.cara-lista').forEach((d) => (d.open = false));
}

// ——— Lomo: navegación fija por bloques

function lomo() {
  $('#lomo-caras').innerHTML = `<li><a href="#caras">Packs</a></li>` + BLOQUES.map((b) =>
    `<li><a href="#b-${b.id}" title="${esc(b.nombre)}">${esc(CORTO[b.id] ?? b.nombre)}</a></li>`).join('') +
    `<li><a href="#notas">Notas</a></li>`;
}

// ——— Bloques: tracklist y pletina

function fila(s: Skill) {
  const acciones = [
    s.instalar && rec(s.instalar, 'Grabar comando', 'rec-pequeno'),
    s.prompt && rec(s.prompt, 'Grabar prompt', 'rec-pequeno'),
    !s.instalar && !s.prompt && `<a class="enlace" href="#b-${s.bloque}">Se graba con el pack del bloque</a>`,
    `<a class="enlace" href="${s.repo}" target="_blank" rel="noopener noreferrer">Repo ${ICONO.fuera}</a>`,
  ].filter(Boolean).join('');
  return `<li class="pista" id="s-${s.id}" data-id="${s.id}" data-estado="${s.estado}" data-busca="${esc([s.nombre, s.autor, s.hace, s.cuando, ESTADOS[s.estado].nombre].join(' ').toLowerCase())}">
    <button class="pista-boton" type="button" aria-expanded="false" aria-controls="d-${s.id}">
      <span class="pista-num">${num(s.id)}</span>
      <span class="pista-nombre">${esc(s.nombre)}</span>
      <span class="pista-ticket">${ticket(s)}</span>
      ${dymo(s.estado)}
    </button>
    <div class="pista-detalle" id="d-${s.id}" hidden>
      <p class="pista-hace">${esc(s.hace)}</p>
      ${s.cuando ? `<p class="pista-cuando"><b>Cuándo</b> ${esc(s.cuando)}</p>` : ''}
      ${s.ojo ? `<p class="pista-ojo"><b>Ojo</b> ${esc(s.ojo)}</p>` : ''}
      <div class="pista-acciones">${acciones}</div>
    </div>
  </li>`;
}

function bloques() {
  $('#bloques').innerHTML = BLOQUES.map((b) => {
    const pistas = SKILLS.filter((s) => s.bloque === b.id);
    const pack = b.repo
      ? `<p class="bloque-pack"><a href="${b.repo.url}" target="_blank" rel="noopener noreferrer">${b.repo.url.replace('https://github.com/', '')} ${ICONO.fuera}</a>
          <span>${b.repo.licencia ? `${esc(b.repo.licencia)} · ` : ''}${estrellas(b.repo.estrellas)}</span>
          ${b.instalar ? rec(b.instalar, 'Grabar el pack entero', 'rec-pequeno') : ''}</p>`
      : '';
    return `<section class="bloque" id="b-${b.id}" data-bloque="${b.id}" aria-labelledby="t-${b.id}">
      <header class="bloque-cabeza">
        <h2 id="t-${b.id}">${esc(b.nombre)}</h2>
        <p class="bloque-lema">${esc(b.lema)}</p>
        ${pack}
      </header>
      <div class="bloque-cuerpo${pistas.length === 1 ? ' bloque-solo' : ''}">
        <ol class="pistas">${pistas.map(fila).join('')}</ol>
        <section class="pletina" aria-label="Pletina de ${esc(b.nombre)}">
          <p class="pletina-etiqueta"><span class="pletina-num"></span><span class="pletina-nombre"></span></p>
          <div class="pletina-escenas"></div>
          <div class="pletina-mandos">
            <button class="pletina-play" type="button" aria-label="Reproducir">${ICONO.play}</button>
            <input class="pletina-cinta" type="range" min="0" max="1000" value="0" aria-label="Posición de la cinta de ${esc(b.nombre)}" aria-valuetext="0 %" />
            <span class="pletina-pista"></span>
          </div>
        </section>
      </div>
    </section>`;
  }).join('');
}

type Bloque = HTMLElement & { abre?: (li: HTMLElement, mover?: boolean) => void; repasa?: () => void };

/** Cada bloque tiene una pletina: pone la demo de la pista elegida y la reproduce como una cinta. */
function pletina(bloque: Bloque) {
  const deck = $('.pletina', bloque);
  const escenas = $('.pletina-escenas', deck);
  const play = $<HTMLButtonElement>('.pletina-play', deck);
  const cinta = $<HTMLInputElement>('.pletina-cinta', deck);
  const pie = $('.pletina-pista', deck);
  const montadas = new Map<string, HTMLElement>();
  let actual: HTMLElement | null = null;
  let modo: 'cinta' | 'bucle' | 'nada' = 'nada';
  let p = 0;
  let sonando = false;
  let raf = 0;
  let t0 = 0;
  let icono = '';
  const DURACION = 6000;

  const pinta = () => {
    cinta.value = String(Math.round(p * 1000));
    cinta.setAttribute('aria-valuetext', `${Math.round(p * 100)} %`);
    cinta.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    const ahora = sonando ? 'pausa' : 'play';
    if (ahora !== icono) {
      icono = ahora;
      play.innerHTML = sonando ? ICONO.pausa : ICONO.play;
      play.setAttribute('aria-label', modo === 'bucle' ? (sonando ? 'Pausar la animación' : 'Reanudar la animación') : sonando ? 'Pausar' : 'Reproducir');
      deck.classList.toggle('sonando', sonando);
    }
  };
  const para = () => {
    sonando = false;
    cancelAnimationFrame(raf);
    if (modo === 'bucle' && actual) pausaBucle(actual, true);
    pinta();
  };
  const avanza = (t: number) => {
    p = Math.min(1, (t - t0) / DURACION);
    if (actual) posicion(actual, p);
    if (p >= 1) return para();
    pinta();
    raf = requestAnimationFrame(avanza);
  };
  const suena = () => {
    if (!actual) return;
    cancelAnimationFrame(raf);
    sonando = true;
    if (modo === 'bucle') {
      pausaBucle(actual, false);
    } else if (modo === 'cinta') {
      if (p >= 1) p = 0;
      t0 = performance.now() - p * DURACION;
      raf = requestAnimationFrame(avanza);
    }
    pinta();
  };

  play.addEventListener('click', () => (sonando ? para() : suena()));
  cinta.addEventListener('input', () => {
    para();
    p = +cinta.value / 1000;
    if (actual) posicion(actual, p);
    pinta();
  });

  const prepara = () => {
    modo = !actual ? 'nada' : tieneCinta(actual) ? 'cinta' : tieneBucle(actual) ? 'bucle' : 'nada';
    deck.dataset.modo = modo;
    pie.textContent = modo === 'cinta' ? 'Arrastra la cinta o dale al play' : actual ? 'Demo en vivo: tócala' : '';
    icono = '';
    p = RM ? 1 : 0;
    if (actual && modo === 'cinta') posicion(actual, p);
    if (modo === 'bucle') sonando = !RM;
    pinta();
    if (modo === 'cinta' && !RM) suena();
  };

  const elige = (s: Skill) => {
    para();
    if (actual && modo === 'bucle') pausaBucle(actual, false);
    const demo = s.bloque === 'slides' ? 'ritmo' : s.compacta ? '' : s.id;
    $('.pletina-num', deck).textContent = num(s.id);
    $('.pletina-nombre', deck).textContent = s.nombre;
    escenas.querySelectorAll<HTMLElement>('.escena').forEach((e) => (e.hidden = true));
    if (!demo) {
      actual = null;
      let vacia = montadas.get('');
      if (!vacia) {
        vacia = document.createElement('div');
        vacia.className = 'escena escena-vacia';
        vacia.innerHTML = '<p>Esta pista no tiene demo propia: es una nota en la carátula.</p>';
        escenas.append(vacia);
        montadas.set('', vacia);
      }
      vacia.hidden = false;
    } else {
      let e = montadas.get(demo);
      if (!e) {
        const nueva = document.createElement('div');
        nueva.className = `escena escena-${demo}`;
        nueva.setAttribute('role', 'group');
        escenas.append(nueva);
        montadas.set(demo, nueva);
        // Algunas demos cargan su librería antes de tener cinta: la pletina se prepara cuando terminan.
        const montada = DEMOS[demo]?.(nueva);
        if (montada instanceof Promise) {
          montada
            .then(() => { if (actual === nueva) prepara(); })
            .catch(() => {
              montadas.delete(demo);
              nueva.innerHTML = '<p class="escena-fallo">No se pudo cargar esta demo. Recarga la página para volver a intentarlo.</p>';
            });
        }
        e = nueva;
      }
      e.setAttribute('aria-label', `Demo de ${s.nombre}`);
      e.hidden = false;
      actual = e;
    }
    prepara();
  };

  const abre = (li: HTMLElement, mover = false) => {
    bloque.querySelectorAll<HTMLElement>('.pista').forEach((x) => {
      const on = x === li;
      x.classList.toggle('activa', on);
      $('.pista-boton', x).setAttribute('aria-expanded', String(on));
      $('.pista-detalle', x).hidden = !on;
    });
    elige(skill(li.dataset.id!));
    if (mover) {
      li.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
      $<HTMLButtonElement>('.pista-boton', li).focus({ preventScroll: true });
    }
  };

  const primeraVisible = () => {
    const visibles = [...bloque.querySelectorAll<HTMLElement>('.pista:not([hidden])')];
    return visibles.find((x) => !skill(x.dataset.id!).compacta) ?? visibles[0];
  };

  bloque.addEventListener('click', (ev) => {
    const b = (ev.target as HTMLElement).closest<HTMLButtonElement>('.pista-boton');
    if (b) abre(b.closest<HTMLElement>('.pista')!);
  });
  bloque.abre = abre;
  // Si un filtro esconde la pista que suena, la pletina pasa a la primera que sigue a la vista.
  bloque.repasa = () => {
    const activa = bloque.querySelector<HTMLElement>('.pista.activa');
    if (!activa || !activa.hidden) return;
    const otra = primeraVisible();
    if (otra) abre(otra);
    else para();
  };

  // La pletina se enciende con la primera pista que tenga demo cuando el bloque asoma.
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    if (!bloque.querySelector('.pista.activa')) {
      const primera = primeraVisible();
      if (primera) abre(primera);
    }
  });
  io.observe(bloque);
}

/** Abre la pista `#s-…` en la pletina de su bloque, quitando los filtros si la tapaban. */
function abrePista(hash: string) {
  const li = document.getElementById(hash.slice(1));
  const bloque = li?.closest<Bloque>('.bloque');
  if (!li || !bloque?.abre) return false;
  if (li.hidden) limpiaFiltros();
  bloque.abre(li, true);
  return true;
}

// Un enlace a una pista (desde las caras) la abre en la pletina; un enlace compartido también.
function enlacesAPistas() {
  document.addEventListener('click', (ev) => {
    const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#s-"]');
    if (!a || !abrePista(a.hash)) return;
    ev.preventDefault();
    history.replaceState(null, '', a.hash);
  });
  if (location.hash.startsWith('#s-')) requestAnimationFrame(() => abrePista(location.hash));
}

// ——— Buscador y filtros

let limpiaFiltros = () => {};

function filtros() {
  const q = $<HTMLInputElement>('#buscar');
  const estados = Object.keys(ESTADOS) as Estado[];
  $('#filtros').innerHTML = `<button class="dymo-filtro dymo-todas" aria-pressed="true" data-estado="" type="button">Todas <span>${SKILLS.length}</span></button>` + estados
    .map((e) => `<button class="dymo-filtro dymo-${e}" aria-pressed="false" data-estado="${e}" title="${esc(ESTADOS[e].explica)}" type="button">${ESTADOS[e].nombre} <span>${SKILLS.filter((s) => s.estado === e).length}</span></button>`)
    .join('');
  let estado = '';
  const aplica = () => {
    const t = q.value.trim().toLowerCase();
    let vistas = 0;
    document.querySelectorAll<HTMLElement>('.pista').forEach((el) => {
      const ok = (!estado || el.dataset.estado === estado) && (!t || el.dataset.busca!.includes(t));
      el.hidden = !ok;
      if (ok) vistas++;
    });
    document.querySelectorAll<Bloque>('.bloque').forEach((b) => {
      b.hidden = !b.querySelector('.pista:not([hidden])');
      if (!b.hidden) b.repasa?.();
    });
    $('#mostrando').textContent = vistas === SKILLS.length ? '' : vistas ? `${vistas} de ${SKILLS.length} pistas` : `Ninguna pista con «${q.value.trim()}». Prueba con otra palabra o quita el filtro.`;
  };
  limpiaFiltros = () => {
    q.value = '';
    estado = '';
    document.querySelectorAll('.dymo-filtro').forEach((c) => c.setAttribute('aria-pressed', String(!(c as HTMLElement).dataset.estado)));
    aplica();
  };
  q.addEventListener('input', aplica);
  $('#filtros').addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.dymo-filtro');
    if (!b) return;
    estado = b.dataset.estado!;
    document.querySelectorAll('.dymo-filtro').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    aplica();
  });
}

// ——— Grabar: copiar al portapapeles, con el piloto, las bobinas y el lomo

async function copia(texto: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      // Sin permiso para la API: se intenta el método clásico.
    }
  }
  const ta = Object.assign(document.createElement('textarea'), { value: texto, readOnly: true });
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.append(ta);
  try {
    ta.select();
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    ta.remove();
  }
}

function grabar() {
  const aviso = $('#aviso');
  const marcas = [$('.casete'), $('.lomo')];
  let t = 0;
  document.addEventListener('click', async (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copia], #mision-copiar');
    if (!b) return;
    const texto = b.id === 'mision-copiar' ? $('#mision-texto').innerText : b.dataset.copia!;
    document.querySelectorAll('.grabando').forEach((x) => x.classList.remove('grabando'));
    void b.offsetWidth;
    b.classList.add('grabando');
    marcas.forEach((m) => m.classList.add('grabando'));
    let ok = false;
    try {
      ok = await copia(texto);
    } finally {
      b.focus({ preventScroll: true });
      // Se vacía y se vuelve a escribir para que el lector de pantalla lo anuncie aunque se repita.
      aviso.textContent = '';
      aviso.classList.toggle('error', !ok);
      aviso.classList.add('visible');
      requestAnimationFrame(() => {
        aviso.textContent = ok ? 'Grabado. Pégalo en Claude Code.' : 'No se pudo grabar: abre «Ver lo que se graba» y cópialo a mano.';
      });
      clearTimeout(t);
      t = window.setTimeout(() => {
        aviso.classList.remove('visible');
        aviso.textContent = '';
        document.querySelectorAll('.grabando').forEach((x) => x.classList.remove('grabando'));
      }, 1600);
    }
  });
}

// ——— La cinta avanza con el scroll: bobinas de la carátula y contador del lomo

function transporte() {
  const contador = $('#contador');
  const casete = $('.casete');
  let pendiente = false;
  const mide = () => {
    pendiente = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    contador.textContent = String(Math.round(p * 999)).padStart(3, '0');
    if (!RM) casete.style.setProperty('--giro', `${(scrollY * 0.4).toFixed(1)}deg`);
  };
  addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(mide); } }, { passive: true });
  mide();
}

caratula();
lomo();
bloques();
document.querySelectorAll<Bloque>('.bloque').forEach(pletina);
enlacesAPistas();
filtros();
grabar();
transporte();
$('#mision-texto').innerHTML = esc(MISION).replace(/\[([^\]]+)\]/g, (_, hueco: string) =>
  `<span class="hueco" contenteditable="plaintext-only" role="textbox" aria-label="Hueco: ${esc(hueco)}" spellcheck="false">[${esc(hueco)}]</span>`);
