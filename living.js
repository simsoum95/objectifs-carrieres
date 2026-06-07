/* =================================================================
   VIE PERMANENTE — Élysée Formations
   Le site ne cesse jamais de se faire : fil conducteur alimenté,
   réseau de formateurs qui pulse, particules de graphite, ciel vivant.
   Tous les réglages sont en tête de fichier.
   ================================================================= */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";
  const mk = (n, a = {}) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };

  const CFG = {
    dustCount: 18,
    threadMinWidth: 900,  // px : largeur mini pour afficher l'épine dorsale
    netNodes: 13,
    netLinkDist: 175,
  };

  /* 1 — NUAGES dans le ciel du hero */
  function clouds() {
    const sky = document.querySelector(".hero__sky");
    if (!sky || reduce) return;
    sky.style.overflow = "hidden";
    [[150, 64, "9%"], [96, 44, "20%"], [180, 78, "5%"]].forEach(([w, h, top], i) => {
      const c = document.createElement("div");
      c.className = "cloud";
      c.style.width = w + "px"; c.style.height = h + "px"; c.style.top = top;
      c.style.animationDuration = (54 + i * 8) + "s";
      c.style.animationDelay = (-i * 12) + "s";
      sky.appendChild(c);
    });
  }

  /* 2 — LUEUR qui repasse sur la façade (le dessin se retouche sans cesse) */
  function sheen() {
    const f = document.querySelector(".hero__facade");
    if (!f || reduce) return;
    f.appendChild(Object.assign(document.createElement("div"), { className: "facade-sheen" }));
  }

  /* 3 — PARTICULES de graphite & d'or, partout, en permanence */
  function dust() {
    if (reduce) return;
    const layer = document.createElement("div");
    layer.className = "dust-layer";
    for (let i = 0; i < CFG.dustCount; i++) {
      const d = document.createElement("div");
      d.className = "dust";
      d.style.left = (Math.random() * 100) + "%";
      d.style.top = (Math.random() * 100) + "%";
      const dur = 14 + Math.random() * 16;
      d.style.animationDuration = dur + "s";
      d.style.animationDelay = (-Math.random() * dur) + "s";
      const sc = 0.5 + Math.random() * 1.5;
      d.style.width = d.style.height = (sc * 3).toFixed(1) + "px";
      if (Math.random() > 0.55) { d.style.background = "var(--pencil)"; d.style.opacity = ".12"; }
      layer.appendChild(d);
    }
    document.body.appendChild(layer);
  }

  /* 4 — UNDERLINES croquis sous chaque titre de section (fil doré qui coule) */
  function underlines() {
    document.querySelectorAll(".section-head .h-section, .page-hero .display").forEach((h) => {
      if (h.querySelector(".sketch-ul")) return;
      const W = 200;
      const svg = mk("svg", { class: "sketch-ul", viewBox: `0 0 ${W} 12`, preserveAspectRatio: "none" });
      svg.style.width = "min(220px, 56%)";
      svg.style.height = "11px";
      const d = `M2 7 C ${W * 0.2} 3, ${W * 0.38} 11, ${W * 0.54} 6 S ${W * 0.84} 2.5, ${W - 2} 7`;
      svg.appendChild(mk("path", { d }));
      h.appendChild(svg);
    });
  }

  /* 5 — FIL CONDUCTEUR : épine dorsale qui relie toutes les sections,
         continuellement alimentée en énergie dorée. */
  let threadSvg = null;
  function buildThread() {
    const wide = window.innerWidth >= CFG.threadMinWidth;
    if (!wide) { if (threadSvg) { threadSvg.remove(); threadSvg = null; } return; }

    if (threadSvg) threadSvg.style.height = "0px";
    const docH = document.documentElement.scrollHeight;

    const pts = [];
    document.querySelectorAll("section, .site-footer").forEach((s) => {
      const r = s.getBoundingClientRect();
      pts.push(r.top + window.scrollY);
    });
    pts.sort((a, b) => a - b);
    if (!pts.length) return;

    if (!threadSvg) {
      threadSvg = mk("svg", { class: "thread-svg", "aria-hidden": "true" });
      Object.assign(threadSvg.style, {
        position: "absolute", top: "0", left: "0", width: "60px",
        zIndex: "5", pointerEvents: "none", overflow: "visible",
      });
      document.body.appendChild(threadSvg);
    }
    threadSvg.setAttribute("viewBox", `0 0 60 ${docH}`);
    threadSvg.setAttribute("preserveAspectRatio", "none");
    threadSvg.style.height = docH + "px";
    threadSvg.innerHTML = "";

    let d = "M 32 0", prevY = 0, prevX = 32;
    pts.forEach((y, i) => {
      const x = i % 2 === 0 ? 20 : 40;
      const my = (prevY + y) / 2;
      d += ` C ${prevX} ${my}, ${x} ${my}, ${x} ${y}`;
      prevY = y; prevX = x;
    });
    d += ` C ${prevX} ${(prevY + docH) / 2}, 32 ${(prevY + docH) / 2}, 32 ${docH}`;

    threadSvg.appendChild(mk("path", { d, fill: "none", stroke: "var(--line)", "stroke-width": "1.4", "vector-effect": "non-scaling-stroke" }));
    const flow = mk("path", { d, fill: "none", stroke: "var(--bordeaux)", "stroke-width": "1.6", "vector-effect": "non-scaling-stroke" });
    flow.setAttribute("class", "thread-flow");
    threadSvg.appendChild(flow);

    pts.forEach((y, i) => {
      const x = i % 2 === 0 ? 20 : 40;
      const c = mk("circle", { cx: x, cy: y, r: "3.4", fill: "var(--bordeaux)" });
      c.setAttribute("class", "thread-node");
      c.style.animationDelay = (i * 0.22) + "s";
      threadSvg.appendChild(c);
    });
  }

  /* 6 — RÉSEAU vivant : constellation de formateurs qui pulse et se relie. */
  function networks() {
    document.querySelectorAll('[data-living="net"]').forEach((host) => {
      if (host.querySelector(".net-svg")) return;
      if (getComputedStyle(host).position === "static") host.style.position = "relative";
      const W = 600, H = 420;
      const svg = mk("svg", { class: "net-svg", viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" });
      Object.assign(svg.style, { position: "absolute", inset: "0", width: "100%", height: "100%", zIndex: "0", pointerEvents: "none", opacity: ".55" });

      const nodes = [];
      for (let i = 0; i < CFG.netNodes; i++) nodes.push({ x: 26 + Math.random() * (W - 52), y: 26 + Math.random() * (H - 52) });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < CFG.netLinkDist) {
            const e = mk("line", { x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
            e.setAttribute("class", "net-edge");
            e.style.animationDuration = (3 + Math.random() * 4).toFixed(2) + "s";
            e.style.animationDelay = (-Math.random() * 5).toFixed(2) + "s";
            svg.appendChild(e);
          }
        }
      }
      nodes.forEach((n, i) => {
        const c = mk("circle", { cx: n.x, cy: n.y, r: (2.2 + Math.random() * 1.6).toFixed(1) });
        c.setAttribute("class", "net-node");
        c.style.animationDelay = (i * 0.35).toFixed(2) + "s";
        svg.appendChild(c);
      });

      host.insertBefore(svg, host.firstChild);
      [...host.children].forEach((ch) => {
        if (ch !== svg && getComputedStyle(ch).position === "static") ch.style.position = "relative";
      });
    });
  }

  /* — init + recalcul de l'épine dorsale — */
  function init() {
    clouds(); sheen(); underlines(); networks();
    buildThread();

    let t;
    const recompute = () => { clearTimeout(t); t = setTimeout(buildThread, 180); };
    window.addEventListener("resize", recompute, { passive: true });
    window.addEventListener("load", recompute);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(recompute);
    // l'apparition des sections change la hauteur du document
    setTimeout(buildThread, 1400);
    setTimeout(buildThread, 3200);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
