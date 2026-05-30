## Section 1: Navigation Bar

Fixed/sticky at the top, full width
Background: #000000 at 85% opacity with a backdrop-filter: blur(12px) — frosted glass black
Left: DATA FORGE in Orbitron, bold, #00FF27, with a subtle glow. Add the logo of data forge in the left side of the writing and make it attractive. 
https://claude.ai/api/f9e0e4f6-9c3a-4e77-aba4-2a1a42c8f27f/files/0a0392ab-ddf6-48df-885a-66288d492362/preview

Right: Nav links — ABOUT, EVENTS, CONTACT — in Share Tech Mono, uppercase, #8CD18C. On hover, they turn #00FF27 with an underline that animates in from left to right.
A thin #00FF27 line (1px, 40% opacity) runs along the bottom of the navbar.
On mobile: hamburger menu. The icon is three horizontal green lines. When opened, the menu slides in from the right as a full-height dark panel.
Scroll behavior: on scroll down, the navbar height reduces slightly (from 70px to 55px) with a smooth transition.


## Section 2: Front Section
Full viewport height (100vh). Centered content, both vertically and horizontally.
Content:
Top label (small, above main heading):
SRMIST TRICHY · DATA SCIENCE CLUB
Style: Share Tech Mono, #8CD18C, letter-spacing 0.3em, font-size 12px. Animate in with a fade-up on load.
Main heading:
DATA FORGE
Style: Orbitron, massive (clamp between 64px and 120px depending on screen), #FFFFFF, with a strong #00FF27 text-shadow glow. This heading should have a glitch animation that triggers on page load and then repeats subtly every 8–12 seconds. The glitch effect: the text briefly splits into RGB offset layers (a red/green/blue channel split for 100–200ms) then snaps back clean.
Tagline below:
Forging Data Scientists. One Dataset at a Time.
Style: Inter, 18–22px, #8CD18C, italic. Animate in with typewriter effect, starting 500ms after the main heading appears.
Below the tagline, two subtle animated stat counters side by side:

10+ with label CORE TEAM MEMBERS
4 with label FOUNDRY CHAPTERS THIS AUGUST
Style: numbers in Orbitron #00FF27, labels in Share Tech Mono #8CD18C small caps. Numbers count up from 0 on load.

Below stats, a single CTA button:
EXPLORE THE FOUNDRY →
Style: outlined button — #00FF27 border (2px), #00FF27 text, transparent background. On hover: background fills with #00FF27, text turns #000000, and a pulse glow expands from the button. On click: smooth scroll to the Events section. The button has a scanning animation — a thin white line sweeps across it left to right on loop every 3 seconds.
Hero decoration:
On the right side (desktop only, hidden on mobile), show a large semi-transparent decorative graphic: an animated hexagonal data network — 6–8 nodes connected by lines, nodes pulsing, lines occasionally lighting up as if data is traveling along them. Color: #00FF27 at 15–25% opacity. This should be CSS/SVG animated, not a static image.



## Section 3: Foundry series (main)
This is the centrepiece of the page.
Section heading:
THE FOUNDRY SERIES
Style: Orbitron, the largest heading on the page after the hero. Full neon green glow. Animate with a glitch on scroll-into-view.
Sub-label below heading:
AUGUST 2025 · 4 CHAPTERS · 8 EVENTS
Style: Share Tech Mono, #8CD18C, small, centered.
Series descriptor paragraph:
"The Foundry Series is Data Forge's flagship event arc — four progressive chapters running through August, each forging a different layer of data mastery. Every chapter contains one online workshop and one offline competition."
Style: Inter, #8CD18C, centered, max-width 600px.

Chapter layout:
Display 4 chapters. Each chapter is a self-contained horizontal block (on desktop) / stacked card (on mobile).
Chapter container design:

Background: dark gradient from #093E09 to #000000
Left border: 3px solid #00FF27 with a subtle vertical glow
A chapter number badge top-left: CH.01, CH.02, etc. in Orbitron #000000 on a #00FF27 filled background badge
Chapter title in Orbitron #FFFFFF

Inside each chapter, two event cards side by side:
Event Card Design:

