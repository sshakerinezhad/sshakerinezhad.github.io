# Plan: Book Detail View Fixes

## Issues Identified

1. **Squished icons**: `.explorer-item-icon` forces 48x48px square, distorting rectangular book covers
2. **Missing quote section**: Need italicized quote with attribution under summary
3. **Author placement**: Should be next to title, not below
4. **Star rating**: Numeric display for now (★ 3.6/5), upgrade to images later
5. **Heading sizes broken in window-content**: h3 has no rule, defaults to ~19px (larger than h2's 14px)

## Files to Modify

### 1. `css/main.css` - Add missing heading rules

**The Problem:**
- `.window-content h2` = 14px (styled)
- `.window-content h3` = ~19px (browser default - LARGER than h2!)
- `.window-content h1, h4` = browser defaults

**The Fix:** Add CSS variables and the missing rules. Keep h2 at 14px (don't change what works).

```css
:root {
  /* ... existing color vars ... */

  /* Window heading scale */
  --window-heading-1: 18px;
  --window-heading-2: 14px;  /* matches existing .window-content h2 */
  --window-heading-3: 12px;
  --window-heading-4: 11px;
}

/* Window content headings - complete hierarchy */
.window-content h1 { font-size: var(--window-heading-1); font-weight: bold; margin: 0 0 12px 0; }
.window-content h2 { font-size: var(--window-heading-2); font-weight: bold; margin: 0 0 10px 0; }
.window-content h3 { font-size: var(--window-heading-3); font-weight: bold; margin: 0 0 8px 0; }
.window-content h4 { font-size: var(--window-heading-4); font-weight: bold; margin: 0 0 6px 0; }
```

**Why this approach:**
- Named `--window-heading-*` to be explicit about scope (not global `--heading-*`)
- h2 stays 14px to match existing behavior
- Blog rules left unchanged (they already work: 22/16/14px for h1/h2/h3)
- No `calc()` coupling between blog and window contexts - they're different (reading font vs UI font)

**What changes:**
| Element | Before | After |
|---------|--------|-------|
| `.window-content h1` | ~32px (default) | 18px |
| `.window-content h2` | 14px | 14px (unchanged) |
| `.window-content h3` | ~19px (default) | 12px (fixes bug) |
| `.window-content h4` | ~16px (default) | 11px |
| Blog headings | 22/16/14px | unchanged |

**What could break:** Nothing. Searched codebase - no templates currently use h1, h3, or h4 in window-content except books (where this fix is intended).

### 2. `data/books/legion.html` - Fix heading inconsistency

Change line 3 from `<h3>Legion</h3>` to `<h2>Legion</h2>` (all other books use h2 for title).

### 3. `index.html` - Add books-explorer class to template

```html
<div class="window-content explorer-container books-explorer">
```

### 4. `css/file-explorer.css` - Books-specific icon sizing

```css
/* Book covers - taller aspect ratio */
.books-explorer .explorer-item-icon {
  height: 64px;
  object-fit: contain;
}
```

### 5. `css/books.css` - Update for new structure

```css
/* Book detail header - title and author inline */
.book-detail .book-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.book-detail .book-title {
  font-size: var(--window-heading-1);
  font-weight: bold;
  margin: 0;
}

.book-detail .book-author {
  font-size: var(--window-heading-3);
  color: #666;
  font-style: italic;
}

/* Star rating - simple numeric for now */
.book-rating {
  font-size: 13px;
  color: #404040;
  margin-bottom: 8px;
}

.book-rating .star-icon {
  color: #f5c518;
}

/* Cover image */
.book-detail .book-cover {
  max-width: 150px;
  float: left;
  margin-right: 15px;
  margin-bottom: 10px;
}

/* Quote section */
.book-detail .book-quote {
  font-style: italic;
  margin: 12px 0;
  padding-left: 12px;
  border-left: 2px solid #808080;
  color: #404040;
}

.book-detail .book-quote .quote-attribution {
  display: block;
  margin-top: 4px;
  font-size: 11px;
}

/* My thoughts section */
.book-detail .book-thoughts {
  clear: both;
}
```

### 6. Update all 7 book HTML files

New structure:
```html
<div class="book-detail">
  <img src="images/books/covers/[slug].jpg" alt="[Title]" class="book-cover">

  <div class="book-header">
    <h2 class="book-title">[Title]</h2>
    <span class="book-author">by [Author]</span>
  </div>

  <p class="book-rating"><span class="star-icon">★</span> X.X/5</p>

  <p class="book-summary">[Summary]</p>

  <div class="book-quote">
    "[Quote from the book]"
    <span class="quote-attribution">— [Character Name]</span>
  </div>

  <div class="book-thoughts">
    <h3>My Thoughts</h3>
    <p>Review here...</p>
  </div>
</div>
```

## Implementation Order

1. `css/main.css` - Add CSS vars and heading rules
2. `data/books/legion.html` - Fix h3→h2 for title
3. `index.html` - Add `books-explorer` class to template
4. `css/file-explorer.css` - Books-specific icon sizing
5. `css/books.css` - Update with new structure
6. Update all 7 book HTML files

## Verification

- Open Books window → grid icons show full rectangular covers (not squished)
- Click any book → title (h2) visibly larger than "My Thoughts" (h3)
- Title and author on same line
- Rating shows as "★ X.X/5"
- Quote in italics with attribution
- Open Blog → headings unchanged (22/16/14px)
- Open About/Projects → unchanged appearance
- DevTools: `.window-content h3` shows 12px, not browser default
