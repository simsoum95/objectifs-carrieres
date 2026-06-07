/* =================================================================
   VISUALISATIONS DE SECTION — Objectifs Carrières
   Une vraie visualisation animée EN CONTINU par section, différente
   selon le propos. Rien de figé, rien d'« icône » : des systèmes qui
   vivent (canvas + requestAnimationFrame).
     transmission · domains · network · growth · funnel · pulse
     radar · equalizer · gauge · process · francemap
   Couleurs/vitesses réglables en tête de fichier.
   ================================================================= */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TAU = Math.PI * 2;
  /* Palette Objectifs Carrières : vieux-rose + aubergine + rose-gold + mauve */
  const C = { ink: "#2D2230", bordeaux: "#A8466A", bordeaux2: "#C25E80", blue: "#8C6E94", paper: "#FBF6F1", rose: "#E6A9BD", roseB: "#C49ACB" };
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  const pal = (dark) => dark
    ? { stroke: "#EBD9E0", faint: "rgba(255,255,255,.16)", a: C.rose, b: C.roseB, paper: "#3B2140" }
    : { stroke: C.ink, faint: "rgba(45,34,48,.13)", a: C.bordeaux, b: C.blue, paper: C.paper };

  function makeCanvas(host) {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0;
    function resize() {
      const r = host.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(host);
    else window.addEventListener("resize", resize);
    return { ctx, get W() { return W; }, get H() { return H; } };
  }

  const R = {
    /* — transmission du savoir : flux de particules entre deux foyers — */
    transmission: {
      init(st) { st.p = Array.from({ length: 20 }, () => ({ p: Math.random(), off: (Math.random() - .5), sp: .25 + Math.random() * .45 })); },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, A = { x: W * .18, y: H * .5 }, B = { x: W * .82, y: H * .5 };
        ctx.strokeStyle = P.faint; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
        st.p.forEach((pp) => {
          pp.p += pp.sp * .01; if (pp.p > 1) pp.p -= 1;
          const x = A.x + (B.x - A.x) * pp.p, y = A.y + Math.sin(pp.p * Math.PI) * pp.off * H * .55;
          ctx.fillStyle = rgba(P.a, (.25 + .6 * Math.sin(pp.p * Math.PI)) * intro);
          ctx.beginPath(); ctx.arc(x, y, 2, 0, TAU); ctx.fill();
        });
        [A, B].forEach((Q, i) => {
          const r = (8 + Math.sin(t * 2 + i) * 1.2) * intro, col = i ? P.b : P.a;
          ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 10;
          ctx.beginPath(); ctx.arc(Q.x, Q.y, Math.max(.1, r), 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          ctx.strokeStyle = P.paper; ctx.lineWidth = 1.5; ctx.stroke();
          for (let k = 0; k < 4; k++) { const a = t * (i ? -.6 : .6) + k / 4 * TAU; ctx.fillStyle = rgba(col, .5); ctx.beginPath(); ctx.arc(Q.x + Math.cos(a) * r * 1.9, Q.y + Math.sin(a) * r * 1.9, 1.6, 0, TAU); ctx.fill(); }
        });
      },
    },

    /* — domaines d'expertise : système en orbite — */
    domains: {
      init(st) { st.n = 4; },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, cx = W / 2, cy = H / 2, Ra = Math.min(W, H) * .33 * intro;
        ctx.strokeStyle = P.faint; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, Ra, 0, TAU); ctx.stroke();
        ctx.fillStyle = P.a; ctx.shadowColor = P.a; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(cx, cy, Math.max(2, Ra * .15), 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
        for (let i = 0; i < st.n; i++) {
          const a = t * .5 + i / st.n * TAU, x = cx + Math.cos(a) * Ra, y = cy + Math.sin(a) * Ra;
          ctx.strokeStyle = rgba(P.b, .4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
          const r = (5 + Math.sin(t * 2 + i) * 1.2) * intro; ctx.fillStyle = i % 2 ? P.b : P.a;
          ctx.beginPath(); ctx.arc(x, y, Math.max(.1, r), 0, TAU); ctx.fill(); ctx.strokeStyle = P.paper; ctx.lineWidth = 1.4; ctx.stroke();
        }
      },
    },

    /* — réseau : constellation qui dérive + signaux — */
    network: {
      init(st, W, H) {
        const pad = Math.min(W, H) * .16, n = 8; st.pad = pad; st.nodes = [];
        for (let i = 0; i < n; i++) st.nodes.push({ x: pad + Math.random() * (W - 2 * pad), y: pad + Math.random() * (H - 2 * pad), vx: (Math.random() - .5) * 11, vy: (Math.random() - .5) * 11, r: 4 + Math.random() * 3.5, ph: Math.random() * TAU });
        const seen = new Set(); st.edges = [];
        for (let i = 0; i < n; i++) { const d = st.nodes.map((m, j) => ({ j, dist: Math.hypot(m.x - st.nodes[i].x, m.y - st.nodes[i].y) })).filter((o) => o.j !== i).sort((a, b) => a.dist - b.dist); [d[0].j, d[1].j].forEach((j) => { const k = i < j ? i + "-" + j : j + "-" + i; if (!seen.has(k)) { seen.add(k); st.edges.push([i, j]); } }); }
        st.parts = st.edges.map(() => ({ p: Math.random(), sp: .12 + Math.random() * .22 })); st.last = performance.now();
      },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, pad = st.pad, now = performance.now(), dt = Math.min((now - st.last) / 1000, .05); st.last = now;
        st.nodes.forEach((nd) => { nd.x += nd.vx * dt; nd.y += nd.vy * dt; if (nd.x < pad) { nd.x = pad; nd.vx *= -1; } if (nd.x > W - pad) { nd.x = W - pad; nd.vx *= -1; } if (nd.y < pad) { nd.y = pad; nd.vy *= -1; } if (nd.y > H - pad) { nd.y = H - pad; nd.vy *= -1; } });
        ctx.lineWidth = 1; ctx.strokeStyle = P.faint; st.edges.forEach(([a, b]) => { const A = st.nodes[a], B = st.nodes[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); });
        st.edges.forEach(([a, b], i) => { const A = st.nodes[a], B = st.nodes[b], pt = st.parts[i]; pt.p += pt.sp * dt; if (pt.p > 1) pt.p -= 1; ctx.fillStyle = rgba(P.a, .85 * intro); ctx.beginPath(); ctx.arc(A.x + (B.x - A.x) * pt.p, A.y + (B.y - A.y) * pt.p, 2, 0, TAU); ctx.fill(); });
        st.nodes.forEach((nd) => { const r = Math.max(.1, (nd.r + Math.sin(t * 2 + nd.ph)) * intro); ctx.fillStyle = P.a; ctx.shadowColor = rgba(P.a, .5); ctx.shadowBlur = 7; ctx.beginPath(); ctx.arc(nd.x, nd.y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = P.paper; ctx.lineWidth = 1.4; ctx.stroke(); });
      },
    },

    /* — montée en compétences : barres qui croissent et respirent — */
    growth: {
      init(st) { st.n = 7; },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, n = st.n, m = W * .12, gap = (W - 2 * m) / n, bw = gap * .56, base = H * .86;
        ctx.strokeStyle = P.faint; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(m, base); ctx.lineTo(W - m, base); ctx.stroke();
        for (let i = 0; i < n; i++) {
          const x = m + gap * i + gap * .22, trend = .3 + .62 * (i / (n - 1));
          const h = H * .62 * trend * (.74 + .26 * Math.sin(t * 1.4 + i * .7)) * intro;
          ctx.globalAlpha = .45 + .5 * (i / (n - 1)); ctx.fillStyle = i === n - 1 ? P.a : P.b; ctx.fillRect(x, base - h, bw, h); ctx.globalAlpha = 1;
          ctx.fillStyle = P.a; ctx.beginPath(); ctx.arc(x + bw / 2, base - h, 2.4, 0, TAU); ctx.fill();
        }
      },
    },

    /* — financement : entonnoir, particules qui descendent — */
    funnel: {
      init(st) { st.p = Array.from({ length: 30 }, () => ({ x: Math.random(), y: Math.random(), v: .25 + Math.random() * .55 })); },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, cx = W / 2, topY = H * .12, neckY = H * .58, botY = H * .86, topHalf = W * .34, neckHalf = W * .06;
        ctx.strokeStyle = P.stroke; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx - topHalf, topY); ctx.lineTo(cx - neckHalf, neckY); ctx.lineTo(cx - neckHalf, botY); ctx.moveTo(cx + topHalf, topY); ctx.lineTo(cx + neckHalf, neckY); ctx.lineTo(cx + neckHalf, botY); ctx.stroke();
        st.p.forEach((p) => {
          p.y += p.v * .01; if (p.y > 1) { p.y = 0; p.x = Math.random(); }
          const yy = topY + (botY - topY) * p.y; let half; if (yy < neckY) { half = topHalf + (neckHalf - topHalf) * ((yy - topY) / (neckY - topY)); } else half = neckHalf;
          ctx.fillStyle = rgba(P.a, .85 * intro); ctx.beginPath(); ctx.arc(cx + (p.x * 2 - 1) * half * .8, yy, 2, 0, TAU); ctx.fill();
        });
        const poolH = H * .1 * (Math.sin(t * .6) * .5 + .5); ctx.fillStyle = rgba(P.a, .35 * intro); ctx.fillRect(cx - neckHalf, botY - poolH, neckHalf * 2, poolH);
      },
    },

    /* — l'humain : électrocardiogramme — */
    pulse: {
      frame(g) {
        const { ctx, W, H, t, intro, P } = g, mid = H * .5;
        ctx.strokeStyle = P.faint; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();
        const f = (x) => { const ph = (x / W) * 5 - t * 1.5; const s = ((ph % 2) + 2) % 2; let v = Math.sin(ph * 2) * .05; v += Math.exp(-Math.pow((s - 1) / .05, 2)) * .85 - Math.exp(-Math.pow((s - .9) / .04, 2)) * .28; return v; };
        ctx.beginPath(); for (let x = 0; x <= W; x += 2) { const y = mid - f(x) * H * .4 * intro; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.strokeStyle = P.a; ctx.lineWidth = 2; ctx.shadowColor = P.a; ctx.shadowBlur = 8; ctx.stroke(); ctx.shadowBlur = 0;
        const yR = mid - f(W) * H * .4 * intro; ctx.fillStyle = P.a; ctx.beginPath(); ctx.arc(W - 2, yR, 3, 0, TAU); ctx.fill();
      },
    },

    /* — profil de compétences : radar qui respire + balayage — */
    radar: {
      init(st) { st.k = 5; },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, cx = W / 2, cy = H / 2, Ra = Math.min(W, H) * .4 * intro, k = st.k;
        ctx.strokeStyle = P.faint; ctx.lineWidth = 1;
        for (let r = 1; r <= 3; r++) { ctx.beginPath(); for (let i = 0; i <= k; i++) { const a = -Math.PI / 2 + i / k * TAU, rr = Ra * r / 3; const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
        for (let i = 0; i < k; i++) { const a = -Math.PI / 2 + i / k * TAU; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * Ra, cy + Math.sin(a) * Ra); ctx.stroke(); }
        ctx.beginPath(); for (let i = 0; i <= k; i++) { const a = -Math.PI / 2 + i / k * TAU, v = .5 + .38 * Math.sin(t * 1.0 + i * 1.7), rr = Ra * v; const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.closePath(); ctx.fillStyle = rgba(P.a, .18); ctx.fill(); ctx.strokeStyle = P.a; ctx.lineWidth = 2; ctx.stroke();
        const sa = -Math.PI / 2 + (t * .8) % TAU; ctx.strokeStyle = rgba(P.a, .5); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sa) * Ra, cy + Math.sin(sa) * Ra); ctx.stroke();
      },
    },

    /* — IA / signal : égaliseur — */
    equalizer: {
      init(st) { st.n = 12; st.ph = Array.from({ length: 12 }, () => Math.random() * 6); },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, n = st.n, m = W * .08, gap = (W - 2 * m) / n, bw = gap * .5, mid = H * .86;
        ctx.strokeStyle = P.faint; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(m, mid); ctx.lineTo(W - m, mid); ctx.stroke();
        for (let i = 0; i < n; i++) { const x = m + gap * i + gap * .25, h = H * .62 * (.18 + .82 * Math.abs(Math.sin(t * 2.1 + st.ph[i]))) * intro; ctx.fillStyle = i % 3 === 0 ? P.a : P.b; ctx.fillRect(x, mid - h, bw, h); }
      },
    },

    /* — jauge circulaire vivante (satisfaction, taux…) — */
    gauge: {
      frame(g) {
        const { ctx, W, H, t, intro, P } = g, cx = W / 2, cy = H * .56, Ra = Math.min(W, H) * .34 * intro, prog = Math.sin(t * .5) * .5 + .5;
        ctx.lineWidth = Math.max(3, Ra * .16); ctx.lineCap = "round";
        ctx.strokeStyle = P.faint; ctx.beginPath(); ctx.arc(cx, cy, Ra, Math.PI * .8, Math.PI * 2.2); ctx.stroke();
        ctx.strokeStyle = P.a; ctx.shadowColor = P.a; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(cx, cy, Ra, Math.PI * .8, Math.PI * .8 + 1.4 * Math.PI * prog); ctx.stroke(); ctx.shadowBlur = 0;
        const ang = Math.PI * .8 + 1.4 * Math.PI * prog; ctx.fillStyle = P.a; ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * Ra, cy + Math.sin(ang) * Ra, Math.max(3, Ra * .1), 0, TAU); ctx.fill();
        ctx.fillStyle = P.stroke; ctx.font = `600 ${Math.round(Ra * .58)}px "Cormorant Garamond", Georgia, serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(Math.round(prog * 100) + "%", cx, cy);
      },
    },

    /* — process en quatre temps, pulse qui circule — */
    process: {
      init(st, W, H) {
        const n = 4, m = W * .15, ys = H * .5; st.steps = []; for (let i = 0; i < n; i++) st.steps.push({ x: m + (W - 2 * m) * (i / (n - 1)), y: ys + (i % 2 ? -1 : 1) * H * .22 });
        st.seg = []; st.len = 0; for (let i = 1; i < n; i++) { const d = Math.hypot(st.steps[i].x - st.steps[i - 1].x, st.steps[i].y - st.steps[i - 1].y); st.seg.push(d); st.len += d; } st.Rr = Math.min(W, H) * .13;
      },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, steps = st.steps, Rr = st.Rr * intro;
        ctx.strokeStyle = rgba(P.a, .55 * intro); ctx.lineWidth = 2; ctx.setLineDash([4, 8]); ctx.lineDashOffset = -(t * 40) % 24;
        ctx.beginPath(); steps.forEach((s, i) => i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y)); ctx.stroke(); ctx.setLineDash([]);
        const tt = (t * .16) % 1; let dist = tt * st.len, idx = 0; while (idx < st.seg.length && dist > st.seg[idx]) { dist -= st.seg[idx]; idx++; }
        let px, py; if (idx < st.seg.length) { const a = steps[idx], b = steps[idx + 1], f = dist / st.seg[idx]; px = a.x + (b.x - a.x) * f; py = a.y + (b.y - a.y) * f; } else { px = steps[3].x; py = steps[3].y; }
        steps.forEach((s, i) => {
          const glow = Math.max(0, 1 - Math.hypot(px - s.x, py - s.y) / (st.Rr * 1.7));
          ctx.fillStyle = P.paper; ctx.strokeStyle = rgba(P.stroke, .8); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(s.x, s.y, Rr, 0, TAU); ctx.fill(); ctx.stroke();
          if (glow > 0) { ctx.strokeStyle = rgba(P.a, glow); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(s.x, s.y, Rr + 6 * glow, 0, TAU); ctx.stroke(); }
          ctx.fillStyle = glow > .3 ? P.a : P.stroke; ctx.font = `600 ${Math.round(st.Rr * .9)}px "Cormorant Garamond", Georgia, serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(i + 1), s.x, s.y + 1);
        });
        ctx.fillStyle = P.a; ctx.shadowColor = P.a; ctx.shadowBlur = 14 * intro; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
      },
    },

    /* — carte de France : maillage + signaux Paris→villes — */
    francemap: {
      init(st, W, H) {
        const DW = 620, DH = 520, s = Math.min(W / DW, H / DH) * .94, ox = (W - DW * s) / 2, oy = (H - DH * s) / 2, tf = (x, y) => ({ x: ox + x * s, y: oy + y * s });
        st.hex = [[400, 110], [560, 210], [520, 360], [380, 450], [210, 370], [172, 220], [262, 132]].map(([x, y]) => tf(x, y));
        const cities = { paris: [372, 205], lille: [398, 138], strasbourg: [528, 212], lyon: [452, 312], marseille: [470, 392], toulouse: [322, 392], bordeaux: [248, 332], nantes: [248, 262], rennes: [222, 212] };
        st.cities = {}; for (const k in cities) st.cities[k] = tf(cities[k][0], cities[k][1]);
        st.hub = ["lille", "strasbourg", "lyon", "nantes", "rennes", "bordeaux", "toulouse", "marseille"];
        st.cross = [["bordeaux", "toulouse"], ["toulouse", "marseille"], ["marseille", "lyon"], ["lyon", "strasbourg"], ["nantes", "bordeaux"], ["rennes", "nantes"]];
        st.sig = st.hub.map((k) => ({ k, p: Math.random(), sp: .18 + Math.random() * .22 })); st.last = performance.now();
      },
      frame(g, st) {
        const { ctx, W, H, t, intro, P } = g, Pa = st.cities.paris, now = performance.now(), dt = Math.min((now - st.last) / 1000, .05); st.last = now;
        ctx.strokeStyle = rgba(P.stroke, .8 * intro); ctx.lineWidth = 2; ctx.beginPath(); st.hex.forEach((q, i) => i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)); ctx.closePath(); ctx.fillStyle = rgba(P.a, .05 * intro); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = rgba(P.a, .28 * intro); ctx.lineWidth = 1.2; st.hub.forEach((k) => { const c = st.cities[k]; ctx.beginPath(); ctx.moveTo(Pa.x, Pa.y); ctx.lineTo(c.x, c.y); ctx.stroke(); });
        ctx.strokeStyle = rgba(P.b, .28 * intro); st.cross.forEach(([a, b]) => { const A = st.cities[a], B = st.cities[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); });
        st.sig.forEach((s) => { s.p += s.sp * dt; if (s.p > 1) s.p -= 1; const c = st.cities[s.k]; ctx.fillStyle = rgba(P.a, .9 * intro); ctx.beginPath(); ctx.arc(Pa.x + (c.x - Pa.x) * s.p, Pa.y + (c.y - Pa.y) * s.p, 2.4, 0, TAU); ctx.fill(); });
        for (const k in st.cities) { const c = st.cities[k], big = k === "paris", r = Math.max(.1, (big ? 6.5 : 4) + Math.sin(t * 2 + c.x * .05) * .7) * intro; ctx.fillStyle = big ? P.a : P.b; ctx.shadowColor = rgba(P.a, .5); ctx.shadowBlur = big ? 11 : 6; ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = P.paper; ctx.lineWidth = 1.3; ctx.stroke(); }
      },
    },
  };

  function start(host) {
    const name = host.getAttribute("data-viz");
    const r = R[name]; if (!r) return;
    const cv = makeCanvas(host);
    const P = pal(!!host.closest(".section--ink"));
    const st = {}; let lastKey = "", t0 = performance.now(), visible = true;
    if ("IntersectionObserver" in window) new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 }).observe(host);

    function ensure() { const { W, H } = cv; if (!W || !H) return false; const key = Math.round(W) + "x" + Math.round(H); if (key !== lastKey) { lastKey = key; (r.init || (() => {}))(st, W, H); t0 = performance.now(); } return true; }

    if (reduce) { const draw = () => { if (!ensure()) { requestAnimationFrame(draw); return; } const { ctx, W, H } = cv; ctx.clearRect(0, 0, W, H); r.frame({ ctx, W, H, t: 3, intro: 1, P }, st); }; draw(); return; }
    function loop(now) { requestAnimationFrame(loop); if (!ensure() || !visible) return; const { ctx, W, H } = cv; ctx.clearRect(0, 0, W, H); const el = Math.max(0, now - t0); r.frame({ ctx, W, H, t: el / 1000 + .001, intro: Math.min(el / 1400, 1), P }, st); }
    requestAnimationFrame(loop);
  }

  function init() { document.querySelectorAll("[data-viz]").forEach(start); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
