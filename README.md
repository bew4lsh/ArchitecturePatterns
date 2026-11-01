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

Create a Markdown or MDX file in `src/content/docs/patterns/` and it appears in the
sidebar automatically, ordered by the `sidebar.order` frontmatter field.

Every pattern page follows the same eight sections, described in
[Reading these pages](src/content/docs/foundations/reading-patterns.md): context,
forces, solution, variants, tradeoffs, failure modes, when to reach for it,
references. Keeping the frame identical is what makes two patterns comparable.

Use `.mdx` when the page needs a diagram or component, and `.md` otherwise.

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

## Deploying

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
Enable it once under **Settings → Pages → Source → GitHub Actions**.

The site is served from a subpath, so `base` is set in `astro.config.mjs`:

- Markdown links are written root-relative (`/patterns/layered-architecture/`) and
  get the base prefix at build time by `src/plugins/base-links.mjs`. Do not write the
  base path into prose.
- Hero action links in frontmatter are not Markdown, so those carry the base path
  explicitly. They must be updated if `base` changes.
