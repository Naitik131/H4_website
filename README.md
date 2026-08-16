# Hostel 4 Website

A motion-rich React + Vite web portal for Hostel 4 ("The Madhouse"), IIT Bombay. The site combines hostel storytelling, resident utilities, council information, notices, and gallery experiences into a single static-friendly frontend.

## Overview

This project is built as a multi-page single-page application using `HashRouter`, making it easy to host on static infrastructure or under a subdirectory. It includes animated transitions, theme persistence, interactive resident tools, and data-driven content for notices, amenities, bookings, and galleries.

## Main Features

- Animated home page with opening sequence, notice ticker, quick links, and visual showcase sections
- About page covering Hostel 4 history, ethos, reconstruction story, and curated gallery content
- Dedicated gallery page with dome and tile layouts sourced from shared gallery data
- Notice board with circular cards and full-notice modal views
- Council directory with interactive member profiles and emergency helpline access
- Utilities suite for maintenance links, LAN and Wi-Fi guides, mess schedule browsing, and equipment booking
- Resident hub with an amenities and facilities explorer
- Light and dark theme toggle with `localStorage` persistence
- Mobile navigation drawer, command palette, and toast notifications

## Routes

- `/#/` - Home
- `/#/about` - Hostel history and ethos
- `/#/gallery` - Gallery experiences
- `/#/notices` - Notice board
- `/#/council` - Council and emergency contacts
- `/#/utilities` - Resident utilities
- `/#/hub` - Amenities hub

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- Framer Motion
- GSAP
- Swiper
- Lenis
- Lucide React
- Custom CSS with CSS variables and responsive layouts

## Project Structure

```text
src/
  components/
    about/          About page sections
    council/        Council UI
    hero/           Hero and notice ticker
    layout/         Navbar, footer, emergency modal
    madhouse/       Custom interactive homepage sections
    reactbits/      Reusable animated visual components
    resident-hub/   Amenities explorer
    ui/             Toast and shared UI
    utilities/      Mess, LAN, complaints, and booking tools
  context/
    ThemeContext.jsx
  data/
    amenitiesData.js
    councilData.js
    equipmentData.js
    galleryData.js
    guidesData.js
    messMenuData.js
    noticesData.js
  pages/
    HomePage.jsx
    AboutPage.jsx
    GalleryPage.jsx
    NoticeBoardPage.jsx
    CouncilPage.jsx
    UtilitiesPage.jsx
    ResidentHubPage.jsx
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal. Because the app uses `HashRouter`, navigation will appear under routes like `/#/about`.

## Available Scripts

```bash
npm run dev      # start local development server
npm run build    # create production build in dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Content Updates

- Update structured content in `src/data/` for notices, council members, gallery items, amenities, guides, equipment, and menus
- Update page-specific UI in `src/pages/`
- Update reusable sections and interactions in `src/components/`
- Replace external image URLs if you want fully local or offline-ready assets
- Review external form and sheet links in the utilities components before production use

## Deployment Notes

- The app uses `HashRouter`, so it works well on static hosting where server-side route rewriting is unavailable
- `vite.config.js` sets `base: './'`, which helps when serving the build from a subdirectory
- Production output is generated in `dist/`
- For institute or shared hosting, upload the contents of `dist/`

## Implementation Notes

- Theme preference is stored in `localStorage` under `h4_theme`
- Equipment booking data is stored client-side in `localStorage` and is currently frontend-only
- Several sections use browser APIs such as `navigator.clipboard` and `window.open`
- The project currently has linting configured, but no automated test suite

## Credits

Designed and developed for Hostel 4, IIT Bombay. Current in-app credits attribute the site to Naitik Agarwal in collaboration with the Hostel 4 Council.
