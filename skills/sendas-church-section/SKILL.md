---
name: sendas-church-section
description: |
  Prototype a focused website section for Sendas de Gracia using the local church design system.
  Trigger when asked for Sendas de Gracia website sections, church landing sections, pastoral UI, visit flows, sermons, ministries, or welcome content.
triggers:
  - "Sendas de Gracia"
  - "church section"
  - "iglesia"
  - "Planifica tu visita"
  - "predicaciones"
od:
  mode: prototype
  preview:
    type: html
    entry: index.html
  design_system:
    requires: true
    sections: [color, typography, layout, components, imagery, voice, accessibility]
  inputs:
    - name: section_goal
      type: string
      required: true
    - name: audience
      type: string
      default: "familias y visitantes nuevos"
    - name: target_width
      type: string
      default: "responsive desktop and mobile"
---

# Workflow

1. Read `DESIGN.md` before drafting. If a separate brief conflicts with the design system, follow the design system unless the user explicitly overrides it.
2. Ask for missing essentials only when the section cannot be designed without them. Otherwise choose conservative church-appropriate defaults.
3. Produce one focused HTML prototype for the requested section, not a full marketing site unless requested.
4. Use inline CSS and semantic HTML. Keep the artifact portable and easy to copy into a static site.
5. Preserve the established palette: warm ivory, forest green, stone beige, and restrained liturgical gold.
6. Use Spanish copy by default. Keep tone pastoral, concrete, reverent, and welcoming.
7. Include responsive behavior for desktop and mobile. Ensure buttons are at least 44px tall.
8. Avoid decorative gradients, abstract AI visuals, nested cards, loud animation, and commercial SaaS patterns.
9. Self-check before final output:
   - Does the section communicate Scripture, worship, community, or mission?
   - Is gold used only as an accent?
   - Is the hierarchy calm and readable?
   - Would a first-time visitor understand the next step?
   - Does mobile avoid overlap and cramped buttons?
10. Write the final artifact as `index.html`.
