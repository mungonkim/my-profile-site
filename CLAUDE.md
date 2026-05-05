# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Site

This is a static HTML/CSS/JavaScript site with no build process. Simply open `index.html` in a browser—no server required. For development:

- **Browser**: Open `index.html` directly (file:// protocol works fine)
- **Local server** (optional): `python -m http.server` or similar for better debugging
- **No dependencies**: Tailwind CSS loads from CDN; everything else is vanilla JS

## Architecture

The site is intentionally simple—single HTML file with two companion folders:

- **index.html**: All markup. Uses Tailwind CSS (CDN) + custom `css/styles.css`
- **css/styles.css**: Custom styles for interactive UI (edit mode borders, modals, animations, hover effects)
- **js/script.js**: All application logic—no external frameworks

**Data Flow:**
1. `DEFAULT_DATA` (hardcoded in JS) contains initial portfolio content
2. On load, `loadData()` pulls from localStorage; falls back to defaults if first visit
3. `renderPage(data)` populates all elements from the data object
4. Edit mode uses inline `contentEditable` + modals for complex fields
5. Save triggers `collectEditableText()` to sync changes back to the data object, then `saveData()` to localStorage

## Edit Mode & Password

- Password is stored in localStorage (`portfolio_password` key). Default: `"portfolio2024"`
- Edit mode is triggered by clicking the floating edit button, which shows a password modal
- Once in edit mode:
  - All `[data-editable]` elements become `contentEditable`
  - Skill tags get delete buttons and an add button
  - Project cards get edit modals for structured fields (title, description, tags, link)
  - GitHub/LinkedIn URLs get text inputs (since they're not directly editable)
- Exiting edit mode without saving discards changes (stored in `snapshotData`)

## Key Implementation Details

**Editable Elements**: Mark any text/content with `data-editable` attribute to make it inline-editable. The edit mode code automatically finds these and enables `contentEditable`.

**Skills**: Frontend and backend skill lists use dynamic rendering with edit controls (delete button, add new). Changes only persist on save.

**Projects**: Project array is rendered as cards. Editing opens a modal dialog to avoid messy inline editing of complex fields. Tags are managed separately in `modalTags`.

**Contact Links**: Email, GitHub, and LinkedIn are editable. GitHub and LinkedIn also have URL fields (since the display text is separate from the URL).

**Modal System**: Custom modals (password, project edit, password change) use CSS overlays + `.hidden` class toggling. No external modal library.

## Styling Notes

- Tailwind CSS provides all utility classes; custom CSS in `styles.css` adds:
  - `.edit-mode` class toggles on body to show edit-specific styles (dashed borders, hover states)
  - Navigation link underline animation (`.nav-link::after`)
  - Project card hover effect (slight lift + shadow)
  - Skill tag scale and glow on hover
  - Edit toolbar and floating button styles
  - Modal and form styling
