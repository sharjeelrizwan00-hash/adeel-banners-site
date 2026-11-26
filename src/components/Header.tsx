import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CustomerUser } from '../data/bannerData';

export type ActivePage = 'store' | 'login' | 'orders';

interface HeaderProps {
  user: CustomerUser | null;
  activePage: ActivePage;
  onNavigate: (page: ActivePage, sectionId?: string) => void;
  onLogout: () => void;
}

export function Header({
  user,
  activePage,
  onNavigate,
  onLogout,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLink = (page: ActivePage, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(page, sectionId);
  };

  const handlePrimaryAction = () => {
    setMobileOpen(false);
    if (user) {
      onLogout();
    } else {
      onNavigate('login');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0e14]/95 backdrop-blur-sm border-b border-[#232a3b]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => handleLink('store', 'top')}
          className="font-display text-lg font-bold tracking-tight text-slate-50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
        >
          Adeel Banners
        </button>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          <button
            type="button"
            onClick={() => handleLink('store', 'catalog')}
            className="hover:text-white hover:underline underline-offset-4 decoration-slate-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={() => handleLink('store', 'customizer')}
            className="hover:text-white hover:underline underline-offset-4 decoration-slate-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
          >
            Custom Order
          </button>
          <button
            type="button"
            onClick={() => handleLink(user ? 'orders' : 'login')}
            className={`hover:text-white hover:underline underline-offset-4 decoration-slate-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm ${
              activePage === 'orders' ? 'text-white underline' : ''
            }`}
          >
            My Orders
          </button>
          <button
            type="button"
            onClick={() => handleLink('store', 'contact')}
            className="hover:text-white hover:underline underline-offset-4 decoration-slate-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 min-h-[40px]"
          >
            {user ? 'Sign Out' : 'Customer Login'}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-300 hover:bg-[#131722] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#232a3b] bg-[#131722] px-6 py-4 space-y-3">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => handleLink('store', 'catalog')}
              className="py-2.5 text-left text-sm font-medium text-slate-200 hover:text-white whitespace-nowrap cursor-pointer"
            >
              Catalog
            </button>
            <button
              type="button"
              onClick={() => handleLink('store', 'customizer')}
              className="py-2.5 text-left text-sm font-medium text-slate-200 hover:text-white whitespace-nowrap cursor-pointer"
            >
              Custom Order
            </button>
            <button
              type="button"
              onClick={() => handleLink(user ? 'orders' : 'login')}
              className="py-2.5 text-left text-sm font-medium text-slate-200 hover:text-white whitespace-nowrap cursor-pointer"
            >
              My Orders
            </button>
            <button
              type="button"
              onClick={() => handleLink('store', 'contact')}
              className="py-2.5 text-left text-sm font-medium text-slate-200 hover:text-white whitespace-nowrap cursor-pointer"
            >
              Contact
            </button>
          </nav>
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer min-h-[44px]"
          >
            {user ? 'Sign Out' : 'Customer Login'}
          </button>
        </div>
      )}
    </header>
  );
}
