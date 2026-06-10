'use client';

import Link from 'next/link';
import { FormEvent, ReactNode, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';

type CustomerPageMode = 'profile' | 'bookings';

type CustomerAccountViewProps = {
  mode: CustomerPageMode;
};

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  preferredContact: string;
};

type BookingStatus = 'Confirmed' | 'Engineer assigned' | 'On the way' | 'Completed' | 'Cancelled';
type PaymentStatus = 'Paid' | 'Pending' | 'Pay on visit' | 'Refund requested';

type CustomerBooking = {
  id: string;
  service: string;
  date: string;
  time: string;
  address: string;
  engineer: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: string;
  notes: string;
  type: 'present' | 'past';
};

const initialProfile: ProfileForm = {
  fullName: 'Sathurgini Raj',
  email: 'sathurgini@example.com',
  phone: '07700 900077',
  address: '24 Kensington High Street, London',
  postcode: 'W8 5NP',
  preferredContact: 'Phone call',
};

const initialBookings: CustomerBooking[] = [
  {
    id: 'EP-4827',
    service: 'Emergency Water Leak Repair',
    date: '12 June 2026',
    time: '08:00 - 11:00',
    address: '24 Kensington High Street, London W8 5NP',
    engineer: 'Assigned after dispatch confirmation',
    status: 'Confirmed',
    paymentStatus: 'Pay on visit',
    amount: 'From GBP 85',
    notes: 'Kitchen sink pipe leak. Customer requested morning visit.',
    type: 'present',
  },
  {
    id: 'EP-5194',
    service: 'Boiler Service',
    date: '14 June 2026',
    time: '14:00 - 17:00',
    address: '24 Kensington High Street, London W8 5NP',
    engineer: 'Daniel Price',
    status: 'Engineer assigned',
    paymentStatus: 'Pending',
    amount: 'GBP 85 fixed',
    notes: 'Annual boiler service and pressure check.',
    type: 'present',
  },
  {
    id: 'EP-3351',
    service: 'Blocked Sink',
    date: '21 May 2026',
    time: '11:00 - 14:00',
    address: '24 Kensington High Street, London W8 5NP',
    engineer: 'Marcus Hill',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 'GBP 75 fixed',
    notes: 'Waste trap cleaned and flow tested.',
    type: 'past',
  },
  {
    id: 'EP-2908',
    service: 'Radiator Repair',
    date: '05 April 2026',
    time: '17:05 - 20:50',
    address: '24 Kensington High Street, London W8 5NP',
    engineer: 'Oliver Smith',
    status: 'Completed',
    paymentStatus: 'Paid',
    amount: 'From GBP 65',
    notes: 'Radiator valve replaced and system balanced.',
    type: 'past',
  },
];

const statusClass: Record<BookingStatus, string> = {
  Confirmed: 'border-[#FBBF24]/40 bg-[#FBBF24]/10 text-[#FBBF24]',
  'Engineer assigned': 'border-sky-400/35 bg-sky-400/10 text-sky-200',
  'On the way': 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
  Completed: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
  Cancelled: 'border-red-400/35 bg-red-400/10 text-red-200',
};

const paymentClass: Record<PaymentStatus, string> = {
  Paid: 'text-emerald-200',
  Pending: 'text-[#FBBF24]',
  'Pay on visit': 'text-white/70',
  'Refund requested': 'text-red-200',
};

