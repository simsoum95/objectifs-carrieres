/* =================================================================
   SCÈNES VIVANTES — Objectifs Carrières
   De vraies visualisations animées EN CONTINU (canvas), une par page.
   Rien ne se fige : tout respire, monte, descend, circule, pulse.
     • home       → courbe de progression vivante (monte/descend sans fin)
     • formations → graphe de connaissances + signaux qui circulent
     • approche   → flux de process parcouru en boucle
     • reseau     → carte de France, signaux Paris → villes en continu
     • contact    → signal : ondes + paquets qui voyagent
   Réglages des couleurs/vitesses en tête de fichier.
   ================================================================= */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Palette Objectifs Carrières : vieux-rose + aubergine + rose-gold + mauve */
  const C = {
    ink: "#2D2230", ink2: "#4C3D49", bordeaux: "#A8466A", bordeaux2: "#C25E80",
    blue: "#8C6E94", line: "#E8D6CF", paper: "#FBF6F1", rose: "#E6A9BD",
  };
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  const rr = (ctx, x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };
  const spaced = (ctx, text, x, y, sp) => { let cx = x; for (const ch of text) { ctx.fillText(ch, cx, y); cx += ctx.measureText(ch).width + sp; } };
  const TAU = Math.PI * 2;

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
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(host);
    else window.addEventListener("resize", resize);
    return { ctx, get W() { return W; }, get H() { return H; } };
  }

  /* ---------------------------------------------------------------- */
  const SCENES = {

    /* ===== ACCUEIL : tableau de bord vivant des compétences ===== */
    home: {
      init() {},
      frame(g, st) {
        const { ctx, W, H, t, intro } = g;
        const S = W / 600; // échelle typographique
        const pad = Math.round(W * 0.06);

        // — panneau —
        ctx.save();
        rr(ctx, 2, 2, W - 4, H - 4, W * 0.045);
        ctx.fillStyle = "rgba(255,255,255,0.78)";
        ctx.shadowColor = "rgba(22,36,63,0.20)"; ctx.shadowBlur = 36 * S; ctx.shadowOffsetY = 16 * S; ctx.fill();
        ctx.restore();
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(C.line, 1); rr(ctx, 2, 2, W - 4, H - 4, W * 0.045); ctx.stroke();

        // — en-tête —
        const hFs = 11 * S;
        ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
        ctx.font = `800 ${hFs}px Mulish, system-ui, sans-serif`; ctx.fillStyle = rgba(C.ink, .5);
        spaced(ctx, "PROGRESSION DES COMPÉTENCES", pad, pad + hFs, hFs * 0.12);
        ctx.font = `600 ${hFs * 0.92}px Mulish, sans-serif`; ctx.fillStyle = rgba(C.ink, .34);
        ctx.fillText("indice global · suivi en temps réel", pad, pad + hFs * 2.2);
        const idx = 0.66 + 0.16 * Math.sin(t * 0.45) + 0.035 * Math.sin(t * 1.3);
        const vFs = 46 * S;
        ctx.textAlign = "right"; ctx.font = `600 ${vFs}px "Cormorant Garamond", Georgia, serif`; ctx.fillStyle = C.bordeaux;
        ctx.fillText(Math.round(idx * 100) + "", W - pad, pad + vFs * 0.82);
        const up = Math.cos(t * 0.45) >= 0;
        ctx.font = `800 ${hFs * 0.92}px Mulish, sans-serif`; ctx.fillStyle = up ? C.bordeaux : rgba(C.ink, .5);
        ctx.fillText((up ? "▲" : "▼") + " " + (up ? "+" : "−") + (3 + Math.round(3 * Math.abs(Math.sin(t * 0.7)))) + " pts", W - pad, pad + vFs * 0.82 + hFs * 1.5);

        // — zone graphe —
        const cTop = pad + vFs * 0.9 + hFs * 1.4;
        const cBot = H * 0.685;
        const cL = pad + hFs * 1.9, cR = W - pad, cw = cR - cL, chh = cBot - cTop;
        const yOf = (v) => cTop + chh * (1 - v);

        ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.font = `600 ${9.5 * S}px Mulish, sans-serif`;
        for (let i = 0; i <= 4; i++) {
          const y = cTop + chh * i / 4;
          ctx.strokeStyle = rgba(C.line, i === 4 ? 1 : .65); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cL, y); ctx.lineTo(cR, y); ctx.stroke();
          ctx.fillStyle = rgba(C.ink, .36); ctx.fillText(String(100 - i * 25), cL - 7 * S, y);
        }

        const main = (xx) => { let v = 0.50 + 0.24 * Math.sin(t * 0.16) + 0.26 * xx + 0.075 * Math.sin(xx * 7 + t) + 0.05 * Math.sin(xx * 15 - t * 1.7) + 0.026 * Math.sin(xx * 27 + t * 0.6); return Math.max(0.06, Math.min(0.96, v - 0.13)); };
        const sec = (xx) => { let v = 0.40 + 0.15 * Math.sin(t * 0.22 + 1) + 0.16 * xx + 0.10 * Math.sin(xx * 10 + t * 2) + 0.05 * Math.sin(xx * 20 - t * 1.3); return Math.max(0.05, Math.min(0.92, v)); };
        const mavg = (xx) => { let s = 0, c = 0; for (let d = -0.1; d <= 0.1; d += 0.04) { s += main(Math.max(0, Math.min(1, xx + d))); c++; } return s / c; };

        const N = 160, clipX = cL + cw * intro;
        const PA = [], PB = [], PM = [];
        for (let i = 0; i <= N; i++) { const xx = i / N, X = cL + cw * xx; PA.push([X, yOf(main(xx))]); PB.push([X, yOf(sec(xx))]); PM.push([X, yOf(mavg(xx))]); }

        ctx.save();
        ctx.beginPath(); ctx.rect(cL - 2, cTop - 34, (clipX - cL) + 2, chh + 68); ctx.clip();
        const grad = ctx.createLinearGradient(0, cTop, 0, cBot);
        grad.addColorStop(0, rgba(C.bordeaux, .22)); grad.addColorStop(1, rgba(C.bordeaux, 0));
        ctx.beginPath(); ctx.moveTo(PA[0][0], cBot); PA.forEach((q) => ctx.lineTo(q[0], q[1])); ctx.lineTo(PA[N][0], cBot); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); PB.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = rgba(C.blue, .6); ctx.lineWidth = 1.4; ctx.stroke();
        ctx.setLineDash([5, 5]); ctx.beginPath(); PM.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = rgba(C.ink, .32); ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]);
        ctx.shadowColor = rgba(C.bordeaux, .45); ctx.shadowBlur = 10; ctx.beginPath(); PA.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = C.bordeaux; ctx.lineWidth = 2.6; ctx.stroke(); ctx.shadowBlur = 0;
        ctx.restore();

        // tête de lecture qui balaie
        if (intro >= 1) {
          const sx = cL + cw * (Math.sin(t * 0.35) * 0.5 + 0.5), sv = main((sx - cL) / cw), sy = yOf(sv);
          ctx.strokeStyle = rgba(C.ink, .16); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx, cTop); ctx.lineTo(sx, cBot); ctx.stroke();
          ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(sx, sy, 3.2, 0, TAU); ctx.fill();
          const lab = Math.round(sv * 100) + " pts"; ctx.font = `700 ${10 * S}px Mulish, sans-serif`;
          const lw = ctx.measureText(lab).width + 14, lh = 20 * S; let lx = sx + 8; if (lx + lw > cR) lx = sx - 8 - lw;
          rr(ctx, lx, sy - lh - 9, lw, lh, 4); ctx.fillStyle = C.ink; ctx.fill();
          ctx.fillStyle = C.paper; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(lab, lx + lw / 2, sy - 9 - lh / 2);
        }
        // jalons
        [0.2, 0.45, 0.7].forEach((xx) => { if (cL + cw * xx > clipX) return; const X = cL + cw * xx, Y = yOf(main(xx)); ctx.fillStyle = C.bordeaux; ctx.beginPath(); ctx.arc(X, Y, 3.2, 0, TAU); ctx.fill(); ctx.strokeStyle = C.paper; ctx.lineWidth = 1.6; ctx.stroke(); });
        // tête courante
        if (intro >= 1) { const X = PA[N][0], Y = PA[N][1], pp = (t * 0.5) % 1; ctx.strokeStyle = rgba(C.bordeaux, (1 - pp) * .5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X, Y, 9 + pp * 20, 0, TAU); ctx.stroke(); ctx.fillStyle = C.bordeaux; ctx.shadowColor = rgba(C.bordeaux, .6); ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(X, Y, 5 + Math.sin(t * 3) * .7, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; }

        // labels mois
        const mo = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"];
        ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.font = `600 ${9 * S}px Mulish, sans-serif`; ctx.fillStyle = rgba(C.ink, .34);
        mo.forEach((m, i) => ctx.fillText(m, cL + cw * (i / (mo.length - 1)), cBot + 15 * S));

        // — tuiles métriques (avec sparklines vivantes) —
        const sep = H * 0.755; ctx.strokeStyle = rgba(C.line, 1); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, sep); ctx.lineTo(W - pad, sep); ctx.stroke();
        const tiles = [["Taux de réussite", "96%"], ["Satisfaction", "4,8/5"], ["Réseau formateurs", "180+"]];
        const fT = sep + 14 * S, fB = H - pad * 0.7, gap = W * 0.025, tw = (W - 2 * pad - gap * 2) / 3;
        tiles.forEach((tl, i) => {
          const tx = pad + (tw + gap) * i;
          if (i > 0) { ctx.strokeStyle = rgba(C.line, .9); ctx.beginPath(); ctx.moveTo(tx - gap / 2, fT); ctx.lineTo(tx - gap / 2, fB); ctx.stroke(); }
          ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.font = `800 ${8.5 * S}px Mulish, sans-serif`; ctx.fillStyle = rgba(C.ink, .42);
          spaced(ctx, tl[0].toUpperCase(), tx, fT + 9 * S, 8.5 * S * 0.06);
          // sparkline
          const spT = fT + 16 * S, spB = fB - 22 * S, spw = tw * 0.96;
          ctx.strokeStyle = rgba(C.bordeaux, .55); ctx.lineWidth = 1.4; ctx.beginPath();
          for (let k = 0; k <= 26; k++) { const xx = k / 26, v = 0.5 + 0.42 * Math.sin(xx * 6 + t * 1.5 + i * 1.4), X = tx + spw * xx, Y = spB - (spB - spT) * v; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
          ctx.stroke();
          ctx.font = `600 ${21 * S}px "Cormorant Garamond", Georgia, serif`; ctx.fillStyle = C.ink; ctx.textBaseline = "alphabetic"; ctx.fillText(tl[1], tx, fB);
        });
      },
    },

    /* ===== FORMATIONS : graphe de connaissances vivant ===== */
    formations: {
      init(st, W, H) {
        const pad = Math.min(W, H) * 0.14, n = 9;
        st.pad = pad; st.nodes = [];
        for (let i = 0; i < n; i++) st.nodes.push({
          x: pad + Math.random() * (W - 2 * pad), y: pad + Math.random() * (H - 2 * pad),
          vx: (Math.random() - .5) * 10, vy: (Math.random() - .5) * 10,
          r: 5 + Math.random() * 4, ph: Math.random() * TAU, c: Math.random() < .5 ? C.bordeaux : C.blue,
        });
        const seen = new Set(); st.edges = [];
        for (let i = 0; i < n; i++) {
          const d = st.nodes.map((m, j) => ({ j, dist: Math.hypot(m.x - st.nodes[i].x, m.y - st.nodes[i].y) }))
            .filter((o) => o.j !== i).sort((a, b) => a.dist - b.dist);
          [d[0].j, d[1].j].forEach((j) => { const k = i < j ? i + "-" + j : j + "-" + i; if (!seen.has(k)) { seen.add(k); st.edges.push([i, j]); } });
        }
        st.parts = st.edges.map(() => ({ p: Math.random(), sp: .12 + Math.random() * .22 }));
        st.last = performance.now();
      },
      frame(g, st) {
        const { ctx, W, H, t, intro } = g, pad = st.pad;
        const now = performance.now(), dt = Math.min((now - st.last) / 1000, .05); st.last = now;
        st.nodes.forEach((nd) => {
          nd.x += nd.vx * dt; nd.y += nd.vy * dt;
          if (nd.x < pad) { nd.x = pad; nd.vx *= -1; } if (nd.x > W - pad) { nd.x = W - pad; nd.vx *= -1; }
          if (nd.y < pad) { nd.y = pad; nd.vy *= -1; } if (nd.y > H - pad) { nd.y = H - pad; nd.vy *= -1; }
        });
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(C.ink, .15 * intro);
        st.edges.forEach(([a, b]) => { const A = st.nodes[a], B = st.nodes[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); });
        st.edges.forEach(([a, b], i) => {
          const A = st.nodes[a], B = st.nodes[b], pt = st.parts[i];
          pt.p += pt.sp * dt; if (pt.p > 1) pt.p -= 1;
          const X = A.x + (B.x - A.x) * pt.p, Y = A.y + (B.y - A.y) * pt.p;
          ctx.fillStyle = rgba(C.bordeaux, .85 * intro); ctx.beginPath(); ctx.arc(X, Y, 2.2, 0, TAU); ctx.fill();
        });
        st.nodes.forEach((nd) => {
          const r = Math.max(.1, (nd.r + Math.sin(t * 2 + nd.ph)) * intro);
          ctx.fillStyle = nd.c; ctx.shadowColor = rgba(nd.c, .5); ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(nd.x, nd.y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          ctx.strokeStyle = C.paper; ctx.lineWidth = 1.6; ctx.stroke();
        });
      },
    },

    /* ===== APPROCHE : flux de process parcouru en boucle ===== */
    approche: {
      init(st, W, H) {
        const m = W * 0.13, n = 4, ys = H * 0.5;
        st.steps = []; for (let i = 0; i < n; i++) st.steps.push({ x: m + (W - 2 * m) * (i / (n - 1)), y: ys + (i % 2 ? -1 : 1) * H * 0.15 });
        st.seg = []; st.len = 0;
        for (let i = 1; i < st.steps.length; i++) { const d = Math.hypot(st.steps[i].x - st.steps[i - 1].x, st.steps[i].y - st.steps[i - 1].y); st.seg.push(d); st.len += d; }
        st.R = Math.min(W, H) * 0.075;
      },
      frame(g, st) {
        const { ctx, W, H, t, intro } = g, steps = st.steps, R = st.R * intro;
        ctx.strokeStyle = rgba(C.bordeaux, .55 * intro); ctx.lineWidth = 2.2;
        ctx.setLineDash([4, 9]); ctx.lineDashOffset = -(t * 40) % 26;
        ctx.beginPath(); steps.forEach((s, i) => i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y)); ctx.stroke(); ctx.setLineDash([]);
        const tt = (t * 0.16) % 1; let dist = tt * st.len, idx = 0;
        while (idx < st.seg.length && dist > st.seg[idx]) { dist -= st.seg[idx]; idx++; }
        let px, py;
        if (idx < st.seg.length) { const a = steps[idx], b = steps[idx + 1], f = dist / st.seg[idx]; px = a.x + (b.x - a.x) * f; py = a.y + (b.y - a.y) * f; }
        else { px = steps[steps.length - 1].x; py = steps[steps.length - 1].y; }
        steps.forEach((s, i) => {
          const near = Math.hypot(px - s.x, py - s.y), glow = Math.max(0, 1 - near / (st.R * 1.7));
          ctx.fillStyle = C.paper; ctx.strokeStyle = rgba(C.ink, .8); ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(s.x, s.y, R, 0, TAU); ctx.fill(); ctx.stroke();
          if (glow > 0) { ctx.strokeStyle = rgba(C.bordeaux, glow); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(s.x, s.y, R + 6 * glow, 0, TAU); ctx.stroke(); }
          ctx.fillStyle = glow > .3 ? C.bordeaux : C.ink2; ctx.font = `600 ${Math.round(st.R * .9)}px "Cormorant Garamond", Georgia, serif`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(i + 1), s.x, s.y + 1);
        });
        ctx.fillStyle = C.bordeaux; ctx.shadowColor = rgba(C.bordeaux, .7); ctx.shadowBlur = 14 * intro;
        ctx.beginPath(); ctx.arc(px, py, 4.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
      },
    },

    /* ===== RESEAU : carte de France, signaux en continu ===== */
    reseau: {
      init(st, W, H) {
        const DW = 620, DH = 520, s = Math.min(W / DW, H / DH) * 0.92, ox = (W - DW * s) / 2, oy = (H - DH * s) / 2;
        const tf = (x, y) => ({ x: ox + x * s, y: oy + y * s });
        st.hex = [[400, 110], [560, 210], [520, 360], [380, 450], [210, 370], [172, 220], [262, 132]].map(([x, y]) => tf(x, y));
        const cities = { paris: [372, 205], lille: [398, 138], strasbourg: [528, 212], lyon: [452, 312], marseille: [470, 392], toulouse: [322, 392], bordeaux: [248, 332], nantes: [248, 262], rennes: [222, 212] };
        st.cities = {}; for (const k in cities) st.cities[k] = tf(cities[k][0], cities[k][1]);
        st.hub = ["lille", "strasbourg", "lyon", "nantes", "rennes", "bordeaux", "toulouse", "marseille"];
        st.cross = [["bordeaux", "toulouse"], ["toulouse", "marseille"], ["marseille", "lyon"], ["lyon", "strasbourg"], ["nantes", "bordeaux"], ["rennes", "nantes"]];
        st.sig = st.hub.map((k) => ({ k, p: Math.random(), sp: .18 + Math.random() * .22 }));
        st.last = performance.now();
      },
      frame(g, st) {
        const { ctx, W, H, t, intro } = g, P = st.cities.paris;
        const now = performance.now(), dt = Math.min((now - st.last) / 1000, .05); st.last = now;
        ctx.strokeStyle = rgba(C.ink, .8 * intro); ctx.lineWidth = 2;
        ctx.beginPath(); st.hex.forEach((q, i) => i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)); ctx.closePath();
        ctx.fillStyle = rgba(C.bordeaux, .05 * intro); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = rgba(C.bordeaux, .28 * intro); ctx.lineWidth = 1.2;
        st.hub.forEach((k) => { const c = st.cities[k]; ctx.beginPath(); ctx.moveTo(P.x, P.y); ctx.lineTo(c.x, c.y); ctx.stroke(); });
        ctx.strokeStyle = rgba(C.blue, .28 * intro);
        st.cross.forEach(([a, b]) => { const A = st.cities[a], B = st.cities[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); });
        st.sig.forEach((s) => { s.p += s.sp * dt; if (s.p > 1) s.p -= 1; const c = st.cities[s.k]; const X = P.x + (c.x - P.x) * s.p, Y = P.y + (c.y - P.y) * s.p; ctx.fillStyle = rgba(C.bordeaux, .9 * intro); ctx.beginPath(); ctx.arc(X, Y, 2.5, 0, TAU); ctx.fill(); });
        for (const k in st.cities) {
          const c = st.cities[k], big = k === "paris", r = Math.max(.1, (big ? 7 : 4.5) + Math.sin(t * 2 + c.x * .05) * .7) * intro;
          ctx.fillStyle = big ? C.bordeaux : C.bordeaux2; ctx.shadowColor = rgba(C.bordeaux, .5); ctx.shadowBlur = big ? 12 : 6;
          ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          ctx.strokeStyle = C.paper; ctx.lineWidth = 1.4; ctx.stroke();
        }
      },
    },

    /* ===== CONTACT : signal (ondes + paquets) ===== */
    contact: {
      init(st, W, H) {
        st.A = { x: W * 0.3, y: H * 0.5 }; st.B = { x: W * 0.7, y: H * 0.5 };
        st.packets = [0, .33, .66].map((p) => ({ p }));
        st.sats = [[.86, .32], [.9, .66], [.8, .2]].map(([fx, fy]) => ({ x: W * fx, y: H * fy }));
      },
      frame(g, st) {
        const { ctx, W, H, t, intro } = g, A = st.A, B = st.B;
        ctx.strokeStyle = rgba(C.bordeaux, .4 * intro); ctx.lineWidth = 2;
        ctx.setLineDash([4, 8]); ctx.lineDashOffset = -(t * 40) % 24;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); ctx.setLineDash([]);
        for (let i = 0; i < 3; i++) { const ph = ((t * 0.4) + i / 3) % 1, r = ph * Math.min(W, H) * 0.34, a = (1 - ph) * .5 * intro; ctx.strokeStyle = rgba(C.bordeaux, a); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(A.x, A.y, r, 0, TAU); ctx.stroke(); }
        st.packets.forEach((pk) => { pk.p += .0045; if (pk.p > 1) pk.p -= 1; const X = A.x + (B.x - A.x) * pk.p, Y = A.y + (B.y - A.y) * pk.p; ctx.fillStyle = rgba(C.bordeaux, .9 * intro); ctx.beginPath(); ctx.arc(X, Y, 2.6, 0, TAU); ctx.fill(); });
        st.sats.forEach((s, i) => { ctx.strokeStyle = rgba(C.blue, .3 * intro); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(s.x, s.y); ctx.stroke(); const r = Math.max(.1, (3 + Math.sin(t * 2 + i)) * intro); ctx.fillStyle = C.bordeaux2; ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, TAU); ctx.fill(); });
        ctx.fillStyle = C.bordeaux; ctx.shadowColor = rgba(C.bordeaux, .6); ctx.shadowBlur = 14 * intro; ctx.beginPath(); ctx.arc(A.x, A.y, 8, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = C.blue; ctx.beginPath(); ctx.arc(B.x, B.y, 6, 0, TAU); ctx.fill();
      },
    },
  };

  /* ---------------------------------------------------------------- */
  function start(host) {
    const name = host.getAttribute("data-scene");
    const scene = SCENES[name];
    if (!scene) return;
    const cv = makeCanvas(host);
    const st = {};
    let lastKey = "", t0 = performance.now(), visible = true;

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 }).observe(host);
    }

    function ensure() {
      const { W, H } = cv; if (!W || !H) return false;
      const key = Math.round(W) + "x" + Math.round(H);
      if (key !== lastKey) { lastKey = key; scene.init(st, W, H); t0 = performance.now(); }
      return true;
    }

    if (reduce) {
      const draw = () => { if (!ensure()) { requestAnimationFrame(draw); return; } const { ctx, W, H } = cv; ctx.clearRect(0, 0, W, H); scene.frame({ ctx, W, H, t: 4, intro: 1 }, st); };
      draw();
      return;
    }

    function loop(now) {
      requestAnimationFrame(loop);
      if (!ensure()) return;
      if (!visible) return;
      const { ctx, W, H } = cv;
      ctx.clearRect(0, 0, W, H);
      const el = Math.max(0, now - t0);
      scene.frame({ ctx, W, H, t: el / 1000 + 0.001, intro: Math.min(el / 1500, 1) }, st);
    }
    requestAnimationFrame(loop);
  }

  function init() { document.querySelectorAll("[data-scene]").forEach(start); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
