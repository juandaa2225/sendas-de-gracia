# Sendas de Gracia

Sitio web estático para la iglesia Sendas de Gracia. El repo busca mantenerse sencillo: páginas claras, contenido en español y una estructura sin ruido. GitHub Pages publica `main`, `feature/**` y `hotfix/**`, y refresca diariamente el feed de predicaciones desde YouTube.

## Página publicada

[Ver la página final](https://juandaa2225.github.io/sendas-de-gracia/)

## Estructura

- `index.html`: portada principal.
- `nosotros/`, `predicaciones/`, `ministerios/`, `recursos/`, `visitanos/`: páginas públicas principales.
- `recursos/blog/`: índice preparado para artículos futuros.
- `recursos/declaracion-doctrinal/`: declaración doctrinal por publicar.
- `styles.css`: estilos compartidos.
- `assets/site.js`: navegación móvil y render de predicaciones.
- `assets/data/sermons.json`: predicaciones recientes generadas desde YouTube RSS.
- `assets/icons/` y `assets/images/`: recursos visuales usados por el sitio.
- `scripts/update-youtube-feed.mjs`: actualiza el JSON de predicaciones.
- `docs/`: guía de diseño y notas de setup para agentes.

## Guía de diseño

La dirección visual vive en [docs/design-guide.md](docs/design-guide.md). Úsala como fuente de verdad para paleta, tono, estructura, tipografías y criterios visuales.

## Desarrollo local

Puedes abrir los archivos HTML directamente en el navegador, o levantar un servidor local desde la raíz del repo:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

Para refrescar predicaciones localmente:

```bash
node scripts/update-youtube-feed.mjs
```

## Deploy

El deploy está configurado con GitHub Actions en `.github/workflows/deploy-pages.yml`. El workflow actualiza el feed de YouTube antes de subir el artefacto y corre también una vez al día para mantener las predicaciones ordenadas con el último video publicado primero.
