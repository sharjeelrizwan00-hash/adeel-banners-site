import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { CONTACT_INFO, CUSTOMER_REVIEWS } from '../data/bannerData';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyLink = async () => {
    if (!shareUrl || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 lg:py-24 border-t border-[#232a3b] bg-[#0e121b]"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div>
          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-medium text-slate-400 mb-3">
              Creator Reviews
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-50"
              style={{ textWrap: 'balance' }}
            >
              Trusted by streamers and esports rosters.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col justify-between rounded-2xl border border-[#232a3b] bg-[#131722] p-6 sm:p-8"
              >
                <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8 tracking-wide">
                  “{review.quote}”
                </blockquote>

                <figcaption className="pt-5 border-t border-[#232a3b]">
                  <div className="text-sm font-semibold text-slate-50">
                    {review.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {review.role} <span aria-hidden="true">·</span> {review.channel}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-2">
                    {review.packNote}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#232a3b] bg-[#131722] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium text-slate-400 mb-2">
              Direct Contact & Support
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50 mb-3">
              Need a custom esports team bundle or clan pack?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              Reach out directly by email or phone/WhatsApp for bulk tournament branding, animated
              stream overlays, or custom mascot illustrations.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs text-slate-400 mb-1">Email Address</div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="font-medium text-slate-100 hover:text-blue-400 transition-colors break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Phone / WhatsApp</div>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="font-mono font-medium text-slate-100 hover:text-blue-400 transition-colors tabular-nums"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Location</div>
              <div className="font-medium text-slate-100">
                {CONTACT_INFO.address}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Share Storefront Link</div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer py-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Website Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
