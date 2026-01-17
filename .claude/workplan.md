# Phase 2: Window System - Implementation Plan

## Goal
Add all 5 windows with real content, cascading positions, and polished styling.

---

## Windows to Create

| ID | Title | Position | Size | Opens on Load | Content |
|----|-------|----------|------|---------------|---------|
| `about` | About.exe | x:80, y:60 | 420×300 | Yes | Intro, personality |
| `projects` | Research & Projects | x:140, y:100 | 500×400 | Yes | 5 projects with descriptions |
| `plugs` | Shameless Plugs | x:200, y:140 | 400×320 | No | Links to LessWrong, writing |
| `merlyn` | Merlyn Labs | x:260, y:180 | 480×380 | No | Robotics work, VLA research |
| `dnd` | D&D Corner | x:320, y:220 | 450×350 | **HIDDEN** | Easter egg - DM experience |

**Cascade pattern**: Each window +60x, +40y from previous for nice stacking.

**Note**: D&D Corner is now the Easter egg (hidden). Merlyn Labs is a normal window.

---

## Files to Modify

### 1. `js/config.js`
Add all 5 window definitions with:
- Cascading x/y positions
- Appropriate sizes for content
- `hidden: true` flag for Merlyn Labs (Phase 4 will handle reveal)

### 2. `index.html`
Add 4 new `<template>` elements:
- `#projects-content` — Research & Projects
- `#dnd-content` — D&D Corner
- `#plugs-content` — Shameless Plugs
- `#merlyn-content` — Hidden Merlyn Labs

### 3. `css/main.css`
Add content styling for:
- Project cards/list items
- Links with hover states
- Section headers
- Consistent spacing

---

## Content Details

### About.exe (already exists, minor polish)
```
Hey, I'm Shayan Shakeri.

AI/robotics researcher, MEng at University of Toronto,
and nearly decade-long D&D dungeon master.

I build things that think, move, and occasionally roll natural 20s.
```

### Research & Projects
```
BEHAVIOR-1K
8th place in Stanford BEHAVIOR challenge. Embodied AI benchmark.
→ merlyn-labs.com/behavior-report
→ github.com/Merlyn-Labs/BEHAVIOR-1K
→ github.com/Merlyn-Labs/openpi

BardSong
D&D AI companion tool for DMs and players.
→ mythos-ten.vercel.app

Herbalism-tool
D&D 5e character tracker for the Elros Player's Guide homebrew.
Tracks foraging, elixir brewing, and recipe management.
→ github.com/sshakerinezhad/herbalism-tool

Voice-Controlled Prosthetic
ML pipeline for transhumeral arm prosthetics. Uses LLM for
natural language commands, computer vision for object detection,
and inverse kinematics for control. MEng research at UofT.
(No link yet)

Prompt Injection Monitor [COMING SOON]
Security tool for LLM applications.
(No link yet)
```

### Shameless Plugs
```
Things I've written:

• LessWrong Post
  [Link to lesswrong.com/posts/4p2HBMxCkh7pZ3xCa]

• Merlyn Labs Blog
  [Link to merlyn-labs.com if public]

• Other writing...
```

### Merlyn Labs (Normal window)
```
Welcome to Merlyn Labs.

Current work:
• Vision-Language-Action models for robotics
• Embodied AI research
• Building robots that actually work

→ merlyn-labs.com
```

### D&D Corner (HIDDEN - Easter Egg)
```
~10 years behind the DM screen.

I run campaigns that blend tactical combat with
narrative drama. Heavy worldbuilding, memorable NPCs,
and the occasional TPK when the dice demand it.

Triggered by: Konami code or typing "dragon" anywhere
```

---

## CSS Additions

```css
/* === Content Components === */

/* Project list */
.project-item {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #808080;
}

.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.project-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.project-desc {
  font-size: 12px;
  color: #404040;
}

.coming-soon {
  color: #808080;
  font-style: italic;
}

/* Links */
.window-content a {
  color: #0000ff;
  text-decoration: underline;
}

.window-content a:hover {
  color: #ff0000;
}

.window-content a:visited {
  color: #800080;
}

/* Link list */
.link-item {
  margin-bottom: 12px;
}

.link-item a {
  display: block;
  font-weight: bold;
}

.link-desc {
  font-size: 11px;
  color: #404040;
  margin-top: 2px;
}
```

---

## Implementation Steps

1. **Update `js/config.js`**
   - Add 4 new window configs (projects, plugs, merlyn, dnd)
   - Set `openOnLoad: true` for projects
   - Set `hidden: true` for dnd (Easter egg)

2. **Update `index.html`**
   - Add 4 new `<template>` elements with content
   - Use semantic HTML within templates
   - Add real links to all projects

3. **Update `css/main.css`**
   - Add project-item styles
   - Add link styles
   - Add coming-soon styles

4. **Update `js/window-manager.js`**
   - Skip windows with `hidden: true` in auto-open logic
   - (No other changes needed - architecture handles it)

---

## Verification

1. **Open index.html in browser**
   - About.exe and Research & Projects open automatically
   - D&D Corner and Shameless Plugs stay closed

2. **Test window opening via console**
   - `wm.open('plugs')` → Shameless Plugs opens
   - `wm.open('merlyn')` → Merlyn Labs opens
   - `wm.open('dnd')` → Should NOT work (hidden Easter egg)

3. **Visual check**
   - Windows cascade nicely
   - Content is readable
   - Links are clickable and styled

4. **Responsive check**
   - Windows don't overlap awkwardly on smaller screens
   - Content scrolls if needed

---

## Questions for User

None - content requirements are clear from the brief. Will use placeholder text for projects without descriptions.
