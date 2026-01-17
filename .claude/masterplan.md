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
- [ ] Deploy to GitHub Pages

**Files created:**
- `index.html` — Structure, CDN links, templates
- `css/main.css` — Desktop layout, Win95 colors, WinBox overrides
- `js/config.js` — Centralized window definitions
- `js/window-manager.js` — WindowManager class
- `js/app.js` — Entry point

### Phase 2: Window System (NEXT)
- All 4 main windows with content (Research, D&D, Shameless Plugs)
- Hidden Merlyn Labs window
- Window content styling

### Phase 3: Taskbar & Desktop
- Taskbar with Start menu, running windows, clock
- Desktop icons with double-click
- Header with name + socials (GitHub, Twitter, email)

### Phase 4: Easter Eggs & Polish
- Konami code + secret word triggers
- Merlyn Labs hidden window with "declassified" reveal
- Optional sound effects
- Error dialogs for "coming soon" items

### Phase 5: Mobile & Accessibility
- Responsive breakpoints
- Disable dragging on mobile
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
