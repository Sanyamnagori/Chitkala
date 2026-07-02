r# Figma design project analysis
_Exported on 7/2/2026 at 00:47:51 GMT+5:30 from Cursor (3.9.16)_

---

**User**

We are building a production-ready website based on this Figma design:

https://www.figma.com/design/f9eVvx0EOFRsXQF4Mk9fk3/Chitkala 

If you have access to the Figma file through MCP or Figma integration, use it as the source of truth.

Read every frame, component, interaction, and every Figma comment before generating any code.

Follow all comments exactly, including animations, hover interactions, scroll behavior, transitions, and functionality.

Do not ignore any comments.

First provide:
1. Complete project analysis
2. List of all pages
3. List of reusable components
4. List of animations
5. List of backend requirements
6. Development plan

Do not generate code until I approve the analysis.

---

**Cursor**

I'll pull the Figma file through MCP and scan the workspace so the analysis matches the design and any existing project structure.


The MCP export has the frame tree but likely not comments or interactions — I'll search the file for those and pull the main production frames next.


I've pulled the full [Chitkala Figma file](https://www.figma.com/design/f9eVvx0EOFRsXQF4Mk9fk3/Chitkala) via the Framelink MCP integration. The workspace is empty, so this is a greenfield build.

**Important limitation:** The MCP tool exports layout, typography, colors, and assets, but **does not expose Figma comments or prototype interactions**. Before implementation, please either paste all Figma comments here or confirm I should proceed from visual structure only. The animation and interaction list below is **inferred from the design** until those comments are available.

---

## 1. Complete Project Analysis

### Brand & Purpose
**Studio Chitkala** is a creative studio site with the tagline **"Where Thought Finds Form."** It presents two service lines:

| Pillar | Message | CTA highlight |
|--------|---------|---------------|
| **Design & Motion** | Logos, brand identity, brochures, packaging, social, motion graphics | **our Portfolio** |
| **Art Studio** | Original artworks & prints (mythology, culture, nature) | **our Art Studio** |

The site is a **single long-scroll marketing homepage** (~4,200px at 1920px width), not a multi-page app in the current Figma file.

### Source-of-Truth Frame Hierarchy

| Frame | Status | Notes |
|-------|--------|-------|
| **Final with contact** | **Primary production reference** | Full postcard wizard (steps 0–3 shown), all step copy, progress rail |
| **Final** | Production homepage | Postcard on Services step; single name-card overlay |
| **For Eyes** | Review / alternate | Adds **Checklist** ("What I look for") block; duplicate hero headline — confirm inclusion |
| **Old-ref** | **Deprecated** | Replaced traditional form; keep field definitions for Services/Notes steps only |
| **postcard_V1–V5** | Asset references | 700×1100 postcard backgrounds per wizard step |

### Design System (from Figma tokens)

**Colors**
- Primary vermillion: `#E34234`
- Deep red (highlights, footer accents): `#A71714`
- White: `#FFFFFF`
- Section gray (showreel band): `#D9D9D9`
- Body text: `#2D2D2D`, `#505050`
- Highlight wash: `rgba(167, 23, 20, 0.2)`
- Checklist cream: `#F2E3CF`
- Checklist accent: `#E35342`

**Typography**
- **Cabinet Grotesk** — nav, hero, section headlines (16px–120px)
- **Poppins** — postcard form labels (20px / 34.8px line-height)
- **Inter** — footer copyright (20px)
- **Gochi Hand** — checklist items & "let's chat!" (decorative)

**Layout**
- Artboard: **1920px** wide
- Horizontal padding: **264px** (content ~1392px)
- Section padding: **80px** vertical

### Page Structure (scroll order)

