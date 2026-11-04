import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Package, Plus, ShoppingCart, TrendingUp } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DateFilter from '../components/common/DateFilter';
import Tabs from '../components/common/Tabs';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import MiniAreaChart from '../components/charts/MiniAreaChart';
import DonutChart, { Legend } from '../components/charts/DonutChart';
import ProductDrawer from '../components/products/ProductDrawer';
import useLocalStorage from '../hooks/useLocalStorage';
import { productImg } from '../data/images';
import { brands, productsByMonth, productWave, salesSegments, salesWave, topSelling } from '../data/products';

function StatCard({ icon, tint, title, value, note, color, data }) {
  return (
    <div className="relative flex h-[175px] flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-card">
      <div className="relative z-10 flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: tint, color }}>{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-2">
            <p className="text-sm font-semibold text-body">{title}</p>
            <p className="text-[11px] font-semibold text-brand-green">{note}</p>
          </div>
          <p className="text-3xl font-bold text-body">{value}</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[90px]">
        <MiniAreaChart data={data} color={color} />
      </div>
    </div>
  );
}

export default function ProductAnalytics() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('10-06-2021');
  const [to, setTo] = useState('10-10-2021');
  const [extra, setExtra] = useLocalStorage('added-products', []);
  const [adding, setAdding] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const all = [...topSelling, ...extra];
  const rows = showAll ? all : all.slice(0, 6);
  const maxMonth = Math.max(...productsByMonth.map((m) => m.value));

  const addProduct = (p) => {
    setExtra((list) => [
      ...list,
      { sn: topSelling.length + list.length + 1, name: p.name, image: null, photo: p.photo, price: `$${p.price}`, orders: '0 Piece', sales: '$0' },
    ]);
    setAdding(false);
    setShowAll(true);
  };

  return (
    <>
      <PageHeader title="Product Analytics">
        <DateFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
      </PageHeader>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={['Product', 'Customer']} value="Product" onChange={(t) => t === 'Customer' && navigate('/customers')} />
        <Button onClick={() => setAdding(true)}><Plus size={18} /> Add Product</Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <StatCard title="Total Product" value="5,00,874" note="+1400 New Added" color="#5B93FF" tint="#EEF3FF" data={productWave} icon={<Package size={26} />} />
            <StatCard title="Total Sales" value="2,34,888" note="+1000 Sales Today" color="#FFC93D" tint="#FFF6DE" data={salesWave} icon={<ShoppingCart size={24} fill="currentColor" />} />
          </div>

          <Card
            title="Top Selling Products"
            action={<button type="button" onClick={() => setShowAll((v) => !v)} className="text-sm font-semibold text-primary hover:underline">{showAll ? 'See Less' : 'See More'}</button>}
          >
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-body">
                    {['SN', 'Name', 'Price', 'Total Order', 'Total Sales'].map((h, i) => (
                      <th key={h} className={`px-3 py-3 font-semibold ${i === 4 ? 'text-right' : ''} ${i === 2 || i === 3 ? 'hidden sm:table-cell' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p, i) => (
                    <tr key={p.name + p.sn} className={i % 2 === 0 ? 'bg-[#FAFAFB]' : ''}>
                      <td className="px-3 py-3 font-semibold text-ink">
                        {p.sn <= 3 ? <Award size={18} className="text-brand-orange" fill="#FF8F6B" /> : p.sn}
                      </td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-3 font-semibold text-[#1A6DFF]">
                          {p.photo || productImg[p.image] ? (
                            <img src={p.photo || productImg[p.image]} alt="" className="h-9 w-9 rounded-full object-cover" />
                          ) : (
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEEDFF] text-primary"><Package size={16} /></span>
                          )}
                          {p.name}
                        </span>
                      </td>
                      <td className="hidden px-3 py-3 font-semibold text-ink sm:table-cell">{p.price}</td>
                      <td className="hidden px-3 py-3 font-semibold text-ink sm:table-cell">{p.orders}</td>
                      <td className="px-3 py-3 text-right font-semibold text-brand-green">{p.sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Product Add by Month" action={null}>
            <ul className="space-y-4 py-2">
              {productsByMonth.map((m) => (
                <li key={m.month} className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-3 text-sm text-body">
                  <span>{m.month}</span>
                  <span className="flex items-center gap-3">
                    <span className="h-3.5 rounded-full" style={{ width: `${(m.value / maxMonth) * 78}%`, backgroundColor: m.color }} />
                    <span className="text-xs font-semibold text-body">{m.value.toLocaleString('en-US')}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Product Sales Analytics">
            <div className="flex flex-col items-center gap-5 py-2">
              <DonutChart size={210} stroke={24} segments={salesSegments} track="#F3F6FD">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF3FF] text-brand-blue"><TrendingUp size={24} /></span>
              </DonutChart>
              <Legend items={salesSegments} />
            </div>
          </Card>
        </div>
      </div>

      {adding && <ProductDrawer onClose={() => setAdding(false)} onSave={addProduct} />}
    </>
  );
}
