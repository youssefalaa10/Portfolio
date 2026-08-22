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

**Build status.** Phases 1–2 and 4 are complete (audit, foundation, hero) plus the
routing shell and a factual Work index. Phases 3, 5 and 6 are outlined in
§20 Roadmap. Where something is deliberately not built yet, the code says so —
there are no placeholder components standing in for real ones.

---

## 2. Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js **16.3.2**, App Router | Turbopack is the default for `dev` *and* `build` |
| Language | TypeScript 5, `strict: true` | `any` is forbidden; so is suppressing errors |
| UI | React **19.2.8** | React Compiler is **on** (`reactCompiler: true`) |
| Styling | Tailwind CSS **v4**, CSS-first config | No `tailwind.config.js` — tokens live in `@theme` |
| Animation | **motion** `^13` (`motion/react`) | The successor to framer-motion |
| Fonts | `next/font/google` | Onest (latin) + IBM Plex Sans Arabic (arabic) |
| i18n | Bespoke, ~120 lines | See §7 for why no library |
| Lint | `eslint-config-next` flat config | `next lint` was removed in 16; run `eslint` |

### Version-specific traps in Next 16

These bit during the build and are easy to reintroduce:

- **`params` and `searchParams` are Promises.** Always `await params`.
- **`middleware.ts` is renamed `proxy.ts`**, and the exported function is
  `proxy`, not `middleware`. The Node runtime is fixed and cannot be configured.
- **The root layout must render `<html>` and `<body>`.** A pass-through root
  layout returning bare `children` throws `missing-root-layout-tags`. This is why
  `app/[locale]/layout.tsx` *is* the root layout and there is no `app/layout.tsx`.
- **`next/image`'s `priority` prop is deprecated** in favour of `preload`.
- **`images.qualities` defaults to `[75]`** and is required for other values.
- **Next no longer applies `scroll-behavior: smooth` implicitly** — the `<html>`
  element carries `data-scroll-behavior="smooth"`.
- **Route type helpers (`PageProps`, `LayoutProps`) are generated**, so a clean
  `tsc --noEmit` needs `next typegen` first. This project types `params`
  explicitly instead, so a bare typecheck works in any order.

---

## 3. Directory structure

```
portfolio/
├── docs/code.md                 ← this contract
├── messages/{en,ar}.json        ← all user-facing copy
├── public/images/
│   ├── formal.png               ← archival portrait source
│   ├── hero/portrait-base.{png,webp}
│   └── projects/…
└── src/
    ├── proxy.ts                 ← locale gate
    ├── app/                     ← routing only
    │   ├── globals.css          ← design tokens + base + utilities
    │   └── [locale]/
    │       ├── layout.tsx       ← THE root layout
    │       ├── page.tsx
    │       ├── not-found.tsx
    │       └── work/page.tsx
    ├── components/ui/           ← reusable primitives
    ├── core/                    ← app-wide infrastructure
    │   ├── components/  config/  hooks/  i18n/  motion/  utils/
    └── features/                ← domain UI
        ├── hero/  home/  navigation/  work/
```

### Responsibility boundaries

| Layer | Owns | Must not contain |
| --- | --- | --- |
| `app/` | routing, layouts, metadata, boundaries, locale segment | UI implementation, business logic |
| `features/` | domain UI and behaviour for one area | anything another feature imports |
| `core/` | app-wide infrastructure: motion, i18n, hooks, config, utils | feature-specific logic |
| `components/ui/` | design-system primitives | domain knowledge, copy |

**Import direction is one-way:** `app` → `features` → `core` / `components/ui`.
A feature importing another feature is a smell; hoist the shared piece to `core`.

Route files stay thin. This is the whole of `app/[locale]/page.tsx`:

```tsx
const { locale } = await params;
const dictionary = await getDictionary(locale);
return <HomePage locale={locale} dictionary={dictionary} />;
```

---

## 4. Routing

Every route lives under `/{locale}`. `src/proxy.ts` redirects a bare path to the
best locale from `Accept-Language`, falling back to `en`.

| Route | State |
| --- | --- |
| `/en`, `/ar` | built (hero) |
| `/en/work`, `/ar/work` | built (index; factual copy only) |
| `/{locale}/work/[slug]` | not built — see §20 |
| `/{locale}/{about,services,contact}` | not built — see §20 |

