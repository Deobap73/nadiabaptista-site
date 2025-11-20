// src/lib/images.ts
// Central place for all image URLs used on the site.
// For now we only define Home images.

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dleir1jqn/image/upload';

export type HomeImages = {
  logoNadia: string;
  logo_theHumanTechDigitals: string;
  heroDesktop: string;
  heroMobile: string;
  landingMobile: string;
  studiesDesktop: string;
  portfolioDesktop: string;
  blogDesktop: string;
  aboutDesktop: string;
};

export const homeImages: HomeImages = {
  logoNadia: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/Logo.webp`,
  logo_theHumanTechDigitals: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/logo_theHumanTechDigitals.svg`,
  heroDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/hero-desktop.webp`,
  heroMobile: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/hero-mobile.webp`,
  landingMobile: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/landingPage-mobile.webp`,
  studiesDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/studies-desktop.webp`,
  portfolioDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/portfolio-desktop.webp`,
  blogDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/blog-desktop.webp`,
  aboutDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/home/about-desktop.webp`,
};

// In the future we can add other sections like:
// export const siteImages = { home: homeImages, about: aboutImages, ... };
