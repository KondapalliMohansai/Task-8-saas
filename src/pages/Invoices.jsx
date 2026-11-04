import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ChevronDown, Mail, Plus, Star, Trash2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Checkbox from '../components/common/Checkbox';
import Avatar from '../components/common/Avatar';
import RowMenu from '../components/common/RowMenu';
import { SearchField } from '../components/common/TextField';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialInvoices, invoiceStatusTone } from '../data/invoices';

const cols = 'grid grid-cols-[28px_100px_minmax(150px,1.3fr)_minmax(200px,1.6fr)_150px_140px_32px_36px] items-center gap-4';
const headers = [
  ['Invoice Id', 'id'],
  ['Name', 'name'],
  ['Email', 'email'],
  ['Date', 'date'],
  ['Status', 'status'],
];

const asTime = (d) => new Date(d.replace(',', '')).getTime();

export default function Invoices() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useLocalStorage('invoices', initialInvoices);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [sort, setSort] = useState({ key: null, asc: true });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = invoices.filter((i) => [i.id, i.name, i.email, i.status].some((v) => v.toLowerCase().includes(q)));
    if (!sort.key) return list;
    return [...list].sort((a, b) => {
      const [x, y] = sort.key === 'date' ? [asTime(a.date), asTime(b.date)] : [a[sort.key].toLowerCase(), b[sort.key].toLowerCase()];
      return (x > y ? 1 : x < y ? -1 : 0) * (sort.asc ? 1 : -1);
    });
  }, [invoices, query, sort]);

  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id));
  const toggleAll = () => setSelected(allSelected ? [] : rows.map((r) => r.id));
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleStar = (id) => setInvoices((list) => list.map((i) => (i.id === id ? { ...i, starred: !i.starred } : i)));
  const remove = (ids) => {
    setInvoices((list) => list.filter((i) => !ids.includes(i.id)));
    setSelected((s) => s.filter((id) => !ids.includes(id)));
  };
  const sortBy = (key) => setSort((s) => ({ key, asc: s.key === key ? !s.asc : true }));

  return (
    <>
      <PageHeader title="Invoice List">
        <SearchField className="w-full sm:w-[210px]" placeholder="Search" aria-label="Search invoices" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button className="h-11 rounded-xl" onClick={() => navigate('/invoices/new')}>
          <Plus size={18} /> Add New
        </Button>
      </PageHeader>

      <div className="thin-scroll overflow-x-auto pb-24">
        <div className="min-w-[1000px]">
          <div className={`${cols} px-5 py-3 text-sm font-semibold text-body`}>
            <Checkbox checked={allSelected} onChange={toggleAll} label="Select all invoices" />
            {headers.map(([label, key]) => (
              <button key={key} type="button" onClick={() => sortBy(key)} className="flex items-center gap-1.5 text-left">
                {label}
                <ChevronDown size={12} fill="currentColor" className={`text-muted transition-transform ${sort.key === key && !sort.asc ? 'rotate-180' : ''}`} />
              </button>
            ))}
            <span />
            <button type="button" aria-label="Delete selected" disabled={!selected.length} onClick={() => remove(selected)} className="text-[#6F6E86] hover:text-brand-red disabled:opacity-60 disabled:hover:text-[#6F6E86]">
              <Trash2 size={20} fill="currentColor" />
            </button>
          </div>

          <ul className="space-y-3">
            {rows.map((inv) => (
              <li key={inv.id + inv.email + inv.date} className={`${cols} rounded-xl bg-white px-5 py-3 shadow-card transition-shadow hover:shadow-pop`}>
                <Checkbox checked={selected.includes(inv.id)} onChange={() => toggleOne(inv.id)} label={`Select invoice ${inv.id}`} />
                <span className="font-semibold text-ink">{inv.id}</span>
                <span className="flex items-center gap-3 font-semibold text-ink">
                  <Avatar src={inv.avatar} name={inv.name} size={38} />
                  <span className="truncate">{inv.name}</span>
                </span>
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <Mail size={17} className="shrink-0 text-brand-green" />
                  <span className="truncate">{inv.email}</span>
                </span>
                <span className="flex items-center gap-2 whitespace-nowrap font-semibold text-ink">
                  <CalendarDays size={16} className="shrink-0 text-brand-blue" />
                  {inv.date}
                </span>
                <Badge tone={invoiceStatusTone[inv.status]} className="h-10 w-full">{inv.status}</Badge>
                <button type="button" aria-label={inv.starred ? 'Remove star' : 'Add star'} onClick={() => toggleStar(inv.id)}>
                  <Star size={20} strokeWidth={0} fill={inv.starred ? '#FFC327' : '#DCDCE4'} />
                </button>
                <RowMenu onEdit={() => navigate(`/invoices/new?edit=${encodeURIComponent(inv.id)}`)} onDelete={() => remove([inv.id])} />
              </li>
            ))}
          </ul>
          {rows.length === 0 && <p className="py-10 text-center text-muted">No invoices match your search.</p>}
        </div>
      </div>
    </>
  );
}
