# Plan: Book Detail View Fixes

## Issues Identified

1. **Squished icons**: `.explorer-item-icon` forces 48x48px square, distorting rectangular book covers
2. **Missing quote section**: Need italicized quote with attribution under summary
3. **Author placement**: Should be next to title, not below
4. **Star rating**: Numeric display for now (★ 3.6/5), upgrade to images later
5. **Heading sizes broken project-wide**: No consistent scale, contexts define their own sizes

## Files to Modify

### 1. `css/main.css` - Establish base heading scale
Add CSS custom properties in `:root` and base heading styles:
```css
:root {
  /* ... existing vars ... */

  /* Base heading scale */
  --heading-1: 18px;
  --heading-2: 15px;
  --heading-3: 13px;
  --heading-4: 12px;
}

/* Base heading styles (all contexts inherit) */
h1, h2, h3, h4 {
  font-weight: bold;
  margin: 0;
}

.window-content h1 { font-size: var(--heading-1); margin-bottom: 12px; }
.window-content h2 { font-size: var(--heading-2); margin-bottom: 10px; }
.window-content h3 { font-size: var(--heading-3); margin-bottom: 8px; }
.window-content h4 { font-size: var(--heading-4); margin-bottom: 6px; }
```

Then update `.blog-article-content` headings to use the same variables (scaled up for larger format):
```css
.blog-article-content h1 { font-size: calc(var(--heading-1) + 4px); }
.blog-article-content h2 { font-size: calc(var(--heading-2) + 1px); }
.blog-article-content h3 { font-size: var(--heading-3); }
```

### 2. `index.html` - Add books-explorer class to template
Change the books template container to include a modifier class:
```html
<div class="window-content explorer-container books-explorer">
```

### 3. `css/file-explorer.css` - Books-specific icon sizing
Target via the class added above (no JS changes):
```css
/* Book covers - taller aspect ratio */
.books-explorer .explorer-item-icon {
  height: 64px;
  object-fit: contain;
}
```

### 4. `css/books.css` - Complete rewrite
```css
/* Book detail header - title and author inline */
.book-detail .book-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.book-detail .book-title {
  font-size: var(--heading-1);
  font-weight: bold;
  margin: 0;
}

.book-detail .book-author {
  font-size: var(--heading-3);
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

### 5. Update all 7 book HTML files
New structure:
```html
<div class="book-detail">
  <img src="images/books/covers/[slug].jpg" alt="[Title]" class="book-cover">

  <div class="book-header">
    <h2 class="book-title">[Title]</h2>
    <span class="book-author">by [Author]</span>
  </div>

  <p class="book-rating"><span class="star-icon">★</span> 4.2/5</p>

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
1. `css/main.css` - Establish base heading scale with CSS vars
2. `index.html` - Add `books-explorer` class to template
3. `css/file-explorer.css` - Books-specific icon sizing
4. `css/books.css` - Rewrite with new structure
5. Update all 7 book HTML files

## Verification
- Grid icons show full rectangular covers (not squished)
- Title and author on same line in detail view
- Rating shows as "★ X.X/5"
- Quote in italics with dash attribution below summary
- Heading hierarchy correct site-wide (h1 > h2 > h3 > h4)
