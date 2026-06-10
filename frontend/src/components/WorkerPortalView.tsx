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
  ShieldCheck,
  Star,
  Wrench,
  X,
} from 'lucide-react';

type WorkerPortalMode = 'dashboard' | 'profile' | 'jobs' | 'job-detail' | 'earnings' | 'settings' | 'notifications' | 'register-success';
type WorkerStatus = 'available' | 'busy';
type JobStatus = 'New Assigned' | 'Accepted' | 'On The Way' | 'In Progress' | 'Completed' | 'Cancelled';
type PaymentStatus = 'Paid' | 'Pending';

type WorkerPortalViewProps = {
  mode: WorkerPortalMode;
  jobId?: string;
};

type WorkerJob = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  postcode: string;
  jobType: string;
  issue: string;
  issueDescription: string;
  date: string;
  time: string;
  status: JobStatus;
  paymentType: string;
  paymentStatus: PaymentStatus;
  earning: number;
  rating?: number;
  proofStatus: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'job' | 'booking' | 'payment' | 'system';
};

const workerProfile = {
  name: 'Daniel Price',
  phone: '07700 900442',
  email: 'daniel.price@eliteplumbers.co.uk',
  photoInitials: 'DP',
  specialisation: ['Emergency leaks', 'Pipework', 'Drainage', 'Boiler checks'],
  serviceArea: 'SW, W, and Central London',
  rating: 4.9,
  reviews: 128,
  certificationStatus: 'Gas Safe verified',
  availability: '24/7 emergency cover',
};

const initialJobs: WorkerJob[] = [
  {
    id: 'EP-6128',
    customerName: 'Sathurgini Raj',
    phone: '07700 900077',
    address: '24 Kensington High Street',
    postcode: 'W8 5NP',
    jobType: 'Emergency Water Leak',
    issue: 'Burst pipe below kitchen sink',
    issueDescription: 'Customer reports active water leak from copper pipe under kitchen sink. Stopcock location unknown. Bring isolation valves and leak repair kit.',
    date: '10 June 2026',
    time: '10:30 - 11:30',
    status: 'New Assigned',
    paymentType: 'Cash after repair',
    paymentStatus: 'Pending',
    earning: 95,
    proofStatus: 'Photo proof required',
  },
  {
    id: 'EP-6094',
    customerName: 'Maya Williams',
    phone: '07700 900166',
    address: '18 Fulham Road',
    postcode: 'SW6 1AA',
    jobType: 'Boiler Service',
    issue: 'Annual boiler service and pressure check',
    issueDescription: 'Scheduled boiler service. Customer requested Gas Safe certificate note after completion.',
    date: '10 June 2026',
    time: '14:00 - 17:00',
    status: 'Accepted',
    paymentType: 'Online card',
    paymentStatus: 'Pending',
    earning: 85,
    proofStatus: 'Service sheet pending',
  },
  {
    id: 'EP-5902',
    customerName: 'Oliver Harris',
    phone: '07700 900277',
    address: '9 Clapham Common North Side',
    postcode: 'SW4 0QW',
    jobType: 'Blocked Sink',
    issue: 'Kitchen waste blocked',
    issueDescription: 'Waste trap and pipe run blocked. Clear blockage, test flow, and upload before/after photo.',
    date: '09 June 2026',
    time: '11:00 - 14:00',
    status: 'Completed',
    paymentType: 'Online card',
    paymentStatus: 'Paid',
    earning: 75,
    rating: 5,
    proofStatus: 'Photo proof uploaded',
  },
  {
    id: 'EP-5840',
    customerName: 'Priya Shah',
    phone: '07700 900388',
    address: '31 Greenwich High Road',
    postcode: 'SE10 8JL',
    jobType: 'Radiator Repair',
    issue: 'Radiator valve leak',
    issueDescription: 'Valve weeping after heating system pressure rise. Customer cancelled before visit.',
    date: '02 June 2026',
    time: '17:05 - 20:50',
    status: 'Cancelled',
    paymentType: 'Pay on visit',
    paymentStatus: 'Pending',
    earning: 0,
    proofStatus: 'No proof required',
  },
];

