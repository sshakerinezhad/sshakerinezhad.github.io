# Reusable File Explorer - Master Plan

Create a **generic, reusable** file explorer component that can power any window (Projects, Artwork, etc.) with category filtering and detail views.

---

## Core Principle

**Configuration over code.** The FileExplorer module is generic. Window-specific behavior comes from config, not hardcoded logic.

---

## Architecture Overview

### Explorer View (sidebar + folder grid)
```
┌─────────────────────────────────────────────────┐
│ Research & Projects                    [─][□][×]│
├──────────┬──────────────────────────────────────┤
│ Sidebar  │  Main Content Area                   │
│          │                                      │
│ • All    │  [📁]     [📁]     [📁]             │
│ • Robots │  BEHAV..  BardSong Herbal..          │
│ • D&D    │                                      │
│          │  [📁]     [📁]                       │
│          │  Prosth.. Prompt..                   │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### Detail View (full window, no sidebar)
```
┌─────────────────────────────────────────────────┐
│ Research & Projects                    [─][□][×]│
├─────────────────────────────────────────────────┤
│ [← Back]                                        │
│                                                 │
│ BEHAVIOR-1K                                     │
│ ───────────────────────────────────────         │
│ [image/screenshot]                              │
│                                                 │
│ 8th place in Stanford BEHAVIOR challenge...    │
│                                                 │
│ Tags: robotics, AI, competition                 │
│ Links: [Report] [GitHub] [OpenPI]               │
└─────────────────────────────────────────────────┘
```

---

## How It Works

### 1. Window config declares explorer type
```javascript
// js/config.js
projects: {
  id: 'projects',
  title: 'Research & Projects',
  type: 'explorer',           // ← triggers FileExplorer
  dataUrl: 'data/projects.json',
  // ... other window props
}
```

### 2. FileExplorer reads data from JSON + HTML

**JSON = metadata index (lightweight)**
```javascript
// data/projects.json
{
  "items": [
    {
      "id": "behavior-1k",
      "title": "BEHAVIOR-1K",
      "summary": "8th place in Stanford BEHAVIOR challenge...",
      "tags": ["Robotics", "AI"],           // ← drives categories dynamically
      "icon": null,                          // null = default folder
      "contentFile": "data/projects/behavior-1k.html",
      "status": "published"                  // "published" | "coming-soon"
    }
  ]
}
```

**HTML = full detail content (loaded on-demand)**
```html
<!-- data/projects/behavior-1k.html -->
<div class="project-detail">
  <img src="images/projects/behavior-hero.png" class="project-hero">

  <p>8th place in Stanford BEHAVIOR challenge. Embodied AI benchmark...</p>

  <h3>Technical Approach</h3>
  <p>We used OpenPI for policy learning...</p>

  <!-- Full flexibility - any HTML you want -->
  <div class="project-links">
    <a href="...">Report</a>
    <a href="...">GitHub</a>
  </div>
