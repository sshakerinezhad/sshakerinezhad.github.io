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
      "thumbnail": "images/projects/behavior-thumb.png",  // optional
      "icon": null,                          // null = default folder
      "contentFile": "data/projects/behavior-1k.html"     // detail content
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

### Step 1: Foundation - Type System & Module Skeleton
- Add `type` property support to window config system
- Create `js/file-explorer.js` with basic structure
- Add type-based initialization in `window-manager.js`
- **Deliverable:** Console logs when explorer window opens

### Step 2: Data Layer
- Create `data/projects.json` with metadata (id, title, summary, tags, thumbnail, icon, contentFile)
- Create `data/projects/` folder with HTML files for each project
- Migrate current projects: metadata → JSON, content → individual HTML files
- FileExplorer fetches JSON on init, extracts unique tags for categories
- **Deliverable:** Data loads, categories derived from tags, logged to console

### Step 3: Explorer View - Template & CSS
- Create generic explorer template in index.html
- Create `css/file-explorer.css` (sidebar + grid layout)
- FileExplorer renders categories and folder grid
- **Deliverable:** Visual explorer with clickable folders (no navigation yet)

### Step 4: Detail View
- Add detail view template structure
- Implement show/hide navigation between views
- Sidebar hidden in detail view, back button visible
- **Deliverable:** Full navigation working

### Step 5: Polish & Mobile
- **Mobile explorer:** No sidebar. Items grouped by tag as sections (Robotics section, D&D section, etc.)
- **Mobile detail:** Full-width, scrollable
- Hover/selection states (desktop)
- Edge cases (empty categories, missing thumbnails, etc.)

---

## Files

| File | Action | Purpose |
|------|--------|---------|
| `js/config.js` | MODIFY | Add `type`, `dataUrl` to projects window |
| `js/file-explorer.js` | CREATE | Generic reusable explorer module |
| `js/window-manager.js` | MODIFY | Type-based initialization |
| `data/projects.json` | CREATE | Project metadata index |
| `data/projects/*.html` | CREATE | Individual project detail content |
| `index.html` | MODIFY | Generic explorer template, link CSS |
| `css/file-explorer.css` | CREATE | Explorer styling |

---

## Design Decisions
- **Reusable:** FileExplorer is generic, config-driven. Same code for Projects, Artwork, etc.
- **Separation:** JSON = metadata (fast), HTML = content (flexible, loaded on-demand)
- **Dynamic categories:** Derived from `tags[]` - no hardcoded category list
- **Detail view:** Full window (sidebar hides), content is pure HTML (full flexibility)
- **Desktop sidebar:** Simple tag list, "All" + unique tags from projects
- **Mobile:** No sidebar, items grouped into sections by tag
- **Icons:** Default folder + optional per-project custom icon
- **No magic:** Everything explicit in config

---

## Verification
After each step:
1. Open site with Live Server
2. Open Projects window
3. Check console for errors
4. Verify expected behavior
