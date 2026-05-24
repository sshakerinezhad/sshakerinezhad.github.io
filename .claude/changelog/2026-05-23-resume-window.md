# Remove Contact Window + Add Resume Window

## What Was Done

### Phase 1: Remove Contact Me Window
- Deleted `contact` entry from `CONFIG.windows` in `js/config.js`
- Deleted `<template id="mail-content">` from `index.html`
- Decided against adding a "Contact Me:" header label — social icons are self-explanatory

### Phase 2: Add Resume Window
- Added `resume` entry to `CONFIG.windows` (600×500, centered)
- Created `css/resume.css` with Win95-styled resume layout
- Added `<template id="resume-content">` with full resume content (Experience, Education, Skills)
- Added mobile responsive styles in `css/mobile.css` (role/date stacking, font scaling)
- Generated 48×48 pixel art document icon (`images/icons/resume.png`)
- PDF download button points to `resume/Tarek_Referal_Resume-1.pdf`

## Design Decisions
- **Single scroll layout** chosen over tabs or explorer view — resume content meant to be scanned quickly
- **No contact info bar** in resume — redundant with header socials
- **No Research/Projects sections** in resume — covered by their own windows on the site
- **Summary block** added at top (italic, light gray bg) for professional context
- **Navy blue section headers** (#000080) match Win95 title bar color
- **Skill tags** as gray pills — scannable, consistent with Win95 chrome
- **Mobile:** flex-direction column on entry headers, scaled fonts, tags wrap via flex-wrap

## Files Changed
| File | Change |
|------|--------|
| `js/config.js` | Removed contact config, added resume config |
| `index.html` | Removed mail template, added resume template + CSS link |
| `css/resume.css` | New file — all resume styles |
| `css/mobile.css` | Added resume responsive rules |
| `images/icons/resume.png` | New — generated pixel art document icon |
| `resume/Tarek_Referal_Resume-1.pdf` | User-provided PDF for download |
