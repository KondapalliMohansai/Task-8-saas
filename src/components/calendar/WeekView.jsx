import { WEEKDAYS, addDays, isSameDay, toKey } from '../../utils/date';
import { EventChip } from './MonthView';

export default function WeekView({ selected, events, onSelect }) {
  const start = addDays(selected, -selected.getDay());
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="thin-scroll overflow-x-auto">
      <div className="grid min-w-[700px] grid-cols-7">
        {days.map((date) => {
          const active = isSameDay(date, selected);
          return (
            <div key={date.toISOString()} className="min-h-[420px] border-r border-line">
              <button type="button" onClick={() => onSelect(date)} className={`w-full py-4 text-center ${active ? 'border-t-2 border-brand-orange' : ''}`}>
                <span className="block text-base font-bold text-ink">{WEEKDAYS[date.getDay()]}</span>
                <span className={`text-2xl font-semibold ${active ? 'text-brand-orange' : 'text-body'}`}>{String(date.getDate()).padStart(2, '0')}</span>
              </button>
              <div className="space-y-1 px-2">
                {events.filter((e) => e.date === toKey(date)).map((ev) => (
                  <EventChip key={ev.id} event={ev} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
