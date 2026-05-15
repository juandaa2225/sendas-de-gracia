# Setup de Codex

Notas para restaurar el entorno de Codex cuando se abra un Codespace nuevo o se reconstruya el actual.

## Playwright MCP

El MCP de Playwright permite que Codex inspeccione e interactue con paginas web usando un navegador controlado por Playwright.

Instalar/configurar:

```bash
codex mcp add playwright -- npx -y @playwright/mcp@latest --headless
```

Verificar que quedo registrado:

```bash
codex mcp list
codex mcp get playwright
```

Verificar que el paquete de Playwright MCP resuelve desde npm:

```bash
npx -y @playwright/mcp@latest --help
```

## Archivo de configuracion

Codex guarda los MCPs globales en:

```text
~/.codex/config.toml
```

La entrada esperada para Playwright es:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest", "--headless"]
```

El repo guarda la configuracion esperada en:

```text
.devcontainer/codex-config.toml
```

Codespaces ejecuta este bootstrap al arrancar:

```text
.devcontainer/setup-codex.sh
```

El script no reemplaza `~/.codex/config.toml`; solo registra el MCP de Playwright con `codex mcp add` si falta. Esto evita perder el setup cuando `$HOME` se resetea en un Codespace nuevo o reconstruido.

## Notas de Codespaces

- Si se vuelve al mismo Codespace, la configuracion normalmente sigue disponible.
- Si se abre un Codespace nuevo, el `postStartCommand` de `.devcontainer/devcontainer.json` debe reinstalar el MCP automaticamente.
- Si se reconstruye el contenedor, los archivos dentro de `/workspaces` se preservan, pero configuraciones en `$HOME` pueden perderse; el bootstrap debe reponerlas al iniciar.
