'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import type { Content } from '@/content/types';

type FormCopy = Content['contact']['form'];

type FieldName = 'name' | 'email' | 'projectType' | 'message' | 'consent';
type Errors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'success' | 'error';

interface Values {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  consent: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: FieldName[] = ['name', 'email', 'projectType', 'message', 'consent'];
/** Submissions faster than this after the form appeared are bots: dropped silently. */
const MIN_FILL_MS = 3000;
/** The check mark shows for this long before the form gives way to the message. */
const SENT_HOLD_MS = 800;

function validate(v: Values, f: FormCopy): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = f.errors.name;
  if (!v.email.trim()) e.email = f.errors.email;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = f.errors.emailInvalid;
  if (!v.projectType) e.projectType = f.errors.projectType;
  if (v.message.trim().length < 10) e.message = f.errors.message;
  if (!v.consent) e.consent = f.errors.consent;
  return e;
}

function readValues(form: HTMLFormElement): Values {
  const d = new FormData(form);
  const s = (k: string) => String(d.get(k) ?? '').trim();
  return {
    name: s('name'),
    email: s('email'),
    company: s('company'),
    projectType: s('projectType'),
    budget: s('budget'),
    message: s('message'),
    consent: d.get('consent') === 'yes',
  };
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.9375rem] text-[#A12A2A]">
      {message}
    </p>
  );
}

function Chips({
  name,
  legend,
  optionalLabel,
  options,
  optional,
  error,
  errorId,
  onChange,
}: {
  name: string;
  legend: string;
  optionalLabel: string;
  options: string[];
  optional?: boolean;
  error?: string;
  errorId: string;
  onChange?: () => void;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="label mb-3 text-muted">
        {legend}
        {optional && <span> ({optionalLabel})</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="chip">
            <input
              type="radio"
              name={name}
              value={option}
              className="sr-only"
              required={!optional}
              onChange={onChange}
            />
            {option}
          </label>
        ))}
      </div>
      <ErrorText id={errorId} message={error} />
    </fieldset>
  );
}

