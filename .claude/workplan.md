# Fix: FileExplorer folder clicks not working

## Problem

- Sidebar category buttons work (click → grid re-renders)
- Folder items don't respond to clicks
- No console errors
- FileExplorer.init() logs appear correctly
- Double-click shows text selection (browser default) but single click does nothing

## Diagnosis

The click handlers are attached in `renderGrid()` using the same pattern as sidebar, but folder clicks don't trigger `openDetail()`.

Possible causes:
1. Click handler not being attached (selector issue)
2. Handler runs but `openDetail()` fails silently (async Promise rejection)
3. Something prevents clicks from reaching the elements

## Fix Plan

### Step 1: Add debug logging to `renderGrid()`

In `js/file-explorer.js`, add console.log to verify click handlers are attached and triggered:

```javascript
renderGrid(container, items) {
  const grid = container.querySelector('.explorer-grid');

  // ... existing filter and render code ...

  // Add click handlers for non-coming-soon items
  const clickableItems = grid.querySelectorAll('.explorer-item:not(.coming-soon)');
  console.log('Attaching click handlers to', clickableItems.length, 'items');

  clickableItems.forEach(el => {
    el.addEventListener('click', () => {
      console.log('Folder clicked:', el.dataset.id);
      const id = el.dataset.id;
      const item = this.currentData.items.find(p => p.id === id);
      if (item) {
        this.openDetail(item);
      } else {
        console.error('Item not found for id:', id);
      }
    });
  });
}
```

### Step 2: Add error handling to click handler

Wrap `openDetail` call to catch async errors:

```javascript
el.addEventListener('click', async () => {
  console.log('Folder clicked:', el.dataset.id);
  const id = el.dataset.id;
  const item = this.currentData.items.find(p => p.id === id);
  if (item) {
    try {
      await this.openDetail(item);
    } catch (err) {
      console.error('openDetail failed:', err);
    }
  }
});
```

### Step 3: Verify with browser

After changes:
1. Hard refresh page
2. Open Projects window
3. Check console for "Attaching click handlers to X items"
4. Click a folder
5. Check console for "Folder clicked: [id]"

If "Attaching..." appears but "Folder clicked" doesn't appear on click:
- Something is intercepting clicks (CSS overlay, event capture)
- We'll add `pointer-events: auto` to `.explorer-item` as a safeguard

If both logs appear:
- The issue is in `openDetail()` - check for "openDetail failed" error

## Files to Modify

| File | Changes |
|------|---------|
| `js/file-explorer.js` | Add debug logging, async error handling |

## Verification

1. Open site with Live Server
2. Open Projects window
3. Console shows: "Attaching click handlers to 4 items"
4. Click folder → Console shows: "Folder clicked: behavior-1k"
5. Detail view opens (or error is logged)
