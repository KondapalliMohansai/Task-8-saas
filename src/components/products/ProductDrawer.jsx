import { useState } from 'react';
import { Save } from 'lucide-react';
import Drawer, { PhotoPicker } from '../common/Drawer';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import { TextField, SelectField } from '../common/TextField';
import { brands } from '../../data/products';

export default function ProductDrawer({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', brand: brands[0], price: '', negotiable: false, description: '', photo: '' });
  const [errors, setErrors] = useState({});
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Product name is required';
    if (!(Number(form.price) > 0)) next.price = 'Enter a price';
    setErrors(next);
    if (Object.keys(next).length === 0) onSave(form);
  };

  return (
    <Drawer title="Add a New Product" onClose={onClose} back>
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
        <PhotoPicker preview={form.photo} onPick={(photo) => setForm({ ...form, photo })} size={116} />
        <div className="space-y-4">
          <TextField label="Product Name" placeholder='Mackbook Pro 2021 14"' value={form.name} onChange={set('name')} error={errors.name} />
          <SelectField label="Brand" value={form.brand} onChange={set('brand')}>
            {brands.map((b) => <option key={b}>{b}</option>)}
          </SelectField>
          <div className="flex items-start gap-4">
            <TextField label="Price" type="number" min="0" placeholder="$1200" value={form.price} onChange={set('price')} error={errors.price} className="flex-1" />
            <label className="mt-11 flex items-center gap-3 text-sm font-semibold text-ink">
              <Checkbox checked={form.negotiable} onChange={(e) => setForm({ ...form, negotiable: e.target.checked })} label="Negotiable" />
              Negotiable
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-base font-semibold text-ink">Descriptions</span>
            <textarea
              rows={5}
              value={form.description}
              onChange={set('description')}
              placeholder="Tell buyers about this product"
              className="w-full resize-none rounded-xl bg-field p-4 text-sm text-ink outline-none placeholder:text-[#8F8EA3] focus:ring-2 focus:ring-primary/30"
            />
          </label>
        </div>
        <Button type="submit" className="mt-8 h-14 w-full text-base lg:mt-auto"><Save size={18} /> Save Product</Button>
      </form>
    </Drawer>
  );
}
