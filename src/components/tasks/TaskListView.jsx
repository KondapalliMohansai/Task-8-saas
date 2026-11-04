import { useState } from 'react';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Checkbox from '../common/Checkbox';
import { taskImg } from '../../data/images';
import { taskStatusLabel, taskStatusTone } from '../../data/tasks';

const groups = ['To Do', 'Doing', 'Done'];
const iconBg = { figma: '#F3EEFF', illustrator: '#FFF0E3', photoshop: '#E6F7FC', webdesign: '#E4EDF5' };

const fmt = (d) => (d.includes('-') ? d.split('-').reverse().join('/') : d);

function Section({ title, tasks, checked, onCheck, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? tasks : tasks.slice(0, 2);

  return (
    <Card
      title={title}
      action={
        tasks.length > 2 && (
          <button type="button" onClick={() => setExpanded((v) => !v)} className="text-sm font-semibold text-primary hover:underline">
            {expanded ? 'See Less' : 'See More'}
          </button>
        )
      }
    >
      <div className="thin-scroll overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-body">
              <th className="py-4 pr-4 font-semibold">Check Box</th>
              {['Task Name', 'Start Date', 'End Date', 'Member', 'Status'].map((h) => (
                <th key={h} className="px-3 py-4 font-semibold">
                  <span className="inline-flex items-center gap-1.5">{h}<ChevronDown size={11} fill="currentColor" className="text-muted" /></span>
                </th>
              ))}
              <th className="px-3 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0">
                <td className="py-3 pr-4"><Checkbox checked={checked.includes(t.id)} onChange={() => onCheck(t.id)} label={`Mark ${t.name}`} /></td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-3 font-semibold text-primary">
                    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: iconBg[t.icon] }}>
                      {taskImg[t.icon] && <img src={taskImg[t.icon]} alt="" className="h-full w-full object-cover" />}
                    </span>
                    {t.name}
                  </span>
                </td>
                <td className="px-3 py-3 text-body">{fmt(t.start)}</td>
                <td className="px-3 py-3 text-[#E5484D]">{fmt(t.end)}</td>
                <td className="px-3 py-3 text-body">{t.members} Member</td>
                <td className="px-3 py-3"><Badge tone={taskStatusTone[t.status]} className="rounded-md px-3 py-1 text-xs">{taskStatusLabel[t.status]}</Badge></td>
                <td className="px-3 py-3">
                  <span className="flex justify-center gap-2">
                    <button type="button" aria-label="Edit task" onClick={() => onEdit(t)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEEDFF] text-primary hover:bg-primary/20"><Pencil size={13} /></button>
                    <button type="button" aria-label="Delete task" onClick={() => onDelete(t.id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDECEE] text-brand-red hover:bg-[#fbdde1]"><Trash2 size={13} fill="currentColor" /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && <p className="py-6 text-center text-muted">No tasks here.</p>}
      </div>
    </Card>
  );
}

export default function TaskListView({ tasks, ...handlers }) {
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <Section key={g} title={g} tasks={tasks.filter((t) => t.status === g)} {...handlers} />
      ))}
    </div>
  );
}