</div>
```

**Categories derived from tags** - no hardcoded list. Sidebar/sections auto-populate from unique tags across all projects.

### 3. WindowManager checks type and initializes
```javascript
// js/window-manager.js (in open method)
if (config.type === 'explorer') {
  FileExplorer.init(container, config);
}
```

## Step-by-Step Plan

### Step 1: Foundation - Type System & Module Skeleton ✓
- [x] Add `type` property support to window config system
- [x] Create `js/file-explorer.js` with basic structure
- [x] Add type-based initialization in `window-manager.js`
- **Deliverable:** Console logs when explorer window opens

**Implementation Notes:**
- **Why generic `initWindowType()`**: Instead of adding more `if (id === 'xxx')` checks, we created a modules lookup object. Adding new types only requires adding to the object - no new conditionals.
- **Blog migrated**: Added `type: 'blog'` to plugs config so both Blog and FileExplorer use the same init pattern.
- **Config passed to init**: `module.init(container, config)` passes the full config object, allowing FileExplorer to access `dataUrl` in Step 2.

### Step 2: Data Layer ✓
- [x] Create `data/projects.json` with metadata (id, title, summary, tags, thumbnail, icon, contentFile)
- [x] Create `data/projects/` folder with HTML files for each project
- [x] Migrate current projects: metadata → JSON, content → individual HTML files
- [x] FileExplorer fetches JSON on init, extracts unique tags for categories
- **Deliverable:** Data loads, categories derived from tags, logged to console

**Implementation Notes:**
- **Schema addition:** Added `status` field ("published" | "coming-soon") to enable data-driven styling instead of CSS classes
- **5 unique tags derived:** AI, D&D, ML, Robotics, Security - categories auto-populate via `extractCategories()`
- **Config addition:** `dataUrl: 'data/projects.json'` added to projects config

### Step 3: Explorer View - Template & CSS ✓
- [x] Create generic explorer template in index.html
- [x] Create `css/file-explorer.css` (sidebar + grid layout)
- [x] FileExplorer renders categories and folder grid
- **Deliverable:** Visual explorer with clickable folders (no navigation yet)

**Implementation Notes:**
- Template replaced hardcoded projects list with dynamic explorer structure
- Sidebar filter buttons with click handlers for category filtering
- Grid renders folder icons with titles, respects `status: coming-soon` for grayed-out items

### Step 4: Detail View ✓
- [x] Add detail view template structure
- [x] Implement show/hide navigation between views
- [x] Sidebar hidden in detail view, back button visible
- [x] Load HTML content from `contentFile` on folder click
- **Deliverable:** Full navigation working (list → detail → back)

**Implementation Notes:**
- CSS uses `.detail-active` class on container to toggle visibility
- Click handlers only on non-coming-soon items
- `openDetail()` fetches HTML and shows view, `closeDetail()` hides it
- Error handling shows "Failed to load content" message on fetch failure

**Bug Fix - Detail view not showing:**
- **Symptom:** Clicking folders did nothing visible despite click handlers firing
- **Root cause:** `this.container` stored WindowManager's wrapper div, but CSS selectors expected `.explorer-container.detail-active`
- **Fix:** Changed `this.container = container;` to `this.container = container.querySelector('.explorer-container');`
- **Gotcha:** WindowManager passes a wrapper div to module init, not the actual template content. Modules should query for their root element.

### Step 5: Polish & Mobile ✓
- [x] **Mobile styles:** Narrower sidebar (100px), tighter padding at 480px breakpoint
- [x] **Mobile detail:** Full-width with tighter padding
- [x] **Desktop hover:** Windows 95 style blue selection with white text
- [x] **Keyboard focus:** Dotted outline for accessibility
- [x] **Cleanup:** Removed unused `thumbnail` field from JSON schema

**Implementation Notes:**
- Mobile keeps sidebar (narrower) rather than section grouping - simpler implementation, still functional
- Focus state added for keyboard navigation accessibility

---

## Files

| File | Action | Status |
|------|--------|--------|
| `js/config.js` | MODIFY | ✓ Added `type: 'explorer'`, `dataUrl` to projects; `type: 'blog'` to plugs |
| `js/file-explorer.js` | CREATE | ✓ Full navigation: openDetail(), closeDetail(), click handlers |
| `js/window-manager.js` | MODIFY | ✓ Added generic `initWindowType()` method |
| `index.html` | MODIFY | ✓ Script tag + explorer template |
| `data/projects.json` | CREATE | ✓ Metadata index with 5 projects |
| `data/projects/*.html` | CREATE | ✓ 5 detail content files |
| `css/file-explorer.css` | CREATE | ✓ Sidebar + grid + detail view styles |

---

## Design Decisions
- **Reusable:** FileExplorer is generic, config-driven. Same code for Projects, Artwork, etc.
- **Separation:** JSON = metadata (fast), HTML = content (flexible, loaded on-demand)
- **Dynamic categories:** Derived from `tags[]` - no hardcoded category list
- **Detail view:** Full window (sidebar hides), content is pure HTML (full flexibility)
- **Desktop sidebar:** Simple tag list, "All" + unique tags from projects
- **Mobile:** Narrower sidebar (100px), tighter padding at 480px breakpoint
- **Icons:** Default folder + optional per-project custom icon
- **No magic:** Everything explicit in config

---

## Verification
After each step:
1. Open site with Live Server
2. Open Projects window
3. Check console for errors
4. Verify expected behavior
