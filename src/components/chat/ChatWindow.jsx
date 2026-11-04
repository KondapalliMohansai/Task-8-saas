import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MoreVertical, Paperclip, Phone, Send, Smile, Video } from 'lucide-react';
import Avatar from '../common/Avatar';
import { taskImg } from '../../data/images';

const roundBtn = 'flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F7] text-[#5A5970] hover:bg-primary/10';

export default function ChatWindow({ contact, messages, onSend, onBack }) {
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, contact.id]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <section className="flex min-h-0 flex-col rounded-2xl bg-white p-5 shadow-card" aria-label={`Chat with ${contact.name}`}>
      <header className="flex items-center gap-3">
        <button type="button" aria-label="Back to conversations" onClick={onBack} className="text-ink lg:hidden"><ArrowLeft size={20} /></button>
        <span className="relative">
          <Avatar src="carlio_head" name={contact.name} size={36} />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2FC24F]" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-ink">{contact.name}</p>
          <p className="text-xs text-muted">Online</p>
        </div>
        <button type="button" aria-label="Voice call" className={roundBtn}><Phone size={16} fill="currentColor" /></button>
        <button type="button" aria-label="Video call" className={roundBtn}><Video size={16} fill="currentColor" /></button>
        <button type="button" aria-label="More" className={roundBtn}><MoreVertical size={16} /></button>
      </header>

      <div className="thin-scroll mt-6 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => {
          const lastOfRun = messages[i + 1]?.from !== m.from;
          if (m.kind === 'images') {
            return (
              <div key={m.id} className="flex justify-end gap-3 py-2">
                {m.images.map((img) => <img key={img} src={taskImg[img]} alt="Shared screenshot" className="h-[110px] w-1/2 max-w-[200px] rounded-lg object-cover sm:h-[170px]" />)}
              </div>
            );
          }
          const mine = m.from === 'me';
          return (
            <div key={m.id} className={mine ? 'flex flex-col items-end' : ''}>
              <div className={`max-w-[85%] rounded-md px-4 py-3 text-sm text-white sm:max-w-[60%] ${mine ? 'bg-primary' : 'bg-brand-blue'}`}>
                <p>{m.text}</p>
                {m.time && <p className="mt-2 text-right text-[11px] text-white/70">{m.time}</p>}
              </div>
              {!mine && lastOfRun && <Avatar src="carlio_head" name={contact.name} size={36} className="mt-3" />}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="mt-4 flex items-center gap-3 rounded-xl bg-field px-4 py-3">
        <button type="button" aria-label="Attach file" className="text-[#6F6E86]"><Paperclip size={20} /></button>
        <input aria-label="Type a message" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="min-w-0 flex-1 border-l border-ink/60 bg-transparent pl-3 text-sm outline-none placeholder:text-body" />
        <button type="button" aria-label="Emoji" className="text-[#6F6E86]"><Smile size={20} /></button>
        <button type="submit" aria-label="Send message" className="text-primary"><Send size={22} fill="currentColor" /></button>
      </form>
    </section>
  );
}
