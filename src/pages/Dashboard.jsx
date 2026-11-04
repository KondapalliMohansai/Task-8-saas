import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DateFilter from '../components/common/DateFilter';
import Card from '../components/common/Card';
import MetricCard from '../components/dashboard/MetricCard';
import RecentOrders from '../components/dashboard/RecentOrders';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import ReportsChart from '../components/charts/ReportsChart';
import DonutChart, { Legend } from '../components/charts/DonutChart';
import { icons } from '../data/images';
import { analyticsSegments } from '../data/dashboard';

const stats = [
  { value: '178+', label: 'Save Products', tint: '#EEF3FF', icon: <img src={icons.heart} alt="" className="h-7 w-7" /> },
  { value: '20+', label: 'Stock Products', tint: '#FFF6DE', icon: <img src={icons.game} alt="" className="h-7 w-7" /> },
  { value: '190+', label: 'Sales Products', tint: '#FFEFEA', icon: <img src={icons.bag} alt="" className="h-7 w-7" /> },
  { value: '12+', label: 'Job Application', tint: '#EFEEFF', icon: <Briefcase size={26} fill="#605BFF" className="text-primary" /> },
];

export default function Dashboard() {
  const [from, setFrom] = useState('10-06-2021');
  const [to, setTo] = useState('10-10-2021');

  return (
    <>
      <PageHeader title="Dashboard">
        <DateFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <MetricCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_384px]">
        <Card title="Reports">
          <ReportsChart />
        </Card>
        <Card title="Analytics">
          <div className="flex flex-col items-center gap-6 py-2">
            <DonutChart segments={analyticsSegments} size={250} stroke={28}>
              <p className="text-3xl font-extrabold text-ink">80%</p>
              <p className="text-sm text-body">Transactions</p>
            </DonutChart>
            <Legend items={analyticsSegments} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_384px]">
        <RecentOrders />
        <TopSellingProducts />
      </div>
    </>
  );
}
