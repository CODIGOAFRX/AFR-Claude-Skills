// Una demo por skill, hecha a la manera de esa skill. Cada función recibe su escena vacía y la monta.
// Las que van con el scroll leen `progreso(el)`; las que se repiten solo corren mientras se ven.
// Con movimiento reducido, todas se quedan en su estado final y se manejan a mano.
import { SKILLS } from './data';

export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

type Demo = (el: HTMLElement) => void;

// ——— Motor común

const scrollers = new Set<{ el: HTMLElement; fn: (p: number) => void; last: number }>();
let ticking = false;
function tick() {
  ticking = false;
  const vh = innerHeight;
  for (const s of scrollers) {
    const r = s.el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) continue;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    if (Math.abs(p - s.last) > 0.001) { s.last = p; s.fn(p); }
  }
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
addEventListener('resize', () => requestAnimationFrame(tick));

/** Llama a `fn` con el avance de la escena por la pantalla: 0 al asomar por abajo, 1 al salir por arriba. */
function alScroll(el: HTMLElement, fn: (p: number) => void) {
  if (RM) return fn(0.5);
  scrollers.add({ el, fn, last: -1 });
  requestAnimationFrame(tick);
}

/** Repite `paso` cada `ms` solo mientras la escena está en pantalla. */
function enBucle(el: HTMLElement, ms: number, paso: (n: number) => void) {
  let n = 0;
  let t = 0;
  paso(n++);
  if (RM) return;
  new IntersectionObserver(([e]) => {
    clearInterval(t);
    if (e.isIntersecting) t = window.setInterval(() => paso(n++), ms);
  }).observe(el);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const tramo = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

function botones(nombres: string[], cls = 'mini-botones') {
  return `<div class="${cls}" role="group">${nombres.map((n, i) => `<button aria-pressed="${i === 0}" data-i="${i}">${n}</button>`).join('')}</div>`;
}
function alPulsar(root: HTMLElement, fn: (i: number) => void) {
  root.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-i]');
    if (!b || !root.contains(b)) return;
    b.parentElement!.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    fn(Number(b.dataset.i));
  });
}

// ——— Dirección de arte

const tasteFrontend: Demo = (el) => {
  el.classList.add('d-antes');
  el.innerHTML = `
    <div class="antes-capa antes-generica" aria-hidden="true">
      <div class="gen-nav"><b>✦ NovaFlow</b><span>Producto</span><span>Precios</span><span class="gen-cta">Empezar</span></div>
      <h4>Desbloquea tu potencial<br>con IA de nueva generación</h4>
      <p>La plataforma todo en uno que revoluciona tu flujo de trabajo.</p>
      <div class="gen-tres"><i>🚀 Rápido</i><i>🔒 Seguro</i><i>⚡ Potente</i></div>
    </div>
    <div class="antes-capa antes-criterio" aria-hidden="true">
      <p class="cri-kicker">Taller de encuadernación · Granada</p>
      <h4>Libros cosidos<br><em>a mano</em>, uno a uno.</h4>
      <div class="cri-pie"><span>Desde 1987</span><span>Pedidos →</span></div>
      <div class="cri-lomo"></div>
    </div>
    <div class="antes-linea"><span>Genérico</span><span>Con criterio</span></div>
    <input type="range" min="0" max="100" value="50" aria-label="Comparar diseño genérico y con criterio">`;
  const r = el.querySelector('input')!;
  let tocado = false;
  const pon = (v: number) => el.style.setProperty('--corte', `${v}%`);
  r.addEventListener('input', () => { tocado = true; pon(+r.value); });
  alScroll(el, (p) => { if (!tocado) { const v = Math.round(lerp(92, 8, tramo(p, 0.2, 0.75))); r.value = String(v); pon(v); } });
};

const gptTaste: Demo = async (el) => {
  el.classList.add('d-pila');
  const cartas = [
    ['Atención', 'Un titular que ocupa la pantalla.'],
    ['Interés', 'El scroll fija la escena y cuenta.'],
    ['Deseo', 'Cada carta se apila sobre la anterior.'],
    ['Acción', 'Y al final, una sola llamada.'],
  ];
  el.innerHTML = `<div class="pila-fija">${cartas.map(([t, d], i) => `<div class="pila-carta" style="--i:${i}"><span>0${i + 1}</span><h4>${t}</h4><p>${d}</p></div>`).join('')}<p class="pila-pista">GSAP ScrollTrigger · pin + scrub</p></div>`;
  if (RM) return;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  const cs = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.pila-carta'));
  gsap.set(cs.slice(1), { yPercent: 170 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
  cs.slice(1).forEach((c, i) => {
    tl.to(c, { yPercent: 0, ease: 'none' }, i);
    tl.to(cs.slice(0, i + 1), { scale: (j: number) => 1 - (i + 1 - j) * 0.05, y: (j: number) => -(i + 1 - j) * 14, ease: 'none' }, i);
  });
};

const highEnd: Demo = (el) => {
  el.classList.add('d-lujo');
  el.innerHTML = `<div class="lujo-marco"><div class="lujo-carta">
      <div class="lujo-brillo"></div>
      <p class="lujo-k">Edición 04</p>
      <h4>Reloj Meridiano</h4>
      <div class="lujo-esfera"><i></i><i></i></div>
      <div class="lujo-pie"><span>Acero, 38 mm</span><button>Reservar</button></div>
    </div></div>`;
  const c = el.querySelector<HTMLElement>('.lujo-carta')!;
  if (RM) return;
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
    c.style.setProperty('--bx', `${(x + 0.5) * 100}%`);
    c.style.setProperty('--by', `${(y + 0.5) * 100}%`);
  });
  el.addEventListener('pointerleave', () => { c.style.transform = ''; });
};

const minimalista: Demo = (el) => {
  el.classList.add('d-mini');
  el.innerHTML = `<div class="mini-bento">
    <div class="mb-a"><p>Menos,<br>pero mejor.</p></div>
    <div class="mb-b"><span>12</span><small>notas este mes</small></div>
    <div class="mb-c"><small>Leyendo</small><p>Dieter Rams, <em>Diez principios</em></p></div>
    <div class="mb-d"><small>Hoy</small><p>Escribir sin distracciones.</p></div>
  </div>`;
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('en'); io.disconnect(); } }, { threshold: 0.4 });
  io.observe(el);
};

