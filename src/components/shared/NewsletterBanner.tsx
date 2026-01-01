// src/components/shared/NewsletterBanner.tsx

'use client';

import React, { useMemo, useState } from 'react';
import Toast from '@/components/ui/Toast';

type NewsletterField = {
  id: string;
  type: 'text' | 'email';
  autoComplete?: string;
  placeholder: string;
  modifier?: 'email' | 'button';
};

type NewsletterBannerProps = {
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
  headingId,
  heading,
  description,
  fields,
  buttonLabel,
}: NewsletterBannerProps) {
  const nameFieldId = useMemo(() => fields.find((f) => f.type === 'text')?.id || 'name', [fields]);
  const emailFieldId = useMemo(
    () => fields.find((f) => f.type === 'email')?.id || 'email',
    [fields]
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function openToast(message: string) {
    setToastMessage(message);
    setToastOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const safeEmail = email.trim().toLowerCase();
    const safeName = name.trim();

    if (!isValidEmail(safeEmail)) {
      openToast('Escreve um email válido.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: safeEmail, name: safeName || undefined }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok || !data.ok) {
        openToast(data.error || 'Falha ao subscrever. Tenta de novo.');
        setIsSubmitting(false);
        return;
      }

      if (data.alreadyActive) {
        openToast('Já estás subscrito.');
        setIsSubmitting(false);
        return;
      }

      openToast('Enviámos um email de confirmação. Verifica a tua caixa de entrada.');
      setEmail('');
      setName('');
      setIsSubmitting(false);
      return;
    } catch {
      openToast('Falha ao subscrever. Tenta de novo.');
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
                      type='submit'
                      className='btn btn--primary home-newsletter__button'
                      disabled={isSubmitting}>
                      {isSubmitting ? 'A enviar...' : buttonLabel}
                    </button>
                  </div>
                );
              }

              const isEmail = field.type === 'email';

              return (
                <div key={field.id} className={groupClass}>
                  <input
                    id={field.id}
                    type={field.type}
                    className='home-newsletter__input'
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={isEmail ? email : name}
                    onChange={(e) => (isEmail ? setEmail(e.target.value) : setName(e.target.value))}
                    required={isEmail}
                    name={
                      field.id === emailFieldId
                        ? 'email'
                        : field.id === nameFieldId
                        ? 'name'
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
