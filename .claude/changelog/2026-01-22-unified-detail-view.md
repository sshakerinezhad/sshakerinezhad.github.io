# Plan: Unify Detail View into One Reusable Component

## Goal
Create ONE shared detail view component that blogs, projects, and any future file explorer uses. No duplication.

## Review Status: VALIDATED

Plan reviewed and approved. Edge cases addressed:

1. **Explorer `padding: 12px` on detail-view** - Handled by `.detail-content` padding
2. **Blog video/heading styles** - Kept in shared CSS; inert for explorer (doesn't use those classes)
3. **Books template** - Confirmed: no header, just back button + content (matches current behavior)
4. **Books back button regression** - Commit `e759c3e` removed `align-self: flex-start` from back button, causing it to stretch in books. Fix: add it back to `.detail-back-btn` (inert when inside header, only activates for direct flex children like books)

**Net result:** ~240 lines removed, ~170 lines added = ~70 lines reduction + single source of truth

---

## Current State (Problem)
Two separate implementations with nearly identical code:
- Blog: `.blog-article-*` classes in `css/main.css`
- Projects: `.explorer-detail-*` classes in `css/file-explorer.css`

Both have identical styling but different class names. This is duplication.

## Solution

### Step 1: Create `css/detail-view.css` (NEW FILE) ✅
Single source of truth for detail view styling:

```css
/* === UNIFIED DETAIL VIEW COMPONENT === */

/* Detail view wrapper - hidden by default */
.detail-view {
  display: none;
  flex-direction: column;
  height: 100%;
}

/* Toggle: show detail, hide list */
.detail-active .detail-list-view {
  display: none;
}

.detail-active .detail-view {
  display: flex;
}

/* Header section */
.detail-header {
  background: #c0c0c0;
  padding: 8px 12px;
  border-bottom: 2px groove #ffffff;
  flex-shrink: 0;
}

/* Back button */
.detail-back-btn {
  align-self: flex-start; /* Keeps button left-aligned when outside header (e.g., books) */
  margin-bottom: 8px;
  padding: 4px 12px;
  background: #c0c0c0;
  border: 2px outset #ffffff;
  cursor: pointer;
  font-size: 12px;
}

.detail-back-btn:active {
  border-style: inset;
}

/* Title */
.detail-title {
  margin: 4px 0;
  font-size: 32px;
  font-weight: bold;
}

/* Meta row (date + links) */
.detail-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 11px;
  flex-wrap: wrap;
}

.detail-date {
  color: #404040;
}

.detail-links {
  display: contents;
}

.detail-links a {
  font-family: monospace;
  color: #000080;
  text-decoration: none;
}

.detail-links a:hover {
  text-decoration: underline;
}

/* Content area */
.detail-content {
  background: #e8e0d0;
  padding: 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
  line-height: 1.7;
  overflow-y: auto;
  flex: 1;
}

.detail-content img {
  max-width: min(100%, 1000px);
  height: auto;
  display: block;
  margin: 8px auto;
}

.detail-content pre {
  background: #f0f0f0;
  padding: 8px;
  overflow-x: auto;
  font-size: 12px;
}

.detail-content code {
  background: #f0f0f0;
  padding: 1px 4px;
  font-size: 12px;
}

.detail-content pre code {
  background: none;
  padding: 0;
}

.detail-content h1 { font-size: 22px; font-weight: bold; margin: 16px 0 8px 0; }
.detail-content h2 { font-size: 16px; font-weight: bold; margin: 14px 0 6px 0; }
.detail-content h3 { font-size: 14px; font-weight: bold; margin: 12px 0 6px 0; }

/* Video layouts (from blog, reusable) */
.detail-content .video-pair {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 12px 0;
}

.detail-content .video-pair video {
  width: min(45%, 480px);
  height: auto;
  border-radius: 2px;
}

.detail-content .video-single {
  margin: 12px 0;
  text-align: center;
}

.detail-content .video-single video {
  width: min(60%, 700px);
  height: auto;
  border-radius: 2px;
}

.detail-content .video-pair + p em,
.detail-content .video-single + p em {
  display: block;
  text-align: center;
}

/* Mobile */
@media (max-width: 480px) {
  .detail-title { font-size: 20px; }
  .detail-content .video-pair { flex-direction: column; align-items: center; }
  .detail-content .video-pair video { width: 90%; }
  .detail-content .video-single video { width: 90%; }
  .detail-content img { max-width: 100%; }
}
```

### Step 2: Update `index.html` ✅

**Add stylesheet link (in `<head>`):**
```html
<link rel="stylesheet" href="css/detail-view.css">
```

**Update Blog template (lines ~118-139):**
```html
<template id="plugs-content">
  <div class="window-content blog-container">
    <div class="detail-list-view">
      <p>Things I've written:</p>
      <div class="blog-list"></div>
    </div>
    <div class="detail-view">
      <div class="detail-header">
        <button class="detail-back-btn">← Back</button>
        <h1 class="detail-title"></h1>
        <div class="detail-meta">
          <span class="detail-date"></span>
          <a class="detail-source" target="_blank">View original →</a>
        </div>
      </div>
      <div class="detail-content"></div>
    </div>
  </div>
</template>
```

**Update Projects template (lines ~74-101):**
```html
<template id="projects-content">
  <div class="window-content explorer-container">
    <div class="detail-list-view explorer-list-view">
      <div class="explorer-sidebar"></div>
      <div class="explorer-main">
        <div class="explorer-grid"></div>
      </div>
    </div>
    <div class="detail-view">
      <div class="detail-header">
        <button class="detail-back-btn">← Back</button>
        <h1 class="detail-title"></h1>
        <div class="detail-meta">
          <span class="detail-date"></span>
          <div class="detail-links"></div>
        </div>
      </div>
      <div class="detail-content"></div>
    </div>
  </div>
</template>
```

**Update Books template (lines ~103-116):**
Books has no header - just back button and content:
```html
<template id="books-content">
  <div class="window-content explorer-container books-explorer">
    <div class="detail-list-view explorer-list-view">
      <div class="explorer-sidebar"></div>
      <div class="explorer-main">
        <div class="explorer-grid"></div>
      </div>
    </div>
    <div class="detail-view">
      <button class="detail-back-btn">← Back</button>
      <div class="detail-content"></div>
    </div>
  </div>
</template>
```

### Step 3: Update `js/blog.js` ✅
Change all selectors from `.blog-article-*` to `.detail-*`:

| Old | New |
|-----|-----|
| `.blog-list-view` | `.detail-list-view` |
| `.blog-article-view` | `.detail-view` |
| `.blog-article-header` | `.detail-header` |
| `.blog-back-btn` | `.detail-back-btn` |
| `.blog-article-title` | `.detail-title` |
| `.blog-article-meta` | `.detail-meta` |
| `.blog-article-date` | `.detail-date` |
| `.blog-article-source` | `.detail-source` |
| `.blog-article-content` | `.detail-content` |
| `.blog-container` (for detail-active) | `.blog-container` (keep - it's the root) |

### Step 4: Update `js/file-explorer.js` ✅
Change all selectors from `.explorer-detail-*` to `.detail-*`:

| Old | New |
|-----|-----|
| `.explorer-detail-view` | `.detail-view` |
| `.explorer-detail-header` | `.detail-header` |
| `.explorer-back-btn` | `.detail-back-btn` |
| `.explorer-detail-title` | `.detail-title` |
| `.explorer-detail-meta` | `.detail-meta` |
| `.explorer-detail-date` | `.detail-date` |
| `.explorer-detail-links` | `.detail-links` |
| `.explorer-detail-content` | `.detail-content` |

### Step 5: Remove duplicate CSS ✅

**From `css/main.css` - DELETE lines ~217-360:**
- `.blog-article-view`
- `.blog-container.detail-active .blog-list-view`
- `.blog-container.detail-active .blog-article-view`
- `.blog-article-header`
- `.blog-back-btn`
- `.blog-article-title`
- `.blog-article-meta`
- `.blog-article-date`
- `.blog-article-source`
- `.blog-article-content` and all nested rules

**From `css/file-explorer.css` - DELETE lines ~109-189:**
- `.explorer-detail-view`
- `.explorer-container.detail-active` rules
- `.explorer-back-btn`
- `.explorer-detail-header`
- `.explorer-detail-title`
- `.explorer-detail-meta`
- `.explorer-detail-date`
- `.explorer-detail-links`
- `.explorer-detail-content`

**From `css/mobile.css` - DELETE/UPDATE:**
- Remove `.blog-article-header .blog-article-title` (now in detail-view.css)
- Remove `.blog-article-content` video rules (now in detail-view.css)

### Step 6: Keep explorer list-view styles
The explorer-specific styles for sidebar/grid stay in `file-explorer.css`:
- `.explorer-list-view`
- `.explorer-sidebar`
- `.explorer-main`
- `.explorer-grid`
- `.explorer-item`
- `.explorer-filter`

These are list-view specific, not detail-view.

## Files Modified

1. **NEW:** `css/detail-view.css` - Unified detail view component ✅
2. `index.html` - Add CSS link, update 3 templates ✅
3. `js/blog.js` - Update selectors ✅
4. `js/file-explorer.js` - Update selectors ✅
5. `css/main.css` - Remove blog detail view styles ✅
6. `css/file-explorer.css` - Remove explorer detail view styles ✅
7. `css/mobile.css` - Update/remove blog detail mobile styles ✅

## Verification

1. Hard refresh (Ctrl+Shift+R)
2. Open a blog post → Should look identical to before
3. Open a project → Should now match blog exactly (no gap, bold title)
4. Open a book → Should still work (back button + content, no header)
5. Test mobile view for all three

## Result ✅
One reusable `.detail-*` component. Any future file explorer just uses these classes.

---

## Follow-on: Heading Hierarchy Fix ✅

**Problem:** The global `.window-content h1` was only 18px (via CSS variable), which was too small for page titles. The `.detail-title` class tried to override this at 72px but the specificity was inconsistent.

**Solution:** Two-tier heading system:

| Context | h1 | h2 | h3 | h4 | h5 | h6 |
|---------|----|----|----|----|----|----|
| Page titles (`.window-content`) | 48px | 40px | 36px | 30px | 26px | 22px |
| Content body (`.detail-content`) | 22px | 18px | 16px | 14px | - | - |

**Changes:**
- `css/main.css` - Removed `--window-heading-*` variables, added explicit h1-h6 sizes
- `css/detail-view.css` - Removed explicit `.detail-title` font-size (inherits 48px from global h1), updated `.detail-content h*` sizes, removed mobile `.detail-title` override
- `css/books.css` - Removed variable references, `.book-title` inherits from `.detail-content h2`, `.book-author` explicit 12px

**Why this approach:**
- Global consistency: all page titles use same hierarchy automatically
- Clear separation: page titles (big) vs content headings (small)
- No specificity hacks - `.detail-content h*` naturally overrides via higher specificity (class+class+element)
- Extensible: new windows automatically get proper heading sizes
