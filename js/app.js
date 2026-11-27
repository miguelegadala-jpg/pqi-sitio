/* ==========================================================================
   PQI · Interacciones (v2)
   El scroll es 100% nativo: ningún script lo mueve ni lo bloquea. Algunos
   efectos solo LEEN la posición (listener pasivo) para animar.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var anim = root.classList.contains("anim");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var t = function (k, fb) { return (window.PQI_T && window.PQI_T(k)) || fb; };
  var yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Analítica: eventos con data-track ----------------
     Envía a Vercel Web Analytics (window.va) y a dataLayer si existe
     (Google Tag Manager / GA4). Sin datos personales: solo el nombre. */
  function track(name, data) {
    try {
      if (window.va) window.va("event", { name: name, data: data || {} });
      if (window.dataLayer) window.dataLayer.push({ event: "pqi_" + name, pqi_page: document.body.getAttribute("data-page") });
    } catch (e) {}
  }
  window.PQI_track = track;
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-track]");
    if (el) track(el.getAttribute("data-track"));
  });

  /* ---------------- Transición entre páginas (fundido corto) ---------------- */
  window.addEventListener("pageshow", function (e) { if (e.persisted) root.classList.remove("leaving"); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !anim || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(https?:|mailto:|tel:)/i.test(href) || !/\.html([?#].*)?$/i.test(href)) return;
    var url = new URL(href, location.href);
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    try { sessionStorage.setItem("pqi-intro", "1"); } catch (err) {}
    root.classList.add("leaving");
    setTimeout(function () { location.href = url.href; }, 180);
  });

  /* ---------------- Menú a pantalla completa ---------------- */
  var header = $(".site-header"), menuBtn = $(".menu-btn"), overlay = $("#overlay");
  var behind = [$("main"), $(".site-footer"), $("#intro")].filter(Boolean);
  function setMenu(open) {
    root.classList.toggle("menu-open", open);
    if (!menuBtn) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    var lbl = $("span", menuBtn); if (lbl) lbl.textContent = open ? (t("a_close_x", "Cerrar")) : (t("menu", "Menú"));
    behind.forEach(function (el) { if (open) el.setAttribute("inert", ""); else el.removeAttribute("inert"); });
    if (open) { var first = $(".ov-links a", overlay); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 350); track("menu_abrir"); }
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!root.classList.contains("menu-open")); });
  $$("#overlay a").forEach(function (a) { a.addEventListener("click", function () { if (a.getAttribute("href").charAt(0) === "#") setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); } });
  document.addEventListener("pqi:lang", function () { if (menuBtn) { var l = $("span", menuBtn); if (l) l.textContent = root.classList.contains("menu-open") ? t("a_close_x", "Cerrar") : t("menu", "Menú"); } });

  /* ---------------- Header con fondo al bajar (sin escuchar el scroll) ---------------- */
  var sentinel = $(".top-sentinel");
  if (hasIO && header && sentinel) new IntersectionObserver(function (e) { header.classList.toggle("scrolled", !e[0].isIntersecting && e[0].boundingClientRect.top < 0); }).observe(sentinel);

  /* ---------------- Aparición al entrar en pantalla ---------------- */
  var once = function (els, opts, cb) {
    if (!els.length) return;
    if (!hasIO) { els.forEach(function (el) { el.classList.add("in"); if (cb) cb(el); }); return; }
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); if (cb) cb(e.target); o.unobserve(e.target); } });
    }, opts || { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { o.observe(el); });
  };
  if (anim) {
    $$(".rv").forEach(function (el) {
      if (el.style.getPropertyValue("--d")) return;
      var sib = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("rv"); });
      if (sib.length > 1) el.style.setProperty("--d", Math.min(sib.indexOf(el), 8) * 0.08 + "s");
    });
    once($$(".rv"));
    once($$(".circle-photo, .page-hero .orb, .tl li"), { threshold: 0.25 });
    once($$(".venn"), { threshold: 0.45 });
    once($$(".values-words li"), { threshold: 0.6 });
    $$(".foot-logo .lg-s").forEach(function (p, i) { p.style.setProperty("--i", i); });
    once($$(".foot-logo"), { threshold: 0.6 });
  }

  /* ---------------- Intro: el logo se dibuja y da paso a la portada al bajar ---------------- */
  var intro = $("#intro"), hero = $(".hero");
  function heroGo() { if (!hero) return; hero.classList.add("go"); var o = $(".orb", hero); if (o) o.classList.add("in"); }
  if (intro) {
    var seen = false; try { seen = sessionStorage.getItem("pqi-intro") === "1"; } catch (e) {}
    if (!anim || seen || (location.hash && location.hash !== "#intro")) {
      intro.parentNode.removeChild(intro); heroGo();
    } else {
      root.classList.add("has-intro");
      try { sessionStorage.setItem("pqi-intro", "1"); } catch (e) {}
      $$(".lg-s", intro).forEach(function (p, i) { p.style.setProperty("--i", i); });
      var inner = $(".intro-inner", intro), glow = $(".intro-glow", intro), hint = $(".intro-hint", intro), tick = false, done = false;
      var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
      var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
      var frame = function () {
        tick = false;
        var total = intro.offsetHeight - window.innerHeight; if (total <= 0) return;
        var p = clamp(-intro.getBoundingClientRect().top / total), e = ease(clamp(p / .85));
        inner.style.transform = "translate3d(0," + (-e * 18).toFixed(2) + "vh,0) scale(" + (1 - e * .55).toFixed(4) + ")";
        inner.style.opacity = (1 - clamp((p - .35) / .45)).toFixed(3);
        inner.style.filter = p > .2 ? "blur(" + (clamp((p - .2) / .6) * 6).toFixed(2) + "px)" : "";
        if (glow) glow.style.opacity = (1 - clamp(p / .7)).toFixed(3);
        if (hint) hint.style.opacity = p > .02 ? String(1 - clamp(p / .15)) : "";
        if (p > .55 && !done) { done = true; root.classList.add("intro-done"); heroGo(); }
      };
      var req = function () { if (!tick) { tick = true; requestAnimationFrame(frame); } };
      window.addEventListener("scroll", req, { passive: true });
      window.addEventListener("resize", req);
      frame();
      // Si la intro sale de la pantalla, la portada se anima de todos modos
      if (hasIO && hero) new IntersectionObserver(function (e, o) { if (e[0].isIntersecting && e[0].intersectionRatio > .35) { heroGo(); root.classList.add("intro-done"); o.disconnect(); } }, { threshold: [.35] }).observe(hero);
    }
  } else heroGo();

  /* ---------------- Foto en círculo que rota (portada) ---------------- */
  var lio = hasIO ? new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("live", e.isIntersecting); }); }, { rootMargin: "60px 0px" }) : null;
  $$("[data-orb]").forEach(function (orb) {
    if (lio) lio.observe(orb); else orb.classList.add("live");
    var stage = $("[data-rotate]", orb); if (!stage) return;
    var imgs = $$("img", stage), btns = $$(".orb-count button", orb), idx = 0, timer = null;
    var ms = parseInt(stage.getAttribute("data-rotate"), 10) || 6000;
    if (imgs.length < 2) return;
    function show(n) {
      idx = (n + imgs.length) % imgs.length;
      var im = imgs[idx]; if (im.loading === "lazy") im.loading = "eager";
      imgs.forEach(function (s, i) { s.classList.toggle("is-on", i === idx); });
      btns.forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === idx)); });
    }
    btns.forEach(function (b, i) { b.addEventListener("click", function () { clearInterval(timer); show(i); }); });
    if (!reduce) timer = setInterval(function () { if ((orb.classList.contains("live") || !lio) && !document.hidden) show(idx + 1); }, ms);
  });

  /* ---------------- Burbujas: suben despacio, como la "i" del logo ---------------- */
  $$("canvas[data-bubbles]").forEach(function (cv) {
    var ctx = cv.getContext && cv.getContext("2d"); if (!ctx) return;
    var dark = cv.getAttribute("data-bubbles") === "dark";
    var host = cv.parentNode, W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), list = [], running = false, raf = null;
    var mouse = { x: -9999, y: -9999 };
    var stroke = dark ? "rgba(156,197,234," : "rgba(5,93,167,";
    function make(initial) {
      var r = 3 + Math.pow(Math.random(), 2.4) * 34;
      return { x: Math.random() * W, y: initial ? Math.random() * H : H + r + Math.random() * 60, r: r,
        v: .12 + Math.random() * .35 + (r < 8 ? .2 : 0), ph: Math.random() * 6.28, sw: .3 + Math.random() * .6,
        a: (dark ? .18 : .12) + Math.random() * (dark ? .3 : .22), fill: Math.random() < .08, ox: 0, oy: 0 };
    }
    function size() {
      var r = host.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(46, Math.max(14, W * H / 26000)));
      list = []; for (var i = 0; i < n; i++) list.push(make(true));
      if (!running) draw(0);
    }
    function draw(ts) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < list.length; i++) {
        var b = list[i];
        if (running) {
          b.y -= b.v; b.ph += .008;
          // el cursor aparta las burbujas con suavidad
          var dx = b.x + b.ox - mouse.x, dy = b.y + b.oy - mouse.y, d2 = dx * dx + dy * dy, R = 140;
          if (d2 < R * R) { var d = Math.sqrt(d2) || 1, f = (1 - d / R) * 1.6; b.ox += dx / d * f; b.oy += dy / d * f; }
          b.ox *= .94; b.oy *= .94;
          if (b.y < -b.r - 10) list[i] = make(false);
        }
        var x = b.x + Math.sin(b.ph) * 14 * b.sw + b.ox, y = b.y + b.oy;
        ctx.beginPath(); ctx.arc(x, y, b.r, 0, 6.2832);
        if (b.fill) { ctx.fillStyle = stroke + (b.a * .9) + ")"; ctx.fill(); }
        else { ctx.lineWidth = 1; ctx.strokeStyle = stroke + b.a + ")"; ctx.stroke(); }
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(draw); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }
    size();
    if (window.ResizeObserver) new ResizeObserver(function () { size(); }).observe(host); else window.addEventListener("resize", size);
    var inView = !hasIO;
    if (hasIO) new IntersectionObserver(function (e) { inView = e[0].isIntersecting; if (inView && !document.hidden) start(); else stop(); }).observe(host); else start();
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else if (inView) start(); });
    if (fine) {
      host.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
      host.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
    }
  });

  /* ---------------- Manifiesto: cada palabra se enciende al leer ---------------- */
  $$("[data-words]").forEach(function (p) {
    var words = [];
    function split() {
      words = [];
      $$("[data-i]", p).forEach(function (part) {
        var txt = part.textContent;
        part.innerHTML = txt.split(/(\s+)/).map(function (w) { return /^\s+$/.test(w) || !w ? w : '<span class="w">' + w + "</span>"; }).join("");
        words = words.concat($$(".w", part));
      });
      paint();
    }
    var tick = false;
    function paint() {
      tick = false;
      if (!anim) { words.forEach(function (w) { w.classList.add("on"); }); return; }
      var r = p.getBoundingClientRect(), vh = window.innerHeight;
      // de 85% a 35% de la pantalla se encienden todas
      var prog = (vh * .85 - r.top) / (r.height + vh * .5);
      var n = Math.round(Math.max(0, Math.min(1, prog)) * words.length);
      words.forEach(function (w, i) { w.classList.toggle("on", i < n); });
    }
    split();
    if (anim) window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(paint); } }, { passive: true });
    document.addEventListener("pqi:lang", function () {
      // i18n restaura el texto de cada parte; se vuelve a dividir
      split();
    });
  });

  /* ---------------- Tabla periódica: filtros y fichas ---------------- */
  var table = $(".ptable");
  if (table) {
    var els = $$(".el", table);
    if (anim) setTimeout(function () { once([table], { threshold: .15 }, function () { setTimeout(function () { table.classList.add("ready"); }, 1200); }); }, 0);
    $$("[data-filter]").forEach(function (b, _, all) {
      b.addEventListener("click", function () {
        var g = b.getAttribute("data-filter");
        all.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        els.forEach(function (el) { var off = g !== "all" && el.getAttribute("data-g") !== g; el.classList.toggle("dim", off); el.tabIndex = off ? -1 : 0; });
        track("tabla_filtro_" + g);
      });
    });
    els.forEach(function (el) {
      el.addEventListener("pointerenter", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(0) + "%");
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(0) + "%");
      });
      el.addEventListener("click", function () {
        var d = document.getElementById(el.getAttribute("data-open"));
        if (!d) return;
        if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
        d._opener = el;
      });
    });
  }
  $$("dialog.el-dialog").forEach(function (d) {
    var close = function () { if (d.close) d.close(); else d.removeAttribute("open"); };
    $$("[data-close]", d).forEach(function (b) { b.addEventListener("click", close); });
    d.addEventListener("click", function (e) { if (e.target === d) close(); });
    d.addEventListener("close", function () { if (d._opener) d._opener.focus({ preventScroll: true }); });
  });

  /* ---------------- Proceso: el anillo se completa con cada paso ---------------- */
  var steps = $$(".step"), arcs = $$(".ring .arc"), ringN = $("[data-ring-n]");
  if (steps.length && hasIO) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("on"); });
      var last = -1; steps.forEach(function (s, i) { if (s.classList.contains("on")) last = i; });
      arcs.forEach(function (a, i) { a.classList.toggle("on", i <= last); });
      if (ringN && last >= 0) ringN.textContent = ("0" + (last + 1)).slice(-2);
    }, { rootMargin: "-40% 0px -40% 0px" });
    steps.forEach(function (s) { sio.observe(s); });
  } else steps.forEach(function (s) { s.classList.add("on"); });

  /* ---------------- Tres círculos: se resaltan al pasar por cada pilar ---------------- */
  $$(".venn").forEach(function (v) {
    var sec = v.closest("section");
    $$("[data-v]", sec).forEach(function (row) {
      if (row.closest(".venn")) return;
      var c = $('.c[data-v="' + row.getAttribute("data-v") + '"]', v);
      row.addEventListener("pointerenter", function () { c.classList.add("hl"); });
      row.addEventListener("pointerleave", function () { c.classList.remove("hl"); });
    });
  });

  /* ---------------- Sectores: abre el que viene en la dirección (#hoteles) ---------------- */
  function openHash() {
    var id = location.hash.slice(1); if (!id) return;
    var d = document.getElementById(id);
    if (d && d.tagName === "DETAILS") d.open = true;
  }
  openHash(); window.addEventListener("hashchange", openHash);
  $$("details.sector").forEach(function (d) { d.addEventListener("toggle", function () { if (d.open) track("sector_abrir_" + d.id); }); });

  /* ---------------- Contadores ---------------- */
  var counters = $$("[data-count]");
  function runCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10), pre = el.getAttribute("data-pre") || "", suf = el.getAttribute("data-suf") || "";
    if (!anim) { el.textContent = pre + target + suf; return; }
    var t0 = null;
    function step(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / 1600); el.textContent = pre + Math.round(target * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (anim) {
      counters.forEach(function (el) { el.textContent = (el.getAttribute("data-pre") || "") + "0" + (el.getAttribute("data-suf") || ""); });
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, h = el.closest(".hero");
          // En la portada, el contador espera a que entre el texto
          var go = function () { runCount(el); };
          if (h && !h.classList.contains("go")) { var mo = new MutationObserver(function () { if (h.classList.contains("go")) { mo.disconnect(); setTimeout(go, 700); } }); mo.observe(h, { attributes: true }); }
          else setTimeout(go, h ? 700 : 0);
          cio.unobserve(el);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---------------- Formularios ---------------- */
  function check(field) {
    var input = $("input, textarea, select", field);
    var v = input.type === "file" ? (input.files && input.files.length ? "x" : "") : input.value.trim();
    var bad = false;
    if (input.required && !v) bad = true;
    if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
    if (input.type === "tel" && v && v.replace(/\D/g, "").length < 7) bad = true;
    field.classList.toggle("invalid", bad);
    input.setAttribute("aria-invalid", String(bad));
    return !bad;
  }
  function wire(form, onOk) {
    if (!form) return;
    var success = $(".form-success", form);
    $$(".field", form).forEach(function (f) {
      var input = $("input, textarea, select", f);
      input.addEventListener("blur", function () { if (input.value) check(f); });
      input.addEventListener("input", function () { if (f.classList.contains("invalid")) check(f); });
      input.addEventListener("change", function () { if (f.classList.contains("invalid")) check(f); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, first = null;
      $$(".field", form).forEach(function (f) { if (!check(f)) { ok = false; first = first || f; } });
      if (!ok) { $("input, textarea, select", first).focus(); return; }
      var v = function (n) { var el = form.elements[n]; return el ? (el.value || "").trim() : ""; };
      onOk(v, success);
      if (success) { success.hidden = false; var h = $("h3", success); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); } }
    });
    var reset = $("[data-form-reset]", form);
    if (reset) reset.addEventListener("click", function () { success.hidden = true; $("input", form).focus(); });
  }

  // Cotización: arma el mensaje para WhatsApp
  var quote = $("#quote");
  if (quote) {
    var sel = quote.elements.sector, qs = new URLSearchParams(location.search).get("sector");
    if (sel && qs) Array.prototype.forEach.call(sel.options, function (o) { if (o.value === qs) sel.value = qs; });
    wire(quote, function (v) {
      var lines = [t("q_wa_intro", "Hola PQI, quisiera una cotización."),
        t("q_name", "Nombre") + ": " + v("nombre"),
        v("empresa") && t("q_company", "Empresa") + ": " + v("empresa"),
        t("q_phone", "Teléfono") + ": " + v("telefono"),
        v("sector") && t("q_sector", "Sector") + ": " + v("sector"),
        v("correo") && t("q_mail", "Correo") + ": " + v("correo"),
        v("necesidad") && t("q_need_s", "Necesidad") + ": " + v("necesidad")].filter(Boolean);
      var url = "https://wa.me/" + quote.getAttribute("data-wa") + "?text=" + encodeURIComponent(lines.join("\n"));
      var btn = $("#wa-send"); if (btn) btn.href = url;
      window.open(url, "_blank", "noopener");
    });
  }

  // Empleos: arma el correo (el CV se adjunta en el correo)
  var cv = $("#cv-form");
  if (cv) {
    var file = cv.elements.cv, fname = $("#cv-name");
    if (file && fname) file.addEventListener("change", function () { fname.textContent = file.files.length ? file.files[0].name : ""; });
    wire(cv, function (v) {
      var body = [t("cv_mail_intro", "Hola, quiero formar parte del equipo de PQI."),
        t("q_name", "Nombre") + ": " + v("nombre") + " " + v("apellido"),
        t("q_mail", "Correo") + ": " + v("correo"),
        t("q_phone", "Teléfono") + ": " + v("telefono"),
        v("area") && t("cv_area_s", "Área de interés") + ": " + v("area"),
        "", t("cv_attach", "Adjunto mi currículum.")].filter(function (x) { return x !== false && x !== ""; }).join("\n");
      var href = "mailto:" + cv.getAttribute("data-mail") + "?subject=" + encodeURIComponent(t("cv_subject", "Solicitud de empleo") + " · " + v("nombre") + " " + v("apellido")) + "&body=" + encodeURIComponent(body);
      var btn = $("#cv-send"); if (btn) btn.href = href;
      location.href = href;
    });
  }
})();
