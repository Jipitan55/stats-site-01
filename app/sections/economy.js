// Economy section: GDP with a nominal/real toggle and a GDP-per-capita
// comparison against one peer at a time (US, Germany or South Korea).
import { ECONOMY, GDP_GROWTH, GDP_PER_CAPITA } from '../data/economy.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';
import { chartCard, dataTable, kpiStrip } from './helpers.js';
import { segmented } from '../ui/controls.js';
import { fmtNum } from '../ui/format.js';

export function renderEconomy(root) {
  root.appendChild(kpiStrip([
    { value: '¥' + fmtNum(ECONOMY.nominalGdp.value) + 'tn', label: 'Nominal GDP', change: 'Calendar year 2025 · Cabinet Office' },
    { value: '+' + fmtNum(ECONOMY.realGrowth.value, 1) + '%', label: 'Real GDP growth', change: 'Calendar year 2025 — growth picked up' },
    { value: '$' + fmtNum(ECONOMY.gdpPerCapita.value), label: 'GDP per capita', change: 'Current US$ · 2025 · World Bank' },
    { value: '¥' + fmtNum(ECONOMY.yenPerDollar.value, 1), label: 'Yen per US dollar', change: '2025 average — the weak yen shrinks the dollar figure' },
  ]));

  // The two charts sit side by side on desktop so the page stays short
  // enough to show the title, both charts and the table together.
  const charts = document.createElement('div');
  charts.className = 'econ-charts';

  // GDP chart with nominal / real toggle.
  const gdpCard = chartCard({
    title: 'Gross domestic product, 2015–2025',
    takeaway: 'Nominal GDP reached ¥663.8 trillion; real growth picked up to 1.2%',
    source: ECONOMY.nominalGdp,
    note: 'Calendar year; nominal in ¥ trillion, real as % change',
  });
  const gdpControls = document.createElement('div');
  gdpControls.className = 'chart-controls';
  gdpCard.insertBefore(gdpControls, gdpCard.querySelector('.chart-slot'));
  const gdpSlot = gdpCard.querySelector('.chart-slot');
  let gdpMode = 'nominal';
  function drawGdp() {
    gdpSlot.innerHTML = '';
    if (gdpMode === 'nominal') {
      barChart(gdpSlot, {
        labels: GDP_GROWTH.years,
        series: [{ name: 'Nominal GDP', values: GDP_GROWTH.nominal, color: '#2e2a6b' }],
        unit: '¥ trillion', decimals: 1,
        highlight: (i) => i === GDP_GROWTH.years.length - 1,
        ariaLabel: 'Bar chart of nominal GDP in yen trillion, 2015 to 2025',
      });
    } else {
      lineChart(gdpSlot, {
        labels: GDP_GROWTH.years, unit: '%', decimals: 1,
        series: [{ name: 'Real GDP growth', values: GDP_GROWTH.real, color: '#e4572e' }],
        ariaLabel: 'Line chart of real GDP growth, 2015 to 2025',
      });
    }
    segmented(gdpControls, [
      { value: 'nominal', label: 'Nominal (¥ trillion)' },
      { value: 'real', label: 'Real growth (%)' },
    ], gdpMode, (v) => { gdpMode = v; drawGdp(); }, 'GDP view');
  }
  drawGdp();
  charts.appendChild(gdpCard);

  // GDP per capita comparison: one peer at a time, so only the active
  // button is filled and Japan's line stays identifiable.
  const cmpCard = chartCard({
    title: 'GDP per capita vs peers, 2015–2025',
    takeaway: 'South Korea passed Japan in 2023 and stayed ahead',
    source: ECONOMY.gdpPerCapita,
    note: 'Current US$ · World Bank WDI; the weak yen pulls Japan’s dollar figure down',
  });
  const cmpControls = document.createElement('div');
  cmpControls.className = 'chart-controls';
  cmpCard.insertBefore(cmpControls, cmpCard.querySelector('.chart-slot'));
  const cmpSlot = cmpCard.querySelector('.chart-slot');
  const cmpPeers = {
    us: { name: 'United States', values: GDP_PER_CAPITA.us, color: '#2e2a6b' },
    germany: { name: 'Germany', values: GDP_PER_CAPITA.germany, color: '#6158b3' },
    korea: { name: 'South Korea', values: GDP_PER_CAPITA.korea, color: '#8a83c9', dash: '5 4' },
  };
  let cmpSel = 'korea';
  const cmpLabel = document.createElement('span');
  cmpLabel.className = 'ctl-label';
  cmpLabel.textContent = 'Compare with:';
  cmpControls.appendChild(cmpLabel);
  const cmpSeg = document.createElement('div');
  cmpControls.appendChild(cmpSeg);
  function drawCmp() {
    cmpSlot.innerHTML = '';
    const peer = cmpPeers[cmpSel];
    lineChart(cmpSlot, {
      labels: GDP_PER_CAPITA.years, unit: 'US$', decimals: 0,
      series: [
        { name: 'Japan', values: GDP_PER_CAPITA.japan, color: '#e4572e' },
        { name: peer.name, values: peer.values, color: peer.color, ...(peer.dash ? { dash: peer.dash } : {}) },
      ],
      yAxisLabel: 'US$',
      ariaLabel: 'Line chart of GDP per capita for Japan and ' + peer.name,
    });
    segmented(cmpSeg, [
      { value: 'us', label: 'United States' },
      { value: 'germany', label: 'Germany' },
      { value: 'korea', label: 'South Korea' },
    ], cmpSel, (v) => { cmpSel = v; drawCmp(); }, 'Compare GDP per capita with');
  }
  drawCmp();
  charts.appendChild(cmpCard);
  root.appendChild(charts);

  // The rank behind the page title, with its source and year: the IMF's
  // October 2026 outlook has Japan at $4.45tn in 2025, ahead of India at
  // $3.91tn, and India passing Japan only in 2027.
  const rankNote = document.createElement('p');
  rankNote.className = 'section-note';
  rankNote.textContent = 'Japan was the world’s fourth-largest economy in 2025 at $4.45 trillion, ahead of India at $3.91 trillion (IMF, World Economic Outlook, October 2026); India is projected to pass Japan in 2027.';
  root.appendChild(rankNote);

  root.appendChild(dataTable({
    title: 'GDP, 2015–2025',
    source: ECONOMY.nominalGdp,
    filename: 'japan-gdp-2015-2025.csv',
    headers: ['Year', 'Nominal GDP (¥ trillion)', 'Real GDP growth (%)'],
    rows: GDP_GROWTH.years.map((y, i) => [y, fmtNum(GDP_GROWTH.nominal[i], 1), fmtNum(GDP_GROWTH.real[i], 1)]),
    note: 'Calendar year, Cabinet Office SNA',
  }));
}
