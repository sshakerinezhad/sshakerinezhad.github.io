# Session Scratchpad

## Session Status: Planning Complete

---

## This Session's Work

### Reusable File Explorer - Planning

Planned a major refactor of the Projects window from a scrollable list to a Windows 95-style file explorer. Full plan saved to `.claude/masterplan.md`.

**Key architectural decisions made:**
1. **Reusable component** - FileExplorer module is generic, config-driven. Can power Projects, Artwork, or any future explorer window
2. **Separation of concerns** - JSON for metadata (fast), HTML files for content (fully flexible)
3. **Dynamic categories** - Derived from `tags[]` array, no hardcoded category list
4. **Detail view** - Full window (sidebar hides), content is pure HTML
5. **Mobile** - No sidebar, items grouped into sections by tag

**User requirements emphasized:**
- Clean, scalable, simple code only
- No band-aid solutions
- Human readable and modifiable
- Full flexibility in project detail content (not rigid schema)

---

## Next Steps

**Step 1: Foundation - Type System & Module Skeleton**
- Add `type` property support to window config
- Create `js/file-explorer.js` with basic structure
- Add type-based initialization in `window-manager.js`
- Deliverable: Console logs when explorer window opens

See `.claude/masterplan.md` for full 5-step plan.

---

## Key Files
| File | Status |
|------|--------|
| `.claude/masterplan.md` | Full plan saved |
| `js/config.js` | Will add `type`, `dataUrl` to projects window |
| `js/file-explorer.js` | To be created |
| `js/window-manager.js` | Will add type-based init |
| `data/projects.json` | To be created |
| `data/projects/*.html` | To be created |

---

## Reference
- Current window system: All windows use same config structure, content from `<template>` tags
- Blog module pattern: `Blog.init(container)` called from window-manager.js - this is the pattern to follow
- Architecture: See CLAUDE.md for config.js single-source-of-truth pattern
