// Overview section: the front page. KPI tiles for every section, each with
// its headline figure, change, sparkline and source/year, then the large
// population pyramid.
import { KPI_TILES, SITE } from '../data/overview.js';
import { sparkline } from '../charts/sparkline.js';
import { fmtNum, sourceLine } from '../ui/format.js';
import { pyramidBlock } from './pyramid-block.js';

export function renderOverview(root) {
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.innerHTML = `<p class="hero-kicker">Japan · Official statistics, plainly shown</p>
    <h1>${SITE.name}</h1>
    <p class="hero-intro">${SITE.intro}</p>
    <p class="hero-updated">${SITE.updated}</p>`;
  root.appendChild(hero);

  const layout = document.createElement('div');
  layout.className = 'overview-layout';
  const grid = document.createElement('div');
  grid.className = 'tile-grid';
  for (const t of KPI_TILES) {
    const a = document.createElement('a');
    a.className = 'kpi-tile';
    a.href = '#/' + t.section;
    // Delta colour is the news value, not the sign: falling debt is good,
    // falling population is bad, unchanged unemployment is neutral.
    const changeCls = t.change.good === true ? 'up' : t.change.good === false ? 'down' : '';
    const sign = t.change.value > 0 && (t.change.unit === '%' || t.change.unit === 'pp') ? '+' : '';
    a.innerHTML = `<div class="kpi-tile-top"><span class="kpi-tile-title">${t.title}</span><span class="kpi-tile-go">→</span></div>
      <div class="kpi-tile-v">${fmtNum(t.headline.value)} <span>${t.headline.unit}</span></div>
      <div class="kpi-tile-c ${changeCls}">${sign}${fmtNum(t.change.value)}${t.change.unit} <span>${t.change.label}</span></div>
      <div class="kpi-tile-spark"></div>
      <div class="kpi-tile-b">${t.blurb}</div>
      <div class="kpi-tile-s">${sourceLine(t.headline)}</div>`;
    if (t.spark) {
      sparkline(a.querySelector('.kpi-tile-spark'), t.spark, t.change.good !== false);
      const years = document.createElement('div');
      years.className = 'spark-years';
      years.innerHTML = `<span>${t.sparkYears[0]}</span><span>${t.sparkYears[t.sparkYears.length - 1]}</span>`;
      a.querySelector('.kpi-tile-spark').after(years);
    } else {
      a.querySelector('.kpi-tile-spark').remove();
    }
    grid.appendChild(a);
  }
  const pyr = pyramidBlock(2024, {
    takeaway: 'From a pyramid to a column: Japan aged in one lifetime',
    height: 280,
  });
  layout.appendChild(pyr.card);
  layout.appendChild(grid);
  root.appendChild(layout);
  return { pyramid: pyr };
}
