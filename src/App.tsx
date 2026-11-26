import { useCallback, useEffect, useState } from 'react';
import {
  ACCENT_COLORS,
  BANNER_CATALOG,
  BannerOrder,
  BannerProduct,
  CustomerUser,
  PLATFORM_FORMATS,
} from './data/bannerData';
import { ActivePage, Header } from './components/Header';
import { Hero } from './components/Hero';
import { BannerCatalog } from './components/BannerCatalog';
import {
  CustomOrderBuilder,
  DraftOrderState,
} from './components/CustomOrderBuilder';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthView } from './components/AuthView';
import { CustomerPortal } from './components/CustomerPortal';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('store');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [orders, setOrders] = useState<BannerOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [justOrderedId, setJustOrderedId] = useState<string | null>(null);
  const [pendingSubmitAfterLogin, setPendingSubmitAfterLogin] = useState(false);

  const [draft, setDraft] = useState<DraftOrderState>({
    bannerId: BANNER_CATALOG[0].id,
    channelTitle: '',
    tagline: '',
    platform: PLATFORM_FORMATS[0].label,
    accentColor: ACCENT_COLORS[0],
    addonIds: ['matching-avatar'],
    notes: '',
  });

  const fetchOrders = useCallback(async (token: string) => {
    setLoadingOrders(true);
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;
      const data = (await response.json()) as { orders?: BannerOrder[] };
      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchOrders(authToken);
    }
  }, [authToken, fetchOrders]);

  const handleNavigate = (page: ActivePage, sectionId?: string) => {
    setActivePage(page);
    if (page === 'store') {
      setTimeout(() => {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCustomizeBanner = (banner: BannerProduct) => {
    setDraft((prev) => ({ ...prev, bannerId: banner.id }));
    handleNavigate('store', 'customizer');
  };

  const submitOrderRequest = async (
    token: string,
    orderDraft: DraftOrderState
  ) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderDraft),
    });

    const data = (await response.json()) as {
      order?: BannerOrder;
      error?: string;
    };

    if (!response.ok || !data.order) {
      throw new Error(data.error || 'Could not create your order.');
    }

    setOrders((prev) => [data.order!, ...prev]);
    setJustOrderedId(data.order.id);
    setActivePage('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitOrder = async (orderDraft: DraftOrderState) => {
    if (!authToken) {
      setPendingSubmitAfterLogin(true);
      handleNavigate('login');
      return;
    }
    await submitOrderRequest(authToken, orderDraft);
  };

  const handleAuthSuccess = async (token: string, authedUser: CustomerUser) => {
    setAuthToken(token);
    setUser(authedUser);

    if (pendingSubmitAfterLogin && draft.channelTitle.trim().length >= 2) {
      setPendingSubmitAfterLogin(false);
      try {
        await submitOrderRequest(token, draft);
        return;
      } catch {
        handleNavigate('store', 'customizer');
        return;
      }
    }

    setPendingSubmitAfterLogin(false);
    setJustOrderedId(null);
    setActivePage('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    setOrders([]);
    setJustOrderedId(null);
    setPendingSubmitAfterLogin(false);
    handleNavigate('store', 'top');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-50">
      <Header
        user={user}
        activePage={activePage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {activePage === 'login' && (
          <AuthView
            hasPendingOrder={pendingSubmitAfterLogin}
            onAuthSuccess={handleAuthSuccess}
            onBackToStore={() => {
              setPendingSubmitAfterLogin(false);
              handleNavigate('store', 'top');
            }}
          />
        )}

        {activePage === 'orders' && user && (
          <CustomerPortal
            user={user}
            orders={orders}
            loadingOrders={loadingOrders}
            justOrderedId={justOrderedId}
            onOrderAnother={() => {
              setJustOrderedId(null);
              handleNavigate('store', 'customizer');
            }}
            onBackToStore={() => handleNavigate('store', 'catalog')}
          />
        )}

        {(activePage === 'store' || (activePage === 'orders' && !user)) && (
          <>
            <Hero
              isLoggedIn={Boolean(user)}
              onBrowseCatalog={() => handleNavigate('store', 'catalog')}
              onOpenLogin={() => handleNavigate(user ? 'orders' : 'login')}
            />
            <BannerCatalog
              selectedBannerId={draft.bannerId}
              onCustomizeBanner={handleCustomizeBanner}
            />
            <CustomOrderBuilder
              user={user}
              draft={draft}
              onChangeDraft={setDraft}
              onRequireLogin={() => {
                setPendingSubmitAfterLogin(true);
                handleNavigate('login');
              }}
              onSubmitOrder={handleSubmitOrder}
            />
            <ContactSection />
          </>
        )}
      </main>

      <Footer isLoggedIn={Boolean(user)} onNavigate={handleNavigate} />
    </div>
  );
}
