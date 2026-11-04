import Card from '../common/Card';
import StarRating from '../common/StarRating';
import { productImg } from '../../data/images';
import { topProducts } from '../../data/dashboard';

export default function TopSellingProducts() {
  return (
    <Card title="Top selling Products">
      <ul className="divide-y divide-line">
        {topProducts.map((p) => (
          <li key={p.id} className="flex items-center gap-5 py-4 first:pt-0 last:pb-0">
            <span className="flex h-[86px] w-[86px] shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ backgroundColor: p.bg }}>
              <img src={productImg[p.image]} alt={p.name} className="h-full w-full object-cover" />
            </span>
            <div className="space-y-1.5">
              <p className="font-semibold text-ink">{p.name}</p>
              <StarRating value={p.rating} />
              <p className="text-lg font-bold text-ink">{p.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
