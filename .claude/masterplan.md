# Refactor: Single Source of Truth for All UI

## Status: COMPLETE

All code changes have been implemented. Only manual testing remains.

---

## What Was Done

| File | Change | Status |
|------|--------|--------|
| `js/config.js` | Merged `desktopIcons` into `windows`, added `icon`, `label`, `showInUI` | Done |
| `js/desktop-icons.js` | Now reads from `CONFIG.windows` | Done |
| `js/mobile-nav.js` | Now reads from `CONFIG.windows`, removed hardcoded array | Done |
| `js/taskbar.js` | Changed `hidden` → `showInUI` check | Done |

---

## Remaining: Manual Testing

Test the following:
- [ ] Desktop icons render in correct order
- [ ] Mobile nav buttons render in correct order
- [ ] Start menu shows all `showInUI: true` windows
- [ ] Taskbar buttons work
- [ ] D&D easter egg stays hidden but still opens via secret trigger

---

## Result

**All common edits now happen in 2 files only:**

| Edit Type | File |
|-----------|------|
| Add/remove windows | `config.js` |
| Change icons | `config.js` |
| Reorder icons | `config.js` |
| Change window sizes | `config.js` |
| Add/remove socials | `config.js` |
| Change window content | `index.html` |

**Never touch:** `desktop-icons.js`, `mobile-nav.js`, `taskbar.js`, `window-manager.js`

---

## Current Config Structure

**js/config.js** becomes the single source of truth:

```javascript
const CONFIG = {
  mobile: {
    breakpoint: 480,
    mode: 'tabs'
  },

  // === ALL WINDOWS - order determines icon order ===
  windows: {
    about: {
      id: 'about',
      title: 'About.exe',
      label: 'About.exe',                    // Icon label
      icon: 'images/icons/about.png',        // Icon image
      width: 420,
      height: 300,
      x: 'center',
      y: 'center',
      contentId: 'about-content',
      openOnLoad: true,
      showInUI: true                         // Show in desktop/mobile/start menu
    },
    projects: {
      id: 'projects',
      title: 'Research & Projects',
      label: 'Projects',
      icon: 'images/icons/projects.png',
      width: 500,
      height: 400,
      x: 140,
      y: 100,
      contentId: 'projects-content',
      openOnLoad: false,
      showInUI: true
    },
    // ... more windows ...
    dnd: {
      id: 'dnd',
      title: 'D&D Corner',
      label: 'D&D Corner',
      icon: 'images/icons/dnd.png',
      width: 450,
      height: 350,
      x: 320,
      y: 220,
      contentId: 'dnd-content',
      openOnLoad: false,
      showInUI: false                        // Hidden easter egg
    }
  },

  // === SOCIAL LINKS ===
  socials: {
    github: { url: 'https://github.com/...', icon: 'fa-brands fa-github', title: 'GitHub' },
    // ... order here = order in header
  },

  isMobile: () => window.innerWidth <= CONFIG.mobile.breakpoint
};
```

**Key points:**
- Order of entries = order of icons on screen
- `showInUI: false` = hidden from all UI (easter egg)
- No more `desktopIcons` object (merged into `windows`)

---

## Common Tasks (How To)

### Add a new window
1. Add entry to `CONFIG.windows` in `config.js`
2. Add `<template id="xxx-content">` in `index.html`

### Change an icon image
1. Edit `icon: 'images/icons/new.png'` in `config.js`

### Reorder icons
1. Move the window entry up/down in `config.js`

### Hide a window (easter egg)
1. Set `showInUI: false` in `config.js`

### Add a social link
1. Add entry to `CONFIG.socials` in `config.js`
