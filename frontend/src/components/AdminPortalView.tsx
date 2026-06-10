'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle,
  Clock,
  FileText,
  Map,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  Wrench,
  X,
} from 'lucide-react';

type AdminMode =
  | 'dashboard'
  | 'bookings'
  | 'booking-detail'
  | 'workers'
  | 'worker-detail'
  | 'worker-requests'
  | 'customers'
  | 'customer-detail'
  | 'payments'
  | 'messages'
  | 'settings'
  | 'notifications';

type BookingStatus = 'New' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';
type PaymentStatus = 'Paid' | 'Pending';
type WorkerStatus = 'Available' | 'Busy' | 'Offline' | 'Pending Review';
type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'More Docs';

type AdminPortalViewProps = {
  mode: AdminMode;
  recordId?: string;
};

type AdminBooking = {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  service: string;
  issue: string;
  notes: string;
  date: string;
  time: string;
  urgency: 'Emergency' | 'Scheduled';
  status: BookingStatus;
  assignedWorker: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  price: number;
  proof: string;
};

type AdminWorker = {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  skills: string[];
  status: WorkerStatus;
  rating: number;
  completedJobs: number;
  activeJobs: number;
  documents: string;
  earnings: number;
};

type WorkerRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  skills: string[];
  subWork: string[];
  availability: string;
  experience: string;
  gasSafe: string;
  documents: string[];
  status: RequestStatus;
  otherDescription: string;
};

type AdminCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalBookings: number;
  activeBooking: string;
  paymentHistory: string;
};

type AdminMessage = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
};

type AdminNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'worker' | 'payment' | 'system';
};

const adminBookings: AdminBooking[] = [
  {
    id: 'EP-6128',
    customerId: 'C-1001',
    customerName: 'Sathurgini Raj',
    phone: '07700 900077',
    email: 'sathurgini@example.com',
    address: '24 Kensington High Street',
    postcode: 'W8 5NP',
    service: 'Emergency Water Leak',
    issue: 'Burst pipe below kitchen sink',
    notes: 'Customer reports active water leak. Assign nearest emergency plumber and confirm stopcock access.',
    date: '10 June 2026',
    time: '10:30 - 11:30',
    urgency: 'Emergency',
    status: 'New',
    assignedWorker: 'Unassigned',
    paymentMethod: 'Cash after repair',
    paymentStatus: 'Pending',
    price: 95,
    proof: 'Photo proof required',
  },
  {
    id: 'EP-6094',
    customerId: 'C-1002',
    customerName: 'Maya Williams',
    phone: '07700 900166',
    email: 'maya@example.com',
    address: '18 Fulham Road',
    postcode: 'SW6 1AA',
    service: 'Boiler Service',
    issue: 'Annual boiler service',
    notes: 'Customer requested Gas Safe service note after completion.',
    date: '10 June 2026',
    time: '14:00 - 17:00',
    urgency: 'Scheduled',
    status: 'Assigned',
    assignedWorker: 'Daniel Price',
    paymentMethod: 'Online card',
    paymentStatus: 'Pending',
    price: 85,
    proof: 'Service sheet pending',
  },
  {
    id: 'EP-5902',
    customerId: 'C-1003',
    customerName: 'Oliver Harris',
    phone: '07700 900277',
    email: 'oliver@example.com',
    address: '9 Clapham Common North Side',
    postcode: 'SW4 0QW',
    service: 'Blocked Sink',
    issue: 'Kitchen waste blocked',
    notes: 'Completed with before/after proof.',
    date: '09 June 2026',
    time: '11:00 - 14:00',
    urgency: 'Scheduled',
    status: 'Completed',
    assignedWorker: 'Daniel Price',
    paymentMethod: 'Online card',
    paymentStatus: 'Paid',
    price: 75,
    proof: 'Photo proof uploaded',
  },
  {
    id: 'EP-5840',
    customerId: 'C-1004',
    customerName: 'Priya Shah',
    phone: '07700 900388',
    email: 'priya@example.com',
    address: '31 Greenwich High Road',
    postcode: 'SE10 8JL',
    service: 'Radiator Repair',
    issue: 'Radiator valve leak',
    notes: 'Customer cancelled before worker arrived.',
    date: '02 June 2026',
    time: '17:05 - 20:50',
    urgency: 'Scheduled',
    status: 'Cancelled',
    assignedWorker: 'Oliver Smith',
    paymentMethod: 'Pay on visit',
    paymentStatus: 'Pending',
    price: 0,
    proof: 'No proof required',
  },
];

