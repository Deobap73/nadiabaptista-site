// src/components/home/HomeNewsletterBanner.tsx
import React from 'react';

export default function HomeNewsletterBanner() {
  return (
    <section className='home-newsletter' aria-labelledby='home-newsletter-heading'>
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
          <h2 id='home-newsletter-heading' className='home-newsletter__heading'>
            Nutra a Sua Mente
          </h2>
          <p className='home-newsletter__description'>
            Receba insights exclusivos e ferramentas práticas para o seu bem estar diretamente da
            futura Psicóloga Nádia. Sem ruído, apenas conteúdo valioso.
          </p>
        </header>

        <form className='home-newsletter__form'>
          <div className='home-newsletter__fields'>
            <div className='home-newsletter__field-group'>
              <input
                id='newsletter-first-name'
                type='text'
                className='home-newsletter__input'
                autoComplete='given-name'
                placeholder='Primeiro Nome'
              />
            </div>

            <div className='home-newsletter__field-group'>
              <input
                id='newsletter-last-name'
                type='text'
                className='home-newsletter__input'
                autoComplete='family-name'
                placeholder='Último Nome'
              />
            </div>

            <div className='home-newsletter__field-group home-newsletter__field-group--email'>
              <input
                id='newsletter-email'
                type='email'
                className='home-newsletter__input'
                autoComplete='email'
                placeholder='Email'
              />
            </div>

            <div className='home-newsletter__field-group home-newsletter__field-group--button'>
              <button type='button' className='btn btn--primary home-newsletter__button'>
                Subscreve (Newsletter)
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
