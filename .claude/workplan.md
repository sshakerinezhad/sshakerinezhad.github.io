# Fix Window Management Issues - Implementation Plan

## Issues to Fix

1. **Close button (X) not working** - Windows don't close when clicking X
2. **Minimize hides window below taskbar** - Only top edge visible, can't restore
3. **Maximize hides window behind header** - Can't access title bar controls
4. **Remove fullscreen button** - User doesn't want max/fullscreen option
5. **Window borders blend together** - No visual differentiation between overlapping windows

---

## Root Cause Analysis

### Issue 1: Close Button Not Working
- WinBox `onclose` callback returns `true` but this may not be the expected value
- In WinBox, returning `false` from `onclose` prevents the close; returning anything else allows it
- The callback uses arrow function which should be fine for `this` since it uses closure variables
- **Actual fix**: Need to test if removing `return true` or returning nothing works better

### Issues 2 & 3: Window Bounds Not Constrained
- **No `top`, `bottom` bounds** configured in WinBox options (lines 58-63)
- WinBox's minimize moves window to viewport bottom, not respecting our taskbar
- WinBox's maximize expands to full viewport, hiding behind header
- **Fix**: Add `top: 32` and `bottom: 28` to WinBox config

### Issue 4: Remove Fullscreen Button
- WinBox shows max/fullscreen button by default
- **Fix**: Add `max: false` to WinBox config

### Issue 5: Window Borders Blend Together
- Current CSS (lines 34-42) only has inset shadows for 3D beveled look
- No outer border/shadow to separate windows
- **Fix**: Add outer drop shadow to create visual separation

---

## Files to Modify

| File | Changes |
|------|---------|
| [js/window-manager.js](js/window-manager.js) | Add `top`, `bottom`, `max: false` to WinBox config |
| [css/main.css](css/main.css) | Add outer shadow for window separation |

---

## Exact Code Changes

### 1. js/window-manager.js (lines 58-63)

**Current:**
```javascript
const winbox = new WinBox(config.title, {
  width: config.width,
  height: config.height,
  x: config.x,
  y: config.y,
  class: ['win95-window'],
```

**Change to:**
```javascript
const winbox = new WinBox(config.title, {
  width: config.width,
  height: config.height,
  x: config.x,
  y: config.y,
  class: ['win95-window'],

  // Bounds constraints (keep windows within desktop area)
  top: 32,      // Below header
  bottom: 28,   // Above taskbar
  right: 0,
  left: 0,

  // Remove maximize/fullscreen button
  max: false,
```

### 2. css/main.css (lines 34-42)

**Current:**
```css
.winbox {
  background: var(--win95-gray);
  border: none;
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #ffffff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf;
}
```

**Change to:**
```css
.winbox {
  background: var(--win95-gray);
  border: none;
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #ffffff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf,
    3px 3px 0 rgba(0, 0, 0, 0.4);  /* Outer drop shadow for separation */
}
```

---

## Verification Checklist

1. [ ] Click X button closes window completely
2. [ ] Click minimize button - window minimizes, taskbar button click restores it
3. [ ] Windows cannot be dragged above header (top boundary at 32px)
4. [ ] Windows cannot be dragged below taskbar (bottom boundary at 28px)
5. [ ] No fullscreen/maximize button visible in window title bar
6. [ ] Overlapping windows have clear visual boundary (drop shadow visible)
7. [ ] All existing functionality still works (drag, resize, focus, taskbar sync)