Both locales are prerendered via `generateStaticParams`, and `dynamicParams =
false` makes any other locale a 404 rather than a silently generated page.

`app/` is never renamed or replaced. `features/` is not a substitute for the App
Router.

---

## 5. Design tokens

**Rule: no component may hardcode a colour, radius, easing, or duration.**

Tokens are declared once in `src/app/globals.css` under `@theme`, which is what
makes them Tailwind utilities. Tailwind's default palette is *cleared*
(`--color-*: initial`) so that `bg-zinc-50` and friends do not exist — the only
reachable colours are semantic ones.

```
background  foreground  ink  muted  subtle  line  surface  surface-2
accent  accent-from  accent-to  hero-from  hero-to
white  black  transparent  current
```

Also tokenised: `--radius-{pill,card,card-sm,control}`,
`--text-{watermark,micro}`, `--container-shell`, and
`--ease-{line,word,spring,snap}`.

The flow is one-directional:

```
token (globals.css @theme) → Tailwind utility → component
```

Opacity variants (`text-foreground/70`, `bg-white/40`) are the sanctioned way to
express the reference's many `rgba()` values — they still resolve to a token.

Arbitrary values are allowed only for genuine one-offs that are not part of a
system, and each one should be obvious from context (e.g. `max-w-[18ch]`,
`leading-[0.98]`, `tracking-[-0.02em]`).

---

## 6. Typography

- **Onest** (latin) and **IBM Plex Sans Arabic** (arabic), both via `next/font/google`,
  which self-hosts them at build time — no runtime request to Google, no layout
  shift, and no `<link rel="preconnect">` needed.
- Each exposes a CSS variable. `globals.css` resolves `--font-app` per locale
  from `html[lang]`, and `@theme inline { --font-sans: var(--font-app) }` makes
  `font-sans` follow the language automatically. **No component branches on locale
  to pick a font.**
- The Arabic stack lists Onest as a fallback so latin runs inside Arabic copy stay
  consistent.

> Building requires network access to `fonts.googleapis.com`. If you ever need an
> offline build, switch to `next/font/local` with the woff2 files vendored under
> `public/fonts/` — and record the change here.

---

## 7. Internationalisation

Locales: `en` (ltr), `ar` (rtl). Contract lives in `src/core/i18n/config.ts`.

**No i18n library.** What this project needs is locale-prefixed routes, a typed
message bundle, and `Intl` for dates — all of which the platform and the App
Router already provide. `next-intl` would add a dependency, a provider, and a
config file to replace ~120 lines. Revisit if pluralisation rules, ICU message
formatting, or per-namespace lazy loading become real requirements.

**Rules**

- All user-facing copy comes from `messages/{locale}.json`. A reusable component
  never contains a literal string a reader will see.
- `messages/en.json` defines the *shape*; `Dictionary = typeof englishMessages`.
  A missing or misspelled key in `ar.json` fails the typecheck.
- **Never duplicate a component per locale.** `HeroEnglish.tsx` / `HeroArabic.tsx`
  is a firing offence. One component, localised content.
- Copy is passed down as props from server components. There is deliberately no
  client-side translation context: it would ship the whole dictionary to the
  browser to save a few prop declarations.
- Non-translatable data (routes, technology names, email) lives in
  `core/config/site.ts`, not in messages.
- Adding a language = one entry in `LOCALES`, one direction, one `Intl` tag, one
  message file. Nothing else.

### RTL

- `lang` and `dir` are set on `<html>` in the root layout, so the first byte of
  HTML is already correct — no client-side flip.
- **Use logical properties everywhere**: `ps-*`/`pe-*`, `ms-*`/`me-*`,
  `start-*`/`end-*`, `text-start`/`text-end`. Physical `left`/`right` utilities are
  a bug unless the thing is genuinely physical.
- Direction-dependent CSS values that have no logical equivalent (mask and
  gradient directions) read from `--portrait-fade-to` / `--hero-key-x`, which are
  set once on `[dir="ltr"]` / `[dir="rtl"]` in `globals.css`. Do not scatter
  `rtl:` variants for these.
- Motion is physical, not logical. Where an animation must travel along the inline
  axis, wrap it in a `rtl:-scale-x-100` parent: flipping the parent mirrors the
  glyph *and* the child's coordinate space, so one `x: 3` is correct in both
  directions. `PillButton` is the reference implementation.
