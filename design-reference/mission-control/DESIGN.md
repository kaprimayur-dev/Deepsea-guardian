---
name: Abyssal Intelligence
colors:
  surface: '#081517'
  surface-dim: '#081517'
  surface-bright: '#2e3c3d'
  surface-container-lowest: '#041012'
  surface-container-low: '#101e1f'
  surface-container: '#142224'
  surface-container-high: '#1f2c2e'
  surface-container-highest: '#2a3739'
  on-surface: '#d6e5e7'
  on-surface-variant: '#c3c7c8'
  inverse-surface: '#d6e5e7'
  inverse-on-surface: '#253334'
  outline: '#8d9192'
  outline-variant: '#434748'
  surface-tint: '#c1c8c9'
  primary: '#c1c8c9'
  on-primary: '#2b3233'
  primary-container: '#020607'
  on-primary-container: '#72797a'
  inverse-primary: '#586061'
  secondary: '#bcc8d2'
  on-secondary: '#26323a'
  secondary-container: '#3f4b53'
  on-secondary-container: '#aebac4'
  tertiary: '#6fd6e0'
  on-tertiary: '#00363b'
  tertiary-container: '#000708'
  on-tertiary-container: '#00858e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde4e5'
  primary-fixed-dim: '#c1c8c9'
  on-primary-fixed: '#161d1e'
  on-primary-fixed-variant: '#414849'
  secondary-fixed: '#d8e4ee'
  secondary-fixed-dim: '#bcc8d2'
  on-secondary-fixed: '#111d24'
  on-secondary-fixed-variant: '#3c4850'
  tertiary-fixed: '#8df2fc'
  tertiary-fixed-dim: '#6fd6e0'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f55'
  background: '#081517'
  on-background: '#d6e5e7'
  surface-variant: '#2a3739'
  deep-teal: '#184C59'
  status-warning: '#F2C94C'
  status-critical: '#EB5757'
typography:
  display-lg:
    fontFamily: Chivo
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 110px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Chivo
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Chivo
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  narrative-id:
    fontFamily: Archivo Narrow
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.3em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  metadata:
    fontFamily: Archivo Narrow
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  label:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style
The design system is engineered for a high-stakes, scientific environment where ocean data meets mission-critical intelligence. The brand personality is mysterious yet precise, evoking the feeling of a sophisticated command center located miles beneath the surface. It targets environmental scientists, marine logistics operators, and global conservationists who require a tool that feels as serious as the challenges they face.

The visual style is a fusion of **Minimalism** and **Modern Corporate**, elevated by an **Editorial** approach. It utilizes extreme scale contrast—pairing massive, confident headlines with minute, technical metadata. The interface prioritizes immersion through "Abyssal" dark modes, using generous negative space to allow data points to breathe, much like a solitary research vessel in the vast ocean. Every element is disciplined by a rigorous 12-column grid, ensuring that even the most complex data visualizations feel structured and intentional.

## Colors
This design system operates exclusively in a dark mode palette to reduce eye strain in mission control environments and to honor the "Abyssal" aesthetic. 

- **Abyss Black (#020607):** The primary canvas. It should feel infinite, providing the foundation for all storytelling.
- **Deep Ocean Blue (#07131A):** Used for elevated surfaces, such as mission cards or sidebar panels, to provide subtle depth without breaking the dark immersion.
- **Cold Off-White (#E7F6F8):** The primary typographic color, chosen for its high legibility against the dark background while avoiding the harshness of pure white.
- **Ocean Cyan (#77DDE7):** The "Pulse" of the system. Use this sparingly for interactive nodes, active data streams, and primary CTAs.
- **Deep Teal (#184C59):** Reserved for structural elements like grid lines, borders, and inactive UI states.

## Typography
The typographic hierarchy is built on extreme contrast. **Chivo** provides a sharp, confident voice for large-scale editorial statements. **Hanken Grotesk** offers a refined, modern professional feel for body content, ensuring readability of complex intelligence reports. 

**Archivo Narrow** is the "Technical Voice." It is used for all annotations, coordinates, and metadata. To achieve the mission-control aesthetic, metadata and narrative IDs should always be set in uppercase with increased letter-spacing. Use the `display-lg` size for opening narrative sections, ensuring they span multiple columns to create an asymmetric, editorial pace.

## Layout & Spacing
The layout follows a strict 12-column fluid grid for desktop, transitioning to 4 columns for mobile. 

- **Asymmetry:** Avoid centered layouts. Align content to the left or right edges of the grid to create dynamic, editorial compositions.
- **Negative Space:** Use a significant vertical rhythm. Sections should be separated by a minimum of `160px` to emphasize the "vastness" of the ocean.
- **Annotations:** Technical annotations (coordinates/timestamps) should be positioned using absolute coordinates relative to their parent container, often breaking the standard grid to feel like "floated" intelligence.
- **Margins:** Desktop margins are intentionally wide (64px) to frame the content as if viewed through a specialized portal.

## Elevation & Depth
Depth is created through **Tonal Layers** rather than shadows. In a light-less environment like the deep sea, shadows are secondary to luminance.

- **Background:** Abyss Black (#020607).
- **Surface Level 1:** Deep Ocean Blue (#07131A) panels with no shadows.
- **Interactivity:** Elements gain "elevation" by increasing their border opacity or switching from Deep Teal to Ocean Cyan.
- **Borders:** Use 1px solid borders using Deep Teal (#184C59) for structural separation. These should feel like hairline glass etchings.
- **Backdrop:** For modal overlays, use a heavy backdrop blur (20px) with a 60% opacity Abyss Black tint to maintain the immersive feel.

## Shapes
The shape language is **Sharp (0)**. There are no rounded corners in this design system. Every element—from buttons to cards to input fields—must feature hard 90-degree angles. This reinforces the scientific, technical, and "unfiltered" nature of the intelligence platform. High-precision instruments do not have soft edges; neither does this UI.

## Components
### Buttons & CTAs
Buttons are strictly rectangular. The "System-Command CTA" features a Deep Teal border that transitions to Ocean Cyan on hover. Text is always uppercase Archive Narrow.
- **Example:** `[ ENTER MISSION CONTROL → ]`
- **Ghost state:** No background, 1px Cyan border, Cyan text.

### Narrative Identifiers
Used at the start of new data chapters. A small "01" in metadata style, followed by a thin horizontal Deep Teal line that spans 2 grid columns, leading into the Display headline.

### Intelligence Annotations
Small, floating text blocks used for data points. They consist of a 1px Cyan dot connected by a 1px Teal line to the metadata text (coordinates, severity levels).

### Input Fields
Restrained and minimal. No background fill—only a bottom border (1px Deep Teal). When focused, the border becomes Ocean Cyan. Labels are always visible, placed above the input in the `label` typographic style.

### Cards (Narrative Cards)
Avoid generic cards. "Cards" in this system are defined by their content and a single vertical or horizontal Deep Teal line. They should feel like pieces of a larger dossier rather than isolated containers.

### Navigation
A minimal top-fixed bar with zero background. Links are Archive Narrow, uppercase, with significant tracking. The navigation should feel like a HUD (Heads-Up Display) overlaying the content.