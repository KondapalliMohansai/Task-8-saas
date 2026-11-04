import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, formatLong, getMonthGrid, isSameDay } from '../../utils/date';

const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function MiniCalendar({ selected, onSelect }) {
  const weeks = getMonthGrid(selected.getFullYear(), selected.getMonth());

  return (
    <div className="rounded-xl border border-line p-3">
      <div className="mb-3 flex items-center justify-between px-1 text-xs font-semibold text-ink">
        <span>{formatLong(selected)}</span>
        <span className="flex gap-1 text-[#B9B8C8]">
          <button type="button" aria-label="Previous month" onClick={() => onSelect(addMonths(selected, -1))} className="hover:text-primary">
            <ChevronLeft size={16} />
          </button>
          <button type="button" aria-label="Next month" onClick={() => onSelect(addMonths(selected, 1))} className="hover:text-primary">
            <ChevronRight size={16} />
          </button>
        </span>
      </div>
      <div className="grid grid-cols-7 text-center text-xs">
        {letters.map((l, i) => (
          <span key={i} className="pb-2 font-semibold text-ink">{l}</span>
        ))}
        {weeks.flat().map(({ date, inMonth }) => {
          const active = isSameDay(date, selected);
          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelect(date)}
              aria-label={formatLong(date)}
              aria-pressed={active}
              className={`mx-auto mb-1 flex h-[26px] w-[26px] items-center justify-center rounded-full ${
                active ? 'bg-primary font-bold text-white shadow-[0_4px_10px_rgba(96,91,255,0.4)]' : inMonth ? 'text-body hover:bg-primary/10' : 'text-[#B9B8C8] hover:bg-primary/10'
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
