# Icons & Windows Guide

## Quick Reference

| Task | Where |
|------|-------|
| Add/remove/reorder windows | `js/config.js` |
| Change window icons | `js/config.js` |
| Change window content | `index.html` (templates) |
| Change taskbar icons (start, sound) | `index.html` directly |

**Never edit:** `desktop-icons.js`, `mobile-nav.js`, `taskbar.js`

---

## How It Works

`CONFIG.windows` in `js/config.js` is the single source of truth. All UI components read from it:

```
config.js (windows)
       │
       ├── desktop-icons.js  → Desktop icons
       ├── mobile-nav.js     → Mobile nav buttons
       └── taskbar.js        → Start menu items + taskbar buttons
```

Order in config = order on screen. One change updates everywhere.

---

## Common Tasks

### Add a New Window

1. Add to `CONFIG.windows` in `js/config.js`:
```javascript
mywindow: {
  id: 'mywindow',
  title: 'My Window',
  label: 'My Window',           // Icon label
  icon: 'images/icons/my.png',  // 32x32 PNG
  width: 400,
  height: 300,
  x: 100,                       // or 'center'
  y: 100,                       // or 'center'
  contentId: 'mywindow-content',
  openOnLoad: false,
  showInUI: true                // false = hidden easter egg
}
```

2. Add template in `index.html`:
```html
<template id="mywindow-content">
  <p>Window content here</p>
</template>
```

### Change an Icon

Edit `icon` in `js/config.js`:
```javascript
about: {
  icon: 'images/icons/new-icon.png',  // Change this
  // ...
}
```

### Reorder Icons

Move the window entry up/down in `CONFIG.windows`. First entry = first icon.

### Hide a Window (Easter Egg)

Set `showInUI: false` - window won't appear in desktop/mobile/start menu but can still be opened programmatically.

---

## Icon Specs

| Location | Size | Notes |
|----------|------|-------|
| Desktop | 32x32 | Main icon size |
| Taskbar/Start | 16x16 | Auto-scaled from 32x32 |
| Mobile Nav | 24x24 | Auto-scaled from 32x32 |

**Format:** PNG with transparency, pixelated rendering enabled via CSS.

---

## Taskbar Icons (Not in Config)

Start button and sound toggle are hardcoded in `index.html`:

```html
<!-- Start button -->
<img class="start-icon" src="images/icons/start.png">

<!-- Sound toggle -->
<img id="sound-icon" src="images/icons/sound-off.png">
```

Sound icon switches between `sound-on.png` and `sound-off.png` via `js/app.js`.

---

## Creating Win95-Style Icons

**Tools:**
- [Piskel](https://www.piskelapp.com/) - Free online
- [Aseprite](https://www.aseprite.org/) - Paid

**Style:**
- 32x32 pixels, PNG with transparency
- Black outlines
- Top-left highlight, bottom-right shadow

**Free sources:**
- [Windows 95 All Icons](https://archive.org/details/windows-95-all-icons)
- [Win98 Icon Viewer](https://win98icons.alexmeub.com/)
