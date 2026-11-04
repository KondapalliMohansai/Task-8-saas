import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import SocialButtons, { OrDivider } from '../components/common/SocialButtons';
import { TextField } from '../components/common/TextField';
import PasswordField from '../components/common/PasswordField';
import Checkbox from '../components/common/Checkbox';
import Button from '../components/common/Button';
import { illustrations } from '../data/images';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    if (Object.keys(next).length === 0) navigate('/');
  };

  return (
    <AuthLayout title="Log in" image={illustrations.login} imageAlt="Person working at a desk">
      <SocialButtons />
      <OrDivider />
      <form onSubmit={submit} noValidate className="space-y-5">
        <TextField label="Email Address" type="email" autoComplete="email" placeholder="example@gmail.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
        <PasswordField autoComplete="current-password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
        <div className="flex items-center justify-between text-base">
          <label className="flex items-center gap-3 text-ink">
            <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} label="Remember me" /> Remember me
          </label>
          <Link to="/recover" className="text-primary hover:underline">Reset Password?</Link>
        </div>
        <Button type="submit" className="h-14 w-full text-lg">Log in</Button>
      </form>
      <p className="mt-6 text-center text-base text-ink">
        Don’t have account yet? <Link to="/signup" className="text-primary hover:underline">New Account</Link>
      </p>
    </AuthLayout>
  );
}