const adminWorkers: AdminWorker[] = [
  {
    id: 'W-201',
    name: 'Daniel Price',
    phone: '07700 900442',
    email: 'daniel.price@eliteplumbers.co.uk',
    area: 'SW, W, Central London',
    skills: ['Emergency leaks', 'Pipework', 'Boiler checks'],
    status: 'Available',
    rating: 4.9,
    completedJobs: 128,
    activeJobs: 2,
    documents: 'Gas Safe verified',
    earnings: 2550,
  },
  {
    id: 'W-202',
    name: 'Oliver Smith',
    phone: '07700 900533',
    email: 'oliver.smith@eliteplumbers.co.uk',
    area: 'SE and East London',
    skills: ['Drainage', 'Blocked sinks', 'Bathroom plumbing'],
    status: 'Busy',
    rating: 4.7,
    completedJobs: 96,
    activeJobs: 1,
    documents: 'Insurance verified',
    earnings: 1890,
  },
  {
    id: 'W-203',
    name: 'Aiden Clarke',
    phone: '07700 900644',
    email: 'aiden.clarke@eliteplumbers.co.uk',
    area: 'North London',
    skills: ['Commercial plumbing', 'Gas services'],
    status: 'Offline',
    rating: 4.8,
    completedJobs: 77,
    activeJobs: 0,
    documents: 'Gas Safe expiring soon',
    earnings: 1440,
  },
];

const workerRequests: WorkerRequest[] = [
  {
    id: 'REQ-301',
    name: 'Marcus Hill',
    phone: '07700 901100',
    email: 'marcus.worker@example.com',
    area: 'Kensington, Fulham, Westminster',
    skills: ['Emergency Plumbing', 'Pipework Services'],
    subWork: ['Burst Pipe', 'Water Leak', 'Pipe Repair'],
    availability: '24/7 emergency work',
    experience: '5+ years',
    gasSafe: 'Not supplied',
    documents: ['Trade certificate.pdf', 'Insurance.pdf'],
    status: 'Pending',
    otherDescription: 'Can handle copper pipe repairs and emergency isolation.',
  },
  {
    id: 'REQ-302',
    name: 'Nimal Perera',
    phone: '07700 901122',
    email: 'nimal.worker@example.com',
    area: 'Greenwich, Lewisham',
    skills: ['Gas Services', 'Boiler & Heating Services'],
    subWork: ['Gas Safety Certificate', 'Boiler Service'],
    availability: 'Day shift',
    experience: '10+ years',
    gasSafe: 'GS-981244',
    documents: ['Gas Safe Card.jpg', 'Right To Work.pdf'],
    status: 'More Docs',
    otherDescription: 'Admin requested updated public liability insurance.',
  },
];

const adminCustomers: AdminCustomer[] = [
  {
    id: 'C-1001',
    name: 'Sathurgini Raj',
    phone: '07700 900077',
    email: 'sathurgini@example.com',
    address: '24 Kensington High Street, W8 5NP',
    totalBookings: 4,
    activeBooking: 'EP-6128',
    paymentHistory: '2 paid, 1 pending',
  },
  {
    id: 'C-1002',
    name: 'Maya Williams',
    phone: '07700 900166',
    email: 'maya@example.com',
    address: '18 Fulham Road, SW6 1AA',
    totalBookings: 2,
    activeBooking: 'EP-6094',
    paymentHistory: '1 paid, 1 pending',
  },
  {
    id: 'C-1003',
    name: 'Oliver Harris',
    phone: '07700 900277',
    email: 'oliver@example.com',
    address: '9 Clapham Common North Side, SW4 0QW',
    totalBookings: 5,
    activeBooking: 'None',
    paymentHistory: '5 paid',
  },
];

const adminMessages: AdminMessage[] = [
  {
    id: 'MSG-1',
    name: 'Eleanor Vance',
    phone: '07700 902111',
    email: 'eleanor@example.com',
    subject: 'Landlord inspection quote',
    message: 'Can you send a quote for quarterly plumbing inspections for two rental flats?',
    date: '10 June 2026',
    status: 'Unread',
  },
  {
    id: 'MSG-2',
    name: 'David Patel',
    phone: '07700 902122',
    email: 'david@example.com',
    subject: 'Drainage survey question',
    message: 'I need CCTV drain survey proof for a homebuyer report.',
    date: '09 June 2026',
    status: 'Replied',
  },
];

