# Phase 6: Accessibility Implementation Plan

## Overview
Add keyboard accessibility, ARIA labels, and focus indicators to the Windows 95-themed portfolio. Keeping it simple and scoped.

---

## Scope (Minimal & Clean)

**In scope:**
1. Fix Start Menu items (critical - currently inaccessible)
2. Add focus indicators (CSS-only, no JS changes)
3. Add ARIA labels (attributes only, no behavior changes)

**Out of scope (avoiding complexity):**
- Global Escape key handler (creates component coupling)
- Arrow key navigation for desktop icons (Tab + Enter already works)
- Custom window keyboard controls (WinBox handles its own)

---

## Implementation

### 1. Start Menu: Convert to Buttons
**File:** [js/taskbar.js](js/taskbar.js)

Change `renderStartMenu()` to create `<button>` instead of `<div>`:

```js
// Before (line 30-37)
const item = document.createElement('div');
item.className = 'start-menu-item';

// After
const item = document.createElement('button');
item.className = 'start-menu-item';
item.type = 'button';
```

Add Escape key handler (self-contained, no coupling):
```js
// In bindEvents(), add:
this.startMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    this.closeStartMenu();
    this.startButton.focus(); // Return focus to Start button
  }
});
```

Add ARIA attributes to Start button:
```js
// In bindEvents(), after toggle:
this.startButton.setAttribute('aria-expanded', this.startMenuOpen);
```

### 2. Focus Indicators (CSS)
**File:** [css/main.css](css/main.css)

Add global focus-visible base:
```css
/* Accessibility: Focus indicators */
:focus-visible {
  outline: 1px dotted #000000;
  outline-offset: 2px;
}
```

**File:** [css/desktop-icons.css](css/desktop-icons.css)

Desktop icons (white outline on teal background):
```css
.desktop-icon:focus-visible {
  outline: 1px dotted #ffffff;
}
```

Social links (pressed button look):
```css
.social-link:focus-visible {
  box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #ffffff;
}
```

**File:** [css/taskbar.css](css/taskbar.css)

Start menu items (highlight like hover):
```css
.start-menu-item:focus-visible {
  background: #000080;
  color: #ffffff;
  outline: none;
}
```

### 3. ARIA Labels
**File:** [js/desktop-icons.js](js/desktop-icons.js)

Add aria-label to icons:
```js
// In renderIcons(), add:
icon.setAttribute('aria-label', `Open ${config.label}`);
```

Add aria-label to social links:
```js
// In renderSocials(), add:
link.setAttribute('aria-label', config.title);
```

**File:** [js/taskbar.js](js/taskbar.js)

Add ARIA to Start button (in init or bindEvents):
```js
this.startButton.setAttribute('aria-haspopup', 'menu');
this.startButton.setAttribute('aria-expanded', 'false');
```

Add role to Start menu container:
```js
this.startMenu.setAttribute('role', 'menu');
```

Add role to menu items (in renderStartMenu):
```js
item.setAttribute('role', 'menuitem');
```

**File:** [js/app.js](js/app.js)

Add aria-pressed to sound toggle:
```js
// Where sound toggle is handled, update:
soundToggle.setAttribute('aria-pressed', soundEnabled);
soundToggle.setAttribute('aria-label', 'Toggle sound effects');
```

---

## Files to Modify

| File | Changes |
|------|---------|
| [js/taskbar.js](js/taskbar.js) | Button elements, Escape handler, ARIA attributes |
| [js/desktop-icons.js](js/desktop-icons.js) | aria-label on icons and socials |
| [js/app.js](js/app.js) | aria-pressed on sound toggle |
| [css/main.css](css/main.css) | Global :focus-visible |
| [css/taskbar.css](css/taskbar.css) | Start menu item focus style |
| [css/desktop-icons.css](css/desktop-icons.css) | Icon and social link focus styles |

---

## Verification

1. **Tab through the page** - All interactive elements should be reachable
2. **Open Start Menu** - Press Enter on Start button, Tab to items, Enter to select, Escape to close
3. **Focus rings visible** - Dotted outlines appear on keyboard focus, not on mouse click
4. **Screen reader** - Elements announced with labels (optional: test with NVDA/VoiceOver)

---

## Why This Approach

- **No component coupling** - Each component handles its own keyboard events
- **No layout assumptions** - No arrow key nav that breaks if CSS changes
- **Semantic HTML** - Buttons instead of divs = native keyboard support
- **CSS-only focus** - `:focus-visible` handles keyboard vs mouse automatically
