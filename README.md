# Sendas de Gracia

Sitio web estatico para la iglesia Sendas de Gracia. El proyecto contiene varias propuestas visuales de portada y se publica automaticamente en GitHub Pages cada vez que se actualiza la rama principal.

## Pagina publicada

[Ver la pagina final](https://juandaa2225.github.io/sendas-de-gracia/)

## Estructura

- `index.html`: portada principal, basada en la propuesta `premium_2`.
- `clasico.html`: variante clasica.
- `premium.html`: variante premium.
- `premium_2.html`: variante premium alternativa.
- `front_comunidad.html`: variante orientada a comunidad, reuniones y visita.
- `styles.css`: estilos compartidos.
- `assets/icons/`: iconografia y logos.
- `assets/images/`: fotografias e imagenes de fondo.
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

## Deploy

El deploy esta configurado con GitHub Actions en `.github/workflows/deploy-pages.yml`. Cada push a `main` actualiza GitHub Pages.
