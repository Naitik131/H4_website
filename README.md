# Hostel 4 Website

This is the Hostel 4 ("The Madhouse") website that I designed and developed for IIT Bombay. I built it as a modern, motion-rich portal that brings together hostel identity, resident utilities, council information, notices, and gallery storytelling in one frontend experience.

## About The Project

I wanted this website to feel like more than a basic hostel info page. My goal was to create something that captured the personality of Hostel 4 while still being genuinely useful for residents. The result is a React + Vite single-page application with animated transitions, theme support, interactive tools, and data-driven content across multiple sections.

## What I Built

- A cinematic home page with an opening sequence, live notice ticker, quick navigation, and visual Madhouse-themed sections
- An about experience focused on Hostel 4 history, ethos, reconstruction, and legacy
- A gallery page with multiple viewing modes powered by shared gallery data
- A notice board with circular cards and full-detail modal views
- A council page with interactive member profiles and emergency contact access
- A utilities suite for maintenance support, LAN and Wi-Fi guides, mess browsing, and equipment booking
- A resident hub with a facility and amenities explorer
- Light and dark theme support with `localStorage` persistence
- Mobile-friendly navigation, a command palette, and toast-based feedback interactions

## Routes

- `/#/` - Home
- `/#/about` - Hostel history and ethos
- `/#/gallery` - Gallery
- `/#/notices` - Notice board
- `/#/council` - Council and emergency contacts
- `/#/utilities` - Resident utilities
- `/#/hub` - Amenities hub

## Tech Stack I Used

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

## Running It Locally

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal. Since the app uses `HashRouter`, routes appear in the format `/#/about`.

## Available Scripts

```bash
npm run dev      # start local development server
npm run build    # create the production build in dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Content And Customization

- Most editable site content lives in `src/data/`
- Page-level layouts live in `src/pages/`
- Reusable UI and interactions live in `src/components/`
- Theme behavior is handled through `src/context/ThemeContext.jsx`
- Several images currently use external URLs, so they can be swapped for local assets if needed

## Deployment Notes

- I used `HashRouter`, which makes the site easy to deploy on static hosting without server-side route rewrites
- `vite.config.js` uses `base: './'`, which helps when serving the build from a subdirectory
- The production build is generated in `dist/`

## Implementation Notes

- Theme preference is stored in `localStorage` under `h4_theme`
- Equipment booking data is currently stored client-side in `localStorage`
- Some interactions rely on browser APIs like `navigator.clipboard` and `window.open`
- The project currently includes linting, but no automated test suite

## Updating Content

Most of the website content is stored in the `src/data/` folder, so future updates usually do not require changing the UI code.

- Update council names, roles, phone numbers, emails, and room details in `src/data/councilData.js`
- Update weekly mess menu items, timings, specials, and rules in `src/data/messMenuData.js`
- Update notice board announcements in `src/data/noticesData.js`
- Update gallery images, titles, and descriptions in `src/data/galleryData.js`
- Update amenities and facility details in `src/data/amenitiesData.js`
- Update LAN guides and hostel rules in `src/data/guidesData.js`
- Update equipment and booking-related entries in `src/data/equipmentData.js`





## Author

Built by **Naitik Agarwal** for Hostel 4, IIT Bombay.

If you're viewing this repository as part of my work, this project reflects my frontend development, UI thinking, component structuring, and interaction design for a real campus-focused website.
