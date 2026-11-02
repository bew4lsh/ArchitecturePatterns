# Working in this repo

Self-study notes on software architecture patterns, published as a static site on GitHub
Pages from `main`.

`README.md` is the reference for how the site is built, run and deployed, and for the
mechanics of figures and the sidebar. This file is what to write and how to add a page.
Starlight has its own documentation, separate from Astro's:
[starlight.astro.build](https://starlight.astro.build) and
[docs.astro.build](https://docs.astro.build).

## Adding a pattern page

1. **Create the page in its category's directory**, `src/content/docs/<category>/<slug>.mdx`.
   The filename is the URL and the sidebar entry, and the directory is the category: the
   sidebar turns each one into a group. Use `.md` instead of `.mdx` when the page will hold
   no figure or component.
2. **Fill in the frontmatter:** `title`, a one-sentence `description`, and
   `sidebar.order` for the page's position among the patterns. The sidebar generates
   itself from the directory, so nothing in `astro.config.mjs` needs touching.
3. **Copy the `##` headings** from
   `src/content/docs/foundations/reading-patterns.md`, in order and word for word, and
   answer each one. `styles/layered-architecture.mdx` is the tightest example of a
   finished page, and `messaging/work-queue.mdx` is the same shape with figures and an
   interactive section. Patterns stay comparable only while the frame is identical, so a
   renamed or dropped heading is a bug in the page rather than a judgement call.
4. **Write each section from the pattern's own sources** — the book chapter, the
   vendor's pattern page, the specification — and list them under `## References`. A
   tradeoff or failure mode that no source describes is one nobody has checked.
5. **Build it and look at it.** Run `npm run build`, then open the page in a browser in
   both colour schemes: a figure that breaks in dark mode still builds.

The page is done when it builds, appears under Patterns in the sidebar, and carries the
same headings, in the same order, as `reading-patterns.md`.

Pages under `foundations/` are reference rather than pattern pages and take the shape their
subject needs.

Categories are directories with no umbrella over them, because a style and a messaging pattern
are different kinds of thing rather than two subjects inside one. `styles/` holds what Richards
and Ford call an architecture style — it decides component topology, monolith against
distributed, and deployment. `messaging/` holds a pattern for interaction between parts, which
is what Enterprise Integration Patterns and Microsoft's cloud catalogues mean by the word. Add a
category when a second page belongs in it, named as the sources name that concern; a one-page
category is a label with nothing to sort.

## What is already decided

Each of these is a choice that is not visible from the file it affects:

- **Starlight, with the Flexoki theme and a single accent colour.** The theme is built for
  long-form reading, and the accent marks the one thing in a figure that the prose is
  about.
- **The site is served from a subpath** of a GitHub Pages site, so `base` is set in
  `astro.config.mjs` and `src/plugins/base-links.mjs` adds the prefix to root-relative
  Markdown links at build time. Write internal links root-relative, as `/messaging/work-queue/`. Hero action
  links in frontmatter are the one exception, because they are not Markdown, so they
  carry the full path and have to change if `base` ever does.
- **A figure lives in the page it belongs to,** as hand-authored SVG rather than an image
  or a drawing tool, so that the picture and the prose change in the same commit. When a
  figure needs a script it becomes an Astro component in `src/components/` instead, since
  MDX cannot bundle one. Give such a component's root the `not-content` class: without it
  Starlight's prose spacing lands between the widget's own children, and a row of marks,
  cells or buttons comes out as a staircase.
- **The sidebar can fold away on desktop** — `SidebarToggle.astro`, which reaches the
  header through a one-line `SocialIcons` override. It works by zeroing Starlight's
  `--sl-sidebar-width`, so widths come from Starlight's variables rather than from
  hard-coded numbers.
- **Two warnings on every build** — `The collection "i18n" does not exist or is empty`
  and `Entry docs → 404 was not found` — are Starlight asking for optional content this
  repo does not define. They are expected, and they are not this repo's to fix.

## House style

- **State the trade, not the benefit.** A `## Tradeoffs` entry says what gets worse, and
  for whom. A `## Failure modes` entry names the symptom an operator would see, not the
  abstraction.
- **Let the sources disagree where they disagree.** Where catalogues name the same thing
  differently, record the aliases and which source uses which, the way the work queue
  page does, rather than silently choosing one.
- **No filler.** No marketing adjectives, no sentence that restates its heading, no
  closing paragraph that repeats the page.
- **Plain Markdown by default.** The sections, bold lead-ins and lists carry the
  page; reach for a component only when a figure has to move or answer back.

## Running the dev server

`astro dev --background`, then `astro dev status`, `astro dev logs` and
`astro dev stop`. The server serves the site under its `base` path, so pages live at
`/ArchitecturePatterns/<slug>/`.
