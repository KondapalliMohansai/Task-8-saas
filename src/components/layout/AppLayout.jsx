import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Logo from '../common/Logo';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [forceRail, setForceRail] = useState(null); // null = follow the screen size, true / false = user clicked the logo
  const { pathname } = useLocation();
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');

  // icon-only on tablets by default, full sidebar on desktop
  const rail = forceRail ?? !isLg;

  // close the mobile menu after navigating
  useEffect(() => setMenuOpen(false), [pathname]);

  // clicking the logo collapses / expands the sidebar (on phones it just closes the menu)
  const onLogoClick = () => (isMd ? setForceRail(!rail) : setMenuOpen(false));

  return (
    <div className="min-h-screen bg-page md:flex">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} rail={rail} onLogoClick={onLogoClick} />

      <header className="no-print sticky top-0 z-20 flex h-14 items-center gap-3 bg-white px-4 shadow-card md:hidden">
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)} className="text-ink">
          <Menu size={24} />
        </button>
        <Logo size={28} />
        <span className="text-lg font-semibold">Base</span>
      </header>

      <main className="min-w-0 flex-1">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
