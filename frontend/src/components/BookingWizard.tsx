'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BUSINESS_INFO, 
  SERVICE_CATEGORIES 
} from '../data';
import { 
  BookingFormData, 
  PropertyType
} from '../types';
import { getViewHref } from '../navigation';
import { 
  CalendarDays, 
  CheckCircle, 
  Phone, 
  ChevronLeft, 
  ShieldCheck, 
  Check, 
  FileText,
  Clock,
  AlertCircle,
  Flame
} from 'lucide-react';

interface BookingWizardProps {
  initialParams: any; // Can contain categoryId, serviceId, postcode, isEmergency
}

const PROPERTY_TYPES: { value: PropertyType; label: string; emoji: string }[] = [
  { value: 'house', label: 'Residential House', emoji: '🏠' },
  { value: 'flat', label: 'Flat / Apartment', emoji: '🏢' },
  { value: 'rented_property', label: 'Rented Property (Tenant)', emoji: '🔑' },
  { value: 'landlord_property', label: 'Landlord Property', emoji: '📋' },
  { value: 'shop', label: 'Retail Shop', emoji: '🛒' },
  { value: 'office', label: 'Commercial Office', emoji: '💼' },
  { value: 'restaurant', label: 'Restaurant / Catering', emoji: '🍽️' },
  { value: 'other', label: 'Other Property Type', emoji: '❓' },
];

const TIME_SLOTS = [
  { value: 'am-early', label: 'Morning Early (08:00 - 11:00)' },
  { value: 'am-late', label: 'Midday Slot (11:00 - 14:00)' },
  { value: 'pm-early', label: 'Afternoon (14:00 - 17:00)' },
  { value: 'pm-late', label: 'Evening (17:05 - 20:50)' },
];

const STEP_LABELS = [
  'Type of Issue',
  'Specific Issue',
  'Property',
  'Urgency',
  'Date & Time',
  'Your Details'
];

