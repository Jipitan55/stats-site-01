// Prices section: CPI with a headline/core toggle and the Bank of Japan's
// 2% target as a reference line. In Japan "core CPI" means all items less
// fresh food only — not the US definition.
import { PRICES, CPI } from '../data/prices.js';
import { lineChart } from '../charts/line.js';
import { chartCard, dataTable, kpiStrip } from './helpers.js';
import { segmented } from '../ui/controls.js';
import { fmtNum } from '../ui/format.js';

export function renderPrices(root) {
  root.appendChild(kpiStrip([
    { value: '+' + fmtNum(PRICES.headline.value, 1) + '%', label: 'Consumer prices (all items)', change: 'Year-on-year · 2025' },
    { value: '+' + fmtNum(PRICES.core.value, 1) + '%', label: 'Core CPI (less fresh food)', change: 'Year-on-year · 2025' },
    { value: '+' + fmtNum(PRICES.coreCore.value, 1) + '%', label: 'Core-core (less food & energy)', change: 'Year-on-year · 2025' },
    { value: fmtNum(PRICES.bojTarget.value, 1) + '%', label: 'Bank of Japan target', change: 'Price stability target since 2013' },
  ]));

  const cpiCard = chartCard({
    title: 'Consumer price inflation, 2015–2025',
    takeaway: 'Headline CPI rose 3.2% in 2025; core 3.1%, core-core 3.0%',
    source: PRICES.headline,
    note: 'Consumer Price Index, 2020 base, annual average',
  });
  const cpiControls = document.createElement('div');
  cpiControls.className = 'chart-controls';
  cpiCard.insertBefore(cpiControls, cpiCard.querySelector('.chart-slot'));
  const cpiSlot = cpiCard.querySelector('.chart-slot');
  let cpiMode = 'headline';
  function drawCpi() {
    cpiSlot.innerHTML = '';
    const series = cpiMode === 'headline'
      ? [{ name: 'All items', values: CPI.headline, color: '#2e2a6b' }]
      : cpiMode === 'core'
        ? [{ name: 'Core (less fresh food)', values: CPI.core, color: '#e4572e' }]
        : [
          { name: 'Core (less fresh food)', values: CPI.core, color: '#e4572e' },
          { name: 'Core-core (less food & energy)', values: CPI.coreCore, color: '#6158b3', dash: '5 4' },
        ];
    lineChart(cpiSlot, {
      labels: CPI.years, unit: '%', decimals: 1, series,
      reference: { value: 2.0, label: 'BOJ target 2%' },
      ariaLabel: 'Line chart of consumer price inflation, 2015 to 2025',
    });
    segmented(cpiControls, [
      { value: 'headline', label: 'Headline' },
      { value: 'core', label: 'Core CPI' },
      { value: 'both', label: 'Core vs core-core' },
    ], cpiMode, (v) => { cpiMode = v; drawCpi(); }, 'CPI view');
  }
  drawCpi();
  root.appendChild(cpiCard);

  const note = document.createElement('p');
  note.className = 'section-note';
  note.textContent = 'Japan’s “core CPI” excludes fresh food only. The US “core” also excludes energy; Japan’s equivalent is core-core (all items less fresh food and energy). The Bank of Japan’s 2% price stability target applies to the year-on-year change in the CPI (all items less fresh food).';
  root.appendChild(note);

  root.appendChild(dataTable({
    title: 'Consumer prices, 2015–2025',
    source: PRICES.headline,
    filename: 'japan-cpi-2015-2025.csv',
    headers: ['Year', 'All items (%)', 'Core — less fresh food (%)', 'Core-core — less food & energy (%)'],
    rows: CPI.years.map((y, i) => [y, fmtNum(CPI.headline[i], 1), fmtNum(CPI.core[i], 1), fmtNum(CPI.coreCore[i], 1)]),
    note: 'Year-on-year %, annual average, 2020 base',
  }));
}