const brutalista: Demo = (el) => {
  el.classList.add('d-brut');
  el.innerHTML = `<div class="brut-rej">
    <p class="brut-top"><span>EXP. 0036/SK</span><span>NIVEL: ABIERTO</span></p>
    <p class="brut-num">0<b>${SKILLS.length}</b></p>
    <p class="brut-txt">HERRAMIENTAS<br>CATALOGADAS</p>
    <p class="brut-sello">DESCLASIFICADO</p>
    <p class="brut-log" aria-live="off"></p>
  </div>`;
  const log = el.querySelector('.brut-log')!;
  const nombres = SKILLS.map((s) => s.nombre.toUpperCase());
  enBucle(el, 900, (n) => { log.textContent = `> REG ${String(n % 99).padStart(2, '0')} · ${nombres[n % nombres.length]}`; });
};

const rediseno: Demo = (el) => {
  el.classList.add('d-red');
  el.innerHTML = `
    <div class="red-capa red-vieja" aria-hidden="true">
      <p class="rv-marq">¡¡Bienvenidos a nuestra web!! Última actualización: 2009</p>
      <table><tr><td class="rv-menu"><u>Inicio</u><br><u>Quiénes somos</u><br><u>Contacto</u></td>
      <td><h4>Ferretería López</h4><p>Tenemos de todo. Haga click <u>aquí</u> para ver el catálogo.</p><span class="rv-cont">Visitas: 004213</span></td></tr></table>
    </div>
    <div class="red-capa red-nueva" aria-hidden="true">
      <p class="rn-k">Ferretería López · desde 1962</p>
      <h4>Lo que falta en casa,<br>a dos calles.</h4>
      <div class="rn-pie"><span>Ver catálogo</span><span>Abierto hasta las 20:30</span></div>
    </div>
    <div class="red-scan"><span>auditoría</span></div>`;
  alScroll(el, (p) => el.style.setProperty('--scan', `${(tramo(p, 0.25, 0.7) * 100).toFixed(1)}%`));
};

const imagenACodigo: Demo = (el) => {
  el.classList.add('d-i2c');
  el.innerHTML = `
    <div class="i2c-boceto" aria-hidden="true">
      <svg viewBox="0 0 300 200"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M22 28c40-2 90 1 120-1"/><path d="M22 46c30 0 60 2 80 0"/>
        <path d="M24 70c80-3 170 2 252-1M24 70c-2 30 1 70 0 104M276 69c2 35-1 70 1 105M24 174c90 2 170-2 252 0"/>
        <path d="M44 92c30 0 60 1 90 0M44 110c40 0 70 1 110-1M44 128c20 0 40 1 60 0"/>
        <path d="M190 140c20-1 46 1 64 0 2 10 0 16 0 18-20 1-44-1-64 0-1-6 0-12 0-18z"/>
        <circle cx="236" cy="38" r="16"/></g></svg>
    </div>
    <div class="i2c-real" aria-hidden="true">
      <p class="i2c-k">Tu próximo viaje</p><p class="i2c-t">Lisboa en tres días</p>
      <div class="i2c-caja"><p>Alfama al amanecer, tranvía 28 y pastéis en Belém.</p><p class="i2c-p">Desde 189 €</p><span class="i2c-b">Reservar</span></div>
      <span class="i2c-avatar"></span>
    </div>
    <div class="i2c-raya"></div>`;
  alScroll(el, (p) => el.style.setProperty('--wipe', `${(tramo(p, 0.2, 0.7) * 100).toFixed(1)}%`));
};

const imagenWeb: Demo = (el) => {
  el.classList.add('d-tira');
  const secciones = [
    ['Héroe', 'Titular grande, foto a sangre'],
    ['Problema', 'Tres frases, sin iconos'],
    ['Producto', 'Captura inclinada'],
    ['Prueba', 'Cifras y logos'],
    ['Cierre', 'Una sola llamada'],
  ];
  el.innerHTML = `<div class="tira">${secciones.map(([t, d], i) => `<figure class="tira-img tira-${i}"><div class="tira-arte"></div><figcaption><b>${String(i + 1).padStart(2, '0')} ${t}</b>${d}</figcaption></figure>`).join('')}</div>`;
  const tira = el.querySelector<HTMLElement>('.tira')!;
  alScroll(el, (p) => {
    const max = tira.scrollWidth - el.clientWidth;
    tira.style.transform = `translateX(${(-max * tramo(p, 0.15, 0.85)).toFixed(1)}px)`;
  });
};

const imagenMovil: Demo = (el) => {
  el.classList.add('d-moviles');
  const pantallas = [
    ['Hoy', '<i class="m-anillo"></i><i class="m-barra"></i><i class="m-barra corta"></i>'],
    ['Rutas', '<i class="m-mapa"></i><i class="m-barra"></i>'],
    ['Perfil', '<i class="m-cara"></i><i class="m-barra"></i><i class="m-barra corta"></i>'],
  ];
  el.innerHTML = pantallas.map(([t, c], i) => `<div class="movil movil-${i}"><span class="movil-isla"></span><p>${t}</p>${c}</div>`).join('');
  alScroll(el, (p) => el.style.setProperty('--abanico', tramo(p, 0.2, 0.6).toFixed(3)));
};

const stitch: Demo = (el) => {
  el.classList.add('d-stitch');
  const lineas = [
    ['h', '# DESIGN.md · AFR Claude Skills'],
    ['c', '## Tipografía'],
    ['t', 'display: Fraunces, 600, -0.02em'],
    ['t', 'texto: Geist, 400, 1.55'],
    ['c', '## Color'],
    ['t', 'papel #f3efe6 · tinta #16140f'],
    ['t', 'acento #d8452b, solo en llamadas'],
    ['c', '## Reglas'],
    ['t', 'nada de degradados morados'],
    ['t', 'una idea por sección'],
  ];
  el.innerHTML = `<pre class="stitch-doc">${lineas.map(([k, t], i) => `<span class="sl sl-${k}" style="--i:${i}">${t}</span>`).join('\n')}</pre>`;
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('en'); io.disconnect(); } }, { threshold: 0.4 });
  io.observe(el);
};

