// Prefectures section: tile map of all 47 prefectures, coloured by the
// chosen indicator, with a ranked list beside it and a detail card.
import { PREFECTURES, PREF_INDICATORS, PREF_SOURCE } from '../data/prefectures.js';
import { tileMap } from '../charts/tilemap.js';
import { segmented } from '../ui/controls.js';
import { dataTable } from './helpers.js';
import { fmtNum } from '../ui/format.js';
import { sourceLine } from '../ui/format.js';

// The map card heading follows the active tab (the default tab is Growth).
const MAP_TITLES = {
  change: 'Only two prefectures grew in 2024',
  aged: 'Ageing by prefecture, 2024',
  pop: 'Population by prefecture, 1 Jan 2024',
};

export function renderPrefectures(root) {
  const wrap = document.createElement('div');
  wrap.className = 'pref-wrap';

  const mapCard = document.createElement('article');
  mapCard.className = 'card pref-map-card';
  const h = document.createElement('h3');
  h.textContent = MAP_TITLES.change;
  mapCard.appendChild(h);
  const controls = document.createElement('div');
  controls.className = 'chart-controls';
  mapCard.appendChild(controls);
  const mapSlot = document.createElement('div');
  mapSlot.className = 'chart-slot';
  mapCard.appendChild(mapSlot);
  const legend = document.createElement('p');
  legend.className = 'map-legend';
  mapCard.appendChild(legend);
  const foot = document.createElement('p');
  foot.className = 'src';
  foot.textContent = sourceLine({ source: PREF_SOURCE.source, period: PREF_SOURCE.period }) + ' · ' + PREF_SOURCE.note;
  mapCard.appendChild(foot);

  const side = document.createElement('div');
  side.className = 'pref-side';
  const detail = document.createElement('article');
  detail.className = 'card pref-detail';
  side.appendChild(detail);
  const listCard = document.createElement('article');
  listCard.className = 'card pref-list-card';
  const listH = document.createElement('h3');
  listH.textContent = 'Ranked';
  listCard.appendChild(listH);
  const list = document.createElement('ol');
  list.className = 'pref-list';
  listCard.appendChild(list);
  side.appendChild(listCard);

  wrap.appendChild(mapCard);
  wrap.appendChild(side);
  root.appendChild(wrap);

  let indicator = PREF_INDICATORS[0];
  let selectedId = 'akita';

  // Ranked highest first; exact ties break alphabetically so the order is
  // stable and checkable.
  const byIndicator = (a, b) => {
    const d = b[indicator.id] - a[indicator.id];
    return d !== 0 ? d : a.name.localeCompare(b.name);
  };

  function draw() {
    h.textContent = MAP_TITLES[indicator.id] || MAP_TITLES.change;
    segmented(controls, PREF_INDICATORS.map((i) => ({ value: i.id, label: i.label })), indicator.id,
      (v) => { indicator = PREF_INDICATORS.find((i) => i.id === v); draw(); }, 'Map indicator');
    tileMap(mapSlot, { prefectures: PREFECTURES, indicator, selectedId, onSelect: (id) => { selectedId = id; draw(); } });
    legend.textContent = indicator.id === 'change'
      ? 'Vermilion = shrinking · Indigo = growing · Darker = faster change'
      : indicator.id === 'aged'
        ? 'Darker indigo = older population · Akita is the oldest at 40.0%, Okinawa the youngest at 22.6%'
        : 'Darker indigo = larger population · Tokyo holds 13.9 million, Tottori 540,000';
    const p = PREFECTURES.find((x) => x.id === selectedId);
    const rank = (key) => {
      const sorted = [...PREFECTURES].sort((a, b) => {
        const d = b[key] - a[key];
        return d !== 0 ? d : a.name.localeCompare(b.name);
      });
      return sorted.findIndex((x) => x.id === p.id) + 1;
    };
    detail.innerHTML = `<h3>${p.name}</h3>
      <div class="pref-big">${fmtNum(p.pop, 0)}k <span>people</span></div>
      <dl class="pref-dl">
        <div><dt>Population change</dt><dd>${fmtNum(p.change, 1)}% <span>(${rank('change')} of 47 for growth)</span></dd></div>
        <div><dt>Share aged 65+</dt><dd>${fmtNum(p.aged, 1)}% <span>(${rank('aged')} of 47 — 1 is oldest)</span></dd></div>
        <div><dt>Share of Japan</dt><dd>${fmtNum((100 * p.pop) / 124885, 1)}%</dd></div>
      </dl>
      <p class="src">Sources: Basic Resident Register, 1 Jan 2024 (population) · Statistics Bureau, Population Estimates 2024 (ageing share)</p>`;
    list.innerHTML = '';
    const sorted = [...PREFECTURES].sort(byIndicator);
    sorted.forEach((q, i) => {
      const li = document.createElement('li');
      li.className = q.id === selectedId ? 'sel' : '';
      const shown = indicator.id === 'pop' ? fmtNum(q.pop, 0) + 'k' : fmtNum(q[indicator.id], indicator.decimals) + indicator.unit;
      li.innerHTML = `<button type="button"><span class="pref-rank">${i + 1}</span><span class="pref-name">${q.name}</span><b>${shown}</b></button>`;
      li.querySelector('button').addEventListener('click', () => { selectedId = q.id; draw(); });
      list.appendChild(li);
    });
    listH.textContent = 'Ranked by ' + indicator.label.toLowerCase();
  }
  draw();

  root.appendChild(dataTable({
    title: 'All 47 prefectures',
    source: { source: PREF_SOURCE.source, period: PREF_SOURCE.period },
    filename: 'japan-prefectures-2024.csv',
    headers: ['Prefecture', 'Population (thousands)', 'Change (%)', 'Aged 65+ (%)'],
    rows: [...PREFECTURES].sort((a, b) => b.pop - a.pop).map((p) => [p.name, p.pop, p.change, p.aged]),
    note: 'Basic Resident Register, 1 Jan 2024; ageing shares from Population Estimates 2024',
  }));
}
