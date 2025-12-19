// src/components/layout/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { homeImages } from '@/lib/images';
import { SiteIcons } from '@/lib/icons';

const Instagram = SiteIcons.instagram;
const Facebook = SiteIcons.facebook;
const Linkedin = SiteIcons.linkedin;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='site-footer'>
      <div className='site-footer__inner'>
        {/* Coluna 1 */}
        <div className='site-footer__col'>
          <h3 className='site-footer__title'>Explore</h3>
          <ul className='site-footer__list'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>Sobre Mim</Link>
            </li>
            <li>
              <Link href='/blog'>Leia o meu Blog</Link>
            </li>
            <li>
              <Link href='/contact'>Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 2 */}
        <div className='site-footer__col'>
          <h3 className='site-footer__title'>Horários</h3>
          <ul className='site-footer__list'>
            <li>Segunda a Sexta</li>
            <li>9h - 16h</li>
          </ul>
        </div>

        {/* Coluna 3 */}
        <div className='site-footer__col'>
          <h3 className='site-footer__title'>Contacto</h3>
          <ul className='site-footer__list'>
            <li>+351 000 000 000</li>
            <li>Senhora da Hora</li>
            <li>Senhora da Hora</li>
          </ul>
        </div>

        {/* Texto e ícones */}
        <div className='site-footer__col site-footer__col--wide'>
          <p className='site-footer__ethics'>
            Compromisso com o rigor ético e a confidencialidade. Todos os processos são conduzidos
            segundo o código de ética profissional da Psicologia.
          </p>

          <div className='site-footer__social'>
            <Link href='https://instagram.com' aria-label='Instagram'>
              <span className='site-footer__icon'>
                <Instagram />
              </span>
            </Link>
            <Link href='https://facebook.com' aria-label='Facebook'>
              <span className='site-footer__icon'>
                <Facebook />
              </span>
            </Link>
            <Link href='https://linkedin.com' aria-label='LinkedIn'>
              <span className='site-footer__icon'>
                <Linkedin />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className='site-footer__bottom'>
        <p>© {year} Todos os direitos reservados. Desenvolvido por - </p>

        <a
          className='footer__link--legal'
          href='https://thehumantechblog.com/about'
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
