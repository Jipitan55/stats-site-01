// Labour data. Monthly Labour Survey (MHLW) and Labour Force Survey.
import { fig } from './sources.js';

export const LABOUR = {
  nominalWage: fig(348182, '¥ per month', '2024', 'mls', 'Average total cash earnings, establishments with 5+ employees'),
  nominalGrowth: fig(2.9, '%', '2024', 'mls', 'Largest nominal rise in 33 years'),
  realGrowth: fig(-0.2, '%', '2024', 'mls', 'Third consecutive annual fall in real wages'),
  unemployment: fig(2.5, '%', '2024', 'lfs', 'Annual average, seasonally adjusted basis'),
  employed: fig(67.7, 'million people', '2024', 'lfs', 'Employed persons, annual average'),
  labourForce: fig(69.5, 'million people', '2024', 'lfs', 'Labour force, annual average'),
  shunto: fig(5.10, '%', '2024 spring', 'mls', 'Rengo spring wage talks: average settlement, incl. base-up 3.56%'),
};

// Year-on-year % change, annual average, Monthly Labour Survey.
export const WAGES = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  nominal: [0.1, 0.5, 0.4, 1.4, -0.4, -1.2, 0.3, 2.0, 1.2, 2.9],
  real: [0.1, 0.6, -0.1, 0.5, -0.9, -1.3, 0.5, -1.0, -2.5, -0.2],
};

export const UNEMPLOYMENT = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [3.4, 3.1, 2.8, 2.4, 2.4, 2.8, 2.8, 2.6, 2.6, 2.5],
};