- Arabic UI copy carries **no tashkeel**. The marks render inconsistently across
  weights and add noise at display sizes.

---

## 8. The adaptive rem grid

The layout is authored in `rem` and the root font-size tracks the viewport, so
proportions hold at every width. Media queries in `globals.css` handle everything
up to 1920px (each is `16 * 100 / <design base>` vw, for bases 1920/1440/1024/360);
`core/components/adaptive-grid.tsx` scales *up* beyond 1920 with damping 0.6666.

Two deliberate decisions:

- The mobile query is `max-width: 639.98px`, not `640px`. Tailwind's `sm:`
  breakpoint resolves at exactly 640px, and overlapping there would apply the
  360-base root size to the desktop layout for one pixel.
- **Accessibility trade-off.** Viewport-relative root sizing ignores the browser's
  *default font size* preference. Browser and OS zoom still work, because zoom
  changes the CSS pixel size of a `vw`. This is a known cost of the reference's
  proportional grid; `prefers-reduced-motion` is honoured in full to compensate.

Because sizes are rem, **keep them in rem.** A `px` value in a component opts that
element out of the grid.

---

## 9. Motion

- `core/motion/springs.ts` holds **every** spring, named by role (`SPRING.hover`,
  `SPRING.reveal`, …). Values are the reference's react-spring
  `{ tension, friction }` pairs mapped onto Motion at mass 1: tension → stiffness,
  friction → damping.
- `core/motion/variants.ts` holds the reusable primitives: `fadeUp`, `fade`,
  `scaleIn`, `staggerContainer`, `lineReveal`, `wordReveal`.
- Entrance choreography lives in `HERO_DELAY`, `STAGGER` and `DURATION` so the
  timing of the whole above-the-fold sequence is readable in one place.

**A transition object literal in a component is a bug.** Reference a named spring.

### Reduced motion

`<MotionConfig reducedMotion="user">` wraps the app in the root layout. It drops
transform channels and keeps opacity, so **no component needs its own guard** and
none should have one. Separately:

- `globals.css` collapses CSS transitions and animations under
  `prefers-reduced-motion: reduce`.
- The liquid reveal opts out at the hook level and downloads nothing.

### Client boundaries

Animation is the main reason to reach for `"use client"`. Keep the boundary at the
smallest wrapper that needs it — `Reveal`, `LineReveal` and `HoverLift` exist so
that a section can stay a server component while its children animate. Do not put
`"use client"` on a section or a page.

---

## 10. The hero and the liquid reveal

`features/hero/` is the highest-fidelity piece of the project.

### The portrait asset

`public/images/formal.png` is a dark studio portrait on a near-black ground
(`#010101`). The hero needs a light-key image, so the shipped asset was derived
from it:

1. **Matte** the subject (ISNet general-use segmentation with alpha matting).
2. **Edge-decontaminate.** The source is the subject composited over black, so the
   observed pixel is premultiplied: `fg = obs / alpha`. Unpremultiplying recovers
   the true foreground and removes the dark halo on semi-transparent hair.
3. **Regrade** to a light-key editorial print in linear light: black lift 0.052,
   gamma 0.79, contrast 1.03, plus a 5% accent tint in the shadows.
4. Export transparent PNG (for `next/image`) and WebP (for `<canvas>`, which
   cannot read from the image pipeline).

The light backdrop is **CSS, not part of the asset** (`hero-backdrop` in
`globals.css`), reproducing the gradient the portrait was graded against. That
keeps it sharp at any size, free to download, and adjustable without a re-export.

`formal.png` stays in the repo as the archival source for re-derivations.

### Layering

`HeroVisual` composites back to front: backdrop → watermark → portrait → scrim →
vignette. The portrait occludes the watermark where the subject is opaque, so the
name reads as being *behind* him rather than as a flat overlay.

`portrait-fade` intersects two masks — the cropped inline-start edge, and the
lower edge. The bottom fade is not decoration: without it the near-black suit
sits under the hero's dark-on-light UI and the stack row becomes illegible.

### The reveal

The base portrait is a plain `<Image preload>` — the LCP element, server-rendered,
never dependent on JavaScript. The canvas above it paints a **warmer relight of
the same photograph** along the pointer trail, so a second photograph is never
downloaded.