Background: #000000 with #0A5C0A 1px border
Top of card has a type badge: for workshops → ◉ ONLINE · WORKSHOP badge in #2DBA2D background; for competitions → ◈ OFFLINE · COMPETITION badge in #0A5C0A background with #76E876 text
Event name in Orbitron #FFFFFF (medium size, 18–20px)
Short description in Inter #8CD18C (13–14px, max 3 lines)
A thin animated bottom border that fills from left to right on hover: #00FF27
On hover: the entire card lifts (translateY -6px), the border glow intensifies, and a faint scan-line animation sweeps across the card once
A small [→] arrow icon bottom-right of the card that appears on hover (no link — it is decorative/placeholder)

Chapter scroll behavior:
As the user scrolls down, each chapter block animates into view from the bottom (translateY +40px → 0, opacity 0 → 1) with a 0.5s ease-out transition. Chapters stagger in — Chapter 1 first, then each subsequent chapter 150ms after the previous one begins animating.
The 4 chapters and their events (replace with actual details if different):

CHAPTER 01 — IGNITION
Lighting the spark. Building the foundation.
Event 1 — Workshop (Online):
Name: PYFORGE
Type: Online Workshop
Description: A hands-on introduction to Python for Data Science. Covers NumPy, Pandas, and Matplotlib — the core toolkit every data scientist relies on.
Event 2 — Competition (Offline):
Name: RAW DATA RUMBLE
Type: Offline Competition
Description: You get a messy, unstructured dataset. You have 90 minutes. Clean it, analyse it, and tell a story with it. The best insight wins.

CHAPTER 02 — SYNTHESIS
Turning numbers into narratives.
Event 1 — Workshop (Online):
Name: VISUALFORGE
Type: Online Workshop
Description: A deep-dive into data visualization using Power BI and Tableau. Learn how to build dashboards that don't just show data — they tell stories.
Event 2 — Competition (Offline):
Name: DASHBOARD DUEL
Type: Offline Competition
Description: Teams are given a business dataset and tasked with building the most compelling, insightful dashboard in a timed session. Judged on clarity, design, and depth.

CHAPTER 03 — INTELLIGENCE
Where data learns to think.
Event 1 — Workshop (Online):
Name: MLFORGE
Type: Online Workshop
Description: An intro to Machine Learning using Scikit-learn. From linear regression to decision trees — understand how models learn from data and how to build your first one.
Event 2 — Competition (Offline):
Name: PREDICTIVE STRIKE
Type: Offline Competition
Description: A Kaggle-style offline challenge. Build the most accurate predictive model on a real dataset under competition conditions. Best model accuracy and methodology wins.

CHAPTER 04 — CONVERGENCE
The forge completes. The data scientist emerges.
Event 1 — Workshop (Online):
Name: DATASTORM
Type: Online Workshop
Description: An introduction to Big Data — concepts, architecture, and tools including Apache Spark and Google BigQuery basics. Understand data at scale.
Event 2 — Competition (Offline):
Name: DATATHON FINALE
Type: Offline Competition
Description: The series culminates in a full-day datathon. Open-ended problem statement, real-world dataset, multi-stage evaluation. The ultimate test of everything built across the four chapters.

Below all 4 chapters, a full-width strip with a progress-arc visual:
Show a horizontal timeline line with 4 glowing dots labeled CH.01 through CH.04, connected by a green animated line that draws itself from left to right on scroll. Label it YOUR JOURNEY THROUGH THE FOUNDRY in Share Tech Mono. This is purely decorative/informational.

