# VietinBank Co-apping Web — Design System

This document defines the official design system for the VietinBank Co-apping Web platform and its mobile app counterpart (WellnessRace). All UI components, screens, and features must adhere to these specifications.

---

## Brand Identity

**Product**: VietinBank Co-apping Web  
**Platform**: Web (responsive) + Mobile App (iOS/Android)  
**Target users**: Vietnamese enterprise employees and HR administrators  
**Language**: Vietnamese (primary), English (secondary)

---

## Color Palette

### Primary — VietinBank Green

| Token | Hex | HSL | WCAG on white | Usage |
|---|---|---|---|---|
| `--primary` | `#008C44` | `hsl(145, 100%, 27%)` | 4.9:1 (AA) | CTA buttons, active nav, links |
| `--primary-light` | `#00A650` | `hsl(141, 100%, 33%)` | 3.8:1 | Hover states, icon fills |
| `--primary-dark` | `#006633` | `hsl(147, 100%, 20%)` | 6.8:1 (AA) | Pressed states, focus rings |
| `--primary-subtle` | `#E6F4ED` | `hsl(145, 50%, 93%)` | — | Tinted backgrounds, chips |

### Accent — Gold

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--accent` | `#FFC300` | `hsl(46, 100%, 50%)` | Badge highlights, achievements, star ratings |
| `--accent-dark` | `#CC9900` | `hsl(46, 100%, 40%)` | Accent text on light backgrounds |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--destructive` | `#DC2626` | Errors, delete actions |
| `--warning` | `#F59E0B` | Warnings, caution states |
| `--success` | `#10B981` | Success confirmations, completed states |
| `--info` | `#3B82F6` | Informational banners, tooltips |

### Neutral Scale

| Token | Hex | Usage |
|---|---|---|
| `--neutral-50` | `#F9FAFB` | Page background |
| `--neutral-100` | `#F3F4F6` | Card background (subtle) |
| `--neutral-200` | `#E5E7EB` | Borders, dividers |
| `--neutral-300` | `#D1D5DB` | Disabled elements |
| `--neutral-400` | `#9CA3AF` | Placeholder text |
| `--neutral-500` | `#6B7280` | Secondary text |
| `--neutral-600` | `#4B5563` | Body text (secondary) |
| `--neutral-700` | `#374151` | Body text |
| `--neutral-800` | `#1F2937` | Headings |
| `--neutral-900` | `#111827` | Primary text |

### Dark Mode Tokens

| Token | Value | Notes |
|---|---|---|
| `--background` | `hsl(222, 47%, 11%)` | Dark navy (not pure black) |
| `--surface` | `hsl(222, 47%, 14%)` | Card/panel backgrounds |
| `--surface-raised` | `hsl(222, 47%, 17%)` | Elevated surfaces (dropdowns, modals) |
| `--border` | `hsl(222, 47%, 22%)` | Borders in dark mode |
| `--foreground` | `hsl(210, 40%, 98%)` | Primary text |
| `--muted-foreground` | `hsl(215, 20%, 65%)` | Secondary text |
| `--primary` (dark) | `#00A650` | Lighter green for dark bg contrast |

---

## Typography

**Font family**: `Be Vietnam Pro` (Google Fonts)  
**Weights loaded**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)  
**Fallback**: `ui-sans-serif, system-ui, -apple-system, sans-serif`

### Type Scale

| Style | Element | Weight | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| Display | — | 700 | 36px / 2.25rem | 1.2 | -0.02em | Hero headings |
| H1 | `<h1>` | 700 | 30px / 1.875rem | 1.3 | -0.01em | Page titles |
| H2 | `<h2>` | 600 | 24px / 1.5rem | 1.35 | -0.01em | Section headings |
| H3 | `<h3>` | 600 | 20px / 1.25rem | 1.4 | 0 | Card headings |
| H4 | `<h4>` | 600 | 18px / 1.125rem | 1.4 | 0 | Sub-section headings |
| Body LG | `<p>` | 400 | 18px / 1.125rem | 1.7 | 0 | Intro/lead text |
| Body | `<p>` | 400 | 16px / 1rem | 1.6 | 0 | Default body |
| Body SM | `<p>` | 400 | 14px / 0.875rem | 1.5 | 0 | Secondary, captions |
| Caption | `<span>` | 400 | 12px / 0.75rem | 1.4 | 0.01em | Labels, metadata |
| Label | `<label>` | 500 | 14px / 0.875rem | 1 | 0.01em | Form labels, badges |
| Code | `<code>` | 400 | 14px / 0.875rem | 1.5 | 0 | Code snippets |

