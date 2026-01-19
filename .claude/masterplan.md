# Plan: Books Window

## Status: Phase 1 Complete, Phase 2 Planned

## Phase 1: Basic Setup [COMPLETE]
- [x] Add window config to `js/config.js`
- [x] Add template to `index.html`
- [x] Link `css/books.css`
- [x] Create `data/books.json` with 7 Horus Heresy entries
- [x] Create `data/books/` directory with 7 detail HTML files
- [x] Create `images/books/covers/` and `images/books/misc/` directories

### Files Created
- `css/books.css`
- `data/books.json`
- `data/books/horus-rising.html`
- `data/books/false-gods.html`
- `data/books/galaxy-in-flames.html`
- `data/books/flight-of-the-eisenstein.html`
- `data/books/fulgrim.html`
- `data/books/descent-of-angels.html`
- `data/books/legion.html`

### Files Modified
- `js/config.js` - Added books window config
- `index.html` - Added books template and CSS link

## Phase 2: Detail View Polish [PLANNED]
See `.claude/workplan.md` for full implementation details.

- [ ] Establish base heading scale in `css/main.css` (fixes site-wide h3 > h2 bug)
- [ ] Add `books-explorer` class to template for icon sizing
- [ ] Book covers show at correct aspect ratio (not squished)
- [ ] Title and author on same line
- [ ] Numeric star rating (★ X.X/5)
- [ ] Quote section with attribution

### Why These Changes
- **Heading bug**: `.window-content h2` was 14px but h3 had no rule, defaulting to browser (~19px)
- **Icon squishing**: `.explorer-item-icon` forces 48x48 square; books need taller aspect ratio
- **Kept simple**: Numeric rating for now instead of complex star images; can upgrade later

## Remaining
- [ ] User adds cover images to `images/books/covers/`
- [ ] User adds `images/icons/books.png` (currently using Myst.png)
- [ ] User fills in ratings, quotes, and thoughts in detail HTML files
