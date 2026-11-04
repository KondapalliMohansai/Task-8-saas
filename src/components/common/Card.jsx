import { MoreHorizontal } from 'lucide-react';

export default function Card({ title, action, className = '', children }) {
  return (
    <section className={`rounded-2xl bg-white p-5 shadow-card sm:p-6 ${className}`}>
      {title && (
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-body">{title}</h2>
          {action === undefined ? (
            <button type="button" aria-label="More options" className="text-muted hover:text-ink">
              <MoreHorizontal size={20} />
            </button>
          ) : (
            action
          )}
        </header>
      )}
      {children}
    </section>
  );
}
