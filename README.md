# Sendas de Gracia

Sitio web estático para la iglesia Sendas de Gracia. El proyecto publica una experiencia multipágina sencilla, pastoral y consistente con la guía visual. GitHub Pages se actualiza cuando se publica `main`, `feature/**` o `hotfix/**`, y también refresca diariamente el feed de predicaciones desde YouTube.

## Página publicada

[Ver la página final](https://juandaa2225.github.io/sendas-de-gracia/)

## Estructura

- `index.html`: portada principal.
- `nosotros/`: identidad, convicciones y vida comunitaria.
- `predicaciones/`: archivo reciente conectado al canal actual de YouTube.
- `ministerios/`: ministerios y espacios de servicio.
- `recursos/`: materiales y enlaces útiles.
- `recursos/blog/`: índice preparado para artículos futuros.
- `recursos/declaracion-doctrinal/`: placeholder de declaración doctrinal por publicar.
- `visitanos/`: información para visitantes.
- `*.html` heredados: redirects de compatibilidad hacia las rutas con carpeta.
- `styles.css`: estilos compartidos.
- `assets/site.js`: navegación móvil y render de predicaciones.
- `assets/data/sermons.json`: predicaciones recientes generadas desde YouTube RSS.
- `assets/icons/`: iconografía y logos.
- `assets/images/`: fotografías e imágenes de fondo.
- `scripts/update-youtube-feed.mjs`: actualiza el JSON de predicaciones.
- `docs/design-guide.md`: guía de diseño y requisitos visuales.
- `docs/codex-setup.md`: notas para restaurar MCPs y setup de Codex.

## Guía de diseño

La dirección visual del sitio está documentada en [docs/design-guide.md](docs/design-guide.md). Esa guía define paleta, proporción, estructura de home, hero, tipografías, responsive y criterios de hacer/evitar.

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
