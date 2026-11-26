// Population section: pyramid, births vs deaths, fertility, foreign residents.
import { POPULATION, VITAL, TFR, FOREIGN_BY_COUNTRY, FOREIGN_TOTAL_FIG } from '../data/population.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';
import { chartCard, dataTable, kpiStrip } from './helpers.js';
import { pyramidBlock } from './pyramid-block.js';
import { fmtNum } from '../ui/format.js';

export function renderPopulation(root) {
  root.appendChild(kpiStrip([
    { value: fmtNum(POPULATION.total.value) + 'm', label: 'Total population', change: '−3.17 million since the 2020 census · 1 Oct 2025' },
    { value: fmtNum(POPULATION.aged65Share.value) + '%', label: 'Aged 65 and over', change: '29.4% of everyone · 2025' },
    { value: '1.14', label: 'Total fertility rate', change: 'Record low · 2025' },
    { value: fmtNum(POPULATION.foreignResidents.value) + 'm', label: 'Foreign residents', change: '+9.5% in a year · Dec 2025' },
  ]));

  root.appendChild(pyramidBlock(2024, {
    takeaway: 'From a pyramid to a column: Japan aged in one lifetime',
  }).card);

  root.appendChild(chartCard({
    title: 'Births vs deaths, 2015–2025',
    takeaway: 'Deaths now outnumber births by more than two to one',
    source: VITAL.birthsFig,
    note: 'Japanese nationals in Japan',
    chart: (slot) => lineChart(slot, {
      labels: VITAL.years, unit: 'people', decimals: 0,
      series: [
        { name: 'Births', values: VITAL.births, color: '#2e2a6b' },
        { name: 'Deaths', values: VITAL.deaths, color: '#e4572e' },
      ],
      ariaLabel: 'Line chart of births and deaths in Japan, 2015 to 2025',
    }),
  }));

  root.appendChild(chartCard({
    title: 'Total fertility rate, 2015–2025',
    takeaway: 'Fertility fell to 1.14 — the lowest since records began',
    source: TFR.fig,
    note: 'Children per woman; replacement level is about 2.1',
    chart: (slot) => lineChart(slot, {
      labels: TFR.years, unit: 'children per woman', decimals: 2,
      series: [{ name: 'Total fertility rate', values: TFR.values, color: '#2e2a6b' }],
      reference: { value: 2.1, label: 'Replacement level 2.1' },
      ariaLabel: 'Line chart of the total fertility rate, 2015 to 2025',
    }),
  }));

  root.appendChild(chartCard({
    title: 'Foreign residents by nationality, end of 2025',
    takeaway: 'Foreign residents passed 4 million — 1 in 30 people',
    source: FOREIGN_TOTAL_FIG,
    note: 'Mid- to long-term residents and special permanent residents',
    chart: (slot) => barChart(slot, {
      labels: FOREIGN_BY_COUNTRY.map((c) => c.name),
      series: [{ name: 'People', values: FOREIGN_BY_COUNTRY.map((c) => c.value), color: '#2e2a6b' }],
      unit: 'people', decimals: 0,
      highlight: (i) => i === 0,
      ariaLabel: 'Bar chart of foreign residents by nationality',
    }),
  }));

  root.appendChild(dataTable({
    title: 'Births, deaths and natural change',
    source: VITAL.birthsFig,
    filename: 'japan-births-deaths-2015-2025.csv',
    headers: ['Year', 'Births', 'Deaths', 'Natural change'],
    rows: VITAL.years.map((y, i) => [y, VITAL.births[i], VITAL.deaths[i], VITAL.births[i] - VITAL.deaths[i]]),
    note: 'Japanese nationals in Japan, final data',
  }));
}
