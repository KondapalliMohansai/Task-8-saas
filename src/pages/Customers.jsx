import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import RowMenu from '../components/common/RowMenu';
import CustomerDetails from '../components/customers/CustomerDetails';
import CustomerDrawer from '../components/customers/CustomerDrawer';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialCustomers } from '../data/customers';

const cols = 'grid grid-cols-[minmax(150px,1.2fr)_minmax(190px,1.6fr)_minmax(120px,1fr)_90px_36px] items-center gap-4';

export default function Customers() {
  const [customers, setCustomers] = useLocalStorage('customers', initialCustomers);
  const [activeId, setActiveId] = useState(initialCustomers[0].id);
  const [drawer, setDrawer] = useState(null); // { customer } when open, customer undefined = add

  const active = customers.find((c) => c.id === activeId) || customers[0];

  const save = (data) => {
    const editing = drawer.customer;
    if (editing) {
      setCustomers((list) => list.map((c) => (c.id === editing.id ? { ...c, ...data, avatar: data.photo || c.avatar } : c)));
    } else {
      const id = Date.now();
      setCustomers((list) => [{ id, ...data, avatar: data.photo, role: 'Customer', address: 'No address added' }, ...list]);
      setActiveId(id);
    }
    setDrawer(null);
  };

  const remove = (id) => setCustomers((list) => list.filter((c) => c.id !== id));

  return (
    <div className="xl:-mr-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <div>
          <PageHeader title="Customer List">
            <Button className="h-11" onClick={() => setDrawer({})}>
              <Plus size={18} /> Add Customer
            </Button>
          </PageHeader>

          <div className="thin-scroll overflow-x-auto pb-24">
            <div className="min-w-[680px]">
              <div className={`${cols} px-5 py-3 text-sm font-semibold text-body`}>
                {['Name', 'Email', 'Phone number', 'Gender'].map((h) => (
                  <span key={h} className="flex items-center gap-1.5">{h}<ChevronDown size={12} fill="currentColor" className="text-muted" /></span>
                ))}
                <span />
              </div>
              <ul className="space-y-3">
                {customers.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={`${cols} cursor-pointer rounded-xl bg-white px-5 py-3 shadow-card transition-shadow hover:shadow-pop ${c.id === active.id ? 'ring-1 ring-primary/30' : ''}`}
                  >
                    <span className="flex items-center gap-3 font-semibold text-ink">
                      <Avatar src={c.avatar} name={c.name} size={32} />
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span className="truncate font-semibold text-ink">{c.email}</span>
                    <span className="font-semibold text-ink">{c.phone}</span>
                    <Badge tone={c.gender === 'Female' ? 'female' : 'male'} className="w-fit px-4 py-1">{c.gender}</Badge>
                    <span onClick={(e) => e.stopPropagation()}>
                      <RowMenu onEdit={() => setDrawer({ customer: c })} onDelete={() => remove(c.id)} />
                    </span>
                  </li>
                ))}
              </ul>
              {customers.length === 0 && <p className="py-10 text-center text-muted">No customers yet. Use Add Customer to create one.</p>}
            </div>
          </div>
        </div>

        {active && <CustomerDetails customer={active} />}
      </div>

      {drawer && <CustomerDrawer customer={drawer.customer} onClose={() => setDrawer(null)} onSave={save} />}
    </div>
  );
}
