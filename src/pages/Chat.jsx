import { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import { conversations, initialMessages } from '../data/chat';

export default function Chat() {
  const [activeId, setActiveId] = useState(3);
  const [mobileOpen, setMobileOpen] = useState(false); // below lg only one panel shows at a time
  const [threads, setThreads] = useState({ 3: initialMessages });

  const contact = conversations.find((c) => c.id === activeId);
  const messages = threads[activeId] || [];

  const send = (text) => {
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setThreads((t) => ({ ...t, [activeId]: [...(t[activeId] || []), { id: Date.now(), from: 'me', kind: 'text', text, time }] }));
  };

  return (
    <div className="grid h-[calc(100vh-5.5rem)] min-h-[560px] gap-5 md:h-[calc(100vh-3rem)] lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className={`${mobileOpen ? 'hidden lg:flex' : 'flex'} min-h-0 flex-col [&>section]:flex-1`}>
        <ChatList activeId={activeId} onSelect={(id) => { setActiveId(id); setMobileOpen(true); }} />
      </div>
      <div className={`${mobileOpen ? 'flex' : 'hidden lg:flex'} min-h-0 flex-col [&>section]:flex-1`}>
        <ChatWindow contact={contact} messages={messages} onSend={send} onBack={() => setMobileOpen(false)} />
      </div>
    </div>
  );
}
