import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { TextField, SelectField } from '../common/TextField';

export default function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(task || { name: '', start: '2021-12-03', end: '2021-12-05', status: 'To Do' });
  const [error, setError] = useState('');
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = () => {
    if (!form.name.trim()) return setError('Give the task a name');
    onSave(form);
  };

  return (
    <Modal title={task ? 'Edit Task' : 'Add Task'} onClose={onClose}>
      <div className="space-y-4">
        <TextField label="Task Name" value={form.name} onChange={set('name')} error={error} autoFocus />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Start Date" type="date" value={form.start} onChange={set('start')} />
          <TextField label="End Date" type="date" value={form.end} onChange={set('end')} />
        </div>
        <SelectField label="Status" value={form.status} onChange={set('status')}>
          <option>To Do</option>
          <option>Doing</option>
          <option>Done</option>
        </SelectField>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" className="px-8" onClick={onClose}>Close</Button>
        <Button className="px-8" onClick={submit}>Save</Button>
      </div>
    </Modal>
  );
}
