import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Download, MapPin, Plus, Printer, Trash2 } from 'lucide-react';
import { TextField } from '../components/common/TextField';
import Button from '../components/common/Button';
import { PhotoPicker } from '../components/common/Drawer';
import InvoicePreview from '../components/invoices/InvoicePreview';
import useLocalStorage from '../hooks/useLocalStorage';
import { defaultInvoiceItems, initialInvoices } from '../data/invoices';
import { formatInvoiceDate } from '../utils/date';

const inline = 'w-full bg-transparent outline-none focus:rounded focus:bg-field';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [invoices, setInvoices] = useLocalStorage('invoices', initialInvoices);
  const editing = invoices.find((i) => i.id === params.get('edit'));

  const [logo, setLogo] = useState('');
  const [invoiceId, setInvoiceId] = useState(editing?.id || '#876370');
  const [date, setDate] = useState('2021-12-01');
  const [name, setName] = useState(editing?.name || 'Alison G.');
  const [email, setEmail] = useState(editing?.email || 'Example@gmail.com');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState(defaultInvoiceItems);
  const [notice, setNotice] = useState('');
  const [errors, setErrors] = useState({});

  const subtotal = items.reduce((sum, it) => sum + it.rate * it.qty, 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  const updateItem = (id, field, value) =>
    setItems((list) => list.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  const addItem = () => setItems((list) => [...list, { id: Date.now(), name: '', rate: 0, qty: 1 }]);
  const removeItem = (id) => setItems((list) => list.filter((it) => it.id !== id));

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Enter the customer name';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const saveInvoice = () => {
    if (!validate()) return;
    const record = { id: invoiceId, name, email, date: formatInvoiceDate(date), status: editing?.status || 'Pending', starred: editing?.starred || false, avatar: editing?.avatar || null };
    setInvoices((list) => (editing ? list.map((i) => (i.id === editing.id ? record : i)) : [record, ...list]));
    navigate('/invoices');
  };

  const sendInvoice = () => {
    if (!validate()) return;
    setNotice(`Invoice ${invoiceId} sent to ${email}`);
    setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="no-print rounded-2xl bg-white p-5 shadow-card sm:p-8">
        <h1 className="mb-6 text-2xl font-bold text-ink">{editing ? 'Edit Invoice' : 'Create New Invoice'}</h1>
        <PhotoPicker preview={logo} onPick={setLogo} size={128} />

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Invoice Id" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} />
          <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <TextField className="mt-4" label="Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <TextField label="Address" placeholder="Street" value={address} onChange={(e) => setAddress(e.target.value)} icon={<MapPin size={18} />} />
        </div>

        <div className="mb-3 mt-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Product Description</h2>
          <button type="button" aria-label="Add product" onClick={addItem} className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white hover:bg-[#4f4ae6]">
            <Plus size={18} />
          </button>
        </div>

        <div className="thin-scroll overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="text-ink">
                <th className="py-2 pr-2 font-semibold">Product Name</th>
                <th className="w-24 py-2 font-semibold">Rate</th>
                <th className="w-24 py-2 font-semibold">QTY</th>
                <th className="w-28 py-2 text-right font-semibold">Amount</th>
                <th className="w-14" />
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-line">
                  <td className="py-3 pr-2">
                    <input aria-label="Product name" className={`${inline} font-semibold text-[#1A6DFF]`} value={it.name} placeholder="Product name" onChange={(e) => updateItem(it.id, 'name', e.target.value)} />
                  </td>
                  <td className="py-3">
                    <span className="flex items-center font-semibold text-ink">
                      $<input aria-label="Rate" type="number" min="0" className={`${inline} w-16`} value={it.rate} onChange={(e) => updateItem(it.id, 'rate', Number(e.target.value))} />
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 font-semibold text-ink">
                      <input aria-label="Quantity" type="number" min="1" className={`${inline} w-10`} value={it.qty} onChange={(e) => updateItem(it.id, 'qty', Number(e.target.value))} /> Pcs
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold text-brand-green">${(it.rate * it.qty).toLocaleString('en-US')}</td>
                  <td className="py-3 pl-3 text-right">
                    <button type="button" aria-label="Remove product" onClick={() => removeItem(it.id)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FDECEE] text-brand-red hover:bg-[#fbdde1]">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Button variant="outline" className="h-12 text-base" onClick={sendInvoice}>Send Invoice</Button>
          <Button className="h-12 text-base" onClick={saveInvoice}>{editing ? 'Save Invoice' : 'Create Invoice'}</Button>
        </div>
        {notice && <p role="status" className="mt-4 rounded-lg bg-[#E8F5EB] px-4 py-2 text-sm font-semibold text-brand-green">{notice}</p>}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-card sm:p-8">
        <div className="mb-5 flex items-center justify-between no-print">
          <h2 className="text-2xl font-bold text-ink">Preview</h2>
          <div className="flex gap-4 text-primary">
            <button type="button" aria-label="Download as PDF" title="Opens the print dialog - choose Save as PDF" onClick={() => window.print()}><Download size={22} /></button>
            <button type="button" aria-label="Print invoice" onClick={() => window.print()}><Printer size={22} /></button>
          </div>
        </div>
        <InvoicePreview
          invoiceNo={invoiceId.replace('#', '')}
          date={formatInvoiceDate(date)}
          name={name}
          email={email}
          address={address}
          items={items}
          subtotal={subtotal}
          discount={discount}
          total={total}
        />
      </section>
    </div>
  );
}
