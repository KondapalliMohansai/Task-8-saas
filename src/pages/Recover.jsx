import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CenterCard } from '../components/layout/AuthLayout';
import Logo from '../components/common/Logo';
import { TextField } from '../components/common/TextField';
import Button from '../components/common/Button';

export default function Recover() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address');
    setError('');
    setSent(true);
  };

  return (
    <CenterCard>
      <div className="mb-10 flex flex-col items-center gap-8">
        <Logo size={64} />
        <h1 className="text-2xl font-semibold text-ink">Recover</h1>
      </div>
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField label="Email Address" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
        <Button type="submit" className="h-14 w-full text-lg">Reset Your Password</Button>
      </form>
      {sent && <p role="status" className="mt-4 rounded-lg bg-[#E8F5EB] px-4 py-2 text-sm font-semibold text-brand-green">We sent a reset link to {email}.</p>}
      <p className="mt-6 text-center text-sm"><Link to="/login" className="text-primary hover:underline">Back to log in</Link></p>
    </CenterCard>
  );
}
