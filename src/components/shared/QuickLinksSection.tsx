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
  exploreLabel = 'EXPLORE',
  items,
}: QuickLinksSectionProps) {
  return (
    <section className='quick-links' aria-labelledby={titleId}>
      {/* Desktop */}
      <div className='quick-links__desktop'>
        <div className='quick-links__container site-container site-container--wide'>
          <div className='quick-links__bg-full' aria-hidden='true'></div>

          <div className='quick-links__band'>
            <div className='quick-links__explore'>
              <span>{exploreLabel}</span>
            </div>

            <div className='quick-links__content'>
              <h2 id={titleId} className='quick-links__title-desktop'>
                {title}
              </h2>

              <div className='quick-links__grid'>
                {items.map((item) => (
                  <Link key={item.id} href={item.href} className='quick-links__card'>
                    <div className='quick-links__image-wrapper'>
                      <Image
                        src={item.imageSrc}
                        alt={item.alt}
                        width={520}
                        height={860}
                        className='quick-links__image'
                        sizes='(min-width: 1024px) 260px, 100vw'
                      />
                    </div>

                    <span className='quick-links__label'>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='quick-links__mobile' aria-labelledby={`${titleId}-mobile`}>
        <div className='quick-links__mobile-inner site-container site-container--wide'>
          <h2 id={`${titleId}-mobile`} className='quick-links__mobile-title'>
            {title}
          </h2>

          <div className='quick-links__mobile-grid'>
            {items.map((item) => (
              <Link key={item.id} href={item.href} className='quick-links__mobile-card'>
                <div className='quick-links__mobile-bg-full' aria-hidden='true'></div>

                <div className='quick-links__mobile-content'>
                  <span className='quick-links__mobile-label'>{item.label}</span>

                  <div className='quick-links__mobile-image-wrapper'>
                    <Image
                      src={item.imageSrc}
                      alt={item.alt}
                      width={660}
                      height={1100}
                      className='quick-links__mobile-image'
                      sizes='(max-width: 768px) 330px, 100vw'
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
