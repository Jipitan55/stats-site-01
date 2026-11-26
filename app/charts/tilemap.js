// Tile map of Japan's 47 prefectures, hand-drawn SVG. One square tile per
// prefecture on a grid that reads as the shape of Japan, coloured by the
// chosen indicator on a single sequential indigo scale.
import { svgEl, textEl, bindTip } from './svg.js';
import { fmtNum } from '../ui/format.js';

const INK = '#2e2a6b';
const SCALE = ['#efeef7', '#d9d6ee', '#b3aede', '#8a83c9', '#6158b3', '#413a93', '#2e2a6b'];

export function tileMap(container, opts) {
  const { prefectures, indicator, selectedId, onSelect } = opts;
  container.innerHTML = '';
  const cols = 13, rows = 13;
  const TW = 58, TH = 46, GAP = 4, W = cols * (TW + GAP) + GAP, H = rows * (TH + GAP) + GAP;
  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img',
    'aria-label': `Tile map of Japan coloured by ${indicator.label}`,
  }, container);
  const vals = prefectures.map((p) => p[indicator.id]);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const colorFor = (v) => {
    if (indicator.id === 'change') {
      // Diverging around zero for population change: vermilion for decline,
      // indigo for growth, pale in the middle.
      if (v >= 0) return '#2e2a6b';
      const t = Math.min(1, Math.abs(v) / 1.8);
      return t > 0.66 ? '#e4572e' : t > 0.33 ? '#ef7d54' : '#f6b49b';
    }
    const t = hi === lo ? 0.5 : (v - lo) / (hi - lo);
    return SCALE[Math.min(SCALE.length - 1, Math.floor(t * SCALE.length))];
  };
  const textColor = (v, id) => {
    if (indicator.id === 'change') return v >= 0 ? '#fff' : '#2e1a12';
    const t = hi === lo ? 0.5 : (v - lo) / (hi - lo);
    return t > 0.6 ? '#fff' : INK;
  };
  for (const p of prefectures) {
    const x = GAP + p.col * (TW + GAP), y = GAP + p.row * (TH + GAP);
    const g = svgEl('g', { class: 'tile' + (p.id === selectedId ? ' sel' : '') }, svg);
    const rect = svgEl('rect', {
      x, y, width: TW, height: TH, rx: 5, fill: colorFor(p[indicator.id]),
      stroke: p.id === selectedId ? '#e4572e' : 'none', 'stroke-width': 3,
    }, g);
    const name = p.name.length > 9 ? p.name.slice(0, 9) : p.name;
    textEl(g, x + TW / 2, y + TH / 2 - 2, name, {
      class: 'tile-name', 'text-anchor': 'middle', fill: textColor(p[indicator.id], p.id),
    });
    const shown = indicator.id === 'pop'
      ? fmtNum(p.pop, 0) + 'k'
      : fmtNum(p[indicator.id], indicator.decimals) + indicator.unit;
    textEl(g, x + TW / 2, y + TH / 2 + 13, shown, {
      class: 'tile-val', 'text-anchor': 'middle', fill: textColor(p[indicator.id], p.id),
    });
    bindTip(rect, `<b>${p.name}</b><br>Population ${fmtNum(p.pop, 0)}k<br>Change ${fmtNum(p.change, 1)}% · Aged 65+ ${fmtNum(p.aged, 1)}%`);
    rect.addEventListener('click', () => onSelect && onSelect(p.id));
    g.addEventListener('click', () => onSelect && onSelect(p.id));
  }
  return svg;
}