```
┌─────────────────────────────────────────┐
│  HERO (red, 1080px)                     │
│  Logo + Nav + Flower collage + Quotes   │
│  "Branding, Design & Motion"            │
├─────────────────────────────────────────┤
│  PORTFOLIO STORY (white)                │
│  Large centered copy + "our Portfolio"  │
├─────────────────────────────────────────┤
│  ART STUDIO STORY (white/red overlap)   │
│  Large centered copy + "our Art Studio"│
├─────────────────────────────────────────┤
│  SHOWREEL BAND (gray, 720px)            │
│  Likely video / motion reel placeholder │
├─────────────────────────────────────────┤
│  CONTACT (red)                          │
│  "This postcard is finding its way…"    │
│  Postcard multi-step form + stepper     │
├─────────────────────────────────────────┤
│  FOOTER (deep red)                      │
│  Large logo watermark + © 2026          │
└─────────────────────────────────────────┘
```

### Hero — Interactive Collage
Five botanical images with labels (likely hover targets):

1. **Blue Lotus** — top center  
2. **Lotus** — upper right  
3. **Jasmine** — center left  
4. **Ashoka** — lower center  
5. **Mango Blossom** — lower right  

Each pairs with a quote bubble:
- *"Something catches your attention."*
- *"What if...?"*
- *"This feels right."*
- *"It's alive."*
- *"Let's build this."*

Additional hero assets: hand/finger SVGs, connection lines, four corner **emotion character** illustrations (partially off-canvas — likely parallax).

### Navigation
Header links (white on red hero):
- **What is Studio Chitkala?** → hero / intro
- **About Us** → story sections
- **Contact Us** → postcard section (smooth scroll)

### Contact — Postcard Wizard (production pattern)

**Headline:** *"This postcard is finding its way to us…"*

**5-step progress rail:** Name → Org. → Contact → Services → Notes  
(active step = filled `#A71714` ellipse; inactive = white)

| Step | Postcard prompt | Field label | Placeholder |
|------|-----------------|-------------|-------------|
| 1 | Who's behind this postcard? | Name: | Type your name here |
| 2 | Your HQ, hideout, or creative corner? | Organization Name | Type here |
| 3 | Where should our reply land? | Email | Type your mail id here |
| 4 | *(Services — from Old-ref)* | Service checkboxes | Brand Identity, Print Design, Illustration, Digital & Motion, Website Design & Development, Brand/Design Consultation |
| 5 | *(Notes — from Old-ref)* | Additional notes | "Please share anything that will help prepare for our meeting." |

Each step: postcard background image (1100×700), input overlay, underline field, **"Next >>>"** CTA.

**Old-ref also had:** Phone (+91 prefix), Organization Name*, Email* — confirm whether phone belongs in step 3 or is dropped.

### Optional Section (For Eyes frame only)
**Checklist** card (941×374, cream `#F2E3CF`, 30px radius, shadow):
- Title: **What I look for**
- Items: Impactful work · Meaningful work · Diversed team of talented folks
- CTA: **let's chat!** → likely scrolls to contact

Confirm whether this belongs in the shipped site.

### Assets to Export from Figma
- Chitkala Logo (header + footer watermark SVG)
- 5 flower photos + 4 emotion illustrations
- Hero SVG overlays (hands, lines)
- Postcard backgrounds V0–V5
- Text highlight blocks (rounded rects behind link phrases)
- Stepper icons (5 SVG badges above progress dots)
- Checklist photo (if section included)

---

## 2. List of All Pages

### Designed in Figma (Page 1 canvas)

| # | Page / View | Route (proposed) | In Figma? |
|---|-------------|------------------|-----------|
| 1 | **Homepage** (all sections) | `/` | Yes — **Final with contact** |
| 2 | Portfolio | `/portfolio` or external | **Not designed** — linked from copy only |
| 3 | Art Studio / Shop | `/art-studio` or external | **Not designed** — linked from copy only |
| 4 | About Us (standalone) | `/about` | **Not designed** — nav anchor only |
| 5 | Contact (standalone) | `/contact` | **Not designed** — section on homepage |

