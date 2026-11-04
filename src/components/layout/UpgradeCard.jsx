import Button from '../common/Button';

// the lamp illustration + Upgrade Now button at the bottom of the sidebar
export default function UpgradeCard() {
  return (
    <div className="mx-5 rounded-2xl bg-[#F0F5FF] px-4 pb-4 pt-0 text-center">
      <svg viewBox="0 0 140 130" className="mx-auto h-[120px] w-full" aria-hidden="true">
        <defs>
          <linearGradient id="lampBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7EB0FF" />
            <stop offset="1" stopColor="#4A86F7" />
          </linearGradient>
          <linearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7EB0FF" stopOpacity="0.45" />
            <stop offset="1" stopColor="#7EB0FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="70" y1="0" x2="70" y2="40" stroke="#4A86F7" strokeWidth="2" />
        <path d="M70 40 L120 98 H20 Z" fill="url(#lampBody)" />
        <ellipse cx="70" cy="98" rx="50" ry="6" fill="#6FA3FA" />
        <path d="M24 102 H116 L124 130 H16 Z" fill="url(#lampGlow)" />
      </svg>
      <Button className="h-9 w-full rounded-lg text-xs">Upgrade Now</Button>
    </div>
  );
}
