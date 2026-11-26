// Small SVG helpers shared by every chart: element creation, axes, and a
// single tooltip style used by all charts.
export const NS = 'http://www.w3.org/2000/svg';

export function svgEl(tag, attrs, parent) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
  if (parent) parent.appendChild(el);
  return el;
}

export function textEl(parent, x, y, str, attrs) {
  const t = svgEl('text', { x, y, ...(attrs || {}) }, parent);
  t.textContent = str;
  return t;
}

// Nice round tick values for an axis from 0..max (or min..max).
export function ticks(min, max, count) {
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span / count)));
  const err = (count * step) / span;
  const nice = err <= 0.15 ? 10 : err <= 0.35 ? 5 : err <= 0.75 ? 2 : 1;
  const s = step * nice;
  const out = [];
  for (let v = Math.ceil(min / s) * s; v <= max + 1e-9; v += s) out.push(v);
  return out;
}

// One shared tooltip element, reused by every chart on the page.
let tip = null;
export function tooltip() {
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'chart-tip';
    tip.setAttribute('role', 'status');
    document.body.appendChild(tip);
  }
  return tip;
}

export function showTip(html, x, y) {
  const t = tooltip();
  t.innerHTML = html;
  t.classList.add('on');
  const pad = 12;
  const w = t.offsetWidth, h = t.offsetHeight;
  let left = x + pad, top = y - h - pad;
  if (left + w > window.innerWidth - 8) left = x - w - pad;
  if (top < 8) top = y + pad;
  t.style.left = left + 'px';
  t.style.top = top + 'px';
}

export function hideTip() {
  if (tip) tip.classList.remove('on');
}

// Attach hover/click tooltip behaviour to an SVG element. `html` may be a
// string or a function returning one. Works with mouse and touch.
export function bindTip(el, html) {
  el.addEventListener('pointerenter', (e) => {
    showTip(typeof html === 'function' ? html() : html, e.clientX, e.clientY);
  });
  el.addEventListener('pointermove', (e) => {
    showTip(typeof html === 'function' ? html() : html, e.clientX, e.clientY);
  });
  el.addEventListener('pointerleave', hideTip);
  el.addEventListener('click', (e) => {
    showTip(typeof html === 'function' ? html() : html, e.clientX, e.clientY);
  });
}