export function BookingWizard({ initialParams }: BookingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  
  // Step forms data state
  const [formData, setFormData] = useState<BookingFormData>({
    categoryId: '',
    serviceId: '',
    propertyType: '',
    isEmergency: null,
    preferredDate: '',
    preferredTime: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    notes: '',
  });

  // Client validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Parse incoming parameters from Home view quick estimator or Services list
  useEffect(() => {
    if (initialParams) {
      const updated: Partial<BookingFormData> = {};
      
      if (initialParams.categoryId) {
        updated.categoryId = initialParams.categoryId;
        setStep(2); // Jump directly to service selector
      }
      if (initialParams.serviceId) {
        updated.serviceId = initialParams.serviceId;
        setStep(3); // Jump directly to property type
      }
      if (initialParams.postcode) {
        updated.postcode = initialParams.postcode.toUpperCase();
      }
      if (initialParams.isEmergency !== undefined) {
        updated.isEmergency = initialParams.isEmergency;
      }

      setFormData(prev => ({ ...prev, ...updated }));
    }
  }, [initialParams]);

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === formData.categoryId);
  
  // Dynamically include an "Other Specific Issue" choice at the bottom of the list for every category
  const displayedServices = activeCategory ? [
    ...activeCategory.services,
    {
      id: `other-${activeCategory.id}`,
      name: 'Other Specific Issue / Custom Request',
      description: 'Choose this if you have another type of issue. Please specify details in our description box during the contact step.',
      urgency: activeCategory.isEmergency ? 'emergency' as const : 'standard' as const,
      estimatedPrice: 'Quote on-site'
    }
  ] : [];

  const activeService = displayedServices.find(s => s.id === formData.serviceId);

  const updateField = (fields: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    // Clear validation error on change
    const keys = Object.keys(fields);
    if (keys.length > 0) {
      setErrors(prev => {
        const copy = { ...prev };
        keys.forEach(k => delete copy[k]);
        return copy;
        // end slice
      });
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.categoryId) {
      setErrors({ categoryId: 'Please select a primary service category to proceed' });
      return;
    }
    if (step === 2 && !formData.serviceId) {
      setErrors({ serviceId: 'Please select a specific repair service type' });
      return;
    }
    if (step === 3 && !formData.propertyType) {
      setErrors({ propertyType: 'Please select a residential or commercial property option' });
      return;
    }
    if (step === 4 && formData.isEmergency === null) {
      setErrors({ isEmergency: 'Please state whether this is an active emergency' });
      return;
    }
    if (step === 5) {
      if (formData.isEmergency) {
        setStep(prev => prev + 1);
        return;
      } else {
        const nextErrors: Record<string, string> = {};
        if (!formData.preferredDate) nextErrors.preferredDate = 'Please select a scheduled date';
        if (!formData.preferredTime) nextErrors.preferredTime = 'Please select a preferred time slot';
        
        if (Object.keys(nextErrors).length > 0) {
          setErrors(nextErrors);
          return;
        }
      }
    }

    setStep(prev => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const validateContactDetails = (): boolean => {
    const nextErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required';
    
    const rawPhone = formData.phone.replace(/\s+/g, '');
    if (!rawPhone) {
      nextErrors.phone = 'Contact telephone number is required';
    } else if (rawPhone.length < 10 || rawPhone.length > 13) {
      nextErrors.phone = 'Please provide a valid 10-11 digit UK phone number';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!formData.email.includes('@') || formData.email.length < 5) {
      nextErrors.email = 'Please provide a valid email address';
    }

    if (!formData.address.trim()) nextErrors.address = 'Full street address is required';
    
    const normalizedPostcode = formData.postcode.trim().toUpperCase();
    if (!normalizedPostcode) {
      nextErrors.postcode = 'Postcode is required';
    } else if (normalizedPostcode.length < 3 || normalizedPostcode.length > 8) {
      nextErrors.postcode = 'Please enter a valid UK postcode';
    }

    // Require custom detail description when customer selects an "Other" option
    const isOtherSelected = formData.serviceId.startsWith('other-');
    if (isOtherSelected && !formData.notes.trim()) {
      nextErrors.notes = 'Please provide a brief details description of your custom plumbing / heating concern.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateContactDetails()) return;

    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`EP-${uniqueNum}`);
    setSubmitted(true);
  };

  const getDispatchStatus = () => {
    if (formData.isEmergency) return 'EMERGENCY - Local Response Van Dispatched (30-60m arrival)';
    if (formData.preferredDate && formData.preferredTime) {
      const slotLabel = TIME_SLOTS.find(ts => ts.value === formData.preferredTime)?.label || formData.preferredTime;
      return `Scheduled - Confirmed for ${formData.preferredDate} during ${slotLabel}`;
    }
    return 'Pending schedule calendar validation';
  };

  return (
    <div id="booking-wizard-page" className="bg-[#0A0A0B] min-h-screen py-16 px-4 font-sans text-[#E0E0E0]">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push(getViewHref('home'))}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/55 hover:text-white mb-6 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 text-[#C5A059]" /> Return to Homepage Overview
        </button>

        {/* STEPPER HEADING */}
        {!submitted && (
          <div className="mb-8 text-center md:text-left">
            <span className="text-[10px] text-[#C5A059] font-mono uppercase tracking-[0.25em] block mb-2">Secure Commission</span>
            <h1 className="text-3xl font-serif text-white tracking-tight">Schedule Elite Engineering</h1>
            <p className="text-xs text-white/50 mt-1 font-light leading-relaxed">
              Follow our premium diagnostic sequence. No deposit or advance card required.
            </p>
          </div>
        )}

        {/* COMPREHENSIVE BOOKING STATE VIEWER */}
        {submitted ? (
          /* CONFIRMED SCREEN */
          <div id="booking-confirmation-panel" className="bg-[#0E0E10] border border-[#C5A059]/30 rounded-sm p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mb-4">
                <Check className="h-9 w-9 stroke-[1.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">Booking Commission Registered</h2>
              <p className="text-white/50 text-xs mt-2 font-light">
                Your priority reservation reference code has been verified:
              </p>
              <div className="mt-4 inline-block bg-[#050505] text-[#C5A059] font-mono text-xl md:text-2xl font-bold px-6 py-2.5 rounded-sm border border-white/10 tracking-widest">
                {bookingRef}
              </div>
            </div>

            <div className="border-t border-b border-white/5 py-6 my-6 text-xs sm:text-sm space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Dispatcher Coordination Initiated</strong>
                  <p className="text-white/50 text-xs font-light">
                    We have dispatched your worksheets to our closest mobile technician. We will ring your phone <strong className="text-[#C5A059] font-mono">{formData.phone}</strong> inside 10 minutes to verify parking permissions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Job Specification Details</strong>
                  <p className="text-white/50 text-xs font-light">
                    {activeCategory?.emoji} {activeCategory?.name} — <strong className="text-white">{activeService?.name}</strong> {formData.propertyType ? `(${formData.propertyType})` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Fee Structures & Transparency</strong>
                  <p className="text-white/50 text-xs font-light">
                    Estimated Allocations: <strong className="text-[#C5A059] font-mono">{activeService?.estimatedPrice}</strong>. Fixed quotes. Zero call-out fees. Secure payment settlement only following on-site mechanical sign-off.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">Calibrated Operational Window</strong>
                  <span className="inline-block mt-2 text-[10px] uppercase font-mono bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 px-2.5 py-1 rounded-sm">
                    {getDispatchStatus()}
                  </span>
                </div>
              </div>
            </div>

            {formData.isEmergency && (
              <div className="bg-[#050505] border border-red-500/20 rounded-sm p-5 mb-8 text-white/80 flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                <Flame className="h-6 w-6 text-red-500 shrink-0 mt-1 animate-pulse" />
                <div className="space-y-1 text-xs">
                  <strong className="font-bold text-red-400 uppercase tracking-wider font-mono text-[10px] block">Emergency Priority Response Mode</strong>
                  <p className="text-white/50 font-light">
                    Our admin center is loading a rapid response vehicle with dynamic WRAS tools and copper kits. Please stand by your phone. Check the master water valve lever inside your kitchen/basement and shut clockwise if safe.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold font-mono tracking-widest uppercase text-center py-4 px-8 rounded-sm flex items-center justify-center gap-2 text-xs"
              >
                <Phone className="h-4 w-4" /> Speak with dispatch desk
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    categoryId: '',
                    serviceId: '',
                    propertyType: '',
                    isEmergency: null,
                    preferredDate: '',
                    preferredTime: '',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    address: '',
                    postcode: '',
                    notes: '',
                  });
                }}
                className="bg-[#050505] border border-white/10 hover:bg-white/5 text-white/80 font-bold font-mono uppercase tracking-widest text-center py-4 px-8 rounded-sm text-xs cursor-pointer"
              >
                Reserve Another Task
              </button>
            </div>
          </div>
        ) : (
          /* WIZARD ACTIVE FORMS CARD */
          <div id="booking-step-container" className="bg-[#0E0E10] rounded-sm shadow-xl overflow-hidden border border-white/10">
            
            {/* Nav Progress Header Bar */}
            <div className="bg-[#050505] border-b border-white/10 px-6 py-5 select-none font-mono">
              <div className="flex items-center justify-between gap-1 mb-4 overflow-x-auto scrollbar-none">
                {STEP_LABELS.map((label, idx) => {
                  const stepNum = idx + 1;
                  return (
                    <div key={label} className="flex flex-col items-center gap-1 shrink-0 text-center">
                      <div className={`h-6 w-6 rounded-sm flex items-center justify-center text-[10px] font-bold transition-all ${
                        stepNum < step 
                          ? 'bg-[#C5A059] text-black' 
                          : stepNum === step 
                          ? 'bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] shadow-md'
                          : 'bg-[#151518] text-white/20 border border-white/5'
                      }`}>
                        {stepNum < step ? '✓' : stepNum}
                      </div>
                      <span className={`text-[9px] uppercase tracking-wider hidden sm:inline ${stepNum === step ? 'text-[#C5A059] font-bold' : 'text-white/20'}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="h-0.5 bg-white/5 rounded-full w-full relative">
                <div 
                  className="h-0.5 bg-[#C5A059] rounded-full transition-all duration-300"
                  style={{ width: `${((step - 1) / (STEP_LABELS.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step form frame */}
            <div className="p-6 sm:p-8">
              
              {/* STEP 1: Select Category */}
              {step === 1 && (
                <div id="booking-step-1" className="space-y-6 animate-in fade-in duration-250">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-white">1. Choose Type of Plumbing Issue</h2>
                    <p className="text-xs text-white/40 mt-1 font-light">Select the main category that represents your plumbing concern.</p>
                  </div>

                  {errors.categoryId && (
                    <p className="text-red-400 text-xs font-mono flex items-center gap-1.5 bg-[#050505] border border-red-500/20 p-3 rounded-sm">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" /> {errors.categoryId}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        id={`wizard-cat-btn-${cat.id}`}
                        onClick={() => {
                          updateField({ categoryId: cat.id, serviceId: '' });
                          setStep(2);
                        }}
                        className={`text-left rounded-sm border p-5 transition-all cursor-pointer flex items-start gap-4 ${
                          formData.categoryId === cat.id
                            ? 'border-[#C5A059] bg-[#C5A059]/5'
                            : cat.isEmergency
                            ? 'border-red-500/20 bg-red-500/[0.02] hover:border-red-500/50'
                            : 'border-white/5 hover:border-[#C5A059]/30 bg-[#0A0A0B]'
                        }`}
                      >
                        <span className="text-3xl bg-white/5 rounded-sm p-2.5 inline-block shrink-0">{cat.emoji}</span>
                        <div>
                          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5 leading-none">
                            {cat.name}
                            {cat.isEmergency && <span className="bg-red-500/10 text-red-400 text-[8px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded-sm">24/7</span>}
                          </h3>
                          <p className="text-white/40 text-[11px] font-light leading-relaxed mt-2">{cat.shortDescription}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Select Specific Service */}
              {step === 2 && activeCategory && (
                <div id="booking-step-2" className="space-y-6 animate-in fade-in duration-250">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-white">2. Choose Specific Issue (Sub-Type)</h2>
                    <p className="text-xs text-[#C5A059] font-mono uppercase tracking-wider mt-1">{activeCategory.emoji} {activeCategory.name}</p>
                  </div>

                  {errors.serviceId && (
                    <p className="text-red-400 text-xs font-mono flex items-center gap-1.5 bg-[#050505] border border-red-500/20 p-3 rounded-sm">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" /> {errors.serviceId}
                    </p>
                  )}

                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
                    {displayedServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        id={`wizard-serv-btn-${service.id}`}
                        onClick={() => {
                          updateField({ serviceId: service.id });
                          setStep(3);
                        }}
                        className={`w-full text-left rounded-sm border px-5 py-4 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          formData.serviceId === service.id
                            ? 'border-[#C5A059] bg-[#C5A059]/5'
                            : 'border-white/5 hover:border-[#C5A059]/30 bg-[#0A0A0B]'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider">{service.name}</p>
                          <p className="text-[11px] text-white/40 leading-normal font-light mt-1">{service.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-mono uppercase block tracking-widest text-white/30">Est. Price</span>
                          <span className="text-[#C5A059] font-mono font-bold text-xs sm:text-sm">{service.estimatedPrice}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[10px] font-mono uppercase tracking-wider font-bold text-white/55 hover:text-white inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C5A059]" /> Division Selection
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Selecting Property Type */}
              {step === 3 && (
                <div id="booking-step-3" className="space-y-6 animate-in fade-in duration-250">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-white">3. Select property option</h2>
                    <p className="text-xs text-white/40 mt-1 font-light">Helps us bring appropriate commercial/domestic fittings.</p>
                  </div>

                  {errors.propertyType && (
                    <p className="text-red-400 text-xs font-mono flex items-center gap-1.5"><AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" /> {errors.propertyType}</p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PROPERTY_TYPES.map((pt) => (
                      <button
                        key={pt.value}
                        type="button"
                        id={`wizard-prop-btn-${pt.value}`}
                        onClick={() => {
                          updateField({ propertyType: pt.value });
                          setStep(4);
                        }}
                        className={`rounded-sm border p-4 text-center flex flex-col items-center justify-between gap-3.5 transition-all cursor-pointer ${
                          formData.propertyType === pt.value
                            ? 'border-[#C5A059] bg-[#C5A059]/5'
                            : 'border-white/5 hover:border-[#C5A059]/30 bg-[#0A0A0B]'
                        }`}
                      >
                        <span className="text-3xl bg-white/5 p-2.5 rounded-sm block shrink-0">{pt.emoji}</span>
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight block">{pt.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[10px] font-mono uppercase tracking-wider font-bold text-white/55 hover:text-white inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C5A059]" /> Requirement Selector
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Urgency Configuration */}
              {step === 4 && (
                <div id="booking-step-4" className="space-y-6 animate-in fade-in duration-250">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-white">4. Is this an emergency?</h2>
                    <p className="text-xs text-white/40 mt-1 font-light">
                      Choose YES for active pipe flooding, boiler steam build-up, or zero sanitization toilets.
                    </p>
                  </div>

                  {errors.isEmergency && (
                    <p className="text-red-400 text-xs font-mono flex items-center gap-1.5"><AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" /> {errors.isEmergency}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* YES EMERGENCY BUTTON */}
                    <button
                      type="button"
                      id="urgency-yes-btn"
                      onClick={() => {
                        updateField({ isEmergency: true });
                        setStep(5);
                      }}
                      className={`text-left rounded-sm border p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer ${
                        formData.isEmergency === true
                          ? 'border-red-500 bg-red-500/[0.04]'
                          : 'border-white/10 hover:border-red-500/55 bg-[#0A0A0B]'
                      }`}
                    >
                      <span className="text-3xl bg-red-500/10 rounded-sm p-3 inline-block">🚨</span>
                      <div className="mt-6">
                        <span className="text-red-400 font-mono font-bold text-lg block uppercase tracking-wider">YES, ACTIVE EMERGENCY</span>
                        <p className="text-white/40 text-xs font-light leading-relaxed mt-2">
                          I require urgent water isolation, flood limiters, or immediate heating troubleshooting. Guaranteed arrival within 30-60m. No extra static late scharges.
                        </p>
                      </div>
                    </button>

                    {/* NO STANDARD BUTTON */}
                    <button
                      type="button"
                      id="urgency-no-btn"
                      onClick={() => {
                        updateField({ isEmergency: false });
                        setStep(5);
                      }}
                      className={`text-left rounded-sm border p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer ${
                        formData.isEmergency === false
                          ? 'border-[#C5A059] bg-[#C5A059]/5'
                          : 'border-white/10 hover:border-[#C5A059]/55 bg-[#0A0A0B]'
                      }`}
                    >
                      <span className="text-3xl bg-white/5 rounded-sm p-3 inline-block">📅</span>
                      <div className="mt-6">
                        <span className="text-white font-mono font-bold text-lg block uppercase tracking-wider">NO, SCHEDULE WORK</span>
                        <p className="text-white/40 text-xs font-light leading-relaxed mt-2">
                          I want to schedule maintenance, gas audits, or standard tap fittings. Choose a slot of choice. No rapid dispatch required.
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[10px] font-mono uppercase tracking-wider font-bold text-white/55 hover:text-white inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C5A059]" /> Property Profile
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Date and Time Schedule */}
              {step === 5 && (
                <div id="booking-step-5" className="space-y-6 animate-in fade-in duration-250">
                  {formData.isEmergency ? (
                    /* EMERGENCY NOTICE skips choosing a date/time */
                    <div id="emergency-confirmation-skip" className="text-center py-6">
                      <span className="text-5xl block animate-bounce mb-4">🚨</span>
                      <h3 className="font-serif text-xl text-red-400 uppercase tracking-wide mb-1">Priority Emergency Dispatch Protocol</h3>
                      <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
                        Because you flagged an active emergency plumbing issue, we bypass standard calendar schedules. An emergency dispatcher calls you inside 10 minutes to verify rapid on-site arrival (usually 30-60 mins).
                      </p>
                      <div className="mt-8">
                        <button
                          type="button"
                          id="emergency-confirm-next"
                          onClick={handleNext}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-mono font-bold tracking-widest px-8 py-3.5 rounded-sm cursor-pointer transition uppercase"
                        >
                          Address & Call Details Next ➔
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* STANDARD CALENDAR SELECTOR */
                    <div id="calendar-slot-selector" className="space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h2 className="text-lg font-serif text-white">5. Select calendar window</h2>
                        <p className="text-xs text-white/40 mt-1 font-light">Choose a convenient date and time range.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Prefer Date input */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-2">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.preferredDate}
                            onChange={(e) => updateField({ preferredDate: e.target.value })}
                            className="w-full rounded-sm border border-white/10 bg-[#050505] px-3.5 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-mono text-white"
                          />
                          {errors.preferredDate && (
                            <p className="text-red-400 text-xs font-mono mt-1.5 flex items-center gap-1">{errors.preferredDate}</p>
                          )}
                        </div>

                        {/* Preferred Time Slot */}
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-2">
                            Preferred Time Range
                          </label>
                          <div className="space-y-2">
                            {TIME_SLOTS.map((ts) => (
                              <button
                                key={ts.value}
                                type="button"
                                onClick={() => updateField({ preferredTime: ts.value })}
                                className={`w-full text-left rounded-sm border px-3.5 py-3 text-xs font-mono transition flex items-center justify-between ${
                                  formData.preferredTime === ts.value
                                    ? 'border-[#C5A059] bg-[#C5A059]/5 text-white shadow-xs'
                                    : 'border-white/5 hover:border-white/20 text-white/60 bg-[#0A0A0B]'
                                }`}
                              >
                                <span>{ts.label}</span>
                                {formData.preferredTime === ts.value && <CheckCircle className="h-4 w-4 shrink-0 text-[#C5A059]" />}
                              </button>
                            ))}
                          </div>
                          {errors.preferredTime && (
                            <p className="text-red-400 text-xs font-mono mt-1.5 flex items-center gap-1">{errors.preferredTime}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          id="btn-calendar-next"
                          onClick={handleNext}
                          disabled={!formData.preferredDate || !formData.preferredTime}
                          className="w-full bg-[#C5A059] hover:bg-[#b08e4d] disabled:bg-white/5 disabled:text-white/20 text-black font-mono font-bold tracking-widest py-3.5 rounded-sm transition disabled:cursor-not-allowed cursor-pointer text-xs uppercase"
                        >
                          Confirm Calendar slot & Continue
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[10px] font-mono uppercase tracking-wider font-bold text-white/55 hover:text-white inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C5A059]" /> Urgency Protocol
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: User Contact Details Form */}
              {step === 6 && (
                <form id="booking-step-6-form" onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-250">
                  <div className="border-b border-white/5 pb-4">
                    <h2 className="text-lg font-serif text-white">6. Confirm contact & location details</h2>
                    <p className="text-xs text-white/40 mt-1 font-light">This will generate your immediate billing estimate paperwork.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateField({ firstName: e.target.value })}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 focus:border-[#C5A059] focus:ring-[#C5A059]/30 text-white ${
                          errors.firstName ? 'border-red-500/40' : 'border-white/10'
                        }`}
                        placeholder="e.g. John"
                      />
                      {errors.firstName && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateField({ lastName: e.target.value })}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 focus:border-[#C5A059] focus:ring-[#C5A059]/30 text-white ${
                          errors.lastName ? 'border-red-500/40' : 'border-white/10'
                        }`}
                        placeholder="e.g. Williams"
                      />
                      {errors.lastName && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Contact Telephone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField({ phone: e.target.value })}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 focus:border-[#C5A059] focus:ring-[#C5A059]/30 font-mono text-white ${
                          errors.phone ? 'border-red-500/40' : 'border-white/10'
                        }`}
                        placeholder="e.g. 07700 900077"
                      />
                      {errors.phone && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField({ email: e.target.value })}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 focus:border-[#C5A059] focus:ring-[#C5A059]/30 text-white ${
                          errors.email ? 'border-red-500/40' : 'border-white/10'
                        }`}
                        placeholder="e.g. name@domain.co.uk"
                      />
                      {errors.email && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Street Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateField({ address: e.target.value })}
                      className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 focus:border-[#C5A059] focus:ring-[#C5A059]/30 text-white ${
                         errors.address ? 'border-red-500/40' : 'border-white/10'
                      }`}
                      placeholder="e.g. Flat 3, 44 Marlborough Lane"
                    />
                    {errors.address && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Postcode</label>
                    <input
                      type="text"
                      value={formData.postcode}
                      onChange={(e) => updateField({ postcode: e.target.value.toUpperCase() })}
                      className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-1 focus:border-[#C5A059] focus:ring-[#C5A059]/30 text-white ${
                        errors.postcode ? 'border-red-500/40' : 'border-white/10'
                      }`}
                      placeholder="e.g. SW19 1AA"
                    />
                    {errors.postcode && <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.postcode}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider font-bold mb-1.5 transition-all">
                      {formData.serviceId.startsWith('other-') ? (
                        <span className="text-[#C5A059] flex items-center gap-1.5">
                          Describe Custom Plumbing/Heating Issue <span className="text-red-500 font-bold">* (Required)</span>
                        </span>
                      ) : (
                        <span className="text-white/50">
                          Job Specification Brief <span className="font-mono text-white/20 lowercase">(optional)</span>
                        </span>
                      )}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => updateField({ notes: e.target.value })}
                      className={`w-full rounded-sm border bg-[#050505] px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A059] text-white font-light leading-relaxed placeholder-white/20 transition-all ${
                        formData.serviceId.startsWith('other-') && errors.notes 
                          ? 'border-red-500/50 focus:ring-red-500/30' 
                          : formData.serviceId.startsWith('other-')
                          ? 'border-[#C5A059]/40 focus:ring-[#C5A059]/30'
                          : 'border-white/10 focus:ring-[#C5A059]/30'
                      }`}
                      placeholder={
                        formData.serviceId.startsWith('other-')
                          ? "Please specify the custom plumber requirement, e.g. 'Outside pond drain is blocked' or 'Installing client-bought brass taps'..."
                          : "Detail leakage points, boiler valve noises, structural concerns..."
                      }
                    />
                    {formData.serviceId.startsWith('other-') && errors.notes && (
                      <p className="text-red-400 text-[10px] mt-1.5 font-mono flex items-center gap-1">
                        ⚠️ {errors.notes}
                      </p>
                    )}
                  </div>

                  {/* SUMMARY SPEC SHEET */}
                  <div className="bg-[#050505] text-white/80 rounded-sm p-5 border border-white/10 text-xs">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#C5A059] mb-3 uppercase tracking-[0.1em] border-b border-white/5 pb-2">
                      <FileText className="h-4 w-4 text-[#C5A059]" />
                      Dispatch Worksheet Summary
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2 leading-relaxed">
                      <div>
                        <span className="text-white/40 block text-[10px] font-mono uppercase">Repair division</span>
                        <strong className="text-white text-xs">{activeCategory?.emoji} {activeCategory?.name}</strong>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] font-mono uppercase">Repair requirement</span>
                        <strong className="text-white text-xs">{activeService?.name}</strong>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] font-mono uppercase">Contract standard rate</span>
                        <strong className="text-[#C5A059] font-mono text-xs">{activeService?.estimatedPrice}</strong>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] font-mono uppercase">Operational radius mode</span>
                        <strong className="text-red-400 text-xs font-mono">{formData.isEmergency ? 'EMERGENCY DISPATCH' : 'SCHEDULED MAINTENANCE'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT ROW */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[10px] font-mono uppercase tracking-wider font-bold text-white/55 hover:text-white inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4 text-[#C5A059]" /> Update Dates
                    </button>
                    <button
                      type="submit"
                      id="submit-register-btn"
                      className="bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold font-mono tracking-widest uppercase py-3.5 px-8 rounded-sm transition-all text-xs"
                    >
                      📅 Secure Commission Booking
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
