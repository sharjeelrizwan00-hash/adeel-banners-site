import { CheckCircle2, Plus } from 'lucide-react';
import {
  BANNER_ADDONS,
  BannerOrder,
  CustomerUser,
} from '../data/bannerData';

interface CustomerPortalProps {
  user: CustomerUser;
  orders: BannerOrder[];
  loadingOrders: boolean;
  justOrderedId: string | null;
  onOrderAnother: () => void;
  onBackToStore: () => void;
}

export function CustomerPortal({
  user,
  orders,
  loadingOrders,
  justOrderedId,
  onOrderAnother,
  onBackToStore,
}: CustomerPortalProps) {
  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <section className="py-12 lg:py-20 min-h-[calc(100vh-14rem)]">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#232a3b]">
          <div>
            <p className="text-xs font-medium text-slate-400 mb-2">
              Customer Account <span aria-hidden="true">·</span> {user.email}
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-50">
              Welcome back, {user.gamerTag || user.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onBackToStore}
              className="px-4 py-2.5 text-sm font-medium text-slate-200 border border-[#2d364d] hover:border-slate-500 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer min-h-[40px]"
            >
              Browse Catalog
            </button>
            <button
              type="button"
              onClick={onOrderAnother}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>New Banner Order</span>
            </button>
          </div>
        </div>

        {justOrderedId && (
          <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 p-5 flex items-start gap-3">
            <CheckCircle2
              className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
              strokeWidth={1.75}
            />
            <div className="text-sm text-slate-200">
              <span className="font-semibold text-white">
                Order {justOrderedId} confirmed.
              </span>{' '}
              Your custom banner request has been queued for design. We will reach out via{' '}
              <span className="font-medium text-white">{user.email}</span> or WhatsApp if any
              clarification is needed.
            </div>
          </div>
        )}

        <div>
          <h2 className="font-display text-xl font-semibold text-slate-100 mb-4">
            Your Banner Orders ({orders.length})
          </h2>

          {loadingOrders ? (
            <div className="rounded-2xl border border-[#232a3b] bg-[#131722] p-8 text-sm text-slate-400">
              Loading your orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-[#232a3b] bg-[#131722] p-8 sm:p-10 text-center space-y-4">
              <p className="text-base text-slate-300">
                You have not placed any gaming banner orders yet.
              </p>
              <button
                type="button"
                onClick={onOrderAnother}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 cursor-pointer min-h-[44px]"
              >
                Customize Your First Banner
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const addonNames = order.addonIds
                  .map((id) => BANNER_ADDONS.find((a) => a.id === id)?.label)
                  .filter(Boolean);

                return (
                  <article
                    key={order.id}
                    className="rounded-2xl border border-[#232a3b] bg-[#131722] p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#232a3b]">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-mono text-slate-200">{order.id}</span>
                          <span aria-hidden="true">·</span>
                          <span>{formatDate(order.createdAt)}</span>
                          <span aria-hidden="true">·</span>
                          <span>{order.status}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-slate-50 mt-1">
                          {order.bannerTitle} — “{order.channelTitle}”
                        </h3>
                      </div>

                      <div className="font-mono text-xl font-medium text-amber-400 tabular-nums shrink-0">
                        ${order.totalUsd}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 block mb-0.5">Platform Format</span>
                        <span className="font-medium text-slate-100">{order.platform}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Typography Accent</span>
                        <span className="font-medium text-slate-100">{order.accentColor}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Subtitle</span>
                        <span className="font-medium text-slate-100">
                          {order.tagline || 'None specified'}
                        </span>
                      </div>
                    </div>

                    {addonNames.length > 0 && (
                      <div className="text-xs text-slate-400">
                        Add-ons: {addonNames.join(' · ')}
                      </div>
                    )}

                    {order.notes && (
                      <div className="text-xs text-slate-300 bg-[#0b0e14] border border-[#232a3b] rounded-lg p-3">
                        Notes: {order.notes}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
