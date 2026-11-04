import { Check } from 'lucide-react';

export default function Checkbox({ checked, onChange, round = false, label = 'checkbox' }) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} aria-label={label} />
      <span
        className={`flex h-5 w-5 items-center justify-center border-[1.5px] border-[#C5C5D1] bg-white text-white transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${
          round ? 'rounded-full' : 'rounded'
        }`}
      >
        {checked && <Check size={13} strokeWidth={3} />}
      </span>
    </label>
  );
}
