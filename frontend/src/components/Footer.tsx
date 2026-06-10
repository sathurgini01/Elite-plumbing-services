import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, Shield, Star, Clock } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_CATEGORIES } from '../data';
import { getViewHref } from '../navigation';

export function Footer() {
  return (
    <footer id="app-footer" className="bg-[#0B1220] text-white border-t border-white/10 font-sans mt-auto">
      {/* Upper Footer Segment */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Col 1 - Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#FBBF24]/10 text-[#FBBF24] p-2 rounded-sm">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="font-serif text-lg text-white tracking-wider uppercase">ELITE PLUMBING</span>
          </div>
          <p className="text-xs text-white/55 leading-relaxed font-light">
            Gas Safe Registered (#{BUSINESS_INFO.gasSafeReg}) engineers providing pristine, fast-turnaround domestic and commercial repairs. Available 24 hours a day, 365 days a year.
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <Shield className="h-4 w-4 text-[#FBBF24] shrink-0" />
              <span>£5M Public Liability Insurance</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <Clock className="h-4 w-4 text-[#FBBF24] shrink-0" />
              <span>No Callout Fee • Free Quote</span>
            </div>
          </div>
        </div>

        {/* Col 2 - Quick Links */}
        <div>
          <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 border-l-2 border-[#FBBF24] pl-2 font-bold">
            Services
          </h3>
          <ul className="space-y-2.5 text-xs font-mono text-white/55">
            {SERVICE_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={getViewHref('services', { categoryId: cat.id })}
                  className="hover:text-[#FBBF24] transition-colors hover:underline cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-sm">{cat.emoji}</span>
                  <span className="uppercase tracking-wider text-[11px]">{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 - Navigation */}
        <div>
          <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 border-l-2 border-[#FBBF24] pl-2 font-bold">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-xs font-mono text-white/55 uppercase tracking-wider text-[10px]">
            <li>
              <Link href="/" className="hover:text-[#FBBF24] transition-colors hover:underline">
                Home Dashboard
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FBBF24] transition-colors hover:underline">
                Certifications & About
              </Link>
            </li>
            <li>
              <Link href="/areas" className="hover:text-[#FBBF24] transition-colors hover:underline">
                Postal Coverage
              </Link>
            </li>
            <li>
              <Link href="/booking" className="hover:text-[#FBBF24] transition-colors hover:underline">
                Booking Wizard
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FBBF24] transition-colors hover:underline">
                General Helpdesk
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 - Direct Contact */}
        <div>
          <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 border-l-2 border-[#FBBF24] pl-2 font-bold">
            Direct Line
          </h3>
          <ul className="space-y-3.5 text-xs font-mono">
            <li className="flex items-start gap-2.5">
              <Phone className="h-4.5 w-4.5 text-[#FBBF24] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-[#FBBF24] uppercase tracking-wider font-bold">24/7 Dispatch Desk</p>
                <a href={BUSINESS_INFO.phoneHref} className="text-white font-serif font-bold text-sm tracking-wide hover:underline hover:text-[#FBBF24] transition-colors mt-0.5 block">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-4.5 w-4.5 text-white/45 shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-white/45 uppercase tracking-wider font-bold">E-mail Inquiries</p>
                <a href={BUSINESS_INFO.emailHref} className="text-white/75 hover:text-[#FBBF24] hover:underline transition-colors mt-0.5 block truncate max-w-[180px] break-all">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4.5 w-4.5 text-white/45 shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] text-white/45 uppercase tracking-wider font-bold">Headquarters</p>
                <p className="text-white/60 font-light mt-0.5">London & Nearby Boroughs</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Under Footer Segment */}
      <div className="bg-[#07162A] text-white/55 text-xs py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/65 font-mono text-[10px] tracking-wider uppercase">
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <p className="text-[10px] text-white/35 mt-1.5 leading-normal font-light">
              Registered in England & Wales. VAT Reg No: {BUSINESS_INFO.vatReg}. Gas Safe Licensing Certificate No: {BUSINESS_INFO.gasSafeReg}. All materials used are fully compliant with UK Water Regulations Advisory details (WRAS).
            </p>
          </div>
          <div className="flex gap-4 text-[10px] uppercase font-mono tracking-wider">
            <Link href="/about" className="hover:text-[#FBBF24] transition-colors">
              Standards
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/areas" className="hover:text-[#FBBF24] transition-colors">
              Postal Areas
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/terms" className="hover:text-[#FBBF24] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