export function CustomerAccountView({ mode }: CustomerAccountViewProps) {
  const [profile, setProfile] = useState<ProfileForm>(initialProfile);
  const [savedMessage, setSavedMessage] = useState('');
  const [bookings, setBookings] = useState<CustomerBooking[]>(initialBookings);
  const [activeBookingTab, setActiveBookingTab] = useState<'present' | 'past'>('present');

  const pageTitle = mode === 'profile' ? 'My Profile' : 'My Bookings';
  const pageSubtitle =
    mode === 'profile'
      ? 'Manage your saved customer details, contact preferences, and secure account access.'
      : 'Track present jobs, review past visits, and manage booking or payment status.';

  const visibleBookings = useMemo(
    () => bookings.filter((booking) => booking.type === activeBookingTab),
    [activeBookingTab, bookings]
  );

  const updateProfile = (field: keyof ProfileForm, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSavedMessage('');
  };

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedMessage('Profile details saved for frontend preview. Backend update can connect next.');
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'Cancelled', paymentStatus: 'Refund requested' }
          : booking
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E7EB]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1220]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),linear-gradient(135deg,rgba(11,18,32,0.96),rgba(5,5,5,0.96))]" />
        <div className="absolute inset-0 text-white opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="customer-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#customer-grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-18">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
              Customer Account
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-6xl">{pageTitle}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{pageSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
        <aside className="h-fit rounded-sm border border-white/10 bg-[#0B1220] p-5">
          <div className="border-b border-white/10 pb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-[#FBBF24]/45 bg-black/35 text-[#FBBF24]">
              <Shield className="h-7 w-7" />
            </div>
            <h2 className="mt-4 font-serif text-2xl text-white">{profile.fullName}</h2>
            <p className="mt-1 text-xs text-white/45">{profile.email}</p>
          </div>

          <nav className="mt-5 space-y-2">
            {mode === 'profile' && (
              <Link
                href="/customer/profile"
                className="flex items-center gap-3 rounded-sm border border-[#FBBF24]/50 bg-[#FBBF24]/10 px-4 py-3 text-sm text-[#FBBF24] transition-all"
              >
                <Shield className="h-4 w-4" />
                My Profile
              </Link>
            )}
            {mode === 'bookings' && (
              <Link
                href="/customer/bookings"
                className="flex items-center gap-3 rounded-sm border border-[#FBBF24]/50 bg-[#FBBF24]/10 px-4 py-3 text-sm text-[#FBBF24] transition-all"
              >
                <CalendarDays className="h-4 w-4" />
                My Bookings
              </Link>
            )}
          </nav>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm border border-red-400/25 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-200 transition-all hover:bg-red-400/10"
          >
            <X className="h-4 w-4" />
            Logout
          </button>
        </aside>

        {mode === 'profile' ? (
          <ProfilePanel
            profile={profile}
            savedMessage={savedMessage}
            onChange={updateProfile}
            onSubmit={handleProfileSubmit}
          />
        ) : (
          <BookingsPanel
            activeTab={activeBookingTab}
            bookings={visibleBookings}
            onTabChange={setActiveBookingTab}
            onCancel={cancelBooking}
          />
        )}
      </section>
    </main>
  );
}