**Production scope from Figma:** one responsive homepage with in-page anchors. Portfolio and Art Studio are copy CTAs until separate designs exist.

### Figma frames (not separate routes)

- Old-ref, For Eyes, Final, Final with contact, postcard_V1–V5

---

## 3. List of Reusable Components

| Component | Description | Used in |
|-----------|-------------|---------|
| **SiteHeader** | Logo + tagline + nav links | Hero |
| **NavLink** | Cabinet Grotesk 18px; white on red | Header |
| **HeroCollage** | Flower images, labels, quote bubbles, SVG overlays | Hero |
| **FlowerCard** | Image + label + optional quote | Hero |
| **EmotionIllustration** | Corner floating character art | Hero |
| **SectionHeadline** | 64px Cabinet Grotesk, centered, rich text | Portfolio, Art Studio |
| **TextHighlight** | Colored rounded rect behind bold phrase | Portfolio, Art Studio |
| **ShowreelBand** | Full-width gray section | Mid-page |
| **ContactSection** | Red bg + headline + wizard container | Contact |
| **PostcardWizard** | Multi-step form shell | Contact |
| **PostcardStep** | Background image + prompt + input + Next | Contact |
| **ProgressStepper** | 5 icon badges + dots + labels | Contact |
| **FormField** | Poppins label + underline input | Postcard steps |
| **ServiceCheckbox** | Square checkbox + service label | Step 4 |
| **NotesField** | Multiline textarea | Step 5 |
| **SiteFooter** | Logo watermark + copyright | Footer |
| **ChecklistCard** *(optional)* | Cream card, checkboxes, CTA | For Eyes only |
| **Button / Link** | "Next >>>", "let's chat!" | Contact, Checklist |

---

## 4. List of Animations & Interactions

**⚠️ Pending Figma comments.** Inferred from layout and naming:

| ID | Animation / Interaction | Trigger | Notes |
|----|-------------------------|---------|-------|
| A1 | Smooth scroll to section | Nav click | What is Studio Chitkala / About / Contact |
| A2 | Flower hover state | Hover on botanical image | Label + quote emphasis; possible scale/glow |
| A3 | Quote bubble reveal | Hover or scroll into hero | 5 quotes tied to flowers |
| A4 | Hero parallax | Scroll | Corner emotion images; hand SVGs |
| A5 | Sticky / fading header | Scroll past hero | Nav may need bg transition (red → white) |
| A6 | Scroll-triggered section fade-in | Section enters viewport | Portfolio, Art Studio, Contact |
| A7 | Text highlight draw / wipe | Scroll into section | Underline SVGs (13px strokes) on key phrases |
| A8 | Showreel autoplay | Scroll into gray band | Video/motion (asset TBD) |
| A9 | Postcard step transition | Next >>> click | Slide/flip between V1–V5 backgrounds |
| A10 | Stepper progress update | Step advance | Dot fill `#A71714`; icon state change |
| A11 | Input focus state | Field focus | Underline emphasis; placeholder fade |
| A12 | Form validation shake / error | Invalid Next | Required fields per step |
| A13 | Submit success state | Final step | Postcard "sent" animation (not in Figma — confirm) |
| A14 | Footer logo parallax | Scroll near bottom | Large watermark logo |
| A15 | Checklist checkbox toggle | Click *(if included)* | Dashed border rows |
| A16 | "let's chat!" hover | Hover *(if included)* | Hand-drawn link style |
| A17 | Portfolio / Art Studio link hover | Hover on highlighted text | Color shift on `#A71714` / `#E34234` blocks |

**Please share Figma comments** for exact easing, duration, and scroll behavior — especially hero interactions and postcard transitions.

---

## 5. Backend Requirements

