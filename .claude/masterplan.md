# Windows 95 Portfolio Website - Implementation Plan

## Overview
Personal portfolio for Shayan Shakeri with authentic Windows 95 aesthetic — draggable windows, pixelated icons, taskbar, and Easter eggs.

## Tech Stack Decision: Plain HTML/CSS/JS

**Why not Next.js:**
- This is a presentation site, not a web app
- Zero-config GitHub Pages deployment (just push HTML)
- Direct compatibility with 98.css (pure CSS framework)
- Faster load times, simpler maintenance

**Libraries:**
- **98.css** — Mature CSS framework for Win98 styling (CDN)
- **WinBox.js** — Zero-dependency window management: drag, resize, minimize, maximize (CDN)

---

## Site Structure

```
index.html
├── css/
│   ├── main.css          # Layout, desktop, responsive
│   ├── taskbar.css       # Taskbar styles
│   └── windows.css       # Window content styling
├── js/
│   ├── main.js           # Entry point
│   ├── window-manager.js # Window state/logic
│   ├── taskbar.js        # Taskbar functionality
│   ├── desktop.js        # Desktop icons
│   └── easter-eggs.js    # Hidden features
├── icons/                # Pixel art icons (32x32)
├── images/               # Wallpaper, profile photo
└── sounds/               # Optional: click, startup sounds
```

---

## Windows

| Window | Icon | Default State | Content |
|--------|------|---------------|---------|
| About.exe | user.ico | **Open** | Personality intro, photo, MEng @ UofT, AI/robotics |
| Research & Projects | folder.ico | **Open** | BEHAVIOR-1K, BardSong, Herbalism-tool, Prosthetic, Prompt injection (coming soon) |
| D&D Corner | dragon.ico | Closed | ~10 years DMing, campaign vibes, personality |
| Shameless Plugs | link.ico | Closed | LessWrong post, Merlyn Labs blog, other writing |
| Merlyn Labs | secret.ico | **HIDDEN** | Links to merlyn-labs.com, robotics, VLA work |

*Note: Research & Projects combined for now, may separate later.*

---

## Key Features

### Desktop Experience
- **Taskbar**: Start button, running windows, system tray with clock
- **Desktop icons**: Double-click to open windows
- **Window management**: Drag, resize, minimize, maximize, z-index stacking

### Merlyn Labs Easter Eggs
1. **Konami code**: ↑↑↓↓←→←→BA
2. **Secret word**: Type "merlyn" anywhere
3. **Console hint**: Message for devs who check console

### Mobile Strategy
- **Desktop (769px+)**: Full Win95 experience with dragging
- **Mobile (<480px)**: Windows become stacked cards, no dragging, bottom nav replaces taskbar
- Keep Win95 aesthetic (pixel fonts, beveled edges, colors) on all screen sizes

### Sound Effects
- Included but **muted by default**
- User can enable via a speaker icon in taskbar/system tray
- Sounds: window open/close, button clicks, startup (on enable)

---

## Implementation Phases

### Phase 1: Foundation ✅ COMPLETE
- [x] index.html with 98.css + WinBox.js CDN links
- [x] Desktop container, basic styling
- [x] WindowManager class with state tracking
- [x] Single test window (About.exe) working
- [x] Deploy to GitHub Pages

**Files created:**
- `index.html` — Structure, CDN links, templates
- `css/main.css` — Desktop layout, Win95 colors, WinBox overrides
- `js/config.js` — Centralized window definitions
- `js/window-manager.js` — WindowManager class
- `js/app.js` — Entry point

### Phase 2: Window System ✅ COMPLETE
- [x] All 5 windows with content (About, Research & Projects, Shameless Plugs, Merlyn Labs, D&D Corner)
- [x] D&D Corner is hidden Easter egg (hidden: true flag)
- [x] Window content styling (project items, links, coming-soon)
- [x] Cascading window positions

**Windows:**
| ID | Title | Auto-open | Hidden |
|----|-------|-----------|--------|
| about | About.exe | Yes | No |
| projects | Research & Projects | Yes | No |
| plugs | Shameless Plugs | No | No |
| merlyn | Merlyn Labs | No | No |
| dnd | D&D Corner | No | **Yes** |

### Phase 3: Taskbar & Desktop ✅ COMPLETE
- [x] Taskbar with Start menu, running windows, clock
- [x] Desktop icons with double-click
- [x] Header with name + socials (GitHub, Twitter, LinkedIn, email)

**Files created:**
- `css/taskbar.css` — Taskbar, Start menu, clock styling
- `css/desktop-icons.css` — Desktop icons and header styling
- `js/taskbar.js` — Taskbar class with Start menu and clock
- `js/desktop-icons.js` — DesktopIcons class with double-click handling

**Files modified:**
- `js/window-manager.js` — Added event emitter (on/emit) for taskbar sync
- `js/config.js` — Added `desktopIcons` and `socials` config sections
- `index.html` — Added header, taskbar, desktop icons HTML structure
- `css/main.css` — Adjusted desktop bounds for header/taskbar
- `js/app.js` — Instantiates Taskbar and DesktopIcons

### Phase 3.5: Window Bug Fixes ✅ COMPLETE
- [x] Close button (X) now works — removed incorrect `return true` from `onclose` callback
- [x] Minimize keeps windows above taskbar — added `bottom: 28` constraint
- [x] Maximize keeps title bar below header — added `top: 32` constraint
- [x] Windows can't be dragged outside desktop bounds

**Files modified:**
- `js/window-manager.js` — Fixed `onclose` callback, added `top: 32` and `bottom: 28` WinBox constraints

### Phase 4: Easter Eggs & Polish
- Konami code + secret word triggers
- Merlyn Labs hidden window with "declassified" reveal
- Optional sound effects
- Error dialogs for "coming soon" items

### Phase 5: Mobile & Accessibility
- Responsive breakpoints
- Disable dragging on mobile
- Window dimensions should use `min(400px, 90vw)` or similar for mobile viewports
- Touch targets (taskbar buttons) need larger hit areas on mobile
- Keyboard navigation
- ARIA labels

---

## Verification

1. **Local testing**: Open index.html in browser, test all windows
2. **GitHub Pages**: Push and verify at sshakerinezhad.github.io
3. **Mobile**: Test on phone or DevTools mobile view
4. **Easter eggs**: Test Konami code and "merlyn" trigger
5. **Cross-browser**: Chrome, Firefox, Safari, Edge

---

## Critical Files to Create

1. `index.html` — Main document with structure and content
2. `js/window-manager.js` — Core window state management
3. `css/main.css` — Desktop layout and 98.css overrides
4. `js/taskbar.js` — Taskbar logic
5. `js/easter-eggs.js` — Hidden feature triggers
