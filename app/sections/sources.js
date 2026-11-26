// Sources & methods: every dataset with its publisher, the table or
// publication it came from, and the date retrieved — linked from every
// chart footer.
import { SOURCES, RETRIEVED } from '../data/sources.js';

export function renderSources(root) {
  const intro = document.createElement('p');
  intro.className = 'section-intro';
  intro.textContent = 'Every figure on this site comes from an official publisher. Nothing is estimated by us except where a note says so. All datasets were retrieved on ' + RETRIEVED + '.';
  root.appendChild(intro);

  const table = document.createElement('article');
  table.className = 'card table-card';
  const scroll = document.createElement('div');
  scroll.className = 'table-scroll';
  const el = document.createElement('table');
  el.innerHTML = `<thead><tr><th>Dataset</th><th>Publisher</th><th>Publication / table</th><th>Retrieved</th></tr></thead>`;
  const tbody = document.createElement('tbody');
  const names = {
    popEst: 'Population Estimates', census: 'Population Census', ipss: 'Population Projections',
    vital: 'Vital Statistics', isa: 'Foreign resident statistics', sna: 'National Accounts (SNA)',
    wdi: 'World Development Indicators', fed: 'Federal Reserve exchange rates',
    mls: 'Monthly Labour Survey', lfs: 'Labour Force Survey',
    cpi: 'Consumer Price Index', boj: 'Price stability target', imfWeo: 'World Economic Outlook',
    mof: 'Japanese Government Bonds', brr: 'Basic Resident Register',
  };
  for (const [key, s] of Object.entries(SOURCES)) {
    const tr = document.createElement('tr');
    const td0 = document.createElement('td'); td0.textContent = names[key] || key;
    const td1 = document.createElement('td'); td1.textContent = s.publisher;
    const td2 = document.createElement('td'); td2.textContent = s.publication;
    const td3 = document.createElement('td'); td3.textContent = s.retrieved;
    tr.append(td0, td1, td2, td3);
    tbody.appendChild(tr);
  }
  el.appendChild(tbody);
  scroll.appendChild(el);
  table.appendChild(scroll);
  root.appendChild(table);

  const methods = document.createElement('article');
  methods.className = 'card';
  methods.innerHTML = `<h3>How to read the figures</h3>
  <dl class="methods">
    <div><dt>Fiscal year vs calendar year</dt><dd>Japan’s fiscal year runs April to March. Budget figures are labelled FY; GDP, CPI and population figures are calendar-year unless the label says FY.</dd></div>
    <div><dt>Core CPI</dt><dd>In Japan, “core CPI” means all items less fresh food only. The US “core” also excludes energy; Japan’s equivalent is core-core (all items less fresh food and energy).</dd></div>
    <div><dt>Yen vs US dollars</dt><dd>GDP is shown in yen first. Dollar figures use the 2025 average rate of ¥149.6 per US dollar (Federal Reserve G.5A), stated where they appear.</dd></div>
    <div><dt>Population: total or nationals only</dt><dd>“Total population” includes foreign residents. Where a figure covers Japanese nationals only (births, deaths, fertility), the label says so.</dd></div>
    <div><dt>Census or estimate</dt><dd>Census figures are a count on 1 October of the census year. Population Estimates update the census with births, deaths and migration. The 2025 population is the census count of 1 October 2025; the overview sparkline uses Population Estimates for 2020–2024 and the census count for 2025. The pyramid stays on 2024: the five-year age bands read from e-Stat on 26 November 2026 did not sum to the published census total, so no verified 2025 bands exist yet and the verified 2024 pyramid is kept, clearly labelled.</dd></div>
    <div><dt>Wages</dt><dd>From the Monthly Labour Survey, establishments with five or more employees. “Real wages” are total cash earnings deflated by the CPI excluding imputed rent for owner-occupied housing.</dd></div>
    <div><dt>Prefecture figures</dt><dd>Populations are from the Basic Resident Register (1 January 2024), rounded to the nearest thousand. Ageing shares are from the Statistics Bureau’s Population Estimates, rounded to 0.1 percentage points. The growth claim — only Tokyo and Saitama grew — is the Statistics Bureau’s own summary of the Population Estimates for 1 October 2024, and matches the register-based change in the data.</dd></div>
    <div><dt>Projections</dt><dd>The 2050 pyramid is the National Institute of Population and Social Security Research 2023 medium projection (medium fertility, medium mortality) — a projection, not a count.</dd></div>
    <div><dt>Debt vintages</dt><dd>Debt ratios are from the IMF World Economic Outlook, October 2026 vintage. The IMF revised its Japan debt measure in 2026: the October 2026 vintage puts 2024 gross debt at 213.6% of GDP, where the Global Debt Database series used before put the same year at 236.7%. Only the October 2026 vintage is used here.</dd></div>
  </dl>`;
  root.appendChild(methods);
}
