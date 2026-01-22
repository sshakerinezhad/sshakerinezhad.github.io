# Guide: Adding Windows with Detail Views

## Quick Reference

### Adding a Basic Window

**1. `js/config.js`** - Add entry to `CONFIG.windows`:
```javascript
mywindow: {
  id: 'mywindow',
  title: 'My Window',
  label: 'My Window',
  icon: 'images/icons/myicon.png',
  width: 600,
  height: 400,
  x: 'center',
  y: 'center',
  contentId: 'mywindow-content',
  showInUI: true
}
```

**2. `index.html`** - Add template:
```html
<template id="mywindow-content">
  <div class="window-content">
    Your content here
  </div>
</template>
```

Done. Desktop icon, taskbar entry, and window all work automatically.

---

### Adding a List → Detail Window

Use the unified `detail-view` component for any window that shows a list/grid and opens items into a detail view.

**Template structure:**
```html
<template id="mywindow-content">
  <div class="window-content my-container">
    <!-- LIST VIEW (default) -->
    <div class="detail-list-view">
      <div class="my-list"><!-- Items go here --></div>
    </div>

    <!-- DETAIL VIEW (hidden until activated) -->
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

**JS to toggle views:**
```javascript
// Show detail
container.querySelector('.detail-title').textContent = item.title;
container.querySelector('.detail-date').textContent = item.date;
container.querySelector('.detail-content').innerHTML = itemContent;
container.querySelector('.my-container').classList.add('detail-active');

// Back to list
container.querySelector('.my-container').classList.remove('detail-active');
```

**That's it.** The CSS in `detail-view.css` handles all styling and show/hide logic.

---

### Variations

| Type | Header | Example |
|------|--------|---------|
| Full header | Title + date + links | Projects, Blog |
| Minimal | Just back button + content | Books |

For minimal (no header), omit `.detail-header`:
```html
<div class="detail-view">
  <button class="detail-back-btn">← Back</button>
  <div class="detail-content"></div>
</div>
```

---

### Key Files

| File | Purpose |
|------|---------|
| `js/config.js` | Window definitions (the only config file) |
| `index.html` | Templates for window content |
| `css/detail-view.css` | All detail-view styling |
| `js/blog.js` | Example: simple list → detail |
| `js/file-explorer.js` | Example: grid + filters → detail |
