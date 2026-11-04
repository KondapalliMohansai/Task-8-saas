import { useState } from 'react';
import Drawer, { PhotoPicker } from '../common/Drawer';
import Button from '../common/Button';
import { TextField, SelectField } from '../common/TextField';

const empty = { first: '', last: '', email: '', phone: '', gender: 'Male', photo: '' };

// Add / edit customer panel that slides in from the right
export default function CustomerDrawer({ customer, onClose, onSave }) {
  const [form, setForm] = useState(() => {
    if (!customer) return empty;
    const [first, ...rest] = customer.name.split(' ');
    return { first, last: rest.join(' '), email: customer.email, phone: customer.phone.replace('+', ''), gender: customer.gender, photo: customer.photo || '' };
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.first.trim()) next.first = 'First name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({
      name: `${form.first.trim()} ${form.last.trim()}`.trim(),
      email: form.email.trim(),
      phone: `+${form.phone.replace(/^\+/, '').trim()}`,
      gender: form.gender,
      photo: form.photo,
    });
  };

  return (
    <Drawer title={customer ? 'Edit Customer' : 'Add Customer'} onClose={onClose}>
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
        <PhotoPicker preview={form.photo} onPick={(photo) => setForm({ ...form, photo })} />
        <div className="space-y-4">
          <TextField label="First Name" placeholder="John" value={form.first} onChange={set('first')} error={errors.first} />
          <TextField label="Last Name" placeholder="Deo" value={form.last} onChange={set('last')} />
          <TextField label="Email" type="email" placeholder="Example@gmail.com" value={form.email} onChange={set('email')} error={errors.email} />
          <TextField label="Phone Number" type="tel" placeholder="33757005467" value={form.phone} onChange={set('phone')} error={errors.phone} />
          <SelectField label="Gender" value={form.gender} onChange={set('gender')}>
            <option>Male</option>
            <option>Female</option>
          </SelectField>
        </div>
        <Button type="submit" className="mt-8 h-14 w-full text-base">{customer ? 'Save Customer' : 'Add Customer'}</Button>
      </form>
    </Drawer>
  );
}
