import '@fontsource-variable/fraunces';
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import './styles.css';
import { BLOQUES, ESTADOS, MISION, PACKS, REVISADO, SKILLS, type Estado, type Skill } from './data';
import { DEMOS } from './demos';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

const ARROW = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

function meta(s: Skill) {
  return [s.autor, s.licencia, s.estrellas && `★ ${s.estrellas}`].filter(Boolean).map((x) => `<span>${esc(x!)}</span>`).join('');
}

function acciones(s: Skill) {
  const b: string[] = [];
  if (s.instalar) b.push(`<button class="copiar" data-copia="${esc(s.instalar)}">Copiar comando</button>`);
  if (s.prompt) b.push(`<button class="copiar" data-copia="${esc(s.prompt)}">Copiar prompt para Claude</button>`);
  if (!s.instalar && !s.prompt) b.push(`<a class="pack" href="#b-${s.bloque}">Se instala con el pack</a>`);
  b.push(`<a class="repo" href="${s.repo}" target="_blank" rel="noopener noreferrer">GitHub ${ARROW}</a>`);
  return `<div class="acciones">${b.join('')}</div>`;
}

function busca(s: Skill) {
  return [s.nombre, s.autor, s.hace, s.cuando, s.bloque, ESTADOS[s.estado].nombre].join(' ').toLowerCase();
}

function ficha(s: Skill, i: number) {
  return `<article class="skill" id="s-${s.id}" data-estado="${s.estado}" data-busca="${esc(busca(s))}">
    <div class="ficha">
      <p class="ficha-num">${String(i).padStart(2, '0')}</p>
      <h3>${esc(s.nombre)}</h3>
      <p class="ficha-meta">${meta(s)}</p>
      <p class="estado estado-${s.estado}" title="${esc(ESTADOS[s.estado].explica)}">${ESTADOS[s.estado].nombre}</p>
      <p class="hace">${esc(s.hace)}</p>
      ${s.cuando ? `<p class="cuando"><b>Cuándo</b> ${esc(s.cuando)}</p>` : ''}
      ${s.ojo ? `<p class="ojo"><b>Ojo</b> ${esc(s.ojo)}</p>` : ''}
      ${acciones(s)}
    </div>
    <div class="escena escena-${s.id}" data-demo="${s.id}" role="group" aria-label="Demo de ${esc(s.nombre)}"></div>
  </article>`;
}

function compacta(s: Skill, i: number) {
  return `<article class="skill skill-compacta" id="s-${s.id}" data-estado="${s.estado}" data-busca="${esc(busca(s))}">
    <p class="ficha-num">${String(i).padStart(2, '0')}</p>
    <h3>${esc(s.nombre)}</h3>
    <p class="ficha-meta">${meta(s)}</p>
    <p class="estado estado-${s.estado}" title="${esc(ESTADOS[s.estado].explica)}">${ESTADOS[s.estado].nombre}</p>
    <p class="hace">${esc(s.hace)}</p>
    ${acciones(s)}
  </article>`;
}

