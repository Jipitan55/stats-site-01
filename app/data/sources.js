// Sources registry: every dataset the site shows, with publisher, the
// publication/table it came from, and the date it was retrieved.
// Figures on the site cite these by id; the Sources & methods page renders
// this registry in full.
export const RETRIEVED = '2026-11-26';

export const SOURCES = {
  popEst: {
    publisher: 'Statistics Bureau of Japan (Ministry of Internal Affairs and Communications)',
    publication: 'Population Estimates, current estimates as of 1 October 2024',
    url: 'https://www.stat.go.jp/english/data/jinsui/2024np/index.html',
    retrieved: RETRIEVED,
  },
  census: {
    publisher: 'Statistics Bureau of Japan',
    publication: 'Population Census 1950 / 1990 / 2020',
    url: 'https://www.stat.go.jp/english/data/kokusei/index.html',
    retrieved: RETRIEVED,
  },
  ipss: {
    publisher: 'National Institute of Population and Social Security Research',
    publication: 'Population Projections for Japan 2023 (medium fertility / medium mortality)',
    url: 'https://www.ipss.go.jp/pp-zenkoku/e/zenkoku_e2023/pp_zenkoku2023e.asp',
    retrieved: RETRIEVED,
  },
  vital: {
    publisher: 'Ministry of Health, Labour and Welfare',
    publication: 'Vital Statistics, final data 2024 (Japanese nationals in Japan)',
    url: 'https://www.mhlw.go.jp/english/database/db-hw/vs01.html',
    retrieved: RETRIEVED,
  },
  isa: {
    publisher: 'Immigration Services Agency',
    publication: 'Statistics on foreign residents, end of December 2024',
    url: 'https://www.moj.go.jp/isa/policies/statistics/toukei_ichiran_touroku.html',
    retrieved: RETRIEVED,
  },
  sna: {
    publisher: 'Cabinet Office',
    publication: 'National Accounts (SNA), calendar-year GDP, 2024',
    url: 'https://www.esri.cao.go.jp/en/sna/menu.html',
    retrieved: RETRIEVED,
  },
  wdi: {
    publisher: 'World Bank',
    publication: 'World Development Indicators, Japan (GDP per capita, current US$)',
    url: 'https://data.worldbank.org/country/japan',
    retrieved: RETRIEVED,
  },
  mls: {
    publisher: 'Ministry of Health, Labour and Welfare',
    publication: 'Monthly Labour Survey, final annual results 2024 (establishments with 5+ employees)',
    url: 'https://www.mhlw.go.jp/english/database/db-l/index.html',
    retrieved: RETRIEVED,
  },
  lfs: {
    publisher: 'Statistics Bureau of Japan',
    publication: 'Labour Force Survey, annual average 2024',
    url: 'https://www.stat.go.jp/english/data/roudou/index.html',
    retrieved: RETRIEVED,
  },
  cpi: {
    publisher: 'Statistics Bureau of Japan',
    publication: 'Consumer Price Index, annual average 2024 (2020 base)',
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
    publication: 'World Economic Outlook, April 2026 (general government gross debt, fiscal balance)',
    url: 'https://www.imf.org/en/Publications/WEO',
    retrieved: RETRIEVED,
  },
  imfGdd: {
    publisher: 'International Monetary Fund',
    publication: 'Global Debt Database (general government gross debt series)',
    url: 'https://www.imf.org/external/datamapper/G_XWDG_G01_GDP_PT@FM/ADVEC',
    retrieved: RETRIEVED,
  },
  mof: {
    publisher: 'Ministry of Finance',
    publication: 'Japanese Government Bonds, 10-year yield, December 2024',
    url: 'https://www.mof.go.jp/english/policy/jgbs/',
    retrieved: RETRIEVED,
  },
  brr: {
    publisher: 'Ministry of Internal Affairs and Communications',
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
