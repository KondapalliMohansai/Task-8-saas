import { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import Badge from '../common/Badge';
import Checkbox from '../common/Checkbox';
import { AvatarStack } from '../common/Avatar';
import { boardColumns, tagTone } from '../../data/tasks';
import { taskImg } from '../../data/images';

function BoardCard({ card, checked, onCheck }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-card">
      <header className="flex items-center gap-3">
        <Checkbox round checked={checked} onChange={onCheck} label={`Mark ${card.title}`} />
        <h3 className="flex-1 truncate font-semibold text-ink">{card.title}</h3>
        <MoreHorizontal size={18} className="text-muted" />
      </header>
      <div className="mt-4 flex flex-wrap gap-2">
        {card.tags.map((t) => (
          <Badge key={t} tone={tagTone[t]} className="px-5 py-1 text-xs">{t}</Badge>
        ))}
      </div>
      <p className="mt-4 text-sm text-body">Discussion for management dashboard ui design</p>
      {card.images && (
        <div className={`mt-4 grid gap-3 ${card.images.length > 1 ? 'grid-cols-2' : ''}`}>
          {card.images.map((img) => (
            <img key={img} src={taskImg[img]} alt="" className="h-[70px] w-full rounded-lg object-cover first:object-left" style={card.images.length === 1 ? { height: 'auto', maxHeight: 170 } : undefined} />
          ))}
        </div>
      )}
      <footer className="mt-4 flex items-center justify-between">
        <AvatarStack names={card.team} size={28} />
        <span className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5"><MessageCircle size={16} fill="currentColor" />112</span>
          <span className="flex items-center gap-1.5"><Heart size={16} fill="currentColor" />1.2k</span>
        </span>
      </footer>
    </article>
  );
}

export default function TaskBoardView({ query }) {
  const [checked, setChecked] = useState(() => boardColumns.flatMap((c) => c.cards).filter((c) => c.checked).map((c) => c.id));
  const toggle = (id) => setChecked((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  const q = query.trim().toLowerCase();

  return (
    <div className="thin-scroll overflow-x-auto pb-4">
      <div className="grid min-w-[1000px] grid-cols-4 gap-5">
        {boardColumns.map((col) => (
          <section key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-xl font-semibold text-body">{col.title}</h2>
            <div className="space-y-5">
              {col.cards.filter((c) => c.title.toLowerCase().includes(q)).map((card) => (
                <BoardCard key={card.id} card={card} checked={checked.includes(card.id)} onCheck={() => toggle(card.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