const notifications: NotificationItem[] = [
  {
    id: 'N-1',
    title: 'New job assigned',
    message: 'EP-6128 emergency leak assigned near Kensington. Accept or decline from My Jobs.',
    time: '5 minutes ago',
    type: 'job',
  },
  {
    id: 'N-2',
    title: 'Booking time changed',
    message: 'EP-6094 customer confirmed afternoon slot for boiler service.',
    time: '32 minutes ago',
    type: 'booking',
  },
  {
    id: 'N-3',
    title: 'Payment received',
    message: 'EP-5902 payment marked paid. GBP 75 added to this week earnings.',
    time: 'Yesterday',
    type: 'payment',
  },
  {
    id: 'N-4',
    title: 'Document review reminder',
    message: 'Admin needs updated public liability insurance before commercial jobs.',
    time: '2 days ago',
    type: 'system',
  },
];

const navItems = [
  { href: '/plumber/dashboard', label: 'Home / Overview', mode: 'dashboard' as WorkerPortalMode },
  { href: '/plumber/profile', label: 'My Profile', mode: 'profile' as WorkerPortalMode },
  { href: '/plumber/jobs', label: 'My Jobs', mode: 'jobs' as WorkerPortalMode },
  { href: '/plumber/earnings', label: 'Earnings', mode: 'earnings' as WorkerPortalMode },
  { href: '/plumber/settings', label: 'Settings', mode: 'settings' as WorkerPortalMode },
];

const pageCopy: Record<WorkerPortalMode, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Worker Dashboard',
    subtitle: "Today's summary, next job, availability, and work alerts in one place.",
  },
  profile: {
    title: 'My Profile',
    subtitle: 'Personal details, professional skills, service area, ratings, and document status.',
  },
  jobs: {
    title: 'My Jobs',
    subtitle: 'Assigned jobs with customer details, status controls, proof upload, and job history.',
  },
  'job-detail': {
    title: 'Job Details',
    subtitle: 'Customer details, map preview, issue notes, job actions, and proof upload.',
  },
  earnings: {
    title: 'Earnings',
    subtitle: 'Monthly total, paid and pending breakdown, and per-job earnings.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Account preferences, password, notifications, language, theme, and logout.',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'System alerts, job updates, booking changes, and payment messages.',
  },
  'register-success': {
    title: 'Worker Request Submitted',
    subtitle: 'Admin will review your skills and documents before assigning customer jobs.',
  },
};

const statusClass: Record<JobStatus, string> = {
  'New Assigned': 'border-[#FBBF24]/40 bg-[#FBBF24]/10 text-[#FBBF24]',
  Accepted: 'border-sky-400/35 bg-sky-400/10 text-sky-200',
  'On The Way': 'border-cyan-400/35 bg-cyan-400/10 text-cyan-200',
  'In Progress': 'border-violet-400/35 bg-violet-400/10 text-violet-200',
  Completed: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200',
  Cancelled: 'border-red-400/35 bg-red-400/10 text-red-200',
};

