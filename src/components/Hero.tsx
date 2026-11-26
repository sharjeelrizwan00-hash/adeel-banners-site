import { ArrowRight } from 'lucide-react';
import { GAMING_HERO_IMAGE, STORE_METRICS } from '../data/bannerData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  isLoggedIn: boolean;
  onBrowseCatalog: () => void;
  onOpenLogin: () => void;
}

export function Hero({
  isLoggedIn,
  onBrowseCatalog,
  onOpenLogin,
}: HeroProps) {
  return (
    <section id="top" className="pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide mb-5">
                YouTube Channel Art <span aria-hidden="true">·</span> Twitch Headers{' '}
                <span aria-hidden="true">·</span> Esports Team Branding
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-slate-50 leading-[1.06] mb-6"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                  textWrap: 'balance',
                }}
              >
                Custom gaming banners built for streamers and esports clans.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8 tracking-wide">
                Order 4K safe-zone gaming headers tailored with your gamer tag, squad crest, and
                channel links. Create a customer account to customize your banner live and track
                your design delivery in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 min-h-[44px]"
              >
                Browse Banner Packs
              </button>

              <button
                type="button"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 group py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-sm"
              >
                <span>{isLoggedIn ? 'Open My Orders' : 'Customer Login & Sign Up'}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full rounded-2xl overflow-hidden border border-[#232a3b] bg-[#131722]">
              <ResilientImage
                src={GAMING_HERO_IMAGE.src}
                alt={GAMING_HERO_IMAGE.alt}
                className="w-full aspect-[16/10] lg:aspect-auto lg:h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 border-y border-[#232a3b] divide-y sm:divide-y-0 sm:divide-x divide-[#232a3b]">
          {STORE_METRICS.map((metric) => (
            <div key={metric.value} className="py-6 px-4 sm:px-6 first:pl-0 last:pr-0">
              <div className="font-mono text-2xl sm:text-3xl font-medium text-slate-50 tabular-nums tracking-tight">
                {metric.value}
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
