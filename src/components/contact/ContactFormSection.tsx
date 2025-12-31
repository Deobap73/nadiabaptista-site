// src/components/contact/ContactFormSection.tsx

'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const INITIAL_STATE: ContactFormState = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function ContactFormSection() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleChange(field: keyof ContactFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setForm(INITIAL_STATE);
      setStatus('success');
      return;
    } catch {
      setStatus('error');
      return;
    }
  }

  return (
    <section className='contact_form' aria-label='Formulário de contacto'>
      <div className='contact_form__wave' aria-hidden='true'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
            className='contact_form__wave--shape'
          />
        </svg>
      </div>

      <div className='contact_form__inner site-container site-container--wide'>
        <div className='contact_form__grid'>
          <aside className='contact_form__info' aria-label='Informações de contacto'>
            <div className='contact_form__info-block'>
              <h3 className='contact_form__info-title'>Email</h3>
              <p className='contact_form__info-text'>Contacto@nadiabaptista.pt</p>
            </div>

            <div className='contact_form__info-block'>
              <h3 className='contact_form__info-title'>Telefone</h3>
              <p className='contact_form__info-text'>+351 999 999 999</p>
            </div>

            <div className='contact_form__info-block'>
              <h3 className='contact_form__info-title'>Morada</h3>
              <p className='contact_form__info-text'>Rua Cooperativa as 7 bicas</p>
              <p className='contact_form__info-text'>Senhora da hora</p>
            </div>

            <div className='contact_form__info-block'>
              <h3 className='contact_form__info-title'>social</h3>

              <div className='contact_form__social'>
                <a className='contact_form__social-link' href='#' aria-label='Instagram'>
                  <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                    <path d='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z' />
                  </svg>
                </a>

                <a className='contact_form__social-link' href='#' aria-label='Facebook'>
                  <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                    <path d='M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z' />
                  </svg>
                </a>

                <a className='contact_form__social-link' href='#' aria-label='LinkedIn'>
                  <svg viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                    <path d='M6.5 6.5A1.5 1.5 0 1 1 6.5 3a1.5 1.5 0 0 1 0 3.5zM5 8h3v13H5V8zm6 0h3v1.8c.6-1.1 1.8-2.1 3.7-2.1 3 0 4.3 2 4.3 5.2V21h-3v-6.7c0-1.8-.7-3-2.2-3-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V21h-3V8z' />
                  </svg>
                </a>
              </div>
            </div>
          </aside>

          <div className='contact_form__divider' aria-hidden='true' />

          <form className='contact_form__form' onSubmit={handleSubmit} aria-label='Enviar mensagem'>
            <div className='contact_form__fields'>
              <div className='contact_form__field'>
                <input
                  className='contact_form__input'
                  type='text'
                  name='name'
                  placeholder='Nome'
                  autoComplete='name'
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  minLength={2}
                />
              </div>

              <div className='contact_form__field'>
                <input
                  className='contact_form__input'
                  type='tel'
                  name='phone'
                  placeholder='Telefone'
                  autoComplete='tel'
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>

              <div className='contact_form__field'>
                <input
                  className='contact_form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='email'
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className='contact_form__field contact_form__field_message'>
                <textarea
                  className='contact_form__textarea'
                  name='message'
                  placeholder='Mensagem'
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  minLength={2}
                />
              </div>

              <div className='contact_form__actions'>
                <button
                  className='contact_form__button'
                  type='submit'
                  disabled={status === 'sending'}>
                  Enviar
                </button>

                <p className='contact_form__feedback' aria-live='polite'>
                  {status === 'success' ? 'Mensagem enviada.' : null}
                  {status === 'error' ? 'Ocorreu um erro. Tente novamente.' : null}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