function render() {
  let n = 0;
  $('#bloques').innerHTML = BLOQUES.map((b, bi) => {
    const propias = SKILLS.filter((s) => s.bloque === b.id);
    const grandes = propias.filter((s) => !s.compacta).map((s) => ficha(s, ++n)).join('');
    const peques = propias.filter((s) => s.compacta).map((s) => compacta(s, ++n)).join('');
    const pack = b.repo
      ? `<div class="pack-cabeza">
          <a href="${b.repo.url}" target="_blank" rel="noopener noreferrer">${b.repo.url.replace('https://github.com/', '')} ${ARROW}</a>
          <span>${[b.repo.licencia, `★ ${b.repo.estrellas}`].filter(Boolean).join(' · ')}</span>
          ${b.instalar ? `<pre><code>${esc(b.instalar)}</code></pre><button class="copiar" data-copia="${esc(b.instalar)}">Copiar instalación del pack</button>` : ''}
        </div>`
      : '';
    return `<section class="bloque bloque-${b.id}" id="b-${b.id}" aria-labelledby="t-${b.id}">
      <header class="bloque-cabeza">
        <p class="bloque-num">${String(bi + 1).padStart(2, '0')} / ${String(BLOQUES.length).padStart(2, '0')}</p>
        <h2 id="t-${b.id}">${esc(b.nombre)}</h2>
        <p class="bloque-lema">${esc(b.lema)}</p>
        ${pack}
      </header>
      ${grandes}
      ${b.id === 'slides' ? `<div class="escena escena-ancha" data-demo="ritmo" role="group" aria-label="Demo del ritmo de diapositivas"></div>` : ''}
      ${peques ? `<div class="compactas">${peques}</div>` : ''}
    </section>`;
  }).join('');

  $('#indice').innerHTML = BLOQUES.map((b) => {
    const c = SKILLS.filter((s) => s.bloque === b.id).length;
    return `<li><a href="#b-${b.id}"><span>${esc(b.nombre)}</span><span class="indice-n">${c}</span></a></li>`;
  }).join('');

  const estados = Object.keys(ESTADOS) as Estado[];
  $('#filtros').innerHTML = `<button class="chip" aria-pressed="true" data-estado="">Todas</button>` + estados
    .map((e) => `<button class="chip" aria-pressed="false" data-estado="${e}" title="${esc(ESTADOS[e].explica)}">${ESTADOS[e].nombre} <span>${SKILLS.filter((s) => s.estado === e).length}</span></button>`)
    .join('');

  $('#total').textContent = String(SKILLS.length);
  $('#revisado').textContent = REVISADO;
  $('#mision-texto').innerHTML = esc(MISION).replace(/\[([^\]]+)\]/g, '<span class="hueco" contenteditable="plaintext-only" spellcheck="false">[$1]</span>');

  const nombre = (id: string) => SKILLS.find((s) => s.id === id)?.nombre ?? id;
  $('#packs-lista').innerHTML = PACKS.map((p) => `<article class="pack pack-${p.id}">
      <h3>${esc(p.nombre)}</h3>
      <p class="pack-para">${esc(p.para)}</p>
      <ul class="pack-incluye">${p.incluye.map((id) => `<li><a href="#s-${id}">${esc(nombre(id))}</a></li>`).join('')}</ul>
      ${p.nota ? `<p class="pack-nota">${esc(p.nota)}</p>` : ''}
      <button class="copiar pack-boton" data-copia="${esc(p.prompt)}">Copiar ${esc(p.nombre)}</button>
      <details><summary>Ver el prompt</summary><pre>${esc(p.prompt)}</pre></details>
    </article>`).join('');
}

function filtros() {
  const q = $<HTMLInputElement>('#buscar');
  let estado = '';
  const aplicar = () => {
    const t = q.value.trim().toLowerCase();
    let vistas = 0;
    document.querySelectorAll<HTMLElement>('.skill').forEach((el) => {
      const ok = (!estado || el.dataset.estado === estado) && (!t || el.dataset.busca!.includes(t));
      el.hidden = !ok;
      if (ok) vistas++;
    });
    document.querySelectorAll<HTMLElement>('.bloque').forEach((b) => {
      b.hidden = !b.querySelector('.skill:not([hidden])');
    });
    $('#mostrando').textContent = vistas === SKILLS.length ? '' : `Mostrando ${vistas} de ${SKILLS.length}`;
  };
  q.addEventListener('input', aplicar);
  $('#filtros').addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.chip');
    if (!b) return;
    estado = b.dataset.estado!;
    document.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    aplicar();
  });
}

function copiar() {
  const aviso = $('#aviso');
  let t = 0;
  document.addEventListener('click', async (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-copia], #mision-copiar');
    if (!b) return;
    const texto = b.id === 'mision-copiar' ? $('#mision-texto').innerText : b.dataset.copia!;
    try {
      await navigator.clipboard.writeText(texto);
      aviso.textContent = 'Copiado. Pégalo en Claude Code.';
    } catch {
      aviso.textContent = 'No se pudo copiar: selecciónalo a mano.';
    }
    aviso.classList.add('visible');
    clearTimeout(t);
    t = window.setTimeout(() => aviso.classList.remove('visible'), 2200);
  });
}

// Las demos se montan al acercarse a la pantalla, para no arrancar 30 a la vez.
function demos() {
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const el = en.target as HTMLElement;
      io.unobserve(el);
      DEMOS[el.dataset.demo!]?.(el);
    }
  }, { rootMargin: '400px 0px' });
  document.querySelectorAll<HTMLElement>('.escena[data-demo]').forEach((el) => io.observe(el));
}

render();
filtros();
copiar();
demos();
