# PQI · Productos Químicos Industriales — sitio web

Sitio estático (HTML + CSS + JS vanilla, sin frameworks) para https://www.pqi.com.do.

- `src/pages/*.html` + `build.py`: fuente de cada página. `python3 build.py` regenera los `.html` de la raíz (agrega head, header, footer e íconos).
- `css/styles.css`: tokens de color (`:root`), tipografía (Sora + Noto Sans) y componentes.
- `js/app.js`: intro, menú, aparición con IntersectionObserver (`.rv`), contadores, tabs, formularios.
- `js/i18n.js`: textos en inglés por clave (`data-i`) y el botón ES/EN.
- `img/`: logo vectorizado y fotos en `.webp` (`nombre-800.webp` y `nombre.webp` de 1600w). Las fotos salen del sitio actual de PQI; la lista está en `img/fuentes.txt` y el workflow **Fotos** (GitHub Actions) las baja y convierte.

El scroll es 100% nativo y se respeta `prefers-reduced-motion`.

## Pendiente de confirmar con PQI

- Fotos: se usan las del sitio actual; varias son de 500–600 px y se ven suaves en pantallas grandes. Hacen falta fotos reales de planta, hoteles y hospitales en alta resolución.
- Colores: el logo es de un solo azul (`#055da7`). El acento agua (`#12a3c9`) y el navy (`#0a2a4f`) son propuestas; confirmar con el manual de marca si existe.
- WhatsApp: el botón y el formulario usan el 809-537-9990; confirmar que ese número tenga WhatsApp.
- Empleos: vacantes, beneficios concretos y correo para CV (hoy va a info@pqi.com.do). El CV se adjunta en el correo; para subir el archivo desde la página hace falta un servicio de formularios.
- Política de privacidad: falta el texto legal (hoy enlaza a la vigente).
- ServSafe®: calendario de cursos.
- Certificaciones: tomadas del sitio actual; confirmar que sigan vigentes.
- Dominio: canonical y Open Graph apuntan a https://www.pqi.com.do.
