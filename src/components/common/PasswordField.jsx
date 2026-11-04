import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TextField } from './TextField';

export default function PasswordField({ label = 'Password', ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      label={label}
      type={visible ? 'text' : 'password'}
      icon={
        <button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible((v) => !v)} className="text-[#7D7C95]">
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      }
      {...props}
    />
  );
}
