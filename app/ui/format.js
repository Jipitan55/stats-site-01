// Number formatting: one consistent style across the whole site.
export function fmtNum(v, decimals) {
  const d = decimals === undefined ? (Number.isInteger(v) ? 0 : 1) : decimals;
  // Coerce -0, float dust, and anything that rounds to zero at this
  // precision (e.g. -0.04 at 1 decimal) to 0, so a value never prints as "-0.0".
  const n = Number(v.toFixed(d)) === 0 ? 0 : v;
  return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function fmtSigned(v, decimals) {
  return (v > 0 ? '+' : '') + fmtNum(v, decimals);
}

// Compact large numbers: 123802 thousand -> "123.8m".
export function fmtCompact(v) {
  if (Math.abs(v) >= 1000000) return fmtNum(v / 1000000, 1) + 'm';
  if (Math.abs(v) >= 1000) return fmtNum(v / 1000, 1) + 'k';
  return fmtNum(v, 0);
}

// Render a figure as "value unit" with its period and source.
export function figText(f) {
  return fmtNum(f.value) + ' ' + f.unit;
}

export function sourceLine(f, extra) {
  const s = window.__SOURCES[f.source];
  const bits = ['Source: ' + (s ? (s.short || s.publisher) : f.source), f.period];
  if (extra) bits.push(extra);
  return bits.join(' · ');
}