type ProfilePanelProps = {
  profile: ProfileForm;
  savedMessage: string;
  onChange: (field: keyof ProfileForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function ProfilePanel({ profile, savedMessage, onChange, onSubmit }: ProfilePanelProps) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 shadow-2xl sm:p-7">
      <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">
            Saved Details
          </p>
          <h2 className="mt-2 font-serif text-3xl text-white">Customer information</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
          <ShieldCheck className="h-4 w-4" />
          Verified customer
        </div>
      </div>

      <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={onSubmit}>
        <ProfileField
          label="Full Name"
          value={profile.fullName}
          icon={<Shield className="h-4 w-4" />}
          onChange={(value) => onChange('fullName', value)}
        />
        <ProfileField
          label="Email Address"
          type="email"
          value={profile.email}
          icon={<Mail className="h-4 w-4" />}
          onChange={(value) => onChange('email', value)}
        />
        <ProfileField
          label="Phone Number"
          value={profile.phone}
          icon={<Phone className="h-4 w-4" />}
          onChange={(value) => onChange('phone', value)}
        />
        <ProfileField
          label="Postcode"
          value={profile.postcode}
          icon={<MapPin className="h-4 w-4" />}
          onChange={(value) => onChange('postcode', value)}
        />
        <ProfileField
          label="Property Address"
          value={profile.address}
          icon={<MapPin className="h-4 w-4" />}
          onChange={(value) => onChange('address', value)}
          wide
        />

        <label className="block md:col-span-2">
          <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
            Preferred Contact
          </span>
          <span className="flex items-center gap-3 rounded-sm border border-white/10 bg-black/30 px-4 py-3 focus-within:border-[#FBBF24]/60">
            <Phone className="h-4 w-4 text-[#FBBF24]" />
            <select
              value={profile.preferredContact}
              onChange={(event) => onChange('preferredContact', event.target.value)}
              className="w-full bg-transparent text-sm text-white focus:outline-none"
            >
              <option className="bg-[#0B1220]" value="Phone call">
                Phone call
              </option>
              <option className="bg-[#0B1220]" value="SMS update">
                SMS update
              </option>
              <option className="bg-[#0B1220]" value="Email update">
                Email update
              </option>
            </select>
          </span>
        </label>

        {savedMessage && (
          <div className="md:col-span-2 rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {savedMessage}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#FBBF24] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#0B1220] transition-all hover:bg-[#F59E0B]"
          >
            Save Profile
            <CheckCircle className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
  icon: ReactNode;
  onChange: (value: string) => void;
  type?: string;
  wide?: boolean;
};

function ProfileField({ label, value, icon, onChange, type = 'text', wide = false }: ProfileFieldProps) {
  return (
    <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
        {label}
      </span>
      <span className="flex items-center gap-3 rounded-sm border border-white/10 bg-black/30 px-4 py-3 focus-within:border-[#FBBF24]/60">
        <span className="text-[#FBBF24]">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
        />
      </span>
    </label>
  );
}

type BookingsPanelProps = {
  activeTab: 'present' | 'past';
  bookings: CustomerBooking[];
  onTabChange: (tab: 'present' | 'past') => void;
  onCancel: (bookingId: string) => void;
};

function BookingsPanel({ activeTab, bookings, onTabChange, onCancel }: BookingsPanelProps) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 shadow-2xl sm:p-7">
      <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">
            Booking History
          </p>
          <h2 className="mt-2 font-serif text-3xl text-white">Present and past visits</h2>
        </div>
        <div className="grid grid-cols-2 rounded-sm border border-white/10 bg-black/30 p-1">
          {(['present', 'past'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-sm px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-[#FBBF24] text-[#0B1220]' : 'text-white/60 hover:text-white'
              }`}
            >
              {tab === 'present' ? 'Present' : 'Past'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {bookings.map((booking) => (
          <article key={booking.id} className="rounded-sm border border-white/10 bg-black/25 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">
                    {booking.id}
                  </span>
                  <span className={`rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusClass[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-2xl text-white">{booking.service}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">{booking.notes}</p>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#0B1220] px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Payment Status</p>
                <p className={`mt-1 flex items-center gap-2 text-sm font-semibold ${paymentClass[booking.paymentStatus]}`}>
                  <ShieldCheck className="h-4 w-4" />
                  {booking.paymentStatus}
                </p>
                <p className="mt-1 text-xs text-white/45">{booking.amount}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/10 pt-5 md:grid-cols-2 xl:grid-cols-4">
              <BookingMeta icon={<CalendarDays className="h-4 w-4" />} label="Date" value={booking.date} />
              <BookingMeta icon={<Clock className="h-4 w-4" />} label="Time" value={booking.time} />
              <BookingMeta icon={<MapPin className="h-4 w-4" />} label="Address" value={booking.address} />
              <BookingMeta icon={<Wrench className="h-4 w-4" />} label="Plumber" value={booking.engineer} />
            </div>

            {activeTab === 'present' && (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/booking?editBooking=${booking.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white/75 transition-all hover:border-[#FBBF24]/45 hover:text-[#FBBF24]"
                >
                  <FileText className="h-4 w-4" />
                  Edit Booking
                </Link>
                <button
                  type="button"
                  onClick={() => onCancel(booking.id)}
                  disabled={booking.status === 'Cancelled'}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-red-400/25 px-5 py-3 text-xs font-bold uppercase tracking-widest text-red-200 transition-all hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {booking.status === 'Cancelled' ? <X className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  {booking.status === 'Cancelled' ? 'Booking Cancelled' : 'Cancel Booking'}
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

type BookingMetaProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function BookingMeta({ icon, label, value }: BookingMetaProps) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220]/70 p-3">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
        <span className="text-[#FBBF24]">{icon}</span>
        {label}
      </p>
      <p className="mt-2 text-sm leading-5 text-white/70">{value}</p>
    </div>
  );
}
