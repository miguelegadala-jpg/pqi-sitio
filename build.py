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
    ("soluciones-institucionales.html", "nav_inst", "Institucional"),
    ("soluciones-industriales.html", "nav_ind", "Industrial"),
    ("equipos-y-servicios.html", "nav_eq", "Equipos"),
    ("sostenibilidad.html", "nav_sos", "Sostenibilidad"),
    ("conoce-pqi.html", "nav_about", "Conoce PQI"),
]
MOBILE_EXTRA = [("empleos.html", "nav_jobs", "Únete al equipo"), ("contacto.html", "nav_contact", "Contacto")]

SOLUTIONS = ["Hoteles y hospitalidad", "Hospitales y clínicas", "Cuidado textil", "Restaurantes y catering",
             "Mantenimiento de instalaciones", "Aguas recreativas y potabilización", "Industria de alimentos",
             "Industria de bebidas", "Industria cárnica y avícola", "Mantenimiento industrial", "Generación de vapor",
             "Sistemas de enfriamiento", "Tratamiento de aguas residuales",
             "Control de procesos, dosificación y automatización", "Sistemas de pretratamiento de agua",
             "Certificaciones ServSafe®"]

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap">')


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
{ld_json() if m.get("ld") else ""}'''


def header(active):
    nav = "\n".join(
        f'      <a href="{h}" data-i="{k}"{" class=\"is-active\" aria-current=\"page\"" if h == active else ""}>{t}</a>'
        for h, k, t in NAV)
    mob = "\n".join(
        f'    <a href="{h}"{" aria-current=\"page\"" if h == active else ""}><span data-i="{k}">{t}</span><svg aria-hidden="true" width="18" height="18"><use href="#i-arrow"/></svg></a>'
        for h, k, t in NAV + MOBILE_EXTRA)
    contact_cls = ' is-active" aria-current="page' if active == "contacto.html" else ""
    return f'''<header class="site-header">
  <span class="top-sentinel" aria-hidden="true"></span>
  <div class="header-row">
    <nav class="nav" aria-label="Principal" data-i-attr="aria-label:a_nav">
{nav}
    </nav>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú"><span></span></button>
    <a class="brand" href="index.html" aria-label="PQI, ir al inicio" data-i-attr="aria-label:a_home"><img src="img/pqi-logo.svg" alt="PQI Productos Químicos Industriales" data-i-attr="alt:a_logo" width="62" height="58"></a>
    <div class="header-actions">
      <button class="pill lang-toggle" type="button" data-lang-toggle lang="en" aria-label="Switch to English">EN</button>
      <a class="pill{contact_cls}" href="contacto.html" data-i="nav_contact">Contacto</a>
      <a class="pill pill-primary" href="contacto.html#cotizar"><svg aria-hidden="true"><use href="#i-doc"/></svg><span data-i="nav_quote">Cotizar</span></a>
    </div>
  </div>
  <nav class="mobile-menu" id="mobile-menu" aria-label="Menú" data-i-attr="aria-label:a_menu">
{mob}
    <div class="mm-actions">
      <a class="btn btn-outline" href="tel:{PHONE_INTL}"><svg aria-hidden="true"><use href="#i-phone"/></svg><span data-i="b_call">Llamar</span></a>
      <a class="btn btn-primary" href="contacto.html#cotizar" data-i="nav_quote">Cotizar</a>
    </div>
  </nav>
</header>'''


def footer():
    sol = [("soluciones-institucionales.html", "nav_inst_l", "Soluciones institucionales"),
           ("soluciones-industriales.html", "nav_ind_l", "Soluciones industriales"),
           ("equipos-y-servicios.html", "nav_eq_l", "Equipos y servicios"),
           ("sostenibilidad.html", "nav_sos", "Sostenibilidad")]
    emp = [("conoce-pqi.html", "nav_about", "Conoce PQI"), ("conoce-pqi.html#valores", "f_values", "Valores y cultura"),
           ("empleos.html", "nav_jobs", "Únete al equipo"), ("contacto.html", "nav_contact", "Contacto")]
    li = lambda xs: "\n".join(f'        <li><a href="{h}" data-i="{k}">{t}</a></li>' for h, k, t in xs)
    return f'''<footer class="site-footer">
  <div class="container">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="img/pqi-logo.svg" alt="PQI Productos Químicos Industriales" data-i-attr="alt:a_logo" width="79" height="74" loading="lazy">
        <p data-i="f_about">Soluciones completas de higiene, mantenimiento y tratamiento de agua para el sector institucional e industrial. Santo Domingo, desde 1973.</p>
        <div class="socials">
          <a href="https://www.instagram.com/pqi.rd/" target="_blank" rel="noopener" aria-label="Instagram @pqi.rd"><svg aria-hidden="true"><use href="#i-ig"/></svg></a>
          <a href="https://www.linkedin.com/company/pqi-rd/" target="_blank" rel="noopener" aria-label="LinkedIn PQI-RD"><svg aria-hidden="true"><use href="#i-in"/></svg></a>
        </div>
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
          <li><a href="{MAPS}" target="_blank" rel="noopener">Calle Central #11, Zona Industrial de Herrera, Santo Domingo</a></li>
          <li><a href="tel:{PHONE_INTL}">{PHONE}</a></li>
          <li><a href="mailto:info@pqi.com.do">info@pqi.com.do</a></li>
          <li><a href="mailto:admventas@pqi.com.do"><span data-i="f_sales">Ventas:</span> admventas@pqi.com.do</a></li>
          <li><a href="https://www.instagram.com/pqi.rd/" target="_blank" rel="noopener">Instagram @pqi.rd</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span id="year">2026</span> PQI · Productos Químicos Industriales</span>
      <nav aria-label="Legal" data-i-attr="aria-label:a_legal">
        <a href="privacidad.html" data-i="f_privacy">Política de privacidad</a>
        <a class="to-top" href="#top"><span data-i="f_top">Volver arriba</span><svg aria-hidden="true"><use href="#i-up"/></svg></a>
      </nav>
    </div>
  </div>
