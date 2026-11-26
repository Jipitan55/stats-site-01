// Sources registry: every dataset the site shows, with publisher, the
// publication/table it came from, and the date it was retrieved.
// Figures on the site cite these by id; the Sources & methods page renders
// this registry in full.
export const RETRIEVED = '2026-11-26';

export const SOURCES = {
  popEst: {
    publisher: 'Statistics Bureau of Japan (Ministry of Internal Affairs and Communications)',
    short: 'Statistics Bureau',
    publication: 'Population Estimates, current estimates as of 1 October 2024',
    url: 'https://www.stat.go.jp/english/data/jinsui/2024np/index.html',
    retrieved: RETRIEVED,
  },
  census: {
    publisher: 'Statistics Bureau of Japan',
    short: 'Statistics Bureau',
    publication: 'Population Census 1950 / 1990 / 2025 (final results, released 29 September 2026)',
    url: 'https://www.stat.go.jp/english/data/kokusei/index.html',
    retrieved: RETRIEVED,
  },
  ipss: {
    publisher: 'National Institute of Population and Social Security Research',
    short: 'IPSS',
    publication: 'Population Projections for Japan 2023 (medium fertility / medium mortality)',
    url: 'https://www.ipss.go.jp/pp-zenkoku/e/zenkoku_e2023/pp_zenkoku2023e.asp',
    retrieved: RETRIEVED,
  },
  vital: {
    publisher: 'Ministry of Health, Labour and Welfare',
    short: 'MHLW',
    publication: 'Vital Statistics, final data 2025 (Japanese nationals in Japan; published 30 September 2026)',
    url: 'https://www.mhlw.go.jp/english/database/db-hw/vs01.html',
    retrieved: RETRIEVED,
  },
  isa: {
    publisher: 'Immigration Services Agency',
    publication: 'Statistics on foreign residents, end of December 2025',
    url: 'https://www.moj.go.jp/isa/policies/statistics/toukei_ichiran_touroku.html',
    retrieved: RETRIEVED,
  },
  sna: {
    publisher: 'Cabinet Office',
    publication: 'National Accounts (SNA), calendar-year GDP, 2025 (benchmark-revised series, via World Bank WDI)',
    url: 'https://www.esri.cao.go.jp/en/sna/menu.html',
    retrieved: RETRIEVED,
  },
  wdi: {
    publisher: 'World Bank',
    publication: 'World Development Indicators, Japan (GDP per capita, current US$; data year 2025, database updated 11 November 2026)',
    url: 'https://data.worldbank.org/country/japan',
    retrieved: RETRIEVED,
  },
  fed: {
    publisher: 'Board of Governors of the Federal Reserve System',
    short: 'Federal Reserve',
    publication: 'H.10 / G.5A Foreign Exchange Rates, annual average 2025',
    url: 'https://www.federalreserve.gov/releases/g5a/current/',
    retrieved: RETRIEVED,
  },
  mls: {
    publisher: 'Ministry of Health, Labour and Welfare',
    short: 'MHLW',
    publication: 'Monthly Labour Survey, final annual results 2025 (establishments with 5+ employees)',
    url: 'https://www.mhlw.go.jp/english/database/db-l/index.html',
    retrieved: RETRIEVED,
  },
  lfs: {
    publisher: 'Statistics Bureau of Japan',
    short: 'Statistics Bureau',
    publication: 'Labour Force Survey, annual average 2025',
    url: 'https://www.stat.go.jp/english/data/roudou/index.html',
    retrieved: RETRIEVED,
  },
  cpi: {
    publisher: 'Statistics Bureau of Japan',
    short: 'Statistics Bureau',
    publication: 'Consumer Price Index, annual average 2025 (2020 base; released 23 January 2026)',
    url: 'https://www.stat.go.jp/english/data/cpi/index.html',
    retrieved: RETRIEVED,
  },
  boj: {
    publisher: 'Bank of Japan',
    publication: 'Price stability target of 2 percent; monetary policy statements',
    url: 'https://www.boj.or.jp/en/mopo/mpmdeci/index.htm',
    retrieved: RETRIEVED,
  },
  imfWeo: {
    publisher: 'International Monetary Fund',
    short: 'IMF',
    publication: 'World Economic Outlook, October 2026 (general government gross debt, net debt, fiscal balance; data year 2025)',
    url: 'https://www.imf.org/en/Publications/WEO',
    retrieved: RETRIEVED,
  },
  mof: {
    publisher: 'Ministry of Finance',
    short: 'Ministry of Finance',
    publication: 'Japanese Government Bonds, 10-year yield, December 2025',
    url: 'https://www.mof.go.jp/english/policy/jgbs/',
    retrieved: RETRIEVED,
  },
  brr: {
    publisher: 'Ministry of Internal Affairs and Communications',
    short: 'MIC',
    publication: 'Basic Resident Register, population by prefecture, 1 January 2024',
    url: 'https://www.soumu.go.jp/main_sosiki/jichi_gyousei/daityo/jinkou_jinkoudoutai-setaisuu.html',
    retrieved: RETRIEVED,
  },
};

// One figure: { value, unit, period, source, note? }.
// `source` is a key of SOURCES. `value` is a number; formatting lives in
// ui/format.js so every chart and tile prints numbers the same way.
export function fig(value, unit, period, source, note) {
  return { value, unit, period, source, ...(note ? { note } : {}) };
}
