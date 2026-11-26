// Overview KPI tiles: one per section, each with its headline figure, the
// change from the last period, a sparkline series, and its source/year.
// `change.good` states the news value of the change: true = good news
// (green), false = bad news (vermilion), null = neutral (no colour). The
// colour is the news, not the sign: falling debt is good, falling
// population is bad.
import { fig } from './sources.js';

export const KPI_TILES = [
  {
    id: 'population', section: 'population', title: 'Population',
    headline: fig(123.0, 'million', '1 Oct 2025, census', 'census'),
    change: { value: -2.5, unit: '%', label: 'vs the 2020 census', good: false },
    spark: [126.1, 125.5, 124.9, 124.4, 123.8, 123.0],
    sparkYears: [2020, 2021, 2022, 2023, 2024, 2025],
    blurb: 'Falling for 15 straight years.',
  },
  {
    id: 'economy', section: 'economy', title: 'Economy',
    headline: fig(663.8, '¥ trillion', '2025', 'sna'),
    change: { value: 1.2, unit: '%', label: 'real GDP growth, 2025', good: true },
    spark: [554.1, 573.6, 584.9, 616.0, 634.2, 663.8],
    sparkYears: [2020, 2021, 2022, 2023, 2024, 2025],
    blurb: 'Nominal GDP passed ¥660tn.',
  },
  {
    id: 'labour', section: 'labour', title: 'Labour',
    headline: fig(2.5, '%', '2025', 'lfs'),
    change: { value: 0, unit: 'pp', label: 'unemployment, unchanged vs 2024', good: null },
    spark: [2.8, 2.8, 2.6, 2.6, 2.5, 2.5],
    sparkYears: [2020, 2021, 2022, 2023, 2024, 2025],
    blurb: 'Real pay fell 1.3% in 2025.',
  },
  {
    id: 'prices', section: 'prices', title: 'Prices',
    headline: fig(3.2, '%', '2025', 'cpi'),
    change: { value: 0.5, unit: 'pp', label: 'headline CPI, vs 2024', good: false },
    spark: [0.0, -0.2, 2.5, 3.3, 2.7, 3.2],
    sparkYears: [2020, 2021, 2022, 2023, 2024, 2025],
    blurb: 'Still above the 2% target.',
  },
  {
    id: 'finance', section: 'finance', title: 'Government finance',
    headline: fig(204.8, '% of GDP', '2025', 'imfWeo'),
    change: { value: -8.8, unit: 'pp', label: 'gross debt, vs 2024', good: true },
    spark: [228.8, 222.6, 228.0, 220.1, 213.6, 204.8],
    sparkYears: [2020, 2021, 2022, 2023, 2024, 2025],
    blurb: 'Debt ratio eased.',
  },
  {
    id: 'prefectures', section: 'prefectures', title: 'Prefectures',
    headline: fig(2, 'prefectures grew', '2024', 'brr'),
    change: { value: 45, unit: '', label: 'prefectures shrank', good: false },
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
