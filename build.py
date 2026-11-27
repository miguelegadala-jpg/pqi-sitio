"""Arma las páginas del sitio a partir de src/.

Cada archivo de src/pages/ empieza con un comentario JSON con los datos de la
página (título, descripción, ruta y opción del menú). Este script le agrega el
<head>, el header, el footer y los íconos, y escribe el .html en la raíz.

Uso: python3 build.py
"""
import json, pathlib, re, html

B = pathlib.Path(__file__).parent
SRC = B / "src"
SITE = "https://www.pqi.com.do"   # dominio final; cambiar si se publica en otro
PHONE = "809-537-9990"
PHONE_INTL = "+18095379990"
WA = "18095379990"                # [PENDIENTE] confirmar que este número tenga WhatsApp
MAPS = "https://www.google.com/maps/search/?api=1&query=Calle+Central+11,+Zona+Industrial+de+Herrera,+Santo+Domingo,+Rep%C3%BAblica+Dominicana"

NAV = [
    ("index.html", "nav_home", "Inicio"),
    ("soluciones-institucionales.html", "nav_inst_l", "Soluciones institucionales"),
    ("soluciones-industriales.html", "nav_ind_l", "Soluciones industriales"),
    ("equipos-y-servicios.html", "nav_eq_l", "Equipos y servicios"),
    ("sostenibilidad.html", "nav_sos", "Sostenibilidad"),
    ("conoce-pqi.html", "nav_about", "Conoce PQI"),
    ("empleos.html", "nav_jobs", "Únete al equipo"),
    ("contacto.html", "nav_contact", "Contacto"),
]
GROUP_PAGE = {"inst": "soluciones-institucionales.html", "ind": "soluciones-industriales.html", "eq": "equipos-y-servicios.html"}

SOLUTIONS = ["Hoteles y hospitalidad", "Hospitales y clínicas", "Cuidado textil", "Restaurantes y catering",
             "Mantenimiento de instalaciones", "Aguas recreativas y potabilización", "Industria de alimentos",
             "Industria de bebidas", "Industria cárnica y avícola", "Mantenimiento industrial", "Generación de vapor",
             "Sistemas de enfriamiento", "Tratamiento de aguas residuales",
             "Control de procesos, dosificación y automatización", "Sistemas de pretratamiento de agua",
             "Certificaciones ServSafe®"]

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500&family=Noto+Sans:wght@400;500;600&display=swap">')


def ld_json():
    data = {
        "@context": "https://schema.org", "@type": "LocalBusiness", "@id": SITE + "/#pqi",
        "name": "PQI · Productos Químicos Industriales",
        "alternateName": "PQI",
        "description": "Soluciones integrales de higiene, sanitización, mantenimiento y tratamiento de agua para el sector institucional e industrial en República Dominicana.",
        "url": SITE + "/", "logo": SITE + "/img/pqi-logo.svg", "image": SITE + "/img/og-pqi.jpg",
        "telephone": PHONE_INTL, "email": "info@pqi.com.do", "foundingDate": "1973",
        "address": {"@type": "PostalAddress", "streetAddress": "Calle Central #11, Zona Industrial de Herrera",
                    "addressLocality": "Santo Domingo", "addressCountry": "DO"},
        "areaServed": "República Dominicana",
        "sameAs": ["https://www.instagram.com/pqi.rd/", "https://www.linkedin.com/company/pqi-rd/"],
        "makesOffer": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": n}} for n in SOLUTIONS],
    }
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False) + '</script>'


def head(m):
    title, desc, slug = m["title"], m["desc"], m["slug"]
    url = SITE + "/" + ("" if slug == "index" else slug)
    og = SITE + "/img/" + m.get("og", "hero-agua") + ".webp"
    e = html.escape
    return f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title data-i="{m['key']}_title">{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#ffffff">
<meta property="og:type" content="website">
<meta property="og:site_name" content="PQI · Productos Químicos Industriales">
<meta property="og:locale" content="es_DO">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="img/pqi-logo.svg" type="image/svg+xml">
<script>document.documentElement.classList.add("js");if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window)document.documentElement.classList.add("anim");</script>
{FONTS}
<link rel="stylesheet" href="css/styles.css">
<script>window.va=window.va||function(){{(window.vaq=window.vaq||[]).push(arguments)}};</script>
<script defer src="/_vercel/insights/script.js"></script>
{ld_json() if m.get("ld") else ""}'''


def header(active):
    links = "\n".join(
        f'        <li><a href="{h}" style="--k:{i}"{" aria-current=\"page\"" if h == active else ""} data-track="menu_{k}"><small>{i + 1:02d}</small><span data-i="{k}">{t}</span></a></li>'
        for i, (h, k, t) in enumerate(NAV))
    return f'''<span class="top-sentinel" aria-hidden="true"></span>
