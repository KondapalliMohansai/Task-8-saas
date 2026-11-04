import { useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';

// Slide-in panel from the right (Add Customer / Add Product)
export default function Drawer({ title, onClose, back = false, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[#1b1a3a]/40" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-white p-6 shadow-pop sm:w-[380px]"
      >
        <div className={`mb-6 flex items-center ${back ? 'gap-6' : 'justify-between'}`}>
          {back && (
            <button type="button" onClick={onClose} aria-label="Back" className="text-muted hover:text-ink">
              <ArrowLeft size={18} />
            </button>
          )}
          <h2 className={`text-xl font-bold text-ink ${back ? 'flex-1 text-center pr-6' : ''}`}>{title}</h2>
          {!back && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDEEF0] text-brand-red hover:bg-[#fbdde1]"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {children}
      </aside>
    </div>
  );
}

// round grey camera button shown at the top of the add forms
export function PhotoPicker({ preview, onPick, size = 128 }) {
  return (
    <label className="mx-auto mb-6 flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#F5F5F7] text-[#4A4A68]" style={{ width: size, height: size }}>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          // data URL (not a blob URL) so the picture still works after a refresh
          const reader = new FileReader();
          reader.onload = () => onPick(reader.result);
          reader.readAsDataURL(file);
        }}
      />
      {preview ? (
        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-label="Upload photo">
          <path d="M9 3L7.2 5H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-2.2L15 3H9zm3 5.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
        </svg>
      )}
    </label>
  );
}
