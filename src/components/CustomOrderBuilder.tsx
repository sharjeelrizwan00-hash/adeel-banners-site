import { FormEvent, useState } from 'react';
import { AlertCircle, Check, Lock } from 'lucide-react';
import {
  ACCENT_COLORS,
  BANNER_ADDONS,
  BANNER_CATALOG,
  BannerProduct,
  CustomerUser,
  PLATFORM_FORMATS,
} from '../data/bannerData';
import { ResilientImage } from './ResilientImage';

export interface DraftOrderState {
  bannerId: string;
  channelTitle: string;
  tagline: string;
  platform: string;
  accentColor: string;
  addonIds: string[];
  notes: string;
}

interface CustomOrderBuilderProps {
  user: CustomerUser | null;
  draft: DraftOrderState;
  onChangeDraft: (updater: (prev: DraftOrderState) => DraftOrderState) => void;
  onRequireLogin: () => void;
  onSubmitOrder: (draft: DraftOrderState) => Promise<void>;
}

export function CustomOrderBuilder({
  user,
  draft,
  onChangeDraft,
  onRequireLogin,
  onSubmitOrder,
}: CustomOrderBuilderProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedBanner: BannerProduct =
    BANNER_CATALOG.find((b) => b.id === draft.bannerId) ?? BANNER_CATALOG[0];

  const platformConfig =
    PLATFORM_FORMATS.find((p) => p.label === draft.platform) ??
    PLATFORM_FORMATS[0];

  const addonsTotal = BANNER_ADDONS.filter((a) =>
    draft.addonIds.includes(a.id)
  ).reduce((sum, a) => sum + a.priceUsd, 0);

  const totalUsd =
    selectedBanner.priceUsd + platformConfig.extraUsd + addonsTotal;

  const toggleAddon = (id: string) => {
    onChangeDraft((prev) => ({
      ...prev,
      addonIds: prev.addonIds.includes(id)
        ? prev.addonIds.filter((item) => item !== id)
        : [...prev.addonIds, id],
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (draft.channelTitle.trim().length < 2) {
      setError('Please enter your Gamer Tag or Channel Name (at least 2 characters).');
      return;
    }

    if (!user) {
      onRequireLogin();
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitOrder(draft);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to place your order right now.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const accentPreviewColor =
    draft.accentColor === 'Amber Gold'
      ? 'text-amber-400'
      : draft.accentColor === 'Crimson Red'
        ? 'text-rose-400'
        : draft.accentColor === 'Arctic Silver'
          ? 'text-slate-200'
          : 'text-blue-400';

  return (
    <section
      id="customizer"
      className="py-16 lg:py-24 border-t border-[#232a3b] bg-[#0b0e14]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs sm:text-sm font-medium text-slate-400 mb-3">
            Live Banner Customizer
          </p>
          <h2
            className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-50"
            style={{ textWrap: 'balance' }}
          >
            Preview your gamer tag on the artwork and place your order.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-[#232a3b] bg-[#131722] overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0b0e14]">
                <ResilientImage
                  src={selectedBanner.image}
                  alt={selectedBanner.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className={`font-display text-2xl sm:text-4xl font-bold tracking-tight uppercase drop-shadow-md ${accentPreviewColor}`}
                  >
                    {draft.channelTitle.trim() || 'YOUR GAMER TAG'}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-mono text-slate-200 tracking-widest uppercase">
                    {draft.tagline.trim() || 'FPS · STREAMING · ESPORTS'}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#232a3b] space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Selected Style</div>
                    <div className="text-base font-semibold text-slate-50 mt-0.5">
                      {selectedBanner.title}
                    </div>
                  </div>
                  <div className="font-mono text-lg font-medium text-amber-400 tabular-nums">
                    ${selectedBanner.priceUsd}
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedBanner.includes.map((item) => (
                    <li
                      key={item}
                      className="py-2 px-3 rounded-lg bg-[#0b0e14] border border-[#232a3b]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#232a3b] bg-[#131722] p-6 sm:p-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="custom-pack"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Banner Pack
                </label>
                <select
                  id="custom-pack"
                  value={draft.bannerId}
                  onChange={(e) =>
                    onChangeDraft((prev) => ({ ...prev, bannerId: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 focus:outline-2 focus:outline-blue-500"
                >
                  {BANNER_CATALOG.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title} (${item.priceUsd})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="custom-channel"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Gamer Tag / Channel Name *
                  </label>
                  <input
                    id="custom-channel"
                    type="text"
                    maxLength={40}
                    value={draft.channelTitle}
                    onChange={(e) => {
                      setError(null);
                      onChangeDraft((prev) => ({
                        ...prev,
                        channelTitle: e.target.value,
                      }));
                    }}
                    placeholder="e.g. ADEEL_GG"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="custom-tagline"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Subtitle / Social Handles
                  </label>
                  <input
                    id="custom-tagline"
                    type="text"
                    maxLength={60}
                    value={draft.tagline}
                    onChange={(e) =>
                      onChangeDraft((prev) => ({ ...prev, tagline: e.target.value }))
                    }
                    placeholder="Live Daily · @AdeelGaming"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="custom-platform"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Platform Format
                  </label>
                  <select
                    id="custom-platform"
                    value={draft.platform}
                    onChange={(e) =>
                      onChangeDraft((prev) => ({ ...prev, platform: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 focus:outline-2 focus:outline-blue-500"
                  >
                    {PLATFORM_FORMATS.map((fmt) => (
                      <option key={fmt.label} value={fmt.label}>
                        {fmt.label}
                        {fmt.extraUsd > 0 ? ` (+$${fmt.extraUsd})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="custom-accent"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Typography Accent Color
                  </label>
                  <select
                    id="custom-accent"
                    value={draft.accentColor}
                    onChange={(e) =>
                      onChangeDraft((prev) => ({
                        ...prev,
                        accentColor: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 focus:outline-2 focus:outline-blue-500"
                  >
                    {ACCENT_COLORS.map((clr) => (
                      <option key={clr} value={clr}>
                        {clr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-300 mb-2">
                  Optional Add-Ons
                </span>
                <div className="space-y-2">
                  {BANNER_ADDONS.map((addon) => {
                    const checked = draft.addonIds.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        aria-pressed={checked}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 ${
                          checked
                            ? 'border-blue-500 bg-blue-950/30'
                            : 'border-[#232a3b] bg-[#0b0e14] hover:border-slate-600'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                            checked
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-[#131722] border-[#2d364d] text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-sm font-medium text-slate-100">
                              {addon.label}
                            </span>
                            <span className="font-mono text-xs text-amber-400 tabular-nums shrink-0">
                              +${addon.priceUsd}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {addon.summary}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="custom-notes"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Design Notes (Optional)
                </label>
                <textarea
                  id="custom-notes"
                  rows={2}
                  maxLength={500}
                  value={draft.notes}
                  onChange={(e) =>
                    onChangeDraft((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Specific game character, clan mascot, or font style preferences..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
                />
              </div>

              {error && (
                <p className="flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </p>
              )}

              <div className="pt-4 border-t border-[#232a3b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Order Total</div>
                  <div className="font-mono text-2xl font-medium text-amber-400 tabular-nums">
                    ${totalUsd}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  {!user && <Lock className="w-4 h-4" />}
                  <span>
                    {submitting
                      ? 'Submitting Order...'
                      : user
                        ? 'Submit Banner Order'
                        : 'Sign In to Place Order'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
