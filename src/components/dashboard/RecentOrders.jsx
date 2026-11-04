import { ChevronDown } from 'lucide-react';
import Card from '../common/Card';
import { productImg } from '../../data/images';
import { recentOrders } from '../../data/dashboard';

function Th({ children, sortable, className = '' }) {
  return (
    <th className={`px-3 py-3 text-left text-sm font-semibold text-body ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        {children}
        {sortable && <ChevronDown size={12} className="text-muted" fill="currentColor" />}
      </span>
    </th>
  );
}

export default function RecentOrders() {
  return (
    <Card title="Recent Orders">
      <div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line">
              <Th sortable>Tracking no</Th>
              <Th sortable>Product Name</Th>
              <Th sortable className="hidden sm:table-cell">Price</Th>
              <Th sortable className="hidden sm:table-cell">Total Order</Th>
              <Th className="text-right">Total Amount</Th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o, i) => (
              <tr key={o.tracking} className={i % 2 === 1 ? 'bg-[#FAFAFB]' : ''}>
                <td className="px-3 py-3 font-semibold text-ink">{o.tracking}</td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-3 font-semibold text-ink">
                    <img src={productImg[o.image]} alt="" className="h-8 w-8 rounded-lg object-cover" />
                    {o.product}
                  </span>
                </td>
                <td className="hidden px-3 py-3 font-semibold text-ink sm:table-cell">{o.price}</td>
                <td className="hidden px-3 py-3 sm:table-cell">
                  <span className="inline-block min-w-[54px] rounded-lg bg-[#E3F6FB] px-3 py-1.5 text-center font-bold text-brand-cyan">{o.orders}</span>
                </td>
                <td className="px-3 py-3 text-right font-semibold text-ink">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