const adminNotifications: AdminNotification[] = [
  {
    id: 'AN-1',
    title: 'Emergency booking received',
    message: 'EP-6128 needs an available emergency plumber near W8.',
    time: '4 minutes ago',
    type: 'booking',
  },
  {
    id: 'AN-2',
    title: 'Worker request waiting',
    message: 'REQ-301 submitted trade certificates for review.',
    time: '22 minutes ago',
    type: 'worker',
  },
  {
    id: 'AN-3',
    title: 'Payment received',
    message: 'EP-5902 online card payment marked paid.',
    time: 'Yesterday',
    type: 'payment',
  },
];

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', mode: 'dashboard' as AdminMode },
  { href: '/admin/bookings', label: 'Bookings', mode: 'bookings' as AdminMode },
  { href: '/admin/worker-requests', label: 'Worker Requests', mode: 'worker-requests' as AdminMode },
  { href: '/admin/workers', label: 'Workers', mode: 'workers' as AdminMode },
  { href: '/admin/customers', label: 'Customers', mode: 'customers' as AdminMode },
  { href: '/admin/payments', label: 'Payments', mode: 'payments' as AdminMode },
  { href: '/admin/messages', label: 'Messages', mode: 'messages' as AdminMode },
  { href: '/admin/settings', label: 'Settings', mode: 'settings' as AdminMode },
];

const pageCopy: Record<AdminMode, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Admin Dashboard',
    subtitle: "Company overview for today's bookings, workers, revenue, and urgent actions.",
  },
  bookings: {
    title: 'Bookings',
    subtitle: 'Review, assign, track, and update all customer plumbing bookings.',
  },
  'booking-detail': {
    title: 'Booking Details',
    subtitle: 'Customer details, issue notes, worker assignment, payment, proof, and timeline.',
  },
  workers: {
    title: 'Workers',
    subtitle: 'Approved plumbers, availability, skills, documents, ratings, and active jobs.',
  },
  'worker-detail': {
    title: 'Worker Details',
    subtitle: 'Profile, certifications, assigned jobs, earnings, ratings, and admin controls.',
  },
  'worker-requests': {
    title: 'Worker Requests',
    subtitle: 'Review plumber applications, skills, uploaded documents, and approval status.',
  },
  customers: {
    title: 'Customers',
    subtitle: 'Registered customer profiles, booking history, active jobs, and payment records.',
  },
  'customer-detail': {
    title: 'Customer Details',
    subtitle: 'Customer profile, bookings, payment history, and admin notes.',
  },
  payments: {
    title: 'Payments',
    subtitle: 'Revenue, pending payments, paid jobs, cash/card split, and worker earnings.',
  },
  messages: {
    title: 'Messages',
    subtitle: 'Contact form enquiries and reply workflow for customer support.',
  },
  settings: {
    title: 'Admin Settings',
    subtitle: 'Company profile, service area, account preferences, notifications, and logout.',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Booking alerts, worker requests, payment updates, and system reminders.',
  },
};

const bookingStatusClass: Record<BookingStatus, string> = {
  New: 'border-[#FBBF24]/40 bg-[#FBBF24]/10 text-[#FBBF24]',
  Assigned: 'border-sky-400/35 bg-sky-400/10 text-sky-200',
  'In Progress': 'border-violet-400/35 bg-violet-400/10 text-violet-200',
  Completed: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
  Cancelled: 'border-red-400/35 bg-red-400/10 text-red-200',
};

const workerStatusClass: Record<WorkerStatus, string> = {
  Available: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
  Busy: 'border-[#FBBF24]/40 bg-[#FBBF24]/10 text-[#FBBF24]',
  Offline: 'border-white/15 bg-white/5 text-white/45',
  'Pending Review': 'border-sky-400/35 bg-sky-400/10 text-sky-200',
};

