// Population pyramid, hand-drawn SVG. Male bars go left, female bars right,
// age labels sit in the centre column, and both halves stay symmetric on a
// phone. Year is a parameter: 1950, 1990, 2024 or the 2050 projection.
import { svgEl, textEl, bindTip, tooltip, showTip, hideTip } from './svg.js';
import { fmtNum } from '../ui/format.js';

export function pyramidChart(container, opts) {
  const { year, groups, maleShare, labels, total, height } = opts;
  container.innerHTML = '';
  const W = 720, H = height || 430, L = 8, R = 8, T = 10, B = 26, C = 46;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img',
    'aria-label': `Population pyramid for ${year}`,
  }, container);
  const maxBand = Math.max(...groups) * 1.06;
  const half = (W - L - R - C) / 2;
  const xMale = (v) => L + half - (v / maxBand) * half;
  const xFemale = (v) => L + half + C + (v / maxBand) * half;
  const rowH = (H - T - B) / groups.length;
  // Oldest band at the top, youngest at the bottom, as population
  // pyramids are conventionally drawn (groups[0] is 0–4).
  const y = (i) => T + (groups.length - 1 - i) * rowH;
  // Axis ticks (millions). Both sides start at 0.
  [0, 2, 4, 6, 8].forEach((m) => {
    const v = m * 1000;
    if (v > maxBand) return;
    textEl(svg, xMale(v), H - 6, m + 'm', { class: 'axis', 'text-anchor': 'middle' });
    textEl(svg, xFemale(v), H - 6, m + 'm', { class: 'axis', 'text-anchor': 'middle' });
  });
  textEl(svg, L + half / 2, T - 0 + 2, 'Male', { class: 'axis strong', 'text-anchor': 'middle' });
  textEl(svg, L + half + C + half / 2, T + 2, 'Female', { class: 'axis strong', 'text-anchor': 'middle' });
  groups.forEach((totalBand, i) => {
    const m = Math.round(totalBand * maleShare[i]);
    const f = totalBand - m;
    const barH = Math.max(2, rowH - 2.5);
    const yTop = y(i) + 1;
    const mRect = svgEl('rect', {
      x: xMale(m), y: yTop, width: (m / maxBand) * half, height: barH,
      class: 'pyr-m', rx: 1,
    }, svg);
    const fRect = svgEl('rect', {
      x: xFemale(0), y: yTop, width: (f / maxBand) * half, height: barH,
      class: 'pyr-f', rx: 1,
    }, svg);
    const label = labels[i];
    const tipHtml = `<b>Age ${label}, ${year}</b><br>Male ${fmtNum(m)}k · Female ${fmtNum(f)}k<br>Total ${fmtNum(totalBand)}k`;
    bindTip(mRect, tipHtml);
    bindTip(fRect, tipHtml);
    // When the rows are short (the cover pyramid), label every other band
    // so the centre column does not crowd.
    if (!(rowH < 18 && i % 2 === 1)) {
      textEl(svg, L + half + C / 2, yTop + barH / 2 + 4, label, {
        class: 'axis pyr-label', 'text-anchor': 'middle',
      });
    }
  });
  // Centre divider.
  svgEl('line', { x1: L + half + C / 2, x2: L + half + C / 2, y1: T, y2: H - B, class: 'axis-line' }, svg);
  // Summary line under the chart.
  const note = document.createElement('p');
  note.className = 'chart-note';
  note.textContent = `Total population ${fmtNum(total / 1000, 1)} million · ${year === 2050 ? 'IPSS medium projection' : year === 2024 ? 'Population Estimates, 1 Oct 2024' : 'Population Census'}`;
  container.appendChild(note);
  return {
    svg,
    // Open a tooltip on one age band (for keyboard users): band index 14 is
    // age 70–74, the largest band in 2024.
    openBand(band) {
      const m = Math.round(groups[band] * maleShare[band]);
      const f = groups[band] - m;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + (T + (groups.length - 1 - band) * rowH + rowH / 2) * (rect.height / H);
      showTip(`<b>Age ${labels[band]}, ${year}</b><br>Male ${fmtNum(m)}k · Female ${fmtNum(f)}k<br>Total ${fmtNum(groups[band])}k`, cx, cy);
    },
  };
}
