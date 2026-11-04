import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from '../common/Logo';
import Avatar from '../common/Avatar';
import UpgradeCard from './UpgradeCard';
import { icons } from '../../data/images';

const links = [
  { to: '/', label: 'Dashboard', icon: icons.category },
  { to: '/analytics', label: 'Analytics', icon: icons.chart, also: ['/customers'] },
  { to: '/invoices', label: 'Invoice', icon: icons.ticket },
  { to: '/schedule', label: 'Schedule', icon: icons.document, also: ['/tasks'] },
  { to: '/calendar', label: 'Calendar', icon: icons.calendar },
  { to: '/messages', label: 'Messages', icon: icons.activity, badge: 49 },
  { to: '/notifications', label: 'Notification', icon: icons.notification },
  { to: '/settings', label: 'Settings', icon: icons.setting },
];

function isActive(link, pathname) {
  const paths = [link.to, ...(link.also || [])];
  return paths.some((p) => (p === '/' ? pathname === '/' : pathname === p || pathname.startsWith(p + '/')));
}

// The PNG icons are grey, so they are used as a mask and tinted with a background colour.
function NavIcon({ src, active }) {
  return (
    <span
      aria-hidden="true"
      className="block h-6 w-6 shrink-0 transition-colors duration-200"
      style={{
        backgroundColor: active ? '#605BFF' : '#9C9BAA',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

/*
  Phones   : slides in from the left (hamburger in the top bar)
  md and up: full sidebar, or the icon-only rail. Click the Base logo to switch between them.

  The sidebar is not fixed or scrollable on its own - it simply grows with its content, so on a
  short screen the profile / logout row is pushed down the page instead of getting an inner scrollbar.
*/
export default function Sidebar({ open, onClose, rail, onLogoClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-[#1b1a3a]/30 md:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col overflow-y-auto bg-white transition-[width,margin,border-radius,transform] duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:z-auto md:shrink-0 md:translate-x-0 md:overflow-visible
          ${rail ? 'md:m-3 md:w-[72px] md:rounded-2xl' : 'md:m-0 md:w-[196px] md:rounded-none'}`}
      >
        <button
          type="button"
          onClick={onLogoClick}
          aria-label={rail ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!rail}
          className={`flex items-center gap-3 px-7 pb-6 pt-8 text-left transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            rail ? 'md:flex-col md:gap-1 md:px-0 md:pt-6' : ''
          }`}
        >
          <Logo size={40} />
          <span className={`text-2xl font-semibold text-ink ${rail ? 'md:text-lg' : ''}`}>Base</span>
        </button>

        <nav className="flex-1" aria-label="Main">
          {links.map((link) => {
            const active = isActive(link, pathname);
            return (
              <Link
                key={link.to}
                to={link.to}
                title={link.label}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-12 items-center pl-7 pr-4 text-base font-semibold transition-colors ${rail ? 'md:justify-center md:px-0' : ''} ${
                  active ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary' : 'text-[#9C9BAA] hover:text-body'
                }`}
              >
                <NavIcon src={link.icon} active={active} />
                <span
                  className={`ml-4 max-w-[140px] overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    rail ? 'md:ml-0 md:max-w-0 md:opacity-0' : ''
                  }`}
                >
                  {link.label}
                </span>
                {link.badge && (
                  <>
                    <span className={`ml-auto rounded-full bg-[#FDE8EB] px-2 py-0.5 text-[10px] font-bold text-brand-red ${rail ? 'md:hidden' : ''}`}>
                      {link.badge}
                    </span>
                    {rail && <span className="absolute right-5 top-3 hidden h-2 w-2 rounded-full bg-brand-red md:block" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={`py-4 ${rail ? 'md:hidden' : ''}`}>
          <UpgradeCard />
        </div>

        <div className={`flex items-center gap-3 px-5 pb-5 pt-2 ${rail ? 'md:flex-col md:px-0' : ''}`}>
          <Avatar src="easin" name="Easin Arafat" size={44} className="!rounded-xl" />
          <div className={`min-w-0 flex-1 ${rail ? 'md:hidden' : ''}`}>
            <p className="truncate text-sm font-bold text-ink">Easin Arafat</p>
            <p className="text-xs text-muted">Free Account</p>
          </div>
          <button type="button" aria-label="Log out" onClick={() => navigate('/login')} className="text-[#9C9BAA] hover:text-primary">
            <LogOut size={20} />
          </button>
        </div>
      </aside>
    </>
  );
}
