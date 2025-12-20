// src/components/shared/QuickLinksSection.tsx
import Link from 'next/link';
import Image from 'next/image';

export type QuickLinkItem = {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
  alt: string;
};

type QuickLinksSectionProps = {
  titleId: string;
  title: string;
  exploreLabel?: string;
  items: QuickLinkItem[];
};

export default function QuickLinksSection({
  titleId,
  title,
  exploreLabel = 'Explore',
  items,
}: QuickLinksSectionProps) {
  return (
    <section className='home-quick-links' aria-labelledby={titleId}>
      <div className='home-quick-links__desktop'>
        <div className='home-quick-links__container site-container site-container--wide'>
          <div className='home-quick-links__bg-full'></div>

          <div className='home-quick-links__band'>
            <div className='home-quick-links__explore'>
              <span>{exploreLabel}</span>
            </div>

            <div className='home-quick-links__content'>
              <h2 id={titleId} className='home-quick-links__title'>
                {title}
              </h2>

              <div className='home-quick-links__grid'>
                {items.map((item) => (
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

      <div className='home-quick-links__mobile' aria-labelledby={`${titleId}-mobile`}>
        <div className='home-quick-links__mobile-inner site-container site-container--wide'>
          <h2 id={`${titleId}-mobile`} className='home-quick-links__mobile-title'>
            {title}
          </h2>

          <div className='home-quick-links__mobile-grid'>
            {items.map((item) => (
              <Link key={item.id} href={item.href} className='home-quick-links__mobile-card'>
                <div className='home-quick-links__mobile-bg-full'></div>

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
