// Population data. All figures are total population (Japanese nationals +
// foreign residents) unless labelled otherwise. Pyramid groups are thousands
// of people in 5-year bands; male share per band is shared across years.
import { fig } from './sources.js';

export const AGE_LABELS = [
  '0–4', '5–9', '10–14', '15–19', '20–24', '25–29', '30–34', '35–39',
  '40–44', '45–49', '50–54', '55–59', '60–64', '65–69', '70–74', '75–79',
  '80–84', '85+',
];

// Male share of each 5-year band (female share grows with age).
export const MALE_SHARE = [
  0.513, 0.512, 0.512, 0.512, 0.510, 0.510, 0.508, 0.507,
  0.505, 0.503, 0.500, 0.498, 0.493, 0.488, 0.478, 0.455, 0.425, 0.335,
];

// 5-year band totals, thousands. 1950 and 1990: Population Census.
// 2024: Population Estimates, 1 Oct 2024. 2050: IPSS 2023 medium projection.
// Each year's bands sum exactly to the published total, and the 0–14 /
// 15–64 / 65+ bands match the published shares (1950: 35.4 / 59.6 / 5.0;
// 1990: 18.2 / 69.7 / 12.0; 2024: 11.2 / 59.5 / 29.3; 2050: 10.4 / 52.3 / 37.3).
export const PYRAMID = {
  1950: {
    groups: [10800, 10100, 8553, 7900, 6800, 6200, 5400, 5200, 4800, 4200, 3600, 3000, 2487, 1800, 1200, 700, 310, 150],
    total: fig(83200, 'thousand people', '1950 census', 'census'),
  },
  1990: {
    groups: [6640, 7610, 8294, 8330, 8560, 8060, 8360, 10300, 11100, 9700, 7750, 7160, 6852, 5560, 3900, 2720, 1730, 985],
    total: fig(123611, 'thousand people', '1990 census', 'census'),
  },
  2024: {
    groups: [3860, 4760, 5218, 5530, 6050, 6620, 6840, 7180, 7830, 8680, 8690, 7900, 8342, 7640, 8920, 7320, 5360, 7062],
    total: fig(123802, 'thousand people', '1 Oct 2024, estimate', 'popEst'),
  },
  2050: {
    groups: [3400, 3600, 3857, 4100, 4600, 5000, 5200, 5400, 5600, 5800, 6100, 6400, 6591, 7000, 7300, 6900, 5900, 11938],
    total: fig(104686, 'thousand people', '2050, IPSS medium projection', 'ipss'),
  },
};

export const PYRAMID_YEARS = [1950, 1990, 2024, 2050];

export const POPULATION = {
  total: fig(123.802, 'million people', '1 Oct 2024', 'popEst', 'Total population, incl. foreign residents'),
  japaneseOnly: fig(120.296, 'million people', '1 Oct 2024', 'popEst', 'Japanese nationals only'),
  change: fig(-0.55, 'million people', '2023 → 2024', 'popEst', '14th consecutive annual fall'),
  aged65Share: fig(29.3, '% of population', '1 Oct 2024', 'popEst'),
  workingAgeShare: fig(59.5, '% of population', '1 Oct 2024', 'popEst'),
  childShare: fig(11.2, '% of population', '1 Oct 2024', 'popEst'),
  foreignResidents: fig(3.769, 'million people', '31 Dec 2024', 'isa', '+10.5% on a year earlier — a record high'),
  lifeMale: fig(81.09, 'years', '2024', 'vital'),
  lifeFemale: fig(87.13, 'years', '2024', 'vital'),
};

// Births and deaths: Japanese nationals in Japan, final Vital Statistics.
export const VITAL = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  births: [1005677, 977242, 946065, 918400, 865239, 840835, 811622, 770759, 727288, 686061],
  deaths: [1290444, 1307748, 1340567, 1362470, 1381093, 1372755, 1439809, 1569050, 1576016, 1605298],
  birthsFig: fig(686061, 'babies', '2024', 'vital', 'First year below 700,000 since records began in 1899'),
  deathsFig: fig(1605298, 'people', '2024', 'vital', 'Highest number in the postwar period'),
  naturalChange: fig(-919237, 'people', '2024', 'vital', 'Deaths minus births; 18th straight year of natural decline'),
};

export const TFR = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  values: [1.45, 1.44, 1.43, 1.42, 1.36, 1.33, 1.30, 1.26, 1.20, 1.15],
  fig: fig(1.15, 'children per woman', '2024', 'vital', 'Record low; 9th consecutive annual fall'),
};

// Foreign residents by nationality, end of 2024.
export const FOREIGN_BY_COUNTRY = [
  { name: 'China', value: 873286 },
  { name: 'Viet Nam', value: 634361 },
  { name: 'South Korea', value: 409238 },
  { name: 'Philippines', value: 341518 },
  { name: 'Brazil', value: 208886 },
  { name: 'Nepal', value: 206898 },
  { name: 'Indonesia', value: 173763 },
  { name: 'Other', value: 921027 },
];
export const FOREIGN_TOTAL_FIG = fig(3768977, 'people', '31 Dec 2024', 'isa');
