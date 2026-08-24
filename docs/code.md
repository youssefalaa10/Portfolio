# Architecture contract

This document is the source of truth for how this project is built. **Read it
before changing anything.** If a requested change conflicts with what is written
here, the order of operations is:

1. name the conflict,
2. propose the smallest clean architectural change,
3. update this document,
4. then implement.

Silently breaking the architecture is not an option. This is not a README — it is
an engineering contract for humans and coding agents alike.

---

## 1. Purpose

A multilingual (English / Arabic), multi-page portfolio for **Youssef Alaa**, an
independent developer. Visual language is adapted from a light-palette editorial
studio reference: near-white surfaces, deep ink cards, a single burnt-orange
accent, a rem-proportional grid, and spring-driven motion.

**Build status.** The home page is complete — hero, about, band, marquee,
selected work, services, stats, footer — plus the header with its overlay menu,
the request dialog, the `/work` index, the `/work/[slug]` case-study route for
all 19 shipped projects, and the locale routing shell. A floating WhatsApp
button and a project-aware WhatsApp CTA are wired site-wide, reusing the same
contact number as everything else. What is deliberately not built yet is listed
in §21 Roadmap, and the code says so where it matters: there are no placeholder
components standing in for real ones, and nothing links to a route that does
not exist.

---

## 2. Stack

| Concern   | Choice                                | Notes                                             |
| --------- | ------------------------------------- | ------------------------------------------------- |
| Framework | Next.js **16.3.2**, App Router        | Turbopack is the default for `dev` _and_ `build`  |
| Language  | TypeScript 5, `strict: true`          | `any` is forbidden; so is suppressing errors      |
| UI        | React **19.2.8**                      | React Compiler is **on** (`reactCompiler: true`)  |
| Styling   | Tailwind CSS **v4**, CSS-first config | No `tailwind.config.js` — tokens live in `@theme` |
| Animation | **motion** `^13` (`motion/react`)     | The successor to framer-motion                    |
| Fonts     | `next/font/google`                    | Onest (latin) + IBM Plex Sans Arabic (arabic)     |
| i18n      | Bespoke, ~120 lines                   | See §7 for why no library                         |
| Lint      | `eslint-config-next` flat config      | `next lint` was removed in 16; run `eslint`       |

### Version-specific traps in Next 16

These bit during the build and are easy to reintroduce:

- **`params` and `searchParams` are Promises.** Always `await params`.
- **`middleware.ts` is renamed `proxy.ts`**, and the exported function is
  `proxy`, not `middleware`.
- **The root layout must render `<html>` and `<body>`.** A pass-through root
  layout returning bare `children` throws `missing-root-layout-tags`. This is why
  `app/[locale]/layout.tsx` _is_ the root layout and there is no `app/layout.tsx`.
- **`next/image`'s `priority` prop is deprecated** in favour of `preload`.
- **`images.qualities` defaults to `[75]`** and is required for other values.
- **Next no longer applies `scroll-behavior: smooth` implicitly** — `<html>`
  carries `data-scroll-behavior="smooth"`.
- **Route type helpers (`PageProps`, `LayoutProps`) are generated**, so a clean
  `tsc --noEmit` needs `next typegen` first. This project types `params`
  explicitly instead, so a bare typecheck works in any order.

---

## 3. Directory structure

```
portfolio/
├── docs/code.md                 ← this contract
├── messages/{en,ar}.json        ← all user-facing copy
├── public/
│   ├── Youssef_Alaa_Flutter-CV.pdf
│   └── images/
│       ├── formal.png           ← archival portrait source
│       ├── formal-2.png         ← your cut-out (415×601, kept for reference)
│       ├── hero/portrait.{png,webp}
│       └── projects/…
└── src/
    ├── proxy.ts                 ← locale gate
    ├── app/                     ← routing only
    │   ├── globals.css          ← design tokens + base + utilities
    │   └── [locale]/
    │       ├── layout.tsx       ← THE root layout, mounts the floating WhatsApp button
    │       ├── page.tsx
    │       ├── not-found.tsx
    │       └── work/
    │           ├── page.tsx
    │           └── [slug]/page.tsx   ← case-study route, all 19 projects
    ├── components/ui/           ← reusable primitives
    ├── components/lightswind/   ← bespoke HangingIdCard + ScrollTimeline (§13)
    ├── core/                    ← app-wide infrastructure
    │   ├── components/  config/  hooks/  i18n/  motion/  utils/
    └── features/
        ├── about/
        │   └── data/timeline.ts      ← proper-noun company names for ScrollTimeline
        ├── contact/
        │   └── components/whatsapp-cta.tsx, whatsapp-floating-button.tsx
        ├── footer/  hero/  home/  navigation/  services/  stats/
        └── work/
            ├── data/projects.ts      ← all 19 projects
            └── components/           ← card, grid, spotlight, and the
                                         detail-route pieces (hero, gallery,
                                         overview, features, capabilities,
                                         work-detail-page)
```

