# Zaineb Messaoudi Portfolio

Premium React + Vite portfolio built from Zaineb Messaoudi's CV, with a strong focus on accessibility, AI engineering, and full-stack software delivery.

## Stack

- React with JSX
- Vite
- React Router
- Framer Motion
- Lucide React

## Features

- Responsive one-page portfolio with section-aware navigation
- Accessible structure with semantic landmarks, skip link, keyboard-friendly navigation, strong focus states, and reduced-motion support
- Reusable section, card, modal, and layout components
- Detailed experience, education, skills, and project storytelling sourced from the resume
- Project detail modal for richer engineering context
- Contact section with direct links and a prefilled email form

## Project Structure

```text
src/
  components/
    layout/
    sections/
    ui/
  data/
  hooks/
  pages/
  styles/
  utils/
public/
  assets/
```

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production Build

```bash
npm run build
npm run preview
```

## SEO and deployment checks

The production bundle includes `robots.txt`, `sitemap.xml`, canonical metadata,
Open Graph/Twitter metadata, Person JSON-LD, and a web manifest. Set
`VITE_SITE_URL` to the deployed HTTPS origin when using a custom domain; the
default is the repository's GitHub Pages URL.

After starting a production preview, these checks can be run locally:

```bash
npm run check:indexability
npm run check:links
```

The SEO workflow also runs these checks on pushes and pull requests to prevent
accidental `noindex` responses and broken same-origin links from reaching
production.

Critical portfolio images are served as optimized WebP assets, the loading
logo is preloaded, Google Fonts use non-blocking loading hints, and decorative
animation nodes are capped to keep the initial page responsive.

## Deploy to Vercel

This portfolio is configured for Vercel with SPA rewrites in `vercel.json`.

1. Make sure your `.env` file contains:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

2. Deploy with Vercel:

```bash
npx vercel
```

3. For a production deployment:

```bash
npx vercel --prod
```

## Contact Form Setup

The contact form is configured to use Formspree through the `VITE_FORMSPREE_ENDPOINT`
environment variable.

1. Create a form in the Formspree dashboard.
2. Copy your form endpoint, which looks like `https://formspree.io/f/your-form-id`.
3. Create a `.env` file in the project root and add:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

4. Restart the dev server after adding the environment variable.

## Notes

- Portfolio content is centralized in `src/data/portfolioData.js` for easy updates.
- Visual assets are served from `public/assets`.
- The contact form submits with `fetch`, so it works without a custom backend once the Formspree endpoint is configured.
