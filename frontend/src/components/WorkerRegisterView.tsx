'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data';

type WorkerAvailability = '24_7' | 'day_shift' | 'evening_weekend';
type CertificateFileGroup = 'gasSafe' | 'tradeCertificate' | 'insuranceRightToWork' | 'otherDocument';

type WorkerForm = {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  categoryIds: string[];
  serviceIds: string[];
  otherDescription: string;
  availability: WorkerAvailability | '';
  experience: string;
  gasSafeNumber: string;
  certificationRequirement: string;
  certificationNotes: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UK_PHONE_REGEX = /^(?:\+44|0)\d{10}$/;
const UK_POSTCODE_OR_PREFIX_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?(?:\s*\d[A-Z]{2})?$/i;

const OTHER_CATEGORY_ID = 'other-worker-skill';
const OTHER_SERVICE_ID = 'other-worker-service';

const availabilityOptions: { value: WorkerAvailability; title: string; copy: string }[] = [
  {
    value: '24_7',
    title: '24/7 emergency work',
    copy: 'Available for night, weekend, and urgent call-out jobs.',
  },
  {
    value: 'day_shift',
    title: 'Day shift',
    copy: 'Available for normal scheduled jobs during working hours.',
  },
  {
    value: 'evening_weekend',
    title: 'Evening / weekend',
    copy: 'Available outside normal daytime hours, but not full 24/7.',
  },
];

const certificationOptions = [
  {
    value: 'gas_safe',
    title: 'Gas Safe certified',
    copy: 'Required for gas, boiler, CP12, cooker, and heating gas appliance work.',
  },
  {
    value: 'trade_certificate',
    title: 'Trade / plumbing certificate',
    copy: 'NVQ, City & Guilds, apprenticeship certificate, or similar plumbing qualification.',
  },
  {
    value: 'insurance_only',
    title: 'Insurance and experience',
    copy: 'Public liability insurance and practical experience, but no gas certification.',
  },
  {
    value: 'other',
    title: 'Other certification',
    copy: 'Use this if you have another relevant document or specialist approval.',
  },
];

const initialForm: WorkerForm = {
  fullName: '',
  phone: '',
  email: '',
  postcode: '',
  categoryIds: [],
  serviceIds: [],
  otherDescription: '',
  availability: '',
  experience: '',
  gasSafeNumber: '',
  certificationRequirement: '',
  certificationNotes: '',
};

export function WorkerRegisterView() {
  const [formData, setFormData] = useState<WorkerForm>(initialForm);
  const [certificateFiles, setCertificateFiles] = useState<Record<CertificateFileGroup, File[]>>({
    gasSafe: [],
    tradeCertificate: [],
    insuranceRightToWork: [],
    otherDocument: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const selectedCategories = SERVICE_CATEGORIES.filter((category) => formData.categoryIds.includes(category.id));
  const isOtherSelected =
    formData.categoryIds.includes(OTHER_CATEGORY_ID) ||
    formData.serviceIds.some((serviceId) => serviceId.startsWith(OTHER_SERVICE_ID));
  const hasCertificationSensitiveWork = selectedCategories.some((category) =>
    ['boiler-heating', 'gas-services', 'commercial-plumbing'].includes(category.id)
  );
  const uploadedCertificateCount = Object.values(certificateFiles).reduce((total, files) => total + files.length, 0);

  const updateField = (fields: Partial<WorkerForm>) => {
    setFormData((current) => ({ ...current, ...fields }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(fields).forEach((key) => delete next[key]);
      return next;
    });
    setSuccessMessage('');
  };

  const toggleCategory = (categoryId: string) => {
    setFormData((current) => {
      const isSelected = current.categoryIds.includes(categoryId);
      const nextCategoryIds = isSelected
        ? current.categoryIds.filter((id) => id !== categoryId)
        : [...current.categoryIds, categoryId];
      const removedCategory = SERVICE_CATEGORIES.find((category) => category.id === categoryId);
      const removedServiceIds = removedCategory?.services.map((service) => service.id) ?? [];
      const nextServiceIds = isSelected
        ? current.serviceIds.filter((id) => !removedServiceIds.includes(id) && id !== `${OTHER_SERVICE_ID}-${categoryId}`)
        : current.serviceIds;

      return {
        ...current,
        categoryIds: nextCategoryIds,
        serviceIds: nextServiceIds,
        otherDescription: current.otherDescription,
      };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next.categoryId;
      delete next.serviceId;
      return next;
    });
    setSuccessMessage('');
  };

  const toggleService = (serviceId: string) => {
    setFormData((current) => ({
      ...current,
      serviceIds: current.serviceIds.includes(serviceId)
        ? current.serviceIds.filter((id) => id !== serviceId)
        : [...current.serviceIds, serviceId],
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.serviceId;
      return next;
    });
    setSuccessMessage('');
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const rawPhone = formData.phone.replace(/[\s()-]/g, '');

    if (formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your full name.';
    }
    if (!rawPhone) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!UK_PHONE_REGEX.test(rawPhone)) {
      nextErrors.phone = 'Enter a valid UK phone number, e.g. 07700 900077.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.postcode.trim()) {
      nextErrors.postcode = 'Postcode or work area is required.';
    } else if (!UK_POSTCODE_OR_PREFIX_REGEX.test(formData.postcode.trim())) {
      nextErrors.postcode = 'Enter a UK postcode or prefix, e.g. SW19 or SW19 1AA.';
    }
    if (formData.categoryIds.length === 0) {
      nextErrors.categoryId = 'Choose at least one plumbing work type.';
    }
    if (selectedCategories.length > 0 && formData.serviceIds.length === 0 && !formData.categoryIds.includes(OTHER_CATEGORY_ID)) {
      nextErrors.serviceId = 'Choose at least one sub-work option.';
    }
    if (isOtherSelected && formData.otherDescription.trim().length < 12) {
      nextErrors.otherDescription = 'Describe what work you can do.';
    }
    if (!formData.availability) {
      nextErrors.availability = 'Choose when you can work.';
    }
    if (!formData.experience) {
      nextErrors.experience = 'Choose your experience level.';
    }
    if (hasCertificationSensitiveWork && !formData.certificationRequirement) {
      nextErrors.certificationRequirement = 'Choose your certification status.';
    }
    if (hasCertificationSensitiveWork && uploadedCertificateCount === 0) {
      nextErrors.certificateFiles = 'Upload at least one certificate or document.';
    }
    if (formData.certificationRequirement === 'other' && formData.certificationNotes.trim().length < 8) {
      nextErrors.certificationNotes = 'Describe the certification or document you have.';
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('');
      return;
    }

    setSuccessMessage('Worker request is ready for admin review. Backend approval flow can connect next.');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E7EB]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1220]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),linear-gradient(135deg,rgba(11,18,32,0.96),rgba(5,5,5,0.96))]" />
        <div className="absolute inset-0 text-white opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="worker-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#worker-grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-18">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/55 hover:text-white">
            <ChevronLeft className="h-4 w-4 text-[#FBBF24]" />
            Back to home
          </Link>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FBBF24]">
                Elite Worker Request
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-6xl">
                Register to work as a plumber.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">
                Tell us your trade skills, sub-work experience, service area, and availability. Admin can review and approve workers before assigning customer jobs.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-sm border border-[#FBBF24]/30 bg-black/35 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 text-[#FBBF24]" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#FBBF24]">Worker Flow</p>
                    <p className="mt-1 text-xs text-white/55">Register, admin approves, then jobs can be assigned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        <form onSubmit={handleSubmit} className="rounded-sm border border-white/10 bg-[#0B1220] p-5 shadow-2xl sm:p-8">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBBF24]">
              Worker Details
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white">Plumber registration request</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <WorkerField label="Full Name" value={formData.fullName} error={errors.fullName} onChange={(value) => updateField({ fullName: value })} />
            <WorkerField label="Phone Number" value={formData.phone} error={errors.phone} icon="phone" onChange={(value) => updateField({ phone: value })} />
            <WorkerField label="Email Address" type="email" value={formData.email} error={errors.email} icon="email" onChange={(value) => updateField({ email: value })} />
            <WorkerField
              label="Work Area / Postcode"
              value={formData.postcode}
              error={errors.postcode}
              icon="map"
              onChange={(value) => updateField({ postcode: value.toUpperCase() })}
            />
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="mb-5">
              <h3 className="font-serif text-2xl text-white">Choose which work you can do</h3>
              <p className="mt-1 text-xs text-white/45">Select all main work types you can handle, then choose sub-work under each selected type.</p>
            </div>

            {errors.categoryId && <ErrorText message={errors.categoryId} />}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`rounded-sm border p-4 text-left transition-all ${
                    formData.categoryIds.includes(category.id)
                      ? 'border-[#FBBF24] bg-[#FBBF24]/10'
                      : 'border-white/10 bg-black/25 hover:border-[#FBBF24]/35'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-2xl">{category.emoji}</span>
                    {formData.categoryIds.includes(category.id) && <CheckCircle className="h-4 w-4 text-[#FBBF24]" />}
                  </span>
                  <span className="mt-3 block text-xs font-bold uppercase tracking-widest text-white">{category.name}</span>
                  <span className="mt-2 block text-[11px] leading-5 text-white/45">{category.shortDescription}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => toggleCategory(OTHER_CATEGORY_ID)}
                className={`rounded-sm border p-4 text-left transition-all ${
                  formData.categoryIds.includes(OTHER_CATEGORY_ID)
                    ? 'border-[#FBBF24] bg-[#FBBF24]/10'
                    : 'border-white/10 bg-black/25 hover:border-[#FBBF24]/35'
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-2xl">🔧</span>
                  {formData.categoryIds.includes(OTHER_CATEGORY_ID) && <CheckCircle className="h-4 w-4 text-[#FBBF24]" />}
                </span>
                <span className="mt-3 block text-xs font-bold uppercase tracking-widest text-white">Other Work</span>
                <span className="mt-2 block text-[11px] leading-5 text-white/45">Choose this if your exact plumbing skill is not listed.</span>
              </button>
            </div>
          </div>

          {selectedCategories.length > 0 && (
            <div className="mt-8 space-y-8 border-t border-white/10 pt-8">
              <div>
                <h3 className="font-serif text-2xl text-white">Choose sub-work</h3>
                <p className="mt-1 text-xs text-white/45">You can select more than one sub-work under each selected main type.</p>
                {errors.serviceId && <ErrorText message={errors.serviceId} />}
              </div>

              {selectedCategories.map((category) => {
                const services = [
                  ...category.services,
                  {
                    id: `${OTHER_SERVICE_ID}-${category.id}`,
                    name: `Other ${category.name.replace(/\s+[^\s]+$/, '')} work`,
                    description: 'Choose this if your exact sub-work is not listed in this category.',
                    urgency: 'standard' as const,
                    estimatedPrice: 'Reviewed by admin',
                  },
                ];

                return (
                  <div key={category.id} className="rounded-sm border border-white/10 bg-black/20 p-4">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#FBBF24]">
                      {category.emoji} {category.name}
                    </h4>
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`rounded-sm border p-4 text-left transition-all ${
                            formData.serviceIds.includes(service.id)
                              ? 'border-[#FBBF24] bg-[#FBBF24]/10'
                              : 'border-white/10 bg-[#050505] hover:border-[#FBBF24]/35'
                          }`}
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="block text-xs font-bold uppercase tracking-widest text-white">{service.name}</span>
                            {formData.serviceIds.includes(service.id) && <CheckCircle className="h-4 w-4 shrink-0 text-[#FBBF24]" />}
                          </span>
                          <span className="mt-2 block text-[11px] leading-5 text-white/45">{service.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isOtherSelected && (
            <div className="mt-6">
              <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-[#FBBF24] mb-1.5">
                Describe other work you can do *
              </label>
              <textarea
                rows={4}
                value={formData.otherDescription}
                onChange={(event) => updateField({ otherDescription: event.target.value })}
                className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/30 ${
                  errors.otherDescription ? 'border-red-500/50' : 'border-[#FBBF24]/35'
                }`}
                placeholder="Example: I can install commercial water heaters, repair copper pipework, and handle kitchen appliance plumbing..."
              />
              {errors.otherDescription && <p className="mt-1.5 text-[10px] text-red-400 font-mono">{errors.otherDescription}</p>}
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="mb-5">
              <h3 className="font-serif text-2xl text-white">Certification and requirements</h3>
              <p className="mt-1 text-xs text-white/45">
                Some repair work needs proper certification before admin can assign jobs.
              </p>
            </div>

            {hasCertificationSensitiveWork && (
              <div className="mb-5 rounded-sm border border-[#FBBF24]/25 bg-[#FBBF24]/10 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#FBBF24]" />
                  <p className="text-xs leading-6 text-white/65">
                    You selected gas, boiler, heating, or commercial work. Admin should verify Gas Safe registration, trade certificates, insurance, and right-to-work documents before assigning those jobs.
                  </p>
                </div>
              </div>
            )}

            {errors.certificationRequirement && <ErrorText message={errors.certificationRequirement} />}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {certificationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField({ certificationRequirement: option.value })}
                  className={`rounded-sm border p-4 text-left transition-all ${
                    formData.certificationRequirement === option.value
                      ? 'border-[#FBBF24] bg-[#FBBF24]/10'
                      : 'border-white/10 bg-black/25 hover:border-[#FBBF24]/35'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">{option.title}</span>
                    {formData.certificationRequirement === option.value && <CheckCircle className="h-4 w-4 text-[#FBBF24]" />}
                  </span>
                  <span className="mt-2 block text-[11px] leading-5 text-white/45">{option.copy}</span>
                </button>
              ))}
            </div>

            {formData.certificationRequirement === 'other' && (
              <div className="mt-5">
                <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-[#FBBF24] mb-1.5">
                  Describe certification / document *
                </label>
                <textarea
                  rows={3}
                  value={formData.certificationNotes}
                  onChange={(event) => updateField({ certificationNotes: event.target.value })}
                  className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/30 ${
                    errors.certificationNotes ? 'border-red-500/50' : 'border-[#FBBF24]/35'
                  }`}
                  placeholder="Example: Unvented hot water certificate, commercial plumbing certificate, public liability insurance details..."
                />
              {errors.certificationNotes && <p className="mt-1.5 text-[10px] text-red-400 font-mono">{errors.certificationNotes}</p>}
            </div>
          )}

            <div className="mt-5">
              <div className="mb-3">
                <p className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50">
                  Upload certificates / documents {hasCertificationSensitiveWork && <span className="text-red-400">*</span>}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-white/40">
                  Upload each document in the correct place. PDF, PNG, or JPG accepted.
                </p>
              </div>

              {errors.certificateFiles && <p className="mb-3 text-[10px] text-red-400 font-mono">{errors.certificateFiles}</p>}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CertificateUploadCard
                  title="Gas Safe document"
                  description="Gas Safe card, registration proof, or gas engineer ID."
                  files={certificateFiles.gasSafe}
                  hasError={Boolean(errors.certificateFiles)}
                  onFilesChange={(files) => {
                    setCertificateFiles((current) => ({ ...current, gasSafe: files }));
                    setErrors((current) => {
                      const next = { ...current };
                      delete next.certificateFiles;
                      return next;
                    });
                    setSuccessMessage('');
                  }}
                />
                <CertificateUploadCard
                  title="Trade certificate"
                  description="NVQ, City & Guilds, apprenticeship, or plumbing certificate."
                  files={certificateFiles.tradeCertificate}
                  hasError={Boolean(errors.certificateFiles)}
                  onFilesChange={(files) => {
                    setCertificateFiles((current) => ({ ...current, tradeCertificate: files }));
                    setErrors((current) => {
                      const next = { ...current };
                      delete next.certificateFiles;
                      return next;
                    });
                    setSuccessMessage('');
                  }}
                />
                <CertificateUploadCard
                  title="Insurance / right to work"
                  description="Public liability insurance, ID, right-to-work proof, or company document."
                  files={certificateFiles.insuranceRightToWork}
                  hasError={Boolean(errors.certificateFiles)}
                  onFilesChange={(files) => {
                    setCertificateFiles((current) => ({ ...current, insuranceRightToWork: files }));
                    setErrors((current) => {
                      const next = { ...current };
                      delete next.certificateFiles;
                      return next;
                    });
                    setSuccessMessage('');
                  }}
                />
                <CertificateUploadCard
                  title="Other document"
                  description="Any other specialist approval, medical/safety certificate, or supporting document."
                  files={certificateFiles.otherDocument}
                  hasError={Boolean(errors.certificateFiles)}
                  onFilesChange={(files) => {
                    setCertificateFiles((current) => ({ ...current, otherDocument: files }));
                    setErrors((current) => {
                      const next = { ...current };
                      delete next.certificateFiles;
                      return next;
                    });
                    setSuccessMessage('');
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl text-white">When can you work?</h3>
              {errors.availability && <ErrorText message={errors.availability} />}
              <div className="mt-5 space-y-3">
                {availabilityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField({ availability: option.value })}
                    className={`w-full rounded-sm border p-4 text-left transition-all ${
                      formData.availability === option.value
                        ? 'border-[#FBBF24] bg-[#FBBF24]/10'
                        : 'border-white/10 bg-black/25 hover:border-[#FBBF24]/35'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">{option.title}</span>
                      {formData.availability === option.value && <CheckCircle className="h-4 w-4 text-[#FBBF24]" />}
                    </span>
                    <span className="mt-2 block text-[11px] leading-5 text-white/45">{option.copy}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(event) => updateField({ experience: event.target.value })}
                  className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FBBF24]/30 ${
                    errors.experience ? 'border-red-500/50' : 'border-white/10'
                  }`}
                >
                  <option className="bg-[#0B1220]" value="">Choose experience</option>
                  <option className="bg-[#0B1220]" value="1-2 years">1-2 years</option>
                  <option className="bg-[#0B1220]" value="3-5 years">3-5 years</option>
                  <option className="bg-[#0B1220]" value="5+ years">5+ years</option>
                  <option className="bg-[#0B1220]" value="10+ years">10+ years</option>
                </select>
                {errors.experience && <p className="mt-1.5 text-[10px] text-red-400 font-mono">{errors.experience}</p>}
              </div>

              <WorkerField
                label="Gas Safe Number"
                value={formData.gasSafeNumber}
                icon="shield"
                optional
                onChange={(value) => updateField({ gasSafeNumber: value })}
              />

              <div className="rounded-sm border border-white/10 bg-black/25 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#FBBF24]" />
                  <p className="text-xs leading-6 text-white/50">
                    For a real project, this request should go to the admin dashboard. Admin can approve the worker, check documents, then assign jobs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="mt-7 rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {successMessage}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-white/55 hover:text-white">
              <ChevronLeft className="h-4 w-4 text-[#FBBF24]" />
              Back to home
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#FBBF24] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0B1220] transition-all hover:bg-[#F59E0B]"
            >
              Submit Worker Request
              <Wrench className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

type WorkerFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  icon?: 'phone' | 'email' | 'map' | 'shield';
  optional?: boolean;
};

function WorkerField({ label, value, onChange, error, type = 'text', icon, optional = false }: WorkerFieldProps) {
  const Icon = icon === 'phone' ? Phone : icon === 'email' ? Mail : icon === 'map' ? MapPin : icon === 'shield' ? ShieldCheck : Wrench;

  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">
        {label} {optional && <span className="text-white/25 lowercase">(optional)</span>}
      </label>
      <span className={`flex items-center gap-3 rounded-sm border bg-[#050505] px-3.5 py-3 focus-within:border-[#FBBF24]/60 ${error ? 'border-red-500/50' : 'border-white/10'}`}>
        <Icon className="h-4 w-4 shrink-0 text-[#FBBF24]" />
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-xs text-white placeholder:text-white/25 focus:outline-none"
          placeholder={label}
        />
      </span>
      {error && <p className="mt-1.5 text-[10px] text-red-400 font-mono">{error}</p>}
    </div>
  );
}

type CertificateUploadCardProps = {
  title: string;
  description: string;
  files: File[];
  hasError: boolean;
  onFilesChange: (files: File[]) => void;
};

function CertificateUploadCard({ title, description, files, hasError, onFilesChange }: CertificateUploadCardProps) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/25 p-4">
      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed px-4 py-5 text-center transition-all hover:border-[#FBBF24]/60 ${
          hasError ? 'border-red-500/50 bg-red-500/5' : 'border-white/15 bg-[#050505]'
        }`}
      >
        <FileText className="h-7 w-7 text-[#FBBF24]" />
        <span className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-white">
          {title}
        </span>
        <span className="mt-2 text-[11px] leading-5 text-white/45">{description}</span>
        <span className="mt-3 rounded-sm border border-[#FBBF24]/35 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#FBBF24]">
          Choose file
        </span>
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(event) => onFilesChange(Array.from(event.target.files ?? []))}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file) => (
            <div key={`${title}-${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-sm border border-white/10 bg-[#050505] px-3 py-2">
              <span className="truncate text-xs text-white/70">{file.name}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/35">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ErrorText({ message }: { message: string }) {
  return (
    <p className="mt-3 flex items-center gap-1.5 text-xs font-mono text-red-400">
      <AlertCircle className="h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}
