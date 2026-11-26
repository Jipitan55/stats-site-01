// Hash router: #/overview, #/population, #/economy, #/labour, #/prices,
// #/finance, #/prefectures, #/sources. Sections other than the overview
// are loaded on demand (dynamic import), so the first load stays small.
// Refreshing on a section never 404s: the site is one static page.
export const SECTIONS = [
  { id: 'overview', title: 'Overview', render: () => import('./sections/overview.js').then((m) => m.renderOverview) },
  { id: 'population', title: 'Population', render: () => import('./sections/population.js').then((m) => m.renderPopulation) },
  { id: 'economy', title: 'Economy', render: () => import('./sections/economy.js').then((m) => m.renderEconomy) },
  { id: 'labour', title: 'Labour', render: () => import('./sections/labour.js').then((m) => m.renderLabour) },
  { id: 'prices', title: 'Prices', render: () => import('./sections/prices.js').then((m) => m.renderPrices) },
  { id: 'finance', title: 'Government finance', render: () => import('./sections/finance.js').then((m) => m.renderFinance) },
  { id: 'prefectures', title: 'Prefectures', render: () => import('./sections/prefectures.js').then((m) => m.renderPrefectures) },
  { id: 'sources', title: 'Sources & methods', render: () => import('./sections/sources.js').then((m) => m.renderSources) },
];

const SECTION_TITLES = {
  overview: 'Overview — Japan at a glance',
  population: 'Population — fewer, older, more diverse',
  economy: 'Economy — the world’s fourth-largest in 2025, growing again',
  labour: 'Labour — pay is rising, purchasing power is not',
  prices: 'Prices — inflation above target for a fourth year',
  finance: 'Government finance — the world’s biggest debt pile',
  prefectures: 'Prefectures — two grew, 45 shrank',
  sources: 'Sources & methods',
};

export function currentSection() {
  const h = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return SECTIONS.some((s) => s.id === h) ? h : 'overview';
}

export function buildNav(navEl, onNavigate) {
  for (const s of SECTIONS) {
    const a = document.createElement('a');
    a.href = '#/' + s.id;
    a.textContent = s.title;
    a.dataset.section = s.id;
    navEl.appendChild(a);
  }
  window.addEventListener('hashchange', onNavigate);
}

export async function showSection(id, mainEl, navEl) {
  const section = SECTIONS.find((s) => s.id === id) || SECTIONS[0];
  for (const a of navEl.querySelectorAll('a')) {
    a.classList.toggle('on', a.dataset.section === section.id);
    if (a.dataset.section === section.id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  const render = await section.render();
  mainEl.innerHTML = '';
  if (section.id !== 'overview') {
    const head = document.createElement('div');
    head.className = 'section-head';
    const h2 = document.createElement('h2');
    h2.textContent = SECTION_TITLES[section.id];
    head.appendChild(h2);
    mainEl.appendChild(head);
  }
  const body = document.createElement('div');
  body.className = 'section-body';
  mainEl.appendChild(body);
  const api = render(body);
  document.title = 'Nippon Numbers — ' + section.title;
  window.scrollTo(0, 0);
  return api;
}
