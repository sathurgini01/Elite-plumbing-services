'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { POSTCODE_AREAS, BUSINESS_INFO } from '../data';
import { getViewHref } from '../navigation';
import { Search, Map, CheckCircle2, AlertTriangle, Phone, ShieldCheck, MapPin } from 'lucide-react';

const UK_POSTCODE_OR_PREFIX_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?(?:\s*\d[A-Z]{2})?$/i;

const locationGroups = [
  {
    title: 'West London',
    items: ['Kensington', 'Holland Park', 'Hammersmith', 'Ealing', 'Chiswick', 'Shepherds Bush', 'Bayswater', 'Notting Hill'],
  },
  {
    title: 'South West London',
    items: ['Chelsea', 'Fulham', 'Putney', 'Battersea', 'Barnes', 'Richmond', 'Clapham', 'Wandsworth', 'South Kensington', 'Wimbledon'],
  },
  {
    title: 'Central London',
    items: ['Mayfair', 'Westminster', 'Pimlico', 'Belgravia', 'Earls Court', 'Knightsbridge', 'Marylebone', 'Soho'],
  },
];

export function AreasCoveredView() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<{ code: string; area: string; covered: boolean } | null>(null);
  const [queryError, setQueryError] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();

    if (!cleanQuery || !UK_POSTCODE_OR_PREFIX_REGEX.test(cleanQuery)) {
      setQueryError('Enter a valid UK postcode or prefix, e.g. SW19 or SW19 1AA');
      setSearched(false);
      setResult(null);
      return;
    }

    // Search for matching postcode prefix
    // (e.g., matching "SW19" or if they type structural postcode like "SW19 1AA", extract prefix)
    const prefixMatch = cleanQuery.match(/^([A-Z]{1,2}[0-9][0-9A-Z]?)/);
    const prefix = prefixMatch ? prefixMatch[1] : cleanQuery;

    const matched = POSTCODE_AREAS.find(
      item => item.code.toUpperCase() === prefix || prefix.startsWith(item.code.toUpperCase())
    );

    setResult(matched || null);
    setQueryError('');
    setSearched(true);
  };

  return (
    <div id="coverage-view" className="font-sans text-[#E5E7EB] bg-[#050505] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Coverage Header info */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] text-[#FBBF24] font-mono uppercase tracking-[0.25em] block mb-2">Territory Coverage</span>
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight lead-tight">
            Areas We Cover Across London
          </h1>
          <p className="text-white/50 mt-3 text-xs sm:text-sm font-light">
            Fast, reliable plumbing and heating support across West, South West, Central, North, East, and South East London.
          </p>
        </div>

        {/* SEARCH WIDGET PANEL */}
        <div className="bg-[#0B1220] rounded-sm border border-white/10 p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-16">
          <h3 className="text-center font-mono text-xs uppercase tracking-widest mb-6 text-[#FBBF24]">
            ✦ Validate Coverage Postcode ✦
          </h3>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (searched) setSearched(false);
                if (queryError) setQueryError('');
              }}
              placeholder="e.g. SW19, E14, NW3, W1"
              className={`flex-1 rounded-sm border bg-[#050505] px-4 py-3 text-xs focus:outline-none focus:ring-1 uppercase tracking-widest font-mono text-[#E5E7EB] ${
                queryError
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                  : 'border-white/10 focus:border-[#FBBF24] focus:ring-[#FBBF24]'
              }`}
              aria-invalid={Boolean(queryError)}
              required
            />
            <button
              type="submit"
              className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0B1220] font-bold uppercase text-xs tracking-widest px-6 py-3.5 rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Search className="h-4 w-4" /> Check Coverage
            </button>
          </form>
          {queryError && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-mono text-red-500">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {queryError}
            </p>
          )}

          {/* DYNAMIC SEARCH REPORT SCREEN */}
          {searched && (
            <div className="mt-6 border-t border-white/10 pt-6 animate-in fade-in duration-200">
              {result ? (
                /* MATCH INSIDE COVERAGE */
                <div className="bg-[#050505] border border-[#FBBF24]/30 rounded-sm p-5 text-white">
                  <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                    <CheckCircle2 className="h-6 w-6 text-[#FBBF24] shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <strong className="font-bold text-white uppercase tracking-wider text-xs font-mono block">Validated • Active Priority Radius</strong>
                      <p className="mt-1 leading-relaxed text-white/60 text-xs font-light">
                        Postcode Prefix <strong className="font-bold text-[#FBBF24] font-mono">{result.code}</strong> ({result.area}) is within our fast dispatch zone.
                      </p>
                      
                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase font-mono">
                        <button
                          onClick={() => router.push(getViewHref('booking', { postcode: result.code }))}
                          className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0B1220] font-bold px-4 py-2 rounded-sm"
                        >
                          Request Fast Plumber
                        </button>
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          className="bg-transparent hover:bg-white/5 text-white font-bold px-4 py-2 rounded-sm border border-white/20"
                        >
                          Call office: {BUSINESS_INFO.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* OUT OF BOUNDS SEARCH REPORT */
                <div className="bg-[#050505] border border-white/10 rounded-sm p-5 text-white">
                  <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                    <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <strong className="font-bold text-amber-500 uppercase tracking-wider text-xs font-mono block">Out of standard dispatch zone</strong>
                      <p className="mt-1 leading-relaxed text-white/50 text-xs font-light">
                        Postcode "<strong className="text-[#FBBF24] font-mono">{query.toUpperCase()}</strong>" is outside our high-priority list. We can sometimes schedule gas audits or commercial boiler work here, but we cannot promise sub-60 response times.
                      </p>
                      <p className="font-light text-white/50 text-xs">
                        Please speak directly with our administrative coordinator to check availability.
                      </p>
                      <div className="mt-4">
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          className="bg-transparent hover:bg-white/5 text-[#FBBF24] border border-[#FBBF24]/20 font-bold px-5 py-2 rounded-sm inline-flex items-center gap-1.5 text-[10px] uppercase font-mono"
                        >
                          <Phone className="h-3.5 w-3.5" /> Direct desk: {BUSINESS_INFO.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FULL TERRITORIES DIRECTORY */}
        <section id="all-covered-locations" className="rounded-sm border border-white/10 bg-[#0B1220] p-6 md:p-10 shadow-2xl scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FBBF24]/10 text-[#FBBF24] p-3 rounded-sm inline-block">
                <Map className="h-7 w-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-white">
                West, South West & Central London
              </h2>
              <p className="text-white/55 text-xs sm:text-sm leading-relaxed font-light">
                Local engineers cover residential and commercial plumbing across priority postcode zones. If your area is listed below, you can book online or call for emergency availability.
              </p>
              <div className="space-y-2 rounded-sm border border-white/5 bg-[#050505] p-4 text-[11px] font-mono text-white/60">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#FBBF24] shrink-0 mt-0.5" />
                  <span>30-60m active response for leaks and burst pipes</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#FBBF24] shrink-0 mt-0.5" />
                  <span>Same-day scheduled work across active London zones</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-7">
              {locationGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-xl font-serif text-white">{group.title}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#050505] px-3.5 py-2 text-xs text-white/75 shadow-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FBBF24]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#FBBF24]">
              Active Postcode Prefixes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
              {POSTCODE_AREAS.map((item) => (
                <div 
                  key={item.code} 
                  className="hover:bg-white/5 border border-white/5 px-3.5 py-3 rounded-sm flex items-center justify-between transition-colors"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#FBBF24] block">{item.code}</span>
                    <span className="text-[10px] text-white/45 font-mono tracking-tight block truncate max-w-[150px] uppercase">{item.area}</span>
                  </div>
                  <span className="text-[9px] bg-[#FBBF24]/10 text-[#FBBF24] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