function TextField({
  id,
  name,
  label,
  error,
  errorId,
  type = 'text',
  autoComplete,
  inputMode,
  onBlur,
  onChange,
}: {
  id: string;
  name: string;
  label: React.ReactNode;
  error?: string;
  errorId: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'email' | 'text';
  onBlur?: () => void;
  onChange?: () => void;
}) {
  return (
    <div>
      <div className="field">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder=" "
          className="field-input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onBlur={onBlur}
          onChange={onChange}
        />
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      </div>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function ContactForm({
  copy: f,
  privacyHref,
  linkedin,
  externalHint,
  formspreeId,
}: {
  copy: FormCopy;
  /** Formspree form id. Passed in, so config/site.ts never reaches the client bundle. */
  formspreeId: string;
  privacyHref: string;
  linkedin: string;
  externalHint: string;
}) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const shownAt = useRef<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    shownAt.current = performance.now();
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  // After the first submit attempt, errors update live as the visitor fixes them.
  const revalidate = () => {
    if (touched && formRef.current) setErrors(validate(readValues(formRef.current), f));
  };
  const blurCheck = (field: FieldName) => {
    if (!formRef.current) return;
    const next = validate(readValues(formRef.current), f);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending' || status === 'sent') return;
    const form = e.currentTarget;
    const values = readValues(form);
    const found = validate(values, f);
    setErrors(found);
    setTouched(true);

    const first = ORDER.find((k) => found[k]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Anti-spam, silent on purpose: a filled honeypot, or a submit faster than
    // a person can fill the form, sends nothing and shows nothing.
    const honeypot = String(new FormData(form).get('_gotcha') ?? '');
    const elapsed = performance.now() - (shownAt.current ?? performance.now());
    if (honeypot || elapsed < MIN_FILL_MS) return;

    if (!formspreeId) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          projectType: values.projectType,
          budget: values.budget,
          message: values.message,
          consent: 'yes',
          _subject: `Project enquiry: ${values.name}`,
          _replyto: values.email,
        }),
      });
      // Success is claimed only on an OK response.
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      setStatus('sent');
      window.setTimeout(() => setStatus('success'), SENT_HOLD_MS);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[22rem] flex-col justify-center outline-none"
      >
        <svg viewBox="0 0 48 48" className="h-11 w-11 text-accent" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.25" />
          <path d="M15 24.5 L21.5 31 L34 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <p className="mt-6 max-w-[22ch] font-title text-[2rem] leading-[1.2] text-ink">
          {f.success}
        </p>
      </div>
    );
  }

  const errorCount = ORDER.filter((k) => errors[k]).length;
  const busy = status === 'sending' || status === 'sent';

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={id('title')}
      // Without JavaScript the form still posts to Formspree directly.
      {...(formspreeId ? { action: `https://formspree.io/f/${formspreeId}`, method: 'POST' } : {})}
    >
      <h2 id={id('title')} className="sr-only">
        {f.title}
      </h2>

      <div role="alert" aria-live="assertive">
        {touched && errorCount > 0 && (
          <p className="mb-8 border-l-2 border-[#A12A2A] pl-4 text-[1rem] text-ink">
            {f.errors.summary}
          </p>
        )}
      </div>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <TextField
          id={id('name')}
          name="name"
          label={f.name}
          autoComplete="name"
          error={errors.name}
          errorId={id('name-error')}
          onBlur={() => blurCheck('name')}
          onChange={revalidate}
        />
        <TextField
          id={id('email')}
          name="email"
          type="email"
          inputMode="email"
          label={f.email}
          autoComplete="email"
          error={errors.email}
          errorId={id('email-error')}
          onBlur={() => blurCheck('email')}
          onChange={revalidate}
        />
        <div className="sm:col-span-2">
          <TextField
            id={id('company')}
            name="company"
            label={
              <>
                {f.company} <span className="normal-case">({f.optional})</span>
              </>
            }
            autoComplete="organization"
            errorId={id('company-error')}
          />
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <Chips
          name="projectType"
          legend={f.projectType}
          optionalLabel={f.optional}
          options={f.projectTypes}
          error={errors.projectType}
          errorId={id('type-error')}
          onChange={revalidate}
        />
        <Chips
          name="budget"
          legend={f.budget}
          optionalLabel={f.optional}
          options={f.budgets}
          optional
          errorId={id('budget-error')}
        />
      </div>

      <div className="mt-9">
        <div className="field">
          <textarea
            id={id('message')}
            name="message"
            rows={6}
            placeholder={f.messagePlaceholder}
            className="field-input"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? id('message-error') : undefined}
            onBlur={() => blurCheck('message')}
            onChange={revalidate}
          />
          <label htmlFor={id('message')} className="field-label">
            {f.message}
          </label>
        </div>
        <ErrorText id={id('message-error')} message={errors.message} />
      </div>

      {/* Honeypot: invisible to people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('gotcha')}>Leave this field empty</label>
        <input id={id('gotcha')} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8">
        <div className="flex items-start gap-3 text-[1rem] leading-normal text-ink">
          <input
            id={id('consent')}
            type="checkbox"
            name="consent"
            value="yes"
            aria-labelledby={id('consent-text')}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? id('consent-error') : undefined}
            onChange={revalidate}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--ink)]"
          />
          <span id={id('consent-text')}>
            <label htmlFor={id('consent')} className="cursor-pointer">
              {f.consentBefore}
            </label>
            <Link href={privacyHref} className="link">
              {f.consentLink}
            </Link>
            {f.consentAfter}
          </span>
        </div>
        <ErrorText id={id('consent-error')} message={errors.consent} />
      </div>

      <button type="submit" disabled={busy} className="btn-send mt-9">
        {status === 'sending' && (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-[1.5px] border-white/40 border-t-white motion-reduce:animate-none"
            />
            {f.sending}
          </>
        )}
        {status === 'sent' && (
          <svg viewBox="0 0 24 24" className="check h-6 w-6" role="img" aria-label={f.sent}>
            <path
              d="M5 12.5 L10 17.5 L19 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {(status === 'idle' || status === 'error') && f.submit}
      </button>

      <div role="status" aria-live="polite">
        {status === 'error' && (
          <p className="mt-6 border-l-2 border-[#A12A2A] pl-4 text-[1rem] text-ink">
            {!formspreeId && <>{f.notConfigured} </>}
            {f.errorBefore}
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="link">
              {f.errorLink}
              <span className="sr-only"> {externalHint}</span>
            </a>
            {f.errorAfter}
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
