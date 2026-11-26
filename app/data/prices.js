// Prices data. Consumer Price Index, Statistics Bureau (2020 base).
// "Core CPI" in Japan means all items less fresh food — not the US
// definition (which also excludes energy). Core-core excludes fresh food
// and energy as well.
import { fig } from './sources.js';

export const PRICES = {
  headline: fig(2.7, '%', '2024', 'cpi', 'All items, year-on-year, annual average'),
  core: fig(2.7, '%', '2024', 'cpi', 'Core CPI = all items less fresh food'),
  coreCore: fig(2.4, '%', '2024', 'cpi', 'All items less fresh food and energy'),
  bojTarget: fig(2.0, '%', 'Bank of Japan target', 'boj', 'Price stability target, set January 2013'),
};

export const CPI = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  headline: [0.8, -0.1, 0.5, 1.0, 0.5, 0.0, -0.2, 2.5, 3.3, 2.7],
  core: [0.0, -0.3, 0.5, 0.9, 0.6, -0.2, -0.2, 2.1, 3.1, 2.7],
  coreCore: [0.3, 0.3, 0.1, 0.4, 0.6, 0.0, -0.5, 1.0, 4.0, 2.4],
};
