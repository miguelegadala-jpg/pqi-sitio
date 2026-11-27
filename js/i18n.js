/* Selector de idioma ES / EN.
   El español vive en el HTML. Cada texto traducible lleva data-i="clave" y su
   versión en inglés está aquí. Los atributos usan data-i-attr="aria-label:clave".
   Las claves t_* (subcategorías) las escribe build.py desde src/tabla.json. */
(function () {
  "use strict";
  var EN = {
    /* Títulos de página */
    home_title: "PQI · Industrial chemical products in Santo Domingo since 1973",
    inst_title: "Institutional solutions · Hygiene for hotels, hospitals and restaurants | PQI",
    ind_title: "Industrial solutions · Food, beverages, steam and wastewater | PQI",
    eq_title: "Equipment and services · Dosing, water pretreatment and ServSafe® | PQI",
    sos_title: "Sustainability · Investment, health and environment | PQI",
    about_title: "About PQI · History since 1973, culture, values and code of ethics",
    jobs_title: "Join the team · Careers at PQI",
    contact_title: "Contact and quotes · PQI Industrial Chemical Products",
    priv_title: "Privacy policy · PQI",

    /* Accesibilidad */
    a_skip: "Skip to content", a_nav: "Main", a_menu: "Menu", a_home: "PQI, go to home", a_logo: "PQI Industrial Chemical Products",
    a_logo_svg: "PQI logo", a_intro: "PQI, Complete solutions", a_open: "Open menu", a_close: "Close menu", a_legal: "Legal",
    a_wa: "Message us on WhatsApp", a_bg: "Background photos", a_ph1: "Photo 1", a_ph2: "Photo 2", a_ph3: "Photo 3",
    a_areas: "Areas of work", a_crumbs: "Breadcrumb", a_subcats: "Subcategories", a_certs: "Certifications",

    /* Header y footer */
    nav_inst: "Institutional", nav_ind: "Industrial", nav_eq: "Equipment", nav_sos: "Sustainability", nav_about: "About PQI",
    nav_jobs: "Join the team", nav_contact: "Contact", nav_quote: "Get a quote", b_call: "Call",
    nav_inst_l: "Institutional solutions", nav_ind_l: "Industrial solutions", nav_eq_l: "Equipment and services",
    f_about: "Complete hygiene, maintenance and water treatment solutions for the institutional and industrial sectors. Santo Domingo, since 1973.",
    f_sol: "Solutions", f_co: "Company", f_values: "Values and culture", f_sales: "Sales:", f_privacy: "Privacy policy", f_top: "Back to top",
    c_home: "Home", next: "Next", k_sol: "Solutions", b_back: "Back", b_quote_sector: "Get a quote for this sector",

    /* Inicio */
    intro_tag: "Complete solutions", intro_hint: "Scroll to enter",
    hero_kicker: "Industrial chemical products since 1973",
    hero_l1: "Healthier environments.", hero_l2: "More efficient processes.", hero_l3: "Since 1973.",
    hero_lede: "Comprehensive solutions for sanitation, cleaning, maintenance and industrial water treatment: specialized products, equipment and technical advice from one partner.",
    hero_cta1: "Request advice", hero_cta2: "See solutions",
    fact1: "years of experience", fact2: "active clients", fact3: "markets served",
    fact1_l: "Years of experience", fact2_l: "Active clients", fact3_l: "Markets served",
    strip1: "Hygiene and sanitation", strip2: "Water treatment", strip3: "Industrial maintenance", strip4: "Technical advice",
    ex_kicker: "Explore PQI", ex_title: "Solutions for those who care for communities and industrial environments.",
    ex_p: "We help preserve health and extend the life of your assets.",
    ex1: "Comprehensive hygiene and sanitation systems for hotels, hospitals, restaurants and laundries.",
    ex2: "Focused on protecting your assets, your brand and your customers' health.",
    ex3: "Everything you need to monitor and control your processes.",
    ex4: "A business built to last: investment, health and environment.",
    ex5: "Our history since 1973, culture, values and code of ethics.",
    since_label: "Over 50 years keeping a firm commitment to our clients.",
    since_p1: "At PQI we provide comprehensive solutions for sanitation, cleaning, maintenance and industrial water treatment, combining specialized products, equipment, tools and technical advice that support our clients' operating efficiency, safety and sustainability.",
    since_p2: "More than supplying products, we develop solutions that optimize processes, reduce operating costs, preserve resources and deliver sustainable, long-term value.",
    work_kicker: "How we work", work_title: "A program tailored to each operation.",
    work_p: "We support every client at every stage: from the visit to your plant to tracking the results.",
    st1: "On-site assessment", st1_p: "We visit your operation to understand your processes, your water, your equipment and your goals.",
    st2: "Technical proposal", st2_p: "We design a program with the products, equipment and procedures your operation needs.",
    st3: "Implementation", st3_p: "Installation, start-up and training for your staff.",
    st4: "Monitoring and control", st4_p: "Ongoing follow-up and technical support to sustain results over time.",
    tal_kicker: "We're looking for talent", tal_title: "Let's get to know each other.",
    tal_p1: "At PQI we believe talent is the key to building a more sustainable future. We look for people committed to innovation, excellence and teamwork.",
    tal_p2: "Join PQI and grow with a team that turns challenges into solutions.",
    alt_talent: "PQI team member reviewing work documents",
    cta_title: "What does your operation need?", cta_p: "Tell us about your plant, hotel, hospital or kitchen and we'll prepare a technical proposal.",

    /* Soluciones institucionales */
    inst_h1a: "Hygiene that protects", inst_h1b: "your reputation.",
    inst_lede: "Comprehensive solutions for the hotel, healthcare, food service and institutional sectors, where quality, efficiency and safety are essential.",
    k_ally: "A strategic partner", inst_lead_h: "We support you at every stage of your operation.",
    inst_lead_p1: "We understand the responsibility of managing facilities, protecting users' health, optimizing resources and preserving a brand's reputation.",
    inst_lead_p2: "That's why we work alongside our clients to offer products and services designed for each operation's specific needs, with training, technical support and ongoing follow-up.",
    k_sectors: "Sectors", inst_tabs_h: "Six sectors, one hygiene standard.",
    k_why: "What sets us apart", inst_why_h: "More than products: solutions that create value.",
    w1: "Innovative products", w1_p: "Developed with cutting-edge technology that improves efficiency, performance and sustainability.",
    w2: "Comprehensive solutions", w2_p: "Hygiene, cleaning, disinfection and maintenance for every institutional service.",
    w3: "Specialized advice", w3_p: "To find the best solutions for each client's goals and challenges.",
    w4: "Proven quality", w4_p: "Products and processes that deliver reliable, consistent results.",
    w5: "Resource optimization", w5_p: "Lower operating costs and more return on every investment.",
    w6: "Health and safety", w6_p: "Support to meet the highest hygiene and food-safety standards.",
    w7: "Brand protection", w7_p: "The trust of guests, patients, staff and consumers.",
    w8: "Ongoing support", w8_p: "Training, technical support and follow-up for the best performance.",
    w9: "Sustainable approach", w9_p: "Responsible practices that benefit your organization and the environment.",

    /* Soluciones industriales */
    ind_h1a: "Efficient processes,", ind_h1b: "protected assets.",
    ind_lede: "Comprehensive solutions to optimize industrial processes and ensure the safety, reliability and sustainability of your operation.",
    k_approach: "Our approach", ind_lead_h: "Prevention, resource optimization and continuous improvement.",
    ind_lead_p1: "We combine technical expertise, high-performance products, cutting-edge technology and specialized support to design programs tailored to each client and each production process.",
    ind_lead_p2: "We build long-term partnerships with technical advice, continuous monitoring and solutions that raise productivity and promote a more profitable, environmentally responsible operation.",
    ind_tabs_h: "Where water quality, hygiene and reliability are critical.",
    k_results: "The results we aim for", ind_why_h: "Programs you can see in the plant and in the numbers.",
    r1: "Lower operating costs", r1_p: "We optimize the use of water, energy and chemicals.",
    r2: "Protected assets", r2_p: "We prevent wear, corrosion and deposit build-up.",
    r3: "Standards met", r3_p: "Quality, food safety, safety and sustainability in every process.",

    /* Equipos y servicios */
    eq_h1a: "Precise control", eq_h1b: "of every process.",
    eq_lede: "Technology, equipment and services that complement our chemical solutions and ensure precise control of your operation's critical variables.",
    k_portfolio: "Portfolio", eq_cards_h: "Engineering, automation and technical support.",
    eq_cards_p: "More than supplying equipment, we design complete solutions and support you at every stage.",
    eq1: "Process control, dosing and automation",
    eq1_p: "Application, dosing, automation, control and monitoring to optimize chemical use and ensure consistent performance at every stage of the operation.",
    eq1_alt: "Process control and monitoring equipment",
    eq2: "Water pretreatment systems",
    eq2_p: "We design, supply and implement systems that condition different water sources to meet the technical specifications of each industrial process.",
    eq2_alt: "Water treatment system",
    eq3: "ServSafe® certifications",
    eq3_p: "As authorized instructors, we offer the National Restaurant Association's ServSafe® food safety and hygiene training. <span class=\"pending\">[PENDING] course calendar</span>",
    eq3_alt: "PQI training session",
    k_includes: "What's included", eq_incl_h: "From engineering to support, we're with you.",
    i1: "Application engineering", i1_p: "Solutions tailored to each client's needs.",
    i2: "Installation and start-up", i2_p: "Reliable, safe systems from day one.",
    i3: "Training", i3_p: "Your staff ready to operate every piece of equipment.",
    i4: "Maintenance", i4_p: "To get the most out of your equipment.",
    i5: "Continuous monitoring", i5_p: "Tracking of operating parameters.",
    i6: "Specialized technical support", i6_p: "A more efficient, safer operation that keeps improving.",
    eq_cta: "Need to automate your dosing or improve your water?",

    /* Sostenibilidad */
    sos_kicker: "PQI is sustainability", sos_h1a: "A business built", sos_h1b: "for the long term.",
    sos_lede: "Sustainability is a core commitment of our management and guides every decision we make.",
    k_pillars: "Three pillars", pillars_h: "Investment, health and environment.",
    p1: "Investment", p1_s: "Protected assets",
    p1_p: "We protect your capital assets with advanced solutions and techniques that keep surfaces sanitized and prevent wear, corrosion and scale.",
    p2: "Health", p2_s: "Protected people",
    p2_p: "We design hygiene programs that preserve the health of your staff and customers and keep environments safe and productive.",
    p3: "Environment", p3_s: "Resources cared for",
    p3_p: "We reduce environmental impact through the safe, responsible use of our products, container reuse and lower consumption of water, energy and other scarce resources.",
    k_commit: "Our commitment", sos_lead_h: "Business success and the environment move forward together.",
    sos_lead_p1: "We select lower-impact products and materials, recycle containers, save water and implement processes focused on efficiency, innovation and continuous improvement.",
    sos_lead_p2: "We work with our clients to optimize the use of natural resources, reduce their environmental footprint and develop solutions that drive more sustainable growth.",
    alt_plant: "Aerial view of a water treatment plant",
    rsc: "Social responsibility", rsc_p: "A financially, environmentally and socially sustainable company that meets today's needs without compromising tomorrow's.",
    intg: "Integration", intg_p: "We aim to be the supplier of choice, creating jobs and momentum in local communities, and development through education and personal growth.",
    alt_rsc: "PQI social responsibility", alt_int: "Community integration",

    /* Conoce PQI */
    about_kicker: "Our history", about_h1a: "A commitment", about_h1b: "since 1973.",
    about_lede: "Dedicated service from every team member, constant innovation and advanced technology for those who manage communities and industrial environments.",
    k_culture: "Organizational culture", culture_h: "Transparency, responsibility and integrity in every relationship.",
    vision: "Vision", vision_p: "To be our clients' partners through leadership in innovation and the development of solutions for hygiene and maintenance professionals, helping preserve health and extend the life of industrial assets.",
    mision: "Mission", mision_p: "Always present wherever our clients are, with solutions for professionals in hygiene and industrial cleaning, maintenance and water treatment.",
    calidad: "Quality policy", calidad_p: "To keep an innovative offering grounded in a philosophy of continuous improvement based on quality controls, focused on stable results and on securing the supply of our products and services.",
    k_values: "Our values", values_h: "Four values that guide every action.",
    v1: "Responsibility", v2: "Integrity", v3: "Commitment", v4: "Harmony",
    k_ethics: "Code of ethics", ethics_h: "The guidelines our team follows.",
    ethics_p: "Our operations are based on principles of integrity, responsibility and transparency. Download the official document to learn the values and commitments that guide our relationships with clients, suppliers and employees.",
    ethics_btn: "Download Code of Ethics (PDF)",
    cert2: "Environmental Certification (MIMARENA)", cert3: "Good Manufacturing Practices (MSP)", cert4: "Industrial Qualification (PROINDUSTRIA)", cert5: "NSF certifications",
    k_timeline: "Timeline", tl_h: "50 years growing with our clients.",
    tl1_d: "June 1973", tl1: "Founding: the dream of creating a center of excellence in chemical specialties to optimize industrial and institutional processes.",
    tl2_d: "September 1974", tl2: "Analytical center begins operations.",
    tl3_d: "August 1980", tl3: "Plant opens on Isabel Aguiar street, Santo Domingo.",
    tl4_d: "June 1985", tl4: "Expansion begins in Herrera Sur, Santo Domingo.",
    tl5_d: "October 1994", tl5: "Functional reorganization of specialties and start of the research project.",
    tl6_d: "September 2001", tl6: "Herrera Sur site authorized.",
    tl7_d: "January 2008", tl7: "Wastewater treatment unit established.",
    tl8_d: "June 2019", tl8: "Digitalization and sustainability project.",
    tl9: "50% more installed capacity.", tl10: "50 years keeping a firm commitment to our clients.",
    alt_1980: "PQI plant in 1980",

    /* Empleos */
    jobs_h1a: "Grow with a team that", jobs_h1b: "turns challenges into solutions.",
    jobs_lede: "We're looking for genuine people with the courage to take risks, who understand that making a difference takes passion, patience and persistence.",
    jobs_cta: "Send my CV", k_why_pqi: "Why PQI", ben_h: "An organization that values its people.",
    ben_p: "Our values, responsibility, integrity, commitment and harmony, reflect the culture we share.",
    b1: "Professional growth", b1_p: "Grow within a company with over 50 years in the market.",
    b2: "Teamwork", b2_p: "Colleagues committed to excellence and service.",
    b3: "Continuous improvement", b3_p: "Constant innovation in products, processes and technology.",
    b4: "Positive impact", b4_p: "Cleaner, safer and more productive environments in the industries and communities we serve.",
    ben_pending: "Specific benefits (insurance, schedule, training) to be confirmed with Human Resources.",
    k_open: "Openings", open_h: "Open positions",
    open_pending: "List of openings to be confirmed. In the meantime, send us your CV and we'll reach out when a position fits your profile.",
    k_apply: "Work with us", cv_h: "Share your details and your résumé.",
    cv_p: "If you'd like to be part of an organization that values professional growth, teamwork and continuous improvement, fill out the form. Thank you for your interest.",
    alt_building: "PQI facilities in Santo Domingo",
    cv_form_h: "Job application", cv_last: "Last name", cv_area: "Area of interest (optional)", cv_file: "Résumé (PDF or Word)",
    cv_note: "When you submit, your email opens with your details ready; attach your résumé there.",
    cv_send: "Send application", cv_ok: "Thanks for your interest!",
    cv_ok_p: "Your email opened with the application. Attach your résumé and send it. If it didn't open, use the button.",
    cv_open: "Open email",
    cv_mail_intro: "Hello, I'd like to join the PQI team.", cv_area_s: "Area of interest", cv_attach: "My résumé is attached.", cv_subject: "Job application",

    /* Contacto y formularios */
    k_contact: "Contact us", contact_h1a: "We're here", contact_h1b: "to help.",
    contact_p: "Tell us what your operation needs and we'll get back to you shortly.",
    c_addr: "Address, open in Google Maps", c_phone: "Main line", c_mail: "Write to us", c_sales: "Sales department",
    q_h: "Request a quote", q_name: "Name", q_company: "Company", q_phone: "Phone", q_sector: "Sector", q_mail: "Email",
    q_need: "What does your operation need?", q_choose: "Select…",
    s1: "Hospitality", s2: "Healthcare", s3: "Food", s4: "Beverages", s5: "Industry", s6: "Other",
    q_note: "When you submit, a WhatsApp message is prepared with your details.", q_send: "Send via WhatsApp",
    q_ok: "Thank you! Your message is ready.", q_ok_p: "WhatsApp opened with your request. If it didn't open, use the button.", q_open: "Open WhatsApp",
    q_wa_intro: "Hello PQI, I'd like a quote.", q_need_s: "Need",
    e_req: "This field is required.", e_mail: "Enter a valid email.", e_tel: "Enter a valid phone number.", e_sector: "Select a sector.", e_file: "Select your résumé.",

    /* Privacidad */
    priv_pending: "Legal text to be confirmed with PQI. In the meantime, you can read the current policy on the existing site.",
    priv_btn: "See current policy", priv_contact: "For any questions about your personal data, write to info@pqi.com.do.",

    /* v2 */
    a_close_x: "Close", a_filter: "Filter solutions", alt_eq: "Dosing and control equipment", alt_fut: "Green leaf over clean water",
    alt_h1: "Treated water in motion", alt_h2: "Industrial plant", alt_h3: "Water treatment plant",
    alt_ind: "Industrial plant in operation", alt_inst: "Clean, sanitized institutional area",
    b_more: "Learn more", b_quote: "Request a quote", b_sos: "Our sustainable vision", brand_sub: "Industrial Chemical Products",
    c_addr_s: "Address", cta_label: "Let's talk", f_all: "All", f_social: "Social", fw_a: "Complete", fw_b: "solutions.",
    grp_inst: "Institutional", grp_ind: "Industrial", grp_eq: "Equipment and services",
    m_jun: "June", m_sep: "September", m_ago: "August", m_oct: "October", m_ene: "January",
    man_label: "Our commitment",
    man_a: "More than supplying products, we develop solutions that optimize processes, reduce operating costs, preserve resources and deliver",
    man_b: "sustainable, long-term value.",
    menu: "Menu", nav_home: "Home", ops_label: "What do you operate?", pend_servsafe: "ServSafe® course calendar.",
    tb_label: "Solutions table", tb_h: "Every operation has its formula.", tb_note: "Tap an element to see the solution.",
    tl_hint: "Swipe to explore", work_p_s: "From the visit to your plant to follow-up",

    /* Soluciones (generado por build.py) */
    /*GEN*/
    t_hoteles: "Hotels and hospitality",
    t_hoteles_p: "Comprehensive hygiene, cleaning and sanitation solutions built for the highest quality, safety and food-safety standards in hospitality. They streamline cleaning processes, protect the health of guests and staff, and extend the life of your facilities.",
    t_hoteles_alt: "Clean, tidy hotel room",
    t_hospitales: "Hospitals and clinics",
    t_hospitales_p: "Rigorous protocols, high-performance products and trained staff to keep hospital environments properly sanitized and protect patients, healthcare professionals and visitors.",
    t_hospitales_alt: "Hospital hallway",
    t_textil: "Textile care",
    t_textil_p: "Solutions for commercial, industrial and hospital laundries that optimize every stage of the wash process, improve operating performance and help reduce costs.",
    t_textil_alt: "Commercial laundry",
    t_restaurantes: "Restaurants and catering",
    t_restaurantes_p: "Comprehensive hygiene and sanitation programs that support food safety at every stage, from source to point of consumption, protecting consumers' health and your organization's reputation.",
    t_restaurantes_alt: "Professional kitchen",
    t_facilidades: "Facility maintenance",
    t_facilidades_p: "Comprehensive cleaning and maintenance programs that combine high performance, easy implementation and responsible use of resources.",
    t_facilidades_alt: "Facility cleaning",
    t_aguas_recreativas: "Recreational and drinking water",
    t_aguas_recreativas_p: "Tailored programs for pools, drinking water networks and other applications that ensure optimal sanitary conditions, protect users' health and keep systems running efficiently.",
    t_aguas_recreativas_alt: "Pool with treated water",
    t_alimentos: "Food industry",
    t_alimentos_p: "Comprehensive cleaning and sanitation programs that keep equipment, surfaces and facilities in optimal condition to ensure product safety without compromising productivity.",
    t_alimentos_alt: "Food production line",
    t_bebidas: "Beverages",
    t_bebidas_p: "Tailored solutions for safe, efficient, high-quality processes, from raw material preparation to the cleaning and maintenance of equipment and facilities.",
    t_bebidas_alt: "Beverage bottling plant",
    t_carnicos: "Meat and poultry",
    t_carnicos_p: "Solutions that strengthen biosecurity, hygiene and food safety at every stage of the process, with microbiological control and effective removal of organic residues.",
    t_carnicos_alt: "Poultry farm",
    t_mant_industrial: "Industrial maintenance",
    t_mant_industrial_p: "Cleaning, restoration, protection and maintenance programs for industrial assets that improve operating efficiency and extend equipment life.",
    t_mant_industrial_alt: "Industrial equipment maintenance",
    t_vapor: "Steam generation",
    t_vapor_p: "Water treatment and conditioning to prevent scale, corrosion and deposits in boilers, optimizing thermal efficiency and the reliability of your steam systems.",
    t_vapor_alt: "Industrial boiler",
    t_enfriamiento: "Cooling systems",
    t_enfriamiento_p: "Tailored treatment programs for cooling systems that optimize equipment performance, lower operating costs and promote water savings.",
    t_enfriamiento_alt: "Cooling tower",
    t_residuales: "Wastewater treatment",
    t_residuales_p: "Comprehensive effluent treatment solutions that improve environmental performance, optimize resources and reaffirm your commitment to communities and the environment.",
    t_residuales_alt: "Wastewater treatment plant",
    t_control: "Control, dosing and automation",
    t_control_p: "Application, dosing, automation, control and monitoring to optimize chemical use and ensure consistent performance at every stage of the operation.",
    t_control_alt: "Process control and monitoring equipment",
    t_pretratamiento: "Water pretreatment",
    t_pretratamiento_p: "We design, supply and implement systems that condition different water sources to meet the technical specifications of each industrial process.",
    t_pretratamiento_alt: "Water treatment system",
    t_servsafe: "ServSafe® certifications",
    t_servsafe_p: "As authorized instructors, we offer the National Restaurant Association's ServSafe® food safety and hygiene training.",
    t_servsafe_alt: "PQI training session",
    /*END GEN*/
  };

  var KEY = "pqi-lang", lang = "es";
  var store = {
    get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  // Para los mensajes que arma app.js (formularios, menú)
  window.PQI_T = function (k) { return lang === "en" ? EN[k] : null; };

  function apply(l) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-i]"), function (el) {
      var k = el.getAttribute("data-i");
      if (!el.hasAttribute("data-es")) el.setAttribute("data-es", el.innerHTML);
      if (l === "en" && EN[k] != null) el.innerHTML = EN[k];
      else el.innerHTML = el.getAttribute("data-es");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i-attr]"), function (el) {
      el.getAttribute("data-i-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"), a = p[0], k = p[1], store = "data-es-" + a;
        if (!el.hasAttribute(store)) el.setAttribute(store, el.getAttribute(a) || "");
        el.setAttribute(a, l === "en" && EN[k] != null ? EN[k] : el.getAttribute(store));
      });
    });
  }
  function paint() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-lang-toggle]"), function (b) {
      b.textContent = lang === "en" ? "ES" : "EN";
      b.setAttribute("aria-label", lang === "en" ? "Cambiar a español" : "Switch to English");
      b.setAttribute("lang", lang === "en" ? "es" : "en");
    });
  }
  function setLang(l, save) {
    if (l === lang) { paint(); return; }
    lang = l;
    document.documentElement.lang = l;
    apply(l);
    var mt = document.querySelector('meta[property="og:locale"]'); if (mt) mt.setAttribute("content", l === "en" ? "en_US" : "es_DO");
    if (save) store.set(l);
    paint();
    document.dispatchEvent(new CustomEvent("pqi:lang", { detail: l }));
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-lang-toggle]");
    if (!b) return;
    var root = document.documentElement, next = lang === "en" ? "es" : "en";
    if (root.classList.contains("anim")) {
      root.classList.add("lang-swap");
      setTimeout(function () { setLang(next, true); root.classList.remove("lang-swap"); }, 200);
    } else setLang(next, true);
  });
  if (store.get() === "en") setLang("en", false); else paint();
})();
