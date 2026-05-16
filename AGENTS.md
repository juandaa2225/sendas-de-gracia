# AGENTS.md

Antes de editar este sitio, lee:

1. `docs/design-guide.md` para dirección visual, paleta, tono y estructura.
2. `docs/ux-guide.md` para principios de UX, densidad visual, imágenes y motion.
3. `docs/codex-setup.md` para setup de Codespaces, MCP y Playwright.
4. `docs/agent-workflow.md` si existe, para el flujo de iteración con agentes.

Reglas rápidas:

- Trabaja en ramas `feature/*` para activar deploy de GitHub Pages. A medida que vas avanzando, por trazabilidad, haz commits atómicos.
- No hagas push directo a `main`; usa una rama y PR, salvo instrucción explícita de emergencia.
- No subas artefactos de Playwright ni capturas locales.
- Guarda las capturas PNG de Playwright en `.playwright-mcp/screenshots/` con numeración incremental (`001-...`, `002-...`).
- Valida cambios visuales con Playwright en desktop y móvil cuando afecten UI.
- Mantén las páginas públicas en rutas con carpeta (`nosotros/`, `predicaciones/`, etc.); evita duplicarlas como `*.html` en la raíz.
- No agregues laboratorios, prototipos o variantes visuales al repo si no van a producción; documenta solo lo que ayude al sitio actual.
- Mantén la configuración MCP esperada en `.devcontainer/codex-config.toml`; el `postStartCommand` de Codespaces debe registrar Playwright si falta en `~/.codex/config.toml`.
- Mantén el sitio sencillo, reverente, claro y consistente con la guía de diseño.
- Cuando afectes UI, contenido visual, imágenes, motion o densidad de lectura, aplica también `docs/ux-guide.md`.
- Escribe el contenido público en español con tildes, ñ y signos correctos, salvo identificadores técnicos, rutas, comandos y URLs.
- Si durante el trabajo aparece una convención, decisión o flujo que deba recordarse en futuros chats, propón agregarlo aquí o en el documento correspondiente dentro de `docs/`.
