// Economy data. Calendar-year figures: Cabinet Office SNA as published in
// the World Bank's World Development Indicators (benchmark-revised series,
// last updated 11 November 2026). The pre-revision SNA vintage used before
// (2024 nominal ¥609.5tn) is superseded by this series.
import { fig } from './sources.js';

export const ECONOMY = {
  nominalGdp: fig(663.8, '¥ trillion', '2025', 'sna', 'Nominal GDP, calendar year'),
  nominalGdpUsd: fig(4.44, '$ trillion', '2025', 'wdi', 'At ¥149.6 per US dollar (2025 average)'),
  realGrowth: fig(1.2, '%', '2025', 'sna', 'Real GDP growth, calendar year'),
  gdpPerCapita: fig(35951, 'US$', '2025', 'wdi', 'GDP per capita, current US$'),
  yenPerDollar: fig(149.6, '¥ per US$', '2025 average', 'fed', 'Annual average exchange rate'),
};

// Real GDP growth, % year on year, and nominal GDP, ¥ trillion, calendar year.
export const GDP_GROWTH = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  real: [1.8, 0.7, 1.6, 0.8, -0.3, -4.3, 3.6, 1.3, 0.7, -0.2, 1.2],
  nominal: [548.9, 556.0, 565.1, 569.2, 571.8, 554.1, 573.6, 584.9, 616.0, 634.2, 663.8],
};

// GDP per capita, current US$, World Bank WDI. South Korea passed Japan in
// 2023 ($35,674 vs $35,215) and stayed ahead in 2024 and 2025.
export const GDP_PER_CAPITA = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  japan: [35665, 40215, 39680, 40645, 41425, 41099, 41581, 35548, 35215, 33797, 35951],
  us: [56849, 57977, 60048, 62876, 65228, 64465, 71441, 78009, 82587, 86170, 90027],
  germany: [41930, 42949, 45554, 48916, 47656, 47395, 52349, 50507, 54777, 56104, 60496],
  korea: [30172, 30832, 33297, 35364, 33827, 33646, 37518, 34822, 35674, 36239, 36227],
};