const salidaCompleta: Demo = (el) => {
  el.classList.add('d-full');
  const completo = [
    'export function Precio({ euros, tachado }) {',
    '  const f = new Intl.NumberFormat("es-ES", {',
    '    style: "currency", currency: "EUR",',
    '  });',
    '  return (',
    '    <p className="precio">',
    '      {tachado && <s>{f.format(tachado)}</s>}',
    '      <b>{f.format(euros)}</b>',
    '    </p>',
    '  );',
    '}',
  ];
  el.innerHTML = `<pre class="full-code"><code></code></pre>
    <div class="full-pie"><span class="full-n"></span><button class="full-b">Entregar completo</button></div>`;
  const code = el.querySelector('code')!, n = el.querySelector('.full-n')!, b = el.querySelector<HTMLButtonElement>('.full-b')!;
  const recortado = () => {
    code.innerHTML = completo.slice(0, 3).map(esc).join('\n') + '\n<span class="full-tijera">  // …el resto igual que antes</span>';
    n.textContent = '3 de 11 líneas';
    b.textContent = 'Entregar completo';
  };
  let entero = false;
  recortado();
  b.addEventListener('click', () => {
    entero = !entero;
    if (!entero) return recortado();
    code.innerHTML = completo.map((l, i) => `<span class="full-l" style="--i:${i}">${esc(l)}</span>`).join('\n');
    n.textContent = '11 de 11 líneas';
    b.textContent = 'Volver a recortar';
  });
};

const brandkit: Demo = (el) => {
  el.classList.add('d-brand');
  el.innerHTML = `<div class="bk">
    <div class="bk-logo"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="3"/><path d="M34 86 60 30l26 56M44 66h32" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round"/></svg><p>AFR</p></div>
    <div class="bk-col"><i style="--c:#16140f"></i><i style="--c:#f3efe6"></i><i style="--c:#d8452b"></i><i style="--c:#7b8c6f"></i></div>
    <div class="bk-tipo"><p class="bk-aa">Aa</p><p>Fraunces · Geist</p></div>
  </div>`;
};

const tasteV1: Demo = () => {};

// ——— Mundos con scroll

// Proyección isométrica para los dioramas de scroll-world.
const iso = (x: number, y: number, z: number) => `${(200 + (x - y) * 17.3).toFixed(1)},${(150 + (x + y) * 10 - z * 20).toFixed(1)}`;
function caja(x: number, y: number, w: number, d: number, h: number, [techo, izq, der]: string[]) {
  const p = (pts: number[][], c: string) => `<polygon points="${pts.map(([a, b, z]) => iso(a, b, z)).join(' ')}" fill="${c}"/>`;
  return p([[x, y, h], [x + w, y, h], [x + w, y + d, h], [x, y + d, h]], techo)
    + p([[x, y + d, 0], [x + w, y + d, 0], [x + w, y + d, h], [x, y + d, h]], izq)
    + p([[x + w, y, 0], [x + w, y + d, 0], [x + w, y + d, h], [x + w, y, h]], der);
}

const scrollWorld: Demo = (el) => {
  el.classList.add('d-mundo');
  const suelo = (c: string) => caja(-5, -5, 10, 10, 0.4, [c, '#3d5c3a', '#2f4a2d']);
  const escenas = [
    // Fuera: una isla con el almacén. La cámara entra por la puerta.
    { nombre: 'Fuera', origen: '57% 55%', svg: suelo('#8fbf6a') + caja(-2.5, -2.5, 5, 4, 2.6, ['#e9e2d0', '#c9bfa6', '#b0a68c']) + caja(-0.6, 1.5, 1.2, 0.05, 1.4, ['#2b2a26', '#2b2a26', '#2b2a26']) + caja(3, 2.5, 1, 1, 1.4, ['#5c8a46', '#46703a', '#3a5f30']) + caja(-4.2, 2.8, 0.8, 0.8, 1.8, ['#5c8a46', '#46703a', '#3a5f30']) },
    // Dentro: estanterías con cajas. La cámara sale por el portón del fondo.
    { nombre: 'Dentro', origen: '50% 34%', svg: caja(-5, -5, 10, 10, 0.2, ['#d9cdb4', '#b8ab8f', '#a3967a']) + [-3.5, -0.5, 2.5].map((x) => caja(x, -3.5, 1.2, 5, 2.2, ['#8a5a3c', '#6e4630', '#5a3826']) + caja(x + 0.1, -3.2, 1, 1, 0.8, ['#e2a24c', '#c9873a', '#b07430']) + caja(x + 0.1, -1.4, 1, 1.2, 1.6, ['#e2a24c', '#c9873a', '#b07430'])).join('') + caja(-1.2, -5, 2.4, 0.1, 2.4, ['#f4eedf', '#f4eedf', '#f4eedf']) },
    // Destino: la carretera y el camión que se lleva el pedido.
    { nombre: 'En ruta', origen: '50% 50%', svg: suelo('#9cc777') + caja(-5, -1, 10, 2, 0.45, ['#4a4a52', '#38383e', '#2c2c30']) + caja(-1, -0.6, 2.6, 1.2, 1.5, ['#f4eedf', '#d8cfb8', '#c2b89e']) + caja(1.6, -0.6, 1, 1.2, 1.1, ['#d8452b', '#b23a24', '#962f1d']) + caja(-4, 2.5, 1.4, 1.4, 2.6, ['#c9d6e3', '#a8b8c9', '#8fa1b5']) + caja(2.6, -4, 1.6, 1.6, 3.4, ['#c9d6e3', '#a8b8c9', '#8fa1b5']) },
  ];
  el.innerHTML = `<div class="mundo-fijo">${escenas.map((e, i) => `<svg class="mundo-esc" data-i="${i}" viewBox="0 0 400 300" style="transform-origin:${e.origen}" aria-hidden="true">${e.svg}</svg>`).join('')}
    <ol class="mundo-pasos">${escenas.map((e) => `<li>${e.nombre}</li>`).join('')}</ol>
    <p class="mundo-pista">El scroll mueve la cámara, sin cortes</p></div>`;
  const svgs = [...el.querySelectorAll<SVGElement>('.mundo-esc')];
  const pasos = [...el.querySelectorAll('.mundo-pasos li')];
  const pon = (t: number) => {
    const tramos = escenas.length - 1;
    const k = Math.min(tramos - 1, Math.floor(t * tramos));
    const u = t * tramos - k;
    svgs.forEach((s, i) => {
      let escala = 1, alfa = 0;
      if (i === k) { escala = lerp(1, 6, u * u); alfa = 1 - tramo(u, 0.7, 1); }
      else if (i === k + 1) { escala = lerp(0.6, 1, tramo(u, 0.7, 1)); alfa = tramo(u, 0.7, 1); }
      else if (i < k) alfa = 0;
      s.style.transform = `scale(${escala.toFixed(3)})`;
      s.style.opacity = alfa.toFixed(3);
    });
    const actual = u > 0.85 ? k + 1 : k;
    pasos.forEach((p, i) => p.classList.toggle('on', i === actual));
  };
  if (RM) { pon(0); return; }
  alScroll(el, (p) => pon(tramo(p, 0.3, 0.7)));
};

