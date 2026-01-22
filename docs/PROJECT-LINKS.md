# Project Detail Header Links

## Overview

Project detail views display links in the header area (alongside the title and date). These links are rendered from the `links` array in `data/projects.json`.

---

## Data Structure

Each project in `data/projects.json` can have a `links` array:

```json
{
  "id": "behavior-1k",
  "title": "BEHAVIOR-1K",
  "links": [
    { "label": "Read the Report", "url": "https://example.com", "external": true },
    { "label": "GitHub", "url": "https://github.com/...", "external": true }
  ]
}
```

### Link Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | Display text for the link |
| `url` | string | Yes | The href destination |
| `external` | boolean | No | If true, opens in new tab with `↗` indicator |

---

## How Links Are Rendered

**File:** `js/file-explorer.js` (lines 129-135)

```javascript
const linksEl = this.container.querySelector('.explorer-detail-links');
if (linksEl) {
  linksEl.innerHTML = (item.links || []).map(link =>
    `<a href="${link.url}"${link.external ? ' target="_blank"' : ''}>${link.label}${link.external ? ' ↗' : ' →'}</a>`
  ).join('');
}
```

**Behavior:**
- Links array is optional - empty array or missing = no links shown
- External links get `target="_blank"` and display `↗` arrow
- Internal links display `→` arrow
- Links appear inline in the meta section (after the date)

---

## HTML Structure

**File:** `index.html` (template at lines 89-99)

```html
<div class="explorer-detail-header">
  <button class="explorer-back-btn">← Back</button>
  <h1 class="explorer-detail-title"></h1>
  <div class="explorer-detail-meta">
    <span class="explorer-detail-date"></span>
    <div class="explorer-detail-links"></div>  <!-- Links go here -->
  </div>
</div>
```

---

## CSS Styling

**File:** `css/file-explorer.css` (lines 154-178)

```css
.explorer-detail-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 11px;
  flex-wrap: wrap;
}

.explorer-detail-links {
  display: contents;  /* Links flow inline with date */
}

.explorer-detail-links a {
  font-family: monospace;
  color: #000080;        /* Win95 blue */
  text-decoration: none;
}

.explorer-detail-links a:hover {
  text-decoration: underline;
}
```

**Key styling choices:**
- `display: contents` makes links flow inline as siblings of the date
- Monospace font for a "clickable action" feel
- Navy blue (#000080) matches Win95 link color
- No underline by default, underline on hover

---

## Adding Links to a Project

Edit `data/projects.json`:

```json
{
  "id": "my-project",
  "title": "My Project",
  "links": [
    { "label": "Live Demo", "url": "https://demo.example.com", "external": true },
    { "label": "Source Code", "url": "https://github.com/...", "external": true },
    { "label": "Documentation", "url": "/docs/my-project", "external": false }
  ]
}
```

No code changes needed - just update the JSON.

---

## Comparison: Blog vs Project Links

| Aspect | Project Links | Blog Source Link |
|--------|---------------|------------------|
| Location | Header meta section | Header meta section |
| Count | Multiple allowed | Single optional link |
| Data source | `links` array in JSON | `source` field in JSON |
| Arrow style | `↗` external / `→` internal | `→` always |
| Font | Monospace | Default (MS Sans Serif) |

Blog uses a simpler model with just one optional "View original →" link, while projects support multiple links with external/internal distinction.
