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

## Notas de Codespaces

- Si se vuelve al mismo Codespace, la configuracion normalmente sigue disponible.
- Si se abre un Codespace nuevo, hay que correr de nuevo el comando de instalacion.
- Si se reconstruye el contenedor, los archivos dentro de `/workspaces` se preservan, pero configuraciones en `$HOME` pueden perderse.