</footer>
<a class="wa-float" href="https://wa.me/{WA}?text=Hola%20PQI%2C%20quisiera%20informaci%C3%B3n." target="_blank" rel="noopener" aria-label="Escríbanos por WhatsApp" data-i-attr="aria-label:a_wa"><svg aria-hidden="true"><use href="#i-wa"/></svg></a>
<div class="mobile-bar">
  <div class="row">
    <a href="tel:{PHONE_INTL}"><svg aria-hidden="true"><use href="#i-phone"/></svg><span data-i="b_call">Llamar</span></a>
    <a class="wa" href="https://wa.me/{WA}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>WhatsApp</a>
    <a class="primary" href="contacto.html#cotizar"><svg aria-hidden="true"><use href="#i-doc"/></svg><span data-i="nav_quote">Cotizar</span></a>
  </div>
</div>'''


def tabs_html(group, items):
    """Subcategorías en tabs: lista a la izquierda, panel con foto y texto a la derecha."""
    tabs, panels = [], []
    for i, it in enumerate(items, 1):
        k = it["id"].replace("-", "_")
        n = f"{i:02d}"
        tabs.append(f'''      <button class="tab" role="tab" id="tab-{it['id']}" aria-controls="panel-{it['id']}" aria-selected="{'true' if i == 1 else 'false'}" type="button"><span class="tn">{n}</span><span data-i="t_{k}">{it['es'][0]}</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></button>''')
        panels.append(f'''    <div class="tabpanel" role="tabpanel" id="panel-{it['id']}" aria-labelledby="tab-{it['id']}" tabindex="0">
      <div class="tp-media"><img src="img/{it['id']}.webp" srcset="img/{it['id']}-800.webp 800w, img/{it['id']}.webp 1600w" sizes="(max-width: 900px) 100vw, 60vw" alt="{it['alt'][0]}" data-i-attr="alt:t_{k}_alt" loading="lazy"><span class="tp-n">{n}</span></div>
      <div class="tp-body">
        <h3 data-i="t_{k}">{it['es'][0]}</h3>
        <p data-i="t_{k}_p">{it['es'][1]}</p>
        <a class="btn btn-primary" href="contacto.html?sector={it['sector']}#cotizar"><span data-i="b_quote_sector">Cotizar para este sector</span><svg class="arr" aria-hidden="true"><use href="#i-arrow"/></svg></a>
      </div>
    </div>''')
    return ('<div class="tabs" data-tabs>\n    <div class="tablist" role="tablist" aria-label="Subcategorías" data-i-attr="aria-label:a_subcats">\n'
            + "\n".join(tabs) + "\n    </div>\n    <div>\n" + "\n".join(panels) + "\n    </div>\n  </div>")


def gen_i18n(tabs):
    """Textos en inglés de las subcategorías (se escriben dentro de js/i18n.js)."""
    lines = []
    for items in tabs.values():
        for it in items:
            k = it["id"].replace("-", "_")
            lines.append(f'    t_{k}: {json.dumps(it["en"][0], ensure_ascii=False)},')
            lines.append(f'    t_{k}_p: {json.dumps(it["en"][1], ensure_ascii=False)},')
            lines.append(f'    t_{k}_alt: {json.dumps(it["alt"][1], ensure_ascii=False)},')
    f = B / "js/i18n.js"
    s = f.read_text()
    s = re.sub(r"/\*GEN\*/.*?/\*END GEN\*/", "/*GEN*/\n" + "\n".join(lines) + "\n    /*END GEN*/", s, flags=re.S)
    f.write_text(s)


def build():
    tabs = json.loads((SRC / "tabs.json").read_text())
    gen_i18n(tabs)
    sprite = (SRC / "sprite.html").read_text()
    logo = (SRC / "logo_paths.txt").read_text()
    pages = sorted((SRC / "pages").glob("*.html"))
    keys_used = set()
    for p in pages:
        raw = p.read_text()
        m = re.match(r"<!--(\{.*?\})-->\n", raw, re.S)
        meta = json.loads(m.group(1))
        body = raw[m.end():]
        body = body.replace("{{LOGO_PATHS}}", logo).replace("{{PHONE}}", PHONE).replace("{{PHONE_INTL}}", PHONE_INTL)
        for g, items in tabs.items():
            body = body.replace("{{TABS:" + g + "}}", tabs_html(g, items))
        body = body.replace("{{WA}}", WA).replace("{{MAPS}}", MAPS)
        out = f'''<!doctype html>
<html lang="es">
<head>
{head(meta)}
</head>
<body id="top" data-page="{meta['key']}">
<a class="skip-link" href="#main" data-i="a_skip">Saltar al contenido</a>
{sprite}
{body.split("<!--HEADER-->")[0] if "<!--HEADER-->" in body else ""}{header(meta["slug"] + ".html")}
<main id="main">
{body.split("<!--HEADER-->")[-1]}
</main>
{footer()}
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
