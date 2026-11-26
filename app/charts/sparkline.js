// Tiny sparkline for the overview KPI tiles: a 6-point line, no axes.
import { svgEl } from './svg.js';

export function sparkline(container, values, up) {
  const W = 120, H = 26, P = 3;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, role: 'img',
    'aria-label': 'Trend sparkline',
  }, container);
  const lo = Math.min(...values), hi = Math.max(...values);
  const span = hi - lo || 1;
  const x = (i) => P + (i / (values.length - 1)) * (W - 2 * P);
  const y = (v) => P + ((hi - v) / span) * (H - 2 * P);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  svgEl('polyline', {
    points: pts, fill: 'none',
    stroke: up === false ? 'var(--vermilion)' : 'var(--indigo)',
    'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
  }, svg);
  const last = values[values.length - 1];
  svgEl('circle', {
    cx: x(values.length - 1), cy: y(last), r: 3.2,
    fill: 'var(--vermilion)',
  }, svg);
  return svg;
}
