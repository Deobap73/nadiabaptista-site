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

// About page images
export type AboutImages = {
  aboutHeroDesktop: string;
  aboutHeroMobile: string;
  aboutMyStorie1: string;
  aboutMyStorie2: string;
};

export const aboutImages: AboutImages = {
  aboutHeroDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/about/aboutPage-hero-desktop.webp`,
  aboutHeroMobile: `${CLOUDINARY_BASE}/NadiaBaptista-site/about/aboutPage-hero-mobile.webp`,
  aboutMyStorie1: `${CLOUDINARY_BASE}/NadiaBaptista-site/about/aboutPage-MyStorie-1-desktop.webp`,
  aboutMyStorie2: `${CLOUDINARY_BASE}/NadiaBaptista-site/about/aboutPage-MyStorie-2-desktop.webp`,
};

// blog page image
export type BlogImages = {
  blogHeroDesktop: string;
};

export const blogImages: BlogImages = {
  blogHeroDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/blog/blogPage-hero-desktop.webp`,
};

// contact page image
export type ContactImages = {
  contactHeroDesktop: string;
  contactHeroMobile: string;
};

export const contactImages: ContactImages = {
  contactHeroDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/contact/hero-contact.webp`,
  contactHeroMobile: `${CLOUDINARY_BASE}/NadiaBaptista-site/contact/hero-contact-mobile.webp`,
};

// Portfolio page image
export type PortfolioImages = {
  portfolioHeroDesktop: string;
  portfolioHeroMobile: string;
  portfolio_1: string;
};

export const portfolioImages: PortfolioImages = {
  portfolioHeroDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/portfolio/PortfolioPage-hero-desktop.webp`,
  portfolioHeroMobile: `${CLOUDINARY_BASE}/NadiaBaptista-site/portfolio/PortfolioPage-hero-mobile.webp`,
  portfolio_1: `${CLOUDINARY_BASE}/NadiaBaptista-site/portfolio/PortfolioPage-portfolio_1.webp`,
};

// Portfolio page image
export type StudiesImages = {
  studiesHeroDesktop: string;
  areasOfInterest_1: string;
  areasOfInterest_2: string;
  areasOfInterest_3: string;
  conferences_1: string;
  conferences_2: string;
  seminars_1: string;
  seminars_2: string;
};

export const studiesImages: StudiesImages = {
  studiesHeroDesktop: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/studiesPage-desktop.webp`,
  areasOfInterest_1: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/AreasOfInterest/psicologiaDesporto.webp`,
  areasOfInterest_2: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/AreasOfInterest/psicologiaClinica.webp`,
  areasOfInterest_3: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/AreasOfInterest/Neuropsicologia.webp`,
  conferences_1: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/ConferencesAndSeminars/Conferences_1.webp`,
  conferences_2: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/ConferencesAndSeminars/Conferences_2.webp`,
  seminars_1: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/ConferencesAndSeminars/Seminar_1.webp`,
  seminars_2: `${CLOUDINARY_BASE}/NadiaBaptista-site/Studies/ConferencesAndSeminars/Seminar_2.webp`,
};
