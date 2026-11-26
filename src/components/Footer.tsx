import { CONTACT_INFO } from '../data/bannerData';
import { ActivePage } from './Header';

interface FooterProps {
  isLoggedIn: boolean;
  onNavigate: (page: ActivePage, sectionId?: string) => void;
}

export function Footer({ isLoggedIn, onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#232a3b] bg-[#0b0e14] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#232a3b]">
          <div>
            <button
              type="button"
              onClick={() => onNavigate('store', 'top')}
              className="font-display text-lg font-bold tracking-tight text-slate-50 cursor-pointer"
            >
              Adeel Banners
            </button>
            <p className="text-xs text-slate-400 mt-1.5">
              Custom Gaming Banners <span aria-hidden="true">·</span> YouTube & Twitch Art{' '}
              <span aria-hidden="true">·</span> Esports Branding
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-6 text-sm text-slate-300"
          >
            <button
              type="button"
              onClick={() => onNavigate('store', 'catalog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Catalog
            </button>
            <button
              type="button"
              onClick={() => onNavigate('store', 'customizer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Custom Order
            </button>
            <button
              type="button"
              onClick={() => onNavigate(isLoggedIn ? 'orders' : 'login')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isLoggedIn ? 'My Orders' : 'Customer Login'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('store', 'contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            © 2026 Adeel Banners · {CONTACT_INFO.address}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="font-mono hover:text-slate-200 transition-colors tabular-nums"
            >
              {CONTACT_INFO.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-slate-200 transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
