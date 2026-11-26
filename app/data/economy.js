// Economy data. Calendar-year figures from the Cabinet Office SNA unless noted.
import { fig } from './sources.js';

export const ECONOMY = {
  nominalGdp: fig(609.5, '¥ trillion', '2024', 'sna', 'Nominal GDP, calendar year; first year above ¥600 trillion'),
  nominalGdpUsd: fig(4.03, '$ trillion', '2024', 'wdi', 'At ¥151.5 per US dollar (2024 average)'),
  realGrowth: fig(0.1, '%', '2024', 'sna', 'Real GDP growth, calendar year'),
  gdpPerCapita: fig(32465, 'US$', '2024', 'wdi', 'GDP per capita, current US$'),
  yenPerDollar: fig(151.5, '¥ per US$', '2024 average', 'sna', 'Annual average exchange rate'),
};

// Real GDP growth, % year on year, calendar year.
export const GDP_GROWTH = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  real: [1.6, 0.8, 1.7, 0.6, -0.4, -4.2, 2.6, 1.0, 1.7, 0.1],
  nominal: [538.0, 544.9, 553.1, 556.2, 558.5, 539.0, 551.8, 556.6, 591.9, 609.5],
};

// GDP per capita, current US$, World Bank WDI.
export const GDP_PER_CAPITA = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  japan: [35336, 38976, 39155, 40067, 40860, 40158, 40047, 34131, 33993, 32465],
  us: [56762, 58036, 60200, 63064, 65298, 63593, 70219, 76329, 80418, 85809],
  germany: [41323, 42582, 44458, 47552, 46790, 46486, 51204, 48818, 52955, 54779],
  korea: [27811, 28708, 31662, 33333, 32045, 32163, 35371, 32704, 33121, 33121],
};
