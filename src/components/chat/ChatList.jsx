import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Avatar from '../common/Avatar';
import { conversations, lastMessage } from '../../data/chat';

const tabs = ['All', 'Personal', 'Teams'];

export default function ChatList({ activeId, onSelect }) {
  const [tab, setTab] = useState('Personal');
  const [query, setQuery] = useState('');

  const list = conversations.filter(
    (c) => (tab === 'All' || c.type === tab) && c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section className="flex min-h-0 flex-col rounded-2xl bg-white p-5 shadow-card" aria-label="Conversations">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-ink">Message</h1>
        <button type="button" aria-label="New message" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-[#4f4ae6]">
          <Plus size={18} />
        </button>
      </div>

      <label className="relative mb-4 block">
        <span className="sr-only">Search messages</span>
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F6E86]" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="h-11 w-full rounded-xl bg-field pl-10 pr-3 text-sm outline-none placeholder:text-body focus:ring-2 focus:ring-primary/30" />
      </label>

      <div role="tablist" className="mb-2 grid grid-cols-3 border-b border-line">
        {tabs.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`-mb-px border-b-2 py-2.5 text-base ${tab === t ? 'border-primary font-semibold text-primary' : 'border-transparent text-muted'}`}>
            {t}
          </button>
        ))}
      </div>

      <ul className="thin-scroll -mx-2 min-h-0 flex-1 overflow-y-auto">
        {list.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect(c.id)}
              className={`flex w-full gap-4 border-b border-line px-3 py-4 text-left ${activeId === c.id ? 'bg-[#F6F6FF]' : 'hover:bg-field'}`}
            >
              <span className="relative shrink-0">
                <Avatar src={c.avatar} name={c.name} size={50} />
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${c.online === 'green' ? 'bg-[#2FC24F]' : 'bg-[#FF8F4D]'}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`truncate text-base ${activeId === c.id ? 'font-semibold text-ink' : 'text-body'}`}>{c.name}</span>
                  <span className="shrink-0 text-[11px] text-muted">{c.time}</span>
                </span>
                <span className="mt-0.5 block text-sm text-muted">{lastMessage}</span>
              </span>
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="py-8 text-center text-sm text-muted">No conversations found.</li>}
      </ul>
    </section>
  );
}
