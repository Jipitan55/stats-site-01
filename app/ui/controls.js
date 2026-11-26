// Controls shared by sections: segmented toggle, year scrubber, CSV
// download, and the site search.
import { SOURCES } from '../data/sources.js';

// Segmented control: a row of buttons, one active. Calls onChange(value).
export function segmented(container, options, current, onChange, label) {
  container.innerHTML = '';
  container.className = 'segmented';
  container.setAttribute('role', 'group');
  if (label) container.setAttribute('aria-label', label);
  for (const opt of options) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'seg-btn' + (opt.value === current ? ' on' : '');
    b.textContent = opt.label;
    b.setAttribute('aria-pressed', String(opt.value === current));
    b.addEventListener('click', () => onChange(opt.value));
    container.appendChild(b);
  }
}

// Year scrubber: big buttons for each year, with a note of what the year is.
export function yearScrubber(container, years, current, onChange, notes) {
  container.innerHTML = '';
  container.className = 'years';
  container.setAttribute('role', 'group');
  container.setAttribute('aria-label', 'Year');
  for (const y of years) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'year-btn' + (y === current ? ' on' : '');
    b.innerHTML = `<span class="y">${y}</span>` + (notes && notes[y] ? `<span class="yn">${notes[y]}</span>` : '');
    b.setAttribute('aria-pressed', String(y === current));
    b.addEventListener('click', () => onChange(y));
    container.appendChild(b);
  }
}

// Download a table as CSV, generated in the browser — no network request.
export function downloadCsv(filename, headers, rows) {
  const esc = (v) => {
    const s = String(v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const csv = [headers, ...rows].map((r) => r.map(esc).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

// Site search: an index of every indicator, chart and section. Typing
// filters it; an empty query shows the most-looked-up items; no match shows
// suggestions instead of an empty list.
export function buildSearch(index) {
  const box = document.getElementById('search-box');
  const results = document.getElementById('search-results');
  const popular = index.slice(0, 6);
  function render(list, query) {
    results.innerHTML = '';
    if (!list.length) {
      const p = document.createElement('p');
      p.className = 'search-none';
      p.textContent = `No match for “${query}”. Try one of these:`;
      results.appendChild(p);
      list = popular;
    }
    for (const item of list) {
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'search-item';
      a.innerHTML = `<b>${item.title}</b><span>${item.section} · ${item.value}</span>`;
      a.addEventListener('click', () => { results.classList.remove('on'); box.value = ''; });
      results.appendChild(a);
    }
    results.classList.add('on');
  }
  box.addEventListener('input', () => {
    const q = box.value.trim().toLowerCase();
    if (!q) { results.classList.remove('on'); return; }
    render(index.filter((i) => (i.title + ' ' + i.keywords).toLowerCase().includes(q)), q);
  });
  box.addEventListener('focus', () => {
    if (!box.value.trim()) render(popular, '');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) results.classList.remove('on');
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { results.classList.remove('on'); box.blur(); }
  });
}

export function sourceName(key) {
  return SOURCES[key] ? SOURCES[key].publisher : key;
}