<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="index.html" aria-label="PQI, ir al inicio" data-i-attr="aria-label:a_home"><img src="img/pqi-logo.svg" alt="" width="43" height="40"><span data-i="brand_sub">Productos Químicos Industriales</span></a>
    <div class="h-actions">
      <button class="h-link lang-toggle" type="button" data-lang-toggle lang="en" aria-label="Switch to English">EN</button>
      <a class="btn h-quote" href="contacto.html#cotizar" data-track="header_cotizar" data-i="nav_quote">Cotizar</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="overlay"><span data-i="menu">Menú</span><b aria-hidden="true"></b></button>
    </div>
  </div>
</header>
<div class="overlay" id="overlay" role="dialog" aria-modal="true" aria-label="Menú" data-i-attr="aria-label:a_menu">
  <div class="wrap">
    <nav aria-label="Principal" data-i-attr="aria-label:a_nav">
      <ul class="ov-links">
{links}
      </ul>
    </nav>
    <div class="ov-side">
      <div><small data-i="c_phone">Central telefónica</small><a href="tel:{PHONE_INTL}" data-track="menu_tel">{PHONE}</a></div>
      <div><small data-i="c_mail">Escríbanos</small><a href="mailto:info@pqi.com.do">info@pqi.com.do</a><br><a href="mailto:admventas@pqi.com.do">admventas@pqi.com.do</a></div>
      <div><small data-i="c_addr_s">Dirección</small><a href="{MAPS}" target="_blank" rel="noopener">Calle Central #11, Zona Industrial de Herrera, Santo Domingo</a></div>
      <div><small data-i="f_social">Redes</small><a href="https://www.instagram.com/pqi.rd/" target="_blank" rel="noopener">Instagram</a> &nbsp; <a href="https://www.linkedin.com/company/pqi-rd/" target="_blank" rel="noopener">LinkedIn</a></div>
    </div>
  </div>
</div>'''


def footer(logo):
    sol = [("soluciones-institucionales.html", "nav_inst_l", "Soluciones institucionales"),
           ("soluciones-industriales.html", "nav_ind_l", "Soluciones industriales"),
           ("equipos-y-servicios.html", "nav_eq_l", "Equipos y servicios"),
           ("sostenibilidad.html", "nav_sos", "Sostenibilidad")]
    emp = [("conoce-pqi.html", "nav_about", "Conoce PQI"), ("conoce-pqi.html#valores", "f_values", "Valores y cultura"),
           ("empleos.html", "nav_jobs", "Únete al equipo"), ("contacto.html", "nav_contact", "Contacto")]
    li = lambda xs: "\n".join(f'          <li><a href="{h}" data-i="{k}">{t}</a></li>' for h, k, t in xs)
    return f'''<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <svg class="foot-logo" viewBox="0 0 146 137" role="img" aria-label="PQI Productos Químicos Industriales" data-i-attr="aria-label:a_logo">{logo}</svg>
        <p data-i="f_about">Soluciones completas de higiene, mantenimiento y tratamiento de agua para el sector institucional e industrial. Santo Domingo, desde 1973.</p>
      </div>
      <div>
        <h4 data-i="f_sol">Soluciones</h4>
        <ul>
{li(sol)}
        </ul>
      </div>
      <div>
        <h4 data-i="f_co">Empresa</h4>
        <ul>
{li(emp)}
        </ul>
      </div>
      <div>
        <h4 data-i="nav_contact">Contacto</h4>
        <ul>
          <li><a href="tel:{PHONE_INTL}" data-track="footer_tel">{PHONE}</a></li>
          <li><a href="mailto:info@pqi.com.do">info@pqi.com.do</a></li>
          <li><a href="mailto:admventas@pqi.com.do">admventas@pqi.com.do</a></li>
          <li><a href="https://www.instagram.com/pqi.rd/" target="_blank" rel="noopener">Instagram @pqi.rd</a></li>
          <li><a href="https://www.linkedin.com/company/pqi-rd/" target="_blank" rel="noopener">LinkedIn PQI-RD</a></li>
        </ul>
      </div>
    </div>
    <p class="foot-word" aria-hidden="true"><span data-i="fw_a">Soluciones</span> <span data-i="fw_b">completas.</span></p>
    <div class="foot-bottom">
      <span>© <span id="year">2026</span> PQI · Productos Químicos Industriales · Calle Central #11, Zona Industrial de Herrera, Santo Domingo</span>
      <nav aria-label="Legal" data-i-attr="aria-label:a_legal">
        <a href="privacidad.html" data-i="f_privacy">Política de privacidad</a>
        <a href="#top" data-i="f_top">Volver arriba</a>
      </nav>
    </div>
  </div>
