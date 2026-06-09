'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  SERVICE_CATEGORIES, 
  BUSINESS_INFO 
} from '../data';
import { ServiceCategory } from '../types';
import { getViewHref } from '../navigation';
import { Phone, Check, ShieldAlert, BadgeInfo, HelpCircle, Flame } from 'lucide-react';

interface ServicesViewProps {
  initialCategoryId: string | null;
}

export function ServicesView({ initialCategoryId }: ServicesViewProps) {
  const router = useRouter();
  const [activeCatId, setActiveCatId] = useState(SERVICE_CATEGORIES[0].id);

  // If initialCategoryId is provided (e.g. clicked via mega menu or home quick-estimator),
  // switch the active tab immediately on load/change
  useEffect(() => {
    if (initialCategoryId) {
      const match = SERVICE_CATEGORIES.some(c => c.id === initialCategoryId);
      if (match) {
        setActiveCatId(initialCategoryId);
      }
    }
  }, [initialCategoryId]);

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === activeCatId) || SERVICE_CATEGORIES[0];

  return (
    <div id="services-page" className="font-sans text-[#E0E0E0] bg-[#0A0A0B] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-[#C5A059] font-mono uppercase tracking-[0.25em] block mb-2">Our Portfolio</span>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">Our Professional Index</h1>
          <p className="text-white/50 mt-3 text-xs sm:text-sm font-light leading-relaxed">
            Elite Plumbing Services holds Gas Safe registration {BUSINESS_INFO.gasSafeReg}, offering transparent estimates, experienced mechanics, and clean, certified workmanship.
          </p>
        </div>

        {/* Categories Tab Bar / Main section container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar Selection (Desktop) & Overflow Scroll (Mobile) */}
          <div className="lg:col-span-3 space-y-2">
            {/* Mobile Horizontal scroll panel */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-3 lg:pb-0 scrollbar-none font-mono">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  id={`tab-select-${cat.id}`}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-left rounded-sm text-xs font-bold cursor-pointer transition shrink-0 lg:w-full border ${
                    activeCatId === cat.id
                      ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-md'
                      : 'bg-[#0E0E10] border-white/10 text-white/60 hover:border-[#C5A059]/40 hover:text-white'
                  }`}
                >
                  <span className="text-xl shrink-0">{cat.emoji}</span>
                  <span className="truncate uppercase tracking-wider">{cat.name}</span>
                  {cat.isEmergency && (
                    <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-sm uppercase hidden lg:inline-block font-bold ${
                      activeCatId === cat.id ? 'bg-black/10 text-black' : 'bg-[#C5A059]/10 text-[#C5A059]'
                    }`}>
                      24h
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick emergency box below tabs */}
            <div className="hidden lg:block bg-[#0E0E10] border border-[#C5A059]/30 rounded-sm p-5 text-xs shadow-sm mt-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white mb-2">
                <Flame className="h-4 w-4 text-[#C5A059] animate-pulse" />
                Active Leaks or No Heat?
              </div>
              <p className="leading-relaxed mb-4 text-white/50 font-light text-xs">
                Do not wait for standard slots if fluids are overflowing or boilers are active-clicking. Emergency line response is guaranteed under 60 minutes.
              </p>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="w-full text-center bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold font-mono tracking-widest uppercase py-3 rounded-sm inline-block transition text-[10px]"
              >
                Dispatch Plumber Fast
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Active Category Content */}
          <div id="service-spec-container" className="lg:col-span-9 space-y-6">
            
            {/* Active Category Hero Card */}
            <div className="bg-[#0E0E10] border border-white/10 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4.5">
                <span className="text-5xl bg-[#0A0A0B] rounded-sm p-4 size-20 flex items-center justify-center border border-white/5">
                  {activeCategory.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-serif text-white mb-0.5">
                      {activeCategory.name}
                    </h2>
                    {activeCategory.isEmergency && (
                      <span className="bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-sm">
                        24/7 Priority
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                    {activeCategory.shortDescription}
                  </p>
                </div>
              </div>

              {/* Call-out action */}
              <div className="flex flex-col gap-2 shrink-0 justify-center">
                <button
                  id="book-category-all"
                  onClick={() => router.push(getViewHref('booking', { categoryId: activeCategory.id }))}
                  className="bg-transparent hover:bg-white/5 text-[#C5A059] border border-[#C5A059] font-bold font-mono uppercase tracking-widest text-[11px] px-6 py-3.5 rounded-sm shadow-lg transition-all"
                >
                  Draft Site Order
                </button>
              </div>
            </div>

            {/* Individual Sub-Service Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.services.map((service) => (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="bg-[#0E0E10] border border-white/5 hover:border-[#C5A059]/40 p-5 rounded-sm shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2.5 mb-2.5">
                      <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider leading-snug">
                        {service.name}
                      </h3>
                      <span className={`text-[9px] font-mono tracking-wider font-bold px-2 py-0.5 rounded-sm uppercase ${
                        service.urgency === 'emergency' 
                          ? 'bg-red-500/10 text-red-400'
                          : service.urgency === 'same-day'
                          ? 'bg-[#C5A059]/15 text-[#C5A059]'
                          : 'bg-white/5 text-white/60'
                      }`}>
                        {service.urgency}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed mb-4 font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-white/30 font-mono uppercase tracking-wider">Estimated Fee Allocation</p>
                      <p className="text-white font-mono font-bold text-sm">{service.estimatedPrice}</p>
                    </div>
                    <button
                      id={`book-service-${service.id}`}
                      onClick={() => router.push(getViewHref('booking', { categoryId: activeCategory.id, serviceId: service.id }))}
                      className="text-[10px] bg-transparent hover:bg-[#C5A059] hover:text-black border border-white/10 px-4 py-2.5 rounded-sm font-mono tracking-wider uppercase text-[#C5A059] transition-all cursor-pointer"
                    >
                      Draft Request
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* General Work Process Info Banner */}
            <div className="bg-[#050505] text-white rounded-sm p-6 border border-white/10 shadow-sm">
              <h3 className="font-mono text-xs text-[#C5A059] uppercase tracking-[0.15em] mb-4 border-b border-white/10 pb-3">
                🛡️ Elite Quality Assurance Criteria
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/60 font-light">
                <div className="space-y-1">
                  <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-1 flex items-center gap-1.5">
                    ✦ I. On-site Audit
                  </h4>
                  <p className="leading-relaxed text-white/40">
                    Our technician diagnoses on-site, explains required WRAS approved parts, and outlines fixed quote components before spanners turn.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-1 flex items-center gap-1.5">
                    ✦ II. Restored Clean Room
                  </h4>
                  <p className="leading-relaxed text-white/40">
                    We cover pathways, clean waste lines, and dry operational tiles. Zero tools, fluid traces, or debris remain.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-1 flex items-center gap-1.5">
                    ✦ III. Stress Calibration
                  </h4>
                  <p className="leading-relaxed text-white/40">
                    We validate line pressure at up to 1.5x standard usage thresholds, completing signed physical worksheets to secure your guarantee.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
