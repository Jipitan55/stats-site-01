// Government finance data. IMF World Economic Outlook, October 2026 vintage,
// for the headline ratios and for the debt and balance series. The IMF
// changed how it measures Japan's debt in 2026 (face value rather than
// market value), retiring the old series that read about 258% for 2020:
// on the new measure 2020 is 228.8%, 2024 is 213.6% and 2025 is 204.8%.
// The pre-2026 series (Global Debt Database: 236.7% for 2024) is not mixed
// in here. Verified 26 Nov 2026 against the WEO October 2026 figures as
// republished by IMF DataMapper and several secondary trackers: 2025
// gross debt 204.8%, net debt about 132%, fiscal balance −0.7%.
import { fig } from './sources.js';

export const FINANCE = {
  debtToGdp: fig(204.8, '% of GDP', '2025', 'imfWeo', 'General government gross debt; IMF World Economic Outlook, October 2026. The IMF revised its Japan debt measure in 2026 — see Sources & methods.'),
  netDebt: fig(132.4, '% of GDP', '2025', 'imfWeo', 'General government net debt'),
  fiscalBalance: fig(-0.7, '% of GDP', '2025', 'imfWeo', 'General government overall balance'),
  primaryBalance: fig(0.0, '% of GDP', 'FY2025', 'imfWeo', 'Central + local primary balance, Cabinet Office projection'),
  jgb10y: fig(2.1, '%', 'Dec 2025', 'mof', '10-year Japanese Government Bond yield'),
};

// General government gross debt, % of GDP (IMF World Economic Outlook, Oct 2026).
export const DEBT = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [200.1, 202.1, 203.1, 203.7, 206.3, 228.8, 222.6, 228.0, 220.1, 213.6, 204.8],
};

// General government overall balance, % of GDP (IMF WEO, Oct 2026).
export const BALANCE = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [-3.6, -3.6, -3.0, -2.4, -3.0, -9.0, -6.3, -4.2, -2.4, -1.7, -0.7],
};
