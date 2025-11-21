// src/components/home/HomeQuickLinks.tsx
import Link from 'next/link';
import Image from 'next/image';
import { homeImages } from '@/lib/images';

type QuickLink = {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
  alt: string;
};

const QUICK_LINKS: QuickLink[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/about', // placeholder por agora
    imageSrc: homeImages.portfolioDesktop,
    alt: 'Retrato profissional da psicóloga, em preto e branco',
  },
  {
    id: 'studies',
    label: 'Studies',
    href: '/services', // placeholder por agora
    imageSrc: homeImages.studiesDesktop,
    alt: 'Psicóloga sentada à secretária com documentos de estudo',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    imageSrc: homeImages.blogDesktop,
    alt: 'Psicóloga a sorrir enquanto escreve no portátil',
  },
];

export default function HomeQuickLinks() {
  return (
    <section className='home-quick-links' aria-labelledby='home-quick-links-title-desktop'>
      {/* DESKTOP */}
      <div className='home-quick-links__desktop'>
        <div className='home-quick-links__container'>
          {/* Fundo azul a toda a largura com altura fixa */}
          <div className='home-quick-links__bg-full'></div>

          <div className='home-quick-links__band'>
            {/* Lado esquerdo, texto vertical apenas em desktop */}
            <div className='home-quick-links__explore'>
              <span>Explore</span>
            </div>

            {/* Conteúdo principal */}
            <div className='home-quick-links__content'>
              <h2 id='home-quick-links-title-desktop' className='home-quick-links__title'>
                Recursos úteis
              </h2>

              <div className='home-quick-links__grid'>
                {QUICK_LINKS.map((item) => (
                  <Link key={item.id} href={item.href} className='home-quick-links__card'>
                    <div className='home-quick-links__image-wrapper'>
                      <Image
                        src={item.imageSrc}
                        alt={item.alt}
                        width={260}
                        height={320}
                        className='home-quick-links__image'
                      />
                    </div>
                    <span className='home-quick-links__label'>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className='home-quick-links__mobile' aria-labelledby='home-quick-links-title-mobile'>
        <div className='home-quick-links__mobile-inner'>
          <h2 id='home-quick-links-title-mobile' className='home-quick-links__mobile-title'>
            Recursos úteis
          </h2>

          <div className='home-quick-links__mobile-grid'>
            {QUICK_LINKS.map((item) => (
              <Link key={item.id} href={item.href} className='home-quick-links__mobile-card'>
                {/* Fundo azul controlado por ti (absolute) */}
                <div className='home-quick-links__mobile-bg-full'></div>

                {/* Conteúdo por cima do fundo */}
                <div className='home-quick-links__mobile-content'>
                  <span className='home-quick-links__mobile-label'>{item.label}</span>

                  <div className='home-quick-links__mobile-image-wrapper'>
                    <Image
                      src={item.imageSrc}
                      alt={item.alt}
                      width={260}
                      height={320}
                      className='home-quick-links__mobile-image'
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
