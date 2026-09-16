# Woxsen National Olympiad 2027

A complete Next.js, TypeScript and Tailwind project redesigned from the supplied local website, with a cinematic winner story, an interactive prize display, a scroll-responsive matte background, responsive portrait galleries and the missing event photographs.

## Local preview

On Windows, double-click **Start Preview.cmd**. Then open **http://127.0.0.1:3127**. Keep the terminal window open while using the preview.

Or use Node.js 20.9+ (Node.js 22 or 24 recommended):

```sh
npm ci
npm run dev -- --port 3127
```

## Production

```sh
npm run lint
npm run build
npm start -- --port 3128
```

Import this folder as a Next.js project on Vercel. Use the default `npm run build` build command and automatic output settings. There are no required environment variables, remote fonts, API keys or external image services. Registration buttons open the in-page registration preview described below.

The production preview for this handoff is running at **http://127.0.0.1:3128**. The development preview uses port 3127.

## Editing

- `app/page.tsx`: section order.
- `app/globals.css`: responsive layouts, colors and typography.
- `app/refinements.css`: matte surfaces, cursor highlights, reward display and revised portrait/registration layouts.
- `components/site/`: individual sections and interaction components.
- `components/site/ambient.tsx`: scroll-driven background and delegated pointer highlights.
- `components/site/registration.tsx`: shared registration dialog, validation and animated graduation mascot.
- `lib/registration.ts`: class options, registration plans and preview notice.
- `app/registration.css`: responsive registration form and mascot animation.
- `lib/content.ts`: exact speaker, testimonial, sponsor and contact data from the supplied website.
- `lib/constants.ts`: original registration URL (retained for reference) and countdown date.
- `public/`: optimized event images, transparent official logo, prizes and winner artwork.
- `app/fonts/`: locally served DM Sans fonts and their license.

## Content and assets

The latest local project, `C:/Users/kunda/Documents/woxsen-olympiad-2027`, is the baseline for this revision. Its ₹1 crore prize pool, registration URL, four contacts, winner details, speaker biographies and testimonial wording are preserved. The original local project was not modified.

The official transparent logo comes from that project. No replacement logo was generated. The 2025, 2026 and upcoming winner artwork stays directly below the opening hero.

The four additional event photographs come from the earlier supplied ZIP:

| Website asset | Original photograph |
| --- | --- |
| `public/experience/cool-speakers.webp` | `Cool Speakers/_DSC2151.JPG` |
| `public/experience/speaker-stage.webp` | `Cool Speakers/_DSC2153.JPG` |
| `public/experience/happy-people.webp` | `Happy People/_DSC2192.JPG` |
| `public/experience/workshop.webp` | `Happy People/CTD05645.jpg` |

Images are resized and compressed locally. The public asset folder is approximately 2.2 MB, compared with approximately 35.5 MB before optimization. Next.js additionally serves responsive image sizes.

The countdown uses 27 January 2027 at midnight Indian Standard Time, matching the original project's target. Update `EVENT_START` if a specific start time is confirmed.

## Interaction and accessibility

- Desktop winner story follows scrolling; year buttons provide direct navigation.
- Graphite contours and light move with page scrolling. The prize amount has a metallic light sweep masked inside its letterforms.
- Four accessible reward buttons switch the featured gadget with a short transition; orbit outlines and the product move subtly with scrolling.
- Cards, image panels and controls have consistent cursor/focus highlights. Speaker portraits fill compact frames, while student testimonials use large portraits.
- Decorative section and speaker numbers are removed. Event dates, statistics, winner years and round numbers retain their meaning.
- Registration uses a clear two-column invitation on desktop and a stacked layout on phones.
- Phones and reduced-motion layouts use a native horizontal winner gallery.
- All three rounds have keyboard-operable detail panels.
- Speaker cards support native scrolling and previous/next controls.
- Testimonials use manual controls and announce the selected quotation.
- Sponsor rotation can be paused and respects reduced-motion preferences.
- Mobile navigation and registration support Escape. Contact links retain their supplied destinations.
- Fonts are local, offscreen photographs load lazily, and smooth scrolling is limited to desktop devices without a reduced-motion preference.
- Background movement, prize motion and pointer lift are disabled for reduced-motion preferences. Desktop story space is reserved before hydration to keep section deep links aligned.

The included ZIP excludes installed dependencies and generated build files. Run `npm ci` after extracting it on another computer.

## Registration preview

All registration buttons open the same native modal dialog inside the website. The form includes full name, email, class/level (10th, 11th, 12th, UG or PG), India +91 WhatsApp number, the ₹499 Premium and ₹299 Standard plans, school/college, state and city. All fields are required, neither plan is preselected, and email/10-digit phone validation runs before submission.

SUBMIT currently validates the form and shows a personalized “Done. Nailed it.” celebration. A small SVG graduation mascot dances, waves and reveals a checkmark. The dance can be replayed and respects reduced-motion preferences. The dialog contains keyboard focus, returns focus to its opener, preserves the website scroll position and keeps its close button visible when the form scrolls. Reopening starts with an empty form.

This is a UI demo: no registration requests, database writes, email, browser storage or payments occur. The form and success screen explain this. A registration destination and payment flow must be supplied and connected before accepting real entries. The original external registration URL remains in `lib/constants.ts` for reference.
