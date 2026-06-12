# Session Scratchpad

## Last Session (2026-06-12)

### What Was Done
- Built Win95 boot sequence: BIOS POST screen (~2s) → splash with cycling gradient bar (~2.5s) → desktop
- New files: `js/boot.js` (self-contained IIFE), `css/boot.css`; static `#boot-screen` overlay in `index.html`
- Plays once per session (sessionStorage), skippable (click/key/touch), skipped under prefers-reduced-motion
- Inline `<head>` script adds `no-boot` class on repeat loads — prevents black flash
- Verified with headless Chrome screenshots (recipe added to CLAUDE.md)
- Rebased onto remote main (6 commits arrived mid-session: resume PDF/window updates, about-section PRs #3–#6), pushed, Pages deploy confirmed success, live site verified

- Hid DOOM on mobile: new `hideOnMobile` window flag (config.js) + filters in mobile-nav.js (tabs + scroll modes)

### Archived
Archived previous plan to `changelog/2026-06-12-boot-sequence.md` (includes DOOM-mobile addendum)

### Key Decisions
- Boot is fully orthogonal to window system — no edits to config.js/app.js/managers
- CSS nth-child animation-delays for BIOS line stagger, not JS typing loop
- Once per session (not every load, not once ever) — delight vs annoyance balance

### Open Items
- `images/icons/n64.png` untracked — N64 emulator window planned? Needs config entry + emulator core + homebrew ROM
- README.md test-server note uncommitted
- Sound system still stubbed: toggle UI works, `sounds/startup.mp3` / `sounds/reveal.mp3` missing
- Remote branches `claude/resume-button-profile-window-t8ufde`, `claude/update-peripulse-link-aZ47P` — no open PRs, possibly stale
- Future Win95 flavor candidates: screensaver (idle), BSOD easter egg
