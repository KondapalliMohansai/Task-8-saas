import { Link } from 'react-router-dom';
import { CenterCard } from '../components/layout/AuthLayout';
import { illustrations } from '../data/images';

export default function Confirm() {
  return (
    <CenterCard>
      <div className="flex flex-col items-center text-center">
        <img src={illustrations.confirm} alt="Thumbs up" className="mb-10 w-[260px] max-w-full" />
        <h1 className="text-xl font-semibold text-ink sm:text-2xl">Your account successfully created.</h1>
        <Link to="/" className="mt-8 inline-flex h-14 items-center justify-center rounded-xl bg-primary px-10 text-lg font-semibold text-white hover:bg-[#4f4ae6]">
          Go to Home
        </Link>
      </div>
    </CenterCard>
  );
}