### Responsibility boundaries

| Layer            | Owns                                                        | Must not contain                  |
| ---------------- | ----------------------------------------------------------- | --------------------------------- |
| `app/`           | routing, layouts, metadata, boundaries, locale segment      | UI implementation, business logic |
| `features/`      | domain UI and behaviour for one area                        | anything another feature imports  |
| `core/`          | app-wide infrastructure: motion, i18n, hooks, config, utils | feature-specific logic            |
| `components/ui/` | design-system primitives                                    | domain knowledge, copy            |

**Import direction is one-way:** `app` → `features` → `core` / `components/ui`.

One sanctioned exception: `features/*/components/*-request-button.tsx` and
`features/navigation/*` import `features/contact`'s modal hook. The dialog is a
single shared instance by design (§13), so the alternative is three copies of the
same state. It is a hook import, not a UI import, and it is one-directional.

Route files stay thin. This is the whole of `app/[locale]/page.tsx`:

```tsx
const { locale } = await params;
const dictionary = await getDictionary(locale);
return <HomePage locale={locale} dictionary={dictionary} />;
```

---

## 4. Routing

Every page still lives under `app/[locale]/...`, but the visible URL never
carries a locale segment. **This is a deliberate deviation from this contract's
original locale-prefixed routing**, made per the process in the header of this
document: the user asked for URLs with no `/en`/`/ar` in them, so the app root
segment stays `[locale]` internally (Next 16 requires the root layout's segment
to be where `lang`/`dir` are set — see §2), while `src/proxy.ts` rewrites a
bare, prefix-free request onto `/{locale}/...` before Next's router ever sees
it. Language is a `NEXT_LOCALE` cookie, resolved on first visit from
`Accept-Language` (falling back to `en`) and set again whenever
`LocaleSwitcher` is used — never encoded in the path. A request that still
names a locale explicitly (an old bookmark, a crawler) is 301-redirected to the
prefix-free equivalent, so exactly one URL ever serves a given page.

| Route                    | State                                 |
| ------------------------ | -------------------------------------- |
| `/`                       | built — the full home page            |
| `/work`                   | built (index; factual copy only)      |
| `/work/[slug]`             | built — case study per project (19)   |
| `/{about,services,contact}` | **not planned as routes** — see below |

About and Services are **sections of the home page**, reached by hash anchor;
Contact opens the request dialog. That is sanctioned section navigation, not faked
multi-page routing — `/work` is a real route with its own page and metadata. What
each nav item does is declared once, as `kind` on `NavItem` in
`core/config/site.ts`, and `features/navigation/components/nav-link.tsx` is the
only place that reads it. Anchor hrefs resolve from `/work` the same way they did
under the old prefixed scheme (`#services`), just without a locale segment to
carry along.

Both locales are still prerendered via `generateStaticParams` (Next needs a
static `[locale]` param set for the internal route to build), and
`dynamicParams = false` makes any other locale a 404 rather than a silently
generated page — a reader just never sees `[locale]` in the address bar to
reach one directly.

**SEO trade-off, accepted knowingly:** a crawler carries no cookie, so it only
ever sees default-locale (`en`) content at each URL. There is no
`alternates.languages` entry in `generateMetadata` any more (see
`app/[locale]/layout.tsx`) because both locales now share one URL — a
`hreflang` pointing every language at the same href is not what that
annotation means, so it was removed rather than left misleading. If Arabic
discoverability in search results becomes a requirement, that calls for a
second, explicit `/ar` route tree (or reverting this section) — not a patch to
the current single-URL rewrite.

`app/` is never renamed or replaced. `features/` is not a substitute for the App
Router.

---

## 5. Design tokens

**Rule: no component may hardcode a colour, radius, easing, or duration.**

Tokens are declared once in `src/app/globals.css` under `@theme`, which is what
makes them Tailwind utilities. Tailwind's default palette is _cleared_
(`--color-*: initial`) so that `bg-zinc-50` and friends do not exist — the only
reachable colours are semantic ones.

```
background  foreground  ink  muted  subtle  line  surface  surface-2
accent  accent-from  accent-to  hero-from  hero-to
white  black  transparent  current
```

Also tokenised: `--radius-{pill,card,card-sm,control}`,
`--text-{watermark,micro}`, `--container-shell`,
`--ease-{line,word,spring,snap}`, and the two marquee animations.

The flow is one-directional:

```
token (globals.css @theme) → Tailwind utility → component
```

Opacity variants (`text-foreground/70`, `bg-white/40`) are the sanctioned way to
express the reference's many `rgba()` values — they still resolve to a token.

