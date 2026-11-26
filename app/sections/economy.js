// Economy section: GDP with a nominal/real toggle and a GDP-per-capita
// comparison overlay against the US, Germany and South Korea.
import { ECONOMY, GDP_GROWTH, GDP_PER_CAPITA } from '../data/economy.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';
import { chartCard, dataTable, kpiStrip } from './helpers.js';
import { segmented } from '../ui/controls.js';
import { fmtNum } from '../ui/format.js';

export function renderEconomy(root) {
  root.appendChild(kpiStrip([
    { value: '¥' + fmtNum(ECONOMY.nominalGdp.value) + 'tn', label: 'Nominal GDP', change: 'Calendar year 2024 · Cabinet Office' },
    { value: '+' + fmtNum(ECONOMY.realGrowth.value, 1) + '%', label: 'Real GDP growth', change: 'Calendar year 2024 — near flat' },
    { value: '$' + fmtNum(ECONOMY.gdpPerCapita.value), label: 'GDP per capita', change: 'Current US$ · 2024 · World Bank' },
    { value: '¥' + fmtNum(ECONOMY.yenPerDollar.value, 1), label: 'Yen per US dollar', change: '2024 average — the weak yen shrinks the dollar figure' },
  ]));

  // GDP chart with nominal / real toggle.
  const gdpCard = chartCard({
    title: 'Gross domestic product, 2015–2024',
    takeaway: 'Nominal GDP passed ¥600 trillion, but real growth was near zero',
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
        ariaLabel: 'Bar chart of nominal GDP in yen trillion, 2015 to 2024',
      });
    } else {
      lineChart(gdpSlot, {
        labels: GDP_GROWTH.years, unit: '%', decimals: 1,
        series: [{ name: 'Real GDP growth', values: GDP_GROWTH.real, color: '#e4572e' }],
        ariaLabel: 'Line chart of real GDP growth, 2015 to 2024',
      });
    }
    segmented(gdpControls, [
      { value: 'nominal', label: 'Nominal (¥ trillion)' },
      { value: 'real', label: 'Real growth (%)' },
    ], gdpMode, (v) => { gdpMode = v; drawGdp(); }, 'GDP view');
  }
  drawGdp();
  root.appendChild(gdpCard);

  // GDP per capita comparison overlay.
  const cmpCard = chartCard({
    title: 'GDP per capita vs peers, 2015–2024',
    takeaway: 'South Korea caught up with Japan in dollars per person',
    source: ECONOMY.gdpPerCapita,
    note: 'Current US$, World Bank; the weak yen pulls Japan’s dollar figure down',
  });
  const cmpControls = document.createElement('div');
  cmpControls.className = 'chart-controls';
  cmpCard.insertBefore(cmpControls, cmpCard.querySelector('.chart-slot'));
  const cmpSlot = cmpCard.querySelector('.chart-slot');
  const cmpOn = { us: true, germany: false, korea: true };
  function drawCmp() {
    cmpSlot.innerHTML = '';
    const series = [{ name: 'Japan', values: GDP_PER_CAPITA.japan, color: '#e4572e' }];
    if (cmpOn.us) series.push({ name: 'United States', values: GDP_PER_CAPITA.us, color: '#2e2a6b' });
    if (cmpOn.germany) series.push({ name: 'Germany', values: GDP_PER_CAPITA.germany, color: '#6158b3' });
    if (cmpOn.korea) series.push({ name: 'South Korea', values: GDP_PER_CAPITA.korea, color: '#8a83c9', dash: '5 4' });
    lineChart(cmpSlot, {
      labels: GDP_PER_CAPITA.years, unit: 'US$', decimals: 0, series,
      ariaLabel: 'Line chart of GDP per capita for Japan and comparison countries',
    });
    cmpControls.innerHTML = '';
    const label = document.createElement('span');
    label.className = 'ctl-label';
    label.textContent = 'Compare with:';
    cmpControls.appendChild(label);
    for (const [key, name] of [['us', 'United States'], ['germany', 'Germany'], ['korea', 'South Korea']]) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (cmpOn[key] ? ' on' : '');
      b.textContent = name;
      b.setAttribute('aria-pressed', String(cmpOn[key]));
      b.addEventListener('click', () => { cmpOn[key] = !cmpOn[key]; drawCmp(); });
      cmpControls.appendChild(b);
    }
  }
  drawCmp();
  root.appendChild(cmpCard);

  root.appendChild(dataTable({
    title: 'GDP, 2015–2024',
    source: ECONOMY.nominalGdp,
    filename: 'japan-gdp-2015-2024.csv',
    headers: ['Year', 'Nominal GDP (¥ trillion)', 'Real GDP growth (%)'],
    rows: GDP_GROWTH.years.map((y, i) => [y, GDP_GROWTH.nominal[i], GDP_GROWTH.real[i]]),
    note: 'Calendar year, Cabinet Office SNA',
  }));
}
