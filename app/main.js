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
    // No tooltip is opened for the cover capture: a tooltip over the
    // pyramid hides the chart it is meant to show.
    if (shot === 'map') {
      const btn = [...document.querySelectorAll('.seg-btn')].find((b) => b.textContent.includes('Share aged'));
      if (btn) btn.click();
    }
    if (shot === 'economy') {
      const btn = [...document.querySelectorAll('.seg-btn')].find((b) => b.textContent.includes('Real growth'));
      if (btn) btn.click();
      // The comparison defaults to South Korea, the peer in the takeaway.
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
  { title: 'Births vs deaths', section: 'Population', value: '671,236 births · 1,589,489 deaths · 2025', href: '#/population', keywords: 'births deaths natural decline fertility' },
  { title: 'Total fertility rate', section: 'Population', value: '1.14 · 2025', href: '#/population', keywords: 'fertility tfr children' },
  { title: 'Foreign residents', section: 'Population', value: '4.13 million · Dec 2025', href: '#/population', keywords: 'immigration foreigners nationality' },
  { title: 'Nominal GDP', section: 'Economy', value: '¥663.8 trillion · 2025', href: '#/economy', keywords: 'gdp nominal real growth' },
  { title: 'GDP per capita vs peers', section: 'Economy', value: '$35,951 · 2025', href: '#/economy', keywords: 'gdp per capita usa germany korea comparison' },
  { title: 'Wages — nominal vs real', section: 'Labour', value: '+2.3% nominal · −1.3% real · 2025', href: '#/labour', keywords: 'wages pay salary monthly labour survey' },
  { title: 'Unemployment rate', section: 'Labour', value: '2.5% · 2025', href: '#/labour', keywords: 'unemployment jobs employment' },
  { title: 'Consumer prices — core CPI', section: 'Prices', value: '+3.2% · 2025', href: '#/prices', keywords: 'cpi inflation prices bank of japan target' },
  { title: 'Government debt', section: 'Government finance', value: '204.8% of GDP · 2025', href: '#/finance', keywords: 'debt deficit bonds jgb fiscal' },
  { title: 'Prefecture tile map', section: 'Prefectures', value: 'All 47 prefectures', href: '#/prefectures', keywords: 'prefecture map tokyo akita okinawa tile' },
  { title: 'Sources & methods', section: 'Sources & methods', value: 'Every dataset, retrieved 26 Nov 2026', href: '#/sources', keywords: 'sources methods definitions fiscal year core cpi' },
];
buildSearch(SEARCH_INDEX);

render();
