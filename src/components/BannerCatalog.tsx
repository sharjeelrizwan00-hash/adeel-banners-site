import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  BANNER_CATALOG,
  BannerGenre,
  BannerProduct,
} from '../data/bannerData';
import { ResilientImage } from './ResilientImage';

interface BannerCatalogProps {
  selectedBannerId: string;
  onCustomizeBanner: (banner: BannerProduct) => void;
}

const GENRES: BannerGenre[] = [
  'All',
  'FPS & Tactical',
  'Battle Royale',
  'Sim Racing',
  'Fantasy RPG',
];

export function BannerCatalog({
  selectedBannerId,
  onCustomizeBanner,
}: BannerCatalogProps) {
  const [activeGenre, setActiveGenre] = useState<BannerGenre>('All');

  const filtered =
    activeGenre === 'All'
      ? BANNER_CATALOG
      : BANNER_CATALOG.filter((item) => item.genre === activeGenre);

  return (
    <section
      id="catalog"
      className="py-16 lg:py-24 border-t border-[#232a3b] bg-[#0e121b]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mb-3">
              Banner Catalog
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-50 max-w-xl"
              style={{ textWrap: 'balance' }}
            >
              Pick a signature artwork style and make it yours.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter gaming banners by genre"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#131722] border border-[#232a3b] rounded-lg self-start md:self-auto"
          >
            {GENRES.map((genre) => {
              const isActive = activeGenre === genre;
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setActiveGenre(genre)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-blue-500 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((banner) => {
            const isSelected = banner.id === selectedBannerId;
            return (
              <article
                key={banner.id}
                className={`group flex flex-col rounded-2xl border overflow-hidden transition-colors duration-150 bg-[#131722] ${
                  isSelected
                    ? 'border-blue-500'
                    : 'border-[#232a3b] hover:border-slate-600'
                }`}
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#0b0e14]">
                  <ResilientImage
                    src={banner.image}
                    alt={banner.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <span>{banner.genre}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{banner.resolution}</span>
                      <span aria-hidden="true">·</span>
                      <span>{banner.turnaround}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-50 mb-3">
                      {banner.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5 tracking-wide">
                      {banner.summary}
                    </p>

                    <p className="text-xs text-slate-400 mb-6">
                      Formats: {banner.platforms.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#232a3b] flex items-center justify-between gap-4">
                    <div className="font-mono text-xl font-medium text-amber-400 tabular-nums">
                      ${banner.priceUsd}
                    </div>

                    <button
                      type="button"
                      onClick={() => onCustomizeBanner(banner)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      <span>{isSelected ? 'Selected in Customizer' : 'Customize & Order'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
