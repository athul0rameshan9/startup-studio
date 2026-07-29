# Startup Studio

The Startup Studio marketing site, rebuilt as a Next.js app with an admin panel.
Every word, image, link and colour on the public page is editable at `/admin` —
nothing is hard-coded in a component.

- **Public site** — `/`, a faithful port of the reference design
- **Admin** — `/admin`, password-protected content editor + enquiry inbox
- **Stack** — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zod

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run dev                    # http://localhost:3000
```

Sign in at [`/login`](http://localhost:3000/login) with the `ADMIN_EMAIL` and
`ADMIN_PASSWORD` from `.env.local`.

### Environment variables

| Variable               | Required | What it does                                               |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `ADMIN_EMAIL`          | yes      | The email you sign in with. Defaults to `admin` if unset.   |
| `ADMIN_PASSWORD`       | yes      | The password you sign in with.                              |
| `AUTH_SECRET`          | yes      | Signs the session cookie. 32+ random characters.            |
| `NEXT_PUBLIC_SITE_URL` | no       | Absolute site URL, used by `sitemap.xml` and `robots.txt`.  |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Scripts

| Command            | What it does                 |
| ------------------ | ---------------------------- |
| `npm run dev`      | Dev server with Turbopack    |
| `npm run build`    | Production build             |
| `npm start`        | Serve the production build   |
| `npm run lint`     | ESLint                       |
| `npx tsc --noEmit` | Type-check without emitting  |

---

## Project structure

```
data/                        Runtime state, written by the admin (git-ignored)
  content.json               Everything on the public page
  leads.json                 Booking-form submissions
public/
  images/                    Design assets shipped with the project
  uploads/                   Images uploaded through the admin
src/
  app/
    (site)/                  Public site — layout (metadata) + page
    admin/                   Admin panel, one route per content section
      layout.tsx             Session guard + sidebar shell
      page.tsx               Dashboard
      leads/                 Enquiry inbox
      hero|services|…/       One editor page per section
    api/upload/route.ts      Admin-only image upload
    login/page.tsx           Sign-in
    globals.css              Design tokens, keyframes, utilities
    layout.tsx               Root layout: fonts, base metadata
    not-found.tsx            404
    robots.ts, sitemap.ts    Generated metadata routes
  components/
    site/                    One component per section of the public page
    admin/                   Admin shell, form kit, section editors
    ui/Media.tsx             Image wrapper (next/image vs plain <img>)
  lib/
    admin/nav.ts             Admin navigation model
    auth/                    Session tokens, cookies, rate limiting, actions
    content/                 Schema, seed content, repository, server actions
    leads/                   Schema, repository, server actions
    storage/json-store.ts    Atomic JSON file persistence
    theme.ts                 Palettes, rhythms, CSS-variable resolution
    utils.ts                 Small shared helpers
  proxy.ts                   Route guard for /admin (Next 16's middleware)
```

### How content flows

1. `lib/content/defaults.ts` holds the seed content — a verbatim transcription
   of the reference design. A fresh install renders straight from it.
2. Saving in the admin validates that section against its Zod schema, writes
   `data/content.json`, then calls `revalidatePath("/", "layout")` so the
   prerendered public page picks the change up immediately.
3. `getContent()` merges the stored file over the defaults section by section,
   so adding a new section later never breaks an older `content.json`.

Swapping the JSON files for a database means rewriting
`lib/content/repository.ts` and `lib/leads/repository.ts` — nothing else touches
the disk.

### Design tokens

The reference design's four "feel" controls live under **Admin → Appearance**
and resolve to CSS custom properties set on the site wrapper:

| Setting     | Variables                                      |
| ----------- | ---------------------------------------------- |
| Palette     | `--om-lime`, `--om-lime-hi`, `--om-green`       |
| Rhythm      | `--om-pad`, `--om-pad-sm`, `--om-hero-pad`      |
| Hero layout | Centered / Editorial alignment + decor offsets  |
| Tech stack  | Marquee lanes vs. static grid, marquee speed    |

Fixed colours (ink, mist, body text, rules) live in the `@theme` block in
`src/app/globals.css`.

---

## Admin panel

| Page               | What it edits                                                    |
| ------------------ | ---------------------------------------------------------------- |
| Dashboard          | At-a-glance counts, latest enquiries, current appearance          |
| Enquiries          | Booking-form submissions: status, delete, CSV export              |
| Hero               | Eyebrow, headline, paragraph, both buttons, the stat strip        |
| Trusted by         | Logo strip on/off, labels, per-logo image and width               |
| Problems           | Heading block and the three cards                                 |
| Services           | Three service cards, the dashed add-on card, the dark CTA tile    |
| Tech stack         | Marquee lanes, per-tool logo/monogram and tint                    |
| Process            | The four ruled steps                                              |
| Featured work      | Case-study blocks, link and photo                                 |
| Why us             | The ruled reason list                                             |
| Team               | Quote and the people                                              |
| FAQ                | The accordion                                                     |
| Booking form       | Section copy, every field label, dropdown options, thank-you copy |
| Brand & navigation | Brand name, SEO metadata, header/footer links and buttons         |
| Appearance         | Palette, rhythm, hero layout, tech-stack display, marquee speed   |

Each editor has **Save changes** (⌘S / Ctrl-S works too), a **Reset to default**
that restores that section's seed content, and a warning before you navigate
away with unsaved edits.

### Security notes

- The session is a stateless HMAC-signed cookie (`httpOnly`, `sameSite=lax`,
  `secure` in production, 7-day expiry).
- `src/proxy.ts` keeps signed-out visitors out of `/admin`, and **every** admin
  server action re-checks the session — server actions are reachable by direct
  POST, so a route guard alone is not enough.
- Sign-in is rate limited (8 attempts / 15 minutes per IP); the public booking
  form is limited to 5 submissions / 10 minutes per IP and carries a honeypot
  field.
- Uploads are admin-only, capped at 5 MB, and limited to PNG/JPEG/WebP/GIF/SVG.

---

## Deploying

The app runs anywhere Node 20.9+ runs:

```bash
npm run build
npm start
```

Two things need a **writable, persistent filesystem**: `data/` (content and
enquiries) and `public/uploads/` (admin uploads). On a read-only or ephemeral
host — Vercel's serverless functions, for example — mount a volume, or move
those two repositories to a database and point image fields at external URLs.

---

## Notes on fidelity to the reference

The public page reproduces the reference design exactly at desktop widths.
Three deliberate differences:

1. **Responsive behaviour.** The reference was desktop-only (fixed four-column
   grids, no media queries). Layouts here collapse gracefully below `1024px`
   and the header gains a mobile menu; at `1024px` and above the rendering is
   the original.
2. **Service icons.** The reference linked icons stroked in `#C9FF56` onto a
   near-white card, which made them invisible. The same artwork is vendored
   into `public/images/` restroked in `#3FA80B` so it reads. Swap them from
   Admin → Services.
3. **The booking form saves enquiries.** The reference button was a dead
   "Pick a time →". It now stores the enquiry and shows a thank-you message.
   The reference form has no field to reply on, so an optional
   "Email or WhatsApp number" field can be switched on from
   Admin → Booking form; it is off by default to keep the original layout.

Every third-party asset the reference hot-linked (icons, photos) is vendored
into `public/images/` so the site does not depend on someone else's CDN.
Tech-stack brand logos still come from `cdn.simpleicons.org`, matching the
original, and fall back to a lettered badge for anything without a slug.
