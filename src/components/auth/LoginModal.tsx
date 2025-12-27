// src/components/auth/LoginModal.tsx
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { homeImages } from '../../lib/images';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLoggedIn: (role: 'admin' | 'user') => void;
};

function getPrefill() {
  const email = (process.env.NEXT_PUBLIC_LOGIN_EMAIL || '').trim();
  const password = process.env.NEXT_PUBLIC_LOGIN_PASSWORD || '';
  return { email, password };
}

export default function LoginModal({ isOpen, onClose, onLoggedIn }: Props) {
  const prefill = useMemo(() => getPrefill(), []);

  const [email, setEmail] = useState(prefill.email);
  const [password, setPassword] = useState(prefill.password);

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.trim().length > 3 && status !== 'loading';
  }, [email, password, status]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  async function handleSubmit() {
    if (!canSubmit) return;

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setStatus('error');
        setErrorMessage('Login inválido. Confirma email e password.');
        return;
      }

      const data = (await res.json()) as { ok?: boolean; role?: 'admin' | 'user' };
      const role = data.role ?? 'user';

      onLoggedIn(role);
      window.dispatchEvent(new CustomEvent('nb_auth_changed'));
      onClose();

      setStatus('idle');
    } catch {
      setStatus('error');
      setErrorMessage('Erro inesperado. Tenta novamente.');
    }
  }

  if (!isOpen) return null;

  return (
    <div className='auth_modal' role='dialog' aria-modal='true' aria-label='Login'>
      <button
        className='auth_modal__backdrop'
        type='button'
        aria-label='Fechar'
        onClick={onClose}
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
                alt='Assinatura da psicóloga Nadia Baptista'
                width={260}
                height={90}
                priority
              />
            </div>
          </header>

          <section className='auth_modal__content'>
            <h2 className='auth_modal__headline'>Seja Bem vindo de volta</h2>
            <p className='auth_modal__subheadline'>Faça login com</p>

            <div className='auth_modal__social' aria-hidden='true'>
              <div className='auth_modal__social_placeholder' />
              <div className='auth_modal__social_placeholder' />
            </div>

            <p className='auth_modal__divider'>Ou...</p>

            <div className='auth_modal__form'>
              <label className='auth_modal__field'>
                <span className='auth_modal__label'>Email</span>
                <input
                  className='auth_modal__input'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  autoComplete='email'
                />
              </label>

              <label className='auth_modal__field'>
                <span className='auth_modal__label'>Password</span>
                <input
                  className='auth_modal__input'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  autoComplete='current-password'
                />
              </label>

              {errorMessage ? <p className='auth_modal__error'>{errorMessage}</p> : null}

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
                  {status === 'loading' ? 'A entrar...' : 'LOG IN'}
                </button>

                <div className='auth_modal__circle'></div>
              </div>

              <p className='auth_modal__footer'>
                Não tem conta?{' '}
                <button type='button' className='auth_modal__footer_link'>
                  Crie conta aqui
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
