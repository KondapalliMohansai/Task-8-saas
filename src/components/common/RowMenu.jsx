import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

// three dots button with the small Edit / Delete dropdown
export default function RowMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Row options"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-8 w-8 items-center justify-center rounded-lg hover:bg-field ${open ? 'text-primary' : 'text-[#8A8AA0]'}`}
      >
        <MoreHorizontal size={20} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-20 w-[92px] space-y-1.5 rounded-xl bg-white p-2 shadow-pop">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
            className="flex w-full items-center gap-2 rounded-md bg-[#EEF4FF] px-2.5 py-1.5 text-xs font-semibold text-brand-blue"
          >
            <Pencil size={11} /> Edit
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
            className="flex w-full items-center gap-2 rounded-md bg-[#FDECEE] px-2.5 py-1.5 text-xs font-semibold text-brand-red"
          >
            <Trash2 size={11} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