| Requirement | Priority | Details |
|-------------|----------|---------|
| **Contact form API** | Required | `POST /api/contact` — accept wizard payload |
| **Multi-step validation** | Required | Per-step: name, org, email format; services ≥1; notes optional/required TBD |
| **Email notification** | Required | To studio inbox (Resend, SendGrid, or SMTP) |
| **Auto-reply email** | Recommended | Confirmation to submitter |
| **Spam protection** | Required | honeypot + rate limit; reCAPTCHA if needed |
| **Data persistence** | Recommended | Store submissions (DB or Google Sheets/Airtable) |
| **Phone field** | TBD | In Old-ref, not in postcard steps — confirm |
| **CMS for copy/images** | Optional | Sanity, Contentful, or JSON for non-dev edits |
| **Portfolio / Art Studio pages** | Future | Not in scope until designs exist |
| **Analytics** | Recommended | Plausible / GA4 |
| **SEO / OG metadata** | Required | Title, description, social image |
| **Asset CDN** | Recommended | Optimized images from Figma export |

**Example submission payload:**
```json
{
  "name": "string",
  "organization": "string",
  "email": "string",
  "phone": "string | optional",
  "services": ["Brand Identity", "Print Design", ...],
  "notes": "string",
  "source": "homepage-postcard-wizard"
}
```

---

## 6. Development Plan

### Phase 0 — Alignment (before code)
1. You approve this analysis  
2. You provide **all Figma comments** + confirm prototype interactions  
3. Confirm: include **Checklist** section? Include **phone** field?  
4. Confirm: **Final with contact** as primary reference  
5. Export assets via Figma MCP `download_figma_images`

### Phase 1 — Foundation (Week 1)
- Next.js 14+ (App Router), TypeScript, Tailwind CSS  
- Design tokens (colors, fonts, spacing)  
- Font loading: Cabinet Grotesk, Poppins, Inter, Gochi Hand  
- Base layout, SEO, responsive breakpoints (1920 → 1440 → 1024 → 768 → 375)

### Phase 2 — Static sections (Week 1–2)
- Header + smooth-scroll nav  
- Hero layout (static first, then animations)  
- Portfolio & Art Studio copy sections + text highlights  
- Gray showreel band (placeholder or embedded video)  
- Footer with logo watermark

### Phase 3 — Hero interactions (Week 2)
- Flower hover states + quote bubbles  
- Parallax on emotion illustrations and SVG overlays  
- Scroll-triggered hero text effects  
- Implement per Figma comments once received

### Phase 4 — Postcard wizard (Week 2–3)
- 5-step state machine (React context or Zustand)  
- Postcard backgrounds + step transitions  
- Progress stepper sync  
- Client validation + accessible form fields  
- Mobile: stack postcard + stepper

### Phase 5 — Backend & submission (Week 3)
- API route + validation (Zod)  
- Email integration + spam protection  
- Success/error UI  
- Optional admin notification dashboard

### Phase 6 — Polish & launch (Week 4)
- Performance: image optimization, lazy load, LCP  
- Accessibility audit (WCAG 2.1 AA)  
- Cross-browser QA  
- Deploy (Vercel recommended)  
- Lighthouse target: 90+ performance, 100 accessibility

### Proposed tech stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion + GSAP ScrollTrigger (if comments require) |
| Forms | React Hook Form + Zod |
| Email | Resend or SendGrid |
| Hosting | Vercel |

---

## Open Questions (need your input before coding)

1. **Figma comments** — Can you paste them or grant comment access? They may define animations we cannot infer.  
2. **Primary frame** — Confirm **Final with contact** as the build reference.  
3. **Checklist section** — Include the "What I look for" block from **For Eyes**?  
4. **Phone number** — Keep from Old-ref in step 3, or email only?  
5. **Portfolio / Art Studio links** — External URLs, coming-soon, or build placeholder pages?  
6. **Showreel gray section** — Video file, embed, or static for v1?  
7. **Form success state** — Any designed confirmation screen after submit?

---

Once you approve this analysis and answer the open questions (especially Figma comments), I'll start implementation with no code until then.

---

**User**

Good analysis.

Additional mandatory requirements from the Figma comments:

