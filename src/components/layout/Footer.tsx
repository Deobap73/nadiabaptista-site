// src/components/layout/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { homeImages } from '@/lib/images';
import { SiteIcons } from '@/lib/icons';
import type { Lang } from '@/lib/i18n';
import { withLangPrefix } from '@/lib/i18n';

// English: Accessing social icons from the centralized icon library
const { instagram: Instagram, facebook: Facebook, linkedin: Linkedin } = SiteIcons;

type Props = {
  lang: Lang;
};

export default function Footer({ lang }: Props) {
  const year = new Date().getFullYear();
  const isEn = lang === 'en';

  return (
    <footer className='site-footer'>
      <div className='site-footer__inner'>
        <div className='site-footer__col'>
          <h3 className='site-footer__title'>{isEn ? 'Explore' : 'Explorar'}</h3>
          <ul className='site-footer__list'>
            <li>
              <Link href={withLangPrefix(lang, '/')}>Home</Link>
            </li>
            <li>
              <Link href={withLangPrefix(lang, '/about')}>{isEn ? 'About Me' : 'Sobre Mim'}</Link>
            </li>
            <li>
              <Link href={withLangPrefix(lang, '/blog')}>{isEn ? 'Blog' : 'Blog'}</Link>
            </li>
            <li>
              <Link href={withLangPrefix(lang, '/contact')}>{isEn ? 'Contact' : 'Contacto'}</Link>
            </li>
          </ul>
        </div>

        <div className='site-footer__col'>
          <h3 className='site-footer__title'>{isEn ? 'Schedule' : 'Horários'}</h3>
          <ul className='site-footer__list'>
            <li>{isEn ? 'Monday to Friday' : 'Segunda a Sexta'}</li>
            <li>9h - 16h</li>
          </ul>
        </div>

        <div className='site-footer__col'>
          <h3 className='site-footer__title'>{isEn ? 'Contact' : 'Contacto'}</h3>
          <ul className='site-footer__list'>
            <li>Senhora da Hora</li>
            <li>Matosinhos, Portugal</li>
          </ul>
        </div>

        <div className='site-footer__col site-footer__col--wide'>
          <p className='site-footer__ethics'>
            {isEn
              ? 'Commitment to ethical rigor and confidentiality, following the Psychology code of ethics.'
              : 'Compromisso com o rigor ético e a confidencialidade segundo o código de ética profissional.'}
          </p>

          <div className='site-footer__social'>
            <a
              id='footer_social_instagram'
              href='#'
              aria-label='Instagram'
              target='_blank'
              rel='noopener noreferrer'>
              <span className='site-footer__icon'>
                <Instagram />
              </span>
            </a>

            <a
              id='footer_social_facebook'
              href='#'
              aria-label='Facebook'
              target='_blank'
              rel='noopener noreferrer'>
              <span className='site-footer__icon'>
                <Facebook />
              </span>
            </a>

            <a
              id='footer_social_linkedin'
              href='#'
              aria-label='LinkedIn'
              target='_blank'
              rel='noopener noreferrer'>
              <span className='site-footer__icon'>
                <Linkedin />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className='site-footer__bottom'>
        <p>
          © {year} {isEn ? 'All rights reserved.' : 'Todos os direitos reservados.'} Developed by{' '}
        </p>

        <a
          id='footer_dev_link'
          href='https://thehumantechblog.com'
          target='_blank'
          rel='noopener noreferrer'>
          <Image
            src={homeImages.logo_theHumanTechDigitals}
            alt='The Human Tech Digitals'
            width={160}
            height={30}
            className='site-footer__devlogo'
          />
        </a>
      </div>
    </footer>
  );
}
