import Link from 'next/link';
import { Phone, CheckCircle, Flame } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { getViewHref } from '../navigation';

export function EmergencyBar() {
  return (
    <div id="emergency-banner" className="bg-[#07162A] text-white border-b border-[#FBBF24]/20 font-sans text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center md:text-left">
          <span className="flex items-center gap-1.5 font-semibold text-[#FBBF24]">
            <span className="h-2 w-2 rounded-full bg-[#FBBF24] inline-block animate-pulse"></span>
            🚨 24/7 RAPID RESPONSE EMERGENCY
          </span>
          <span className="hidden sm:inline text-white/20" aria-hidden="true">|</span>
          <span className="flex items-center gap-1 text-white/65">
            <Flame className="h-3.5 w-3.5 text-[#FBBF24]" />
            Gas Safe ID: <strong className="font-mono font-medium text-white">{BUSINESS_INFO.gasSafeReg}</strong>
          </span>
          <span className="hidden md:inline text-white/20" aria-hidden="true">|</span>
          <span className="hidden md:flex items-center gap-1 text-[#FBBF24] font-mono text-xs">
            <CheckCircle className="h-3.5 w-3.5" /> 30-60 Min Response Local Plumbers
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            id="book-emergency-btn"
            href={getViewHref('booking', { isEmergency: true })}
            className="text-xs text-white/70 hover:text-[#FBBF24] font-mono tracking-wider uppercase transition-colors"
          >
            Dispatch Plumber Fast ➔
          </Link>
          <a
            id="emergency-phone-link"
            href={BUSINESS_INFO.phoneHref}
            className="flex items-center gap-1.5 rounded-sm bg-[#FBBF24] px-3 py-1 text-xs font-mono font-bold text-[#0B1220] border border-[#FBBF24] hover:bg-transparent hover:text-[#FBBF24] transition-all"
          >
            <Phone className="h-3.5 w-3.5" />
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
