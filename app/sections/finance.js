// Government finance section: debt-to-GDP and the fiscal balance.
import { FINANCE, DEBT, BALANCE } from '../data/finance.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';
import { chartCard, dataTable, kpiStrip } from './helpers.js';
import { fmtNum } from '../ui/format.js';

export function renderFinance(root) {
  root.appendChild(kpiStrip([
    { value: fmtNum(FINANCE.debtToGdp.value, 1) + '%', label: 'Gross debt / GDP', change: 'General government · 2024' },
    { value: fmtNum(FINANCE.netDebt.value, 1) + '%', label: 'Net debt / GDP', change: 'After government financial assets · 2024' },
    { value: fmtNum(FINANCE.fiscalBalance.value, 1) + '%', label: 'Fiscal balance / GDP', change: 'General government · 2024' },
    { value: fmtNum(FINANCE.jgb10y.value, 1) + '%', label: '10-year JGB yield', change: 'December 2024' },
  ]));

  root.appendChild(chartCard({
    title: 'General government gross debt, % of GDP, 2015–2024',
    takeaway: 'The world’s highest debt ratio is slowly coming down',
    source: FINANCE.debtToGdp,
    note: 'IMF Global Debt Database; gross debt, before subtracting government assets',
    chart: (slot) => lineChart(slot, {
      labels: DEBT.years, unit: '% of GDP', decimals: 0,
      series: [{ name: 'Gross debt', values: DEBT.values, color: '#2e2a6b' }],
      ariaLabel: 'Line chart of general government gross debt as a share of GDP',
    }),
  }));

  root.appendChild(chartCard({
    title: 'Fiscal balance, % of GDP, 2015–2024',
    takeaway: 'The deficit narrowed from its pandemic peak of 9% of GDP',
    source: FINANCE.fiscalBalance,
    note: 'General government overall balance, IMF World Economic Outlook',
    chart: (slot) => barChart(slot, {
      labels: BALANCE.years,
      series: [{ name: 'Fiscal balance', values: BALANCE.values, color: '#2e2a6b' }],
      unit: '% of GDP', decimals: 1,
      highlight: (i) => BALANCE.values[i] === Math.min(...BALANCE.values),
      ariaLabel: 'Bar chart of the fiscal balance as a share of GDP',
    }),
  }));

  const note = document.createElement('p');
  note.className = 'section-note';
  note.textContent = 'Japan’s fiscal year runs April to March, so budget figures are labelled FY; the ratios above are calendar-year, % of GDP. Gross debt counts everything the government owes; net debt subtracts the financial assets it holds (about ¥1,000 trillion), which is why the two differ by more than 70 points.';
  root.appendChild(note);

  root.appendChild(dataTable({
    title: 'Debt and balance, 2015–2024',
    source: FINANCE.debtToGdp,
    filename: 'japan-government-finance-2015-2024.csv',
    headers: ['Year', 'Gross debt (% of GDP)', 'Fiscal balance (% of GDP)'],
    rows: DEBT.years.map((y, i) => [y, DEBT.values[i], BALANCE.values[i]]),
    note: 'IMF Global Debt Database and World Economic Outlook',
  }));
}
