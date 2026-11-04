import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import SocialButtons, { OrDivider } from '../components/common/SocialButtons';
import { TextField } from '../components/common/TextField';
import PasswordField from '../components/common/PasswordField';
import Checkbox from '../components/common/Checkbox';
import Button from '../components/common/Button';
import { illustrations } from '../data/images';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.username.trim().length < 3) next.username = 'Username must be at least 3 characters';
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters';
    if (!agree) next.agree = 'Accept the terms to continue';
    setErrors(next);
    if (Object.keys(next).length === 0) navigate('/confirm');
  };

  return (
    <AuthLayout title="Sign Up" image={illustrations.signup} imageAlt="Person working at a desk with plants">
      <SocialButtons />
      <OrDivider />
      <form onSubmit={submit} noValidate className="space-y-4">
        <TextField label="Full Name" placeholder="Jiangyu" value={form.name} onChange={set('name')} error={errors.name} />
        <TextField label="Email Address" type="email" placeholder="example@gmail.com" value={form.email} onChange={set('email')} error={errors.email} />
        <TextField label="Username" placeholder="johnkevine4362" value={form.username} onChange={set('username')} error={errors.username} />
        <PasswordField autoComplete="new-password" placeholder="••••••••" value={form.password} onChange={set('password')} error={errors.password} />
        <div>
          <label className="flex items-start gap-3 text-base text-ink">
            <span className="mt-0.5"><Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} label="Accept terms" /></span>
            <span>
              By creating an account you agree to the{' '}
              <a href="#terms" className="text-primary underline">terms of use</a> and our{' '}
              <a href="#privacy" className="text-primary underline">privacy policy.</a>
            </span>
          </label>
          {errors.agree && <p className="mt-1 text-xs text-brand-red">{errors.agree}</p>}
        </div>
        <Button type="submit" className="h-14 w-full text-lg">Create account</Button>
      </form>
      <p className="mt-6 text-center text-base text-ink">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
      </p>
    </AuthLayout>
  );
}
