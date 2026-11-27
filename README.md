# PQI · Productos Químicos Industriales — sitio web

Sitio estático (HTML + CSS + JS vanilla, sin frameworks) para https://www.pqi.com.do.

- `src/pages/*.html` + `build.py`: fuente de cada página. `python3 build.py` regenera los `.html` de la raíz (agrega head, header, footer e íconos).
- `css/styles.css`: tokens de color (`:root`), tipografía (Sora + Noto Sans) y componentes.
- `js/app.js`: intro, menú, aparición con IntersectionObserver (`.rv`), contadores, tabs, formularios.
- `js/i18n.js`: textos en inglés por clave (`data-i`) y el botón ES/EN.
- `img/`: logo vectorizado y fotos en `.webp` (`nombre-800.webp` y `nombre.webp` de 1600w). Las fotos salen del sitio actual de PQI; la lista está en `img/fuentes.txt` y el workflow **Fotos** (GitHub Actions) las baja y convierte.

El scroll es 100% nativo y se respeta `prefers-reduced-motion`.
