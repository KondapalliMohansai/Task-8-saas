import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Tabs from '../components/common/Tabs';
import { SearchField } from '../components/common/TextField';
import TaskListView from '../components/tasks/TaskListView';
import TaskBoardView from '../components/tasks/TaskBoardView';
import TaskTimelineView from '../components/tasks/TaskTimelineView';
import TaskModal from '../components/tasks/TaskModal';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialTasks } from '../data/tasks';

export default function Tasks() {
  const [view, setView] = useState('List');
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);
  const [checked, setChecked] = useState([3, 4, 5]);
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(null); // {} = new task, {task} = editing

  const filtered = tasks.filter((t) => t.name.toLowerCase().includes(query.trim().toLowerCase()));

  const save = (form) => {
    if (modal.task) setTasks((list) => list.map((t) => (t.id === modal.task.id ? { ...t, ...form } : t)));
    else setTasks((list) => [...list, { ...form, id: Date.now(), icon: 'figma', members: 1 }]);
    setModal(null);
  };

  return (
    <>
      <PageHeader title="Task Preview">
        <Button onClick={() => setModal({})}><Plus size={18} /> Add Task</Button>
      </PageHeader>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={['List', 'Board', 'Timeline']} value={view} onChange={setView} />
        {view === 'Timeline' ? (
          <label className="relative">
            <span className="sr-only">Month</span>
            <select className="h-11 appearance-none rounded-xl bg-white pl-5 pr-10 text-sm font-semibold text-body shadow-card outline-none" defaultValue="December 2021">
              <option>November 2021</option>
              <option>December 2021</option>
              <option>January 2022</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
          </label>
        ) : (
          <SearchField className="w-full sm:w-[230px]" placeholder="Search" aria-label="Search tasks" value={query} onChange={(e) => setQuery(e.target.value)} />
        )}
      </div>

      {view === 'List' && (
        <TaskListView
          tasks={filtered}
          checked={checked}
          onCheck={(id) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))}
          onEdit={(task) => setModal({ task })}
          onDelete={(id) => setTasks((list) => list.filter((t) => t.id !== id))}
        />
      )}
      {view === 'Board' && <TaskBoardView query={query} />}
      {view === 'Timeline' && <TaskTimelineView />}

      {modal && <TaskModal task={modal.task} onClose={() => setModal(null)} onSave={save} />}
    </>
  );
}
