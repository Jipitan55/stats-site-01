// Nippon Numbers — entry point. Builds the navigation and search, renders
// the section named by the hash, and applies screenshot states (?shot=…)
// that deep-link a control into a non-default state.
import { SOURCES } from './data/sources.js';
import { KPI_TILES } from './data/overview.js';
import { buildNav, currentSection, showSection } from './router.js';
import { buildSearch } from './ui/controls.js';

window.__SOURCES = SOURCES;

const nav = document.getElementById('main-nav');
const main = document.getElementById('main');
let currentApi = null;

async function render() {
  currentApi = await showSection(currentSection(), main, nav);
  applyShot();
}

function applyShot() {
  const shot = new URLSearchParams(window.location.search).get('shot');
  if (!shot) return;
  // Let layout settle before opening tooltips or clicking controls.
  setTimeout(() => {
    if (shot === 'cover' && currentApi && currentApi.pyramid) {
      currentApi.pyramid.openBand(14);
    }
    if (shot === 'map') {
      const btn = [...document.querySelectorAll('.seg-btn')].find((b) => b.textContent.includes('Share aged'));
      if (btn) btn.click();
    }
    if (shot === 'economy') {
      const btn = [...document.querySelectorAll('.seg-btn')].find((b) => b.textContent.includes('Real growth'));
      if (btn) btn.click();
      const de = [...document.querySelectorAll('.chip')].find((b) => b.textContent === 'Germany');
      if (de && !de.classList.contains('on')) de.click();
    }
  }, 350);
}

buildNav(nav, render);

// Search index: every KPI, every section, and the main indicators.
const SEARCH_INDEX = [
  ...KPI_TILES.map((t) => ({
    title: t.title + ' — ' + t.blurb,
    section: 'Overview',
    value: t.headline.value + ' ' + t.headline.unit + ' · ' + t.headline.period,
    href: '#/' + t.section,
    keywords: t.title + ' ' + t.blurb,
  })),
  { title: 'Population pyramid 1950–2050', section: 'Population', value: 'Scrub the years', href: '#/population', keywords: 'pyramid age structure ageing demographic' },
  { title: 'Births vs deaths', section: 'Population', value: '686,061 births · 1,605,298 deaths · 2024', href: '#/population', keywords: 'births deaths natural decline fertility' },
  { title: 'Total fertility rate', section: 'Population', value: '1.15 · 2024', href: '#/population', keywords: 'fertility tfr children' },
  { title: 'Foreign residents', section: 'Population', value: '3.77 million · Dec 2024', href: '#/population', keywords: 'immigration foreigners nationality' },
  { title: 'Nominal GDP', section: 'Economy', value: '¥609.5 trillion · 2024', href: '#/economy', keywords: 'gdp nominal real growth' },
  { title: 'GDP per capita vs peers', section: 'Economy', value: '$32,465 · 2024', href: '#/economy', keywords: 'gdp per capita usa germany korea comparison' },
  { title: 'Wages — nominal vs real', section: 'Labour', value: '+2.9% nominal · −0.2% real · 2024', href: '#/labour', keywords: 'wages pay salary monthly labour survey' },
  { title: 'Unemployment rate', section: 'Labour', value: '2.5% · 2024', href: '#/labour', keywords: 'unemployment jobs employment' },
  { title: 'Consumer prices — core CPI', section: 'Prices', value: '+2.7% · 2024', href: '#/prices', keywords: 'cpi inflation prices bank of japan target' },
  { title: 'Government debt', section: 'Government finance', value: '214.5% of GDP · 2024', href: '#/finance', keywords: 'debt deficit bonds jgb fiscal' },
  { title: 'Prefecture tile map', section: 'Prefectures', value: 'All 47 prefectures', href: '#/prefectures', keywords: 'prefecture map tokyo akita okinawa tile' },
  { title: 'Sources & methods', section: 'Sources & methods', value: 'Every dataset, retrieved 26 Nov 2026', href: '#/sources', keywords: 'sources methods definitions fiscal year core cpi' },
];
buildSearch(SEARCH_INDEX);

render();
