// Vertical bar chart, hand-drawn SVG. Negative values draw below the zero line.
import { svgEl, textEl, ticks, bindTip } from './svg.js';
import { fmtNum } from '../ui/format.js';

export function barChart(container, opts) {
  const { labels, series, unit, decimals, color, highlight, ariaLabel } = opts;
  const narrow = typeof window !== 'undefined' && window.innerWidth < 560;
  // Narrow viewBox (360) keeps axis text at least 11px when the chart
  // scales to a ~330px card on a 390px phone.
  const W = narrow ? 360 : 720, H = 300, L = 54, R = 12, T = 14, B = 30;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img',
    'aria-label': ariaLabel || 'Bar chart',
  }, container);
  const all = series.flatMap((s) => s.values);
  let lo = Math.min(0, ...all), hi = Math.max(0, ...all);
  const pad = (hi - lo) * 0.08 || 1;
  hi += pad; lo -= pad;
  const y = (v) => T + ((hi - v) / (hi - lo)) * (H - T - B);
  const n = labels.length;
  const slot = (W - L - R) / n;
  const bw = Math.min(46, slot * (series.length > 1 ? 0.36 : 0.62));
  const y0 = y(0);
  for (const tv of ticks(lo, hi, 4)) {
    svgEl('line', { x1: L, x2: W - R, y1: y(tv), y2: y(tv), class: 'grid' }, svg);
    textEl(svg, L - 8, y(tv) + 4, fmtNum(tv, decimals), { class: 'axis', 'text-anchor': 'end' });
  }
  svgEl('line', { x1: L, x2: W - R, y1: y0, y2: y0, class: 'axis-line' }, svg);
  labels.forEach((lab, i) => {
    const cx = L + slot * (i + 0.5);
    series.forEach((s, j) => {
      const v = s.values[i];
      const x = cx + (series.length > 1 ? (j - (series.length - 1) / 2) * (bw + 3) - bw / 2 : -bw / 2);
      const top = y(Math.max(v, 0)), bot = y(Math.min(v, 0));
      const isHi = highlight && highlight(i, j);
      const rect = svgEl('rect', {
        x, y: top, width: bw, height: Math.max(1.5, bot - top),
        class: 'bar' + (isHi ? ' hi' : ''),
        fill: s.color || color || 'var(--indigo)',
      }, svg);
      bindTip(rect, `<b>${lab}</b><br>${s.name}: ${fmtNum(v, decimals)} ${unit}`);
    });
    // On a narrow chart, label every other bar so long labels do not collide.
    if (narrow && i % 2 === 1) return;
    textEl(svg, cx, H - 8, String(lab), { class: 'axis', 'text-anchor': 'middle' });
  });
  return svg;
}
