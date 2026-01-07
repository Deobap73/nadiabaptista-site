# Nádia Baptista Psychology Website

This repository contains the website for **Nádia Baptista**, a psychology student based in Porto, Portugal.

The project follows a phased approach. It supports her academic phase now and is designed to grow into a full clinical website when she starts professional practice.

The focus is clarity, trust and calm visual communication. Development is done step by step, keeping the codebase readable, scalable and easy to evolve.

---

## HomePage Preview

The HomePage is composed of independent sections. Each section respects the grid system and the spacing tokens defined in the design system.

### Desktop Hero

![Home Hero Desktop](docs/images/HomeHeroDesktop.webp)

The hero introduces the site with a calm visual tone. It uses a full width background layer and a centered grid container for content.

### Desktop Quick Links

![Quick Links Desktop](docs/images/HomeQuickLinksDesktop.webp)

Quick access cards to the main areas of the site. Each card uses Cloudinary hosted images and shared spacing rules.

### Desktop Newsletter Banner

![Newsletter Banner Desktop](docs/images/HomeNewsletterBannerdesktop.webp)

A simple banner section using soft background shapes and centered text.

### Desktop Footer

![Footer Desktop](docs/images/FooterDesktop.webp)

Footer layout with logo, navigation links and supporting information aligned to the grid.

---

## Mobile Experience

The mobile experience follows a two step flow.
First, a landing screen introduces Nadia and her role. After interaction, the full HomePage is displayed.

All logic is handled with in memory state. No cookies or local storage are used.

### Mobile Landing

![Landing Page Mobile](docs/images/landingPageMobile.webp)

This screen ensures that essential content is visible for SEO while keeping the experience light.

### Mobile Quick Links

![Quick Links Mobile](docs/images/HomeQuickLinksMobile.webp)

Cards adapt to a single column layout with comfortable spacing.

### Mobile Newsletter Banner

![Newsletter Banner Mobile](docs/images/HomeNewsletterBannerMobile.webp)

Background shapes scale correctly for small screens.

### Mobile Footer

![Footer Mobile](docs/images/FooterMobile.webp)

Footer stacks vertically with clear separation between elements.

---

## Tech Stack

### Application

- Next.js with App Router
- React Server and Client Components
- TypeScript
- SCSS using BEM with a maximum of three nesting levels

### Hosting

- Deployed on Vercel
- Domain and DNS managed via Hostinger

### Media Management

- All images hosted on Cloudinary
- No images stored locally or in the database

### Content

- Blog powered by Prisma and PostgreSQL
- Server rendered blog list and article pages for SEO
- Dynamic sitemap generation from database content

### Email

- Contact form handled via Route Handler
- Server side email delivery using environment variables

---

## SEO and Analytics

The project includes a complete technical SEO and analytics foundation, implemented following best practices.

### Technical SEO

- Metadata handled with Next.js Metadata API
- Per page canonical URLs
- Open Graph metadata for social sharing
- Dynamic sitemap generated via Prisma
- robots.txt served via Next.js route
- Server side rendering for blog content
- Structured data using JSON-LD:
  - WebSite schema
  - Person schema (future psychologist, psychology student)
  - BlogPosting schema for articles

### Google Analytics and Tag Management

- Google Tag Manager integrated at the application layout level
- Google Analytics 4 configured and fired via GTM
- No direct GA scripts in the codebase
- Centralized tracking logic for scalability
- Ready for future events such as:
  - Page views
  - Scroll depth
  - Contact interactions
  - Form submissions
  - Blog reading behavior

Tracking is injected safely using Next.js Script component and a noscript fallback to ensure full coverage.

---

## Internationalization

The website is fully internationalized using language based routing.

- Language routes handled via the `/[lang]` segment
- Currently supported languages:
  - Portuguese `pt`
  - English `en`
- Each language has:
  - Its own layout
  - Language specific metadata
  - Correct canonical and alternate links
- SEO friendly language alternates defined using Next.js metadata API
- Text content progressively externalized per language
- Navigation, pages and UI components are language aware

This structure allows the site to scale naturally to additional languages without refactoring core architecture.

---

## Implemented Features

### Public Site

- Home page with modular sections
- About page
- Studies page
- Portfolio page
- Blog list page and blog post page with slug routing
- Contact page with API route and email sending
- Fully internationalized navigation and pages

### Cloudinary

- Server side Cloudinary configuration
- Upload API route accepting FormData and returning url and publicId
- Public pages and blog content use Cloudinary URLs for images

### Admin and Auth Foundations

These items exist as a foundation, not as a finished admin panel.

- Prisma schema and Prisma client setup
- Login API route with password hash verification
- Session creation using secure cookies
- Basic admin gating helper used by admin API routes
- Initial admin routes for content management, aligned with a consistent JSON response shape

---

## Project Roadmap

### Phase 1: Student Website

- Full HomePage
- Mobile landing flow
- Studies page
- Portfolio page
- Blog with database content
- Contact page
- Cloudinary integration
- Design system
- Internationalization foundation
- Technical SEO and analytics setup

### Phase 2: Pre Clinical Presence

- Expanded About page content
- Activate Services structure
- Activate FAQ structure
- Extended multilingual content

### Phase 3: Clinical Practice

- Appointment booking system
- Advanced content strategy
- Local SEO for Porto
- Full admin panel

---

## Design System

### Typography

- Headings use Cormorant Garamond
- Body text and UI use Inter
- Defined in tokens.scss

### Colors

- Primary blue: #6986A7
- Light blue: #C5D3D6
- Secondary blue: #8FBAEA
- White background
- Near black text color

### Grid

- Desktop: 12 column centered grid
- Mobile: 4 column layout

### Spacing

Consistent spacing tokens defined globally and reused across components.

---

## File Structure

```text
src/
  app/
    layout.tsx
    [lang]/
      layout.tsx
      page.tsx
      about/
      studies/
      portfolio/
      services/
      faq/
      contact/
      blog/
        page.tsx
        [slug]/page.tsx
      admin/
    api/

  components/
    layout/
    home/
    blog/
    form/
    auth/
    admin/
    seo/

  styles/
    globals.scss
    tokens.scss
    components/

  lib/
    email/
    cloudinary/
    blog/
    auth/
    prisma/
    seo/

  types/
```

---

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
```

---

## Environment Variables

```env
NEXT_PUBLIC_GTM_ID=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

If Prisma is enabled locally or on deploy, you will also need:

```env
DATABASE_URL=
DIRECT_URL=
```

Email sending also requires provider settings, stored only on the server:

```env
EMAIL_PROVIDER=
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_TO=
```

---

## About the Creator

This project is part of my professional frontend portfolio.
It reflects a strong focus on structure, design systems and long term maintainability.

---

## Contact

Email: contact@deolindobaptista.com  
LinkedIn: https://www.linkedin.com/in/deolindobaptista/  
GitHub: https://github.com/Deobap73
