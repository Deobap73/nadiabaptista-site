// src/components/auth/LoginModal.tsx
'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { homeImages } from '../../lib/images';
import type { Lang } from '@/lib/i18n';
import { getAuthDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  onLoggedIn: (role: 'admin' | 'user') => void;
};

type Status = 'idle' | 'loading' | 'error';

type FormState = {
  email: string;
  password: string;
  status: Status;
  errorMessage: string | null;
};

const INITIAL: FormState = {
  email: '',
  password: '',
  status: 'idle',
  errorMessage: null,
};

export default function LoginModal({ lang, isOpen, onClose, onLoggedIn }: Props) {
  const dict = useMemo(() => getAuthDict(lang), [lang]);

  const [form, setForm] = useState<FormState>(INITIAL);

  const closeAndReset = useCallback(() => {
    setForm(INITIAL);
    onClose();
  }, [onClose]);

  const canSubmit = useMemo(() => {
    return (
      form.email.trim().length > 3 && form.password.trim().length > 3 && form.status !== 'loading'
    );
  }, [form.email, form.password, form.status]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAndReset();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeAndReset]);

  async function handleSubmit() {
    if (!canSubmit) return;

    setForm((prev) => ({ ...prev, status: 'loading', errorMessage: null }));

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = (await res.json()) as { ok?: boolean; role?: 'admin' | 'user' };

      if (!res.ok || !data.ok) {
        setForm((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: dict.errors.invalid,
        }));
        return;
      }

      onLoggedIn(data.role ?? 'user');
      window.dispatchEvent(new CustomEvent('nb_auth_changed'));

      closeAndReset();
    } catch {
      setForm((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: dict.errors.unexpected,
      }));
    }
  }

  if (!isOpen) return null;

  return (
    <div className='auth_modal' role='dialog' aria-modal='true' aria-label={dict.modal.ariaLabel}>
      <button
        className='auth_modal__backdrop'
        type='button'
        aria-label={dict.modal.close}
        onClick={closeAndReset}
      />

      <div
        className='auth_modal__panel'
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <div className='auth_modal__surface'>
          <svg
            className='auth_modal__background_svg'
            viewBox='0 0 390 720'
            preserveAspectRatio='none'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              d='M0 0V113C60 170 145 185 220 120C295 55 350 70 390 120V0H0Z'
              fill='#C5D1D6'
              fillOpacity='0.4'
            />
            <path
              d='M0 650C50 640 100 660 140 700C165 725 180 720 180 720H0V650Z'
              fill='#C5D1D6'
              fillOpacity='0.7'
            />
          </svg>

          <header className='auth_modal__brand'>
            <div className='auth_modal__brand_logo'>
              <Image
                src={homeImages.logoNadia}
                alt='Assinatura da psicóloga Nádia Baptista'
                width={260}
                height={90}
                priority
              />
            </div>
          </header>

          <section className='auth_modal__content'>
            <h2 className='auth_modal__headline'>{dict.headline}</h2>
            <p className='auth_modal__subheadline'>{dict.subheadline}</p>

            <div className='auth_modal__social' aria-hidden='true'>
              <div className='auth_modal__social_placeholder' />
              <div className='auth_modal__social_placeholder' />
            </div>

            <p className='auth_modal__divider'>{dict.divider}</p>

            <div className='auth_modal__form'>
              <label className='auth_modal__field'>
                <span className='auth_modal__label'>{dict.labels.email}</span>
                <input
                  className='auth_modal__input'
                  type='email'
                  placeholder={dict.placeholders.email}
                  value={form.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  autoComplete='email'
                />
              </label>

              <label className='auth_modal__field'>
                <span className='auth_modal__label'>{dict.labels.password}</span>
                <input
                  className='auth_modal__input'
                  type='password'
                  placeholder={dict.placeholders.password}
                  value={form.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  autoComplete='current-password'
                />
              </label>

              {form.errorMessage ? <p className='auth_modal__error'>{form.errorMessage}</p> : null}

              <div className='auth_modal__actions'>
                <div className='auth_modal__go'>
                  <span className='auth_modal__go_icon' aria-hidden='true'>
                    ›
                  </span>
                </div>

                <button
                  className='auth_modal__submit'
                  type='button'
                  onClick={handleSubmit}
                  disabled={!canSubmit}>
                  {form.status === 'loading' ? dict.loading : dict.submit}
                </button>

                <div className='auth_modal__circle' />
              </div>

              <p className='auth_modal__footer'>
                {dict.footer.noAccount}{' '}
                <button type='button' className='auth_modal__footer_link'>
                  {dict.footer.create}
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
