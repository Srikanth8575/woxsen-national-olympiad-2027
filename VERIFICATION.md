# Verification

Completed 16 September 2026.

- `npm run build`: passed, including TypeScript and static page generation.
- `npm run lint`: passed.
- Content comparison: all 5 speaker profiles, 6 exact testimonial quotations, 14 sponsor names and 4 contact records match the supplied local project. Image extensions changed where PNGs were optimized to WebP.
- All 39 referenced local image paths exist. The supplied registration URL is preserved.
- Production preview serves the finished page, with one H1, all 10 main sections and the contact footer.
- Desktop browser checks: hero/countdown, 2025 → 2026 → 2027 winner selection, three expandable rounds, speaker browsing, testimonial navigation and sponsor pause control.
- Revision checks: all four reward selectors switch the featured product; scroll movement changes the prize text's masked gradient and background contour transform; cursor position updates the card's border highlight and lift.
- Compact speaker portraits use full-frame cropping. Student testimonials use large rectangular portraits, and navigation updates the matching name, photo and exact quotation.
- Decorative section, speaker and testimonial counts are absent. Meaningful round numbers, years and statistics remain.
- Revised prize, portrait and registration layouts were visually reviewed on desktop and at 390 × 844 and 320 × 740. No page-wide horizontal overflow was found.
- Direct section navigation lands below the header after reserving the desktop winner story's scroll height before hydration. Browser error logs were empty during the revision checks.
- Mobile checks at 390 × 844 and 320 × 740: no page-wide horizontal overflow; menu and Escape handling; winner gallery and future champion; round details; Cool Speakers and Happy People photographs.
- Fixed a browser animation offset error and stale winner opacity after crossing the desktop/mobile breakpoint.
- Reduced-motion behavior is implemented in the motion provider, responsive winner layout and CSS; an operating-system preference toggle was not exercised during this review.
- Public image assets reduced from about 35.5 MB to 2.2 MB. This is an asset-size comparison, not a Lighthouse performance score.

No deployment to an external hosting service was performed. The project is prepared for the standard Vercel Next.js deployment flow.

## Registration dialog revision

- Build, TypeScript and lint passed after the registration changes.
- All eight supplied fields, all five class options and both exact plan prices/descriptions are present.
- Empty SUBMIT stays on the form and focuses the first required field. Invalid email, short phone numbers and a missing plan are rejected by native validation.
- Valid Premium and Standard submissions were tested using invented demo details. Both show the personalized graduation mascot celebration.
- Replay, Escape, close and return-to-site controls were exercised. Focus returns to the opening button; reopening clears fields and plan selection and resets form scrolling.
- Form and success layouts checked at desktop, 390 × 844 and 320 × 740; no dialog horizontal overflow. The form scrolls independently while the underlying page stays still, and the close control remains visible.
- This is a demo with no backend submission or payment. Both the form and success screen state that entries are not saved. No real participant details were used for verification.
