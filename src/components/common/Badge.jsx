const tones = {
  // soft pills used in the invoice + customer tables
  success: 'bg-[#E8F5EB] text-brand-green',
  warning: 'bg-[#FFF2E6] text-[#FF9A4D]',
  danger: 'bg-[#FDE8EB] text-brand-red',
  male: 'bg-[#EAF0FF] text-brand-blue',
  female: 'bg-[#FFEEE8] text-brand-orange',
  // solid pills used in the task screens
  pending: 'bg-brand-orange text-white',
  running: 'bg-primary text-white',
  done: 'bg-[#2E9E49] text-white',
  low: 'bg-[#FF5E6C] text-white',
  medium: 'bg-[#FF9068] text-white',
  high: 'bg-brand-cyan text-white',
  onTrack: 'bg-brand-yellow text-ink',
  atRisk: 'bg-[#D41C32] text-white',
  lavender: 'bg-[#EEEDFF] text-primary',
};

export default function Badge({ tone = 'lavender', className = '', children }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
