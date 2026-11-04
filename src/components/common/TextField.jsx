import { ChevronDown } from 'lucide-react';

const base =
  'h-12 w-full rounded-xl bg-field px-4 text-sm text-ink outline-none transition placeholder:text-[#8F8EA3] focus:ring-2 focus:ring-primary/30';

export function TextField({ label, icon, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-2 block text-base font-semibold text-ink">{label}</span>}
      <span className="relative block">
        <input className={`${base} ${icon ? 'pr-11' : ''} ${error ? 'ring-2 ring-brand-red/40' : ''}`} {...props} />
        {icon && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/70">{icon}</span>}
      </span>
      {error && <span className="mt-1 block text-xs text-brand-red">{error}</span>}
    </label>
  );
}

export function SelectField({ label, className = '', children, ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-2 block text-base font-semibold text-ink">{label}</span>}
      <span className="relative block">
        <select className={`${base} cursor-pointer appearance-none pr-10`} {...props}>
          {children}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
      </span>
    </label>
  );
}

export function SearchField({ className = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        className="h-11 w-full rounded-xl bg-white px-4 pr-11 text-sm text-ink shadow-card outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/30"
        {...props}
      />
      <SearchIcon />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6F6E86]" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
