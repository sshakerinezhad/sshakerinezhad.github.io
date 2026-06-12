# Win95 Boot Sequence

## Context

User wants "something cool" for their Win95-aesthetic portfolio. Chosen: a fake Windows 95 boot sequence — the strongest first impression for every visitor, pure vanilla JS/CSS, zero assets/licensing. Site already has DOOM and Konami-code eggs; boot screen fills the missing "startup" flavor and doubles as a loading mask on slow connections.

**Decisions (user-confirmed):**
- Plays **once per session** (`sessionStorage` flag); refresh in same tab skips it
- **Full boot**, total **4–5s**: BIOS/POST screen → Win95-style splash → desktop
- Skippable instantly: click / keypress / touch
- Mobile: same overlay (layout-independent), responsive font sizes, tap-to-skip

## Design

### Sequence (~4.5s, skippable)

1. **BIOS phase (~2s)** — black screen, monospace text, lines appear staggered (CSS animation-delay, no JS typing loop):
   ```
   Shayan BIOS v4.0, An Energy Star Ally
   Copyright (C) 1995 Merlyn Labs

   Memory Test : 65536K OK

   Detecting IDE drives ... OK
   Detecting robots ....... OK
   Loading SHAYAN95 ...
   ```
2. **Splash phase (~2.5s)** — Win95 setup-style screen: "Shayan**95**" wordmark (styled text, no image), tagline, and the classic animated cycling gradient bar at the bottom (CSS keyframes on `background-position`).
3. **Exit** — 300ms opacity fade, remove node from DOM, set `sessionStorage.booted = '1'`.

### Behavior rules

- **Skip-on-repeat without flash:** overlay `<div id="boot-screen">` is static in `index.html` (covers viewport immediately — masks load jank). A tiny inline `<script>` in `<head>` checks `sessionStorage.booted` and adds `no-boot` class to `<html>`; CSS `​.no-boot #boot-screen { display: none }`. No flash in either direction.
- **Skip input:** one-time `click` / `keydown` / `touchstart` listener on overlay → immediate fade + remove.
- **Reduced motion:** `prefers-reduced-motion: reduce` → treat as already booted (skip entirely).
- **`sessionStorage` access wrapped in try/catch** (throws in some private-browsing contexts) — failure means boot plays every load, acceptable.

## Files

| File | Change |
|---|---|
| `js/boot.js` (new) | Self-contained IIFE matching existing module style (`app.js` pattern). Phase timing, skip handling, sessionStorage flag, node removal. ~60 lines. No dependency on WindowManager — `app.js` untouched. |
| `css/boot.css` (new) | Overlay (fixed, inset 0, z-index above WinBox/taskbar), BIOS text styling + staggered line reveal, splash layout, gradient-bar keyframes, `clamp()` font sizes for mobile, `no-boot` rule. |
| `index.html` | Add `boot.css` link in head; inline 3-line sessionStorage check script in head; static `#boot-screen` markup (BIOS pre + splash div) as first child of `<body>`; `<script src="js/boot.js">` alongside existing scripts. |

No edits to `config.js`, `app.js`, or any manager files — boot is fully orthogonal to the window system.

## Addendum: DOOM hidden on mobile (same day)

Added `hideOnMobile: true` window flag in `js/config.js` (set on `doom`); `js/mobile-nav.js` filters it in both tabs-mode nav buttons and scroll-mode cards. Mobile hides taskbar/start-menu/desktop-icons entirely, so mobile-nav was the only route — no other surface to patch. Verified via headless Chrome DOM dump: nav renders about/projects/plugs/merlyn/books/resume, no doom.

Note: headless Chrome clamps window width to ~482px minimum — cannot screenshot-test the ≤480px mobile breakpoint; DOM-level checks work since mobile-nav renders at init regardless of width.

## Verification

1. `python -m http.server`, open fresh tab → boot plays ~4.5s, lands on desktop.
2. Refresh → no boot (sessionStorage), no black flash.
3. New tab → boot plays again (per-tab session).
4. Click/keypress mid-boot → instant skip to desktop.
5. DevTools mobile emulation (both mobile modes: narrow tabs mode + wider scroll mode) → text legible, tap skips.
6. DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → boot skipped.
7. Check taskbar/start menu/windows all interactive after boot removal.
