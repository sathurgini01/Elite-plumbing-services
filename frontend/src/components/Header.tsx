'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data';
import { getViewHref } from '../navigation';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const navClass = (path: string) => `hover:text-[#FBBF24] transition-colors cursor-pointer ${
    isActive(path) ? 'text-[#FBBF24] underline underline-offset-8 decoration-2 decoration-[#FBBF24]' : ''
  }`;

  return (
    <header id="app-header" className="bg-[#0B1220] border-b border-white/10 text-white sticky top-0 z-40 font-sans font-medium">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
        <Link
          id="logo-brand"
          href="/"
          onClick={closeMenus}
          className="brand-mark flex min-w-0 items-center gap-2.5 sm:gap-3 text-left focus:outline-none cursor-pointer group"
        >
          <div className="brand-tool-logo relative flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-sm bg-[#050505] border border-[#FBBF24]/50 shadow-md transition-transform group-hover:scale-105">
            <svg
              className="brand-tool-svg h-9 w-9 sm:h-11 sm:w-11"
              viewBox="0 0 120 120"
              role="img"
              aria-label="Elite Plumbers logo"
            >
              <defs>
                <linearGradient id="eliteGold" x1="18" y1="12" x2="104" y2="112" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A" />
                  <stop offset="0.48" stopColor="#FBBF24" />
                  <stop offset="1" stopColor="#0F4C81" />
                </linearGradient>
                <linearGradient id="eliteWater" x1="30" y1="28" x2="48" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4DD7FF" />
                  <stop offset="1" stopColor="#0876B2" />
                </linearGradient>
                <linearGradient id="eliteHeat" x1="77" y1="27" x2="92" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBBF24" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="eliteHeatInner" x1="84" y1="45" x2="91" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0B1220" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="100" height="100" rx="22" fill="#050505" />
              <path
                d="M60 12 L93 25 Q106 32 108 48 L108 72 Q106 88 93 95 L60 108 L27 95 Q14 88 12 72 L12 48 Q14 32 27 25 Z"
                fill="none"
                stroke="url(#eliteGold)"
                strokeWidth="7"
                strokeLinejoin="round"
              />
              <path
                d="M30 84 C42 75 48 68 48 56 L48 36 Q48 29 55 29 L68 29"
                fill="none"
                stroke="url(#eliteGold)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M34 35 C27 46 24 55 24 64 C24 75 31 82 39 82 C47 82 53 75 53 64 C53 54 45 43 34 35 Z"
                fill="url(#eliteWater)"
              />
              <path
                d="M88 31 C87 44 99 50 99 65 C99 76 91 84 82 84 C73 84 67 77 67 68 C67 59 72 51 78 44 C82 39 85 35 88 31 Z"
                fill="url(#eliteHeat)"
              />
              <path
                d="M86 51 C85 59 91 63 91 70 C91 76 87 80 82 80 C77 80 74 76 74 70 C74 64 79 59 82 55 C84 53 85 52 86 51 Z"
                fill="url(#eliteHeatInner)"
                opacity="0.9"
              />
              <text
                x="60"
                y="76"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="34"
                fontWeight="800"
                letterSpacing="-3"
                fill="#FBBF24"
              >
                EP
              </text>
              <path
                d="M36 91 H84"
                fill="none"
                stroke="url(#eliteGold)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="brand-mark-copy min-w-0">
            <div className="font-serif text-lg sm:text-2xl tracking-tight uppercase flex items-center gap-1.5 leading-none whitespace-nowrap">
              Elite <span className="text-[#FBBF24] font-bold">Plumbers</span>
            </div>
            <p className="brand-mark-subtitle text-[8px] sm:text-[10px] text-white/55 font-mono tracking-[0.2em] sm:tracking-widest uppercase whitespace-nowrap">24/7 Bespoke Engineering</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-xs tracking-widest uppercase font-semibold text-white/70">
          <Link id="nav-btn-home" href="/" className={navClass('/')}>
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              id="nav-btn-services-dropdown"
              href="/services"
              className={`flex items-center gap-1 hover:text-[#FBBF24] transition-colors cursor-pointer py-2 ${
                isActive('/services') ? 'text-[#FBBF24]' : ''
              }`}
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {servicesOpen && (
              <div
                id="mega-menu"
                className="absolute left-0 top-full mt-1 w-[480px] bg-[#0B1220] text-[#E5E7EB] p-5 rounded-sm shadow-2xl border border-white/10 grid grid-cols-2 gap-2 animate-in fade-in duration-200 z-50 animate-out fade-out"
              >
                <div className="col-span-2 pb-2 mb-2 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-widest">Our Services</span>
                  <Link
                    href="/services"
                    onClick={closeMenus}
                    className="text-[10px] text-white hover:text-[#FBBF24] transition-colors uppercase font-mono tracking-widest font-bold"
                  >
                    View All Services ➔
                  </Link>
                </div>
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={getViewHref('services', { categoryId: cat.id })}
                    onClick={closeMenus}
                    className="flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-left hover:bg-[#07162A] group transition-all"
                  >
                    <span className="bg-white/5 group-hover:bg-[#FBBF24]/10 p-1.5 rounded-sm text-lg transition-colors">{cat.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight group-hover:text-[#FBBF24] transition-colors">{cat.name}</p>
                      {cat.isEmergency && <span className="text-[9px] text-[#FBBF24] font-mono tracking-widest uppercase font-semibold">Priority Dispatch</span>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link id="nav-btn-about" href="/about" className={navClass('/about')}>
            About
          </Link>

          <Link id="nav-btn-areas" href="/areas" className={navClass('/areas')}>
            Areas Covered
          </Link>

          <Link id="nav-btn-faq" href="/#faq" className="hover:text-[#FBBF24] transition-colors cursor-pointer">
            FAQ
          </Link>

          <Link id="nav-btn-contact" href="/contact" className={navClass('/contact')}>
            Contact Us
          </Link>
        </nav>

        <button
          id="menu-toggle-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-[#0B1220] px-4 py-5 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeMenus}
              className={`text-left font-serif text-lg py-1 border-b border-white/10 ${
                isActive('/') ? 'text-[#FBBF24]' : 'text-white/80'
              }`}
            >
              Home
            </Link>

            <div className="space-y-2">
              <Link
                href="/services"
                onClick={closeMenus}
                className={`text-left font-serif text-lg py-1 w-full block border-b border-white/10 ${
                  isActive('/services') ? 'text-[#FBBF24]' : 'text-white/70'
                }`}
              >
                All Services
              </Link>
              <div className="grid grid-cols-2 gap-2 pl-3 pb-3 border-b border-white/10">
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={getViewHref('services', { categoryId: cat.id })}
                    onClick={closeMenus}
                    className="text-left text-xs text-white/55 hover:text-[#FBBF24] py-1.5 flex items-center gap-1.5"
                  >
                    <span>{cat.emoji}</span>
                    <span className="truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={closeMenus}
              className={`text-left font-serif text-lg py-1 border-b border-white/10 ${
                isActive('/about') ? 'text-[#FBBF24]' : 'text-white/80'
              }`}
            >
              About Company Standards
            </Link>

            <Link
              href="/areas"
              onClick={closeMenus}
              className={`text-left font-serif text-lg py-1 border-b border-white/10 ${
                isActive('/areas') ? 'text-[#FBBF24]' : 'text-white/80'
              }`}
            >
              Service Postcodes Covered
            </Link>

            <Link
              href="/#faq"
              onClick={closeMenus}
              className="text-left font-serif text-lg py-1 border-b border-white/10 text-white/80 hover:text-[#FBBF24]"
            >
              Plumbing FAQ
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className={`text-left font-serif text-lg py-1 border-b border-white/10 ${
                isActive('/contact') ? 'text-[#FBBF24]' : 'text-white/80'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
