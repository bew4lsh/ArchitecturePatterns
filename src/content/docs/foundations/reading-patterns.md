---
title: Reading these pages
description: The template every pattern page follows, and why.
---

Every pattern page in this repo answers the same questions in the same order. That is deliberate: patterns are only comparable when they are described in the same frame, and the frame is what makes it possible to say "use this one here" rather than "this one is good".

## The template

| Section              | The question it answers                                             |
| -------------------- | ------------------------------------------------------------------- |
| Also known as        | What else is this called, and which of those names name only part of it? |
| Context              | What situation makes this pattern a candidate?                      |
| Forces               | What is pulling in conflicting directions?                          |
| Solution             | What is the structure, and what are its rules?                      |
| Variants             | Which well-known shapes are really this pattern with a knob turned? |
| Tradeoffs            | What does adopting this cost, concretely?                           |
| Failure modes        | How does this pattern go wrong when it is applied carelessly?       |
| When to reach for it | The decision rule, stated as a condition rather than a preference.  |
| References           | Where the primary description lives.                                |

The first section exists because people arrive at a pattern by whatever name they learned it under, and the names disagree. List every name in use, with the source that uses it, and say which of them name the whole arrangement and which name only a part: *competing consumers* is the consumer side of a work queue, not the work queue. A reader who searched for a different name should be able to confirm it in one line, and a reader who searched for the right one should find out that a neighbouring name is not the same thing.

A pattern is not a recipe. It is a named resolution of a set of forces, and the name is only useful if everyone means the same structure by it. Writing the forces down before the structure is what keeps the name honest.

## Quality attributes

Patterns are chosen to buy specific quality attributes, and every architecture trades some for others. The ones that come up repeatedly here:

- **Modifiability** — the cost of a typical foreseeable change.
- **Deployability** — how independently a change can be released.
- **Scalability** — which dimension can grow without a rewrite (traffic, data, teams).
- **Testability** — whether behaviour can be exercised without standing up the world.
- **Operational simplicity** — how much machinery someone must understand at 3am.
- **Performance** — latency and throughput on the paths that matter.

Naming the attribute you are actually buying is what turns "microservices are better" into a decision.

## Diagrams

Diagrams are hand-authored SVG, living in the page that explains them rather than in a drawing tool. That keeps a diagram and its prose changing in the same commit, which is the only version-control story that survives a year of edits. See [Diagram.astro](https://github.com/bew4lsh/ArchitecturePatterns/blob/main/src/components/Diagram.astro) for the wrapper used to frame them.

## References

- Richards & Ford, _Fundamentals of Software Architecture_ — the patterns and quality-attribute vocabulary used throughout.
- Fowler, _Patterns of Enterprise Application Architecture_ — for the application-level patterns.
- Bass, Clements & Kazman, _Software Architecture in Practice_ — quality attributes and tactics.
