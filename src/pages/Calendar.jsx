import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import SchedulePanel from '../components/calendar/SchedulePanel';
import MonthView from '../components/calendar/MonthView';
import DayView from '../components/calendar/DayView';
import WeekView from '../components/calendar/WeekView';
import YearView from '../components/calendar/YearView';
import CreateEventModal from '../components/calendar/CreateEventModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialEvents } from '../data/calendar';
import { addDays, addMonths, formatLong, toKey } from '../utils/date';

const views = ['Day', 'Week', 'Month', 'Year'];

export default function CalendarPage() {
  const [view, setView] = useState('Month');
  const [selected, setSelected] = useState(new Date(2021, 11, 2));
  const [events, setEvents] = useLocalStorage('calendar-events', initialEvents);
  const [creating, setCreating] = useState(false);

  const shift = (dir) => {
    if (view === 'Day') setSelected(addDays(selected, dir));
    else if (view === 'Week') setSelected(addDays(selected, 7 * dir));
    else if (view === 'Month') setSelected(addMonths(selected, dir));
    else setSelected(addMonths(selected, 12 * dir));
  };

  const saveEvent = ({ title, color, hour }) => {
    setEvents((list) => [...list, { id: Date.now(), date: toKey(selected), title, color, hour }]);
    setCreating(false);
  };

  const heading = view === 'Year' ? String(selected.getFullYear()) : formatLong(selected);

  return (
    <>
      <PageHeader title="Calendar">
        <div className="flex gap-2 sm:gap-3">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`h-10 min-w-[64px] rounded-xl px-4 text-sm font-semibold transition-colors ${
                view === v ? 'bg-primary text-white' : 'bg-[#ECEBFA] text-body hover:bg-primary/15'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <SchedulePanel selected={selected} onSelect={setSelected} onCreate={() => setCreating(true)} myScheduleTo="/schedule" />

        <section className="self-start overflow-hidden rounded-2xl bg-white shadow-card">
          <header className="flex items-center justify-between px-5 py-4">
            <h2 className="text-sm font-bold text-ink">{heading}</h2>
            <span className="flex gap-2 text-[#B9B8C8]">
              <button type="button" aria-label="Previous" onClick={() => shift(-1)} className="hover:text-primary"><ChevronLeft size={18} /></button>
              <button type="button" aria-label="Next" onClick={() => shift(1)} className="hover:text-primary"><ChevronRight size={18} /></button>
            </span>
          </header>

          {view === 'Day' && <DayView selected={selected} events={events} />}
          {view === 'Week' && <WeekView selected={selected} events={events} onSelect={setSelected} />}
          {view === 'Month' && (
            <MonthView
              selected={selected}
              events={events}
              onSelect={setSelected}
              onMore={(date) => {
                setSelected(date);
                setView('Day');
              }}
            />
          )}
          {view === 'Year' && (
            <YearView
              selected={selected}
              onPick={(date) => {
                setSelected(date);
                setView('Month');
              }}
            />
          )}
        </section>
      </div>

      {creating && <CreateEventModal date={selected} onClose={() => setCreating(false)} onSave={saveEvent} />}
    </>
  );
}
