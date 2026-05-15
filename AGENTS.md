# AGENTS.md

Antes de editar este sitio, lee:

1. `docs/design-guide.md` para dirección visual, paleta, tono y estructura.
2. `docs/codex-setup.md` para setup de Codespaces, MCP y Playwright.
3. `docs/agent-workflow.md` si existe, para el flujo de iteracion con agentes.

Reglas rápidas:

- Trabaja en ramas `feature/*` para activar deploy de GitHub Pages.
- No hagas push directo a `main`; usa una rama y PR, salvo instrucción explícita de emergencia.
- No subas artefactos de Playwright ni capturas locales.
- Guarda las capturas PNG de Playwright en `.playwright-mcp/screenshots/` con numeración incremental (`001-...`, `002-...`).
- Valida cambios visuales con Playwright en desktop y móvil cuando afecten UI.
- Mantén la configuración MCP esperada en `.devcontainer/codex-config.toml`; el `postStartCommand` de Codespaces debe registrar Playwright si falta en `~/.codex/config.toml`.
- Mantén el sitio sencillo, reverente, claro y consistente con la guía de diseño.
- Escribe el contenido público en español con tildes, ñ y signos correctos, salvo identificadores técnicos, rutas, comandos y URLs.
- Si durante el trabajo aparece una convención, decisión o flujo que deba recordarse en futuros chats, propón agregarlo aquí o en el documento correspondiente dentro de `docs/`.
