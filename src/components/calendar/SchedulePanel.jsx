import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import MiniCalendar from './MiniCalendar';
import { people } from '../../data/schedule';

// Left column shared by the Schedule and Calendar screens
export default function SchedulePanel({ selected, onSelect, onCreate, myScheduleTo }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const visible = people.filter((p) => (p.name + p.email).toLowerCase().includes(search.toLowerCase()));

  return (
    <aside className="flex flex-col rounded-2xl bg-white p-4 shadow-card lg:min-h-[640px]">
      <Button className="h-12 w-full text-base" onClick={onCreate}>
        <Plus size={20} /> Create Schedule
      </Button>

      <div className="mt-4">
        <MiniCalendar selected={selected} onSelect={onSelect} />
      </div>

      <h2 className="mb-3 mt-6 text-base font-bold text-ink">People</h2>
      <label className="relative mb-2 block">
        <span className="sr-only">Search for People</span>
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6E86]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for People"
          className="h-11 w-full rounded-xl bg-field pl-10 pr-3 text-xs text-ink outline-none placeholder:text-body focus:ring-2 focus:ring-primary/30"
        />
      </label>
      <ul className="divide-y divide-line">
        {visible.map((p) => (
          <li key={p.id} className="flex items-center gap-3 py-2.5">
            <Avatar src={p.avatar} name={p.name} size={34} />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-ink">{p.name}</p>
              <p className="truncate text-[10px] text-muted">{p.email}</p>
            </div>
          </li>
        ))}
        {visible.length === 0 && <li className="py-3 text-xs text-muted">No people found</li>}
      </ul>

      <Button variant="outline" className="mt-6 h-11 w-full lg:mt-auto" onClick={() => navigate(myScheduleTo)}>
        My Schedule
      </Button>
    </aside>
  );
}