**Animating a colour is not an exception.** `ServicesSection`'s hover fill
animates the _opacity of a `bg-surface` layer_ rather than interpolating an
`rgba()` literal, precisely so `--color-surface` stays in one place.

Arbitrary values are allowed only for genuine one-offs that are not part of a
system, and each should be obvious from context (`max-w-[18ch]`,
`leading-[0.98]`, `tracking-[-0.02em]`).

**Documented exception: WhatsApp brand green.** `WhatsAppCta` and
`WhatsAppFloatingButton` use `bg-[#25D366]` directly rather than a token.
WhatsApp's brand colour is not part of this site's palette and never should be —
tokenising it would either pollute `@theme` with a colour used in exactly two
places, or force those two places to fake a different green through an existing
token. It is a recognised third-party mark, not a design decision, so it is
named here instead of hidden behind a token that implies otherwise.

---

## 6. Typography

### The scale is fluid, and it opts out of the rem grid

**This is the one place where sizes are not in rem, and the reason matters.**

The adaptive grid (§8) sets the root font-size from the viewport. At a 1512px
laptop the root lands at 12.6px, so a nominal `0.875rem` body ended up rendering
at **11px** — proportionally correct and far too small to read. Every text size is
therefore declared in `globals.css` as a px-based `clamp()`:

```
--text-sm:   clamp(15px, 0.62vw + 10.6px, 17.5px)
--text-4xl:  clamp(35px, 3.3vw + 18px,  56px)
```

Each size has a readable floor, grows with the viewport, and stops at a sane
ceiling. **Spacing stays on the rem grid**, so the layout is still proportional —
only type is decoupled.

Hierarchy is maintained by ratio, not by enlarging everything equally: the gap
between body (`text-sm`) and a section heading (`text-4xl`) is wider than it was
before. Line heights are paired to each size via `--text-*--line-height`.

`--text-watermark` stays in rem. It is a graphic, not text, and it should scale
with the layout.

Two consequences to remember when editing:

- Never add a `text-[13px]`-style literal. Use a scale step; add one if none fits.
- Fixed-width containers sized in rem no longer track their text. If a label
  starts clipping, widen the container rather than shrinking the type.

### Faces

- **Onest** (latin) and **IBM Plex Sans Arabic** (arabic), both via
  `next/font/google`, which self-hosts them at build time — no runtime request to
  Google, no layout shift, no `preconnect` needed.
- Each exposes a CSS variable. `globals.css` resolves `--font-app` per locale
  from `html[lang]`, and `@theme inline { --font-sans: var(--font-app) }` makes
  `font-sans` follow the language automatically. **No component branches on locale
  to pick a font.**
- The Arabic stack lists Onest as a fallback so latin runs inside Arabic copy stay
  consistent.

> Building requires network access to `fonts.googleapis.com`. For an offline
> build, switch to `next/font/local` with woff2 files vendored under
> `public/fonts/` — and record the change here.

---

## 7. Internationalisation

Locales: `en` (ltr), `ar` (rtl). Contract lives in `src/core/i18n/config.ts`.

**No i18n library.** What this project needs is a locale-aware route (internally
prefixed, see §4 for why the visible URL is not), a typed message bundle, and
`Intl` where relevant — all of which the platform and the App Router already
provide. `next-intl` would add a dependency, a provider, and a config file to
replace ~120 lines. Revisit if ICU message formatting, pluralisation rules, or
per-namespace lazy loading become real requirements.

**Rules**

- All user-facing copy comes from `messages/{locale}.json`. A reusable component
  never contains a literal string a reader will see.
- `messages/en.json` defines the _shape_; `Dictionary = typeof englishMessages`.
  A missing or misspelled key in `ar.json` fails the typecheck.
- JSON values widen to `string`, so a type that mirrors a message shape must
  accept `string` and narrow at the use site. `WordRun.tone` is the example: only
  `"muted"` is recognised, anything else renders at default emphasis.
- **Never duplicate a component per locale.** `HeroEnglish.tsx` /
  `HeroArabic.tsx` is a firing offence. One component, localised content.
- Copy is passed down as props from server components. There is deliberately no
  client-side translation context: it would ship the whole dictionary to the
  browser to save a few prop declarations.
- Non-translatable data (routes, technology names, email, CV path, stat values)
  lives in `core/config/` or a feature's `data/`, not in messages.
- Adding a language = one entry in `LOCALES`, one direction, one `Intl` tag, one
  message file. Nothing else.

### RTL

- `lang` and `dir` are set on `<html>` in the root layout, so the first byte of
  HTML is already correct — no client-side flip.
- **Use logical properties everywhere**: `ps-*`/`pe-*`, `ms-*`/`me-*`,
  `start-*`/`end-*`, `text-start`/`text-end`. Physical `left`/`right` utilities are
  a bug unless the thing is genuinely physical.
