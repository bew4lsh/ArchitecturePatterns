# Architecture Patterns

Self-study notes on software architecture patterns, published as a static site at
**https://bew4lsh.github.io/ArchitecturePatterns/**.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Running it

```bash
npm install
npm run dev      # http://localhost:4321/ArchitecturePatterns/
npm run build    # static output in dist/
npm run preview  # serve the built site
```

## Adding a pattern page

The steps, the section frame every pattern page copies, and the house style are in
[AGENTS.md](AGENTS.md). That is their single home, so a page added by hand and a page
added by an agent end up the same shape.

## Diagrams

Hand-authored SVG lives in the page that explains it, wrapped in the `Diagram`
component for framing and captions:

```mdx
import Diagram from "../../../components/Diagram.astro";

<Diagram caption="What this shows.">
  <svg viewBox="0 0 640 400">…</svg>
</Diagram>
```

Colour the SVG with Starlight's theme variables (`var(--sl-color-gray-6)`,
`var(--sl-color-accent)`, …) via a `style` attribute — presentation attributes like
`fill="var(--x)"` do not support custom properties, so dark mode breaks if you use
them.

Keep an element's text on the same line as its tags. MDX parses multi-line content as
markdown and wraps it in a `<p>`, and a `<p>` inside an `<svg>` is not valid, so the
browser closes the SVG right there: every bar and line after it renders as nothing and
the labels reflow as paragraphs. The page still builds and the markup still looks fine in
the source, so `npm run build` checks for it and fails instead.

```mdx
<text x="22" y="209">dependency direction</text>
```

A figure that changes on the reader's input is an Astro component with a `<script>`
instead, because MDX cannot bundle one. Those live in `src/components/` —
`WorkQueueSimulator.astro` draws the live rate figure and `CheckYourself.astro` asks a
question — and read the same theme variables, so they follow light and dark mode with
the rest of the page.

## Sidebar

`src/components/SidebarToggle.astro` adds a desktop-only button that folds the whole left
column away, remembered in `localStorage`. Starlight has no header slot, so the button
reaches the header through a one-line override of `SocialIcons` in
`src/components/overrides/`. On narrow screens Starlight already turns the sidebar into a
slide-over menu, and the button hides itself.

The hiding is CSS rather than a copy of Starlight's sidebar markup: Starlight measures the
sidebar *and* the space reserved for it from `--sl-sidebar-width`, so zeroing that one
variable takes the sidebar out of the layout and leaves the rest of the grid, including
the table of contents, working. The same rule widens `--sl-content-width` to `50rem` —
those two numbers are what to change if the collapsed page reads too wide or too narrow.

## Deploying

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
Enable it once under **Settings → Pages → Source → GitHub Actions**.

The site is served from a subpath, so `base` is set in `astro.config.mjs`:

- Markdown links are written root-relative (`/patterns/layered-architecture/`) and
  get the base prefix at build time by `src/plugins/base-links.mjs`. Do not write the
  base path into prose.
- Hero action links in frontmatter are not Markdown, so those carry the base path
  explicitly. They must be updated if `base` changes.
