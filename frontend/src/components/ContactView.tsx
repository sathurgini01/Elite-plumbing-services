'use client';

import { useState, FormEvent } from 'react';
import { BUSINESS_INFO } from '../data';
import { Phone, Mail, Clock, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API mail delivery
    setSent(true);
  };

  return (
    <div id="contact-us-page" className="font-sans text-[#E0E0E0] bg-[#0A0A0B] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header segment */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] text-[#C5A059] font-mono uppercase tracking-[0.25em] block mb-2">Customer Desk</span>
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
            <div className="bg-[#0E0E10] text-[#E0E0E0] rounded-sm p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059] rounded-full blur-[80px] opacity-[0.05]"></div>
              
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[#C5A059] mb-6 border-b border-white/10 pb-3">
                Emergency Information Base
              </h3>

              <div className="space-y-6 text-xs sm:text-sm font-light">
                {/* Phone Item */}
                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-white/40 uppercase text-[9px] tracking-wider">24hr Dispatch Hotline</h4>
                    <a href={BUSINESS_INFO.phoneHref} className="text-base font-serif font-bold text-white hover:text-[#C5A059] transition-colors block mt-1">
                      {BUSINESS_INFO.phone}
                    </a>
                    <p className="text-white/40 text-[11px] mt-0.5 font-light">Continuous triage & radio dispatch</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-white/40 uppercase text-[9px] tracking-wider">Email Support Hub</h4>
                    <a href={BUSINESS_INFO.emailHref} className="text-base font-mono font-bold text-white hover:text-[#C5A059] transition-colors block mt-1 break-all text-xs tracking-wider">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours Item */}
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-white/40 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-bold text-white/40 uppercase text-[9px] tracking-wider">Dispatch Hours</h4>
                    <p className="text-white font-bold block mt-1 font-mono text-xs tracking-wider">Mon - Sun: 24h / 365 Days</p>
                    <p className="text-white/40 text-[11px] mt-0.5">Operates standard shifts on bank holidays</p>
                  </div>
                </div>
              </div>

              {/* Badges footer inside card */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2.5 text-[10px] font-mono text-white/40 tracking-wider">
                <ShieldCheck className="h-5 w-5 text-[#C5A059]" />
                <span>GAS SAFE LICENCE NO. {BUSINESS_INFO.gasSafeReg}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE HELPDESK FORM */}
          <div className="lg:col-span-8">
            <div id="contact-form-container" className="bg-[#0E0E10] rounded-sm border border-white/10 p-6 sm:p-8 shadow-xs">
              
              {sent ? (
                /* Sent confirmation screen */
                <div id="contact-sent-widget" className="text-center py-10 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="h-16 w-16 text-[#C5A059] mx-auto mb-4 stroke-[1.5]" />
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
                      className="bg-[#C5A059] hover:bg-[#b08e4d] text-black text-xs font-mono font-bold tracking-widest px-6 py-3.5 rounded-sm transition-all uppercase"
                    >
                      Write Another Specification
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact form itself */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white mb-2 border-b border-white/10 pb-3">
                    <MessageSquare className="h-4.5 w-4.5 text-[#C5A059]" />
                    Write General Inquiry Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Your Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#050505] px-3.5 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-light text-[#E0E0E0] placeholder-white/20"
                        placeholder="e.g. Eleanor Vance"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Your Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#050505] px-3.5 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-mono text-[#E0E0E0] placeholder-white/20"
                        placeholder="e.g. name@domain.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5 font-light">Your Telephone <span className="font-mono text-white/20">(optional)</span></label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#050505] px-3.5 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-mono text-[#E0E0E0] placeholder-white/20"
                        placeholder="e.g. 07700 900543"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Inquiry Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-sm border border-white/10 bg-[#050505] px-3.5 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-mono text-[#E0E0E0]"
                        required
                      >
                        <option value="" className="bg-black text-[#E0E0E0]">-- Choose Subject --</option>
                        <option value="billing" className="bg-black text-[#E0E0E0]">VAT Billing or Invoice Copies</option>
                        <option value="landlord" className="bg-black text-[#E0E0E0]">Letting Agent & Landlord Account Setup</option>
                        <option value="boiler-warranty" className="bg-black text-[#E0E0E0]">Boiler Manufacturer Warranty Registration</option>
                        <option value="commercial" className="bg-black text-[#E0E0E0]">Commercial Scale Repair Estimates</option>
                        <option value="careers" className="bg-black text-[#E0E0E0]">Careers & Subcontractor Opportunities</option>
                        <option value="other" className="bg-black text-[#E0E0E0]">Other General Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-white/50 mb-1.5">Your Message Specification</label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-[#050505] px-3.5 py-3 text-xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] font-light text-[#E0E0E0] placeholder-white/20 leading-relaxed"
                      placeholder="Please detail your request in rich specification..."
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#C5A059] hover:bg-[#b08e4d] text-black font-bold font-mono tracking-widest text-xs py-3.5 px-6 rounded-sm transition-all uppercase"
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