export function AdminPortalView({ mode, recordId }: AdminPortalViewProps) {
  const [bookings, setBookings] = useState(adminBookings);
  const [workers, setWorkers] = useState(adminWorkers);
  const [requests, setRequests] = useState(workerRequests);
  const [bookingTab, setBookingTab] = useState<'all' | BookingStatus>('all');
  const [settingsSaved, setSettingsSaved] = useState('');

  const booking = bookings.find((item) => item.id === recordId) ?? bookings[0];
  const worker = workers.find((item) => item.id === recordId) ?? workers[0];
  const customer = adminCustomers.find((item) => item.id === recordId) ?? adminCustomers[0];
  const filteredBookings = bookingTab === 'all' ? bookings : bookings.filter((item) => item.status === bookingTab);
  const content = pageCopy[mode];
  const todayRevenue = bookings.filter((item) => item.paymentStatus === 'Paid').reduce((total, item) => total + item.price, 0);
  const pendingRevenue = bookings.filter((item) => item.paymentStatus === 'Pending').reduce((total, item) => total + item.price, 0);

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((current) => current.map((item) => (item.id === bookingId ? { ...item, status } : item)));
  };

  const assignBooking = (bookingId: string, workerName: string) => {
    setBookings((current) =>
      current.map((item) => (item.id === bookingId ? { ...item, assignedWorker: workerName, status: 'Assigned' } : item))
    );
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests((current) => current.map((item) => (item.id === requestId ? { ...item, status } : item)));
  };

  const updateWorkerStatus = (workerId: string, status: WorkerStatus) => {
    setWorkers((current) => current.map((item) => (item.id === workerId ? { ...item, status } : item)));
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E7EB]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1220]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),linear-gradient(135deg,rgba(11,18,32,0.96),rgba(5,5,5,0.96))]" />
        <div className="absolute inset-0 text-white opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="admin-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#admin-grid)" />
          </svg>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
              Elite Admin Control
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-6xl">{content.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">{content.subtitle}</p>
          </div>
          <Link
            href="/admin/notifications"
            className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 bg-black/25 text-[#FBBF24] transition-all hover:border-[#FBBF24]/45"
            aria-label="Open admin notifications"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FBBF24] font-mono text-[10px] font-bold text-[#0B1220]">
              {adminNotifications.length}
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
        <AdminSidebar activeMode={mode} />
        <div>
          {mode === 'dashboard' && (
            <DashboardPanel
              bookings={bookings}
              workers={workers}
              requests={requests}
              todayRevenue={todayRevenue}
              pendingRevenue={pendingRevenue}
              onAssign={assignBooking}
            />
          )}
          {mode === 'bookings' && (
            <BookingsPanel
              bookings={filteredBookings}
              activeTab={bookingTab}
              onTabChange={setBookingTab}
              onStatusChange={updateBookingStatus}
              onAssign={assignBooking}
            />
          )}
          {mode === 'booking-detail' && (
            <BookingDetailPanel booking={booking} workers={workers} onStatusChange={updateBookingStatus} onAssign={assignBooking} />
          )}
          {mode === 'workers' && <WorkersPanel workers={workers} onStatusChange={updateWorkerStatus} />}
          {mode === 'worker-detail' && <WorkerDetailPanel worker={worker} bookings={bookings} onStatusChange={updateWorkerStatus} />}
          {mode === 'worker-requests' && <WorkerRequestsPanel requests={requests} onStatusChange={updateRequestStatus} />}
          {mode === 'customers' && <CustomersPanel customers={adminCustomers} bookings={bookings} />}
          {mode === 'customer-detail' && <CustomerDetailPanel customer={customer} bookings={bookings.filter((item) => item.customerId === customer.id)} />}
          {mode === 'payments' && <PaymentsPanel bookings={bookings} workers={workers} paid={todayRevenue} pending={pendingRevenue} />}
          {mode === 'messages' && <MessagesPanel />}
          {mode === 'settings' && <SettingsPanel savedMessage={settingsSaved} onSave={setSettingsSaved} />}
          {mode === 'notifications' && <NotificationsPanel />}
        </div>
      </section>
    </main>
  );
}