1. Initially only the hand should be visible in the hero.

2. On scroll reveal flowers one by one in this order:
- Blue Lotus
- Lotus
- Mango Blossom
- Jasmine
- Ashoka

3. Hovering a flower should:
- scale the flower slightly
- reveal its corresponding ticket
- hide the ticket on mouse leave

4. Decorative faces:
- eyes should follow the cursor
- tongue should animate on hover using the provided GIF.

5. The gray showreel section should display the provided looping GIFs instead of placeholders.

6. The postcard is a 5-step wizard.

Each Next button should:
- validate current step
- animate to the next step
- update the progress indicator
- progressively reveal the illustration (Swan → Tree → House → Mountains → Sun).

7. Backend:
- Next.js Route Handlers
- Prisma
- Supabase PostgreSQL
- Resend
- No admin dashboard
- No authentication
- Save every submission to the database.
- Send an email notification to the studio.

Use "Final with contact" as the source of truth.

Do not ask additional planning questions.

Start implementing section by section.

---

**Cursor**

Starting implementation from "Final with contact": setting up the project foundation, pulling Figma assets, then building section by section.


Setting up the foundation and building components section by section.


Prisma 7 changed the config format — downgrading to Prisma 6 for Supabase compatibility.


The first production build completed successfully. Here is what is implemented, section by section, based on **Final with contact** and your Figma comment requirements.

## What’s built

### Foundation
- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- Design tokens from Figma (colors, fonts, spacing)
- **36 assets** exported from Figma into `public/images/` (logo, flowers, faces, hand SVGs, postcards, stepper icons, showreel GIFs, tongue GIFs)

### Section 1 — Header + Hero
- **`Header`** — logo, tagline, anchor nav
- **`HeroSection`** — sticky 250vh scroll container
  - Only the **hand + fingers** visible initially
  - Flowers reveal **one by one on scroll** in order: Blue Lotus → Lotus → Mango Blossom → Jasmine → Ashoka
  - **Hover**: flower scales up, ticket quote appears, hides on mouse leave
  - **Decorative faces**: pupils track cursor globally; **GIF tongue animation on hover**

### Section 2 — Portfolio
- Centered copy with **“our Portfolio”** underline SVG highlight

### Section 3 — Showreel
- Full-width gray band with **two looping GIFs** side by side (`showreel-1.gif`, `showreel-2.gif`)

### Section 4 — Art Studio
- Red section with **“our Art Studio”** highlighted copy

### Section 5 — Contact (Postcard wizard)
- **5-step wizard**: Name → Org → Contact → Services → Notes
- Each **Next** validates the current step, animates to the next postcard, updates the stepper
- **Progressive illustration reveal**: Swan → Tree → House → Mountains → Sun
- Services checkboxes + notes textarea on final steps
- Submits to backend on last step

### Section 6 — Footer
- Large logo watermark + © 2026

### Backend
- **`POST /api/contact`** — Route Handler
- **Prisma 6** + **Supabase PostgreSQL** schema (`ContactSubmission`)
- **Resend** email notification to studio
- Every submission saved to DB (no auth, no admin dashboard)

---

## Project structure

```
src/
├── app/
│   ├── api/contact/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── hero/          HeroSection, FlowerCard, DecorativeFace
│   ├── sections/      Portfolio, Showreel, ArtStudio, Contact
│   ├── contact/       PostcardWizard, ProgressStepper
│   └── layout/        Header, Footer
└── lib/
    ├── constants.ts
    ├── prisma.ts
    └── validations/contact.ts
prisma/schema.prisma
.env.example
```

---

## To run locally

1. Copy env vars:
```bash
cp .env.example .env
```

2. Set Supabase + Resend values in `.env`:
   - `DATABASE_URL` / `DIRECT_URL`
   - `RESEND_API_KEY`
   - `STUDIO_EMAIL`
   - `FROM_EMAIL`