### Vietnamese Typography Notes

- Always use `lang="vi"` on the `<html>` element
- Vietnamese characters require adequate line height (1.5 minimum for body)
- Avoid `text-transform: uppercase` on Vietnamese text — diacritics become unreadable
- Date format: `dd tháng MM, yyyy` (e.g., "12 tháng 4, 2026")
- Currency: `1.200.000 ₫` (dot as thousands separator, space before ₫)

---

## Spacing System — 4px Grid

All spacing values are multiples of 4px.

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `--space-1` | 4px | `p-1` | Micro spacing (icon padding) |
| `--space-2` | 8px | `p-2` | Tight spacing |
| `--space-3` | 12px | `p-3` | Compact elements |
| `--space-4` | 16px | `p-4` | Default spacing |
| `--space-6` | 24px | `p-6` | Card padding (desktop) |
| `--space-8` | 32px | `p-8` | Section padding |
| `--space-10` | 40px | `p-10` | Large sections |
| `--space-12` | 48px | `p-12` | Page padding |
| `--space-16` | 64px | `p-16` | Hero sections |
| `--space-20` | 80px | `p-20` | Large hero spacing |
| `--space-24` | 96px | `p-24` | Max section padding |

---

## Border Radius

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `--radius-none` | 0 | `rounded-none` | Tables, full-bleed images |
| `--radius-sm` | 4px | `rounded` | Input fields, small tags |
| `--radius-md` | 8px | `rounded-lg` | Buttons, cards, chips |
| `--radius-lg` | 16px | `rounded-2xl` | Modals, bottom sheets, panels |
| `--radius-xl` | 24px | `rounded-3xl` | Hero cards, feature cards |
| `--radius-full` | 9999px | `rounded-full` | Avatars, pills, FABs, badges |

---

## Elevation & Shadows

```css
/* Light mode */
--shadow-sm:  0 1px 2px   0 rgba(0, 0, 0, 0.05);
--shadow-md:  0 4px 6px  -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px  -2px rgba(0, 0, 0, 0.05);
--shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Dark mode — tinted with primary */
--shadow-sm:  0 1px 2px   0 rgba(0, 0, 0, 0.20);
--shadow-md:  0 4px 6px  -1px rgba(0, 0, 0, 0.30);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.40);
```

---

## Component Specifications

### Buttons

| Variant | Height | Padding H | Border Radius | Usage |
|---|---|---|---|---|
| Primary | 44px | 24px | 8px | Main CTAs |
| Secondary | 44px | 24px | 8px | Secondary actions |
| Ghost | 40px | 16px | 8px | Tertiary, icon buttons |
| Destructive | 44px | 24px | 8px | Delete, danger actions |
| Link | auto | 0 | 0 | Inline links |
| Icon | 44×44px | — | 8px or full | Icon-only actions |
| FAB | 56×56px | — | full | Floating action (mobile) |

**States**: default → hover (10% darker) → active/pressed (15% darker) → disabled (40% opacity) → loading (spinner replaces label)

### Form Inputs

| Component | Height | Border Radius | Usage |
|---|---|---|---|
| Text input | 44px | 8px | Single-line text |
| Textarea | auto (min 88px) | 8px | Multi-line text |
| Select | 44px | 8px | Dropdown selection |
| Checkbox | 20×20px | 4px | Multi-select |
| Radio | 20×20px | full | Single select |
| Toggle/Switch | 24×44px touch | — | On/off settings |

### Cards

| Type | Padding | Radius | Shadow | Usage |
|---|---|---|---|---|
| Default | 16px (mobile) / 24px (desktop) | 16px | md | Content cards |
| Compact | 12px | 8px | sm | List item cards |
| Hero | 24px | 24px | lg | Feature highlight cards |
| Stat | 16px | 16px | sm | KPI/metric cards |

### Avatars

| Size | Dimensions | Usage |
|---|---|---|
| XS | 24×24px | Inline mentions |
| SM | 32×32px | List items, comments |
| MD | 40×40px | Default user avatar |
| LG | 48×48px | Profile headers (mobile) |
| XL | 64×64px | Profile headers (desktop) |
| 2XL | 96×96px | Profile page |

### Badges / Chips

| Type | Height | Padding H | Radius | Usage |
|---|---|---|---|---|
| Status badge | 24px | 8px | full | Active/Inactive/Draft |
| Achievement badge | 24px | 8px | full | Earned badges |
| Count chip | 20px | 6px | full | Notification counts |
| Tag | 28px | 10px | full | Category filters |

---