- Direction-dependent CSS with no logical equivalent (mask and gradient
  directions) reads from `--portrait-fade-to` / `--hero-key-x`, set once on
  `[dir="ltr"]` / `[dir="rtl"]` in `globals.css`. Do not scatter `rtl:` variants
  for these.
- **Motion is physical, not logical.** Where an animation travels along the
  inline axis, wrap it so a `rtl:-scale-x-100` parent mirrors the coordinate
  space. Two shapes, and the difference matters:
  - _Arrows_: two levels. The flip mirrors the glyph **and** the motion, which is
    correct — the arrow should point the other way. See `PillButton`.
  - _Text_: three levels. Flip, animate, flip back, so the travel reverses but
    the label stays readable. See `AnimatedLink`.
- Arabic UI copy carries **no tashkeel**. The marks render inconsistently across
  weights and add noise at display sizes.

---

## 8. The adaptive rem grid

The layout is authored in `rem` and the root font-size tracks the viewport, so
proportions hold at every width. Media queries in `globals.css` handle everything
up to 1920px (each is `16 * 100 / <design base>` vw, for bases 1920/1440/1024/360);
`core/components/adaptive-grid.tsx` scales _up_ beyond 1920 with damping 0.6666.

Two deliberate decisions:

- The mobile query is `max-width: 639.98px`, not `640px`. Tailwind's `sm:`
  breakpoint resolves at exactly 640px, and overlapping there would apply the
  360-base root size to the desktop layout for one pixel.
- **Accessibility trade-off.** Viewport-relative root sizing ignores the browser's
  _default font size_ preference. Browser and OS zoom still work, because zoom
  changes the CSS pixel size of a `vw`. This is a known cost of the reference's
  proportional grid; `prefers-reduced-motion` is honoured in full to compensate.

Because sizes are rem, **keep them in rem.** A `px` value in a component opts that
element out of the grid. This extends to animated values: the services row
animates `paddingInline` in rem for the same reason.

---

## 9. Motion

- `core/motion/springs.ts` holds **every** spring, named by role (`SPRING.hover`,
  `SPRING.reveal`, …). Values are the reference's react-spring
  `{ tension, friction }` pairs mapped onto Motion at mass 1: tension → stiffness,
  friction → damping.
- `core/motion/variants.ts` holds the reusable primitives: `fadeUp`, `fade`,
  `scaleIn`, `staggerContainer`, `lineReveal`, `wordReveal`.
- Entrance choreography lives in `HERO_DELAY`, `STAGGER` and `DURATION`.

**A transition object literal in a component is a bug.** Reference a named spring.

### Reveal primitives

| Primitive    | Use                                            |
| ------------ | ---------------------------------------------- |
| `Reveal`     | fade-up / fade / scale-in, on mount or in view |
| `LineReveal` | headings — each line rises out of its own clip |
| `WordReveal` | statements — per-word stagger, with muted runs |
| `CountUp`    | a number that counts up once and holds         |
| `Marquee`    | infinite CSS ticker, no JavaScript             |

Explicit `lines` and `runs` arrays come from `messages`, so break points and
emphasis are translation decisions rather than a consequence of wrapping.

### Reduced motion

`<MotionConfig reducedMotion="user">` wraps the app in the root layout. It drops
transform channels and keeps opacity, so **no component needs its own guard** and
none should have one. Separately:

- `globals.css` collapses CSS transitions and animations under
  `prefers-reduced-motion: reduce` — which also stops the marquee.
- The cursor reveal opts out at the hook level and downloads nothing.
- `CountUp` lands on its value with duration 0.

### Hydration and motion

Anything whose rendered _text_ depends on a client-only measurement must render
the same thing on the server and on the first client render. `CountUp` starts at
`0` in both and animates from there; branching on `useReducedMotion()` in the
returned JSX is what caused React error #418 before it was fixed. The same rule
retired the header clock.

### Client boundaries

Animation is the main reason to reach for `"use client"`. Keep the boundary at the
smallest wrapper that needs it — `Reveal`, `LineReveal`, `HoverLift` and the
`*RequestButton` wrappers exist so sections can stay server components. Do not put
`"use client"` on a page or a whole section.

---

## 10. The hero

`features/hero/` is the highest-fidelity piece of the project.

### The portrait asset

`public/images/formal.png` is a dark studio portrait on a near-black ground
(`#010101`). The shipped asset was derived from it:

1. **Matte** the subject (ISNet general-use segmentation with alpha matting).
2. **Edge-decontaminate.** The source is the subject composited over black, so the
   observed pixel is premultiplied: `fg = obs / alpha`. Unpremultiplying recovers
   the true foreground and removes the dark halo on semi-transparent hair.
3. **Regrade** to a light-key _editorial_ print in linear light: black lift 0.028,
   gamma 0.88, contrast 1.06, plus a 4% accent tint in the shadows. The suit keeps
   its ink weight — a washed-out grade makes the figure read as a cutout rather
   than a photograph.