export function WorkerPortalView({ mode, jobId }: WorkerPortalViewProps) {
  const [workerStatus, setWorkerStatus] = useState<WorkerStatus>('available');
  const [jobs, setJobs] = useState<WorkerJob[]>(initialJobs);
  const [jobTab, setJobTab] = useState<'new' | 'progress' | 'done' | 'past'>('new');
  const [historyStatus, setHistoryStatus] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [historyMonth, setHistoryMonth] = useState('June 2026');
  const [settingsSaved, setSettingsSaved] = useState('');

  const activeJob = jobs.find((job) => job.id === jobId) ?? jobs[0];
  const todayJobs = jobs.filter((job) => job.date === '10 June 2026' && job.status !== 'Cancelled');
  const weekEarnings = jobs.filter((job) => job.paymentStatus === 'Paid').reduce((total, job) => total + job.earning, 0);
  const monthlyEarnings = jobs.reduce((total, job) => total + job.earning, 0);
  const pendingEarnings = jobs.filter((job) => job.paymentStatus === 'Pending').reduce((total, job) => total + job.earning, 0);
  const paidEarnings = jobs.filter((job) => job.paymentStatus === 'Paid').reduce((total, job) => total + job.earning, 0);

  const updateJobStatus = (jobIdToUpdate: string, status: JobStatus) => {
    setJobs((current) => current.map((job) => (job.id === jobIdToUpdate ? { ...job, status } : job)));
  };

  const filteredJobs = useMemo(() => {
    if (jobTab === 'new') return jobs.filter((job) => job.status === 'New Assigned');
    if (jobTab === 'progress') return jobs.filter((job) => ['Accepted', 'On The Way', 'In Progress'].includes(job.status));
    if (jobTab === 'done') return jobs.filter((job) => job.status === 'Completed');
    return jobs.filter((job) => {
      const matchesStatus =
        historyStatus === 'all' ||
        (historyStatus === 'completed' && job.status === 'Completed') ||
        (historyStatus === 'cancelled' && job.status === 'Cancelled');
      return matchesStatus && job.date.includes(historyMonth.split(' ')[0]);
    });
  }, [historyMonth, historyStatus, jobTab, jobs]);

  const content = pageCopy[mode];

  if (mode === 'register-success') {
    return <WorkerRegisterSuccess />;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E7EB]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1220]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),linear-gradient(135deg,rgba(11,18,32,0.96),rgba(5,5,5,0.96))]" />
        <div className="absolute inset-0 text-white opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="worker-portal-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#worker-portal-grid)" />
          </svg>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
              Elite Worker Portal
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-6xl">{content.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">{content.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/plumber/notifications"
              className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 bg-black/25 text-[#FBBF24] transition-all hover:border-[#FBBF24]/45"
              aria-label="Open notifications"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FBBF24] font-mono text-[10px] font-bold text-[#0B1220]">
                {notifications.length}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setWorkerStatus((current) => (current === 'available' ? 'busy' : 'available'))}
              className={`rounded-sm border px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                workerStatus === 'available'
                  ? 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200'
                  : 'border-red-400/35 bg-red-400/10 text-red-200'
              }`}
            >
              {workerStatus === 'available' ? 'Available' : 'Busy'}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
        <WorkerSidebar activeMode={mode} />
        <div>
          {mode === 'dashboard' && (
            <DashboardPanel
              todayJobs={todayJobs}
              weekEarnings={weekEarnings}
              nextJob={jobs[0]}
              workerStatus={workerStatus}
              onToggleStatus={() => setWorkerStatus((current) => (current === 'available' ? 'busy' : 'available'))}
            />
          )}
          {mode === 'profile' && <ProfilePanel />}
          {mode === 'jobs' && (
            <JobsPanel
              jobs={filteredJobs}
              allJobs={jobs}
              activeTab={jobTab}
              historyMonth={historyMonth}
              historyStatus={historyStatus}
              onTabChange={setJobTab}
              onMonthChange={setHistoryMonth}
              onHistoryStatusChange={setHistoryStatus}
              onStatusChange={updateJobStatus}
            />
          )}
          {mode === 'job-detail' && <JobDetailPanel job={activeJob} onStatusChange={updateJobStatus} />}
          {mode === 'earnings' && (
            <EarningsPanel jobs={jobs} monthlyEarnings={monthlyEarnings} paidEarnings={paidEarnings} pendingEarnings={pendingEarnings} />
          )}
          {mode === 'settings' && <SettingsPanel savedMessage={settingsSaved} onSave={setSettingsSaved} />}
          {mode === 'notifications' && <NotificationsPanel />}
        </div>
      </section>
    </main>
  );
}

