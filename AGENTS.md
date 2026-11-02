## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Content conventions

Pattern pages live in `src/content/docs/patterns/` and follow the eight-section
structure documented in `src/content/docs/foundations/reading-patterns.md`. Match it:
the value of these notes is that patterns stay comparable.

Write internal links root-relative and without the base path — `base-links.mjs` applies
it at build time. The one exception is hero action links in frontmatter, which are not
Markdown and must carry the base path themselves.

Diagrams are hand-authored inline SVG framed by `Diagram.astro`, coloured through
Starlight theme variables in a `style` attribute (`fill="var(--x)"` does not work).
Keep a diagram in the page that explains it.

A figure that changes on the reader's input is an Astro component with a `<script>` in
`src/components/` instead, because MDX cannot bundle one. Components read the same
theme variables, so light and dark mode keep working.
