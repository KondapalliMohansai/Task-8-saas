import { ChevronDown } from 'lucide-react';
import { dateOptions } from '../../data/dashboard';

// the two "10-06-2021" pickers in the top right of Dashboard / Product Analytics
export default function DateFilter({ from, to, onFrom, onTo }) {
  const select = 'h-11 cursor-pointer appearance-none rounded-xl bg-white pl-4 pr-9 text-sm font-semibold text-body shadow-card outline-none focus:ring-2 focus:ring-primary/30';
  return (
    <div className="flex gap-3">
      {[
        ['From date', from, onFrom],
        ['To date', to, onTo],
      ].map(([label, value, onChange]) => (
        <label key={label} className="relative">
          <span className="sr-only">{label}</span>
          <select className={select} value={value} onChange={(e) => onChange(e.target.value)}>
            {dateOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        </label>
      ))}
    </div>
  );
}