4. Export transparent PNG (for `next/image`) and WebP (for `<canvas>`, which
   cannot read from the image pipeline).

Derived at the original **941×1360**, not from `formal-2.png` (415×601): the hero
box is wider than that on every desktop viewport, so the smaller cut-out would be
upscaled. `formal-2.png` and `formal.png` both stay in the repo as sources.

The light backdrop is **CSS, not part of the asset** (`hero-backdrop`),
reproducing the gradient the portrait was graded against. That keeps it sharp at
any size, free to download, and adjustable without a re-export.

### Layering

`HeroVisual` composites back to front: backdrop → watermark → portrait → scrim →
vignette. The portrait occludes the watermark where the subject is opaque, so the
name reads as being _behind_ him rather than as a flat overlay.

`portrait-fade` intersects two masks — the cropped inline-start edge, and the
lower edge. The bottom fade is not decoration: without it the near-black suit sits
under the hero's dark-on-light UI and anything placed there becomes illegible.

Below `sm` the portrait drops to `opacity-55` and the scrim strengthens
(`--scrim-near` / `--scrim-far`), because the headline has to run across it. At
`sm` and up the columns separate and it comes forward as the subject again.

### The cursor reveal

The base portrait is a plain `<Image preload>` — the LCP element, server-rendered
— shown **desaturated** by `PORTRAIT_BASE_FILTER`. The canvas above paints the
_same_ photograph in full colour along the pointer's trail, so moving the cursor
brings the colour back.

Two earlier approaches are recorded in `use-cursor-relight.ts` because both
produced visible artefacts, and re-deriving either would reintroduce them:

1. **Painting a regraded copy.** The layers differed in warmth, so the brush's
   soft circular edge was visible as a blob sliding over the image — the glassy
   lens.
2. **Painting warm light and blending it.** `lighter` accumulation clips red and
   green to 255 while blue lags near 179, so a heavily overlapped trail turned
   olive-green with magenta fringes. Measured in-browser, not guessed.

A saturation reveal has neither failure mode: the layers are pixel-identical in
geometry _and_ hue, differing only in chroma, so the brush edge reads as colour
blooming rather than as an object with an outline. There is no channel arithmetic
to blow out, and no CSS blend mode is involved.

Trail mechanics follow the reference (brush radius 143, decay 0.016, DPR ≤ 2, 120
idle frames before a hard clear, soft radial brush at 1 / 0.82 / 0, interpolation
step `radius * 0.3`, ≤ 60 interpolated points per event). Because the portrait is
a cut-out, the `source-in` stamp clips the trail to his silhouette for free.

