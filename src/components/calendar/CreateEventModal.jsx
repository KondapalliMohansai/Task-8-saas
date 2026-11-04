import { useState } from 'react';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import { WEEKDAYS, MONTHS } from '../../utils/date';
import { people } from '../../data/schedule';

const tabs = [
  { name: 'Event', color: 'orange' },
  { name: 'Reminder', color: 'pink' },
  { name: 'Task', color: 'cyan' },
];

export default function CreateEventModal({ date, onClose, onSave }) {
  const [tab, setTab] = useState(tabs[0]);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('12:00');
  const [end, setEnd] = useState('13:00');
  const [guests, setGuests] = useState([]);
  const [showPeople, setShowPeople] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const save = () => {
    if (!title.trim()) return setError('Add a title for the event');
    onSave({ title: title.trim(), color: tab.color, hour: Number(start.split(':')[0]), guests, location });
  };

  const toggleGuest = (id) => setGuests((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  const pill = 'flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold';

  return (
    <Modal title="Create an Event" onClose={onClose} maxWidth="max-w-[450px]">
      <div className="mb-5 inline-flex rounded-full bg-[#FFF6F2] p-1">
        {tabs.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${tab.name === t.name ? 'bg-brand-orange text-white' : 'text-body'}`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="sr-only">Title</span>
        <input
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="Add title"
          className="h-12 w-full rounded-xl bg-field px-4 text-ink outline-none placeholder:text-[#B5B4C4] focus:ring-2 focus:ring-primary/30"
        />
      </label>
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}

      <div className="mt-6 flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF3EE] text-brand-orange"><Clock size={18} /></span>
        <div>
          <p className="flex flex-wrap items-center gap-x-4 text-sm font-semibold text-ink">
            <span>{WEEKDAYS[date.getDay()]}. {MONTHS[date.getMonth()]} {date.getDate()}</span>
            <span className="flex items-center gap-1">
              <input aria-label="Start time" type="time" value={start} onChange={(e) => setStart(e.target.value)} className="rounded bg-transparent outline-none focus:bg-field" />
              -
              <input aria-label="End time" type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="rounded bg-transparent outline-none focus:bg-field" />
            </span>
          </p>
          <p className="mt-1 text-xs text-muted">Time zone - Does not repeat</p>
          <button type="button" className="mt-3 text-sm font-semibold text-brand-orange hover:underline">Find a time</button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => setShowPeople((v) => !v)} className={`${pill} bg-primary text-white hover:bg-[#4f4ae6]`}>
          <Users size={18} /> Add People
        </button>
        <button type="button" onClick={() => setShowLocation((v) => !v)} className={`${pill} border border-line text-primary hover:bg-primary/5`}>
          <MapPin size={16} /> Add location
        </button>
      </div>

      {showPeople && (
        <ul className="mt-3 space-y-2 rounded-xl bg-field p-3">
          {people.map((p) => (
            <li key={p.id} className="flex items-center gap-3 text-sm text-ink">
              <Checkbox checked={guests.includes(p.id)} onChange={() => toggleGuest(p.id)} label={`Invite ${p.name}`} /> {p.name}
            </li>
          ))}
        </ul>
      )}
      {showLocation && (
        <input
          aria-label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where is it happening?"
          className="mt-3 h-11 w-full rounded-xl bg-field px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      )}

      <div className="mt-6 flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF3EE] text-brand-orange"><CalendarDays size={18} /></span>
        <div>
          <p className="text-sm font-semibold text-ink">John Deo</p>
          <p className="mt-1 text-xs text-muted">Busy - Default visibility - notify 30 minutes before</p>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" className="h-11 px-8" onClick={onClose}>Close</Button>
        <Button className="h-11 px-8" onClick={save}>Save</Button>
      </div>
    </Modal>
  );
}
