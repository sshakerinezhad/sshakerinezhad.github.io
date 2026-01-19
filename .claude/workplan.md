# Step 5: FileExplorer Polish & Mobile

## Summary

Add mobile responsiveness and improved desktop interactions to the FileExplorer component.

---

## Changes

### 1. Mobile Styles (css/file-explorer.css)

Add media query for 480px breakpoint:

```css
@media (max-width: 480px) {
  .explorer-sidebar {
    width: 100px;      /* shrink from 120px */
    padding: 4px;
  }

  .explorer-filter {
    font-size: 11px;
    padding: 4px 6px;
  }

  .explorer-detail-view {
    padding: 8px;      /* tighter padding on mobile */
  }
}
```

### 2. Desktop Hover/Selection States (css/file-explorer.css)

Replace subtle hover with Windows 95-style selection:

```css
/* Current - subtle */
.explorer-item:hover {
  background: rgba(0, 0, 128, 0.1);
}

/* New - Windows 95 style */
.explorer-item:hover {
  background: #000080;
  color: #ffffff;
}

.explorer-item:hover .explorer-item-title {
  color: #ffffff;
}
```

Add dotted focus outline for keyboard navigation:

```css
.explorer-item:focus {
  outline: 1px dotted #000;
  outline-offset: -1px;
}
```

### 3. Remove unused `thumbnail` field (data/projects.json)

The `thumbnail` field exists in the JSON but is never used. Remove it to avoid confusion.

- `icon` = folder icon in grid view (keep)
- `thumbnail` = unused, remove

---

## Files to Modify

| File | Changes |
|------|---------|
| `css/file-explorer.css` | Add mobile media query, update hover styles |
| `data/projects.json` | Remove unused `thumbnail` field from all items |

---

## Verification

1. **Desktop hover:**
   - Open Projects window
   - Hover over folder → should turn blue with white text
   - Move mouse away → returns to normal

2. **Mobile (use DevTools responsive mode at 480px):**
   - Sidebar should be narrower (100px)
   - Grid items should still be clickable
   - Detail view should be full-width and scrollable

3. **No regressions:**
   - Click folder → detail view opens
   - Click "← Back" → returns to grid
   - Sidebar filters still work
   - No console errors