</footer>
<a class="wa-float" href="https://wa.me/{WA}?text=Hola%20PQI%2C%20quisiera%20informaci%C3%B3n." target="_blank" rel="noopener" aria-label="Escríbanos por WhatsApp" data-i-attr="aria-label:a_wa" data-track="whatsapp_flotante"><svg aria-hidden="true"><use href="#i-wa"/></svg></a>
<div class="mobile-bar">
  <div class="row">
    <a href="tel:{PHONE_INTL}" data-track="barra_llamar"><span data-i="b_call">Llamar</span></a>
    <a class="wa" href="https://wa.me/{WA}" target="_blank" rel="noopener" data-track="barra_whatsapp"><svg aria-hidden="true"><use href="#i-wa"/></svg>WhatsApp</a>
    <a class="primary" href="contacto.html#cotizar" data-track="barra_cotizar"><span data-i="nav_quote">Cotizar</span></a>
  </div>
</div>'''


def k_of(it):
    return it["id"].replace("-", "_")


def srcset(name, sizes):
    return f'src="img/{name}.webp" srcset="img/{name}-800.webp 800w, img/{name}.webp 1600w" sizes="{sizes}"'


def ptable(items):
    """Tabla periódica de las 16 soluciones, con una ficha (dialog) por elemento."""
    layout = {6: 2, 13: 1}          # huecos después del elemento n (fila 1: 6 + 2, fila 2: 7 + 1)
    cells, dialogs = [], []
    for n, it in enumerate(items, 1):
        k, g = k_of(it), it["group"]
        cells.append(f'''    <button class="el g-{g}" type="button" data-g="{g}" data-open="dlg-{it['id']}" aria-haspopup="dialog" style="--k:{n - 1}" data-track="tabla_{it['id']}"><span class="n">{n:02d}</span><span class="dot" aria-hidden="true"></span><span class="s">{it['sym']}</span><span class="t" data-i="t_{k}">{it['es'][0]}</span></button>''')
        if n in layout:
            cells.append(f'    <span class="gap" style="grid-column:span {layout[n]}" aria-hidden="true"></span>')
        if n == 13:
            cells.append('    <span class="gap" style="grid-column:span 5" aria-hidden="true"></span>')
        dialogs.append(f'''<dialog class="el-dialog" id="dlg-{it['id']}" aria-labelledby="dlg-{it['id']}-h">
  <button class="dlg-close" type="button" data-close aria-label="Cerrar" data-i-attr="aria-label:a_close_x"><svg aria-hidden="true"><use href="#i-close"/></svg></button>
  <div class="dlg-grid">
    <div class="dlg-photo"><img {srcset(it['id'], '(max-width: 900px) 240px, 400px')} alt="{it['alt'][0]}" data-i-attr="alt:t_{k}_alt" loading="lazy" width="400" height="400"></div>
    <div class="dlg-body">
      <div class="dlg-sym"><b>{it['sym']}</b><span>{n:02d} · <span data-i="grp_{g}">{GROUP_ES[g]}</span></span></div>
      <h3 id="dlg-{it['id']}-h" data-i="t_{k}">{it['es'][0]}</h3>
      <p data-i="t_{k}_p">{it['es'][1]}</p>
      <div class="row">
        <a class="btn" href="contacto.html?sector={it['sector']}#cotizar" data-track="ficha_cotizar_{it['id']}" data-i="b_quote_sector">Cotizar para este sector</a>
        <a class="go" href="{GROUP_PAGE[g]}#{it['id']}"><span data-i="b_more">Ver más</span><i><svg aria-hidden="true"><use href="#i-arrow"/></svg></i></a>
      </div>
    </div>
  </div>
