# /light + /cream Redesign — PDF Design System

**Date:** 2026-07-13
**Source of truth:** `Pitchslide.pdf` (designer's logo pitch deck for pitchslides)
**Scope:** `app/light/globals.css` and `app/cream/globals.css` only. No markup changes. Main dark site untouched.

## Problem

The client rejected the current /light and /cream pages — the fonts and color application
don't read as the brand shown in the designer's PDF. The color *values* already match the
PDF palette, but the typefaces (Inter / Inter Tight / Cormorant Garamond serif) and the
timid color application (green only in small accents) don't.

## Typography

| Current | New | Used for |
|---|---|---|
| Inter Tight | Schibsted Grotesk | headlines, section titles, numbers, nav logo (PDF: Heuvel Grotesk) |
| Inter | Prompt (Light 300) | body, labels, forms (PDF: Sukhumvit Set Light — same foundry as Prompt) |
| Cormorant Garamond | removed | — |

- Google Fonts `@import` swapped in both globals.css files.
- Headlines: regular/medium weight, slight negative letter-spacing, no gradient text, no serif.
- Mono fonts unchanged.

## Color application (per PDF slides)

Palette (unchanged values): `#013531` deep green, `#F9F1CF` cream, `#EFEFEF` light grey,
`#FFEFAA` pale yellow accent, `#1A1A1A` ink, `#545454` / `#C6C6C6` greys.

- **Hero**: full-bleed `#013531` background, cream `#F9F1CF` headline/text (PDF opening slide).
- **Footer**: dark green with cream text.
- **Stat-band / results**: solid cream `#F9F1CF` section backgrounds.
- **Pricing**: featured card dark green, others light.
- **#FFEFAA**: thin accent lines/dividers only.
- `/light` keeps grey-primary base; `/cream` keeps cream-primary base (flip preserved).
- Contrast on green sections: cream on `#013531` (≈12:1, passes AA/AAA).

## Verification

Run dev server, screenshot `/light` and `/cream` (desktop + mobile), check console for
errors and confirm green sections render with readable contrast.
