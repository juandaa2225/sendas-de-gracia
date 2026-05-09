# AGENTS.md

Antes de editar este sitio, lee:

1. `docs/design-guide.md` para direccion visual, paleta, tono y estructura.
2. `docs/codex-setup.md` para setup de Codespaces, MCP y Playwright.
3. `docs/agent-workflow.md` si existe, para el flujo de iteracion con agentes.

Reglas rapidas:

- Trabaja en ramas `feature/*` para activar deploy de GitHub Pages.
- No hagas push directo a `main`; usa una rama y PR, salvo instruccion explicita de emergencia.
- No subas artefactos de Playwright ni capturas locales.
- Guarda las capturas PNG de Playwright en `.playwright-mcp/screenshots/` con numeracion incremental (`001-...`, `002-...`).
- Valida cambios visuales con Playwright en desktop y movil cuando afecten UI.
- Mantén el sitio sencillo, reverente, claro y consistente con la guia de diseno.
- Si durante el trabajo aparece una convencion, decision o flujo que deba recordarse en futuros chats, propon agregarlo aqui o en el documento correspondiente dentro de `docs/`.
