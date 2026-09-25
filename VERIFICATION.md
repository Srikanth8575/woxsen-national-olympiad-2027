# Verification

Initial verification completed 16 September 2026; latest interaction revision checked 25 September 2026.

- `npm run build`: passed, including TypeScript and static page generation.
- `npm run lint`: passed.
- Content comparison: all 5 speaker profiles, 6 exact testimonial quotations, 14 sponsor names and 4 contact records match the supplied local project. Image extensions changed where PNGs were optimized to WebP.
- All 39 referenced local image paths exist. The supplied registration URL is preserved.
- Production preview serves the finished page, with one H1, all 10 main sections and the contact footer.
- Desktop browser checks: hero/countdown, 2025 → 2026 → 2027 winner selection, three expandable rounds, speaker browsing, testimonial navigation and sponsor pause control.
- Earlier revision checks: reward selectors switched the featured product; scroll movement changed the prize text's masked gradient and background contour transform; cursor position updated the card's border highlight and lift. See the September 24 revision below for the replacement floating gadget layout.
- Earlier portrait checks confirmed that navigation updates the matching name, photo and exact quotation. The September 24 revision preserves full speaker images and reduces mobile testimonial sizes.
- Decorative section, speaker and testimonial counts are absent. Meaningful round numbers, years and statistics remain.
- Revised prize, portrait and registration layouts were visually reviewed on desktop and at 390 × 844 and 320 × 740. No page-wide horizontal overflow was found.
- Direct section navigation lands below the header after reserving the desktop winner story's scroll height before hydration. Browser error logs were empty during the revision checks.
- Mobile checks at 390 × 844 and 320 × 740: no page-wide horizontal overflow; menu and Escape handling; winner gallery and future champion; round details; Cool Speakers and Happy People photographs.
- Fixed a browser animation offset error and stale winner opacity after crossing the desktop/mobile breakpoint.
- Reduced-motion behavior is implemented in the motion provider, responsive winner layout and CSS; an operating-system preference toggle was not exercised during this review.
- Public image assets reduced from about 35.5 MB to 2.2 MB. This is an asset-size comparison, not a Lighthouse performance score.

No deployment to an external hosting service was performed. The project is prepared for the standard Vercel Next.js deployment flow.

## September 24 layout revision

- Source-data comparison still passes for all five speakers, six testimonials, fourteen sponsors and four contacts; all 39 local asset references exist.
- The footer component is byte-for-byte unchanged. The ₹1 CRORE markup and masked text styling are preserved.
- All four gadgets appear together with continuous floating motion. Tapping selects a gadget and its computed lift scales to 1.12; keyboard focus also highlights it.
- Background contours visibly drift while stationary and retain their scroll response. Reduced-motion CSS disables the added motion.
- Speaker images retain their original 788:1000 proportions with contain sizing and no hover crop. Desktop and mobile frames show the entire supplied image.
- Horizontal pointer swipes change testimonials in both directions. Nearby arrow controls select the matching portrait and quotation. Mobile portraits are 260px squares, with navigation immediately below.
- Sponsor cards fit four across at 390px and 320px viewports. Dragging changes the rail position and briefly suspends rotation. It now resumes automatically after interaction. A floating-point scroll accumulator prevents slow animation from stalling on integer scroll positions.
- Card text has 18–28px side padding on normal layouts, with narrower-screen adaptations. Tablet testimonial navigation fits its column without overflowing.
- Browser layouts checked at desktop, 768px, 390px and 320px widths. No page-wide horizontal overflow was found. Browser runtime error logs were empty; development mode emitted an expected image loading advisory when opening directly at the speaker section.
- The header now uses the supplied Woxsen University SVG without modifying its artwork. Desktop and 320px mobile previews confirm it loads with clear proportions and no header overflow. The footer retains the Olympiad logo; the footer component is unchanged. Build and lint passed after the logo replacement.

## Registration dialog revision

