# Plan: Standardize Project Detail View Headers

**Status: COMPLETED**

## Summary

Standardized project detail views to match the blog pattern where header metadata (title, date, links) comes from config rather than being embedded in each HTML file. Then aligned visual styling to match blog headers exactly.

## Changes Made

### 1. `data/projects.json`
Added `links` array to each project:
- `behavior-1k`: 3 links (Read the Report, Simulator Repo, Training Repo)
- `bardsong`: 1 link (Try it)
- `herbalism-tool`: 1 link (GitHub)
- `prosthetic`: no links
- `prompt-injection`: no links

### 2. `index.html`
Added header structure to the projects explorer template with meta wrapper for date+links:
```html
<div class="explorer-detail-header">
  <h1 class="explorer-detail-title"></h1>
  <div class="explorer-detail-meta">
    <span class="explorer-detail-date"></span>
    <div class="explorer-detail-links"></div>
  </div>
</div>
```

### 3. `js/file-explorer.js`
Updated `openDetail()` to populate header from config:
- Sets title from `item.title`
- Shows/hides date based on `item.date` (optional)
- Renders links with correct arrows (internal → vs external ↗)
- Uses null checks for backwards compatibility with books explorer

Added `formatDate()` helper matching the blog.js pattern.

### 4. `css/file-explorer.css`
Styled header elements to match blog styling:
- `.explorer-detail-header` - gray background (#c0c0c0), padding, groove border (matches blog)
- `.explorer-detail-title` - 32px font (matches blog), no bold
- `.explorer-detail-meta` - flex container for date+links on same line
- `.explorer-detail-date` - 11px, #404040 color (matches blog)
- `.explorer-detail-links` - `display: contents` to flow inline, monospace links

### 5. Project HTML Files
Simplified to body-only content:
- `behavior-1k.html` - Removed h1 title and project-links div
- `bardsong.html` - Removed project-links div
- `herbalism-tool.html` - Removed project-links div
- `prosthetic.html` - Already clean (no changes)
- `prompt-injection.html` - Already clean (no changes)

## Design Decisions

1. **No dates added** - Dates were optional per the plan and projects don't have clear dates. Kept it simple.

2. **Null checks in JS** - Allows the same FileExplorer code to work with both projects (has header) and books (no header).

3. **Link arrows** - Internal links use `→`, external links use `↗` matching existing site patterns.

4. **Visual alignment with blog** - Title size (32px), header background, date color, and date+links on same line all match blog styling for consistency.

## Verification

- JSON syntax validated
- JS syntax validated
- Books explorer unaffected (graceful degradation via null checks)
- Project headers now visually match blog headers

## Files Modified

1. `data/projects.json`
2. `index.html`
3. `js/file-explorer.js`
4. `css/file-explorer.css`
5. `data/projects/behavior-1k.html`
6. `data/projects/bardsong.html`
7. `data/projects/herbalism-tool.html`
