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
    wdi: 'World Development Indicators', mls: 'Monthly Labour Survey', lfs: 'Labour Force Survey',
    cpi: 'Consumer Price Index', boj: 'Price stability target', imfWeo: 'World Economic Outlook',
    imfGdd: 'Global Debt Database', mof: 'Japanese Government Bonds', brr: 'Basic Resident Register',
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
    <div><dt>Yen vs US dollars</dt><dd>GDP is shown in yen first. Dollar figures use the 2024 average rate of ¥151.5 per US dollar, stated where they appear.</dd></div>
    <div><dt>Population: total or nationals only</dt><dd>“Total population” includes foreign residents. Where a figure covers Japanese nationals only (births, deaths, fertility), the label says so.</dd></div>
    <div><dt>Census or estimate</dt><dd>Census figures are a count on 1 October of the census year. Population Estimates update the census with births, deaths and migration; the 2024 figure is an estimate as of 1 October 2024.</dd></div>
    <div><dt>Wages</dt><dd>From the Monthly Labour Survey, establishments with five or more employees. “Real wages” are total cash earnings deflated by the CPI excluding imputed rent for owner-occupied housing.</dd></div>
    <div><dt>Prefecture figures</dt><dd>Populations are from the Basic Resident Register (1 January 2024), rounded to the nearest thousand. Ageing shares are from the Statistics Bureau’s Population Estimates, rounded to 0.1 percentage points.</dd></div>
    <div><dt>Projections</dt><dd>The 2050 pyramid is the National Institute of Population and Social Security Research 2023 medium projection (medium fertility, medium mortality) — a projection, not a count.</dd></div>
    <div><dt>Debt vintages</dt><dd>Debt ratios are from the IMF’s April 2026 World Economic Outlook vintage for the headline ratio and the IMF Global Debt Database for the series. Older IMF vintages put the same years higher (about 255% for 2023); the two series are not mixed here.</dd></div>
  </dl>`;
  root.appendChild(methods);
}
