import { Star } from 'lucide-react';

export default function StarRating({ value = 0 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={16} strokeWidth={0} fill={n <= value ? '#FFD66B' : '#FBEBB8'} />
      ))}
    </div>
  );
}
