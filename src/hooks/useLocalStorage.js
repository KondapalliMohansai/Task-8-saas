import { useEffect, useState } from 'react';

// Small helper so lists (invoices, customers, ...) survive a page refresh.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can be blocked (private mode) - the app still works without it
    }
  }, [key, value]);

  return [value, setValue];
}
