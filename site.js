/* =================================================================
   COMPORTEMENT DU SITE — header, menu mobile, révélation au scroll.
   Les sections "prennent vie" quand elles entrent dans le viewport.
   ================================================================= */
(function () {
  // —— Header : devient solide au scroll ——
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("solid", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // —— Menu mobile ——
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // —— Révélation au scroll ——
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealables = document.querySelectorAll(".reveal");
  if (reduce) {
    revealables.forEach((n) => n.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((n) => io.observe(n));
  }

  // —— Filets ".rule" qui se tracent quand visibles ——
  // (gérés par la classe .in héritée d'un parent .reveal, sinon observés)
  const rules = document.querySelectorAll(".rule:not(.reveal .rule)");
  if (!reduce && rules.length) {
    const ruleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.w || "64px";
            ruleIO.unobserve(e.target);
          }
        });
      },
      { threshold: 1 }
    );
    rules.forEach((r) => ruleIO.observe(r));
  } else {
    rules.forEach((r) => (r.style.width = r.dataset.w || "64px"));
  }

  // —— Compteurs animés ——
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const animate = (node) => {
      const target = parseFloat(node.dataset.count);
      const suffix = node.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        node.firstChild ? (node.childNodes[0].nodeValue = val.toLocaleString("fr-FR")) : (node.textContent = val);
        if (p < 1) requestAnimationFrame(step);
        else node.childNodes[0].nodeValue = target.toLocaleString("fr-FR");
      };
      requestAnimationFrame(step);
    };
    const cIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!reduce) animate(e.target);
            else e.target.textContent = parseFloat(e.target.dataset.count).toLocaleString("fr-FR");
            cIO.unobserve(e.target);
          }
        });
      },
      { threshold: 1 }
    );
    counters.forEach((c) => cIO.observe(c));
  }

  // —— Accessibilité & conversion ——
  // Visuels décoratifs : masqués aux lecteurs d'écran
  document.querySelectorAll("[data-viz], [data-scene], .motif, .hero__facade, .hero__sky, .hero__scrim, .dust-layer, .sketch-ul").forEach((el) => el.setAttribute("aria-hidden", "true"));

  // Lien d'évitement clavier
  const mainEl = document.querySelector("main, section");
  if (mainEl && !document.querySelector(".skip-link")) {
    if (!mainEl.id) mainEl.id = "contenu";
    mainEl.setAttribute("tabindex", "-1");
    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#" + mainEl.id;
    skip.textContent = "Aller au contenu";
    document.body.insertBefore(skip, document.body.firstChild);
  }

  // CTA flottant sur mobile (l'en-tête masque son bouton sous 720px)
  if (!document.querySelector(".cta-float") && !/\/contact/.test(location.pathname)) {
    const cta = document.createElement("a");
    cta.className = "cta-float";
    cta.href = "/contact";
    cta.innerHTML = 'Prendre rendez-vous <span class="arr" aria-hidden="true">→</span>';
    document.body.appendChild(cta);
  }

  // —— Consentement & mesure d'audience anonyme (cookieless, Vercel) ——
  (function consent() {
    var KEY = "oc-consent", choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    function loadAnalytics() {
      if (window.__ocA) return; window.__ocA = true;
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      var s = document.createElement("script"); s.defer = true; s.src = "/_vercel/insights/script.js"; document.head.appendChild(s);
    }
    if (choice === "ok") { loadAnalytics(); return; }
    if (choice === "no") return;
    var b = document.createElement("div");
    b.className = "consent"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Mesure d'audience");
    b.innerHTML = '<p>Nous utilisons une <strong>mesure d\'audience anonyme</strong>, sans cookie publicitaire, pour am\u00e9liorer le site. <a href="/confidentialite">En savoir plus</a>.</p><div class="consent__btns"><button class="consent__no" type="button">Refuser</button><button class="consent__ok" type="button">Accepter</button></div>';
    document.body.appendChild(b);
    requestAnimationFrame(function () { b.classList.add("in"); });
    function set(v, fn) { try { localStorage.setItem(KEY, v); } catch (e) {} fn && fn(); b.remove(); }
    b.querySelector(".consent__ok").addEventListener("click", function () { set("ok", loadAnalytics); });
    b.querySelector(".consent__no").addEventListener("click", function () { set("no"); });
  })();
})();