</dialog>''')
    return '<div class="ptable" id="tabla">\n' + "\n".join(cells) + "\n  </div>", "\n".join(dialogs)


GROUP_ES = {"inst": "Institucional", "ind": "Industrial", "eq": "Equipos y servicios"}


def sectors(items, group):
    """Acordeón nativo de sectores para las páginas internas."""
    out = []
    num = {it["id"]: i for i, it in enumerate(items, 1)}
    for it in [x for x in items if x["group"] == group]:
        k = k_of(it)
        out.append(f'''  <details class="sector rv" id="{it['id']}">
    <summary data-track="sector_{it['id']}"><span class="sym"><small>{num[it['id']]:02d}</small>{it['sym']}</span><span class="nm" data-i="t_{k}">{it['es'][0]}</span><span class="pm" aria-hidden="true"></span></summary>
    <div class="sector-body">
      <div class="ph"><img {srcset(it['id'], '240px')} alt="{it['alt'][0]}" data-i-attr="alt:t_{k}_alt" loading="lazy" width="240" height="240"></div>
      <div class="tx">
        <p data-i="t_{k}_p">{it['es'][1]}</p>
        <a class="go" href="contacto.html?sector={it['sector']}#cotizar" data-track="sector_cotizar_{it['id']}"><span data-i="b_quote_sector">Cotizar para este sector</span><i><svg aria-hidden="true"><use href="#i-arrow"/></svg></i></a>
      </div>
    </div>
  </details>''')
    return '<div class="sectors">\n' + "\n".join(out) + "\n</div>"


def gen_i18n(items):
    """Textos en inglés de las soluciones (se escriben dentro de js/i18n.js)."""
    lines = []
    for it in items:
        k = k_of(it)
        lines.append(f'    t_{k}: {json.dumps(it["en"][0], ensure_ascii=False)},')
        lines.append(f'    t_{k}_p: {json.dumps(it["en"][1], ensure_ascii=False)},')
        lines.append(f'    t_{k}_alt: {json.dumps(it["alt"][1], ensure_ascii=False)},')
    f = B / "js/i18n.js"
    s = f.read_text()
    s = re.sub(r"/\*GEN\*/.*?/\*END GEN\*/", lambda _: "/*GEN*/\n" + "\n".join(lines) + "\n    /*END GEN*/", s, flags=re.S)
    f.write_text(s)


def build():
    items = json.loads((SRC / "tabla.json").read_text())
    gen_i18n(items)
    sprite = (SRC / "sprite.html").read_text()
    logo = (SRC / "logo_paths.txt").read_text().strip()
    table, dialogs = ptable(items)
    pages = sorted((SRC / "pages").glob("*.html"))
    keys_used = set()
    for p in pages:
        raw = p.read_text()
        m = re.match(r"<!--(\{.*?\})-->\n", raw, re.S)
        meta = json.loads(m.group(1))
        body = raw[m.end():]
        body = body.replace("{{LOGO_PATHS}}", logo).replace("{{PHONE}}", PHONE).replace("{{PHONE_INTL}}", PHONE_INTL)
        body = body.replace("{{TABLA}}", table)
        for g in GROUP_PAGE:
            body = body.replace("{{SECTORES:" + g + "}}", sectors(items, g))
        body = body.replace("{{WA}}", WA).replace("{{MAPS}}", MAPS)
        pre, main = (body.split("<!--HEADER-->") + [""])[:2] if "<!--HEADER-->" in body else ("", body)
        out = f'''<!doctype html>
<html lang="es">
<head>
{head(meta)}
</head>
<body id="top" data-page="{meta['key']}">
<a class="skip-link" href="#main" data-i="a_skip">Saltar al contenido</a>
{sprite}
{pre}{header(meta["slug"] + ".html")}
<main id="main">
{main}
</main>
{dialogs if "{{TABLA}}" in raw else ""}
{footer(logo)}
<script src="js/i18n.js" defer></script>
<script src="js/app.js" defer></script>
</body>
</html>
'''
        (B / (meta["slug"] + ".html")).write_text(out)
        keys_used |= set(re.findall(r'data-i="([^"]+)"', out))
        keys_used |= set(k for a in re.findall(r'data-i-attr="([^"]+)"', out) for k in re.findall(r":(\w+)", a))
        print("ok", meta["slug"] + ".html")
    # Revisa que cada texto marcado tenga traducción al inglés
    i18n = (B / "js/i18n.js").read_text()
    en_keys = set(re.findall(r'\b([a-z][a-z0-9_]*)\s*:\s*"', i18n))
    missing = sorted(keys_used - en_keys)
    if missing:
        print("Faltan en i18n.js:", ", ".join(missing))

if __name__ == "__main__":
    build()
