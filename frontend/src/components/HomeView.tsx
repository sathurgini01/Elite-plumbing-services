import Image from 'next/image';
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
  MapPin 
} from 'lucide-react';
import { BUSINESS_INFO, SERVICE_CATEGORIES, TESTIMONIALS } from '../data';
import { getServiceCategoryHref } from '../seo';

const defaultServiceCardTheme = {
  card: 'border-white/10 bg-[#0B1220] hover:border-[#FBBF24]/35',
  icon: 'bg-white/5 group-hover:bg-[#FBBF24]/10',
  title: 'group-hover:text-[#FBBF24]',
  action: 'text-[#FBBF24] hover:text-[#F59E0B]',
};

const serviceCardThemes: Record<string, typeof defaultServiceCardTheme> = {
  'emergency-plumbing': {
    card: 'border-red-500/20 bg-[#1A0808] hover:border-red-400/45',
    icon: 'bg-red-500/10 group-hover:bg-red-500/20',
    title: 'group-hover:text-red-300',
    action: 'text-red-300 hover:text-red-200',
  },
  'boiler-heating': {
    card: 'border-orange-500/20 bg-[#1A1006] hover:border-orange-400/45',
    icon: 'bg-orange-500/10 group-hover:bg-orange-500/20',
    title: 'group-hover:text-orange-300',
    action: 'text-orange-300 hover:text-orange-200',
  },
  'drainage-services': {
    card: 'border-cyan-500/20 bg-[#06161A] hover:border-cyan-400/45',
    icon: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    title: 'group-hover:text-cyan-300',
    action: 'text-cyan-300 hover:text-cyan-200',
  },
  'leak-detection': {
    card: 'border-sky-500/25 bg-[#061321] hover:border-sky-400/50',
    icon: 'bg-sky-500/15 group-hover:bg-sky-500/25',
    title: 'group-hover:text-sky-300',
    action: 'text-sky-300 hover:text-sky-200',
  },
  'bathroom-plumbing': {
    card: 'border-violet-500/20 bg-[#130B1F] hover:border-violet-400/45',
    icon: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    title: 'group-hover:text-violet-300',
    action: 'text-violet-300 hover:text-violet-200',
  },
  'kitchen-plumbing': {
    card: 'border-teal-500/20 bg-[#071A18] hover:border-teal-400/45',
    icon: 'bg-teal-500/10 group-hover:bg-teal-500/20',
    title: 'group-hover:text-teal-300',
    action: 'text-teal-300 hover:text-teal-200',
  },
  'gas-services': {
    card: 'border-amber-500/25 bg-[#1C1204] hover:border-amber-400/50',
    icon: 'bg-amber-500/15 group-hover:bg-amber-500/25',
    title: 'group-hover:text-amber-300',
    action: 'text-amber-300 hover:text-amber-200',
  },
  'pipework-services': {
    card: 'border-slate-400/20 bg-[#111827] hover:border-slate-300/45',
    icon: 'bg-slate-400/10 group-hover:bg-slate-400/20',
    title: 'group-hover:text-slate-200',
    action: 'text-slate-300 hover:text-white',
  },
  'property-landlord': {
    card: 'border-emerald-500/20 bg-[#07180F] hover:border-emerald-400/45',
    icon: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    title: 'group-hover:text-emerald-300',
    action: 'text-emerald-300 hover:text-emerald-200',
  },
  'commercial-plumbing': {
    card: 'border-indigo-500/20 bg-[#0D1024] hover:border-indigo-400/45',
    icon: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
    title: 'group-hover:text-indigo-300',
    action: 'text-indigo-300 hover:text-indigo-200',
  },
  others: {
    card: 'border-zinc-400/20 bg-[#151515] hover:border-zinc-300/45',
    icon: 'bg-zinc-400/10 group-hover:bg-zinc-400/20',
    title: 'group-hover:text-zinc-200',
    action: 'text-zinc-300 hover:text-white',
  },
};