Trail mechanics follow the reference exactly (brush radius 143, decay 0.016,
DPR ≤ 2, 120 idle frames before a hard clear, soft radial brush at 1 / 0.82 / 0,
interpolation step `radius * 0.3`, ≤ 60 interpolated points per event).

The relight constants in `features/hero/constants.ts` are **fitted, not invented**:
they reproduce a reference render of the intended warm grade to RMSE 0.065 over
the subject's pixels. Grading runs **once** at the image's natural size into an
offscreen canvas; resizes only `drawImage` that result, so dragging a window never
re-walks a megapixel.

**Two things must agree or the layers will not register:**
`PORTRAIT_OBJECT_POSITION` (the canvas's cover maths) and
`PORTRAIT_OBJECT_POSITION_CLASS` (the CSS on the `<Image>`). They live adjacent in
`constants.ts` for exactly this reason. Change one, change the other.

The effect gates on `(hover: hover) and (pointer: fine)` — not a width breakpoint,
because a large tablet is still touch — and on `prefers-reduced-motion`. When it
does run, a small hint appears; the hint is rendered from `active` so it can never
advertise an effect that is not there.

---

## 11. Assets

- Every asset URL resolves through `core/config/assets.ts`. A raw path string in a
  component is a forbidden pattern.
- Local assets only. The reference's remote bucket images are a visual reference,
  not a runtime dependency.
- `next/image` for everything raster. Use `preload` for the LCP image, never the
  deprecated `priority`.
- Always give `sizes` when using `fill`, or Next emits a 1x/2x `srcset` and ships
  the wrong bytes.

---

## 12. Content and data

Structured, typed data renders the UI; markup never encodes content.

| Data | Home |
| --- | --- |
| Nav routes, email, technologies, timezone | `core/config/site.ts` |
| Asset descriptors | `core/config/assets.ts` |
| Projects | `features/work/data/projects.ts` |
| All copy | `messages/{en,ar}.json` |

Projects are keyed by `slug` in both the data file and
`messages.work.projects`, so adding one is a data change in two files and never a
new component.

`projects.ts` is **deliberately incomplete**: the fuller schema the design calls
for (year, category, role, client, results, technologies) is not populated with
guesses about Youssef's work. Those fields arrive with the detail route, from his
own notes.

---

## 13. Shared UI primitives

`components/ui/`: `Shell`, `Eyebrow`, `PillButton`, `HoverLift`, and the icon set.

- **Icons**: `components/ui/icons.tsx` only. Every icon is `1em` and
  `currentColor`, so a call site controls it with `text-*` alone. Pasted `<svg>`
  markup in a feature component is a forbidden pattern.
- **`PillButton`** renders `<Link>`, `<a>` or `<button>` from the props it is
  given. Navigation is never a click handler; an action is never a link.
- A primitive earns its place by improving reuse, readability, isolation,
  accessibility or maintainability. Do not atomise every visual detail into a
  component.

---

## 14. Accessibility

Non-negotiable:

- Semantic HTML; one `<h1>` per page; no heading levels skipped.
- Buttons act, links navigate. Never a clickable `div`.
- Visible focus: `:focus-visible` uses the accent at 2px with a 2px offset.
- A skip link is the first focusable element.
- `lang` and `dir` correct in the initial HTML.
- Meaningful `alt` on content images; `aria-hidden` on decorative ones. The
  watermark is `aria-hidden` because it repeats what the `<h1>` already says.
- ARIA only where semantics fall short.
- `prefers-reduced-motion` honoured — see §9.
- Touch never depends on hover.

**Documented deviation from the reference:** the reference makes the hero card a
click target *and* nests previous/next buttons inside it, which is invalid nesting
and unreachable by keyboard. Here the controls are the only interactive elements —
two buttons plus a dot per slide — and the slide is an `aria-live="polite"` region.
Fidelity does not outrank operability.

---

## 15. Responsive behaviour

Breakpoints are Tailwind's defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

Adapt, do not shrink. Type scale, spacing, layout, hero composition, portrait
width and animation intensity all change across breakpoints. Two examples of why
this matters concretely:

- The watermark steps `3.5rem → 7rem → 13rem`. At the 360px design base a 13rem
  word is wider than the screen.
- The hero stack wraps rather than sitting in a fixed 4-column grid, because
  "TypeScript" does not fit a quarter of that column and a truncated tool name is
  not a name.

---

## 16. Performance

- Server components by default. `"use client"` only where interaction lives, at
  the smallest possible wrapper.
- One image request for the hero visual; the backdrop is CSS.
- Expensive work happens once: the reveal grade is computed at load, not per frame
  and not per resize.
- The reveal's rAF loop stops itself after 120 idle frames.
- Dictionaries are dynamically imported, so a reader downloads one language.
- `pointermove` is registered `{ passive: true }`.

---

## 17. React Compiler

The compiler is enabled. Write plain, idiomatic React.

- **Do not** add `useMemo`, `useCallback` or `memo` speculatively. Reach for them
  only with a measured reason, and say what it was in a comment.
- Prefer `useSyncExternalStore` over "mirror an external value into state with an
  effect". The clock and the pointer-capability query both do this — it is also
  what keeps `react-hooks/set-state-in-effect` quiet, and that rule is right.

---

## 18. Dependencies

Before installing anything: (1) does it already exist here, (2) can the platform,
React or Next do it, (3) can an installed dependency do it? Only then install.

Current runtime dependencies: `next`, `react`, `react-dom`, `motion`. That is all.

Decisions on record:

| Considered | Verdict |
| --- | --- |
| `motion` | **Installed.** Required for the spring/variant system. |
| `next-intl` | **Declined.** ~120 lines of bespoke i18n covers the need. §7. |
| `clsx` + `tailwind-merge` | **Declined.** This project composes classes rather than overriding them; `core/utils/cn.ts` is eight lines. |
| `lenis` (smooth scroll) | **Declined for now.** `scroll-behavior: smooth` plus `data-scroll-behavior="smooth"` covers anchor scrolling natively. Momentum smoothing is a Phase 6 question, and it is a real cost: a rAF loop that hijacks scrolling for every reader. |

---

## 19. Forbidden patterns

Unless a documented technical reason is added to this file first:

- an entire site inside one route file, or one component holding unrelated sections
- hardcoded colours, radii, easings or durations in JSX
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
- `any`, `@ts-expect-error` without justification, or disabled lint rules
- dead code, console noise, or placeholder components pretending to be real ones
- a link to a route that does not exist

`globals.css` is for tokens, base styles, and effects Tailwind cannot express
(mask compositing, the `color-mix` gradients). Nothing else.

---

## 20. Roadmap

Phases follow the original brief. Each ends with the §21 verification gate.

- **Phase 3 — Navigation.** Primary nav list + full-screen menu overlay (focus
  trap, Escape, scroll lock), footer. `PRIMARY_NAV` in `core/config/site.ts`
  already holds the routes; the header renders the list once its destinations
  exist. A menu pointing at 404s is worse than no menu — which is why the header
  currently carries only the brand, the clock and the locale switch.
- **Phase 5 — Pages.** About, Services, Contact, `work/[slug]`. Fill out the
  `Project` schema from Youssef's notes. Add the home page's remaining sections
  (About preview, CreateBand, Selected Work, Services preview, Stats, Footer)
  by appending to `features/home/components/home-page.tsx`.
- **Phase 6 — Polish.** Request modal (`role="dialog"`, `aria-modal`, focus
  management, Escape, backdrop, scroll lock, success state), the intro loader,
  scroll-driven stat count-ups, page transitions, and the Lenis decision.

Two hooks already exist for later phases: `HERO_DELAY` is expressed as an offset,
so gating the hero's entrance on an intro loader is a wrapper rather than a
rewrite; and `wordReveal` is in place for the About statement.

---

## 21. Verification gate

Run all of these, and fix before moving on. Do not accumulate errors.

```bash
npx next typegen && npx tsc --noEmit    # types
npx eslint .                            # lint — must be clean, warnings included
npx next build                          # production build
```

Then check by hand:

- [ ] `/en` and `/ar` render; `/` redirects
- [ ] LTR and RTL both correct — spacing, arrows, masks, gradients
- [ ] mobile, tablet, desktop and >1920px compositions
- [ ] reduced motion: content fully present, no transforms, no reveal canvas
- [ ] keyboard: skip link, focus order, visible focus, all controls reachable
- [ ] no console errors and no failed requests
- [ ] no link points at a route that does not exist
- [ ] this document reflects what was built
