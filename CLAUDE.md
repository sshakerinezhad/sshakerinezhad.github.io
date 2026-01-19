# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Everything should always be done cleanly, simply, and scalably. no spaghetti code!

Always ask yourself, is this the simplest solution? Will this cause problems down the line? Is this scalable?

Golden Rules
- THe best solution is the simplest solution.
- NOTHING should be a bandaid or spaghetti.
- all code should be industry standard and scalable ALWAYS
- The WHY is as important as the WHAT. When making decisions and creating/modifying documentation, always include the reasoning behind things.
- when implementing an existing plan, do a second pass and critique it. Does it make sense? is it the best/simplest solution? and what could go wrong?
- before adding new features or changing existing ones, consider how these changes will interact with the existing system. If it will introduce inefficiencies, scalability issues, or bloat, reassess.

## Project Overview

Personal portfolio website for Shayan Shakeri. GitHub Pages site with a Windows 95 aesthetic.

## Tech Stack

This is a static GitHub Pages site using plain HTML/CSS/JS with CDN-hosted libraries (98.css, WinBox.js, Font Awesome). No build step — just push and deploy.

## Session Management

- `.claude/masterplan.md` - Long-term multi-step plans spanning multiple sessions
- `.claude/workplan.md` - Current work section to execute over 1-2 sessions
- `.claude/scratchpad.md` - Session context to carry forward

Use `/handoff` at the end of a session to capture context for the next session.

## Documenting Changes

When working through OR writing plans, capture context alongside progress:
- **Why** decisions were made (not just what was done)
- **Gotchas** encountered and how they were resolved
- **Bugs** that arose during implementation
- **Mistakes** made and corrections applied

Update the active workplan.md and scratchpad.md with this context as you work. This ensures reasoning is preserved with the plan, not lost in commit messages.

## Learning from History

Before starting significant work:
- Check `.claude/changelog/` for relevant past project decisions
- Use `git log --oneline -20` to see recent changes
- Use `git log -p <file>` to understand why a specific file evolved

When something seems oddly implemented, assume there was a reason - check history before "fixing" it.

## Architecture: Single Source of Truth

All window/icon configuration lives in `js/config.js`:

- **`CONFIG.windows`** - All windows with their display properties (icon, label, size, position, showInUI)
- **`CONFIG.socials`** - Social links shown in header
- Order in config = order on screen
- `showInUI: false` hides a window from all UI (for easter eggs)

**Files that should never need editing for common tasks:**
- `desktop-icons.js`, `mobile-nav.js`, `taskbar.js`, `window-manager.js`

**Common edits happen in only 2 files:**
- `js/config.js` - Add/remove/reorder windows, change icons, sizes
- `index.html` - Change window content (via `<template>` tags)

## Skills

When working on specialized tasks, check `.claude/skills/` for relevant domain expertise based on each skill's triggers:
- for ui: `.claude/skills/ui-design.md`
- for new window creation, management, or creation of new window types: `.claude/skills/window-system.md`

## Local Testing

Use Live Server extension or `python -m http.server` — `fetch()` doesn't work with `file://`. Disable cache in DevTools if changes don't appear.
