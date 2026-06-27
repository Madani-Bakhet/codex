# Codex: UI & Design Conventions

## 1. Design Philosophy
The Codex landing page embodies a **sleek, cyber/tech aesthetic**. The design should evoke a high-end, premium feel that instantly builds trust and showcases our deep technical expertise. The interface will rely on glassmorphism, glowing accents, and sharp typography to communicate "the future of software."

## 2. Theme Support
The application must support both **Dark Mode** and **Light Mode**, with Dark Mode acting as the primary, default experience.

## 3. Color Palette

### Dark Mode (Default)
- **Background:** Deep Obsidian (`#0A0A0C`)
- **Surface / Cards:** Slightly lighter Obsidian (`#121215`) with a glassmorphism effect (translucent border).
- **Primary Accent:** Neon Cyber-Blue (`#00F0FF`)
- **Secondary Accent:** Glowing Purple (`#8A2BE2`)
- **Text (Primary):** Stark White (`#FFFFFF`)
- **Text (Secondary):** Cool Gray (`#A0A0B0`)

### Light Mode
- **Background:** Clean Off-White (`#F4F4F6`)
- **Surface / Cards:** Pure White (`#FFFFFF`) with subtle shadow and border.
- **Primary Accent:** Electric Blue (`#0055FF`)
- **Secondary Accent:** Deep Purple (`#6A0DAD`)
- **Text (Primary):** Deep Indigo (`#0D0D12`)
- **Text (Secondary):** Muted Indigo (`#4A4A5A`)

## 4. Typography
- **Headings (H1 - H6):** `Space Grotesk` or `Outfit` (Modern, geometric sans-serif).
- **Body Text:** `Inter` (Highly readable, clean).
- **Code Snippets/Tech Accents:** `Fira Code` or `JetBrains Mono`.

## 5. Component Styling
- **Buttons:** 
  - Primary buttons should have a subtle glowing border that intensifies on hover.
  - Backgrounds can be slightly translucent or use a very subtle gradient.
  - Edges should mix sharp corners with subtle radii (e.g., `border-radius: 4px` or chamfered corners if possible) to emphasize the cyber feel.
- **Cards/Panels:** 
  - Use **Glassmorphism** (background-blur) over animated backgrounds.
  - Borders should be 1px solid with a low opacity (e.g., `rgba(255, 255, 255, 0.1)`).
- **Inputs:** 
  - Minimalist borders that glow with the primary accent color (`#00F0FF` or `#0055FF`) when focused.

## 6. Animations & Interactivity
The site must feature **highly dynamic, complex scroll animations**.
- **Scroll Effects:** Utilize tools like Framer Motion or GSAP.
- **Parallax:** Background elements should move at different speeds.
- **Reveal on Scroll:** Text and components should fade in and slide up as they enter the viewport.
- **3D Transformations:** Subtle tilt effects on cards when hovered.
- **Interactive Cursor:** A custom glowing cursor that reacts to interactive elements.
- **Sticky Sections:** Important value propositions should pin to the screen while related content scrolls past.
