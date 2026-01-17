# Plan: Remove Duplicate Window Titles

## Problem
All windows display the title twice:
1. In the WinBox header bar (e.g., "About.exe")
2. Inside the window content as an `<h2>` tag

## Solution

### 1. Remove `<h2>` titles from window templates in [index.html](index.html)

Remove these lines:
- Line 57: `<h2>About.exe</h2>`
- Line 66: `<h2>Research & Projects</h2>`
- Line 108: `<h2>Shameless Plugs</h2>`
- Line 125: `<h2>Merlyn Labs</h2>`
- Line 141: `<h2>D&D Corner</h2>`

### 2. Enhance header bar title styling in [css/main.css](css/main.css)

Update `.winbox .wb-title` (lines 62-66) to add more emphasis:
- Increase font size from 12px to 13px
- Add letter-spacing for better readability
- The title is already bold, which is good

## Files to Modify
- `index.html` - Remove 5 `<h2>` tags from templates
- `css/main.css` - Enhance `.wb-title` styling

## Verification
- Open the site in a browser
- Click on each desktop icon (About, Projects, Plugs, Merlyn)
- Verify each window shows title ONLY in the header bar
- Verify the header bar title has good visual emphasis