## Section 4: About section
Section heading: ABOUT DATA FORGE
Style: Orbitron, #00FF27 glow, animate in with glitch effect on scroll-into-view.
This section has two columns on desktop (stacked on mobile):
Left column — The Mission Block:
A dark card (#093E09 background, #00FF27 1px border, soft inner glow) containing:

Sub-label: OUR VISION in Share Tech Mono #2DBA2D small, uppercase
Vision text: "To foster a culture of data-driven thinking, analytical innovation, and industry-ready skills in Data Science, Data Analytics, Business Analytics, and Big Data — preparing students to thrive in a data-powered world."
Below, a divider line (green, 1px, 40% opacity)
Sub-label: WHAT WE DO in Share Tech Mono #2DBA2D
A short list of 5–6 key objectives from the document, displayed as animated bullet points. Each bullet appears with a slide-in animation (staggered, 100ms apart) when the section scrolls into view. Use small ▸ arrows in #00FF27 as bullet markers. Items:

Teach core Data Science and Statistics fundamentals
Develop hands-on skills in Data Analytics and visualization
Conduct workshops, datathons, and case study competitions
Build real-world data solutions for business and societal problems
Collaborate with industry professionals and data-driven startups
Encourage research publications in data-related fields



Right column — Team Structure:
An interactive org chart rendered as a vertical tree with glowing node cards:
Title: LEADERSHIP STRUCTURE in Share Tech Mono
Nodes (top to bottom):

PRESIDENT → VICE PRESIDENT → SECRETARY
Then branching from Secretary into 7 horizontal nodes: TECHNICAL LEAD, R&D LEAD, EVENTS COORDINATOR, PR & INDUSTRY HEAD, SOCIAL MEDIA, MEMBERSHIP CHAIR, TREASURER

Style: each node is a small pill/chip with #0A5C0A background, #76E876 border, #FFFFFF text in Share Tech Mono. Connecting lines between nodes in #2DBA2D. The chart animates in from top to bottom (nodes appear one by one as you scroll into the section). On hover over any node, a tooltip appears with 1-line description of that role.
Below both columns — a full-width "Who Can Join" strip:
Background: #0A5C0A at 30% opacity, slight green tint. Content: OPEN TO ALL B.TECH BRANCHES as a headline, followed by animated cycling text: Computer Science → Electronics → Mechanical → Civil → Biotechnology → Finance → Healthcare Technology — each word appears, stays for 1.5 seconds, fades out, next one appears. This communicates the interdisciplinary nature.

## Section 5: Contact us sectioin:
Section heading: JOIN THE FORGE
Style: Orbitron, full neon green glow, glitch animation on scroll entry.
Centered layout. No form. No registration portal. Just the WhatsApp community card.
WhatsApp Card:
Large centered card, #093E09 background, #00FF27 border with a strong outer glow:

Icon: WhatsApp icon in #00FF27 (use an SVG icon, not an image)
Heading: DATA FORGE COMMUNITY
Sub-text: "Join our WhatsApp community to stay updated on all Foundry Series events, workshops, resources, and announcements."
Button: JOIN NOW →

Style: solid #00FF27 background, #000000 text, Orbitron font, bold
On hover: background becomes #1AB81A, a glow pulse emits
href: https://chat.whatsapp.com/CGwok6lCSwt1DEIfCUHXso
target="_blank"



Below the card, a secondary note in Share Tech Mono #8CD18C very small:
SRMIST TRICHY · DATA SCIENCE CLUB · OPEN TO ALL BRANCHES

SECTION 12 — FOOTER
Minimal, dark, clean.

Background: #000000
Top border: 1px #0A5C0A
Left: DATA FORGE wordmark in Orbitron small, #00FF27 glow
Center: SRMIST TIRUCHIRAPALLI · DATA SCIENCE CLUB
Right: © 2025 DATA FORGE
All text: Share Tech Mono, #8CD18C, small
A subtle repeating green binary string (010110100110101...) scrolls horizontally across the very bottom of the footer in #00FF27 at 8% opacity — purely decorative


## Section 6: Transition behavior

Smooth scroll enabled site-wide (scroll-behavior: smooth)
Every section animates on scroll-into-view using Intersection Observer — elements start invisible and slightly offset (translateY +30px, opacity 0) and transition to visible (translateY 0, opacity 1) with 0.5–0.7s ease-out
Stagger all list items and cards — never animate all at once, always stagger by 80–120ms per item
The active section in the navbar should be highlighted (underline or #00FF27 color) as the user scrolls through the page
No jarring jumps. All transitions should feel fluid and data-terminal-smooth.

## Section 7: Performance 

Frontend only: HTML, CSS, and vanilla JS (or lightweight framework). Zero backend. Zero forms. Zero databases.
Mobile responsive: Every section must look clean and professional on a 375px mobile viewport. The chapter cards stack vertically on mobile. The hero text scales down. The org chart simplifies to a linear list on mobile.
No placeholder images: All visuals must be CSS/SVG/canvas generated. No broken image tags.
Performance: Background animations must use requestAnimationFrame and will-change: transform where needed. No jank.
Fonts: Load from Google Fonts — Orbitron, Share Tech Mono, Inter.
The page must be live and accessible at a real URL when deployed. This is the only deliverable.
Hosting: use whatever platform Antigravity deploys to. The URL must work in a browser with no localhost, no file://, no screenshots.