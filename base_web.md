# PROJECT: Data Forge — Official Website for the Data Science Club of SRMIST Trichy

## Section 1: Core idea
 You are building the official website for Data Forge, the Data Science Club of SRM Institute of Science & Technology, Tiruchirapalli. The design must feel like a living, breathing data terminal — futuristic, sleek, dark, and intelligent. Think of it as if a data was turned into a visual experience. The aesthetic sits at the intersection of a cyberpunk data lab, a Bloomberg terminal, and a high-end tech conference landing page. Every element should feel intentional and precise. Nothing should feel generic or templated. The overall vibe: dark-dominant, neon-green accents, data-driven motion, futuristic yet readable.

## Section 2: Colour palette
Use only these colors across the entire website. No deviations.

Primary Background: #000000 — true black, dominant
Primary Accent / Glow: #00FF27 — electric neon green, used for glows, highlights, and key interactive elements
Secondary Accent: #2DBA2D — medium green for secondary highlights
Soft Accent: #76E876 — light green for card borders, subtle glows, text accents
#0A5C0A — deep green for layered backgrounds, card backgrounds
#1AB81A — used for hover states and animated elements
#8CD18C — for body text, descriptions, secondary labels
#093E09 — very dark green for section dividers, card base fill
#FFFFFF — used sparingly for headings, important labels, and maximum contrast moments

All glows, text-shadows, and box-shadows must use variants of #00FF27 with appropriate opacity, keeping it subtle

## Section 3: Font
Use Google Fonts or system fonts. The font pairing must feel futuristic and technical.

Primary Display Font (headings, section titles): Orbitron — all caps where appropriate, wide letter spacing (0.15em to 0.3em)
Secondary UI Font (subheadings, labels, card titles): Share Tech Mono or JetBrains Mono — monospace, tech-terminal feel
Body / Description Font: Inter or DM Sans — clean, readable, modern

All major section headings must have a subtle neon green text-shadow/glow effect
Use letter-spacing: 0.2em on all display headings
Animate headings into view with a glitch effect or a typewriter effect on first load/scroll-into-view
Numbers, percentages, and data labels should always use Share Tech Mono

## Section 4: Cursor
Replace the default browser cursor with a fully custom interactive cursor.
Design:

The cursor is a small crosshair-style reticle made of four short green (#00FF27) tick marks with a tiny dot at center. It should look like a data targeting cursor from a sci-fi dashboard.
Behind the main cursor, there is a soft glowing circle (20–30px diameter) in #00FF27 at 15–20% opacity that follows the cursor with a slight lag/lerp — it trails the actual cursor smoothly, not instantly.
On hover over any interactive element (buttons, cards, links): the outer glow circle expands (40–50px), brightens, and a faint ripple pulse emits once from it.
On click: a brief burst of 4–6 small green particles radiates from the cursor and fades in 300ms.
The cursor should never use the default pointer on any element. Use the custom crosshair always.


## Section5: Background canvas
The background is a full-page animated layer sitting behind all content at low opacity (8–15%). It must never compete with readable content but should always be subtly visible.
Four layered animations, all running simultaneously:

Floating Node Network: ~80–100 small dots drift slowly across the screen. Dots within close proximity connect with thin green lines, forming a constantly shifting graph network. Colors: #00FF27 at 10% opacity.
Morphing Data Constellation: Every 10–14 seconds, the floating dots smoothly lerp into a recognizable data science shape — a bell curve, a scatter plot, a K-means cluster formation, a sine wave — hold for 3 seconds, then dissolve back to random scatter. Each dot travels independently with a randomized delay so shapes assemble organically, never snap. Pure Canvas + requestAnimationFrame. No libraries.
Grid Overlay: A faint graph-paper grid in #0A5C0A at 20–25% opacity covers the full page. The grid lines have a slow breathing pulse — brightness gently oscillating — as if the page itself is alive.
Sonar Pulse Rings: Every 5–8 seconds, a faint circular ring originates from a random screen position, expands outward, and fades. Like a data broadcast signal or radar ping. Color: #2DBA2D at 10% opacity.

## Section 6: Web structure
The page has the following sections in order:

1. Navigation Bar
2. Hero section
3. The Foundry Series (Events)
4. About Data Forge
5. Contact
6. Footer
