// Line chart, hand-drawn SVG. Supports several series, a dashed reference
// line (e.g. the Bank of Japan's 2% target), and dots on hover points.
import { svgEl, textEl, ticks, bindTip } from './svg.js';
import { fmtNum } from '../ui/format.js';

export function lineChart(container, opts) {
  const { labels, series, unit, decimals, reference, ariaLabel, yLabel } = opts;
  const W = 720, H = 300, L = 54, R = 14, T = 16, B = 30;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img',
    'aria-label': ariaLabel || 'Line chart',
  }, container);
  const all = series.flatMap((s) => s.values);
  let lo = Math.min(...all), hi = Math.max(...all);
  if (reference) { lo = Math.min(lo, reference.value); hi = Math.max(hi, reference.value); }
  const pad = (hi - lo) * 0.12 || 1;
  hi += pad; lo -= pad;
  const y = (v) => T + ((hi - v) / (hi - lo)) * (H - T - B);
  const x = (i) => L + (i / (labels.length - 1)) * (W - L - R);
  for (const tv of ticks(lo, hi, 4)) {
    svgEl('line', { x1: L, x2: W - R, y1: y(tv), y2: y(tv), class: 'grid' }, svg);
    textEl(svg, L - 8, y(tv) + 4, fmtNum(tv, decimals) + (yLabel || ''), { class: 'axis', 'text-anchor': 'end' });
  }
  if (reference) {
    svgEl('line', { x1: L, x2: W - R, y1: y(reference.value), y2: y(reference.value), class: 'refline' }, svg);
    textEl(svg, L + 4, y(reference.value) - 6, reference.label, { class: 'reflabel', 'text-anchor': 'start' });
  }
  series.forEach((s) => {
    const pts = s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    svgEl('polyline', {
      points: pts, fill: 'none', stroke: s.color || 'var(--indigo)',
      'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
      ...(s.dash ? { 'stroke-dasharray': s.dash } : {}),
    }, svg);
    s.values.forEach((v, i) => {
      const dot = svgEl('circle', {
        cx: x(i), cy: y(v), r: 4.5, class: 'dot',
        fill: s.color || 'var(--indigo)',
      }, svg);
      bindTip(dot, `<b>${labels[i]}</b><br>${s.name}: ${fmtNum(v, decimals)} ${unit}`);
    });
  });
  labels.forEach((lab, i) => {
    textEl(svg, x(i), H - 8, String(lab), { class: 'axis', 'text-anchor': 'middle' });
  });
  return svg;
}