export function HomeView() {
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

  return (
    <div id="home-view-container" className="font-sans bg-[#050505] text-[#E5E7EB]">
      {/* SECTION 1: FULL SCREEN HERO */}
      <section id="hero-banner" className="relative min-h-[calc(100vh-76px)] bg-[#050505] overflow-hidden text-white border-b border-white/10">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/homepage-hero-van-mobile.jpg" />
          <img
            src="/images/homepage-hero-van.jpg"
            alt="Dark plumbing service van parked on a London residential street"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/5 pointer-events-none"></div>
        <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none"></div>
        {/* Decorative Grid SVG in background */}
        <div className="absolute inset-0 text-white opacity-[0.035] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 min-h-[calc(100vh-76px)] flex items-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Narrative */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-6">
              <div id="trust-pill" className="inline-flex items-center gap-2 rounded-sm bg-black/40 border border-[#FBBF24]/35 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#FBBF24] backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#FBBF24] animate-pulse"></span>
                ★ Est. 1984 • London • 24/7 Priority
              </div>

              <h1 id="hero-title" className="hero-title text-5xl sm:text-6xl lg:text-8xl font-serif leading-[1.05] text-white max-w-4xl">
                <span className="hero-title-line">
                  <span className="hero-word">The</span>{' '}
                  <span className="hero-word hero-word-delay-1">Art</span>{' '}
                  <span className="hero-word hero-word-delay-2">of</span>
                </span>
                <br />
                <span className="hero-word hero-word-yellow hero-word-delay-3 italic text-[#FBBF24]">Perfected</span>{' '}
                <span className="hero-word hero-word-delay-4">Flow.</span>
              </h1>
              
              <p id="hero-subtitle" className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-light">
                Providing bespoke plumbing solutions and high-end emergency service for London's premium residences, commercial properties, and historic landmarks.
              </p>

              <div id="hero-ctas" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0B1220] font-bold uppercase text-xs tracking-widest px-8 py-4 shadow-2xl transition-all rounded-sm flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Priority Line: {BUSINESS_INFO.phone}
                </a>
                <a
                  href="/booking"
                  className="bg-[#0B1220] hover:bg-[#07162A] text-white border border-white/15 font-bold uppercase text-xs tracking-widest px-8 py-4 transition-all rounded-sm flex items-center justify-center gap-2"
                >
                  <CalendarDays className="h-4.5 w-4.5 text-[#FBBF24]" />
                  Book a Plumbing Visit
                </a>
                <a
                  href="/plumber/register"
                  className="bg-black/45 hover:bg-[#07162A] text-white border border-[#FBBF24]/35 font-bold uppercase text-xs tracking-widest px-8 py-4 transition-all rounded-sm flex items-center justify-center gap-2"
                >
                  <Wrench className="h-4.5 w-4.5 text-[#FBBF24]" />
                  Work as Plumber
                </a>
              </div>

              <div id="hero-badges" className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 w-full max-w-lg">
                <div>
                  <p className="text-2xl font-serif text-[#FBBF24]">30-60m</p>
                  <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase mt-1">Response Guarantee</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-[#FBBF24]">£0.00</p>
                  <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase mt-1">Diagnostics Charge</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-[#FBBF24]">100%</p>
                  <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase mt-1">Master Workmanship</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 hidden max-w-xs rounded-sm border border-white/15 bg-black/55 p-4 text-white shadow-2xl backdrop-blur-md lg:block">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FBBF24]">
            London Mobile Workshop
          </p>
          <p className="mt-1 text-xs leading-5 text-white/65">
            Fully equipped service vans for rapid pipework, leak, and heating response.
          </p>
        </div>
      </section>

      {/* SECTION 2: GAS SAFE / TRUST CREDIT STRIP */}
      <section id="trust-strip" className="bg-[#050505] border-b border-white/10 py-8 text-white/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-8 text-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-serif text-[#FBBF24]">4.9★</span>
            <div className="text-left font-mono">
              <div className="flex text-[#FBBF24] h-3 items-center">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
              </div>
              <p className="text-[9px] text-[#FBBF24] tracking-widest uppercase mt-1">Trustpilot Excellence</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[#FBBF24]" />
            <div className="text-left">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Gas Safe Certified</p>
              <p className="text-[10px] text-white/60 font-mono tracking-widest">REGISTRATION # {BUSINESS_INFO.gasSafeReg}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <Wrench className="h-8 w-8 text-[#FBBF24]" />
            <div className="text-left">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Zero Call-Out Fee</p>
              <p className="text-[10px] text-white/60 font-mono tracking-widest">DIRECT COMPLIANCE GUARANTEE</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES GRID OVERVIEW */}
      <section id="homepage-services" className="bg-[#050505] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] text-[#FBBF24] font-mono uppercase tracking-[0.25em] block mb-2">Our Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Elite Trade Engineering
            </h2>
            <p className="text-white/50 mt-4 text-xs sm:text-sm font-light leading-relaxed">
              Reliable plumbing, heating, drainage, and maintenance support for homes, landlords, and commercial sites across London.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((cat) => {
              const theme = serviceCardThemes[cat.id] ?? defaultServiceCardTheme;

              return (
              <div
                key={cat.id}
                id={`cat-card-${cat.id}`}
                className={`group border rounded-sm p-6 transition-all duration-300 ${theme.card}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-4xl rounded-sm p-3 size-14 flex items-center justify-center transition-colors ${theme.icon}`}>
                    {cat.emoji}
                  </div>
                  {cat.isEmergency ? (
                    <span className="bg-[#FBBF24]/10 text-[#FBBF24] text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-sm uppercase">
                      24/7 Rapid Response
                    </span>
                  ) : (
                    <span className="bg-white/5 text-white/60 text-[9px] font-mono tracking-wider px-2.5 py-1 rounded-sm uppercase">
                      Scheduled Suite
                    </span>
                  )}
                </div>

                <h3 className={`text-base font-bold text-white transition-colors uppercase tracking-wider ${theme.title}`}>
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
                      <span className="text-[#FBBF24] font-semibold">{serv.estimatedPrice}</span>
                    </div>
                  ))}
                </div>

                <a
                  id={`cat-explore-${cat.id}`}
                  href={getServiceCategoryHref(cat)}
                  className={`w-full flex items-center justify-between text-[11px] font-mono tracking-wider uppercase font-bold pt-3 border-t border-white/5 ${theme.action}`}
                >
                  <span>Select Suite Details</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              id="cta-all-services"
              href="/services"
              className="bg-[#0B1220] text-white border border-white/15 hover:bg-[#07162A] text-xs tracking-widest font-mono uppercase font-bold px-8 py-4 transition-all"
            >
              View All Plumbing Services
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section id="why-choose-us" className="bg-[#050505] py-20 text-[#E5E7EB] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <span className="text-[10px] text-[#FBBF24] font-mono uppercase tracking-[0.3em] block mb-3">Bespoke Plumbing Perfected</span>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white">
                Why choose us
              </h2>
              <div className="mt-5 h-1 w-24 bg-[#FBBF24]"></div>

              <div className="mt-9 space-y-7">
                {[
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: '24/7 availability',
                    text: 'Our dispatch desk is open day and night for emergency plumbing, heating faults, and urgent property maintenance.',
                  },
                  {
                    icon: <CheckCircle className="h-6 w-6" />,
                    title: 'Clear & upfront pricing',
                    text: 'We explain the work, confirm the estimate, and agree pricing before repairs begin.',
                  },
                  {
                    icon: <Star className="h-6 w-6" />,
                    title: 'Trusted London engineers',
                    text: 'Gas Safe registered plumbers with insured workmanship and careful clean-up after every visit.',
                  },
                  {
                    icon: <Wrench className="h-6 w-6" />,
                    title: 'Fast response time',
                    text: 'Emergency jobs are prioritised to the closest available engineer, with typical arrival in 30-60 minutes where possible.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#FBBF24]/50 bg-[#FBBF24]/10 text-[#FBBF24]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/55 font-light">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/booking"
                className="mt-10 inline-flex rounded-sm bg-[#FBBF24] px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#0B1220] transition hover:bg-[#F59E0B]"
              >
                Book Now
              </a>
            </div>

            <div className="relative min-h-[420px] lg:col-span-6 overflow-hidden rounded-sm border border-white/10 shadow-2xl">
              <Image
                src="/images/why-choose-quality-plumbing.jpg"
                alt="Professional plumber inspecting premium pipework and heating controls"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center brightness-[1.12] contrast-[1.06] saturate-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/45 via-transparent to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#FBBF24]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: AREAS COVERED PREVIEW */}
      <section id="homepage-areas-preview" className="bg-[#050505] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-hidden rounded-sm border border-white/10 bg-[#0B1220] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative min-h-[300px] lg:col-span-6">
                <Image
                  src="/images/areas-covered-london-plumber.jpg"
                  alt="Professional London plumber checking service coverage outside a townhouse"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center brightness-[1.05] contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/65 via-transparent to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#FBBF24]"></div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-[10px] text-[#FBBF24] font-mono uppercase tracking-[0.25em] block mb-3">
                  Areas Covered
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                  We serve major London boroughs
                </h2>
                <div className="mt-5 h-1 w-24 bg-[#FBBF24]"></div>
                <p className="mt-6 text-sm leading-7 text-white/55 font-light max-w-xl">
                  Fast plumbing and heating visits across West, South West, Central, North, East, and South East London postcode zones.
                </p>

                <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Kensington', 'Fulham', 'Westminster', 'Clapham', 'Wandsworth', 'Greenwich'].map((area) => (
                    <span key={area} className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#050505] px-3 py-2 text-xs text-white/70">
                      <MapPin className="h-3.5 w-3.5 text-[#FBBF24]" />
                      {area}
                    </span>
                  ))}
                </div>

                <a
                  href="/areas"
                  className="mt-9 inline-flex w-fit items-center gap-2 rounded-sm bg-[#FBBF24] px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#0B1220] transition hover:bg-[#F59E0B]"
                >
                  View All Locations <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REAL TESTIMONIAL CAROUSEL */}
      <section id="reviews-carousel" className="bg-[#050505] py-20 text-[#E5E7EB] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] text-[#FBBF24] font-mono tracking-[0.25em] uppercase block mb-2">Customer Reviews</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Trusted by London Customers
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-3 font-light leading-relaxed">
              Real feedback from emergency repairs, landlord maintenance, and scheduled plumbing visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((test, index) => (
              <div 
                key={index} 
                className="bg-[#0B1220] border border-white/5 p-6 rounded-sm shadow-sm hover:border-white/10 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-[#FBBF24] mb-4 items-center">
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
                    <p className="text-white/60 font-light mt-0.5">{test.location}</p>
                  </div>
                  <span className="text-white/60 tracking-widest text-[10px] uppercase">{test.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#0B1220] border border-white/15 rounded-sm p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <span className="bg-[#FBBF24]/10 p-2.5 rounded-sm text-[#FBBF24] text-lg">✦</span>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-white">Audit a Property</h4>
                <p className="text-xs text-white/50 font-light mt-0.5">We coordinate convenient slots with tenants, owners, or site managers.</p>
              </div>
            </div>
            <a
              href="/booking"
              className="bg-[#0B1220] hover:bg-[#07162A] text-white border border-white/15 font-bold uppercase tracking-widest text-[11px] px-6 py-3.5 rounded-sm transition-all shadow-md whitespace-nowrap"
            >
              Book a Visit ➔
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7: SITE AUDIT ESTIMATOR */}
      <section id="site-audit-notes" className="bg-[#050505] py-20 text-[#E5E7EB] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] text-[#FBBF24] font-mono tracking-[0.25em] uppercase block">
                Before You Book
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                Site Audit Notes
              </h2>
              <p className="text-sm text-white/55 leading-7 font-light">
                Share the service type and postcode first. Our booking flow will pass those details into the repair request so the engineer can prepare the right fittings, tools, and timing window.
              </p>

              <div className="space-y-3">
                {[
                  'No separate call-out fee for active London service zones.',
                  'Emergency jobs are routed to the closest available mobile engineer.',
                  'Photos and access notes can be added in the full booking step.',
                ].map((note) => (
                  <div key={note} className="flex items-start gap-3 rounded-sm bg-[#0B1220] p-4 border border-white/10">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
                    <p className="text-xs leading-6 text-white/60 font-light">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="quick-calc-widget" className="lg:col-span-6 lg:col-start-7 bg-[#0B1220] rounded-sm p-6 sm:p-8 shadow-2xl text-[#E5E7EB] border border-white/10">
              <h3 className="text-2xl font-serif text-white">
                Bespoke Site Audit
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-[#FBBF24] mt-1 mb-6 uppercase">
                Instant reservation in 2 minutes
              </p>

              <form action="/booking" method="get" className="space-y-4">
                <div>
                  <label htmlFor="quick-cat-select" className="block text-[10px] font-mono tracking-wider font-bold text-white/60 uppercase mb-1.5">
                    What service is required?
                  </label>
                  <select
                    id="quick-cat-select"
                    name="categoryId"
                    defaultValue=""
                    className="w-full rounded-sm border border-white/10 bg-[#050505] px-3 py-3 text-xs focus:border-[#FBBF24] focus:outline-none focus:ring-1 focus:ring-[#FBBF24] font-mono tracking-wide text-[#E5E7EB]"
                    required
                  >
                    <option value="">-- Choose Category --</option>
                    {SERVICE_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-[#050505] text-[#E5E7EB]">
                        {cat.emoji} {cat.name} {cat.isEmergency ? '(Emergency)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quick-postcode-input" className="block text-[10px] font-mono tracking-wider font-bold text-white/60 uppercase mb-1.5">
                    Service Postcode
                  </label>
                  <input
                    id="quick-postcode-input"
                    name="postcode"
                    type="text"
                    pattern="[A-Za-z]{1,2}[0-9][A-Za-z0-9]?( ?[0-9][A-Za-z]{2})?"
                    title="Enter a valid UK postcode or prefix, e.g. SW19 or SW19 1AA"
                    placeholder="e.g. SW19, E1, NW3, W1"
                    className="w-full rounded-sm border border-white/10 bg-[#050505] px-3 py-3 text-xs focus:border-[#FBBF24] focus:outline-none focus:ring-1 focus:ring-[#FBBF24] font-mono uppercase tracking-widest text-[#E5E7EB] placeholder-white/60"
                    required
                  />
                </div>

                <div className="bg-[#050505] rounded-sm p-4 text-[11px] text-white/50 leading-relaxed mb-2 border border-white/5">
                  <p className="font-mono text-[#FBBF24] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" /> No-obligation Pricing
                  </p>
                  Retrieve specifications and immediate scheduling alternatives with no pre-payments.
                </div>

                <button
                  id="quote-submit-btn"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-sm bg-[#FBBF24] hover:bg-[#F59E0B] py-3.5 text-xs tracking-widest uppercase font-mono font-bold text-[#0B1220] transition-all cursor-pointer shadow-lg"
                >
                  Proceed to Estimate <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PLUMBING FAQ */}
      <section id="faq" className="bg-[#050505] py-20 text-[#E5E7EB] border-b border-white/10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] text-[#FBBF24] font-mono tracking-[0.25em] uppercase block mb-2">
              Client Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Plumbing FAQs
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-3 font-light leading-relaxed">
              Clear answers for emergency callouts, heating faults, leaks, and scheduled plumbing work.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-[#0B1220] border border-white/10 rounded-sm shadow-xl">
            <div className="divide-y divide-white/10">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group px-5 sm:px-8" open={index === 0}>
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
                    <span className="text-base md:text-xl font-serif leading-snug text-white transition-colors group-open:text-[#FBBF24] group-hover:text-[#FBBF24]">
                      {faq.question}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#050505] text-2xl font-light leading-none text-[#FBBF24] transition-all group-hover:border-[#FBBF24]/50 group-open:border-[#FBBF24] group-open:bg-[#FBBF24] group-open:text-[#0B1220]">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">-</span>
                    </span>
                  </summary>
                  <p className="pb-7 text-xs sm:text-sm leading-7 text-white/55 font-light max-w-4xl">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FLOOD RESPONSIVE CALL TO ACTION BANNER */}
      <section id="hompeage-emergency-cta" className="bg-[#050505] text-[#E5E7EB] py-16 text-center relative overflow-hidden">
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
              className="inline-flex items-center gap-3 rounded-sm bg-[#FBBF24] text-[#0B1220] px-10 py-5 text-lg md:text-xl font-mono font-bold tracking-wider hover:bg-[#F59E0B] transition-all cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              {BUSINESS_INFO.phone}
            </a>
            <p className="text-[10px] tracking-widest uppercase text-white/60 font-mono mt-2">
              Rated 5.0 for Excellence • No Dispatch Surcharge
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
