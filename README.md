# Nadia Baptista Psychology Website

## Overview

This repository contains the official website project for **Nadia
Baptista**, a psychology student based in Porto.\
The website serves two purposes:

1.  Public presentation of Nadia as a future psychologist\
2.  Structured development foundation for a future clinical practice
    website\
    (services, FAQ, appointment flow, etc.)

At this stage, Nadia is still a student, so the website focuses on:

• Academic path\
• Research interests\
• Professional development\
• Early portfolio and activities\
• Blog with articles and reflections\
• A clean HomePage that builds credibility without pretending clinical
practice has started

Future clinical content (Services, FAQ, Appointment System) is already
planned, structured and placed in the file tree, but hidden from the
navigation until the right time.

The project is built as a real learning path, using a strict phased
workflow with small incremental commits, clear architecture, and
consistent design tokens.

------------------------------------------------------------------------

# Tech Stack

### Frontend & Backend

-   Next.js 14\
-   App Router\
-   TypeScript\
-   React Server Components + Client Components\
-   SCSS modules + design tokens

### Deployment

-   Frontend + Backend deployed on Vercel\
-   Domain management on Hostinger\
-   DNS points to Vercel

### Media Handling

-   All images stored on Cloudinary\
-   No local filesystem storage

### Content

-   Blog uses static mock data during Phase One\
-   Future phase: Prisma + PostgreSQL

### Email

-   Contact form API via Next.js Route Handlers\
-   Email sending through a server-side provider (e.g., Resend)

### SEO

-   Dynamic SEO planned:\
    • Metadata per page\
    • Blog slugs\
    • Multilingual SEO (future)\
    • Sitemap and robots.txt

------------------------------------------------------------------------

# Project Goals

## Phase 1 --- Student Website

-   Home with full responsive structure\
-   Mobile two-step entry flow\
-   Studies page\
-   Portfolio page\
-   Blog with mock posts\
-   Contact form\
-   Cloudinary integration for images\
-   Consistent design system\
-   Clean, academic-oriented identity

## Phase 2 --- Early Professional Presence

-   Expand About page\
-   Add introductory Services content (inactive until license
    completion)\
-   Add FAQ structure (hidden in navigation)

## Phase 3 --- Clinical Practice Launch

-   Activate Services and FAQ\
-   Add appointment form\
-   Add full blog with database\
-   SEO optimization for local search (Porto region)\
-   Admin panel with authentication\
-   Dashboard for content management

------------------------------------------------------------------------

# Design System

### Typography

-   Cormorant Garamond --- headings\
-   Inter --- body text and UI\
-   Tokens defined in `tokens.scss`

### Color Palette

-   Primary blue: #3C5979\
-   Light blue: #C5D3D6\
-   Secondary blue: #8FBAEA\
-   White: #FFFFFF\
-   Text near black: #111111

### Grid

Desktop: 12-column centered grid\
Mobile: 4-column stretch grid

### Spacing tokens

--spaceXs, --spaceSm, --spaceMd, --spaceLg, --spaceXl

------------------------------------------------------------------------

# Mobile Experience

The mobile onboarding flow uses a two-step entry:

1.  LandingMobile\
2.  HomeMobile

Landing includes SEO-required intro text.\
Flow uses in-memory state only.

------------------------------------------------------------------------

# Current File Structure

    src/
      app/
        layout.tsx
        page.tsx

        about/
          page.tsx

        studies/
          page.tsx

        portfolio/
          page.tsx

        services/
          page.tsx

        faq/
          page.tsx

        contact/
          page.tsx

        blog/
          page.tsx
          [slug]/
            page.tsx

        admin/
          layout.tsx
          blog/
            new/
              page.tsx
            [id]/
              edit/
                page.tsx

        api/
          contact/
            route.ts
          upload/
            route.ts

      components/
        layout/
          Header.tsx
          Footer.tsx
          MainLayout.tsx

        home/
          HomeEntry.tsx
          HomeDesktop.tsx
          HomeMobile.tsx
          LandingMobile.tsx
          HomeHero.tsx
          HomeHowICanHelp.tsx
          HomeQuickLinks.tsx
          HomeAboutHighlight.tsx
          HomeNewsletterBanner.tsx

        blog/
          BlogCard.tsx
          BlogList.tsx

        form/
          TextInput.tsx
          Textarea.tsx
          FileUpload.tsx

      styles/
        globals.scss
        tokens.scss
        components/
          _buttons.scss
          _layout.scss
          _forms.scss
          _home.scss

      lib/
        email/
          sendContactEmail.ts
        cloudinary/
          cloudinaryServer.ts
        blog/
          mockPosts.ts

      types/
        blog.ts
        contact.ts

------------------------------------------------------------------------

# Development Principles

### Very phased development

Each step produces one clean commit, in English.

### Teaching-oriented

Architecture is designed for progressive learning.

### Clear separation of concerns

Feature-based structure for components, routing and API.

### No local media

All images go through Cloudinary uploads.

### Future-proof

Inactive areas (Services, FAQ) planned for later activation.

------------------------------------------------------------------------

# Scripts

npm install\
npm run dev\
npm run build\
npm start

------------------------------------------------------------------------

# Cloudinary Setup

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

------------------------------------------------------------------------

# Blog Structure

Phase One uses mockPosts.ts\
Phase Two uses Prisma + PostgreSQL.

------------------------------------------------------------------------

# Contact Form

Located at:\
`src/app/api/contact/route.ts`

------------------------------------------------------------------------

# Future Work

-   Final HomePage layout\
-   Studies and Portfolio content\
-   Multilingual support\
-   Appointment system\
-   Admin dashboard\
-   Activate Services and FAQ\
-   Advanced SEO
