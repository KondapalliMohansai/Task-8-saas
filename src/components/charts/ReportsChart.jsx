import { useRef, useState } from 'react';
import { reportLabels, reportPoints } from '../../data/dashboard';
import { smoothPath } from '../../utils/chart';

const W = 640;
const H = 300;
const pad = { l: 46, r: 6, t: 20, b: 36 };
const xMax = 9.5;
const sx = (x) => pad.l + (x / xMax) * (W - pad.l - pad.r);
const sy = (y) => pad.t + (1 - y / 100) * (H - pad.t - pad.b);

const points = reportPoints.map((p) => ({ ...p, px: sx(p.x), py: sy(p.y) }));
const markers = points.filter((p) => p.dot);
const line = smoothPath(points.map((p) => ({ x: p.px, y: p.py })));
const baseY = sy(0);
const area = `${line} L ${points[points.length - 1].px} ${baseY} L ${points[0].px} ${baseY} Z`;

export default function ReportsChart() {
  const [active, setActive] = useState(markers.findIndex((m) => m.x === 4.9));
  const [hovering, setHovering] = useState(false);
  const svgRef = useRef(null);
  const current = markers[active];

  // pick the marker closest to the pointer - the CSS transitions do the gliding
  const onMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    markers.forEach((m, i) => {
      if (Math.abs(m.px - x) < Math.abs(markers[best].px - x)) best = i;
    });
    if (best !== active) setActive(best);
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full cursor-crosshair"
      onPointerMove={onMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      role="img"
      aria-label="Sales report line chart"
    >
      <defs>
        <linearGradient id="reportStroke" gradientUnits="userSpaceOnUse" x1={pad.l} y1="0" x2={W} y2="0">
          <stop offset="0" stopColor="#5BB8FF" />
          <stop offset="0.5" stopColor="#A67CFA" />
          <stop offset="1" stopColor="#F45EE9" />
        </linearGradient>
        <linearGradient id="reportFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A67CFA" stopOpacity="0.08" />
          <stop offset="1" stopColor="#A67CFA" stopOpacity="0.01" />
        </linearGradient>
        {/* repeating gradient = dashed guide line */}
        <linearGradient id="reportDash" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="7" spreadMethod="repeat">
          <stop offset="0.3" stopColor="#7774C8" />
          <stop offset="0.3" stopColor="#7774C8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 20, 40, 60, 80, 100].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={sy(v)} y2={sy(v)} stroke="#F0F0F6" />
          <text x={pad.l - 16} y={sy(v) + 4} textAnchor="end" fontSize="12" fill="#9B9BAE">
            {v}
          </text>
        </g>
      ))}
      {reportLabels.map((l, i) => (
        <text key={l} x={sx(i)} y={H - 10} textAnchor="middle" fontSize="12" fill="#9B9BAE">
          {l}
        </text>
      ))}

      <path d={area} fill="url(#reportFill)" />
      <path d={line} fill="none" stroke="url(#reportStroke)" strokeWidth="4" strokeLinecap="round" />

      {/* dashed guide from the active dot down to the axis */}
      <rect
        className="chart-glide"
        x="-0.75"
        y="0"
        width="1.5"
        fill="url(#reportDash)"
        style={{ transform: `translate(${current.px}px, ${current.py}px)`, height: baseY - current.py }}
      />

      {markers.map((m, i) => (
        <circle
          key={m.x}
          className={`chart-dot ${i === active ? 'is-active' : ''}`}
          cx={m.px}
          cy={m.py}
          r="6"
          fill={i === active ? '#A67CFA' : '#fff'}
          stroke="#A67CFA"
          strokeWidth="3"
          onPointerEnter={() => setActive(i)}
        />
      ))}

      <g className="chart-glide" style={{ transform: `translate(${current.px - 40}px, ${current.py - 66}px)` }}>
        <g className="chart-fade" style={{ opacity: hovering ? 1 : 0.92 }}>
          <rect width="80" height="50" rx="8" fill="#05004E" />
          <path d="M34 50h12l-6 7z" fill="#05004E" />
          <text x="40" y="20" textAnchor="middle" fontSize="12" fill="#C9C8E6">
            Sales
          </text>
          <text x="40" y="39" textAnchor="middle" fontSize="16" fill="#fff">
            {Math.round(current.y * 54.65).toLocaleString('en-US')}
          </text>
        </g>
      </g>
    </svg>
  );
}
