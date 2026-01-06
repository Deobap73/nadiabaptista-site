// src/components/shared/NewsletterBanner.tsx

'use client';

import React, { useMemo, useState } from 'react';
import Toast from '@/components/ui/Toast';
import type { Lang } from '@/lib/i18n';
import { getNewsletterDict } from '@/lib/i18n/newsletter';

type NewsletterField = {
  id: string;
  type: 'text' | 'email';
  autoComplete?: string;
  placeholder: string;
  modifier?: 'email' | 'button';
};

type NewsletterBannerProps = {
  lang: Lang;
  headingId: string;
  heading: string;
  description: string;
  fields: NewsletterField[];
  buttonLabel: string;
};

type ApiResponse = {
  ok: boolean;
  error?: string;
  alreadyActive?: boolean;
};

function isValidEmail(email: string): boolean {
  const v = email.trim().toLowerCase();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function NewsletterBanner({
  lang,
  headingId,
  heading,
  description,
  fields,
  buttonLabel,
}: NewsletterBannerProps) {
  const dict = useMemo(() => getNewsletterDict(lang), [lang]);

  const emailFieldId = useMemo(
    () => fields.find((f) => f.type === 'email')?.id || 'email',
    [fields]
  );

  const textFieldIds = useMemo(
    () => fields.filter((f) => f.type === 'text').map((f) => f.id),
    [fields]
  );

  const firstNameFieldId = useMemo(() => textFieldIds[0] || 'firstName', [textFieldIds]);
  const lastNameFieldId = useMemo(() => textFieldIds[1] || 'lastName', [textFieldIds]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function openToast(message: string) {
    setToastMessage(message);
    setToastOpen(true);
  }

  function buildFullName(fn: string, ln: string): string {
    const a = fn.trim();
    const b = ln.trim();
    return [a, b].filter(Boolean).join(' ').trim();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const safeEmail = email.trim().toLowerCase();
    const safeFullName = buildFullName(firstName, lastName);

    if (!isValidEmail(safeEmail)) {
      openToast(dict.toast.invalidEmail);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: safeEmail,
          name: safeFullName || undefined,
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok || !data.ok) {
        openToast(data.error || dict.toast.subscribeFail);
        setIsSubmitting(false);
        return;
      }

      if (data.alreadyActive) {
        openToast(dict.toast.alreadySubscribed);
        setIsSubmitting(false);
        return;
      }

      openToast(dict.toast.confirmationSent);
      setEmail('');
      setFirstName('');
      setLastName('');
      setIsSubmitting(false);
      return;
    } catch {
      openToast(dict.toast.subscribeFail);
      setIsSubmitting(false);
      return;
    }
  }

  return (
    <section className='home-newsletter' aria-labelledby={headingId}>
      <Toast isOpen={toastOpen} message={toastMessage} onClose={() => setToastOpen(false)} />

      <div className='home-newsletter__wave' aria-hidden='true'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'>
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='home-newsletter__wave--shape'></path>
        </svg>
      </div>

      <div className='home-newsletter__inner site-container site-container--wide'>
        <header className='home-newsletter__header'>
          <h2 id={headingId} className='home-newsletter__heading'>
            {heading}
          </h2>
          <p className='home-newsletter__description'>{description}</p>
        </header>

        <form className='home-newsletter__form' onSubmit={onSubmit}>
          <div className='home-newsletter__fields'>
            {fields.map((field) => {
              const groupClass =
                field.modifier === 'email'
                  ? 'home-newsletter__field-group home-newsletter__field-group--email'
                  : field.modifier === 'button'
                  ? 'home-newsletter__field-group home-newsletter__field-group--button'
                  : 'home-newsletter__field-group';

              if (field.modifier === 'button') {
                return (
                  <div key={field.id} className={groupClass}>
                    <button
                      id='newsletter_subscribe_button'
                      type='submit'
                      className='btn btn--primary home-newsletter__button'
                      disabled={isSubmitting}>
                      {isSubmitting ? dict.button.sending : buttonLabel}
                    </button>
                  </div>
                );
              }

              const isEmail = field.type === 'email';
              const isFirstName = field.type === 'text' && field.id === firstNameFieldId;

              const value = isEmail ? email : isFirstName ? firstName : lastName;

              return (
                <div key={field.id} className={groupClass}>
                  <input
                    id={field.id}
                    type={field.type}
                    className='home-newsletter__input'
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (isEmail) setEmail(v);
                      else if (isFirstName) setFirstName(v);
                      else setLastName(v);
                    }}
                    required={isEmail}
                    name={
                      field.id === emailFieldId
                        ? 'email'
                        : field.id === firstNameFieldId
                        ? 'firstName'
                        : field.id === lastNameFieldId
                        ? 'lastName'
                        : field.id
                    }
                  />
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </section>
  );
}
