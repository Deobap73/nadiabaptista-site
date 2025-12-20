// src/components/shared/NewsletterBanner.tsx
import React from 'react';

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

export default function NewsletterBanner({
  headingId,
  heading,
  description,
  fields,
  buttonLabel,
}: NewsletterBannerProps) {
  return (
    <section className='home-newsletter' aria-labelledby={headingId}>
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

        <form className='home-newsletter__form'>
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
                    <button type='button' className='btn btn--primary home-newsletter__button'>
                      {buttonLabel}
                    </button>
                  </div>
                );
              }

              return (
                <div key={field.id} className={groupClass}>
                  <input
                    id={field.id}
                    type={field.type}
                    className='home-newsletter__input'
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
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
