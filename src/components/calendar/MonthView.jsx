import { WEEKDAYS, getMonthGrid, isSameDay, toKey } from '../../utils/date';
import { eventColors } from '../../data/calendar';

export function EventChip({ event }) {
  return (
    <span
      className="block truncate rounded px-1.5 py-[3px] text-center text-[10px] font-semibold leading-tight text-white"
      style={{ backgroundColor: eventColors[event.color] }}
      title={event.title}
    >
      {event.title}
    </span>
  );
}

export default function MonthView({ selected, events, onSelect, onMore }) {
  const weeks = getMonthGrid(selected.getFullYear(), selected.getMonth());

  return (
    <div className="thin-scroll overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-7 bg-[#FAFAFB] py-5 text-center text-base font-bold text-ink">
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-cols-7">
            {week.map(({ date, inMonth }) => {
              const dayEvents = events.filter((e) => e.date === toKey(date));
              const active = isSameDay(date, selected);
              return (
                <div
                  key={date.toISOString()}
                  onClick={() => onSelect(date)}
                  className={`min-h-[118px] cursor-pointer border-b border-r border-line px-2 py-3 text-center transition-colors hover:bg-primary/[0.03] ${
                    active ? 'border-t-2 border-t-brand-orange' : ''
                  }`}
                >
                  <p className={`mb-1.5 text-2xl font-semibold ${active ? 'text-brand-orange' : inMonth ? 'text-body' : 'text-[#C3C2D0]'} ${dayEvents.length ? '!text-lg' : ''}`}>
                    {String(date.getDate()).padStart(2, '0')}
                  </p>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <EventChip key={ev.id} event={ev} />
                    ))}
                    {dayEvents.length > 2 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMore(date);
                        }}
                        className="block w-full rounded border border-line py-[3px] text-[10px] font-semibold text-primary hover:bg-primary/5"
                      >
                        More
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
