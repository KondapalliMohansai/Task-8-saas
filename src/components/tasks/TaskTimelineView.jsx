import { useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import Badge from '../common/Badge';
import Checkbox from '../common/Checkbox';
import { AvatarStack } from '../common/Avatar';
import { tagTone, timelineDays, timelineTasks } from '../../data/tasks';
import { hourLabel } from '../../utils/date';

const COL = 54;
const ROW = 70;
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const groups = ['To Do', 'Doing', 'Done'];

export default function TaskTimelineView() {
  const [group, setGroup] = useState(null);
  const [day, setDay] = useState('02');
  const [done, setDone] = useState(() => timelineTasks.filter((t) => t.checked).map((t) => t.id));

  const visible = timelineTasks.filter((t) => !group || t.group === group);
  const toggle = (id) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  return (
    <div className="grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
      <aside className="space-y-3 rounded-2xl bg-white p-5 shadow-card lg:min-h-[670px]">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={group === g}
            onClick={() => setGroup(group === g ? null : g)}
            className={`flex h-11 w-full items-center justify-between rounded-lg border px-5 text-sm font-semibold ${
              group === g ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:bg-primary/5'
            }`}
          >
            {g}
            <Play size={10} fill="currentColor" className={group === g ? 'text-white/70' : 'text-[#B9B8C8]'} />
          </button>
        ))}
      </aside>

      <div className="rounded-2xl bg-white shadow-card">
        <div className="thin-scroll overflow-x-auto">
          <div style={{ width: 76 + timelineDays.length * COL }}>
            <div className="flex" style={{ paddingLeft: 76 }}>
              {timelineDays.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  style={{ width: COL }}
                  className={`h-12 shrink-0 text-sm font-semibold ${day === d ? 'bg-primary text-white' : 'text-body hover:bg-primary/5'}`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="relative" style={{ height: hours.length * ROW + 20 }}>
              {hours.map((h, i) => (
                <div key={h} className="absolute inset-x-0 flex border-t border-line" style={{ top: 20 + i * ROW, height: ROW }}>
                  <span className="w-[76px] shrink-0 -translate-y-2 pl-3 text-[10px] font-semibold text-body">{hourLabel(h).replace(' ', ' ')}</span>
                </div>
              ))}
              {visible.map((t) => (
                <div
                  key={t.id}
                  className="absolute flex h-[62px] items-center gap-3 rounded-lg border border-line bg-white px-5 shadow-card"
                  style={{ top: 20 + (t.hour - 9) * ROW - 4, left: 76 + t.offset * COL, width: t.span * COL }}
                >
                  <Checkbox round checked={done.includes(t.id)} onChange={() => toggle(t.id)} label={`Mark ${t.title}`} />
                  <span className="min-w-[120px] truncate font-semibold text-ink">{t.title}</span>
                  <span className="ml-auto"><AvatarStack names={['james1', 'robert', 'bethany1', 'jhon']} size={26} /></span>
                  {t.tags.map((tag) => <Badge key={tag} tone={tagTone[tag]} className="px-3 py-1 text-xs">{tag}</Badge>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