3. Push schema to Supabase:
```bash
npx prisma db push
```

4. Start dev server:
```bash
npm run dev
```

---

## Implemented Figma comment requirements

| Requirement | Status |
|---|---|
| Hand only visible initially | Done |
| Scroll-reveal flowers in order | Done |
| Flower hover scale + ticket show/hide | Done |
| Face eyes follow cursor | Done |
| Tongue GIF on hover | Done |
| Showreel looping GIFs | Done |
| 5-step postcard wizard | Done |
| Validate → animate → update stepper → reveal illustration | Done |
| Prisma + Supabase + Resend backend | Done |

If you want to continue, the next pass can focus on **pixel-perfect positioning** against the 1920px Figma frame and **mobile breakpoints**.

---

**User**

run it first

---

**Cursor**

The dev server is running.

Open **http://localhost:3000** in your browser (or **http://192.168.29.248:3000** from another device on your network).

Scroll through the hero to reveal the flowers, hover them for tickets, and try the postcard wizard at the bottom. The contact form will need `.env` configured with Supabase and Resend before submissions work end-to-end.

---

**User**

<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: success
task_id: 382714
title: Scaffold Next.js app in project directory
output_path: C:\Users\sanya\.cursor\projects\c-Users-sanya-OneDrive-Attachments-Desktop-chitkal-cur\terminals\382714.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed). If there's no follow-ups needed, don't explicitly say that.</user_query>

<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: success
task_id: 300869
title: Install animation, forms, email, Prisma deps
output_path: C:\Users\sanya\.cursor\projects\c-Users-sanya-OneDrive-Attachments-Desktop-chitkal-cur\terminals\300869.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed). If there's no follow-ups needed, don't explicitly say that.</user_query>

<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: success
task_id: 475851
title: Downgrade Prisma to v6 for Supabase compatibility
output_path: C:\Users\sanya\.cursor\projects\c-Users-sanya-OneDrive-Attachments-Desktop-chitkal-cur\terminals\475851.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed). If there's no follow-ups needed, don't explicitly say that.</user_query>

<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: success
task_id: 539965
title: Verify production build after final changes
output_path: C:\Users\sanya\.cursor\projects\c-Users-sanya-OneDrive-Attachments-Desktop-chitkal-cur\terminals\539965.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed). If there's no follow-ups needed, don't explicitly say that.</user_query>

---

**Cursor**

All background setup tasks completed successfully:

- **Next.js app** scaffolded with TypeScript, Tailwind, and App Router
- **Dependencies installed** — Framer Motion, React Hook Form, Zod, Resend, Prisma
- **Prisma downgraded to v6** for Supabase PostgreSQL compatibility
- **Production build verified** — compiled with no errors

The dev server should still be at **http://localhost:3000**.

---

**User**

a flower mango blossom is missing in the hand illustration i am attaching the screenshot of it find it in figma design also and add it

---

**Cursor**

I'll compare the hero hand assets in Figma with what's in the code to find the missing mango blossom.


Found the missing piece: Figma node `#2104:114` (`hand-branch.svg`) — the mango blossom branch on the hand. It was downloaded but never added to the hero.


The missing element was **Figma node `#2104:114`** — the **mango blossom branch** on the hand (`hand-branch.svg`). It was in the design and had been exported, but wasn’t placed in the hero.

It’s now added to `HeroSection` at the Figma position (50.4% left, 51.6% top), visible from the start with the hand illustration.

Refresh **http://localhost:3000** to see the branch with its white mango blossoms on the stem.

---

**User**

it disappeared again

---

**Cursor**

Investigating why the mango blossom branch vanished — likely layering, positioning, or overflow.


The hand-branch edit was lost from the file. Grouping all hand layers into one component with correct z-order so it stays visible.


The branch code had been lost from `HeroSection.tsx` — the previous edit wasn’t in the file anymore (likely a sync or revert).

**Fix:** All hand layers are now in a dedicated `HandIllustration` component, including:

- asset-3 through asset-6 (stems)
- `hand.svg`
- **`hand-branch.svg`** — mango blossom branch (Figma `#2104:114`)
- `fingers.svg`

The branch sits at **z-index 25**, above the hand and below the fingers, using the exact Figma coordinates (50.36% × 51.57%).

Do a hard refresh on **http://localhost:3000** (`Ctrl+Shift+R`). The blossom branch should stay visible with the hand from the first load.

---

**User**

now for the animations i didnt wanted that flower image to show up on scrolling but i wanted all the flower illustretions should appear when scrolling like in first only hand with fingers should show up and when scroll all flower in hand show up one by one in
by default only hand will be visible and then on scroll animation one by one the cards will be revealed

The order will be 
Blue Lotus
Lotus
Mango Blossom
Jasmine
Ashoka
and the image of flower or the flower card should show up when hover over the respective flower illusteration

---

**Cursor**

Restructuring the hero: hand + fingers only by default; scroll reveals flower illustrations one by one; photo cards appear only on hover.


Updating constants and components so scroll reveals hand illustrations one by one, and photo cards appear only on hover.


Fixing label positioning (hero-relative coordinates) and clearing hover when an illustration scrolls out of view.


The hero animation is updated to match what you described. Here is how it works now:

### Default state
Only the **hand** and **fingers** SVGs are visible — no flower illustrations and no photo cards.

### On scroll
As you scroll through the hero (250vh sticky section), the **flower illustrations** in the hand appear **one by one** in this order:

1. Blue Lotus  
2. Lotus  
3. Mango Blossom  
4. Jasmine  
5. Ashoka  

Each illustration fades and scales in when its scroll step is reached.

### On hover
When you hover a **revealed** flower illustration, the matching **photo card**, **name label**, and **quote ticket** appear. They hide again when you move the mouse away. Photo cards no longer appear on scroll.

### Files involved
- `HandIllustration.tsx` — hand/fingers always visible; illustrations reveal on scroll; hover targets on each flower SVG  
- `HeroSection.tsx` — scroll drives `revealedCount`; hover drives which photo card shows  
- `FlowerCard.tsx` — photo card + ticket only when `visible={hoveredFlower === id}`  

Hard refresh at `http://localhost:3000` and scroll slowly through the hero to see each flower appear, then hover each one for its card.

If any illustration does not line up with the correct flower in the hand, or a hover area feels too small, say which flower and we can adjust positions or hit areas.

---

**User**

run it

---

**Cursor**

The dev server is running.

Open **http://localhost:3000** in your browser. Scroll through the hero to see the flower illustrations appear one by one, then hover each revealed flower to see its photo card and ticket.

---

**User**

from logos and brand  paragraph and from our art studio paragraph are on same page and then a page for a video file is there and then the contact postcard page is there

---

**Cursor**

Reviewing the page layout and section components to align structure with your description.


Combining the Portfolio and Art Studio paragraphs on one white section and reordering the page: intro → showreel → contact.


The page flow now matches your layout:

### Page structure (top to bottom)

1. **Hero** — hand, scroll flowers, decorative faces  
2. **Intro (same white page)** — both paragraphs together:
   - “From logos & brand identities…” with **our Portfolio** underline  
   - “From **our Art Studio**…” with matching underline  
   - Red inline illustration slots where shown in your screenshot  
3. **Showreel** — full-viewport gray section with the looping GIFs  
4. **Contact** — postcard wizard on vermillion  
5. **Footer**

### What changed
- Merged Portfolio + Art Studio into one white `PortfolioSection` (removed the separate red Art Studio block that was between showreel and contact).  
- Reordered sections: intro → showreel → contact.  
- Each major section uses `min-h-screen` so they read as distinct scroll “pages.”

Refresh **http://localhost:3000** and scroll past the hero to see the two paragraphs on one white screen, then the video section, then the postcard.

---