- Build, TypeScript and lint passed after the registration changes.
- All eight supplied fields, all five class options and both exact plan prices/descriptions are present.
- Empty SUBMIT stays on the form and focuses the first required field. Invalid email, short phone numbers and a missing plan are rejected by native validation.
- Valid Premium and Standard submissions were tested using invented demo details. Both show the personalized graduation mascot celebration.
- Replay, Escape, close and return-to-site controls were exercised. Focus returns to the opening button; reopening clears fields and plan selection and resets form scrolling.
- Form and success layouts checked at desktop, 390 × 844 and 320 × 740; no dialog horizontal overflow. The form scrolls independently while the underlying page stays still, and the close control remains visible.
- This is a demo with no backend submission or payment. Both the form and success screen state that entries are not saved. No real participant details were used for verification.

## Prize details and automatic sponsor restart

- A compact “Know more” button sits below all four gadgets. Its dialog presents the three exact cash-and-gadget awards, the ₹1 crore inclusive prize-pool note, and all three tuition-fee scholarship tiers from the user's images.
- The second tab compares Standard ₹299 and Premium ₹499 with all supplied benefits. Both include the Top 250 restriction on residential experience. Premium retains the “Most recommended” label.
- Desktop, 390px and 320px layouts were visually checked. The dialog scrolls independently, has no horizontal overflow, and keeps its tabs and close control visible while scrolling.
- Arrow-key tab switching, Escape, close, reopening and focus restoration to “Know more” were exercised.
- Sponsor pause/resume buttons are absent. Dragging works and rotation restarts without further input; previous/next controls remain available. The animation waits 2.2 seconds after the last interaction or inertial scroll event. Reduced-motion preferences still disable autoplay.
- Build, lint and the existing source-content comparison passed for this revision.

## Round rules, schedule and plan selection

- The original round names and all expanded content have been restored per the user's correction. The supplied rules supplement this content in dedicated windows, preserving their separate wording.
- Each round has a “Know more” control at the bottom of its expanded panel, hidden when collapsed. The controls retain category-specific styling and dedicated native dialogs. All supplied rule details, including device restrictions and automatic disconnection after three warnings, are present.
- Added all six quick-schedule entries, the exact parent/mentor note, and on-campus registration opening/closing times and deadline notice.
- Standard and Premium choices each open only the registration dialog, with the corresponding radio option preselected. Both paths were exercised. Closing restores page scrolling and focus to “Know more.” An ordinary Register button still opens with neither plan selected.
- Rule and information windows were visually reviewed on desktop and at 320px mobile width. The schedule and on-campus details have no horizontal overflow; close controls remain visible while scrolling.
- Student photo drag/swipe was exercised in both directions at 390px width, confirming the matching image and quote selection. Browser error and warning logs were empty during these interaction checks.
- Sponsor speed increased from 26 to 36px per second; automatic restart and reduced-motion behavior remain in place.
- Clicking directly on the ₹299 price also selects Standard, confirming the whole plan card is interactive. Three-tab keyboard wrapping was checked. Build and lint passed for that revision.
- Restoration check: original titles, school/college phases, eligibility, syllabus, round descriptions, focus lists and workshop links are back. Each “Know more” button is inside its expanded panel. All three expand/open-dialog/close/collapse sequences were exercised, and all three buttons are hidden when collapsed. Browser errors were empty. Build and lint passed after restoration.

## September 25 interaction refinements

- Rounds now share one expanded selection. Desktop checks confirmed Round 1 → Round 2 → Round 3 closes the previous panel and exposes only the corresponding “Know more” button. Clicking the selected round again closes all panels. The mobile Round 1 → Round 2 transition and Round 2 rules dialog also passed; original round content remains intact.
- Desktop and mobile navigation expose the current section with `aria-current="location"` and a short red glowing underline. Direct section navigation selected The challenge and Prizes; scrolling back from Prizes changed the highlight to About. The mobile menu correctly indicated The challenge, and opening the menu did not change the reading position used by the indicator.
- Sponsor autoplay increased from 36 to 48px per second. Measured movement across two complete rail loops matched the new speed. Previous/next, interaction cooldown and reduced-motion handling are preserved.
- The gadget instruction sentence is absent; all four floating gadgets and the prize heading remain.
- Desktop 1440 × 900 and mobile 390 × 844 previews had no page-wide horizontal overflow. Browser error logs were empty. Production build, TypeScript and lint passed.
