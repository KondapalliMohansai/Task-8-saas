import { MONTHS, getMonthGrid, isSameDay } from '../../utils/date';

const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function YearView({ selected, onPick }) {
  const year = selected.getFullYear();

  return (
    <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
      {MONTHS.map((name, month) => (
        <div key={name} className="bg-white p-5">
          <h3 className="mb-3 text-sm font-bold text-ink">{name} {year}</h3>
          <div className="grid grid-cols-7 text-center text-xs">
            {letters.map((l, i) => (
              <span key={i} className="pb-2 font-semibold text-ink">{l}</span>
            ))}
            {getMonthGrid(year, month).flat().map(({ date, inMonth }) => {
              const active = isSameDay(date, selected);
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => onPick(date)}
                  className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full ${
                    active ? 'bg-primary font-bold text-white' : inMonth ? 'text-body hover:bg-primary/10' : 'text-[#C3C2D0] hover:bg-primary/10'
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
