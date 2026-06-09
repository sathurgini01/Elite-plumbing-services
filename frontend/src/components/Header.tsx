'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Wrench, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../data';
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

  const navClass = (path: string) => `hover:text-[#C5A059] transition-colors cursor-pointer ${
    isActive(path) ? 'text-[#C5A059] underline underline-offset-8 decoration-2 decoration-[#C5A059]' : ''
  }`;

  return (
    <header id="app-header" className="bg-[#0A0A0B] border-b border-white/10 text-white sticky top-0 z-40 font-sans font-medium">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          id="logo-brand"
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
        >
          <div className="bg-[#C5A059] text-black p-2.5 rounded-sm transition-transform group-hover:scale-105 shadow-md">
            <Wrench className="h-5.5 w-5.5 text-black" />
          </div>
          <div>
            <div className="font-serif text-2xl tracking-tight uppercase flex items-center gap-1.5 leading-none">
              Elite <span className="text-[#C5A059] font-bold">Plumbers</span>
            </div>
            <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">24/7 Bespoke Engineering</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs tracking-widest uppercase font-semibold text-white/60">
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
              className={`flex items-center gap-1 hover:text-[#C5A059] transition-colors cursor-pointer py-2 ${
                isActive('/services') ? 'text-[#C5A059]' : ''
              }`}
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {servicesOpen && (
              <div
                id="mega-menu"
                className="absolute left-0 top-full mt-1 w-[480px] bg-[#0E0E10] text-[#E0E0E0] p-5 rounded-sm shadow-2xl border border-white/10 grid grid-cols-2 gap-2 animate-in fade-in duration-200 z-50 animate-out fade-out"
              >
                <div className="col-span-2 pb-2 mb-2 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Our Services</span>
                  <Link
                    href="/services"
                    onClick={closeMenus}
                    className="text-[10px] text-white hover:text-[#C5A059] transition-colors uppercase font-mono tracking-widest font-bold"
                  >
                    View All Services ➔
                  </Link>
                </div>
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={getViewHref('services', { categoryId: cat.id })}
                    onClick={closeMenus}
                    className="flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-left hover:bg-[#141416] group transition-all"
                  >
                    <span className="bg-white/5 group-hover:bg-[#C5A059]/10 p-1.5 rounded-sm text-lg transition-colors">{cat.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight group-hover:text-[#C5A059] transition-colors">{cat.name}</p>
                      {cat.isEmergency && <span className="text-[9px] text-[#C5A059] font-mono tracking-widest uppercase font-semibold">Priority Dispatch</span>}
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
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a
            id="header-call-cta"
            href={BUSINESS_INFO.phoneHref}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase hover:text-[#C5A059] text-white/60 transition-colors"
          >
            <Phone className="h-4 w-4 text-[#C5A059]" />
            <span className="text-white/40">Direct:</span> {BUSINESS_INFO.phone}
          </a>
          <Link
            id="header-booking-cta"
            href="/booking"
            className="bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold uppercase text-[10px] tracking-widest px-6 py-3 transition-all rounded-sm shadow-md"
          >
            Book Priority Suite
          </Link>
        </div>

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
        <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-[#0D0D0E] px-4 py-5 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeMenus}
              className={`text-left font-serif text-lg py-1 border-b border-white/5 ${
                isActive('/') ? 'text-[#C5A059]' : 'text-white/80'
              }`}
            >
              Home
            </Link>

            <div className="space-y-2">
              <Link
                href="/services"
                onClick={closeMenus}
                className={`text-left font-serif text-lg py-1 w-full block border-b border-white/5 ${
                  isActive('/services') ? 'text-[#C5A059]' : 'text-white/60'
                }`}
              >
                All Services
              </Link>
              <div className="grid grid-cols-2 gap-2 pl-3 pb-3 border-b border-white/5">
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={getViewHref('services', { categoryId: cat.id })}
                    onClick={closeMenus}
                    className="text-left text-xs text-white/50 hover:text-[#C5A059] py-1.5 flex items-center gap-1.5"
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
              className={`text-left font-serif text-lg py-1 border-b border-white/5 ${
                isActive('/about') ? 'text-[#C5A059]' : 'text-white/80'
              }`}
            >
              About Company Standards
            </Link>

            <Link
              href="/areas"
              onClick={closeMenus}
              className={`text-left font-serif text-lg py-1 border-b border-white/5 ${
                isActive('/areas') ? 'text-[#C5A059]' : 'text-white/80'
              }`}
            >
              Service Postcodes Covered
            </Link>

            <div className="pt-3 flex flex-col gap-3">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="w-full text-center bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold uppercase tracking-wider py-3 text-xs font-mono flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" /> Call Priority: {BUSINESS_INFO.phone}
              </a>
              <Link
                href="/booking"
                onClick={closeMenus}
                className="w-full text-center border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 font-bold uppercase tracking-wider py-3 text-xs font-mono"
              >
                Book Priority Repair Wizard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