function WorkerSidebar({ activeMode }: { activeMode: WorkerPortalMode }) {
  return (
    <aside className="h-fit rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <div className="border-b border-white/10 pb-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-[#FBBF24]/45 bg-black/35 font-serif text-2xl text-[#FBBF24]">
          {workerProfile.photoInitials}
        </div>
        <h2 className="mt-4 font-serif text-2xl text-white">{workerProfile.name}</h2>
        <p className="mt-1 text-xs text-white/45">{workerProfile.certificationStatus}</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-[#FBBF24]">
          <Star className="h-3.5 w-3.5 fill-current" />
          {workerProfile.rating} from {workerProfile.reviews} reviews
        </p>
      </div>

      <nav className="mt-5 space-y-2">
        {navItems.map((item) => (
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
  todayJobs,
  weekEarnings,
  nextJob,
  workerStatus,
  onToggleStatus,
}: {
  todayJobs: WorkerJob[];
  weekEarnings: number;
  nextJob: WorkerJob;
  workerStatus: WorkerStatus;
  onToggleStatus: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard label="Today's job count" value={String(todayJobs.length)} helper="Assigned for today" />
        <MetricCard label="Earnings this week" value={`GBP ${weekEarnings}`} helper="Paid completed work" />
        <MetricCard label="Current status" value={workerStatus === 'available' ? 'Available' : 'Busy'} helper="Tap status button to update" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Next Job Card</p>
              <h2 className="mt-2 font-serif text-3xl text-white">{nextJob.jobType}</h2>
            </div>
            <span className={`rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusClass[nextJob.status]}`}>
              {nextJob.status}
            </span>
          </div>
          <JobBrief job={nextJob} />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href={`/plumber/jobs/${nextJob.id}`} className="rounded-sm bg-[#FBBF24] px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-[#0B1220] hover:bg-[#F59E0B]">
              Open Job Details
            </Link>
            <button type="button" onClick={onToggleStatus} className="rounded-sm border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">
              Set {workerStatus === 'available' ? 'Busy' : 'Available'}
            </button>
          </div>
        </div>

        <NotificationsMini />
      </div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-sm border border-[#FBBF24]/45 bg-black/35 font-serif text-3xl text-[#FBBF24]">
          {workerProfile.photoInitials}
        </div>
        <div>
          <h2 className="font-serif text-3xl text-white">{workerProfile.name}</h2>
          <p className="mt-1 text-sm text-white/50">{workerProfile.email}</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-[#FBBF24]">
            <Phone className="h-4 w-4" />
            {workerProfile.phone}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <InfoBlock title="Specialisation" items={workerProfile.specialisation} />
        <div className="rounded-sm border border-white/10 bg-black/25 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Service Area</p>
          <p className="mt-2 text-sm text-white/75">{workerProfile.serviceArea}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/40">Availability</p>
          <p className="mt-2 text-sm text-white/75">{workerProfile.availability}</p>
        </div>
        <div className="rounded-sm border border-white/10 bg-black/25 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Ratings & Reviews</p>
          <p className="mt-2 flex items-center gap-2 font-serif text-3xl text-[#FBBF24]">
            <Star className="h-5 w-5 fill-current" />
            {workerProfile.rating}
          </p>
          <p className="mt-1 text-sm text-white/50">{workerProfile.reviews} customer reviews received</p>
        </div>
        <div className="rounded-sm border border-emerald-400/25 bg-emerald-400/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-200">Document Status</p>
          <p className="mt-2 text-sm text-emerald-100">{workerProfile.certificationStatus}</p>
          <p className="mt-1 text-xs text-white/45">Insurance and right-to-work documents ready for admin review.</p>
        </div>
      </div>
    </div>
  );
}

function JobsPanel({
  jobs,
  allJobs,
  activeTab,
  historyMonth,
  historyStatus,
  onTabChange,
  onMonthChange,
  onHistoryStatusChange,
  onStatusChange,
}: {
  jobs: WorkerJob[];
  allJobs: WorkerJob[];
  activeTab: 'new' | 'progress' | 'done' | 'past';
  historyMonth: string;
  historyStatus: 'all' | 'completed' | 'cancelled';
  onTabChange: (tab: 'new' | 'progress' | 'done' | 'past') => void;
  onMonthChange: (month: string) => void;
  onHistoryStatusChange: (status: 'all' | 'completed' | 'cancelled') => void;
  onStatusChange: (jobId: string, status: JobStatus) => void;
}) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Assigned Jobs</p>
          <h2 className="mt-2 font-serif text-3xl text-white">Customer work queue</h2>
        </div>
        <div className="grid grid-cols-4 rounded-sm border border-white/10 bg-black/30 p-1 text-center">
          {[
            ['new', 'New'],
            ['progress', 'In-progress'],
            ['done', 'Done'],
            ['past', 'Past'],
          ].map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab as 'new' | 'progress' | 'done' | 'past')}
              className={`rounded-sm px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-[#FBBF24] text-[#0B1220]' : 'text-white/55 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'past' && (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select value={historyMonth} onChange={(event) => onMonthChange(event.target.value)} className="rounded-sm border border-white/10 bg-[#050505] px-3 py-3 text-xs text-white">
            <option className="bg-[#0B1220]">June 2026</option>
            <option className="bg-[#0B1220]">May 2026</option>
            <option className="bg-[#0B1220]">April 2026</option>
          </select>
          <select value={historyStatus} onChange={(event) => onHistoryStatusChange(event.target.value as 'all' | 'completed' | 'cancelled')} className="rounded-sm border border-white/10 bg-[#050505] px-3 py-3 text-xs text-white">
            <option className="bg-[#0B1220]" value="all">All statuses</option>
            <option className="bg-[#0B1220]" value="completed">Completed only</option>
            <option className="bg-[#0B1220]" value="cancelled">Cancelled only</option>
          </select>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} showHistory={activeTab === 'past'} onStatusChange={onStatusChange} />
        ))}
        {jobs.length === 0 && (
          <div className="rounded-sm border border-white/10 bg-black/25 p-6 text-sm text-white/50">
            No jobs found for this filter. Total assigned mock jobs: {allJobs.length}.
          </div>
        )}
      </div>
    </div>
  );
}

function JobDetailPanel({ job, onStatusChange }: { job: WorkerJob; onStatusChange: (jobId: string, status: JobStatus) => void }) {
  const [proofFiles, setProofFiles] = useState<File[]>([]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">{job.id}</p>
            <h2 className="mt-2 font-serif text-3xl text-white">{job.jobType}</h2>
            <p className="mt-2 text-sm leading-6 text-white/50">{job.issueDescription}</p>
          </div>
          <span className={`rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusClass[job.status]}`}>
            {job.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DetailItem label="Customer" value={job.customerName} />
          <DetailItem label="Phone" value={job.phone} />
          <DetailItem label="Address" value={`${job.address}, ${job.postcode}`} />
          <DetailItem label="Date & Time" value={`${job.date}, ${job.time}`} />
          <DetailItem label="Payment" value={`${job.paymentType} - ${job.paymentStatus}`} />
          <DetailItem label="Earning" value={`GBP ${job.earning}`} />
        </div>

        <div className="mt-6 rounded-sm border border-white/10 bg-black/25 p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Issue Description</p>
          <p className="mt-2 text-sm leading-7 text-white/65">{job.issueDescription}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <button type="button" onClick={() => onStatusChange(job.id, 'Accepted')} className="rounded-sm border border-[#FBBF24]/35 px-3 py-3 text-xs font-bold uppercase tracking-widest text-[#FBBF24] hover:bg-[#FBBF24]/10">Accept Job</button>
          <button type="button" onClick={() => onStatusChange(job.id, 'On The Way')} className="rounded-sm border border-cyan-400/35 px-3 py-3 text-xs font-bold uppercase tracking-widest text-cyan-200 hover:bg-cyan-400/10">Start Travel</button>
          <button type="button" onClick={() => onStatusChange(job.id, 'In Progress')} className="rounded-sm border border-violet-400/35 px-3 py-3 text-xs font-bold uppercase tracking-widest text-violet-200 hover:bg-violet-400/10">Start Work</button>
          <button type="button" onClick={() => onStatusChange(job.id, 'Completed')} className="rounded-sm border border-emerald-400/35 px-3 py-3 text-xs font-bold uppercase tracking-widest text-emerald-200 hover:bg-emerald-400/10">Complete Job</button>
          <button type="button" onClick={() => onStatusChange(job.id, 'Cancelled')} className="rounded-sm border border-red-400/35 px-3 py-3 text-xs font-bold uppercase tracking-widest text-red-200 hover:bg-red-400/10">Cancel Job</button>
          <a href={`tel:${job.phone}`} className="rounded-sm bg-[#FBBF24] px-3 py-3 text-center text-xs font-bold uppercase tracking-widest text-[#0B1220] hover:bg-[#F59E0B]">Call Customer</a>
        </div>

        <div className="mt-6 rounded-sm border border-white/10 bg-black/25 p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Upload Photo Proof</p>
          <label className="mt-3 flex cursor-pointer flex-col items-center rounded-sm border border-dashed border-white/15 bg-[#050505] px-4 py-6 text-center hover:border-[#FBBF24]/45">
            <FileText className="h-8 w-8 text-[#FBBF24]" />
            <span className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-white">Choose proof photo</span>
            <span className="mt-1 text-[11px] text-white/40">Upload before/after repair images for admin and customer record.</span>
            <input type="file" multiple accept=".png,.jpg,.jpeg" className="hidden" onChange={(event) => setProofFiles(Array.from(event.target.files ?? []))} />
          </label>
          {proofFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {proofFiles.map((file) => (
                <div key={`${file.name}-${file.size}`} className="rounded-sm border border-white/10 bg-[#050505] px-3 py-2 text-xs text-white/65">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#FBBF24]">Customer Map</p>
          <div className="mt-4 flex aspect-square items-center justify-center rounded-sm border border-white/10 bg-black/35 text-center">
            <div>
              <Map className="mx-auto h-10 w-10 text-[#FBBF24]" />
              <p className="mt-3 text-sm text-white/70">{job.postcode}</p>
              <p className="mt-1 text-xs text-white/40">Map API can connect here later.</p>
            </div>
          </div>
        </div>
        <NotificationsMini />
      </div>
    </div>
  );
}

function EarningsPanel({ jobs, monthlyEarnings, paidEarnings, pendingEarnings }: { jobs: WorkerJob[]; monthlyEarnings: number; paidEarnings: number; pendingEarnings: number }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard label="Total earned this month" value={`GBP ${monthlyEarnings}`} helper="Mock monthly total" />
        <MetricCard label="Paid" value={`GBP ${paidEarnings}`} helper="Received payments" />
        <MetricCard label="Pending" value={`GBP ${pendingEarnings}`} helper="Waiting for admin/payment" />
      </div>

      <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Per-job Earnings</p>
        <div className="mt-5 space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="grid grid-cols-1 gap-3 rounded-sm border border-white/10 bg-black/25 p-4 md:grid-cols-[1fr_120px_120px] md:items-center">
              <div>
                <p className="text-sm font-semibold text-white">{job.id} - {job.jobType}</p>
                <p className="mt-1 text-xs text-white/45">{job.date} / {job.customerName}</p>
              </div>
              <p className="font-mono text-sm text-[#FBBF24]">GBP {job.earning}</p>
              <p className={job.paymentStatus === 'Paid' ? 'text-sm text-emerald-200' : 'text-sm text-[#FBBF24]'}>{job.paymentStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({ savedMessage, onSave }: { savedMessage: string; onSave: (message: string) => void }) {
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Dark elite');
  const [jobAlerts, setJobAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave('Settings saved for frontend preview. Backend account preferences can connect next.');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-white/10 bg-[#0B1220] p-5 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Account Preferences</p>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputShell label="Current Password" type="password" placeholder="Enter current password" />
        <InputShell label="New Password" type="password" placeholder="Enter new password" />
        <SelectShell label="Language" value={language} onChange={setLanguage} options={['English', 'Tamil', 'Sinhala']} />
        <SelectShell label="Theme" value={theme} onChange={setTheme} options={['Dark elite', 'High contrast', 'System default']} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        <ToggleRow title="New job assigned alerts" checked={jobAlerts} onChange={setJobAlerts} />
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
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">All Alerts</p>
      <div className="mt-5 space-y-3">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function WorkerRegisterSuccess() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 py-16 text-[#E5E7EB]">
      <div className="mx-auto max-w-3xl rounded-sm border border-[#FBBF24]/30 bg-[#0B1220] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FBBF24]/10 text-[#FBBF24]">
          <CheckCircle className="h-9 w-9" />
        </div>
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">Request Submitted</p>
        <h1 className="mt-3 font-serif text-4xl text-white">Worker registration sent.</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55">
          Admin will review your skills, certifications, upload documents, service area, and availability. After approval, you can login and accept assigned jobs.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-sm border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">Back Home</Link>
          <Link href="/plumber/dashboard" className="rounded-sm bg-[#FBBF24] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#0B1220] hover:bg-[#F59E0B]">Preview Worker Dashboard</Link>
        </div>
      </div>
    </main>
  );
}

function JobCard({ job, showHistory, onStatusChange }: { job: WorkerJob; showHistory: boolean; onStatusChange: (jobId: string, status: JobStatus) => void }) {
  return (
    <article className="rounded-sm border border-white/10 bg-black/25 p-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]">{job.id}</span>
            <span className={`rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusClass[job.status]}`}>{job.status}</span>
          </div>
          <h3 className="mt-3 font-serif text-2xl text-white">{job.jobType}</h3>
          <p className="mt-2 text-sm leading-6 text-white/50">{job.customerName} / {job.address}, {job.postcode}</p>
          <p className="mt-1 text-xs text-white/40">{job.date}, {job.time}</p>
        </div>
        <div className="rounded-sm border border-white/10 bg-[#0B1220] px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Earnings</p>
          <p className="mt-1 text-lg font-semibold text-[#FBBF24]">GBP {job.earning}</p>
          {job.rating && <p className="mt-1 text-xs text-emerald-200">Customer rating {job.rating}/5</p>}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/plumber/jobs/${job.id}`} className="rounded-sm border border-white/15 px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-white/75 hover:border-[#FBBF24]/45 hover:text-[#FBBF24]">View Job</Link>
        {!showHistory && job.status === 'New Assigned' && (
          <>
            <button type="button" onClick={() => onStatusChange(job.id, 'Accepted')} className="rounded-sm border border-emerald-400/35 px-5 py-3 text-xs font-bold uppercase tracking-widest text-emerald-200 hover:bg-emerald-400/10">Accept</button>
            <button type="button" onClick={() => onStatusChange(job.id, 'Cancelled')} className="rounded-sm border border-red-400/35 px-5 py-3 text-xs font-bold uppercase tracking-widest text-red-200 hover:bg-red-400/10">Decline</button>
          </>
        )}
      </div>
    </article>
  );
}

function JobBrief({ job }: { job: WorkerJob }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <DetailItem label="Customer" value={job.customerName} />
      <DetailItem label="Location" value={`${job.address}, ${job.postcode}`} />
      <DetailItem label="Date & Time" value={`${job.date}, ${job.time}`} />
      <DetailItem label="Payment" value={`${job.paymentType} / ${job.paymentStatus}`} />
    </div>
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

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/25 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-sm border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-3 py-1 text-xs text-[#FBBF24]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function NotificationsMini() {
  return (
    <div className="rounded-sm border border-white/10 bg-[#0B1220] p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">Notifications</p>
        <Link href="/plumber/notifications" className="text-[10px] uppercase tracking-widest text-white/45 hover:text-[#FBBF24]">View all</Link>
      </div>
      <div className="mt-4 space-y-3">
        {notifications.slice(0, 3).map((item) => (
          <NotificationCard key={item.id} item={item} compact />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ item, compact = false }: { item: NotificationItem; compact?: boolean }) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/25 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
        <div>
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className={`${compact ? 'mt-1 line-clamp-2' : 'mt-2'} text-xs leading-5 text-white/50`}>{item.message}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/30">{item.time}</p>
        </div>
      </div>
    </div>
  );
}

function InputShell({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <label>
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">{label}</span>
      <input type={type} placeholder={placeholder} className="w-full rounded-sm border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#FBBF24]/60 focus:outline-none" />
    </label>
  );
}

function SelectShell({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label>
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-sm border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-[#FBBF24]/60 focus:outline-none">
        {options.map((option) => (
          <option key={option} className="bg-[#0B1220]" value={option}>{option}</option>
        ))}
      </select>
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
