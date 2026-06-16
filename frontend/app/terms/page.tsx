import Link from 'next/link';
import { CalendarDays, CheckCircle, Clock, ShieldCheck, Wrench, X } from 'lucide-react';
import { BUSINESS_INFO } from '../../src/data';
import { createPageMetadata } from '../../src/seo';

export const metadata = createPageMetadata({
  title: 'Terms and Conditions',
  description:
    'Read the booking, pricing, cancellation, parts, workmanship, and customer responsibility terms for Elite Plumbing Services.',
  path: '/terms',
});

const terms = [
  {
    title: 'Bookings & Arrival Windows',
    text: 'Appointments are confirmed after our dispatch team reviews your postcode, service type, engineer availability, and any emergency notes. Arrival windows may vary because urgent plumbing and heating faults can require immediate safety work.',
  },
  {
    title: 'Emergency Call-Outs',
    text: 'For burst pipes, active leaks, no hot water, blocked drains, and heating failures, we prioritise the closest suitable engineer. You must provide safe property access and accurate fault details before work begins.',
  },
  {
    title: 'Quotes, Pricing & Payments',
    text: 'We aim to provide clear pricing before starting work. Final costs can change if hidden damage, additional parts, unsafe installations, or extra labour are discovered during inspection.',
  },
  {
    title: 'Cancellations',
    text: 'Scheduled visits should be cancelled as early as possible. Late cancellations after an engineer has been dispatched may be chargeable where travel, parking, or booked time has already been committed.',
  },
  {
    title: 'Parts & Workmanship',
    text: 'Parts are supplied according to availability and suitability for the property. Workmanship support applies to completed jobs where the issue relates directly to the work carried out by Elite Plumbers.',
  },
  {
    title: 'Customer Responsibilities',
    text: 'Customers must disclose known access limits, previous repairs, tenant or landlord details, isolation points, appliance information, and any safety concerns that could affect plumbing or gas-related work.',
  },
];

export default function TermsPage() {
  const returnHref = '/signup';

  return (
    <div id="terms-page" className="bg-[#050505] text-[#E5E7EB]">
      <section className="relative border-b border-white/10 bg-[#07162A] px-4 py-16">
        <Link
          href={returnHref}
          aria-label="Close terms and return to sign up"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-black/25 text-white/75 transition-all hover:border-[#FBBF24]/60 hover:text-[#FBBF24] sm:right-8 sm:top-8"
        >
          <X className="h-5 w-5" />
        </Link>
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#FBBF24]/35 bg-black/30 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#FBBF24]">
            <ShieldCheck className="h-4 w-4" />
            Client Agreement
          </div>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-white sm:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
            These terms explain how {BUSINESS_INFO.name} handles plumbing bookings, emergency dispatch,
            pricing, cancellations, parts, and customer responsibilities across London service areas.
          </p>
          <Link
            href={returnHref}
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-[#FBBF24] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#0B1220] transition-colors hover:bg-[#F59E0B]"
          >
            Back to Sign Up
          </Link>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {terms.map((item, index) => (
              <article key={item.title} className="rounded-sm border border-white/10 bg-[#0B1220] p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#FBBF24]/10 font-mono text-xs font-bold text-[#FBBF24]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-serif text-2xl text-white">{item.title}</h2>
                </div>
                <p className="text-sm leading-7 text-white/58">{item.text}</p>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-sm border border-[#FBBF24]/25 bg-[#0B1220] p-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="rounded-sm bg-[#FBBF24]/10 p-2 text-[#FBBF24]">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#FBBF24]">Elite Plumbers</p>
                <p className="font-serif text-lg text-white">Service Promise</p>
              </div>
            </div>
            <div className="mt-5 space-y-4 text-xs leading-6 text-white/55">
              <p className="flex gap-2">
                <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#FBBF24]" />
                Gas Safe registration: {BUSINESS_INFO.gasSafeReg}
              </p>
              <p className="flex gap-2">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-[#FBBF24]" />
                24/7 emergency response subject to engineer availability.
              </p>
              <p className="flex gap-2">
                <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-[#FBBF24]" />
                Scheduled bookings are confirmed by postcode and service type.
              </p>
            </div>
            <Link
              href={returnHref}
              className="mt-6 flex items-center justify-center rounded-sm border border-[#FBBF24] px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#FBBF24] transition-colors hover:bg-[#FBBF24] hover:text-[#0B1220]"
            >
              Back to Sign Up
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