// ——— Sistema de diseño

const PRODUCTOS: Record<string, { estilo: string; fondo: string; tinta: string; acento: string; display: string; texto: string; titulo: string }> = {
  fintech: { estilo: 'Confianza sobria', fondo: '#0f1a2b', tinta: '#e9eef6', acento: '#3ddc97', display: '"Geist Variable", sans-serif', texto: '"Geist Variable", sans-serif', titulo: 'Tu dinero, sin letra pequeña.' },
  salud: { estilo: 'Calma clínica', fondo: '#f1f6f4', tinta: '#183a33', acento: '#2a8c74', display: '"Fraunces Variable", serif', texto: '"Geist Variable", sans-serif', titulo: 'Cita con tu médico hoy mismo.' },
  gaming: { estilo: 'Neón de arcade', fondo: '#120b1f', tinta: '#f4ecff', acento: '#ff3d81', display: '"JetBrains Mono Variable", monospace', texto: '"Geist Variable", sans-serif', titulo: 'Temporada 7: abre el mapa.' },
  lujo: { estilo: 'Editorial de lujo', fondo: '#f5f0e8', tinta: '#1d1a16', acento: '#9a7b4f', display: '"Fraunces Variable", serif', texto: '"Fraunces Variable", serif', titulo: 'Hecho para durar cien años.' },
  cafe: { estilo: 'Cálido artesanal', fondo: '#f6ead9', tinta: '#3b2416', acento: '#c2562b', display: '"Fraunces Variable", serif', texto: '"Geist Variable", sans-serif', titulo: 'Tostado el martes, en tu taza el jueves.' },
};

