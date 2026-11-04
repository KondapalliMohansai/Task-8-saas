import { useState } from 'react';
import { CalendarDays, ChevronDown, Clock, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Modal from '../components/common/Modal';
import { TextField, SelectField } from '../components/common/TextField';
import SchedulePanel from '../components/calendar/SchedulePanel';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialSchedules, locationOptions } from '../data/schedule';
import { formatInvoiceDate, formatTime, toKey } from '../utils/date';

const cols = 'grid grid-cols-[28px_minmax(150px,1fr)_minmax(110px,1fr)_minmax(170px,1.1fr)_44px_44px] items-center gap-4';

export default function Schedule() {
  const [items, setItems] = useLocalStorage('schedules', initialSchedules);
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 11, 2));
  const [filtering, setFiltering] = useState(false);
  const [checked, setChecked] = useState([]);
  const [form, setForm] = useState(null); // null = closed, otherwise the schedule being created / edited

  const rows = filtering ? items.filter((i) => i.date === toKey(selectedDate)) : items;
  const allChecked = rows.length > 0 && rows.every((r) => checked.includes(r.id));

  const openNew = () => setForm({ date: toKey(selectedDate), time: '10:15', location: locationOptions[0] });
  const save = () => {
    if (!form.date || !form.time) return;
    setItems((list) => (form.id ? list.map((i) => (i.id === form.id ? form : i)) : [{ ...form, id: Date.now() }, ...list]));
    setForm(null);
  };
  const remove = (id) => {
    setItems((list) => list.filter((i) => i.id !== id));
    setChecked((c) => c.filter((x) => x !== id));
  };

  return (
    <>
      <PageHeader title="Schedule List">
        <Button onClick={openNew}><Plus size={18} /> Add New</Button>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <SchedulePanel
          selected={selectedDate}
          onSelect={(d) => {
            setSelectedDate(d);
            setFiltering(true);
          }}
          onCreate={openNew}
          myScheduleTo="/tasks"
        />

        <div>
          <div className="thin-scroll overflow-x-auto pb-4">
            <div className="min-w-[640px]">
              <div className={`${cols} px-5 py-3 text-sm font-semibold text-body`}>
                <Checkbox checked={allChecked} onChange={() => setChecked(allChecked ? [] : rows.map((r) => r.id))} label="Select all schedules" />
                {['Date', 'Time', 'Location'].map((h) => (
                  <span key={h} className="flex items-center gap-1.5">{h}<ChevronDown size={12} fill="currentColor" className="text-muted" /></span>
                ))}
                <span /><span />
              </div>

              <ul className="space-y-3">
                {rows.map((s) => (
                  <li key={s.id} className={`${cols} rounded-xl bg-white px-5 py-3 shadow-card hover:shadow-pop`}>
                    <Checkbox checked={checked.includes(s.id)} onChange={() => setChecked((c) => (c.includes(s.id) ? c.filter((x) => x !== s.id) : [...c, s.id]))} label="Select schedule" />
                    <span className="flex items-center gap-2 font-semibold text-ink"><CalendarDays size={15} className="text-brand-blue" />{formatInvoiceDate(s.date)}</span>
                    <span className="flex items-center gap-2 font-semibold text-ink"><Clock size={15} fill="#4B4A68" className="text-white" />{formatTime(s.time)}</span>
                    <span className="flex h-11 w-full max-w-[200px] items-center gap-2 rounded-full bg-[#EEEDFF] px-4 text-sm font-semibold text-primary">
                      <MapPin size={15} fill="currentColor" />{s.location}
                    </span>
                    <button type="button" aria-label="Edit schedule" onClick={() => setForm(s)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E6] text-[#FFC327] hover:bg-[#FFF1CC]"><Pencil size={15} /></button>
                    <button type="button" aria-label="Delete schedule" onClick={() => remove(s.id)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDECEE] text-brand-red hover:bg-[#fbdde1]"><Trash2 size={15} fill="currentColor" /></button>
                  </li>
                ))}
              </ul>
              {rows.length === 0 && <p className="py-10 text-center text-muted">Nothing scheduled for this day.</p>}
            </div>
          </div>
          {filtering && (
            <button type="button" onClick={() => setFiltering(false)} className="text-sm font-semibold text-primary hover:underline">
              Show all schedules
            </button>
          )}
        </div>
      </div>

      {form && (
        <Modal title={form.id ? 'Edit Schedule' : 'Create Schedule'} onClose={() => setForm(null)}>
          <div className="space-y-4">
            <TextField label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <TextField label="Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            <SelectField label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
              {locationOptions.map((l) => <option key={l}>{l}</option>)}
            </SelectField>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <Button variant="outline" className="px-8" onClick={() => setForm(null)}>Close</Button>
            <Button className="px-8" onClick={save}>Save</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
