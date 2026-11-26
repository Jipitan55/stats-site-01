// Government finance data. IMF World Economic Outlook (April 2026 vintage)
// for the headline ratios; IMF Global Debt Database for the debt series.
import { fig } from './sources.js';

export const FINANCE = {
  debtToGdp: fig(236.7, '% of GDP', '2024', 'imfGdd', 'General government gross debt; IMF Global Debt Database (the April 2026 WEO vintage puts the same year at 214.5% — see Sources & methods)'),
  netDebt: fig(141.7, '% of GDP', '2024', 'imfWeo', 'General government net debt'),
  fiscalBalance: fig(-1.7, '% of GDP', '2024', 'imfWeo', 'General government overall balance'),
  primaryBalance: fig(0.0, '% of GDP', 'FY2025', 'imfWeo', 'Central + local primary balance, Cabinet Office projection'),
  jgb10y: fig(1.1, '%', 'Dec 2024', 'mof', '10-year Japanese Government Bond yield'),
};

// General government gross debt, % of GDP (IMF Global Debt Database).
export const DEBT = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [229.0, 231.0, 231.0, 232.0, 236.0, 258.4, 251.0, 248.0, 240.0, 236.7],
};

// General government overall balance, % of GDP (IMF WEO).
export const BALANCE = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [-3.6, -3.7, -3.1, -2.5, -3.1, -9.0, -5.3, -4.2, -2.4, -1.7],
};
