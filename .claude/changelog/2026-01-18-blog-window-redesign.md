# Blog Window Redesign Plan

## Progress
- [x] Step 1: Add marked.js CDN
- [x] Step 2: Create blog content structure
- [x] Step 3: Update blog window size
- [x] Step 4: Rewrite blog template
- [x] Step 5: Create blog.js module
- [x] Step 6: Add blog CSS styles
- [x] Step 7: Add blog.js script tag
- [x] Step 8: Integrate with window-manager
- [x] Step 9: Fix article view layout

## Files Created
| File | Status |
|------|--------|
| `blog/posts.json` | ✓ Created |
| `blog/example-post.md` | ✓ Created |
| `js/blog.js` | ✓ Created |

## Files Modified
| File | Status |
|------|--------|
| `index.html` | ✓ Done (marked.js CDN, template, blog.js script) |
| `js/config.js` | ✓ Done (window size 600x500) |
| `css/main.css` | ✓ Done (~100 lines of blog styles including header/layout) |
| `js/window-manager.js` | ✓ Done (Blog.init() integration) |

---

## Summary
Transform the blog window from a simple links list into a full article reader with:
- Scrollable list view (date, title, description)
- In-window article viewing with markdown rendering
- Back button navigation
- Image support within posts

## Architecture Decisions
- **Content storage:** Separate `/blog/` folder with `.md` files
- **Metadata:** `blog/posts.json` file (keeps config.js focused on UI)
- **Markdown rendering:** marked.js via CDN (matches existing CDN pattern)
- **Date format:** Full date (Jan 15, 2026)

---

## Implementation Steps

### 1. Add marked.js CDN to index.html
Add to the `<head>` section alongside other CDN libraries:
```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

**File:** [index.html](index.html)

### 2. Create blog content structure
Create folder and initial files:
```
blog/
  posts.json        ← metadata array
  example-post.md   ← sample post for testing
```

**posts.json structure:**
```json
[
  {
    "id": "example-post",
    "title": "Example Blog Post",
    "date": "2026-01-15",
    "description": "Brief description shown in the list view",
    "file": "blog/example-post.md",
    "source": "https://original-source-url.com"
  }
]
```

### 3. Update blog window config
Increase window size for comfortable reading.

**File:** [js/config.js](js/config.js) (lines 38-49, `plugs` window)
- Increase width: 400 → 600
- Increase height: 320 → 500

### 4. Rewrite blog template in index.html
Replace current simple links template with dual-view structure.

**File:** [index.html](index.html) (lines 105-119, `#plugs-content` template)

New structure:
```html
<template id="plugs-content">
  <div class="window-content blog-container">
    <!-- List View -->
    <div class="blog-list-view">
      <p>Things I've written:</p>
      <div class="blog-list"></div>
    </div>

    <!-- Article View (hidden by default) -->
    <div class="blog-article-view" style="display: none;">
      <button class="blog-back-btn">← Back</button>
      <h2 class="blog-article-title"></h2>
      <a class="blog-article-source" target="_blank">View original →</a>
      <div class="blog-article-content"></div>
    </div>
  </div>
</template>
```

### 5. Create blog.js module
New file to handle blog functionality.

**File:** [js/blog.js](js/blog.js) (new)

Responsibilities:
- Fetch and parse `blog/posts.json`
- Render post list with date, title, description
- Handle click → fetch .md file → render with marked.js
- Toggle between list view and article view
- Back button functionality

Key functions:
- `initBlog(container)` - Called when blog window opens
- `renderPostList(posts, container)` - Build the list view
- `openPost(post, container)` - Fetch markdown, render article
- `showListView(container)` / `showArticleView(container)` - Toggle views

### 6. Add blog CSS styles
**File:** [css/main.css](css/main.css)

New styles needed:
```css
/* Blog list items (similar to project-item pattern) */
.blog-item { }
.blog-item-date { }
.blog-item-title { }
.blog-item-desc { }

/* Article view */
.blog-back-btn { }
.blog-article-title { }
.blog-article-source { }
.blog-article-content { }
.blog-article-content img { max-width: 100%; }
```

### 7. Integrate blog.js with window-manager
**File:** [js/window-manager.js](js/window-manager.js)

After mounting content for the `plugs` window, call `initBlog()` to load posts.

### 8. Add blog.js script to index.html
**File:** [index.html](index.html)

Add before app.js:
```html
<script src="js/blog.js"></script>
```

---

## Files to Modify
| File | Change |
|------|--------|
| `index.html` | Add marked.js CDN, add blog.js script, rewrite blog template |
| `js/config.js` | Increase blog window size |
| `css/main.css` | Add blog list and article styles |
| `js/window-manager.js` | Initialize blog when window opens |

## Files to Create
| File | Purpose |
|------|---------|
| `js/blog.js` | Blog list/article logic |
| `blog/posts.json` | Post metadata |
| `blog/example-post.md` | Sample post for testing |

---

## Step 9: Layout Fixes

### Issues Found
1. Giant H1 from markdown rendering (duplicate title effect)
2. Back button invisible against gray background
3. No white content area - inherited gray window background
4. Source link placement awkward without header context
5. No date shown in article view

### Solution Applied
Restructured article view with proper header section:
- `.blog-article-header` - Gray header with groove border containing back button, title, meta row
- `.blog-article-meta` - Flex row with date and source link
- `.blog-article-content` - White background, scrollable content area
- Constrained markdown h1/h2/h3 to 14px inside content
- Article view uses flexbox (header stays fixed, content scrolls)
- Markdown files no longer include H1 title (comes from posts.json)

### Files Modified
| File | Changes |
|------|---------|
| `index.html` | Added header wrapper, meta div with date span |
| `js/blog.js` | Added date population in openPost() |
| `css/main.css` | ~30 new lines for header/meta/flexbox layout |
| `blog/example-post.md` | Removed H1 title |

---

## Verification
1. Open the blog window from desktop icon
2. Verify post list loads with dates and descriptions
3. Click a post → article renders with markdown formatting
4. Verify images display correctly (add test image to example post)
5. Click back button → returns to list view
6. Test on mobile (tabs mode) to ensure it works
7. Add a second test post to verify list ordering
