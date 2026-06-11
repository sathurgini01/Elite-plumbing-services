'use client';

import { useState, FormEvent } from 'react';
import { BUSINESS_INFO } from '../data';
import { Phone, Mail, Clock, ShieldCheck, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UK_PHONE_REGEX = /^(?:\+44|0)\d{10}$/;

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (key: string) => {
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const compactPhone = phone.replace(/[\s()-]/g, '');
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Please enter your full name';
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (phone.trim() && !UK_PHONE_REGEX.test(compactPhone)) {
      nextErrors.phone = 'Enter a valid UK phone number, e.g. 07700 900543';
    }

    if (!subject) {
      nextErrors.subject = 'Please choose an inquiry subject';
    }

    if (trimmedMessage.length < 10) {
      nextErrors.message = 'Please add at least 10 characters about your request';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Simulate API mail delivery
    setSent(true);
  };

  return (
    <div id="contact-us-page" className="font-sans text-[#E5E7EB] bg-[#050505] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header segment */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-[#FBBF24] font-mono uppercase tracking-[0.25em] block mb-2">Customer Desk</span>
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            Connect with Our Dispatchers
          </h1>
          <p className="text-white/50 mt-3 text-xs sm:text-sm font-light">
            For emergencies, please call the hotline directly. For general billing inquiries, feedback audits, or letting agent accounts, write a brief specification below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS & OPERATIONAL NUMBERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1220] text-[#E5E7EB] rounded-sm p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBBF24] rounded-full blur-[80px] opacity-[0.05]"></div>
              
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[#FBBF24] mb-6 border-b border-white/10 pb-3">
                Emergency Information Base
              </h3>

              <div className="space-y-6 text-xs sm:text-sm font-light">
                {/* Phone Item */}
                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-[#FBBF24] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-white/60 uppercase text-[9px] tracking-wider">24hr Dispatch Hotline</h4>
                    <a href={BUSINESS_INFO.phoneHref} className="text-base font-serif font-bold text-white hover:text-[#FBBF24] transition-colors block mt-1">
                      {BUSINESS_INFO.phone}
                    </a>
                    <p className="text-white/60 text-[11px] mt-0.5 font-light">Continuous triage & radio dispatch</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-[#FBBF24] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-white/60 uppercase text-[9px] tracking-wider">Email Support Hub</h4>
                    <a href={BUSINESS_INFO.emailHref} className="text-base font-mono font-bold text-white hover:text-[#FBBF24] transition-colors block mt-1 break-all text-xs tracking-wider">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours Item */}
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-white/60 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-white/60 uppercase text-[9px] tracking-wider">Dispatch Hours</h4>
                    <p className="text-white font-bold block mt-1 font-mono text-xs tracking-wider">Mon - Sun: 24h / 365 Days</p>
                    <p className="text-white/60 text-[11px] mt-0.5">Operates standard shifts on bank holidays</p>
                  </div>
                </div>
              </div>

              {/* Badges footer inside card */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2.5 text-[10px] font-mono text-white/60 tracking-wider">
                <ShieldCheck className="h-5 w-5 text-[#FBBF24]" />
                <span>GAS SAFE LICENCE NO. {BUSINESS_INFO.gasSafeReg}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE HELPDESK FORM */}
          <div className="lg:col-span-8">
            <div id="contact-form-container" className="bg-[#0B1220] rounded-sm border border-white/10 p-6 sm:p-8 shadow-xs">
              
              {sent ? (
                /* Sent confirmation screen */
                <div id="contact-sent-widget" className="text-center py-10 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="h-16 w-16 text-[#FBBF24] mx-auto mb-4 stroke-[1.5]" />
                  <h3 className="font-serif text-2xl text-white">Message Dispatched</h3>
                  <p className="text-white/50 text-xs sm:text-sm mt-3 max-w-md mx-auto font-light">
                    Thank you for contacting <strong>Elite Plumbing Services</strong>. Our administrative lead will review your subject details and reach back within 2-4 business hours on <strong className="text-white font-mono">{email}</strong>.
                  </p>
                  
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0B1220] text-xs font-mono font-bold tracking-widest px-6 py-3.5 rounded-sm transition-all uppercase"
                    >
                      Write Another Specification
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact form itself */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white mb-2 border-b border-white/10 pb-3">
                    <MessageSquare className="h-4.5 w-4.5 text-[#FBBF24]" />
                    Write General Inquiry Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/60 mb-1.5">Your Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearError('name');
                        }}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 font-light text-[#E5E7EB] placeholder-white/60 ${
                          errors.name
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-[#FBBF24] focus:ring-[#FBBF24]'
                        }`}
                        placeholder="e.g. Eleanor Vance"
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-mono text-red-500">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/60 mb-1.5">Your Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError('email');
                        }}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 font-mono text-[#E5E7EB] placeholder-white/60 ${
                          errors.email
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-[#FBBF24] focus:ring-[#FBBF24]'
                        }`}
                        placeholder="e.g. name@domain.com"
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-mono text-red-500">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/60 mb-1.5 font-light">Your Telephone <span className="font-mono text-white/60">(optional)</span></label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          clearError('phone');
                        }}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 font-mono text-[#E5E7EB] placeholder-white/60 ${
                          errors.phone
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-[#FBBF24] focus:ring-[#FBBF24]'
                        }`}
                        placeholder="e.g. 07700 900543"
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-mono text-red-500">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/60 mb-1.5">Inquiry Subject</label>
                      <select
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          clearError('subject');
                        }}
                        className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 font-mono text-[#E5E7EB] ${
                          errors.subject
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-[#FBBF24] focus:ring-[#FBBF24]'
                        }`}
                        aria-invalid={Boolean(errors.subject)}
                      >
                        <option value="" className="bg-[#050505] text-[#E5E7EB]">-- Choose Subject --</option>
                        <option value="billing" className="bg-[#050505] text-[#E5E7EB]">VAT Billing or Invoice Copies</option>
                        <option value="landlord" className="bg-[#050505] text-[#E5E7EB]">Letting Agent & Landlord Account Setup</option>
                        <option value="boiler-warranty" className="bg-[#050505] text-[#E5E7EB]">Boiler Manufacturer Warranty Registration</option>
                        <option value="commercial" className="bg-[#050505] text-[#E5E7EB]">Commercial Scale Repair Estimates</option>
                        <option value="careers" className="bg-[#050505] text-[#E5E7EB]">Careers & Subcontractor Opportunities</option>
                        <option value="other" className="bg-[#050505] text-[#E5E7EB]">Other General Feedback</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-mono text-red-500">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/60 mb-1.5">Your Message Specification</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        clearError('message');
                      }}
                      className={`w-full rounded-sm border bg-[#050505] px-3.5 py-3 text-xs focus:outline-none focus:ring-1 font-light text-[#E5E7EB] placeholder-white/60 leading-relaxed ${
                        errors.message
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                          : 'border-white/10 focus:border-[#FBBF24] focus:ring-[#FBBF24]'
                      }`}
                      placeholder="Please detail your request in rich specification..."
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && (
                      <p className="mt-1 flex items-center gap-1 text-[10px] font-mono text-red-500">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0B1220] font-bold font-mono tracking-widest text-xs py-3.5 px-6 rounded-sm transition-all uppercase"
                    >
                      Dispatch Inquiry Form
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
