# Sendas de Gracia

Sitio web estatico para la iglesia Sendas de Gracia. El proyecto publica una experiencia multipagina sencilla, pastoral y consistente con la guia visual. GitHub Pages se actualiza cuando se publica `main`, `feature/**` o `hotfix/**`, y tambien refresca diariamente el feed de predicaciones desde YouTube.

## Pagina publicada

[Ver la pagina final](https://juandaa2225.github.io/sendas-de-gracia/)

## Estructura

- `index.html`: portada principal restaurada.
- `nosotros.html`: identidad, convicciones y vida comunitaria.
- `predicaciones.html`: archivo reciente conectado al canal actual de YouTube.
- `ministerios.html`: ministerios y espacios de servicio.
- `recursos.html`: materiales y enlaces utiles.
- `visitanos.html`: informacion para visitantes.
- `styles.css`: estilos compartidos.
- `assets/site.js`: navegacion movil y render de predicaciones.
- `assets/data/sermons.json`: predicaciones recientes generadas desde YouTube RSS.
- `assets/icons/`: iconografia y logos.
- `assets/images/`: fotografias e imagenes de fondo.
- `scripts/update-youtube-feed.mjs`: actualiza el JSON de predicaciones.
- `docs/design-guide.md`: guia de diseno y requisitos visuales.
- `docs/codex-setup.md`: notas para restaurar MCPs y setup de Codex.

## Guia de diseno

La direccion visual del sitio esta documentada en [docs/design-guide.md](docs/design-guide.md). Esa guia define paleta, proporcion, estructura de home, hero, tipografias, responsive y criterios de hacer/evitar.

## Desarrollo local

Puedes abrir los archivos HTML directamente en el navegador, o levantar un servidor local desde la raiz del repo:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

Para refrescar predicaciones localmente:

```bash
node scripts/update-youtube-feed.mjs
```

## Deploy

El deploy esta configurado con GitHub Actions en `.github/workflows/deploy-pages.yml`. El workflow actualiza el feed de YouTube antes de subir el artefacto y corre tambien una vez al dia para mantener las predicaciones ordenadas con el ultimo video publicado primero.
