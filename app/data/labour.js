// Labour data. Monthly Labour Survey (MHLW) and Labour Force Survey.
// 2025: nominal pay +2.3% to ¥355,919 a month; real pay −1.3% (fourth
// straight annual fall); unemployment 2.5% (unchanged); employed 68.28m;
// labour force 70.04m. Shunto 2025 settled at +5.25% (Rengo final).
import { fig } from './sources.js';

export const LABOUR = {
  nominalWage: fig(355919, '¥ per month', '2025', 'mls', 'Average total cash earnings, establishments with 5+ employees'),
  nominalGrowth: fig(2.3, '%', '2025', 'mls', 'Nominal pay rose for a fourth straight year'),
  realGrowth: fig(-1.3, '%', '2025', 'mls', 'Fourth consecutive annual fall in real wages'),
  unemployment: fig(2.5, '%', '2025', 'lfs', 'Annual average'),
  employed: fig(68.3, 'million people', '2025', 'lfs', 'Employed persons, annual average'),
  labourForce: fig(70.0, 'million people', '2025', 'lfs', 'Labour force, annual average'),
  shunto: fig(5.25, '%', '2025 spring', 'mls', 'Rengo spring wage talks: average settlement'),
};

// Year-on-year % change, annual average, Monthly Labour Survey.
export const WAGES = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  nominal: [0.1, 0.5, 0.4, 1.4, -0.4, -1.2, 0.3, 2.0, 1.2, 2.9, 2.3],
  real: [0.1, 0.6, -0.1, 0.5, -0.9, -1.3, 0.5, -1.0, -2.5, -0.2, -1.3],
};

export const UNEMPLOYMENT = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [3.4, 3.1, 2.8, 2.4, 2.4, 2.8, 2.8, 2.6, 2.6, 2.5, 2.5],
};
