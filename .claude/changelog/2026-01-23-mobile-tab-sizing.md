# Mobile Tab Sizing Issue - Investigation & Fix Plan

## Status
- [x] **Part 1: Fix Current Sizing Issue** - Completed (CSS Grid approach)
- [x] **Part 2: Scrollable Tab Bar** - Built-in with Grid implementation

## Implementation Notes

### Final Implementation (CSS Grid)
**File modified:** `css/mobile.css`

**Why CSS Grid over Flexbox:**
- Grid's `1fr` unit means "equal fraction" - designed for equal sizing
- Flexbox requires `flex: 1 1 0` workaround which can have edge cases
- Grid naturally supports horizontal scroll without additional hacks

**Changes made:**

1. **#mobile-nav container:**
```css
#mobile-nav {
  /* Grid layout - equal columns */
  grid-auto-flow: column;
  grid-auto-columns: minmax(50px, 1fr);
  gap: 2px;
  /* Scroll for overflow (>6 items) */
  overflow-x: auto;
  overflow-y: hidden;
}
```

2. **Media query:** Changed `display: flex` to `display: grid`

3. **Button styles:** Removed flex sizing (`flex: 1 1 0`, `min-width`, `max-width`), added `justify-content: center`

4. **Label overflow:**
```css
#mobile-nav button span {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Scaling Behavior

| Scenario | Behavior |
|----------|----------|
| 6 items, 375px | Each ~60px (equal) |
| 6 items, 320px | Each ~50px (equal) |
| 8 items, 375px | Each ~45px, horizontal scroll available |
| 4 items, 375px | Each ~90px (equal) |

---

## Files Modified
- `css/mobile.css` - Mobile nav styling (Grid layout, button styles, text overflow)

---

## Verification
1. Chrome DevTools → iPhone SE (375px) - all tabs equal width
2. Long labels ("Stuff I've Read") truncate with "..."
3. Add temp 7th window to config → verify scroll works
