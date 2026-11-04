import { hourLabel, toKey } from '../../utils/date';
import { eventColors } from '../../data/calendar';

const START = 9;
const hours = Array.from({ length: 17 }, (_, i) => START + i); // 09.00 AM ... 01.00 AM
const ROW = 40;

export default function DayView({ selected, events }) {
  const todays = events.filter((e) => e.date === toKey(selected) && e.hour !== undefined);

  return (
    <div className="thin-scroll overflow-x-auto">
      <div className="relative min-w-[560px] px-4 pb-4">
        {hours.map((h) => (
          <div key={h} className="flex items-start border-t border-line" style={{ height: ROW }}>
            <span className="w-20 -translate-y-2 bg-white pr-2 text-[11px] font-semibold text-body">{hourLabel(h)}</span>
          </div>
        ))}
        <div className="absolute inset-y-0 left-24 right-4">
          {todays.map((ev) => {
            const row = ev.hour < START ? ev.hour + 24 - START : ev.hour - START;
            if (row >= hours.length) return null; // outside the 9am - 1am range shown in the design
            const left = ev.left ?? 3 + ((ev.hour * 17) % 62);
            return (
              <div
                key={ev.id}
                className="absolute flex h-[34px] w-[158px] items-center justify-center truncate rounded-lg px-2 text-sm font-semibold text-white"
                style={{ top: row * ROW + 4, left: `${left}%`, backgroundColor: eventColors[ev.color] }}
              >
                {ev.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