const uiPro: Demo = (el) => {
  el.classList.add('d-pro');
  const claves = Object.keys(PRODUCTOS);
  el.innerHTML = `<label class="pro-busca"><span>¿Qué producto es?</span>
      <input list="pro-lista" value="cafe" spellcheck="false" autocomplete="off"></label>
    <datalist id="pro-lista">${claves.map((k) => `<option value="${k}">`).join('')}</datalist>
    ${botones(claves)}
    <div class="pro-vista"><p class="pro-estilo"></p><h4></h4><p class="pro-sub">Paleta, pareja tipográfica y estilo sugeridos.</p>
      <div class="pro-colores"><i></i><i></i><i></i></div><span class="pro-cta">Empezar</span></div>`;
  const inp = el.querySelector('input')!;
  const v = el.querySelector<HTMLElement>('.pro-vista')!;
  const pon = (k: string) => {
    const d = PRODUCTOS[k];
    if (!d) return;
    Object.assign(v.style, { background: d.fondo, color: d.tinta });
    v.style.setProperty('--acento', d.acento);
    v.style.setProperty('--display', d.display);
    v.style.setProperty('--texto', d.texto);
    v.querySelector('.pro-estilo')!.textContent = d.estilo;
    v.querySelector('h4')!.textContent = d.titulo;
    v.querySelectorAll<HTMLElement>('.pro-colores i').forEach((i, n) => { i.style.background = [d.fondo, d.tinta, d.acento][n]; });
    el.querySelectorAll('.mini-botones button').forEach((b, n) => b.setAttribute('aria-pressed', String(claves[n] === k)));
  };
  inp.addEventListener('input', () => pon(inp.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')));
  alPulsar(el, (i) => { inp.value = claves[i]; pon(claves[i]); });
  pon('cafe');
};

const design: Demo = (el) => {
  el.classList.add('d-logos');
  const estilos = ['Lineal', 'Geométrico', 'Caligráfico', 'Insignia'];
  el.innerHTML = `<div class="logo-escena">
      <svg class="lg lg-0" viewBox="0 0 120 120"><path d="M30 92 60 26l30 66M41 70h38" fill="none" stroke="currentColor" stroke-width="3"/></svg>
      <svg class="lg lg-1" viewBox="0 0 120 120"><path d="M60 18 100 96H20z" fill="currentColor"/><rect x="44" y="70" width="32" height="12" fill="var(--fondo-escena)"/></svg>
      <svg class="lg lg-2" viewBox="0 0 120 120"><text x="60" y="84" text-anchor="middle" font-family="Fraunces Variable, serif" font-style="italic" font-size="78" fill="currentColor">A</text></svg>
      <svg class="lg lg-3" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="currentColor"/><circle cx="60" cy="60" r="42" fill="none" stroke="var(--fondo-escena)" stroke-width="1.5" stroke-dasharray="3 3"/><text x="60" y="72" text-anchor="middle" font-family="JetBrains Mono Variable, monospace" font-weight="700" font-size="30" fill="var(--fondo-escena)">AFR</text></svg>
    </div>${botones(estilos)}`;
  const escena = el.querySelector<HTMLElement>('.logo-escena')!;
  let actual = 0, manual = false;
  const pon = (i: number) => { actual = i; escena.dataset.v = String(i); el.querySelectorAll('.mini-botones button').forEach((b, n) => b.setAttribute('aria-pressed', String(n === i))); };
  alPulsar(el, (i) => { manual = true; pon(i); });
  enBucle(el, 1800, () => { if (!manual) pon((actual + 1) % 4); });
  pon(0);
};

const brand: Demo = (el) => {
  el.classList.add('d-voz');
  const tonos = [
    ['Cercano', '¡Ya va de camino! Te avisamos en cuanto llegue a tu calle.'],
    ['Institucional', 'Su pedido ha sido expedido. Recibirá una notificación previa a la entrega.'],
    ['Gamberro', 'Tu paquete ya ha salido y viene con prisa. Pon la cafetera.'],
  ];
  el.innerHTML = `${botones(tonos.map((t) => t[0]))}<blockquote class="voz-frase"></blockquote><p class="voz-nota">El mismo mensaje, tres voces de marca.</p>`;
  const q = el.querySelector('blockquote')!;
  const pon = (i: number) => { q.dataset.tono = String(i); q.textContent = tonos[i][1]; };
  alPulsar(el, pon);
  pon(0);
};

const designSystem: Demo = (el) => {
  el.classList.add('d-tokens');
  el.innerHTML = `<div class="tk">
      <div class="tk-col"><p>Primitivo</p><code>--naranja-500</code><i class="tk-sw"></i></div>
      <span class="tk-flecha">→</span>
      <div class="tk-col"><p>Semántico</p><code>--color-accion</code><i class="tk-sw"></i></div>
      <span class="tk-flecha">→</span>
      <div class="tk-col"><p>Componente</p><code>--boton-fondo</code><button class="tk-boton">Guardar</button></div>
    </div>
    <label class="tk-tono">Tono del primitivo<input type="range" min="0" max="360" value="14"></label>`;
  const r = el.querySelector('input')!;
  const pon = () => el.style.setProperty('--tono', r.value);
  r.addEventListener('input', pon);
  pon();
};

const banner: Demo = (el) => {
  el.classList.add('d-banner');
  const formatos = [['Instagram 1:1', '1 / 1'], ['LinkedIn 1,91:1', '1.91 / 1'], ['YouTube 16:9', '16 / 9'], ['Historia 9:16', '9 / 16']];
  el.innerHTML = `<div class="bn-marco"><div class="bn"><p class="bn-k">Del 12 al 30 de noviembre</p><p class="bn-t">Semana del<br>libro usado</p><span class="bn-cta">Ver ofertas</span><i class="bn-forma"></i></div></div>${botones(formatos.map((f) => f[0]))}`;
  const b = el.querySelector<HTMLElement>('.bn')!;
  const pon = (i: number) => { b.style.aspectRatio = formatos[i][1]; b.dataset.f = String(i); };
  alPulsar(el, pon);
  pon(0);
};

const slidesCK: Demo = (el) => {
  el.classList.add('d-deck');
  el.innerHTML = `<div class="deck">
      <section class="dk dk-0"><p class="dk-k">Resultados Q3</p><h4>Crecemos donde<br>menos gastamos.</h4></section>
      <section class="dk dk-1"><p class="dk-k">Ingresos por canal</p><svg viewBox="0 0 200 90" aria-hidden="true">${[38, 62, 24, 80].map((h, i) => `<rect x="${14 + i * 48}" y="${86 - h}" width="30" height="${h}" rx="2" style="--i:${i}"/>`).join('')}</svg></section>
      <section class="dk dk-2"><p class="dk-k">La decisión</p><h4>Doblar orgánico<br>en enero.</h4></section>
    </div><div class="dk-pie"><button class="dk-prev" aria-label="Anterior">←</button><span class="dk-n">1 / 3</span><button class="dk-next" aria-label="Siguiente">→</button></div>`;
  let i = 0, manual = false;
  const pon = (n: number) => { i = (n + 3) % 3; el.dataset.slide = String(i); el.querySelector('.dk-n')!.textContent = `${i + 1} / 3`; };
  el.querySelector('.dk-prev')!.addEventListener('click', () => { manual = true; pon(i - 1); });
  el.querySelector('.dk-next')!.addEventListener('click', () => { manual = true; pon(i + 1); });
  enBucle(el, 2600, (n) => { if (!manual && n) pon(i + 1); });
  pon(0);
};

const uiStyling: Demo = (el) => {
  el.classList.add('d-shad');
  el.innerHTML = `<form class="shad" onsubmit="return false">
      <div class="shad-cab"><p>Crear cuenta</p><label class="shad-sw"><input type="checkbox" role="switch" aria-label="Modo oscuro"><span></span>Oscuro</label></div>
      <label>Correo<input type="email" placeholder="tu@correo.es" autocomplete="off"></label>
      <label class="shad-check"><input type="checkbox" checked> Recibir novedades</label>
      <button>Continuar</button>
    </form>`;
  const sw = el.querySelector<HTMLInputElement>('.shad-sw input')!;
  sw.addEventListener('change', () => el.classList.toggle('oscuro', sw.checked));
};

// ——— Pulir y copiar estilos

const impeccable: Demo = (el) => {
  el.classList.add('d-imp');
  const ops = ['Original', '/bolder', '/quieter', '/polish'];
  el.innerHTML = `<div class="imp-carta"><p class="imp-k">Nuevo</p><h4>Taller de cerámica</h4><p>Sábados por la mañana, ocho plazas, todo el barro incluido.</p><span class="imp-cta">Apuntarme</span></div>${botones(ops)}`;
  const c = el.querySelector<HTMLElement>('.imp-carta')!;
  alPulsar(el, (i) => { c.dataset.op = String(i); });
};

const awesomeDesign: Demo = (el) => {
  el.classList.add('d-marcas');
  const marcas = ['A lo Linear', 'A lo Stripe', 'A lo Notion', 'A lo Apple'];
  el.innerHTML = `<div class="mc"><p class="mc-k">Novedad</p><h4>Facturas que se envían solas</h4><p>Conecta tu banco y olvídate de perseguir pagos.</p><span class="mc-cta">Probar gratis</span></div>${botones(marcas)}<p class="mc-nota">Tokens aproximados, en el espíritu de cada DESIGN.md.</p>`;
  const c = el.querySelector<HTMLElement>('.mc')!;
  alPulsar(el, (i) => { c.dataset.m = String(i); });
  c.dataset.m = '0';
};

const skillui: Demo = (el) => {
  el.classList.add('d-skillui');
  el.innerHTML = `<div class="su-barra"><code>$ npx skillui --url</code><span>pedrogomez.dev/proyecto/skills</span></div>
    <button class="su-b">Extraer el diseño de esta página</button>
    <div class="su-res" hidden><p class="su-t">Colores <span class="su-nc"></span></p><div class="su-cols"></div><p class="su-t">Tipografías</p><ul class="su-fuentes"></ul><p class="su-t">Radios</p><p class="su-radios"></p></div>`;
  // Análisis estático de verdad: recorre el DOM de esta misma página y cuenta estilos calculados.
  el.querySelector('.su-b')!.addEventListener('click', () => {
    const colores = new Map<string, number>(), fuentes = new Map<string, number>(), radios = new Map<string, number>();
    const suma = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) || 0) + 1);
    document.querySelectorAll('body *').forEach((n) => {
      const cs = getComputedStyle(n);
      for (const c of [cs.color, cs.backgroundColor]) if (c && !c.includes('rgba(0, 0, 0, 0)')) suma(colores, c);
      suma(fuentes, cs.fontFamily.split(',')[0].replace(/"/g, ''));
      if (cs.borderRadius && cs.borderRadius !== '0px') suma(radios, cs.borderRadius);
    });
    const top = (m: Map<string, number>, k: number) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, k);
    el.querySelector('.su-nc')!.textContent = `(${colores.size} distintos, los 12 más usados)`;
    el.querySelector('.su-cols')!.innerHTML = top(colores, 12).map(([c, n]) => `<i style="background:${c}" title="${c} · ${n}"></i>`).join('');
    el.querySelector('.su-fuentes')!.innerHTML = top(fuentes, 4).map(([f, n]) => `<li style="font-family:'${f}'">${f} <span>${n}</span></li>`).join('');
    el.querySelector('.su-radios')!.textContent = top(radios, 5).map(([r]) => r).join(' · ');
    (el.querySelector('.su-res') as HTMLElement).hidden = false;
  });
};

