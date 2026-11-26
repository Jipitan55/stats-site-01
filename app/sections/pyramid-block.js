// The population pyramid block, shared by the Overview and Population
// sections: year scrubber (1950 / 1990 / 2024 / 2050 projection) plus the
// pyramid itself. The shape change across years is the dramatic part.
import { PYRAMID, PYRAMID_YEARS, AGE_LABELS, MALE_SHARE } from '../data/population.js';
import { pyramidChart } from '../charts/pyramid.js';
import { yearScrubber } from '../ui/controls.js';
import { chartCard } from './helpers.js';

const YEAR_NOTES = {
  1950: 'Census',
  1990: 'Census',
  2024: 'Estimate',
  2050: 'Projection',
};

export function pyramidBlock(initialYear, opts) {
  let year = initialYear || 2024;
  let api = null;
  const card = chartCard({
    title: 'Population pyramid',
    takeaway: opts && opts.takeaway ? opts.takeaway : 'From a pyramid to a column: Japan aged in one lifetime',
    source: PYRAMID[year].total,
    note: '5-year bands, thousands of people',
  });
  const controls = document.createElement('div');
  controls.className = 'pyr-controls';
  card.insertBefore(controls, card.querySelector('.chart-slot'));
  const slot = card.querySelector('.chart-slot');
  function draw() {
    const d = PYRAMID[year];
    card.querySelector('.src').textContent =
      'Source: ' + (year === 2050 ? 'National Institute of Population and Social Security Research, Population Projections 2023 (medium)' : year === 2024 ? 'Statistics Bureau of Japan, Population Estimates, 1 Oct 2024' : 'Statistics Bureau of Japan, Population Census ' + year) + ' · 5-year bands, thousands of people';
    api = pyramidChart(slot, {
      year, groups: d.groups, maleShare: MALE_SHARE, labels: AGE_LABELS, total: d.total.value,
      height: opts && opts.height ? opts.height : 430,
    });
    yearScrubber(controls, PYRAMID_YEARS, year, (y) => { year = y; draw(); }, YEAR_NOTES);
  }
  draw();
  return {
    card,
    openBand(band) { if (api) api.openBand(band); },
    setYear(y) { year = y; draw(); },
  };
}
