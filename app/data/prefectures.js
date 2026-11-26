// Prefecture data. Population: Basic Resident Register, 1 January 2024
// (thousands, rounded) — total population, including foreign residents.
// Change: year-on-year % (only Tokyo and Saitama grew in 2024; for
// Japanese nationals only, Tokyo alone grew). Ageing share: share aged 65+,
// Statistics Bureau Population Estimates 2024, rounded to 0.1pp. Tile
// positions (row, col) place each prefecture on a grid that reads as the
// shape of Japan.
export const PREFECTURES = [
  { id: 'hokkaido', name: 'Hokkaido', row: 0, col: 10, pop: 5094, change: -0.9, aged: 32.6 },
  { id: 'aomori', name: 'Aomori', row: 1, col: 10, pop: 1184, change: -1.7, aged: 34.4 },
  { id: 'iwate', name: 'Iwate', row: 2, col: 11, pop: 1168, change: -1.6, aged: 34.0 },
  { id: 'akita', name: 'Akita', row: 2, col: 9, pop: 925, change: -1.8, aged: 40.0 },
  { id: 'miyagi', name: 'Miyagi', row: 3, col: 11, pop: 2281, change: -0.7, aged: 28.3 },
  { id: 'yamagata', name: 'Yamagata', row: 3, col: 9, pop: 1038, change: -1.3, aged: 34.0 },
  { id: 'fukushima', name: 'Fukushima', row: 4, col: 10, pop: 1772, change: -1.1, aged: 31.0 },
  { id: 'niigata', name: 'Niigata', row: 4, col: 8, pop: 2129, change: -1.1, aged: 33.6 },
  { id: 'toyama', name: 'Toyama', row: 5, col: 7, pop: 1003, change: -0.9, aged: 32.3 },
  { id: 'ishikawa', name: 'Ishikawa', row: 5, col: 6, pop: 1111, change: -0.8, aged: 29.0 },
  { id: 'gunma', name: 'Gunma', row: 5, col: 9, pop: 1913, change: -0.6, aged: 29.8 },
  { id: 'tochigi', name: 'Tochigi', row: 5, col: 10, pop: 1913, change: -0.6, aged: 29.3 },
  { id: 'fukui', name: 'Fukui', row: 6, col: 6, pop: 752, change: -0.9, aged: 32.1 },
  { id: 'gifu', name: 'Gifu', row: 6, col: 7, pop: 1937, change: -0.7, aged: 31.4 },
  { id: 'nagano', name: 'Nagano', row: 6, col: 8, pop: 2017, change: -0.8, aged: 31.8 },
  { id: 'yamanashi', name: 'Yamanashi', row: 6, col: 9, pop: 806, change: -0.9, aged: 31.8 },
  { id: 'saitama', name: 'Saitama', row: 6, col: 10, pop: 7379, change: 0.1, aged: 27.3 },
  { id: 'ibaraki', name: 'Ibaraki', row: 6, col: 11, pop: 2863, change: -0.4, aged: 29.4 },
  { id: 'chiba', name: 'Chiba', row: 7, col: 11, pop: 6310, change: -0.1, aged: 28.4 },
  { id: 'hyogo', name: 'Hyogo', row: 7, col: 4, pop: 5427, change: -0.4, aged: 29.5 },
  { id: 'kyoto', name: 'Kyoto', row: 7, col: 5, pop: 2545, change: -0.5, aged: 29.6 },
  { id: 'shiga', name: 'Shiga', row: 7, col: 6, pop: 1409, change: -0.3, aged: 27.0 },
  { id: 'aichi', name: 'Aichi', row: 7, col: 7, pop: 7501, change: -0.3, aged: 25.8 },
  { id: 'shizuoka', name: 'Shizuoka', row: 7, col: 8, pop: 3606, change: -0.7, aged: 31.1 },
  { id: 'kanagawa', name: 'Kanagawa', row: 7, col: 9, pop: 9209, change: -0.1, aged: 26.3 },
  { id: 'tokyo', name: 'Tokyo', row: 7, col: 10, pop: 13912, change: 0.4, aged: 23.4 },
  { id: 'tottori', name: 'Tottori', row: 8, col: 3, pop: 540, change: -0.9, aged: 34.5 },
  { id: 'okayama', name: 'Okayama', row: 8, col: 4, pop: 1859, change: -0.6, aged: 30.0 },
  { id: 'osaka', name: 'Osaka', row: 8, col: 5, pop: 8776, change: -0.2, aged: 28.5 },
  { id: 'nara', name: 'Nara', row: 8, col: 6, pop: 1305, change: -0.8, aged: 31.0 },
  { id: 'mie', name: 'Mie', row: 8, col: 7, pop: 1724, change: -0.7, aged: 29.7 },
  { id: 'wakayama', name: 'Wakayama', row: 9, col: 7, pop: 913, change: -1.1, aged: 34.8 },
  { id: 'shimane', name: 'Shimane', row: 9, col: 2, pop: 651, change: -1.0, aged: 35.9 },
  { id: 'hiroshima', name: 'Hiroshima', row: 9, col: 3, pop: 2770, change: -0.6, aged: 30.2 },
  { id: 'kagawa', name: 'Kagawa', row: 9, col: 5, pop: 949, change: -0.8, aged: 31.0 },
  { id: 'tokushima', name: 'Tokushima', row: 9, col: 6, pop: 710, change: -1.1, aged: 35.0 },
  { id: 'ehime', name: 'Ehime', row: 10, col: 4, pop: 1297, change: -1.0, aged: 33.2 },
  { id: 'kochi', name: 'Kochi', row: 10, col: 5, pop: 676, change: -1.2, aged: 36.6 },
  { id: 'yamaguchi', name: 'Yamaguchi', row: 9, col: 1, pop: 1303, change: -1.0, aged: 35.0 },
  { id: 'fukuoka', name: 'Fukuoka', row: 10, col: 2, pop: 5095, change: -0.2, aged: 28.2 },
  { id: 'saga', name: 'Saga', row: 10, col: 1, pop: 801, change: -0.8, aged: 32.8 },
  { id: 'nagasaki', name: 'Nagasaki', row: 10, col: 0, pop: 1277, change: -1.2, aged: 33.5 },
  { id: 'oita', name: 'Oita', row: 10, col: 3, pop: 1106, change: -0.8, aged: 32.7 },
  { id: 'kumamoto', name: 'Kumamoto', row: 11, col: 2, pop: 1716, change: -0.7, aged: 32.4 },
  { id: 'miyazaki', name: 'Miyazaki', row: 11, col: 3, pop: 1050, change: -0.9, aged: 33.3 },
  { id: 'kagoshima', name: 'Kagoshima', row: 11, col: 1, pop: 1561, change: -0.9, aged: 33.4 },
  { id: 'okinawa', name: 'Okinawa', row: 12, col: 1, pop: 1468, change: -0.1, aged: 22.6 },
];

export const PREF_INDICATORS = [
  { id: 'change', label: 'Population change', unit: '%', decimals: 1, higherIs: 'good', note: 'Year-on-year, 2023 → 2024' },
  { id: 'aged', label: 'Share aged 65+', unit: '%', decimals: 1, higherIs: 'high', note: 'Share of population aged 65 and over, 2024' },
  { id: 'pop', label: 'Population', unit: 'thousand', decimals: 0, higherIs: 'high', note: 'Resident population, 1 Jan 2024' },
];

export const PREF_SOURCE = { period: '1 Jan 2024', source: 'brr', note: 'Basic Resident Register — total population, including foreign residents; ageing shares from Statistics Bureau Population Estimates 2024' };
