# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Everything should always be done cleanly, simply, and scalably. no spaghetti code!

Always ask yourself, is this the simplest solution? Will this cause problems down the line? Is this scalable?

## Project Overview

Personal portfolio website for Shayan Shakeri. GitHub Pages site with a Windows 95 aesthetic.

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
