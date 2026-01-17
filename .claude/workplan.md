# Mobile Responsiveness Plan - Windows 95 Portfolio

## Problem Summary
The site is 100% desktop-optimized with zero media queries. On mobile:
- Header name (14px, 32px height) is too small
- Windows (420-500px) overflow the viewport (375px typical)
- Taskbar buttons (22px) are too small for touch
- Window dragging is frustrating on touch
- Desktop icons compete for space with windows

---

## Strategy: Switchable Mobile Modes

**Two mobile modes to test** (change one config value to swap):

| Mode | Description |
|------|-------------|
| `'tabs'` | One window at a time, bottom nav to switch (like mobile app tabs) |
| `'scroll'` | All windows as stacked cards, vertical scroll, no nav needed |

**Desktop (>480px) is unchanged** — full Win95 experience with dragging.

---

## Implementation Plan

### 1. Update `js/config.js`
Add mobile settings (single line to change mode):

```javascript
CONFIG.mobile = {
  breakpoint: 480,
  mode: 'tabs',  // ← CHANGE THIS: 'tabs' or 'scroll'
};
CONFIG.isMobile = () => window.innerWidth <= CONFIG.mobile.breakpoint;
```

### 2. Create `css/mobile.css` (new file)
All responsive overrides:

```css
@media (max-width: 480px) {
  /* Header: 32px → 56px, larger text/buttons */
  #header { height: 56px; padding: 0 12px; }
  .header-name { font-size: 18px; }
  .social-link { width: 44px; height: 44px; font-size: 20px; }

  /* Hide desktop-only elements */
  #desktop-icons { display: none; }
  #taskbar { display: none; }
  #start-menu { display: none; }

  /* === TABS MODE === */
  body.mobile-tabs #desktop {
    top: 56px;
    bottom: 60px;
  }

  body.mobile-tabs #mobile-nav {
    display: flex;
  }

  body.mobile-tabs .winbox {
    width: calc(100vw - 16px) !important;
    max-width: 400px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  }

  /* === SCROLL MODE === */
  body.mobile-scroll #desktop {
    top: 56px;
    bottom: 0;
    overflow-y: auto;
  }

  body.mobile-scroll #mobile-nav {
    display: none;
  }

  body.mobile-scroll #window-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
  }

  body.mobile-scroll .window-card {
    background: var(--surface);
    border: 2px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
  }

  body.mobile-scroll .window-card-title {
    background: linear-gradient(90deg, #000080, #1084d0);
    color: white;
    padding: 4px 8px;
    font-weight: bold;
  }

  body.mobile-scroll .window-card-content {
    padding: 12px;
  }
}

/* Mobile nav (hidden by default) */
#mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--surface);
  border-top: 2px solid;
  border-color: #fff #808080 #808080 #fff;
  justify-content: space-around;
  align-items: center;
  padding: 0 8px;
  z-index: 9999;
}

#mobile-nav button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 60px;
  min-height: 48px;
  background: var(--surface);
  border: 2px outset #dfdfdf;
  font-family: inherit;
  font-size: 18px;
  cursor: pointer;
}

#mobile-nav button:active {
  border-style: inset;
}

#mobile-nav button span {
  font-size: 10px;
}

#mobile-nav button.active {
  border-style: inset;
  background: #c0c0c0;
}

/* Window stack container (hidden by default) */
#window-stack {
  display: none;
}
```

### 3. Add HTML to `index.html`

Add after existing CSS links:
```html
<link rel="stylesheet" href="css/mobile.css">
```

Add before `</body>`:
```html
<!-- Mobile bottom nav (tabs mode) -->
<nav id="mobile-nav">
  <button data-window="about">👤<span>About</span></button>
  <button data-window="projects">📁<span>Projects</span></button>
  <button data-window="plugs">🔗<span>Links</span></button>
  <button data-window="merlyn">🧪<span>Merlyn</span></button>
</nav>

<!-- Mobile window stack (scroll mode) -->
<div id="window-stack"></div>
```

Add script tag:
```html
<script src="js/mobile-nav.js"></script>
```

### 4. Create `js/mobile-nav.js` (new file)

