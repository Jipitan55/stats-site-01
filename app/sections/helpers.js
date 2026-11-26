// Section rendering helpers: a chart card (takeaway heading, chart slot,
// source footer) and a data table with a CSV download button.
import { sourceLine } from '../ui/format.js';
import { downloadCsv } from '../ui/controls.js';

export function chartCard({ title, takeaway, source, chart, note }) {
  const card = document.createElement('article');
  card.className = 'card';
  const h = document.createElement('h3');
  h.textContent = takeaway || title;
  card.appendChild(h);
  if (title && takeaway && title !== takeaway) {
    const sub = document.createElement('p');
    sub.className = 'card-sub';
    sub.textContent = title;
    card.appendChild(sub);
  }
  const slot = document.createElement('div');
  slot.className = 'chart-slot';
  card.appendChild(slot);
  if (typeof chart === 'function') chart(slot);
  const foot = document.createElement('p');
  foot.className = 'src';
  foot.textContent = sourceLine(source) + (note ? ' · ' + note : '');
  card.appendChild(foot);
  const link = document.createElement('a');
  link.href = '#/sources';
  link.className = 'src-link';
  link.textContent = 'Sources & methods →';
  card.appendChild(link);
  return card;
}

export function dataTable({ title, source, filename, headers, rows, note }) {
  const wrap = document.createElement('article');
  wrap.className = 'card table-card';
  const head = document.createElement('div');
  head.className = 'table-head';
  const h = document.createElement('h3');
  h.textContent = title;
  head.appendChild(h);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'csv-btn';
  btn.textContent = 'Download CSV';
  btn.addEventListener('click', () => downloadCsv(filename, headers, rows));
  head.appendChild(btn);
  wrap.appendChild(head);
  const scroll = document.createElement('div');
  scroll.className = 'table-scroll';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  for (const c of headers) {
    const th = document.createElement('th');
    th.textContent = c;
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  for (const r of rows) {
    const row = document.createElement('tr');
    for (const c of r) {
      const td = document.createElement('td');
      td.textContent = c;
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);
  const foot = document.createElement('p');
  foot.className = 'src';
  foot.textContent = sourceLine(source) + (note ? ' · ' + note : '');
  wrap.appendChild(foot);
  return wrap;
}

// A KPI strip: big number, label, and change line.
export function kpiStrip(items) {
  const strip = document.createElement('div');
  strip.className = 'kpis';
  for (const it of items) {
    const d = document.createElement('div');
    d.className = 'kpi';
    d.innerHTML = `<div class="kpi-v">${it.value}</div><div class="kpi-l">${it.label}</div><div class="kpi-c">${it.change || ''}</div>`;
    strip.appendChild(d);
  }
  return strip;
}
