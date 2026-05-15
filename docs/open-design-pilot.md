# Open Design Pilot

Goal: use Open Design as a local design lab for Sendas de Gracia without making it a production dependency.

## Files Added

- `design-systems/sendas-de-gracia/DESIGN.md`: portable design system for Open Design and coding agents.
- `skills/sendas-church-section/SKILL.md`: focused prototyping skill for church website sections.

## Recommended Experiment

Start with one section, not the whole site. Best candidates:

- Hero revision with real church context and visit CTA.
- `Planifica tu visita` section with what to expect, children, parking, and contact.
- Sermons archive teaser with recent message cards.
- Ministries overview for children, youth, families, groups, and missions.

## Suggested Open Design Prompt

```text
Using the Sendas de Gracia design system, prototype a responsive "Planifica tu visita" section for first-time visitors.

Audience: families and new visitors.
Content: Sunday 10:00 a.m., worship, biblical preaching, children guidance, parking/contact next step.
Tone: pastoral, reverent, clear, welcoming.
Output: one portable HTML section with inline CSS.
Avoid: SaaS landing-page aesthetics, decorative gradients, generic stock imagery, overuse of gold.
```

## Review Checklist

- The result follows the 60/30/10 color proportion.
- Gold appears only as an accent or CTA.
- Typography feels calm and pastoral, not editorially flashy.
- Copy is Spanish-first and concrete.
- Mobile layout has no overlap and buttons remain touch-friendly.
- The design can be copied into the static site without adding a framework.

## Adoption Rule

Open Design output is a draft, not source of truth. Keep only the parts that improve clarity, warmth, accessibility, or consistency with `docs/design-guide.md`.
