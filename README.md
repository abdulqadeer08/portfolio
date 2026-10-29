# Portfolio

A luxury personal portfolio built with **Next.js 16**, **Tailwind CSS v4**, **Motion** and **Lenis**.
Iridescent "Aurora" design (with emerald, ember and gold presets) and a matching light theme, a cinematic preloader, smooth scrolling,
a custom cursor, scroll-driven animations, case-study pages and a working contact form.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Make it yours: edit one file

**All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** Change it and every section updates.

| What | Where in `portfolio.ts` |
| --- | --- |
| Name, role, email, phone, location, time zone, socials | `profile` |
| Colour preset: `"aurora"`, `"emerald"`, `"ember"` or `"gold"` | `site.accent` |
| Domain, SEO title and description | `site` |
| Hero headline, rotating words and intro | `hero` |
| Section titles and descriptions | `sections` |
| Big numbers under the hero | `stats` |
| Scrolling ribbon words | `marquee` |
| About statement, bio, facts | `about` |
| Services | `services` |
| Projects and case studies | `projects` |
| Jobs and education | `experience`, `education` |
| Skills, concepts, "currently building" | `skillGroups`, `concepts`, `currentlyBuilding` |
| Process steps | `workProcess` |
| Client names, testimonials, leadership & awards | `clients`, `testimonials`, `awards` (empty lists hide their section) |
| Contact form options | `contact` |

### Your photo

Put your portrait in `public/images/` (e.g. `public/images/portrait.jpg`) and set
`profile.avatar = "/images/portrait.jpg"`. It replaces the monogram in the About section and the hero capsule.
A portrait around 1200 × 1500 px works best.

### Project screenshots

Each project shows generated mock-up artwork in its own `palette` until you add a real image.
To use a screenshot, put it in `public/images/projects/` and set `image: "/images/projects/name.jpg"` on the project.
The `cover` and `gallery` fields pick the mock-up style (`dashboard`, `commerce`, `editorial`, `mobile`, `brand`, `landing`).

### Résumé

Your résumé lives at `public/Abdul_Qadeer_Resume.pdf`. To update it, replace that file (or change `profile.resumeUrl`).

### Fonts

Headings use **Plus Jakarta Sans**, body text uses **Inter**, small labels use **Geist Mono** (all loaded with `next/font` in `src/app/layout.tsx`). To change the heading font everywhere, change `--font-display` in `src/app/globals.css`.

## Contact form emails

The form works out of the box. Without configuration, messages are validated and printed to the server log.
To receive them by email, create a free [Resend](https://resend.com) account, copy `.env.example` to `.env.local`
and fill in:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio <hello@your-domain.com>   # optional, needs a verified domain
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Add the environment variables above in the
project settings, and set `site.url` in `portfolio.ts` to your final domain (used for SEO, the sitemap and social cards).

## What's inside

- **Home**: preloader → hero → marquee → about → services → featured work (stacking cards) → experience timeline →
  toolkit → process → testimonials → awards → contact → footer
- **`/work`**: filterable project archive
- **`/work/[slug]`**: case study pages, generated from `projects`
- Interactive 3D iridescent sculpture in the hero (React Three Fiber), tinted by the colour preset,
  paused when off-screen
- Rotating headline words (`hero.titleAccents`), crossing marquee ribbons, cursor-following project previews
  over Services (`services[].preview`), 3D tilt on project cards, animated light beams on key cards,
  page-transition curtain and a footer that is revealed from underneath the page
- Light/dark theme with a circular reveal, saved per visitor, with no flash on load
- Auto-generated favicon, Apple icon and Open Graph image from your initials and name
- `sitemap.xml`, `robots.txt` and per-page metadata
- Respects `prefers-reduced-motion`; the custom cursor only appears on mouse devices

## Structure

```
src/
  app/                 routes, metadata, contact API
  components/
    layout/            navbar, footer, preloader, smooth scroll
    sections/          one file per home-page section
    ui/                buttons, reveal animations, project covers, cursor…
    work/              archive grid, parallax cover
  data/portfolio.ts    ← all content
  lib/                 hooks and helpers
```
