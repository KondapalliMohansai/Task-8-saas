import { useId } from 'react';
import { smoothPath } from '../../utils/chart';

// soft wave used behind the Total Product / Total Sales numbers
export default function MiniAreaChart({ data, color, fill = true }) {
  const id = useId().replace(/:/g, '');
  const W = 300;
  const H = 110;
  const max = Math.max(...data);
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * W, y: H - 10 - (v / max) * (H - 30) }));
  const line = smoothPath(pts);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${line} L ${W} ${H} L 0 ${H} Z`} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