/* ==================================================================
   DÉFILEMENT PLEIN-ÉCRAN — une section à la fois (ordinateur).
   La molette / le clavier sont interceptés : on anime vers EXACTEMENT
   la section voisine, avec verrou pendant l'animation + filtre
   d'inertie. Résultat : une section maximum par geste, jamais à
   mi-section, avec une animation fluide. Inactif sur mobile (<1025px)
   et si l'utilisateur préfère les animations réduites.
   ================================================================== */
(function fullpage() {
  var mqWide = window.matchMedia("(min-width: 1025px)");
  var mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var SEL = ".xhero, .band, .split, .site-footer";
  var sections = [];
  var active = false, animating = false, idx = 0, lastTs = -100000, safety = null;
  var DUR = 760, GAP = 70;

  function collect() {
    sections = [];
    var all = document.querySelectorAll(SEL);
    for (var i = 0; i < all.length; i++) {
      if (all[i].offsetParent !== null) sections.push(all[i]);
    }
  }
  function nearest() {
    var y = window.pageYOffset, best = 0, bd = Infinity;
    for (var i = 0; i < sections.length; i++) {
      var d = Math.abs(sections[i].offsetTop - y);
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function tweenTo(i) {
    idx = i;
    var from = window.pageYOffset, dist = sections[i].offsetTop - from;
    if (Math.abs(dist) < 2) return;
    animating = true;
    if (safety) clearTimeout(safety);
    safety = setTimeout(function () { animating = false; }, DUR + 260); // filet anti-blocage
    var t0 = null;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = (ts - t0) / DUR; if (p > 1) p = 1;
      window.scrollTo(0, Math.round(from + dist * ease(p)));
      if (p < 1) requestAnimationFrame(frame);
      else { clearTimeout(safety); setTimeout(function () { animating = false; }, 70); }
    }
    requestAnimationFrame(frame);
  }
  function go(dir) {
    idx = nearest();
    var ni = idx + dir;
    if (ni < 0) ni = 0;
    if (ni > sections.length - 1) ni = sections.length - 1;
    if (ni !== idx) tweenTo(ni);
  }
  function onWheel(e) {
    e.preventDefault();
    var ts = e.timeStamp || 0;
    var fresh = (ts - lastTs) > GAP;   // une vraie pause = nouveau geste
    lastTs = ts;
    if (animating) return;
    if (Math.abs(e.deltaY) < 6) return;
    if (!fresh) return;                // flux d'inertie continu = ignoré
    go(e.deltaY > 0 ? 1 : -1);
  }
  function onKey(e) {
    if (animating) return;
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    var k = e.key;
    if (k === "ArrowDown" || k === "PageDown" || (k === " " && !e.shiftKey)) { e.preventDefault(); go(1); }
    else if (k === "ArrowUp" || k === "PageUp" || (k === " " && e.shiftKey)) { e.preventDefault(); go(-1); }
    else if (k === "Home") { e.preventDefault(); tweenTo(0); }
    else if (k === "End") { e.preventDefault(); tweenTo(sections.length - 1); }
  }
  function onClick(e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.length < 2) return;
    var tgt = document.querySelector(href);
    if (!tgt) return;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] === tgt || sections[i].contains(tgt)) { e.preventDefault(); tweenTo(i); return; }
    }
  }
  function enable() {
    collect();
    if (sections.length < 2) { disable(); return; }
    if (active) return;
    active = true;
    document.documentElement.style.scrollSnapType = "none";
    document.documentElement.setAttribute("data-fullpage", "on");
    idx = nearest();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick, true);
  }
  function disable() {
    if (!active) return;
    active = false; animating = false;
    document.documentElement.style.scrollSnapType = "";
    document.documentElement.removeAttribute("data-fullpage");
    window.removeEventListener("wheel", onWheel, { passive: false });
    window.removeEventListener("keydown", onKey);
    document.removeEventListener("click", onClick, true);
  }
  function sync() { if (mqWide.matches && !mqMotion.matches) enable(); else disable(); }
  function bind(mq, fn) { mq.addEventListener ? mq.addEventListener("change", fn) : mq.addListener(fn); }
  bind(mqWide, sync); bind(mqMotion, sync);
  var rT;
  window.addEventListener("resize", function () { clearTimeout(rT); rT = setTimeout(function () { if (active) collect(); }, 200); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", sync); else sync();
})();
