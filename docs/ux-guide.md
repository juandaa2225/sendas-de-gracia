# Guía UX

Principios prácticos para mantener el sitio de Sendas de Gracia claro, reverente y visualmente respirable. Esta guía complementa `docs/design-guide.md`; no reemplaza la paleta, tipografía ni dirección visual ya definidas.

## Principio rector

La experiencia debe sostener la atención sin convertir el sitio en espectáculo. Cada página debe ayudar al visitante a entender quién es la iglesia, qué cree, cómo reunirse y cuál es el siguiente paso.

Regla práctica:

- Claridad pastoral antes que decoración.
- Reverencia antes que impacto visual.
- Ritmo visual antes que acumulación de tarjetas.
- Autenticidad antes que apariencia genérica.

## Densidad y ritmo

El sitio puede tener contenido doctrinal amplio, pero no debe sentirse como un documento largo pegado a una página.

Hacer:

- Alternar bloques densos con pausas visuales: imágenes, citas destacadas, resúmenes, franjas sobrias o llamadas a la acción.
- Mostrar primero la idea principal y dejar el detalle para una segunda lectura cuando el contenido sea largo.
- Usar encabezados claros, párrafos breves y espacios amplios entre secciones.
- Dar variedad de composición: no encadenar demasiadas secciones con la misma grilla de tarjetas.
- Mantener una acción principal clara por página, especialmente `Planifica tu visita`, `Ver predicaciones` o `Abrir mapa`.

Evitar:

- Páginas largas formadas solo por tarjetas equivalentes.
- Párrafos extensos dentro de tarjetas estrechas.
- Repetir patrones visuales sin una pausa que ayude a descansar la lectura.
- Reducir contenido doctrinal importante solo por hacerlo corto; mejor organizarlo progresivamente.

## Imágenes

La fotografía ideal es real, cálida, poco saturada y centrada en la vida congregacional: Biblia, púlpito, predicación, bienvenida, adoración, comunión y servicio.

Prioridad de uso:

1. Fotos reales de la iglesia.
2. Imágenes generadas temporales cuando falten fotos reales.
3. Stock curado solo si es sobrio, no comercial y no parece ajeno a la iglesia.

Reglas para imágenes generadas:

- Usarlas como apoyo editorial temporal, no como sustituto permanente de la comunidad real.
- Preferir escenas sin rostros identificables: Biblia abierta, púlpito, bancas, luz natural, detalles de manos con Biblia, exterior sobrio o textura arquitectónica.
- No generar imágenes que pretendan representar personas reales de la congregación.
- No usar imágenes oscuras, dramáticas, abstractas o con apariencia de anuncio comercial.
- Documentar cuando una imagen sea temporal y deba reemplazarse por fotografía real.

## Motion

El movimiento debe orientar, revelar y dar sensación de cuidado. No debe robar atención a la Palabra, bloquear el scroll ni retrasar el acceso al contenido.

Patrones recomendados:

- Revelado suave al entrar en viewport con `IntersectionObserver`.
- Transiciones de `opacity` y `transform` pequeñas; evitar animar layout, altura o propiedades costosas.
- Escalonado discreto en grupos de tarjetas, distintivos o puntos doctrinales.
- Microinteracciones en botones, enlaces y tarjetas con cambios de color, sombra mínima o desplazamiento leve.
- Indicadores visuales sutiles para contenido expandible, como `details` doctrinales.

Límites:

- No usar scrolljacking.
- No bloquear el scroll para completar animaciones.
- No usar parallax intenso, rebotes, rotaciones grandes ni entradas teatrales.
- No depender del motion para entender el contenido.
- No animar bloques largos de texto de forma que retrase la lectura.

Video de fondo:

- Considerarlo solo si comunica mejor la vida real de la iglesia que una imagen fija.
- Usarlo sin audio, con loop suave, duración breve, peso optimizado y overlay suficiente para legibilidad.
- No debe competir con el título, distraer durante la lectura ni ocultar el primer CTA.
- Siempre debe tener imagen de respaldo y respetar `prefers-reduced-motion`.

Accesibilidad obligatoria:

- Respetar `prefers-reduced-motion: reduce`.
- Con movimiento reducido, el contenido debe aparecer inmediatamente y la página debe seguir siendo completamente usable.
- Evitar animaciones automáticas de más de 5 segundos que convivan con contenido sin ofrecer pausa, detención u ocultamiento.
- Probar que foco, teclado y lectores no quedan afectados por estados animados.

## Principios UX fundamentales

- Jerarquía: el visitante debe distinguir en segundos título, propósito, contenido principal y acción siguiente.
- Progresión: presentar primero resumen, luego detalle, especialmente en doctrina, distintivos y ministerios.
- Elección guiada: reducir opciones simultáneas, destacar la acción principal y revelar caminos secundarios solo cuando ayuden al siguiente paso. Este criterio combina la Ley de Hick, que relaciona más opciones con mayor tiempo de decisión, y la divulgación progresiva, que muestra primero lo esencial y revela complejidad bajo demanda.
- Escaneabilidad: usar subtítulos, listas cortas, números, frases destacadas y bloques con ancho de lectura cómodo.
- Consistencia: repetir patrones útiles, pero variar el ritmo cuando la página se vuelve monótona.
- Confianza: usar lenguaje específico, datos claros, horarios visibles y rutas simples.
- Accesibilidad: contraste, tamaño táctil, foco visible, contenido usable sin JavaScript y motion reducido.
- Performance percibida: cargar primero lo esencial, usar imágenes optimizadas y evitar scripts pesados para efectos simples.

Referencias útiles:

- Nielsen Norman Group, `Progressive Disclosure`: https://www.nngroup.com/articles/progressive-disclosure/
- Interaction Design Foundation, `Hick's Law`: https://www.interaction-design.org/literature/topics/hick-s-law
- Jon Yablonski, `Laws of UX`: https://lawsofux.com/

## Checklist antes de cerrar cambios UX

- La página tiene una acción principal clara.
- El contenido denso está organizado con resúmenes, pausas visuales o disclosure progresivo.
- Las imágenes se sienten auténticas, sobrias y alineadas con `docs/design-guide.md`.
- El motion es sutil, no bloquea el scroll y respeta `prefers-reduced-motion`.
- En móvil no hay texto solapado, tarjetas demasiado estrechas ni botones menores de 44 px de alto.
- La experiencia funciona con JavaScript deshabilitado o fallando.
- Si hubo cambios visuales, se validó con Playwright en desktop y móvil.
- Las capturas de Playwright se guardaron en `.playwright-mcp/screenshots/` y no se suben como artefactos accidentales.