## Layout & Navigation

### Breakpoints

| Name | Min width | Layout mode | Navigation |
|---|---|---|---|
| `xs` | 320px | Mobile | BottomNav (5 tabs) |
| `sm` | 375px | Mobile | BottomNav (5 tabs) |
| `md` | 768px | Tablet | BottomNav or Sidebar (collapsed) |
| `lg` | 1024px | Desktop | Sidebar (expanded, 240px) |
| `xl` | 1440px | Wide desktop | Sidebar (expanded, 240px) |

### Navigation Components

#### BottomNav (Mobile — xs to md)

```
Height:     64px
Position:   fixed bottom-0, z-50
Safe area:  padding-bottom: env(safe-area-inset-bottom)
Background: bg-background/80 backdrop-blur-md border-t
Tabs:       5 tabs max — icon (24px) + label (10px caption)
Active:     primary color icon + label, no background fill
Inactive:   neutral-400
Touch zone: min 44px per tab (flex-1)
```

#### TopBar (Mobile — xs to md)

```
Height:     56px
Position:   sticky top-0, z-40
Safe area:  padding-top: env(safe-area-inset-top)
Background: bg-background/80 backdrop-blur-md border-b
Content:    [Back/Menu icon] [Page title] [Action icon(s)]
```

#### Sidebar (Desktop — lg+)

```
Width:      240px (expanded), 64px (collapsed)
Position:   fixed left-0, full height
Background: bg-background border-r
Logo area:  64px height
Nav items:  44px height, 16px horizontal padding
Active:     primary-subtle bg + primary text
Collapse:   icon-only mode, tooltip on hover
```

### Page Layout Grid

| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| xs–sm | 4 | 16px | 16px |
| md | 8 | 24px | 24px |
| lg | 12 | 24px | 32px |
| xl | 12 | 32px | auto (max-w-7xl) |

---

## Mobile App Guidelines

### Touch Targets

- **Minimum**: 44×44px for all interactive elements (Apple HIG + Material Design)
- **Recommended**: 48×48px for primary actions
- **Spacing between targets**: minimum 8px to prevent mis-taps

### iOS-specific

```css
/* Safe area insets for notch/Dynamic Island */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

- Status bar: use transparent with dark/light content based on background
- Swipe-back gesture: supported via full-screen `Sheet` components
- Scroll: `-webkit-overflow-scrolling: touch` on scroll containers

### Android-specific

- Navigation bar: respect `env(safe-area-inset-bottom)` or 48px fallback
- Back button: handle both hardware back and in-app back navigation
- Ripple effect: use `:active` scale transform as CSS equivalent

### Performance (Mobile)

- Images: lazy load all below-fold images; use `loading="lazy"`
- Lists: virtual scroll for lists > 50 items
- Animations: respect `prefers-reduced-motion`
- Bundle: code-split by route; each route < 100KB initial JS

### Gestures

| Gesture | Trigger | Action |
|---|---|---|
| Swipe right (edge) | Sheet / full-screen modal | Dismiss |
| Pull down | Feed / list pages | Refresh (visual spinner) |
| Long press | Leaderboard rows | Show user quick-view |
| Pinch | Challenge map (future) | Zoom |

### Offline State

- Show `EmptyState` component with "Không có kết nối" message
- Retry CTA: "Thử lại" button
- Cache last-known data with `stale-while-revalidate` pattern (future)

---

## Animation & Motion

### Principles

- **Purposeful**: animate only to communicate state change or guide attention
- **Fast**: 150–300ms for most transitions; never > 500ms
- **Reduced motion**: all animations must use `prefers-reduced-motion: reduce` fallback

### Timing Functions

```css
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);  /* Decelerating — entering */
--ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1);  /* Accelerating — leaving */
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);  /* Standard transitions */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Springy — feedback */
```

### Duration Scale

| Duration | Usage |
|---|---|
| 100ms | Micro (hover color change, toggle) |
| 150ms | Small (fade, scale) |
| 200ms | Default (slide, card expand) |
| 300ms | Medium (modal enter, page transition) |
| 400ms | Large (bottom sheet, drawer) |

---

## Iconography

**Library**: Lucide React  
**Sizes**: 16px (inline), 20px (default), 24px (nav/prominent)  
**Stroke width**: 1.5px (default), 2px (bold/emphasis)  
**Color**: Inherit from parent text color  

### Icon + Label Rules

- Icon-only buttons MUST have `aria-label`
- Icon + label: icon on left, 8px gap
- Navigation icons: 24px with 10px caption below

---

## Accessibility

### Color Contrast

- Normal text (< 18px): minimum 4.5:1 (WCAG AA)
- Large text (≥ 18px bold or ≥ 24px): minimum 3:1
- UI components / graphical objects: minimum 3:1
- Target: WCAG AA across all components; WCAG AAA for critical text

### Focus Management

```css
/* Focus ring — applied to all interactive elements */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

