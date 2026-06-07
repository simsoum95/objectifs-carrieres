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
    b.innerHTML = '<p>Nous utilisons une <strong>mesure d\'audience anonyme</strong>, sans cookie publicitaire, pour améliorer le site. <a href="/confidentialite">En savoir plus</a>.</p><div class="consent__btns"><button class="consent__no" type="button">Refuser</button><button class="consent__ok" type="button">Accepter</button></div>';
    document.body.appendChild(b);
    requestAnimationFrame(function () { b.classList.add("in"); });
    function set(v, fn) { try { localStorage.setItem(KEY, v); } catch (e) {} fn && fn(); b.remove(); }
    b.querySelector(".consent__ok").addEventListener("click", function () { set("ok", loadAnalytics); });
    b.querySelector(".consent__no").addEventListener("click", function () { set("no"); });
  })();
})();
