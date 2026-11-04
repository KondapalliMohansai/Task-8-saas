import { arcPath } from '../../utils/chart';

// Ring made of rounded arcs. Angles are degrees clockwise from the top.
export default function DonutChart({ segments, size = 260, stroke = 26, track = '#F3F6FD', children }) {
  const c = size / 2;
  const r = c - stroke / 2;
  // round caps stick out by half the stroke, so pull each arc in by that angle
  const cap = (stroke / 2 / r) * (180 / Math.PI);

  return (
    <div className="relative aspect-square w-full" style={{ maxWidth: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label="Donut chart">
        <circle cx={c} cy={c} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        {segments.map((s) => {
          const from = s.from + cap;
          const to = Math.max(from + 0.1, s.to - cap);
          return (
            <path key={s.label} d={arcPath(c, c, r, from, to)} fill="none" stroke={s.color} strokeWidth={stroke} strokeLinecap="round" />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function Legend({ items }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-body">
      {items.map((s) => (
        <li key={s.label} className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full" style={{ backgroundColor: s.color }} />
          {s.label}
        </li>
      ))}
    </ul>
  );
}