function AdminSidebar({ activeMode }: { activeMode: AdminMode }) {
  return (
    <aside className="h-fit rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <div className="border-b border-white/10 pb-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-[#FBBF24]/45 bg-black/35 text-[#FBBF24]">
          <Shield className="h-8 w-8" />
        </div>
        <h2 className="mt-4 font-serif text-2xl text-white">Admin Panel</h2>
        <p className="mt-1 text-xs text-white/45">Elite Plumbing Services</p>
      </div>
      <nav className="mt-5 space-y-2">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-all ${
              activeMode === item.mode
                ? 'border-[#FBBF24]/50 bg-[#FBBF24]/10 text-[#FBBF24]'
                : 'border-white/10 text-white/65 hover:border-[#FBBF24]/30 hover:text-white'
            }`}
          >
            <Wrench className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm border border-red-400/25 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-200 transition-all hover:bg-red-400/10"
      >
        <X className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}

function DashboardPanel({
  bookings,
  workers,
  requests,
  todayRevenue,
  pendingRevenue,
  onAssign,
}: {
  bookings: AdminBooking[];
  workers: AdminWorker[];
  requests: WorkerRequest[];
  todayRevenue: number;
  pendingRevenue: number;
  onAssign: (bookingId: string, workerName: string) => void;
}) {
  const emergencyBookings = bookings.filter((booking) => booking.urgency === 'Emergency');
  const availableWorkers = workers.filter((worker) => worker.status === 'Available');
  const pendingRequests = requests.filter((request) => request.status === 'Pending');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Today's bookings" value={String(bookings.length)} helper="All mock jobs today" />
        <MetricCard label="Emergency jobs" value={String(emergencyBookings.length)} helper="Needs priority assignment" />
        <MetricCard label="Available workers" value={String(availableWorkers.length)} helper="Ready to assign" />
        <MetricCard label="Today revenue" value={`GBP ${todayRevenue}`} helper={`Pending GBP ${pendingRevenue}`} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
          <div className="mb-5 border-b border-white/10 pb-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Latest Bookings</p>
            <h2 className="mt-2 font-serif text-3xl text-white">Urgent admin queue</h2>
          </div>
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <BookingCard key={booking.id} booking={booking} onAssign={onAssign} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <AdminMiniPanel title="Worker requests" count={pendingRequests.length} href="/admin/worker-requests" copy="Review documents and approve workers." />
          <NotificationsMini />
        </div>
      </div>
    </div>
  );
}

function BookingsPanel({
  bookings,
  activeTab,
  onTabChange,
  onStatusChange,
  onAssign,
}: {
  bookings: AdminBooking[];
  activeTab: 'all' | BookingStatus;
  onTabChange: (tab: 'all' | BookingStatus) => void;
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
  onAssign: (bookingId: string, workerName: string) => void;
}) {
  const tabs: ('all' | BookingStatus)[] = ['all', 'New', 'Assigned', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <div className="mb-6 border-b border-white/10 pb-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Booking Management</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-sm px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-[#FBBF24] text-[#0B1220]' : 'border border-white/10 text-white/55 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} onStatusChange={onStatusChange} onAssign={onAssign} />
        ))}
      </div>
    </div>
  );
}

function BookingDetailPanel({
  booking,
  workers,
  onStatusChange,
  onAssign,
}: {
  booking: AdminBooking;
  workers: AdminWorker[];
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
  onAssign: (bookingId: string, workerName: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">{booking.id}</p>
            <h2 className="mt-2 font-serif text-3xl text-white">{booking.service}</h2>
            <p className="mt-2 text-sm leading-6 text-white/50">{booking.notes}</p>
          </div>
          <span className={`h-fit rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${bookingStatusClass[booking.status]}`}>
            {booking.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DetailItem label="Customer" value={`${booking.customerName} / ${booking.phone}`} />
          <DetailItem label="Email" value={booking.email} />
          <DetailItem label="Address" value={`${booking.address}, ${booking.postcode}`} />
          <DetailItem label="Date & Time" value={`${booking.date}, ${booking.time}`} />
          <DetailItem label="Payment" value={`${booking.paymentMethod} / ${booking.paymentStatus} / GBP ${booking.price}`} />
          <DetailItem label="Worker Proof" value={booking.proof} />
        </div>

        <div className="mt-6 rounded-sm border border-white/10 bg-black/25 p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Assign / Reassign Worker</p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {workers.map((worker) => (
              <button
                key={worker.id}
                type="button"
                onClick={() => onAssign(booking.id, worker.name)}
                className="rounded-sm border border-white/10 bg-[#050505] p-4 text-left transition-all hover:border-[#FBBF24]/45"
              >
                <span className="block text-sm font-semibold text-white">{worker.name}</span>
                <span className={`mt-2 inline-block rounded-sm border px-2 py-1 text-[10px] ${workerStatusClass[worker.status]}`}>
                  {worker.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {(['Assigned', 'In Progress', 'Completed', 'Cancelled'] as BookingStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(booking.id, status)}
              className="rounded-sm border border-white/15 px-3 py-3 text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]"
            >
              {status}
            </button>
          ))}
          <a href={`tel:${booking.phone}`} className="rounded-sm bg-[#FBBF24] px-3 py-3 text-center text-xs font-bold uppercase tracking-widest text-[#0B1220] hover:bg-[#F59E0B]">
            Call Customer
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <MapPanel postcode={booking.postcode} />
        <TimelinePanel booking={booking} />
      </div>
    </div>
  );
}

function WorkersPanel({ workers, onStatusChange }: { workers: AdminWorker[]; onStatusChange: (workerId: string, status: WorkerStatus) => void }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Approved Workers</p>
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {workers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}

function WorkerDetailPanel({
  worker,
  bookings,
  onStatusChange,
}: {
  worker: AdminWorker;
  bookings: AdminBooking[];
  onStatusChange: (workerId: string, status: WorkerStatus) => void;
}) {
  const assignedBookings = bookings.filter((booking) => booking.assignedWorker === worker.name);

  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <div className="mb-6 grid grid-cols-1 gap-5 border-b border-white/10 pb-6 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">{worker.id}</p>
          <h2 className="mt-2 font-serif text-3xl text-white">{worker.name}</h2>
          <p className="mt-2 text-sm text-white/50">{worker.email} / {worker.phone}</p>
        </div>
        <div className="rounded-sm border border-white/10 bg-black/25 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Rating</p>
          <p className="mt-2 flex items-center gap-2 font-serif text-3xl text-[#FBBF24]">
            <Star className="h-5 w-5 fill-current" />
            {worker.rating}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DetailItem label="Area" value={worker.area} />
        <DetailItem label="Documents" value={worker.documents} />
        <DetailItem label="Skills" value={worker.skills.join(', ')} />
        <DetailItem label="Earnings" value={`GBP ${worker.earnings}`} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {(['Available', 'Busy', 'Offline'] as WorkerStatus[]).map((status) => (
          <button key={status} type="button" onClick={() => onStatusChange(worker.id, status)} className="rounded-sm border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">
            Mark {status}
          </button>
        ))}
      </div>
      <div className="mt-7">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Assigned Jobs</p>
        <div className="mt-4 space-y-3">
          {assignedBookings.map((booking) => (
            <BookingMini key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkerRequestsPanel({ requests, onStatusChange }: { requests: WorkerRequest[]; onStatusChange: (requestId: string, status: RequestStatus) => void }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Worker Applications</p>
      <div className="mt-5 space-y-4">
        {requests.map((request) => (
          <article key={request.id} className="rounded-sm border border-white/10 bg-black/25 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">{request.id}</p>
                <h3 className="mt-2 font-serif text-2xl text-white">{request.name}</h3>
                <p className="mt-1 text-sm text-white/50">{request.phone} / {request.email}</p>
                <p className="mt-3 text-xs leading-6 text-white/45">{request.otherDescription}</p>
              </div>
              <span className="h-fit rounded-sm border border-[#FBBF24]/35 bg-[#FBBF24]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FBBF24]">
                {request.status}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              <DetailItem label="Skills" value={request.skills.join(', ')} />
              <DetailItem label="Sub Work" value={request.subWork.join(', ')} />
              <DetailItem label="Availability" value={request.availability} />
              <DetailItem label="Documents" value={request.documents.join(', ')} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {(['Approved', 'Rejected', 'More Docs'] as RequestStatus[]).map((status) => (
                <button key={status} type="button" onClick={() => onStatusChange(request.id, status)} className="rounded-sm border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">
                  {status}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CustomersPanel({ customers, bookings }: { customers: AdminCustomer[]; bookings: AdminBooking[] }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Customer Records</p>
      <div className="mt-5 space-y-4">
        {customers.map((customer) => (
          <Link key={customer.id} href={`/admin/customers/${customer.id}`} className="block rounded-sm border border-white/10 bg-black/25 p-5 transition-all hover:border-[#FBBF24]/35">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">{customer.id}</p>
                <h3 className="mt-2 font-serif text-2xl text-white">{customer.name}</h3>
                <p className="mt-1 text-sm text-white/50">{customer.email} / {customer.phone}</p>
              </div>
              <p className="text-sm text-white/55">{bookings.filter((booking) => booking.customerId === customer.id).length} visible bookings</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CustomerDetailPanel({ customer, bookings }: { customer: AdminCustomer; bookings: AdminBooking[] }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">{customer.id}</p>
      <h2 className="mt-2 font-serif text-3xl text-white">{customer.name}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailItem label="Phone" value={customer.phone} />
        <DetailItem label="Email" value={customer.email} />
        <DetailItem label="Address" value={customer.address} />
        <DetailItem label="Payment History" value={customer.paymentHistory} />
      </div>
      <div className="mt-7">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Booking History</p>
        <div className="mt-4 space-y-3">
          {bookings.map((booking) => (
            <BookingMini key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsPanel({ bookings, workers, paid, pending }: { bookings: AdminBooking[]; workers: AdminWorker[]; paid: number; pending: number }) {
  const cashTotal = bookings.filter((booking) => booking.paymentMethod.includes('Cash')).reduce((total, booking) => total + booking.price, 0);
  const cardTotal = bookings.filter((booking) => booking.paymentMethod.includes('card')).reduce((total, booking) => total + booking.price, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricCard label="Paid" value={`GBP ${paid}`} helper="Received payments" />
        <MetricCard label="Pending" value={`GBP ${pending}`} helper="Awaiting collection" />
        <MetricCard label="Cash jobs" value={`GBP ${cashTotal}`} helper="Pay after repair" />
        <MetricCard label="Card jobs" value={`GBP ${cardTotal}`} helper="Online payments" />
      </div>
      <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Payment Breakdown</p>
        <div className="mt-5 space-y-3">
          {bookings.map((booking) => (
            <BookingMini key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
      <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Worker Earnings</p>
        <div className="mt-5 space-y-3">
          {workers.map((worker) => (
            <div key={worker.id} className="flex flex-col justify-between gap-3 rounded-sm border border-white/10 bg-black/25 p-4 md:flex-row">
              <span className="text-sm text-white">{worker.name}</span>
              <span className="font-mono text-sm text-[#FBBF24]">GBP {worker.earnings}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState(adminMessages);

  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Customer Messages</p>
      <div className="mt-5 space-y-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded-sm border border-white/10 bg-black/25 p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">{message.id}</p>
                <h3 className="mt-2 font-serif text-2xl text-white">{message.subject}</h3>
                <p className="mt-1 text-sm text-white/50">{message.name} / {message.email}</p>
              </div>
              <span className="h-fit rounded-sm border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/55">{message.status}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/55">{message.message}</p>
            <button
              type="button"
              onClick={() => setMessages((current) => current.map((item) => (item.id === message.id ? { ...item, status: 'Replied' } : item)))}
              className="mt-4 rounded-sm bg-[#FBBF24] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#0B1220] hover:bg-[#F59E0B]"
            >
              Mark Replied
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({ savedMessage, onSave }: { savedMessage: string; onSave: (message: string) => void }) {
  const [companyPhone, setCompanyPhone] = useState('020 8015 7153');
  const [companyEmail, setCompanyEmail] = useState('info@eliteplumbingservices.co.uk');
  const [serviceArea, setServiceArea] = useState('West, South West, Central, North, East, and South East London');
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave('Admin settings saved for frontend preview. Backend settings API can connect next.');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Company Settings</p>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputShell label="Company Phone" value={companyPhone} onChange={setCompanyPhone} />
        <InputShell label="Company Email" value={companyEmail} onChange={setCompanyEmail} />
        <label className="md:col-span-2">
          <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">Service Areas</span>
          <textarea value={serviceArea} onChange={(event) => setServiceArea(event.target.value)} rows={3} className="w-full rounded-sm border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-[#FBBF24]/60 focus:outline-none" />
        </label>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        <ToggleRow title="Emergency booking alerts" checked={emergencyAlerts} onChange={setEmergencyAlerts} />
        <ToggleRow title="Payment received alerts" checked={paymentAlerts} onChange={setPaymentAlerts} />
      </div>
      {savedMessage && <div className="mt-5 rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{savedMessage}</div>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="rounded-sm bg-[#FBBF24] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#0B1220] hover:bg-[#F59E0B]">Save Settings</button>
        <button type="button" className="rounded-sm border border-red-400/25 px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-200 hover:bg-red-400/10">Logout</button>
      </div>
    </form>
  );
}

function NotificationsPanel() {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Admin Alerts</p>
      <div className="mt-5 space-y-3">
        {adminNotifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  onStatusChange,
  onAssign,
}: {
  booking: AdminBooking;
  onStatusChange?: (bookingId: string, status: BookingStatus) => void;
  onAssign: (bookingId: string, workerName: string) => void;
}) {
  return (
    <article className="rounded-sm border border-white/10 bg-black/25 p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">{booking.id}</span>
            <span className={`rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${bookingStatusClass[booking.status]}`}>{booking.status}</span>
            {booking.urgency === 'Emergency' && <span className="rounded-sm border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-200">Emergency</span>}
          </div>
          <h3 className="mt-3 font-serif text-2xl text-white">{booking.service}</h3>
          <p className="mt-2 text-sm leading-6 text-white/50">{booking.customerName} / {booking.address}, {booking.postcode}</p>
          <p className="mt-1 text-xs text-white/40">{booking.date}, {booking.time}</p>
        </div>
        <div className="rounded-sm border border-white/10 bg-[#0B1220] px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Payment</p>
          <p className="mt-1 text-sm text-[#FBBF24]">GBP {booking.price}</p>
          <p className={booking.paymentStatus === 'Paid' ? 'mt-1 text-xs text-emerald-200' : 'mt-1 text-xs text-[#FBBF24]'}>
            {booking.paymentStatus}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/admin/bookings/${booking.id}`} className="rounded-sm border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">View Details</Link>
        <button type="button" onClick={() => onAssign(booking.id, 'Daniel Price')} className="rounded-sm border border-[#FBBF24]/35 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#FBBF24] hover:bg-[#FBBF24]/10">Assign Worker</button>
        {onStatusChange && (
          <button type="button" onClick={() => onStatusChange(booking.id, 'In Progress')} className="rounded-sm border border-violet-400/35 px-5 py-3 text-xs font-bold uppercase tracking-widest text-violet-200 hover:bg-violet-400/10">Mark Progress</button>
        )}
      </div>
    </article>
  );
}

