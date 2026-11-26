// Overview KPI tiles: one per section, each with its headline figure, the
// change from the last period, a sparkline series, and its source/year.
import { fig } from './sources.js';

export const KPI_TILES = [
  {
    id: 'population', section: 'population', title: 'Population',
    headline: fig(123.8, 'million', '1 Oct 2024', 'popEst'),
    change: { value: -0.44, unit: '%', label: 'vs a year earlier' },
    spark: [126.2, 126.1, 125.5, 124.9, 124.4, 123.8],
    sparkYears: [2019, 2020, 2021, 2022, 2023, 2024],
    blurb: 'Falling for 14 straight years.',
  },
  {
    id: 'economy', section: 'economy', title: 'Economy',
    headline: fig(609.5, '¥ trillion', '2024', 'sna'),
    change: { value: 0.1, unit: '%', label: 'real GDP growth, 2024' },
    spark: [558.5, 539.0, 551.8, 556.6, 591.9, 609.5],
    sparkYears: [2019, 2020, 2021, 2022, 2023, 2024],
    blurb: 'Nominal GDP passed ¥600tn.',
  },
  {
    id: 'labour', section: 'labour', title: 'Labour',
    headline: fig(2.5, '%', '2024', 'lfs'),
    change: { value: -0.1, unit: 'pp', label: 'unemployment, vs 2023' },
    spark: [2.4, 2.8, 2.8, 2.6, 2.6, 2.5],
    sparkYears: [2019, 2020, 2021, 2022, 2023, 2024],
    blurb: 'Real pay fell again in 2024.',
  },
  {
    id: 'prices', section: 'prices', title: 'Prices',
    headline: fig(2.7, '%', '2024', 'cpi'),
    change: { value: -0.4, unit: 'pp', label: 'core CPI, vs 2023' },
    spark: [0.6, -0.2, -0.2, 2.1, 3.1, 2.7],
    sparkYears: [2019, 2020, 2021, 2022, 2023, 2024],
    blurb: 'Still above the 2% target.',
  },
  {
    id: 'finance', section: 'finance', title: 'Government finance',
    headline: fig(236.7, '% of GDP', '2024', 'imfGdd'),
    change: { value: -3.3, unit: 'pp', label: 'gross debt, vs 2023' },
    spark: [236.0, 258.4, 251.0, 248.0, 240.0, 236.7],
    sparkYears: [2019, 2020, 2021, 2022, 2023, 2024],
    blurb: 'Debt is falling.',
  },
  {
    id: 'prefectures', section: 'prefectures', title: 'Prefectures',
    headline: fig(2, 'prefectures grew', '2024', 'brr'),
    change: { value: 45, unit: '', label: 'prefectures shrank' },
    spark: null,
    sparkYears: [],
    blurb: 'Only Tokyo and Saitama grew.',
  },
];

export const SITE = {
  name: 'Nippon Numbers',
  tagline: 'Japan, in numbers.',
  updated: 'Figures retrieved 26 November 2026',
  intro: 'Japan’s key numbers, from the official statistics — source and year on every figure.',
};