- Tab order follows visual reading order
- Skip-to-content link at top of page
- Modal/Sheet: trap focus inside; restore on close

### Screen Reader

- All images: descriptive `alt` text
- Icon-only buttons: `aria-label`
- Status updates: `role="status"` or `aria-live="polite"`
- Form errors: `aria-describedby` pointing to error message
- Loading states: `aria-busy="true"` on container

### Keyboard Navigation

- All interactive elements reachable via Tab
- Dropdowns/menus: arrow keys to navigate
- Dialogs: Escape to close
- Tabs component: arrow keys to switch tabs

---

## Data Visualization (Charts)

**Library**: Recharts (via shadcn/ui chart wrapper)

### Chart Color Palette

```
Series 1: #008C44 (primary green)
Series 2: #FFC300 (gold)
Series 3: #3B82F6 (blue)
Series 4: #F59E0B (amber)
Series 5: #8B5CF6 (violet)
Series 6: #EC4899 (pink)
```

### Chart Specifications

| Chart type | Usage | Min height |
|---|---|---|
| AreaChart | Participation trends over time | 200px |
| BarChart | Activity breakdown by type | 180px |
| PieChart / DonutChart | Distribution (challenge types, team share) | 160px |
| LineChart | Progress tracking (steps, km) | 180px |

### Chart Accessibility

- All charts include a `title` and `desc` element
- Color is never the sole differentiator — use patterns or labels
- Data tables as fallback for screen readers

---

## CSS Variables — Implementation Reference

```css
/* globals.css — :root (light mode) */
:root {
  /* Primary */
  --primary: 145 100% 27%;          /* #008C44 */
  --primary-foreground: 0 0% 100%;  /* white */
  --primary-light: 141 100% 33%;    /* #00A650 */
  --primary-dark: 147 100% 20%;     /* #006633 */
  --primary-subtle: 145 50% 93%;    /* #E6F4ED */

  /* Accent */
  --accent: 46 100% 50%;            /* #FFC300 */
  --accent-foreground: 0 0% 0%;     /* black on gold */

  /* Semantic */
  --destructive: 0 72% 51%;         /* #DC2626 */
  --destructive-foreground: 0 0% 100%;
  --warning: 38 92% 50%;            /* #F59E0B */
  --success: 160 84% 39%;           /* #10B981 */

  /* Surface */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --muted: 145 50% 93%;             /* primary-subtle */
  --muted-foreground: 215 16% 47%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 145 100% 27%;             /* focus ring = primary */

  /* Radius */
  --radius: 0.5rem;                 /* 8px base for shadcn */
}

.dark {
  --primary: 141 100% 33%;          /* #00A650 — lighter in dark */
  --primary-foreground: 0 0% 100%;
  --primary-subtle: 145 50% 15%;

  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 222 47% 14%;
  --card-foreground: 210 40% 98%;
  --muted: 222 47% 17%;
  --muted-foreground: 215 20% 65%;
  --border: 222 47% 22%;
  --input: 222 47% 22%;
  --ring: 141 100% 33%;
}
```

---

## Tailwind Config Reference

```ts
// tailwind.config.ts key extensions
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        light:   '#00A650',
        dark:    '#006633',
        subtle:  '#E6F4ED',
      },
      accent: {
        DEFAULT: '#FFC300',
        dark:    '#CC9900',
      },
    },
    fontFamily: {
      sans: ['Be Vietnam Pro', 'ui-sans-serif', 'system-ui'],
    },
    screens: {
      xs: '320px',
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    borderRadius: {
      sm:   '4px',
      DEFAULT: '8px',
      lg:   '16px',
      xl:   '24px',
    },
  },
}
```

---

## Localization

| Aspect | Spec |
|---|---|
| Primary language | Vietnamese (`vi`) |
| Date format | `dd tháng MM, yyyy` |
| Time format | `HH:mm` (24-hour) |
| Currency | `#.### ₫` (e.g., `1.200.000 ₫`) |
| Number separator | `.` for thousands, `,` for decimal |
| Distance | km (e.g., `5,2 km`) |
| Calorie | kcal |
| Duration | `hh giờ mm phút` |

---

*Last updated: April 2026 — WellnessRace / VietinBank Co-apping Web*
