'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Phone, 
  CalendarDays, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Wrench, 
  ChevronRight, 
  AlertTriangle 
} from 'lucide-react';
import { BUSINESS_INFO, SERVICE_CATEGORIES, TESTIMONIALS } from '../data';
import { ViewState } from '../types';
import { getViewHref } from '../navigation';

export function HomeView() {
  const router = useRouter();
  // Quick quote selector form state
  const [quickCat, setQuickCat] = useState('');
  const [quickPostcode, setQuickPostcode] = useState('');
  const [postcodeError, setPostcodeError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: 'Do plumbers deal with heating?',
      answer: 'Yes. Our Gas Safe registered engineers work on heating systems, radiators, hot water faults, boilers, bathroom pipework, kitchens, and general plumbing repairs.',
    },
    {
      question: 'Do you charge a call out fee?',
      answer: 'No. We provide clear pricing before work begins, and our standard policy is no separate call-out fee for booked visits inside our active London service area.',
    },
    {
      question: 'How quickly can your plumbing company send out an engineer?',
      answer: 'For emergency plumbing issues such as burst pipes, flooding, or no hot water, our target response is usually 30-60 minutes depending on postcode and engineer availability.',
    },
    {
      question: 'What should I do if I get a water leak?',
      answer: 'Turn off your stopcock if it is safe, switch off nearby electrics, move valuables away from the leak, and call our emergency line so an engineer can isolate and repair the fault.',
    },
    {
      question: 'Can I book non-emergency plumbing work?',
      answer: 'Yes. You can book scheduled repairs, installations, inspections, radiator work, drainage jobs, bathroom plumbing, kitchen plumbing, and landlord maintenance through the booking form.',
    },
  ];

  const navigate = (view: ViewState, params?: Record<string, unknown>) => {
    router.push(getViewHref(view, params));
  };

  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation of UK postcode format
    const trimmed = quickPostcode.trim().toUpperCase();
    if (trimmed.length < 2) {
      setPostcodeError('Please enter a valid postcode prefix');
      return;
    }

    setPostcodeError('');
    navigate('booking', {
      categoryId: quickCat,
      postcode: trimmed
    });
  };

  return (
    <div id="home-view-container" className="font-sans bg-[#0A0A0B] text-[#E0E0E0]">
      {/* SECTION 1: HERO SECTION & QUICK ESTIMATOR */}
      <section id="hero-banner" className="relative bg-[#0A0A0B] overflow-hidden text-white py-16 md:py-24 border-b border-white/10">
        {/* Decorative Grid SVG in background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Subtle golden glowing decoration bubble */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A059] rounded-full blur-[140px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div id="trust-pill" className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/20 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059]">
                <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                ★ Est. 1984 • London • 24/7 Priority
              </div>

              <h1 id="hero-title" className="hero-title text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.1] text-white">
                <span className="hero-title-line">
                  <span className="hero-word">The</span>{' '}
                  <span className="hero-word hero-word-delay-1">Art</span>{' '}
                  <span className="hero-word hero-word-delay-2">of</span>
                </span>
                <br />
                <span className="hero-word hero-word-gold hero-word-delay-3 italic text-[#C5A059]">Perfected</span>{' '}
                <span className="hero-word hero-word-delay-4">Flow.</span>
              </h1>
              
              <p id="hero-subtitle" className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-light">
                Providing bespoke plumbing solutions and high-end emergency service for London's premium residences, commercial properties, and historic landmarks.
              </p>

              <div id="hero-ctas" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold uppercase text-xs tracking-widest px-8 py-4 shadow-2xl transition-all rounded-sm flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Priority Line: {BUSINESS_INFO.phone}
                </a>
                <button
                  onClick={() => navigate('booking')}
                  className="bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold uppercase text-xs tracking-widest px-8 py-4 transition-all rounded-sm flex items-center justify-center gap-2"
                >
                  <CalendarDays className="h-4.5 w-4.5 text-[#C5A059]" />
                  Request Service Audit
                </button>
              </div>

              <div id="hero-badges" className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 w-full max-w-lg">
                <div>
                  <p className="text-2xl font-serif text-[#C5A059]">30-60m</p>
                  <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-1">Response Guarantee</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-[#C5A059]">£0.00</p>
                  <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-1">Diagnostics Charge</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-[#C5A059]">100%</p>
                  <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-1">Master Workmanship</p>
                </div>
              </div>
            </div>

            {/* Right Widget Form */}
            <div id="quick-calc-widget" className="lg:col-span-4 lg:col-start-9 bg-[#0D0D0E] rounded-sm p-6 sm:p-8 shadow-2xl text-[#E0E0E0] border border-white/10">
              <h2 className="text-xl font-serif text-white">
                Bespoke Site Audit
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[#C5A059] mt-1 mb-6 uppercase">
                Instant reservation in 2 minutes
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-wider font-bold text-white/60 uppercase mb-1.5">
                    What service is required?
                  </label>
                  <select
                    id="quick-cat-select"
                    value={quickCat}
                    onChange={(e) => setQuickCat(e.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-[#050505] px-3 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-mono tracking-wide text-[#E0E0E0]"
                    required
                  >
                    <option value="">-- Choose Category --</option>
                    {SERVICE_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-black text-[#E0E0E0]">
                        {cat.emoji} {cat.name} {cat.isEmergency ? '(Emergency)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-wider font-bold text-white/60 uppercase mb-1.5">
                    Service Postcode
                  </label>
                  <input
                    id="quick-postcode-input"
                    type="text"
                    value={quickPostcode}
                    onChange={(e) => {
                      setQuickPostcode(e.target.value);
                      if (postcodeError) setPostcodeError('');
                    }}
                    placeholder="e.g. SW19, E1, NW3, W1"
                    className="w-full rounded-sm border border-white/10 bg-[#050505] px-3 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-mono uppercase tracking-widest text-[#E0E0E0]"
                    required
                  />
                  {postcodeError && (
                    <p className="text-amber-500 text-xs mt-1.5 font-mono flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      {postcodeError}
                    </p>
                  )}
                </div>

                <div className="bg-[#050505] rounded-sm p-4 text-[11px] text-white/50 leading-relaxed mb-2 border border-white/5">
                  <p className="font-mono text-[#C5A059] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" /> No-obligation Pricing
                  </p>
                  Retrieve specifications and immediate scheduling alternatives with no pre-payments.
                </div>

                <button
                  id="quote-submit-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#b08e4d] py-3.5 text-xs tracking-widest uppercase font-mono font-bold text-black transition-all cursor-pointer shadow-lg"
                >
                  Proceed to Estimates <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GAS SAFE / TRUST CREDIT STRIP */}
      <section id="trust-strip" className="bg-[#050505] border-b border-white/10 py-8 text-white/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-8 text-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif text-[#C5A059]">4.9★</span>
            <div className="text-left font-mono">
              <div className="flex text-[#C5A059] h-3 items-center">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
              </div>
              <p className="text-[9px] text-[#C5A059] tracking-widest uppercase mt-1">Trustpilot Excellence</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[#C5A059]" />
            <div className="text-left">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Gas Safe Certified</p>
              <p className="text-[10px] text-white/40 font-mono tracking-widest">REGISTRATION # {BUSINESS_INFO.gasSafeReg}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <Wrench className="h-8 w-8 text-[#C5A059]" />
            <div className="text-left">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Zero Call-Out Fee</p>
              <p className="text-[10px] text-white/40 font-mono tracking-widest">DIRECT COMPLIANCE GUARANTEE</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES GRID OVERVIEW */}
      <section id="homepage-services" className="bg-[#0A0A0B] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] text-[#C5A059] font-mono uppercase tracking-[0.25em] block mb-2">Our Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Elite Trade Engineering
            </h2>
            <p className="text-white/50 mt-4 text-xs sm:text-sm font-light leading-relaxed">
              Serving our partners with unparalleled precision. Review our service catalog, typical fee allocations, or dispatch direct support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                id={`cat-card-${cat.id}`}
                className="group border border-white/10 rounded-sm p-6 transition-all duration-300 hover:border-[#C5A059]/40 bg-[#0E0E10]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl bg-white/5 group-hover:bg-[#C5A059]/10 rounded-sm p-3 size-14 flex items-center justify-center transition-colors">
                    {cat.emoji}
                  </div>
                  {cat.isEmergency ? (
                    <span className="bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-sm uppercase">
                      24/7 Rapid Response
                    </span>
                  ) : (
                    <span className="bg-white/5 text-white/60 text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-sm uppercase">
                      Scheduled Suite
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#C5A059] transition-colors uppercase tracking-wider">
                  {cat.name}
                </h3>
                
                <p className="text-white/50 text-xs leading-relaxed mt-2.5 pb-4 border-b border-white/5 flex-grow font-light">
                  {cat.shortDescription}
                </p>

                {/* List typical services */}
                <div className="my-4 space-y-1.5 font-mono text-[11px]">
                  {cat.services.slice(0, 3).map((serv) => (
                    <div key={serv.id} className="flex items-center justify-between text-white/60">
                      <span className="truncate max-w-[180px]">• {serv.name}</span>
                      <span className="text-[#C5A059]/70 font-semibold">{serv.estimatedPrice}</span>
                    </div>
                  ))}
                </div>

                <button
                  id={`cat-explore-${cat.id}`}
                  onClick={() => navigate('services', { categoryId: cat.id })}
                  className="w-full flex items-center justify-between text-[11px] font-mono tracking-wider uppercase font-bold text-[#C5A059] hover:text-[#b08e4d] pt-3 border-t border-white/5"
                >
                  <span>Select Suite Details</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              id="cta-all-services"
              onClick={() => navigate('services')}
              className="bg-transparent text-white border border-[#C5A059]/40 hover:bg-[#C5A059]/10 text-xs tracking-widest font-mono uppercase font-bold px-8 py-4 transition-all"
            >
              Browse Full Engineering Matrix
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US (BENTO INSPIRED) */}
      <section id="why-choose-us" className="bg-[#050505] py-20 text-[#E0E0E0] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Story segment */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] text-[#C5A059] font-mono uppercase tracking-[0.3em] block">Company Legacy</span>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white">
                Bespoke Plumbing <br />
                <span className="italic text-[#C5A059]">Perfected</span>.
              </h2>
              <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                Elite Plumbing Services is defined by master craftsmen, premium technology, and flawless execution. Every team member passes meticulous background and technical validations.
              </p>
              
              <ul className="space-y-3 font-mono text-[11px] text-white/70">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[#C5A059]" />
                  <span>Licensed Gas Safe engineering team</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[#C5A059]" />
                  <span>Full £5,000,000 public liability guarantee</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[#C5A059]" />
                  <span>Always transparent fixed client layouts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[#C5A059]" />
                  <span>Exclusive 12-month workmanship assurance</span>
                </li>
              </ul>

              <div className="mt-8 bg-[#0D0D0E] border border-white/10 rounded-sm p-5 flex items-center gap-4">
                <div className="bg-[#C5A059]/10 p-2.5 rounded-sm text-[#C5A059]">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">Active Dispatch Priority</h4>
                  <p className="text-xs text-white/50 mt-0.5 font-light">Average dispatch time currently clocked at <strong className="text-[#C5A059] font-mono">34 minutes</strong>.</p>
                </div>
              </div>
            </div>

            {/* Right bento items */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0E0E10] border border-white/5 rounded-sm p-6 flex flex-col justify-between h-48">
                <Wrench className="h-7 w-7 text-[#C5A059] mb-4" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-[0.1em] text-white">I. Precision Diagnostics</h3>
                  <p className="text-xs text-white/40 tracking-normal leading-relaxed mt-1 font-light">
                    Locating internal structural stress and micro-leaks via custom endoscopic feeds and wave detectors.
                  </p>
                </div>
              </div>

              <div className="bg-[#0E0E10] border border-white/5 rounded-sm p-6 flex flex-col justify-between h-48">
                <ShieldCheck className="h-7 w-7 text-[#C5A059] mb-4" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-[0.1em] text-white">II. Full Compliance</h3>
                  <p className="text-xs text-white/40 tracking-normal leading-relaxed mt-1 font-light">
                    Every audit includes complete mechanical safety diagnostics and stopcock flow speed validations.
                  </p>
                </div>
              </div>

              <div className="bg-[#0E0E10] border border-white/5 rounded-sm p-6 flex flex-col justify-between h-48">
                <Clock className="h-7 w-7 text-[#C5A059] mb-4" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-[0.1em] text-white">III. Uninterrupted Support</h3>
                  <p className="text-xs text-white/40 tracking-normal leading-relaxed mt-1 font-light">
                    No holiday markups. Our direct dispatchers operate 24 hours daily with zero premium weekend escalations.
                  </p>
                </div>
              </div>

              <div className="bg-[#0E0E10] border border-white/5 rounded-sm p-6 flex flex-col justify-between h-48">
                <Star className="h-7 w-7 text-[#C5A059] mb-4" />
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-[0.1em] text-white">IV. Elite Guarantee</h3>
                  <p className="text-xs text-white/40 tracking-normal leading-relaxed mt-1 font-light">
                    Every hardware fitting is warrantied for a full calendar year. Flawless longevity is our standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL TESTIMONIAL CAROUSEL */}
      <section id="reviews-carousel" className="bg-[#0A0A0B] py-20 text-[#E0E0E0] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] text-[#C5A059] font-mono tracking-[0.25em] uppercase block mb-2">Property Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Bespoke Validation
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-3 font-light leading-relaxed">
              Meticulous reviews from historic estates, developers, and local residences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((test, index) => (
              <div 
                key={index} 
                className="bg-[#0E0E10] border border-white/5 p-6 rounded-sm shadow-sm hover:border-white/10 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-[#C5A059] mb-4 items-center">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/70 italic text-sm leading-relaxed mb-6 font-light">
                    "{test.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono">
                  <div>
                    <h4 className="text-white font-bold tracking-wide">{test.name}</h4>
                    <p className="text-white/40 font-light mt-0.5">{test.location}</p>
                  </div>
                  <span className="text-white/30 tracking-widest text-[10px] uppercase">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#0E0E10] border border-white/15 rounded-sm p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <span className="bg-[#C5A059]/10 p-2.5 rounded-sm text-[#C5A059] text-lg">✦</span>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">Audit a Property</h4>
                <p className="text-xs text-white/50 font-light mt-0.5">We coordinate direct secure slots with tenants or owners.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('booking')}
              className="bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold uppercase tracking-widest text-[11px] px-6 py-3.5 rounded-sm transition-all shadow-md whitespace-nowrap"
            >
              Order Suite Audit ➔
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: PLUMBING FAQ */}
      <section id="faq" className="bg-[#0A0A0B] py-20 text-[#E0E0E0] border-b border-white/10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] text-[#C5A059] font-mono tracking-[0.25em] uppercase block mb-2">
              Client Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Plumbing FAQs
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-3 font-light leading-relaxed">
              Clear answers for emergency callouts, heating faults, leaks, and scheduled plumbing work.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-[#0E0E10] border border-white/10 rounded-sm shadow-xl">
            <div className="divide-y divide-white/10">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question} className="px-5 sm:px-8">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-base md:text-xl font-serif leading-snug transition-colors ${
                        isOpen ? 'text-[#C5A059]' : 'text-white group-hover:text-[#C5A059]'
                      }`}>
                        {faq.question}
                      </span>
                      <span className={`h-9 w-9 rounded-sm border flex items-center justify-center text-2xl leading-none font-light shrink-0 transition-all ${
                        isOpen
                          ? 'border-[#C5A059] bg-[#C5A059] text-black'
                          : 'border-white/10 bg-[#050505] text-[#C5A059] group-hover:border-[#C5A059]/50'
                      }`}>
                        {isOpen ? '-' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="pb-7 text-xs sm:text-sm leading-7 text-white/55 font-light max-w-4xl">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FLOOD RESPONSIVE CALL TO ACTION BANNER */}
      <section id="hompeage-emergency-cta" className="bg-[#050505] text-[#E0E0E0] py-16 text-center relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <circle cx="20%" cy="50%" r="20%" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="80%" cy="20%" r="40%" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif text-white">
            Uninterrupted Service
          </h2>
          <p className="text-white/50 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Do not let fluid micro-integrity failure compromise your premises. Connect immediately with our emergency desk.
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-3 rounded-sm bg-[#C5A059] text-black px-10 py-5 text-lg md:text-xl font-mono font-bold tracking-wider hover:bg-[#b08e4d] transition-all cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              {BUSINESS_INFO.phone}
            </a>
            <p className="text-[10px] tracking-widest uppercase text-white/30 font-mono mt-2">
              Rated 5.0 for Excellence • No Dispatch Surcharge
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
