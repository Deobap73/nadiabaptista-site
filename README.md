
# Nadia Baptista Psychology Website

This repository contains the website for **Nadia Baptista**, a psychology student based in Porto.  
The project follows a phased approach. It supports her academic phase now and is designed to grow into a full clinical website when she starts professional practice.

The focus of the implementation is clarity, trust and calm visual communication. Development is done step by step, keeping the codebase readable, scalable and easy to evolve.

---

## Badges

![Next.js](https://img.shields.io/badge/Next.js-white-nextdotjs?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blueviolet)
![React](https://img.shields.io/badge/React-18-blue)
![SCSS](https://img.shields.io/badge/SCSS-BEM-green)
![Cloudinary](https://img.shields.io/badge/Cloudinary-blue?logo=cloudinary)
![Vercel](https://img.shields.io/badge/Vercel-white-vercel)

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
- SCSS following BEM with a maximum of three nesting levels

### Hosting
- Deployed on Vercel
- Domain and DNS managed via Hostinger

### Media Management
- All images hosted on Cloudinary
- No images stored locally or in the database

### Content
- Blog uses mock data in phase one
- Architecture prepared for Prisma and PostgreSQL

### Email
- Contact form handled via Route Handler
- Server side email delivery using environment variables

### SEO
- Metadata handled with generateMetadata
- Blog slugs implemented
- Mobile SEO considered from the start
- Sitemap and robots planned for later phase

---

## Project Roadmap

### Phase 1 – Student Website
- Full HomePage
- Mobile landing flow
- Studies page
- Portfolio page
- Blog with mock posts
- Contact page
- Cloudinary integration
- Defined design system

### Phase 2 – Pre Clinical Presence
- Expanded About page
- Base Services structure
- FAQ structure

### Phase 3 – Clinical Practice
- Activate Services and FAQ
- Appointment booking system
- Database powered blog
- Local SEO for Porto
- Admin panel

---

## Design System

### Typography
- Headings use Cormorant Garamond
- Body text uses Inter
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
      contact/
      upload/

  components/
    layout/
    home/
    blog/
    form/

  styles/
    globals.scss
    tokens.scss
    components/

  lib/
    email/
    cloudinary/
    blog/

  types/
```

---

## Development Principles

- Incremental development
- One feature per commit
- Clear file structure
- No premature complexity
- Prepared for long term growth

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
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Future Work

- Content enrichment
- Multilingual support
- Appointment system
- Admin panel
- SEO expansion focused on Porto

---

## About the Creator

This project is part of my professional frontend portfolio.  
It reflects a strong focus on structure, design systems and long term maintainability.

---

## Contact

Email: contact@deolindobaptista.com  
LinkedIn: https://www.linkedin.com/in/deolindobaptista/  
GitHub: https://github.com/Deobap73

---

If this project is useful, feel free to star the repository.
