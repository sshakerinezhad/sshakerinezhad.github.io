# Mobile Tab Sizing Issue - Investigation & Fix Plan

## Status
- [x] **Part 1: Fix Current Sizing Issue** - Completed
- [ ] **Part 2: Scrollable Tab Bar** - Future enhancement (only if >6 tabs needed)

## Implementation Notes

### Part 1 Implementation (Completed)
**File modified:** `css/mobile.css` lines 107-121

Applied fix:
```css
#mobile-nav button {
  flex: 1 1 0;         /* Equal width - start at 0, grow/shrink equally */
  min-width: 50px;     /* Reduced from 60px to fit 320px screens */
  max-width: 80px;     /* Cap width to prevent overly wide tabs */
  /* ... rest unchanged ... */
}
```

**Why `flex: 1 1 0` (not `flex: 1 0 auto`):**
- `flex-basis: 0` starts all buttons at zero width, then distributes ALL space equally → equal final widths
- `flex-basis: auto` would start at content width, distributing only extra space → unequal widths
- `flex-shrink: 1` allows buttons to shrink on 320px screens

**Why `min-width: 50px` (not 65px):**
- 6 tabs × 65px = 390px, too wide for 320px screens
- 6 tabs × 50px = 300px, fits comfortably with padding

---

## Problem Summary
On mobile, the bottom navigation tabs display inconsistent widths - the 3 left tabs (About, Projects, Blog) appear smaller than the 3 right tabs (Merlyn Labs, Stuff I've Read, Contact Me).

## Root Cause Analysis

### Primary Cause: Missing `flex: 1` on buttons
**Location:** `css/mobile.css` lines 91-119

The mobile nav uses flexbox with `justify-content: space-around`, but buttons don't have `flex: 1`:
```css
#mobile-nav {
  justify-content: space-around;  /* Distributes space around items */
}

#mobile-nav button {
  min-width: 60px;  /* Only sets minimum, not equal sizing */
  /* Missing: flex: 1; */
}
```

Without `flex: 1`, buttons size based on content width.

### Why Left vs Right Differs
After label processing (`mobile-nav.js` line 41):
| Position | Label | Length |
|----------|-------|--------|
| Left 1 | About | 5 chars |
| Left 2 | Projects | 8 chars |
| Left 3 | Blog | 4 chars |
| Right 1 | Merlyn Labs | 11 chars |
| Right 2 | Stuff I've Read | 14 chars |
| Right 3 | Contact Me | 10 chars |

**Left average: ~6 chars | Right average: ~12 chars**

Longer labels = wider buttons = visible asymmetry.

---

## Fix for Current Issue

### Change Required
**File:** `css/mobile.css` line 107-119

Add `flex: 1` to force equal button widths:
```css
#mobile-nav button {
  flex: 1;          /* ADD: Equal width distribution */
  max-width: 80px;  /* ADD: Prevent overly wide tabs */
  display: flex;
  flex-direction: column;
  /* ... rest unchanged ... */
}
```

---

## Future Scalability: Adding More Tabs

### Current Constraint
- 6 tabs × 60px min-width = 360px minimum
- Mobile viewport: 320-480px
- Already near the limit

### Options for Scaling Beyond 6 Tabs

**Option A: Icon-Only Mode (Recommended)**
- Hide labels entirely on mobile, show only icons
- Pros: Fits 8-10 tabs easily, cleaner look
- Cons: Less discoverable for new users
- Implementation: Add `display: none` to `#mobile-nav button span` in mobile CSS

**Option B: Scrollable Tab Bar**
- Allow horizontal scroll when tabs overflow
- Pros: Unlimited tabs, familiar pattern (Chrome tabs)
- Cons: Hidden tabs not visible, requires scroll indication
- Implementation: Add `overflow-x: auto` and `flex-wrap: nowrap`

**Option C: Two-Row Layout**
- Stack tabs in 2 rows of 3-4 each
- Pros: All tabs visible, good for 6-8 tabs
- Cons: Takes more vertical space (120px vs 60px)
- Implementation: Add `flex-wrap: wrap` with adjusted height

**Option D: Overflow Menu ("More" button)**
- Show first 5 tabs + "..." menu
- Pros: Clean, familiar pattern
- Cons: More complex, hides content
- Implementation: Requires JS changes

---

## Implementation Plan

### Part 1: Fix Current Sizing Issue
**File:** `css/mobile.css` lines 107-119

Add `flex: 1` to force equal button widths:
```css
#mobile-nav button {
  flex: 1 0 auto;     /* Equal distribution, don't shrink */
  min-width: 65px;    /* Minimum tap target size */
  max-width: 80px;    /* Prevent overly wide on smaller tab counts */
  /* ... rest unchanged ... */
}
```

### Part 2: Scrollable Tab Bar for Future Scalability
**File:** `css/mobile.css` lines 91-105

Make the nav horizontally scrollable with smooth UX:
```css
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

  /* Scrollable changes */
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;    /* Snap to tabs */
  -webkit-overflow-scrolling: touch; /* iOS momentum scroll */

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;           /* Firefox */
  -ms-overflow-style: none;        /* IE/Edge */

  /* Layout */
  justify-content: flex-start;     /* Changed from space-around */
  align-items: center;
  padding: 0 4px;
  gap: 4px;
  z-index: 9999;
}

#mobile-nav::-webkit-scrollbar {
  display: none;                   /* Chrome/Safari */
}
```

Update button styles for scroll snapping:
```css
#mobile-nav button {
  flex: 0 0 auto;                  /* Don't grow/shrink, natural width */
  min-width: 65px;
  max-width: 85px;
  scroll-snap-align: start;        /* Snap point at button start */
  /* ... rest unchanged ... */
}
```

### UX Considerations (Preventing Accidental Clicks)

1. **Scroll snap** - Tabs snap into position, reducing mis-taps mid-scroll
2. **Minimum touch target** - 65px × 48px meets accessibility guidelines (44×44 minimum)
3. **Gap between buttons** - 4px gap provides visual separation
4. **Momentum scrolling** - `-webkit-overflow-scrolling: touch` for natural feel on iOS

### Optional Enhancement: Scroll Indicators
If needed later, can add fade gradients on edges to hint more tabs exist:
```css
#mobile-nav::before,
#mobile-nav::after {
  content: '';
  position: sticky;
  width: 20px;
  flex-shrink: 0;
  pointer-events: none;
}
#mobile-nav::before {
  left: 0;
  background: linear-gradient(to right, var(--surface), transparent);
}
#mobile-nav::after {
  right: 0;
  background: linear-gradient(to left, var(--surface), transparent);
}
```

---

## Files to Modify

1. `css/mobile.css` - Update `#mobile-nav` and `#mobile-nav button` styles

---

## Verification

1. **Sizing fix:** Check all 6 tabs appear equal width at 375px viewport
2. **Scroll behavior:** Add a 7th temporary tab in config, verify smooth horizontal scroll
3. **Snap behavior:** Scroll partway and release - should snap to nearest tab
4. **Touch accuracy:** Test clicking tabs while scrolling - snap should prevent mis-clicks
5. **Active state:** Verify `.active` styling still works on selected tab
6. **Scrollbar hidden:** Confirm no visible scrollbar on iOS/Android/Chrome DevTools