**Two things must agree or the layers will not register:**
`PORTRAIT_OBJECT_POSITION` (the canvas's cover maths) and
`PORTRAIT_OBJECT_POSITION_CLASS` (the CSS on the `<Image>`). They live adjacent in
`constants.ts` for exactly this reason.

**No discoverability affordance is rendered on top of the portrait.** An earlier
version paired the trail with `CursorLens`, a spring-tracked ring plus a "Move to
reveal" label that appeared while the pointer was over the portrait. It was
removed — the reveal is now a quiet surprise for anyone who happens to hover
rather than a hinted interaction, which reads calmer next to the rest of the
hero. If a discoverability cue is reintroduced later, it should not be a second
component: extend the canvas layer itself rather than layering another element
over the portrait.

The whole effect gates on `(hover: hover) and (pointer: fine)` — not a width
breakpoint, because a large tablet is still touch — and on
`prefers-reduced-motion`. Verified: neither a touch context nor a reduced-motion
context requests `portrait.webp` at all.

---

## 11. Assets

- Every asset URL resolves through `core/config/assets.ts`. A raw path string in a
  component is a forbidden pattern.
- Local assets only. The reference's remote bucket images are a visual reference,
  not a runtime dependency.
- `next/image` for everything raster. Use `preload` for the LCP image, never the
  deprecated `priority`. Always give `sizes` when using `fill`.
- **The CV is a download, so it must be a plain `<a download>`.** Routing a file
  through the client router navigates to it instead of saving it — `PillButton`
  switches to an anchor whenever `download` is set, for this reason.
- **Background `<video>` sources must be H.264 (`avc1`), not HEVC/H.265.**
  `public/enter_vd.mp4` (the Services hero's ambient loop) shipped HEVC-encoded
  at one point — it silently fails to play in Chrome and Firefox on every
  platform that lacks a paid/OEM HEVC extension, which is most of the traffic
  this site gets, so the loop rendered as nothing rather than as a background
  effect. Re-encode with `ffmpeg -an -c:v libx264 -pix_fmt yuv420p` (a `crf`
  around 24–28 is plenty for a decorative, blended-down loop) before adding any
  future background video.

---

## 12. Content and data

Structured, typed data renders the UI; markup never encodes content.

| Data                                                         | Home                               |
| ------------------------------------------------------------ | ----------------------------------- |
| Nav items and their `kind`, email, WhatsApp number, tech names, section ids | `core/config/site.ts` |
| Asset descriptors, CV                                        | `core/config/assets.ts`            |
| Projects                                                     | `features/work/data/projects.ts`   |
| Timeline company names                                       | `features/about/data/timeline.ts`  |
| Stat values                                                  | `features/stats/data/stats.ts`     |
| All copy                                                     | `messages/{en,ar}.json`            |

Projects are keyed by `slug` in both the data file and
`messages.work.projects`, so adding one is a data change in two files and never a
new component. `ProjectGrid` is shared by the home section and `/work`, so the two
cannot drift apart.

Two stat values are **derived** — project count from `PROJECTS.length`, years from
`SITE.workingSince` — so they cannot go stale.

`Project` carries `cover`, `gallery` (case-study screenshots beyond the cover),
`tags` (proper-noun tech stack), `category` (`"mobile" | "web"`, used for the
card's category label and the detail gallery's aspect ratio) and an optional
`href` for a live store/site link. `cover` and `gallery` are raw `/images/...`
path strings rather than resolving through `core/config/assets.ts` — a narrow,
precedented exception to §11 for this one field, because the asset resolver is
built for a fixed, named set of site assets (hero, CV) and 19 projects × several
screenshots each would mean 19 one-off entries there for no benefit over the
`p(slug)` path helper already local to `projects.ts`.

`WHATSAPP_NUMBER` and `whatsappHref()` live in `core/config/site.ts`, next to
`CONTACT_HREF`, and are the single source every WhatsApp surface — the
project-aware CTA and the floating button — reads from. Never a second
hardcoded number.

Two things are deliberately incomplete rather than invented:

- `SOCIAL_LINKS` is empty. A chip linking to `github.com/` is worse than no chip;
  the About and footer blocks hide themselves while the list is empty.
- `Project` has no `year`, `role`, `client` or `results`. Those are facts about
  your work that have not been recorded yet; nothing claims a client count, a
  rating, or a retention figure.

---

## 13. Shared UI primitives

`components/ui/`: `Shell`, `Eyebrow`, `SectionHeading`, `PillButton`,
`AnimatedLink`, `TagChip`, `HoverLift`, and the icon set.

- **Icons**: `components/ui/icons.tsx` only. Every icon is `1em` and
  `currentColor`, so a call site controls it with `text-*` alone. Pasted `<svg>`
  markup in a feature component is a forbidden pattern. `WhatsApp` was added here
  for the CTA and floating button, following the same rule.
- **`PillButton`** is exactly one of three things and the type system says so: a
  link (optionally a download), an action, or a form submit. There is no shape
  where it is ambiguous. Navigation is never a click handler; an action is never a
  link.
- **The request dialog is a single shared instance.** `RequestModalProvider` sits
  in the root layout; the header, hero and footer call `useRequestModal().open()`.
  Three copies would mean three pieces of state and three focus traps competing.
- **`WhatsAppCta`** (`features/contact/components/whatsapp-cta.tsx`) and
  **`WhatsAppFloatingButton`** (`.../whatsapp-floating-button.tsx`) are the two
  shared WhatsApp surfaces. `WhatsAppCta` takes an optional `projectName` and
  fills `messages.whatsapp.messageTemplate`'s `{project}` placeholder, or falls
  back to `messages.whatsapp.messageGeneric`; both build their `href` through
  `whatsappHref()` (§12), never a literal `wa.me` URL. `WhatsAppFloatingButton` is
  mounted once, in `app/[locale]/layout.tsx`, the same singleton reasoning as the
  request dialog above.
- **`components/lightswind/hanging-id-card.tsx`** (`HangingIdCard`) and
  **`.../scroll-timeline.tsx`** (`ScrollTimeline`) power the About page's
  Profile & Ethos card and journey timeline. Both are hand-built against this
  project's own `motion`/`SPRING`/`variants` system rather than installed from
  the `lightswind` npm package: the package is a shadcn-style CLI registry with
  an ambiguous paid tier gating some components, and installing it would also
  mean a second animation/styling convention living alongside §9's spring system
  for exactly two components. Same prop surface as the package (`name`, `role`,
  `badgeId`, `accentColor`, `ropeLength` for the card; `events`, `title`,
  `subtitle`, `progressIndicator`, `cardAlignment`, `revealAnimation` for the
  timeline), zero new dependency.
- A primitive earns its place by improving reuse, readability, isolation,
  accessibility or maintainability. Do not atomise every visual detail.

---

## 14. Overlays

Both the nav menu and the request dialog use the same two hooks, and any future
overlay must too:

- `core/hooks/use-scroll-lock.ts` — freezes scroll, compensates for the
  scrollbar's width so the layout does not shift sideways, and **counts nested
  locks** so closing one overlay does not unlock the page under another.
- `core/hooks/use-focus-trap.ts` — keeps Tab inside the overlay, moves focus in on
  open, returns it to the trigger on close, and handles Escape.

Verified: the dialog exposes `role="dialog"`, `aria-modal="true"` and
`aria-labelledby`; focus moves in, Escape closes, focus returns to the button that
opened it, and `body` overflow is restored.

Submission is a **local stub**. There is no backend, and pretending otherwise
would silently drop what someone typed. The success state exists so the flow is
complete and reviewable; wiring a real endpoint is one handler.

---

## 15. Accessibility

Non-negotiable:

- Semantic HTML; one `<h1>` per page; no heading levels skipped. Verified order:
  `h1` (hero) → `h2` per section → `h3` per card/row.
- Buttons act, links navigate. Never a clickable `div`.
- Visible focus: `:focus-visible` uses the accent at 2px with a 2px offset.
- A skip link is the first focusable element. Verified tab order:
  skip → brand → Work → Services → About → Contact → CV → locale → hero CTA.
- `lang` and `dir` correct in the initial HTML.
- Meaningful `alt` on content images; `aria-hidden` on decorative ones. Both
  watermarks are `aria-hidden` because they repeat what a heading already says.
- ARIA only where semantics fall short.
- `prefers-reduced-motion` honoured — see §9. Verified: no element is left faded
  and the stats show their final values.
- Touch never depends on hover.

**Documented deviations from the reference**, both because fidelity does not
outrank operability:

- The reference makes the hero card a click target _and_ nests previous/next
  buttons inside it — invalid nesting, unreachable by keyboard. Here the controls
  are the only interactive elements (two buttons plus a dot per slide) and the
  slide is an `aria-live="polite"` region.
- Service rows are not links. Each names something you do, and there is no service
  detail page to send anyone to; the arrow is decorative until there is.

---

## 16. Responsive behaviour

Breakpoints are Tailwind's defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

Adapt, do not shrink. Concrete examples of why this matters:

- The watermark steps `3.5rem → 7rem → 13rem`. At the 360px design base a 13rem
  word is wider than the screen.
- The portrait steps `92% → 70% → 56% → 52%` **and** changes role below `sm`,
  dropping to `opacity-55` so the headline can cross it.
- The inline nav appears only at `lg`; below that the overlay menu carries it.
- The service row description is hidden below `lg` rather than wrapping under the
  title.

---

## 17. Performance

- Server components by default. `"use client"` only where interaction lives, at
  the smallest possible wrapper.
- One image request for the hero visual; the backdrop is CSS. The reveal's second
  asset is fetched only where the effect actually runs.
- The marquee is a CSS animation in a server component — no JavaScript at all.
- Expensive work happens once: the reveal's cover canvas is rebuilt on resize, not
  per frame.
- The reveal's rAF loop stops itself after 120 idle frames.
- Dictionaries are dynamically imported, so a reader downloads one language.
- `pointermove` is registered `{ passive: true }`.

---

## 18. React Compiler

The compiler is enabled. Write plain, idiomatic React.

- **Do not** add `useMemo`, `useCallback` or `memo` speculatively. Reach for them
  only with a measured reason, and say what it was in a comment.
- Prefer `useSyncExternalStore` over "mirror an external value into state with an
  effect". `use-interactive-pointer.ts` is the example. This is also what keeps
  `react-hooks/set-state-in-effect` quiet, and that rule is right.

---

## 19. Dependencies

Before installing anything: (1) does it already exist here, (2) can the platform,
React or Next do it, (3) can an installed dependency do it? Only then install.

Current runtime dependencies: `next`, `react`, `react-dom`, `motion`. That is all.

Decisions on record:

| Considered                    | Verdict                                                                                                                                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `motion`                      | **Installed.** Required for the spring/variant system.                                                                                                                                                                              |
| `next-intl`                   | **Declined.** ~120 lines of bespoke i18n covers the need. §7.                                                                                                                                                                       |
| `clsx` + `tailwind-merge`     | **Declined.** This project composes classes rather than overriding them; `core/utils/cn.ts` is eight lines.                                                                                                                         |
| `lenis` (smooth scroll)       | **Declined.** `scroll-behavior: smooth` plus `data-scroll-behavior="smooth"` covers anchor scrolling natively. Momentum smoothing costs a rAF loop that hijacks scrolling for every reader, and it fights `prefers-reduced-motion`. |
| A focus-trap / dialog library | **Declined.** `use-focus-trap.ts` is 60 lines and the project has exactly two overlays. Revisit if nested dialogs or popovers arrive.                                                                                               |

---

## 20. Forbidden patterns

Unless a documented technical reason is added to this file first:

- an entire site inside one route file, or one component holding unrelated sections
- hardcoded colours, radii, easings or durations in JSX — **including as animation
  targets**
- hardcoded user-facing copy in a reusable component
- duplicated per-locale components
- business logic in route files
- transition object literals copied between files
- a large `globals.css` holding component styles
- `"use client"` on pages or whole sections
- speculative `useMemo` / `useCallback` / `memo`
- physical `left`/`right` where a logical property exists
- inline `<svg>` markup outside the icon module
- raw asset paths outside `core/config/assets.ts`
- rendering different text on the server and the first client render
- `any`, `@ts-expect-error` without justification, or disabled lint rules
- dead code, console noise, or placeholder components pretending to be real ones
- a link to a route that does not exist
- inventing facts about Youssef's work, clients, or numbers

`globals.css` is for tokens, base styles, and effects Tailwind cannot express
(mask compositing, `color-mix` gradients, the marquee keyframes). Nothing else.

---

## 21. Roadmap

- **Social links.** Add your handles to `SOCIAL_LINKS`; the About and footer rows
  render themselves.
- **Intro loader.** `HERO_DELAY` is expressed as an offset, so gating the hero's
  entrance on a loader is a wrapper rather than a rewrite.
- **A real contact endpoint.** Replace the stub in `RequestModal.onSubmit`.
- **Page transitions**, if you want them, and the Lenis question in §19.

---

## 22. Verification gate

Run all of these, and fix before moving on. Do not accumulate errors.

```bash
npx next typegen && npx tsc --noEmit    # types
npx eslint .                            # lint — must be clean, warnings included
npx next build                          # production build
```

Then check by hand:

- [ ] `/` renders in both languages (switch via `LocaleSwitcher`, no URL change);
      an explicit `/en` or `/ar` redirects to the prefix-free path
- [ ] LTR and RTL both correct — spacing, arrows, masks, gradients
- [ ] mobile, tablet, desktop and >1920px compositions
- [ ] reduced motion: content fully present, no transforms, no reveal canvas
- [ ] touch: no hover dependency, and the reveal asset is not downloaded
- [ ] keyboard: skip link, focus order, visible focus, both overlays trap and
      restore focus, Escape closes
- [ ] no console errors and no failed requests
- [ ] no link points at a route that does not exist
- [ ] this document reflects what was built

A note on verifying reveals with a headless browser: `scroll-behavior: smooth`
swallows rapid programmatic `scrollTo` calls, so in-view reveals never fire and
whole sections look broken. Set `scrollBehavior = 'auto'` and use
`behavior: 'instant'` before sweeping the page.

---

## 23. The phone showcase

`features/showcase/` is the device that bridges the hero and the section below it.

### What it is, and is not

A **decorative illustration of mobile development** — a Flutter mark and a few
abstract interface shapes. It is deliberately *not* a screenshot of any real app;
using or recovering screens from the project renders was explicitly ruled out.

Because the contents carry no information, the whole screen is `aria-hidden`
behind a single `sr-only` label describing what it depicts.

### The frame is CSS

Chosen over an SVG frame or a transparent PNG mockup on every axis: it weighs
nothing, stays crisp at any DPI without a 2x asset, scales through
`aspect-ratio` plus a percentage width instead of needing per-breakpoint files,
reads the project's colour tokens so it cannot drift from the palette, and raises
no licensing or watermark question.

Everything inside is sized in **percentages of the frame**, so the device scales
as one object.

### The bridge

The section is pulled up with a negative margin (`-mt-24 sm:-mt-32 lg:-mt-40`) so
the device's upper third crosses the hero's rounded bottom edge. It works because
the showcase is a **sibling** of the hero, not a child — the hero's
`overflow-hidden` cannot clip it.

Annotation labels are held clear of that overlap on purpose. The device may cross
into the hero; text must not, or it collides with the status bar.

### Motion budget

- **One** scroll subscription (`useScroll`), which Motion backs with a single
  passive listener. No scroll handlers of our own, anywhere in the project.
- Only `transform` and `opacity` animate. Nothing here can trigger layout.
- `y`, `rotate` and `scale` run through **one** low-stiffness spring, so the
  device settles rather than tracking the wheel — it should feel heavy.
- Labels and connectors reveal **once** and then hold still. The connector draw
  animates `pathLength`, a single stroke property.
- Under reduced motion the device renders settled and the scroll mapping is
  skipped entirely.

### Responsive

- Labels appear at `lg`, where there is room for a connector; the two marked
  `secondary` wait for `xl`. Below `lg` they are hidden rather than shrunk.
- The device is a percentage width with a `max-w`, so it cannot cause horizontal
  overflow — asserted in the verification sweep.
