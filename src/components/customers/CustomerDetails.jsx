import { useState } from 'react';
import { Mail, MapPin, MoreVertical, Phone } from 'lucide-react';
import Avatar from '../common/Avatar';
import DonutChart from '../charts/DonutChart';
import { performanceBars } from '../../data/customers';

function Ring({ value, color }) {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-white p-5 shadow-card">
      <DonutChart size={110} stroke={13} track="#F4F4F8" segments={[{ label: 'value', color, from: 0, to: value * 3.6 }]}>
        <span className="text-sm font-bold text-ink">{value}%</span>
      </DonutChart>
    </div>
  );
}

export default function CustomerDetails({ customer }) {
  const [hovered, setHovered] = useState(1);
  const contact = [
    [Mail, customer.email],
    [Phone, customer.phone.replace('+', '')],
    [MapPin, customer.address],
  ];

  return (
    <aside className="space-y-5 rounded-2xl bg-white p-5 shadow-card xl:min-h-[calc(100vh-3rem)] xl:rounded-none xl:shadow-none">
      <div className="border-b border-line pb-5 text-center">
        <Avatar src={customer.avatar === 'c_john' ? 'john_big' : customer.avatar} name={customer.name} size={86} className="mx-auto" />
        <h2 className="mt-3 text-xl font-bold text-ink">{customer.name}</h2>
        <p className="text-sm text-body">{customer.role}</p>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold text-ink">Contact Info</h3>
        <ul className="space-y-3">
          {contact.map(([Icon, text]) => (
            <li key={text} className="flex gap-3 border-b border-line pb-3 text-sm text-body last:border-0">
              <Icon size={18} fill="#B4B3C2" className="mt-0.5 shrink-0 text-[#B4B3C2]" />
              <span className="break-all">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Performance</h3>
          <MoreVertical size={16} className="text-muted" />
        </div>
        <div className="flex h-[170px] items-end justify-between gap-2 px-1">
          {performanceBars.map((bar, i) => (
            <button key={bar.month} type="button" onMouseEnter={() => setHovered(i)} onFocus={() => setHovered(i)} className="flex h-full flex-1 flex-col items-center justify-end gap-2" aria-label={`${bar.month}: ${(bar.value * 0.0376).toFixed(2)}k`}>
              {hovered === i && <span className="rounded-md bg-brand-orange px-1.5 py-0.5 text-[10px] font-semibold text-white">{(bar.value * 0.0376).toFixed(2)}k</span>}
              <span className="w-3.5 rounded-full" style={{ height: `${bar.value * 0.72}%`, backgroundColor: hovered === i ? '#FF8F6B' : '#FFE5DC' }} />
              <span className="text-[11px] text-body">{bar.month}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Ring value={70} color="#FFD66B" />
        <Ring value={60} color="#5B93FF" />
      </div>
    </aside>
  );
}
