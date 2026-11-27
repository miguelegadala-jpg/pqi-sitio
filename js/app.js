/* ==========================================================================
   PQI — Interacciones
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
  var t = function (k, fb) { return (window.PQI_T && window.PQI_T(k)) || fb; };
  var yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  /* ---------------- Menú móvil ---------------- */
  var header = $(".site-header");
  var toggle = $(".menu-toggle");
  function setMenu(open) {
    root.classList.toggle("menu-open", open);
    if (toggle) { toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? t("a_close", "Cerrar menú") : t("a_open", "Abrir menú")); }
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!root.classList.contains("menu-open")); });
  $$(".mobile-menu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && root.classList.contains("menu-open")) { setMenu(false); toggle.focus(); } });
  // Si el menú o los botones no caben junto al logo, se usa la hamburguesa
  var nav = $(".nav"), actions = $(".header-actions"), brand = $(".site-header .brand");
  function fitNav() {
    if (!header || !nav || !brand) return;
    var was = header.classList.contains("nav-compact");
    header.classList.remove("nav-compact");
    var tight = false;
    if (getComputedStyle(nav).display !== "none") {
      var b = brand.getBoundingClientRect(), last = nav.lastElementChild.getBoundingClientRect(), first = actions.firstElementChild;
      var gap = 12, firstVisible = Array.prototype.filter.call(actions.children, function (c) { return c.offsetWidth > 0; })[0];
      tight = last.right > b.left - gap || nav.scrollWidth > nav.clientWidth + 1 || (firstVisible && firstVisible.getBoundingClientRect().left < b.right + gap);
    }
    header.classList.toggle("nav-compact", tight);
    if (was && !tight) setMenu(false);
  }
  if (window.ResizeObserver && header) { var ro = new ResizeObserver(fitNav); [header, actions].concat(nav ? Array.prototype.slice.call(nav.children) : []).forEach(function (el) { if (el) ro.observe(el); }); } else window.addEventListener("resize", fitNav);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNav);

  /* ---------------- Header con sombra al bajar (sin escuchar el scroll) ---------------- */
  var sentinel = $(".top-sentinel");
  if (hasIO && header && sentinel) new IntersectionObserver(function (e) { header.classList.toggle("scrolled", !e[0].isIntersecting && e[0].boundingClientRect.top < 0); }).observe(sentinel);

  /* ---------------- Aparición al entrar en pantalla (.rv) ---------------- */
  if (anim) {
    // Escalonado automático entre hermanos marcados con .rv
    $$(".rv").forEach(function (el) {
      if (el.style.getPropertyValue("--d")) return;
      var sib = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("rv"); });
      if (sib.length > 1) el.style.setProperty("--d", Math.min(sib.indexOf(el), 8) * 0.08 + "s");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".rv, .rv-img, .step, .pillar").forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Intro: el logo se dibuja y da paso a la portada al bajar ---------------- */
  var intro = $("#intro"), hero = $(".hero");
  function heroGo() { if (hero) hero.classList.add("go"); }
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

  /* ---------------- Fondos que rotan (portada) ---------------- */
  var liveEls = $$(".live-bg");
  var lio = hasIO ? new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("live", e.isIntersecting); }); }, { rootMargin: "100px 0px" }) : null;
  liveEls.forEach(function (el) { if (lio) lio.observe(el); else el.classList.add("live"); });
  $$("[data-rotate]").forEach(function (stage) {
    var section = stage.closest(".live-bg") || stage.parentNode;
    var slides = $$(".bg-slide", stage), wrap = $(".bg-dots", section), ctrls = wrap ? $$("button", wrap) : [];
    var ms = parseInt(stage.getAttribute("data-rotate"), 10) || 6500, idx = 0, timer = null;
    if (slides.length < 2) return;
    if (wrap) wrap.style.setProperty("--rot", ms / 1000 + "s");
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-on", i === idx); });
      ctrls.forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === idx)); });
      if (wrap && wrap.classList.contains("timing")) { wrap.classList.remove("timing"); void wrap.offsetWidth; wrap.classList.add("timing"); }
    }
    ctrls.forEach(function (b, i) { b.addEventListener("click", function () { clearInterval(timer); if (wrap) wrap.classList.remove("timing"); show(i); }); });
    if (!reduce) {
      if (wrap) wrap.classList.add("timing");
      timer = setInterval(function () { if ((section.classList.contains("live") || !lio) && !document.hidden) show(idx + 1); }, ms);
    }
  });

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

  /* ---------------- Explora PQI: entrada e inclinación con brillo ---------------- */
  var xGrid = $(".explore-grid");
  if (xGrid && anim) {
    var xCards = $$(".x-card", xGrid);
    xCards.forEach(function (c, i) { c.classList.add("x-pre"); c.style.setProperty("--d", (i * 0.12) + "s"); });
    var xio = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return; xio.disconnect();
      xCards.forEach(function (c) { c.classList.add("x-open"); });
      setTimeout(function () { xCards.forEach(function (c) { c.classList.remove("x-pre", "x-open"); c.style.removeProperty("--d"); }); }, 2400);
    }, { threshold: 0.12 });
    xio.observe(xGrid);
  }
  if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$(".x-card").forEach(function (card) {
      var raf = null;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.classList.add("tilting");
          card.style.setProperty("--ry", ((x - 0.5) * 9).toFixed(2) + "deg");
          card.style.setProperty("--rx", ((0.5 - y) * 7).toFixed(2) + "deg");
          card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
          card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        });
      });
      card.addEventListener("pointerleave", function () {
        if (raf) cancelAnimationFrame(raf);
        card.classList.remove("tilting");
        card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------------- Tabs de subcategorías ---------------- */
  $$("[data-tabs]").forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap), panels = $$('[role="tabpanel"]', wrap);
    function select(tab, focus) {
      tabs.forEach(function (tb) { var on = tb === tab; tb.setAttribute("aria-selected", String(on)); tb.tabIndex = on ? 0 : -1; });
      panels.forEach(function (p) {
        var on = p.id === tab.getAttribute("aria-controls");
        p.hidden = !on;
        if (on && anim) { p.classList.remove("swap"); void p.offsetWidth; p.classList.add("swap"); }
      });
      if (focus) tab.focus();
      if (history.replaceState) history.replaceState(null, "", "#" + tab.id.replace(/^tab-/, ""));
    }
    tabs.forEach(function (tb, i) {
      tb.addEventListener("click", function () { select(tb, false); });
      tb.addEventListener("keydown", function (e) {
        var k = e.key, n = null;
        if (k === "ArrowDown" || k === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        else if (k === "ArrowUp" || k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (k === "Home") n = tabs[0]; else if (k === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    var start = location.hash && $("#tab-" + location.hash.slice(1), wrap);
    tabs.forEach(function (tb) { tb.tabIndex = -1; });
    panels.forEach(function (p) { p.hidden = true; });
    var first = start || tabs[0];
    first.setAttribute("aria-selected", "true"); first.tabIndex = 0;
    $("#" + first.getAttribute("aria-controls")).hidden = false;
    tabs.forEach(function (tb) { if (tb !== first) tb.setAttribute("aria-selected", "false"); });
  });

  /* ---------------- Valores: entran en cascada ---------------- */
  var vg = $(".values-grid");
  if (vg && anim) {
    $$(".value", vg).forEach(function (v, i) { v.style.setProperty("--d", i * 0.12 + "s"); });
    var vio = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { vg.classList.add("on"); vio.disconnect(); } }, { threshold: 0.3 });
    vio.observe(vg);
  }

  /* ---------------- Línea de tiempo: se llena al llegar a cada año ---------------- */
  var tl = $(".timeline");
  if (tl && hasIO) {
    var items = $$(".t-item", tl);
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("seen"); tio.unobserve(e.target); } });
      var last = null; items.forEach(function (it) { if (it.classList.contains("seen")) last = it; });
      if (last) { var d = $(".t-dot", last); tl.style.setProperty("--fill", (d.offsetTop + last.offsetTop + 9) + "px"); }
    }, { rootMargin: "0px 0px -40% 0px" });
    items.forEach(function (it) { tio.observe(it); });
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
