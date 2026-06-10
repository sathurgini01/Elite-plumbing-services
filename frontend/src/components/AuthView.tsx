'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle, Mail, Phone, Shield, ShieldCheck } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

type AuthViewProps = {
  mode: AuthMode;
};

type AuthFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  termsAccepted: boolean;
};

type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d\s().-]{7,20}$/;

const copyByMode = {
  signin: {
    eyebrow: 'Client Access',
    title: 'Welcome back to Elite service.',
    subtitle: 'Sign in to manage bookings, emergency visits, invoices, and engineer updates.',
    cta: 'Sign In',
    switchText: 'New to Elite Plumbers?',
    switchCta: 'Create an account',
    switchHref: '/signup',
    Icon: Shield,
  },
  signup: {
    eyebrow: 'Priority Client Setup',
    title: 'Create your Elite account.',
    subtitle: 'Save your property details, book faster visits, and keep every plumbing job in one secure place.',
    cta: 'Create Account',
    switchText: 'Already have an account?',
    switchCta: 'Sign in',
    switchHref: '/signin',
    Icon: ShieldCheck,
  },
};

export function AuthView({ mode }: AuthViewProps) {
  const content = copyByMode[mode];
  const Icon = content.Icon;
  const isSignup = mode === 'signup';
  const [values, setValues] = useState<AuthFormValues>({
    name: '',
    email: '',
    phone: '',
    password: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = <Field extends keyof AuthFormValues>(field: Field, value: AuthFormValues[Field]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSuccessMessage('');
  };

  const validateForm = () => {
    const nextErrors: AuthFormErrors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();
    const password = values.password;

    if (isSignup && name.length < 2) {
      nextErrors.name = 'Enter your full name.';
    }

    if (!email) {
      nextErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (isSignup) {
      if (!phone) {
        nextErrors.phone = 'Phone number is required.';
      } else if (!phoneRegex.test(phone)) {
        nextErrors.phone = 'Enter a valid phone number.';
      }
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (isSignup && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (isSignup && !values.termsAccepted) {
      nextErrors.termsAccepted = 'Please agree to the terms and conditions.';
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

    setSuccessMessage(
      isSignup
        ? 'Account details look good. Backend signup can be connected next.'
        : 'Sign-in details look good. Backend authentication can be connected next.'
    );
  };

  const fieldShellClass = (field: keyof AuthFormValues) =>
    `flex items-center gap-3 rounded-sm border bg-black/30 px-4 py-3 transition-colors focus-within:border-[#FBBF24]/60 ${
      errors[field] ? 'border-red-400/70' : 'border-white/10'
    }`;

  return (
    <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#050505] text-white">
      <Image
        src="/images/homepage-hero-van.png"
        alt="Elite Plumbers service van on a London street"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-[1.08] contrast-[1.08] saturate-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-[#050505]/78 to-black/25" />
      <div className="absolute inset-0 bg-[#0B1220]/20 mix-blend-multiply" />
      <div className="absolute inset-0 text-white opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 lg:grid-cols-12 lg:py-20">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#FBBF24]/35 bg-black/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#FBBF24] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
            24/7 London Plumbing Desk
          </div>
          <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.05] text-white lg:text-7xl">
            Fast booking.
            <br />
            <span className="italic text-[#FBBF24]">Secure access.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
            Keep emergency jobs, scheduled pipework, heating support, and property maintenance organised with the same premium service experience.
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7">
            {['Saved properties', 'Priority updates', 'Engineer notes'].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="mx-auto max-w-md rounded-sm border border-white/15 bg-[#0B1220]/88 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#FBBF24]">
                  {content.eyebrow}
                </p>
                <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">{content.title}</h2>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[#FBBF24]/45 bg-black/40 text-[#FBBF24]">
                <Icon className="h-6 w-6" />
              </div>
            </div>

            <p className="mb-7 text-sm leading-6 text-white/55">{content.subtitle}</p>

            <form className="space-y-4" noValidate onSubmit={handleSubmit}>
              {isSignup && (
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                    Full Name
                  </span>
                  <span className={fieldShellClass('name')}>
                    <ShieldCheck className="h-4 w-4 text-[#FBBF24]" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                    />
                  </span>
                  {errors.name && <span className="mt-2 block text-xs text-red-300">{errors.name}</span>}
                </label>
              )}

              <label className="block">
                <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                  Email Address
                </span>
                <span className={fieldShellClass('email')}>
                  <Mail className="h-4 w-4 text-[#FBBF24]" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                  />
                </span>
                {errors.email && <span className="mt-2 block text-xs text-red-300">{errors.email}</span>}
              </label>

              {isSignup && (
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                    Phone Number
                  </span>
                  <span className={fieldShellClass('phone')}>
                    <Phone className="h-4 w-4 text-[#FBBF24]" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="London contact number"
                      value={values.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                    />
                  </span>
                  {errors.phone && <span className="mt-2 block text-xs text-red-300">{errors.phone}</span>}
                </label>
              )}

              <label className="block">
                <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                  Password
                </span>
                <span className={fieldShellClass('password')}>
                  <Shield className="h-4 w-4 text-[#FBBF24]" />
                  <input
                    type="password"
                    name="password"
                    placeholder={isSignup ? 'Create a secure password' : 'Enter your password'}
                    value={values.password}
                    onChange={(event) => updateField('password', event.target.value)}
                    aria-invalid={Boolean(errors.password)}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                  />
                </span>
                {errors.password && <span className="mt-2 block text-xs text-red-300">{errors.password}</span>}
              </label>

              <div className="flex items-center justify-between gap-4 pt-1 text-xs text-white/45">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 accent-[#FBBF24]" />
                  <span>{isSignup ? 'Send service alerts' : 'Remember me'}</span>
                </label>
                {!isSignup && (
                  <Link href="/contact" className="text-[#FBBF24] transition-colors hover:text-[#F59E0B]">
                    Need help?
                  </Link>
                )}
              </div>

              {isSignup && (
                <div className="rounded-sm border border-white/10 bg-black/20 px-4 py-3">
                  <label className="flex items-start gap-3 text-xs leading-5 text-white/55">
                    <input
                      type="checkbox"
                      checked={values.termsAccepted}
                      onChange={(event) => updateField('termsAccepted', event.target.checked)}
                      aria-invalid={Boolean(errors.termsAccepted)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#FBBF24]"
                    />
                    <span>
                      I agree to Elite Plumbers&apos;{' '}
                      <Link
                        href="/terms?returnTo=/signup"
                        className="font-bold text-[#FBBF24] underline decoration-[#FBBF24]/40 underline-offset-4 transition-colors hover:text-[#F59E0B]"
                      >
                        Terms & Conditions
                      </Link>
                      , including booking, cancellation, emergency call-out, and service warranty policies.
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <span className="mt-2 block text-xs text-red-300">{errors.termsAccepted}</span>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#FBBF24] px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#0B1220] shadow-2xl transition-all hover:bg-[#F59E0B]"
              >
                {content.cta}
                <ArrowRight className="h-4 w-4" />
              </button>

              {successMessage && (
                <p className="rounded-sm border border-[#FBBF24]/35 bg-[#FBBF24]/10 px-4 py-3 text-xs leading-5 text-[#FBBF24]">
                  {successMessage}
                </p>
              )}
            </form>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm">
              <span className="text-white/45">{content.switchText}</span>
              <Link href={content.switchHref} className="font-bold text-[#FBBF24] transition-colors hover:text-[#F59E0B]">
                {content.switchCta}
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[11px] text-white/35">
              <ShieldCheck className="h-4 w-4 text-[#FBBF24]/75" />
              Secure client access for bookings, visits, and account support.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