// ——— Revisar, probar y ordenar

const guidelines: Demo = (el) => {
  el.classList.add('d-wdg');
  const fallos = [
    ['contraste', 'El texto gris claro no llega a 4,5:1'],
    ['etiqueta', 'El campo no tiene etiqueta'],
    ['tactil', 'El botón mide menos de 24 px'],
    ['foco', 'No se ve el foco con teclado'],
  ];
  el.innerHTML = `<div class="wdg-comp" data-arreglados="">
      <p class="wdg-txt">Suscríbete a la newsletter</p>
      <div class="wdg-fila"><label class="wdg-label" for="wdg-mail">Correo</label><input id="wdg-mail" placeholder="correo"><button class="wdg-btn">OK</button></div>
    </div>
    <ol class="wdg-lista">${fallos.map(([k, t]) => `<li data-k="${k}"><span>${t}</span><button>Arreglar</button></li>`).join('')}</ol>`;
  const comp = el.querySelector<HTMLElement>('.wdg-comp')!;
  el.querySelector('.wdg-lista')!.addEventListener('click', (e) => {
    const li = (e.target as HTMLElement).closest('li');
    if (!li || li.classList.contains('ok')) return;
    li.classList.add('ok');
    li.querySelector('button')!.textContent = 'Arreglado';
    comp.classList.add(`fix-${li.dataset.k}`);
  });
};

const playwright: Demo = (el) => {
  el.classList.add('d-pw');
  el.innerHTML = `<div class="pw-nav"><div class="pw-barra"><i></i><i></i><i></i><span>localhost:5173/registro</span></div>
      <div class="pw-pag"><p>Registro</p><div class="pw-input"><span class="pw-escrito"></span></div><span class="pw-boton">Crear cuenta</span><p class="pw-ok">Cuenta creada</p></div>
      <span class="pw-cursor" aria-hidden="true"></span></div>
    <pre class="pw-code"><span>await page.goto('/registro');</span>
<span>await page.getByRole('textbox').fill('pedro@afr.dev');</span>
<span>await page.getByRole('button', { name: 'Crear cuenta' }).click();</span>
<span>await expect(page.getByText('Cuenta creada')).toBeVisible();</span>
<span class="pw-pasa">✓ 1 passed (1.4s)</span></pre>`;
  const txt = 'pedro@afr.dev';
  const escrito = el.querySelector('.pw-escrito')!;
  const pasos = 7;
  enBucle(el, 900, (n) => {
    const s = n % pasos;
    el.dataset.paso = String(s);
    escrito.textContent = s >= 2 ? txt : s === 1 ? txt.slice(0, 5) : '';
  });
};

const findSkills: Demo = (el) => {
  el.classList.add('d-term');
  el.innerHTML = `<div class="term"><p class="term-cab"><i></i><i></i><i></i> terminal</p>
    <label class="term-linea"><span>$ npx skills find</span><input spellcheck="false" autocomplete="off" aria-label="Buscar skills en este catálogo"></label>
    <ul class="term-res" aria-live="polite"></ul></div>`;
  const inp = el.querySelector('input')!, res = el.querySelector('.term-res')!;
  const busca = (q: string) => {
    const t = q.trim().toLowerCase();
    if (!t) { res.innerHTML = '<li class="term-gris">Escribe lo que necesitas: scroll, tests, memoria, marca…</li>'; return; }
    const hits = SKILLS.filter((s) => (s.nombre + ' ' + s.hace + ' ' + (s.cuando || '')).toLowerCase().includes(t)).slice(0, 5);
    res.innerHTML = hits.length
      ? hits.map((s) => `<li><a href="#s-${s.id}">${s.nombre}</a> <span class="term-gris">· ${s.autor}</span></li>`).join('')
      : '<li class="term-gris">Nada por aquí. Quizá toque escribir una con skill-creator.</li>';
  };
  inp.addEventListener('input', () => busca(inp.value));
  // Teclea sola una búsqueda de ejemplo la primera vez que se ve.
  const ejemplo = 'scroll';
  if (RM) { inp.value = ejemplo; busca(ejemplo); return; }
  let k = 0;
  const t = setInterval(() => {
    if (document.activeElement === inp) return clearInterval(t);
    inp.value = ejemplo.slice(0, ++k);
    busca(inp.value);
    if (k >= ejemplo.length) clearInterval(t);
  }, 160);
};