```javascript
/**
 * MobileNav - Handles mobile-specific behavior
 * Supports two modes: 'tabs' (one window at a time) and 'scroll' (stacked cards)
 */
class MobileNav {
  constructor(windowManager) {
    this.wm = windowManager;
    this.mode = CONFIG.mobile.mode;
    this.init();
  }

  init() {
    this.updateBodyClass();
    window.addEventListener('resize', () => this.updateBodyClass());

    if (this.mode === 'tabs') {
      this.initTabsMode();
    } else if (this.mode === 'scroll') {
      this.initScrollMode();
    }
  }

  updateBodyClass() {
    const isMobile = CONFIG.isMobile();
    document.body.classList.remove('mobile-tabs', 'mobile-scroll');
    if (isMobile) {
      document.body.classList.add(`mobile-${this.mode}`);
    }
  }

  // === TABS MODE ===
  initTabsMode() {
    const nav = document.getElementById('mobile-nav');
    if (!nav) return;

    nav.querySelectorAll('button[data-window]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!CONFIG.isMobile()) return;

        // Close all other windows first
        this.wm.getOpenWindows().forEach(w => this.wm.close(w.id));

        // Open selected window
        this.wm.open(btn.dataset.window);

        // Update active button
        nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Sync active state when windows change
    this.wm.on('windowOpen', (id) => {
      if (!CONFIG.isMobile()) return;
      nav.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.window === id);
      });
    });
  }

  // === SCROLL MODE ===
  initScrollMode() {
    if (!CONFIG.isMobile()) return;

    const stack = document.getElementById('window-stack');
    if (!stack) return;

    // Render all non-hidden windows as cards
    const windowIds = ['about', 'projects', 'plugs', 'merlyn'];

    windowIds.forEach(id => {
      const config = CONFIG.windows[id];
      if (!config || config.hidden) return;

      const template = document.getElementById(config.contentId);
      if (!template) return;

      const card = document.createElement('div');
      card.className = 'window-card';
      card.innerHTML = `
        <div class="window-card-title">${config.title}</div>
        <div class="window-card-content"></div>
      `;
      card.querySelector('.window-card-content').appendChild(
        template.content.cloneNode(true)
      );
      stack.appendChild(card);
    });
  }
}
```

### 5. Update `js/window-manager.js`
Modify `open()` to use mobile sizing:

```javascript
open(id) {
  // ... existing early return for already-open windows ...

  const config = CONFIG.windows[id];
  const isMobile = CONFIG.isMobile();

  // Skip WinBox entirely in scroll mode
  if (isMobile && CONFIG.mobile.mode === 'scroll') {
    return null;
  }

  const mobileWidth = Math.min(400, window.innerWidth - 16);
  const mobileHeight = Math.min(500, window.innerHeight - 130);

  const winbox = new WinBox(config.title, {
    width: isMobile ? mobileWidth : config.width,
    height: isMobile ? mobileHeight : config.height,
    x: isMobile ? 'center' : config.x,
    y: isMobile ? 'center' : config.y,
    class: isMobile
      ? ['win95-window', 'no-full', 'no-move', 'no-resize']
      : ['win95-window', 'no-full'],
    top: isMobile ? 64 : 32,
    bottom: isMobile ? 68 : 28,
    // ... existing callbacks
  });
  // ...
}
```

### 6. Update `js/app.js`
- Initialize MobileNav: `new MobileNav(windowManager);`
- Conditional auto-open on mobile:
```javascript
if (CONFIG.isMobile() && CONFIG.mobile.mode === 'tabs') {
  // Only open About on mobile tabs mode
  windowManager.open('about');
} else if (!CONFIG.isMobile()) {
  // Desktop: open both as before
  Object.values(CONFIG.windows).forEach(win => {
    if (win.openOnLoad && !win.hidden) windowManager.open(win.id);
  });
}
// Scroll mode: windows are rendered as cards, no WinBox needed
```

---

## How to Switch Modes

In `js/config.js`, change this one line:

```javascript
CONFIG.mobile = {
  breakpoint: 480,
  mode: 'tabs',  // ← CHANGE TO 'scroll' TO TEST OTHER MODE
};
```

That's it. Refresh the page in mobile view to see the difference.

---

## Files Summary

| File | Action |
|------|--------|
| `js/config.js` | **MODIFY** - Add `CONFIG.mobile` with mode setting |
| `css/mobile.css` | **CREATE** - All responsive CSS for both modes |
| `js/mobile-nav.js` | **CREATE** - MobileNav class handling both modes |
| `index.html` | **MODIFY** - Add mobile.css link, nav HTML, script tag |
| `js/window-manager.js` | **MODIFY** - Mobile window sizing + no-move/no-resize |
| `js/app.js` | **MODIFY** - Initialize MobileNav, conditional auto-open |

---

## Verification Steps

1. **Test tabs mode**: Set `mode: 'tabs'`, open in DevTools at 375px width
   - Bottom nav visible with 4 buttons
   - Tapping button opens window, closes previous
   - Window centered, no dragging

2. **Test scroll mode**: Set `mode: 'scroll'`, refresh
   - No bottom nav
   - All windows as stacked cards
   - Vertical scrolling works

3. **Test desktop unchanged**: Widen to >480px
   - Full Win95 experience restored
   - Taskbar, desktop icons visible
   - Windows draggable

4. **Header**: Name and socials larger and usable on mobile
5. **Touch targets**: All buttons 44px+ height
6. **Easter eggs**: Konami code still works
