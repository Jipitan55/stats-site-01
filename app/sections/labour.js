// Labour section: wages with a nominal/real toggle, unemployment.
import { LABOUR, WAGES, UNEMPLOYMENT } from '../data/labour.js';
import { lineChart } from '../charts/line.js';
import { chartCard, dataTable, kpiStrip } from './helpers.js';
import { segmented } from '../ui/controls.js';
import { fmtNum } from '../ui/format.js';

export function renderLabour(root) {
  root.appendChild(kpiStrip([
    { value: '¥' + fmtNum(LABOUR.nominalWage.value), label: 'Average monthly pay', change: 'Total cash earnings · 2025' },
    { value: '+' + fmtNum(LABOUR.nominalGrowth.value, 1) + '%', label: 'Nominal wage growth', change: 'Fourth straight annual rise · 2025' },
    { value: fmtNum(LABOUR.realGrowth.value, 1) + '%', label: 'Real wage growth', change: 'Fourth straight annual fall · 2025' },
    { value: fmtNum(LABOUR.unemployment.value, 1) + '%', label: 'Unemployment rate', change: 'Annual average · 2025' },
  ]));

  const wageCard = chartCard({
    title: 'Wage growth, 2015–2025',
    takeaway: 'Real wages fell for a fourth straight year',
    source: LABOUR.nominalWage,
    note: 'Monthly Labour Survey; total cash earnings, year-on-year %',
  });
  const wageControls = document.createElement('div');
  wageControls.className = 'chart-controls';
  wageCard.insertBefore(wageControls, wageCard.querySelector('.chart-slot'));
  const wageSlot = wageCard.querySelector('.chart-slot');
  let wageMode = 'nominal';
  function drawWages() {
    wageSlot.innerHTML = '';
    lineChart(wageSlot, {
      labels: WAGES.years, unit: '%', decimals: 1,
      series: wageMode === 'nominal'
        ? [{ name: 'Nominal wages', values: WAGES.nominal, color: '#2e2a6b' }]
        : [
          { name: 'Nominal wages', values: WAGES.nominal, color: '#8a83c9', dash: '5 4' },
          { name: 'Real wages', values: WAGES.real, color: '#e4572e' },
        ],
      ariaLabel: 'Line chart of wage growth, 2015 to 2025',
    });
    segmented(wageControls, [
      { value: 'nominal', label: 'Nominal' },
      { value: 'real', label: 'Nominal vs real' },
    ], wageMode, (v) => { wageMode = v; drawWages(); }, 'Wage view');
  }
  drawWages();
  root.appendChild(wageCard);

  root.appendChild(chartCard({
    title: 'Unemployment rate, 2015–2025',
    takeaway: 'Unemployment stayed near 2.5% even as pay lagged prices',
    source: LABOUR.unemployment,
    note: 'Labour Force Survey, annual average',
    chart: (slot) => lineChart(slot, {
      labels: UNEMPLOYMENT.years, unit: '%', decimals: 1,
      series: [{ name: 'Unemployment rate', values: UNEMPLOYMENT.values, color: '#2e2a6b' }],
      ariaLabel: 'Line chart of the unemployment rate, 2015 to 2025',
    }),
  }));

  const note = document.createElement('p');
  note.className = 'section-note';
  note.textContent = 'Spring wage talks (shunto) 2025 settled at +5.25% on average, the highest settlement in 34 years — but prices rose faster, so real pay still fell. Source: Rengo (Japanese Trade Union Confederation).';
  root.appendChild(note);

  root.appendChild(dataTable({
    title: 'Wages and unemployment',
    source: LABOUR.nominalWage,
    filename: 'japan-labour-2015-2025.csv',
    headers: ['Year', 'Nominal wage growth (%)', 'Real wage growth (%)', 'Unemployment rate (%)'],
    rows: WAGES.years.map((y, i) => [y, WAGES.nominal[i], WAGES.real[i], UNEMPLOYMENT.values[i]]),
    note: 'Monthly Labour Survey and Labour Force Survey',
  }));
}