const untangle: Demo = (el) => {
  el.classList.add('d-untangle');
  const W = 320, H = 200;
  const izq = ['auth', 'pagos', 'carrito', 'emails', 'perfil'];
  const der = ['auth/', 'pagos/', 'carrito/', 'emails/', 'perfil/'];
  // Enredado: cada pieza tira de varias carpetas. Ordenado: cada pieza vive en la suya.
  const enredo = [[0, 3], [0, 1], [1, 4], [1, 2], [2, 0], [2, 3], [3, 1], [4, 2], [4, 0]];
  const y = (i: number) => 24 + i * ((H - 48) / 4);
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">
      ${izq.map((t, i) => `<text x="12" y="${y(i) + 4}" class="un-t">${t}</text>`).join('')}
      ${der.map((t, i) => `<text x="${W - 12}" y="${y(i) + 4}" text-anchor="end" class="un-t">${t}</text>`).join('')}
      <g class="un-hilos"></g></svg>
    <p class="un-leyenda"><span class="un-mal">vínculos ocultos</span><span class="un-bien">cada cosa con lo suyo</span></p>`;
  const g = el.querySelector('.un-hilos')!;
  g.innerHTML = enredo.map(() => '<path/>').join('');
  const ps = [...g.querySelectorAll('path')];
  alScroll(el, (p) => {
    const t = tramo(p, 0.25, 0.7);
    el.style.setProperty('--orden', t.toFixed(3));
    enredo.forEach(([a, b], i) => {
      const destino = lerp(b, a, t), y1 = y(a), y2 = y(destino);
      const sobra = i >= 5 ? 1 - t : 1;
      ps[i].setAttribute('d', `M78 ${y1} C 150 ${y1}, 170 ${y2}, ${W - 82} ${y2}`);
      ps[i].style.opacity = sobra.toFixed(2);
    });
  });
};

// ——— Presentaciones

const ritmo: Demo = (el) => {
  el.classList.add('d-ritmo');
  const malas = 'Nuestra estrategia para el próximo trimestre se basa en tres pilares fundamentales que, combinados, nos permitirán crecer de forma sostenible, reducir costes operativos y mejorar la satisfacción del cliente en todos los canales.';
  const buenas = ['Tres apuestas.', 'Crecer sin quemar caja.', 'Gastar menos en operar.', 'Clientes más contentos.'];
  el.innerHTML = `<div class="rt-mala"><p class="rt-k">Antes · ${malas.split(' ').length} palabras</p><p>${malas}</p></div>
    <div class="rt-buenas">${buenas.map((b, i) => `<div class="rt-sl" style="--i:${i}"><p class="rt-k">${i + 1} / 4 · ${b.split(' ').length} palabras</p><p>${b}</p></div>`).join('')}</div>
    <p class="rt-nota">Lo que me llevé de frontend-slides y html-ppt: una idea por diapositiva y pocas palabras.</p>`;
  alScroll(el, (p) => el.style.setProperty('--rt', tramo(p, 0.15, 0.5).toFixed(3)));
};

// ——— Agentes y automatización

const voltagent: Demo = (el) => {
  el.classList.add('d-volt');
  const esp = [['react-specialist', 'Componente de pago'], ['typescript-pro', 'Tipos del API'], ['code-reviewer', 'Revisar el PR'], ['accessibility-tester', 'Probar con lector'], ['performance-engineer', 'Bajar el LCP']];
  const W = 340, H = 220, cx = W / 2, cy = H / 2;
  const pos = esp.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / esp.length; return [cx + Math.cos(a) * 110, cy + Math.sin(a) * 82]; });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">
      ${pos.map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`).join('')}
      <circle class="vt-paquete" r="4" cx="${cx}" cy="${cy}"/>
      <g class="vt-centro"><circle cx="${cx}" cy="${cy}" r="26"/><text x="${cx}" y="${cy + 4}" text-anchor="middle">Claude</text></g>
      ${pos.map(([x, y], i) => `<g class="vt-esp" data-i="${i}"><rect x="${x - 56}" y="${y - 11}" width="112" height="22" rx="11"/><text x="${x}" y="${y + 4}" text-anchor="middle">${esp[i][0]}</text></g>`).join('')}
    </svg><p class="vt-tarea"></p>`;
  const paq = el.querySelector<SVGCircleElement>('.vt-paquete')!, tarea = el.querySelector('.vt-tarea')!;
  enBucle(el, 1600, (n) => {
    const i = n % esp.length;
    el.querySelectorAll('.vt-esp').forEach((g, k) => g.classList.toggle('activo', k === i));
    paq.style.transform = `translate(${pos[i][0] - cx}px, ${pos[i][1] - cy}px)`;
    tarea.textContent = `Delega «${esp[i][1]}» en ${esp[i][0]}`;
  });
};

const n8n: Demo = (el) => {
  el.classList.add('d-n8n');
  const nodos = [['Webhook', 'Nuevo cliente'], ['Validar', 'Correo y CIF'], ['¿Empresa?', 'Si / No'], ['Sheets', 'Añadir fila'], ['Slack', 'Avisar a ventas']];
  el.innerHTML = `<div class="n8">${nodos.map(([t, d], i) => `<div class="n8-n n8-${i}"><b>${t}</b><span>${d}</span><i class="n8-ok">✓</i></div>`).join('')}
    <svg class="n8-cables" aria-hidden="true"><path pathLength="100"/></svg></div>
    <p class="n8-nota">Claude monta el workflow con n8n MCP y lo valida antes de activarlo.</p>`;
  // Los cables se trazan desde la posición real de cada nodo, para que encajen a cualquier ancho.
  const caja = el.querySelector<HTMLElement>('.n8')!, cable = el.querySelector('.n8-cables path')!;
  const ns = [...el.querySelectorAll<HTMLElement>('.n8-n')];
  const traza = () => {
    const o = caja.getBoundingClientRect();
    const r = ns.map((n) => n.getBoundingClientRect()).map((b) => ({ l: b.left - o.left, r: b.right - o.left, y: b.top - o.top + b.height / 2 }));
    const c = (a: typeof r[0], b: typeof r[0]) => { const m = (a.r + b.l) / 2; return `M${a.r} ${a.y}C${m} ${a.y} ${m} ${b.y} ${b.l} ${b.y}`; };
    cable.setAttribute('d', [c(r[0], r[1]), c(r[1], r[2]), c(r[2], r[3]), c(r[2], r[4])].join(''));
  };
  new ResizeObserver(traza).observe(caja);
  alScroll(el, (p) => {
    const t = tramo(p, 0.2, 0.7);
    el.style.setProperty('--flujo', t.toFixed(3));
    el.querySelectorAll('.n8-n').forEach((n, i) => n.classList.toggle('hecho', t >= [0.05, 0.3, 0.55, 0.85, 0.85][i]));
  });
};

const ecc: Demo = (el) => {
  el.classList.add('d-ecc');
  const N = 240;
  const tipos = ['skill', 'agente', 'hook', 'regla'];
  el.innerHTML = `<div class="ecc-rej">${Array.from({ length: N }, (_, i) => `<i class="ecc-${tipos[((i * 2654435761) >>> 0) % 4]}${i % 23 === 0 ? ' minimo' : ''}"></i>`).join('')}</div>
    <div class="ecc-pie"><label class="ecc-sw"><input type="checkbox" role="switch"> Perfil mínimo</label><span class="ecc-ctx">Contexto ocupado <b></b></span></div>
    <p class="ecc-ley">${tipos.map((t) => `<span class="ecc-l-${t}">${t}s</span>`).join('')} · ilustrativo</p>`;
  const sw = el.querySelector('input')!, ctx = el.querySelector('.ecc-ctx b')!;
  const pon = () => { el.classList.toggle('min', sw.checked); ctx.textContent = sw.checked ? 'bajo' : 'mucho'; };
  sw.addEventListener('change', pon);
  pon();
};

// ——— Memoria y conocimiento

const claudeMem: Demo = (el) => {
  el.classList.add('d-mem');
  const dias = [
    ['Lunes', ['Lee 40 archivos', 'Arregla el login', 'Prueba 3 enfoques']],
    ['Martes', ['Migra la base de datos', 'Rompe un test', 'Lo repara']],
  ];
  el.innerHTML = `<div class="mem">
      ${dias.map(([d, obs]) => `<div class="mem-dia"><p>${d}</p>${(obs as string[]).map((o, i) => `<span class="mem-obs" style="--i:${i}">${o}</span>`).join('')}</div>`).join('')}
      <div class="mem-chip">Recuerdo: login con JWT; la migración 012 necesita índice</div>
      <div class="mem-dia mem-hoy"><p>Miércoles</p><span class="mem-iny">↳ Claude empieza ya sabiéndolo</span></div>
    </div>`;
  alScroll(el, (p) => el.style.setProperty('--mem', tramo(p, 0.15, 0.45).toFixed(3)));
};

const lightrag: Demo = (el) => {
  el.classList.add('d-rag');
  const N: [string, number, number, string][] = [
    ['Contrato 2024.pdf', 60, 40, 'doc'], ['Acta reunión.docx', 70, 170, 'doc'], ['Wiki interna', 268, 30, 'doc'],
    ['Cliente Acme', 170, 70, 'ent'], ['Penalización', 150, 140, 'ent'], ['Plazo 30 días', 260, 120, 'ent'], ['Ana (legal)', 250, 190, 'ent'],
  ];
  const E = [[0, 3], [0, 4], [1, 3], [1, 6], [2, 5], [4, 5], [3, 5], [6, 4]];
  const preguntas: [string, number[], string][] = [
    ['¿Qué pasa si Acme paga tarde?', [0, 3, 4, 5], 'Penalización tras el plazo de 30 días (Contrato 2024).'],
    ['¿Quién revisó la penalización?', [1, 6, 4], 'Ana, de legal, según el acta de la reunión.'],
  ];
  el.innerHTML = `${botones(preguntas.map((q) => q[0]))}
    <svg viewBox="0 0 330 210" aria-hidden="true">
      ${E.map(([a, b]) => `<line data-a="${a}" data-b="${b}" x1="${N[a][1]}" y1="${N[a][2]}" x2="${N[b][1]}" y2="${N[b][2]}"/>`).join('')}
      ${N.map(([t, x, y, k], i) => `<g class="rag-n rag-${k}" data-i="${i}"><circle cx="${x}" cy="${y}" r="${k === 'doc' ? 7 : 5}"/><text x="${x}" y="${y - 11}" text-anchor="middle">${t}</text></g>`).join('')}
    </svg><p class="rag-resp"></p>`;
  const pon = (q: number) => {
    const ruta = new Set(preguntas[q][1]);
    el.querySelectorAll<SVGGElement>('.rag-n').forEach((g) => g.classList.toggle('on', ruta.has(+g.dataset.i!)));
    el.querySelectorAll<SVGLineElement>('line').forEach((l) => l.classList.toggle('on', ruta.has(+l.dataset.a!) && ruta.has(+l.dataset.b!)));
    el.querySelector('.rag-resp')!.textContent = preguntas[q][2];
  };
  alPulsar(el, pon);
  pon(0);
};

function esc(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
}

export const DEMOS: Record<string, Demo> = {
  'design-taste-frontend': tasteFrontend,
  'gpt-taste': gptTaste,
  'high-end-visual-design': highEnd,
  'minimalist-ui': minimalista,
  'industrial-brutalist-ui': brutalista,
  'redesign-existing-projects': rediseno,
  'image-to-code': imagenACodigo,
  'imagegen-frontend-web': imagenWeb,
  'imagegen-frontend-mobile': imagenMovil,
  'stitch-design-taste': stitch,
  'full-output-enforcement': salidaCompleta,
  brandkit,
  'design-taste-frontend-v1': tasteV1,
  'scroll-world': scrollWorld,
  'ui-ux-pro-max': uiPro,
  design,
  brand,
  'design-system': designSystem,
  'banner-design': banner,
  slides: slidesCK,
  'ui-styling': uiStyling,
  impeccable,
  'awesome-design-md': awesomeDesign,
  skillui,
  'web-design-guidelines': guidelines,
  'playwright-cli': playwright,
  'find-skills': findSkills,
  'untangle-codebase': untangle,
  ritmo,
  voltagent,
  'n8n-mcp': n8n,
  ecc,
  'claude-mem': claudeMem,
  lightrag,
};