function WorkerCard({ worker, onStatusChange }: { worker: AdminWorker; onStatusChange: (workerId: string, status: WorkerStatus) => void }) {
  return (
    <article className="rounded-sm border border-white/10 bg-black/25 p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">{worker.id}</p>
          <h3 className="mt-2 font-serif text-2xl text-white">{worker.name}</h3>
          <p className="mt-1 text-sm text-white/50">{worker.area}</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-[#FBBF24]"><Star className="h-3.5 w-3.5 fill-current" /> {worker.rating} / {worker.completedJobs} completed</p>
        </div>
        <span className={`h-fit rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${workerStatusClass[worker.status]}`}>
          {worker.status}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {worker.skills.map((skill) => (
          <span key={skill} className="rounded-sm border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-2.5 py-1 text-xs text-[#FBBF24]">{skill}</span>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/admin/workers/${worker.id}`} className="rounded-sm border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">View Worker</Link>
        <button type="button" onClick={() => onStatusChange(worker.id, worker.status === 'Available' ? 'Busy' : 'Available')} className="rounded-sm border border-[#FBBF24]/35 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#FBBF24] hover:bg-[#FBBF24]/10">Toggle Status</button>
      </div>
    </article>
  );
}

function BookingMini({ booking }: { booking: AdminBooking }) {
  return (
    <Link href={`/admin/bookings/${booking.id}`} className="grid grid-cols-1 gap-3 rounded-sm border border-white/10 bg-black/25 p-4 transition-all hover:border-[#FBBF24]/35 md:grid-cols-[1fr_120px_120px] md:items-center">
      <div>
        <p className="text-sm font-semibold text-white">{booking.id} - {booking.service}</p>
        <p className="mt-1 text-xs text-white/45">{booking.customerName} / {booking.date}</p>
      </div>
      <p className="font-mono text-sm text-[#FBBF24]">GBP {booking.price}</p>
      <p className={booking.paymentStatus === 'Paid' ? 'text-sm text-emerald-200' : 'text-sm text-[#FBBF24]'}>{booking.paymentStatus}</p>
    </Link>
  );
}

function MetricCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-3 font-serif text-4xl text-[#FBBF24]">{value}</p>
      <p className="mt-2 text-xs text-white/45">{helper}</p>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/25 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/70">{value}</p>
    </div>
  );
}

function MapPanel({ postcode }: { postcode: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#FBBF24]">Map Preview</p>
      <div className="mt-4 flex aspect-square items-center justify-center rounded-sm border border-white/10 bg-black/35 text-center">
        <div>
          <Map className="mx-auto h-10 w-10 text-[#FBBF24]" />
          <p className="mt-3 text-sm text-white/70">{postcode}</p>
          <p className="mt-1 text-xs text-white/40">Map API can connect later.</p>
        </div>
      </div>
    </div>
  );
}

function TimelinePanel({ booking }: { booking: AdminBooking }) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-[#FBBF24]">Timeline</p>
      <div className="mt-4 space-y-3">
        {['Booking created', `Status: ${booking.status}`, `Worker: ${booking.assignedWorker}`, `Proof: ${booking.proof}`].map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm text-white/60">
            <CheckCircle className="mt-0.5 h-4 w-4 text-[#FBBF24]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminMiniPanel({ title, count, href, copy }: { title: string; count: number; href: string; copy: string }) {
  return (
    <Link href={href} className="block rounded-sm border border-white/10 bg-[#0B1220] p-5 transition-all hover:border-[#FBBF24]/35">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{title}</p>
      <p className="mt-3 font-serif text-4xl text-[#FBBF24]">{count}</p>
      <p className="mt-2 text-xs text-white/45">{copy}</p>
    </Link>
  );
}

function NotificationsMini() {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Notifications</p>
        <Link href="/admin/notifications" className="text-[10px] uppercase tracking-widest text-white/45 hover:text-[#FBBF24]">View all</Link>
      </div>
      <div className="mt-4 space-y-3">
        {adminNotifications.slice(0, 3).map((item) => (
          <NotificationCard key={item.id} item={item} compact />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ item, compact = false }: { item: AdminNotification; compact?: boolean }) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/25 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
        <div>
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className={`${compact ? 'mt-1' : 'mt-2'} text-xs leading-5 text-white/50`}>{item.message}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/30">{item.time}</p>
        </div>
      </div>
    </div>
  );
}

function InputShell({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-sm border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#FBBF24]/60 focus:outline-none" />
    </label>
  );
}

function ToggleRow({ title, checked, onChange }: { title: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`rounded-sm border p-4 text-left transition-all ${checked ? 'border-[#FBBF24]/45 bg-[#FBBF24]/10' : 'border-white/10 bg-black/25'}`}>
      <span className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">{title}</span>
        <span className={checked ? 'text-[#FBBF24]' : 'text-white/35'}>{checked ? 'On' : 'Off'}</span>
      </span>
    </button>
  );
}
