import Link from 'next/link';
import { BUSINESS_INFO, CERTIFICATIONS } from '../data';
import { getViewHref } from '../navigation';
import { ShieldCheck, Award, ThumbsUp, MapPin, Check, BookOpen } from 'lucide-react';

export function AboutView() {
  return (
    <div id="about-us-view" className="font-sans text-[#E5E7EB] bg-[#050505] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* About Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-[#FBBF24] font-mono uppercase tracking-[0.25em] block mb-2">Our Profile</span>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            Elite Craft, Absolute Compliance
          </h1>
          <p className="text-white/50 mt-3 text-xs sm:text-sm font-light">
            Elite Plumbing Services was established with a singular mission: to strip away the stress and uncertainty of residential maintenance and replace it with extreme precision.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              The Blueprint of Professionalism
            </h2>
            <div className="space-y-4 text-white/60 text-xs sm:text-sm leading-relaxed font-light">
              <p>
                We believe that premium craftsmanship isn't merely about sealing a joint or clearing a line. It is about a disciplined adherence to UK water sanitary advisory directives (WRAS), and preserving structural woodwork security. 
              </p>
              <p>
                All our site engineers undergo continuous validation criteria, are fully trained in thermal diagnostic methods, and carry standard license registration numbers on their identification plates under <strong className="text-[#FBBF24]">Gas Safe ID {BUSINESS_INFO.gasSafeReg}</strong>.
              </p>
              <p>
                Whether called for a simple mono-basin tap leak replacement or full-scale multi-unit commercial boiler installation, our vehicles roll out fully equipped with premium brass compression joints and copper tubes to execute lasting, robust solutions inside a single visit.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 font-mono text-[11px]">
              <div className="bg-[#0B1220] border border-white/10 rounded-sm px-5 py-3.5">
                <span className="text-xs font-bold text-white block">£5,000,000</span>
                <span className="text-[10px] text-white/40">Public Indemnity Insured</span>
              </div>
              <div className="bg-[#0B1220] border border-white/10 rounded-sm px-5 py-3.5">
                <span className="text-xs font-bold text-white block">No Surcharge</span>
                <span className="text-[10px] text-white/40">On Late Night Callouts</span>
              </div>
              <div className="bg-[#0B1220] border border-white/10 rounded-sm px-5 py-3.5">
                <span className="text-xs font-bold text-white block">100% Compliance</span>
                <span className="text-[10px] text-white/40">WRAS Advisory Materials</span>
              </div>
            </div>
          </div>

          {/* Graphical Trust Stat panel */}
          <div className="lg:col-span-5 bg-[#0B1220] text-[#E5E7EB] rounded-sm p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FBBF24] rounded-full blur-[100px] opacity-[0.07]"></div>
            
            <h3 className="font-mono text-xs text-[#FBBF24] mb-6 border-b border-white/10 pb-3 uppercase tracking-[0.15em]">
              Elite Engineering Pledges
            </h3>

            <div className="space-y-4 text-xs font-light">
              <div className="flex gap-3">
                <div className="bg-[#FBBF24]/10 text-[#FBBF24] p-1.5 rounded-sm h-8 w-8 shrink-0 flex items-center justify-center font-bold">
                  ✦
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide uppercase text-[11px] font-mono">Absolute Upfront Transparency</h4>
                  <p className="text-white/50 mt-1">If on-site inspection takes 15 minutes, we do not bill you unless standard materials are parsed.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-[#FBBF24]/10 text-[#FBBF24] p-1.5 rounded-sm h-8 w-8 shrink-0 flex items-center justify-center font-bold">
                  ✦
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide uppercase text-[11px] font-mono">Elite Clean Room Protocol</h4>
                  <p className="text-white/50 mt-1">We utilize specialized dust barrier screens and high-power wash systems to restore your workspace clean.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-[#FBBF24]/10 text-[#FBBF24] p-1.5 rounded-sm h-8 w-8 shrink-0 flex items-center justify-center font-bold">
                  ✦
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide uppercase text-[11px] font-mono">Guaranteed Workmanship Certificate</h4>
                  <p className="text-white/50 mt-1">Every installation carries standard signed 12-month Elite workmanship guarantees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications grid */}
        <div className="bg-[#0B1220] rounded-sm border border-white/10 p-6 md:p-10 mb-16 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-serif text-white">Accredited and Insured</h3>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-2">
              All certifications can be verified in real-time by checking registration databases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className="border border-white/5 bg-[#050505] p-5 rounded-sm">
                <Award className="h-7 w-7 text-[#FBBF24] mb-3" />
                <h4 className="font-bold text-sm text-white leading-snug uppercase tracking-wide">{cert.title}</h4>
                <p className="text-[10px] text-[#FBBF24] font-mono font-bold mt-1 uppercase tracking-wider">{cert.subtitle}</p>
                <p className="text-white/40 text-xs mt-3 leading-relaxed font-light">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Banner CTA */}
        <div className="bg-[#050505] rounded-sm text-white p-8 md:p-12 text-center md:text-left border border-[#FBBF24]/30 overflow-hidden relative">
          <div className="absolute bottom-0 right-0 opacity-5 font-serif text-8xl font-black transform translate-y-8 select-none text-[#FBBF24]">
            HWR
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
              <span className="text-[10px] border border-[#FBBF24]/20 text-[#FBBF24] bg-[#FBBF24]/10 px-3 py-1 font-mono tracking-widest rounded-sm uppercase">Work Protection Contract</span>
              <h3 className="text-2xl md:text-3.5xl font-serif mt-4 text-white leading-none">
                The 12-Month Elite Quality Guarantee
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mt-3 max-w-2xl font-light leading-relaxed">
                {BUSINESS_INFO.guaranteeText} If anything leaks or fails due to our setup, our team works to fix and balance it immediately at zero cost.
              </p>
            </div>
            <Link
              href={getViewHref('booking')}
              className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0B1220] font-bold uppercase tracking-widest font-mono text-xs py-3.5 px-8 rounded-sm shrink-0 shadow-lg cursor-pointer transition-all"
            >
              Request Fully Guarded Visit
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
