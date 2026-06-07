/* =================================================================
   MOTIFS DE SECTION — Élysée Formations
   Une petite illustration au crayon qui se dessine, se colore,
   s'efface, puis recommence — dans chaque section.
   ================================================================= */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const LIB = {
    cap: `
      <path class="mfl" d="M12 38 L55 21 L98 38 L55 55 Z" fill="var(--bordeaux-wash)"/>
      <path class="mstk" d="M12 38 L55 21 L98 38 L55 55 Z"/>
      <path class="mfl" d="M32 49 L32 70 Q55 83 78 70 L78 49 L55 60 Z" fill="var(--ink)"/>
      <path class="mstk" d="M32 49 L32 70 Q55 83 78 70 L78 49"/>
      <circle class="mfl" cx="55" cy="38" r="3" fill="var(--bordeaux)"/>
      <path class="mstk" d="M98 38 L98 60"/>
      <circle class="mfl" cx="98" cy="63" r="3.4" fill="var(--bordeaux)"/>
      <circle class="mstk" cx="98" cy="63" r="3.4"/>`,
    book: `
      <path class="mfl" d="M55 30 C40 23 22 25 12 31 L12 73 C22 67 40 65 55 72 Z" fill="#F7F0E2"/>
      <path class="mfl" d="M55 30 C70 23 88 25 98 31 L98 73 C88 67 70 65 55 72 Z" fill="#ECE2CF"/>
      <path class="mstk" d="M55 30 C40 23 22 25 12 31 L12 73 C22 67 40 65 55 72"/>
      <path class="mstk" d="M55 30 C70 23 88 25 98 31 L98 73 C88 67 70 65 55 72"/>
      <path class="mstk" d="M55 30 L55 72"/>
      <path class="mstk" d="M22 41 L45 39 M22 49 L45 48 M22 57 L43 56"/>
      <path class="mstk" d="M65 39 L88 41 M65 48 L88 49 M67 56 L88 57"/>`,
    bulb: `
      <circle class="mfl" cx="55" cy="40" r="24" fill="var(--bordeaux-wash)"/>
      <circle class="mstk" cx="55" cy="40" r="24"/>
      <path class="mfl" d="M44 60 L44 72 L66 72 L66 60 Z" fill="var(--ink)"/>
      <path class="mstk" d="M44 60 L44 72 L66 72 L66 60"/>
      <path class="mstk" d="M47 66 L63 66 M49 72 L61 72"/>
      <path class="mstk" d="M48 42 L55 50 L62 42"/>
      <path class="mstk" d="M55 6 L55 1 M82 16 L86 12 M28 16 L24 12 M28 40 L22 40 M82 40 L88 40"/>`,
    key: `
      <circle class="mfl" cx="32" cy="50" r="18" fill="var(--bordeaux-wash)"/>
      <circle class="mstk" cx="32" cy="50" r="18"/>
      <circle class="mfl" cx="32" cy="50" r="6" fill="var(--paper)"/>
      <circle class="mstk" cx="32" cy="50" r="6"/>
      <path class="mstk" d="M50 50 L96 50" stroke-width="3"/>
      <path class="mstk" d="M86 50 L86 63 M76 50 L76 61"/>`,
    plant: `
      <path class="mstk" d="M22 84 L88 84"/>
      <path class="mfl" d="M40 70 L44 84 L66 84 L70 70 Z" fill="#B47C4E"/>
      <path class="mstk" d="M40 70 L44 84 L66 84 L70 70 Z"/>
      <path class="mstk" d="M55 70 L55 40"/>
      <path class="mfl" d="M55 56 C40 56 34 44 40 38 C52 40 56 50 55 56 Z" fill="#8DA577"/>
      <path class="mstk" d="M55 56 C40 56 34 44 40 38 C52 40 56 50 55 56 Z"/>
      <path class="mfl" d="M55 50 C70 50 76 38 70 32 C58 34 54 44 55 50 Z" fill="#A6B791"/>
      <path class="mstk" d="M55 50 C70 50 76 38 70 32 C58 34 54 44 55 50 Z"/>`,
    compass: `
      <circle class="mstk" cx="55" cy="50" r="34"/>
      <circle class="mfl" cx="55" cy="50" r="18" fill="var(--bordeaux-wash)"/>
      <circle class="mstk" cx="55" cy="50" r="18"/>
      <path class="mstk" d="M55 12 L55 26 M55 74 L55 88 M17 50 L31 50 M79 50 L93 50"/>
      <path class="mfl" d="M55 50 L67 38 L58 54 Z" fill="var(--bordeaux)"/>
      <path class="mstk" d="M55 50 L67 38 M55 50 L58 54"/>
      <circle class="mfl" cx="55" cy="50" r="3.4" fill="var(--ink)"/>`,
  };

  const VB = "0 0 110 100";
  const T = { draw: 1100, fill: 800, hold: 2400, fade: 850, gap: 700, stagger: 60 };

  function run(svg) {
    const strokes = [...svg.querySelectorAll(".mstk")];
    const fills = [...svg.querySelectorAll(".mfl")];

    function cycle() {
      // reset
      svg.style.transition = "none"; svg.style.opacity = "1";
      strokes.forEach((s) => { s.style.transition = "none"; s.style.strokeDashoffset = "1"; });
      fills.forEach((f) => { f.style.transition = "none"; f.style.opacity = "0"; });
      void svg.getBoundingClientRect();

      // tracé
      strokes.forEach((s, i) => {
        s.style.transition = `stroke-dashoffset ${T.draw}ms ease`;
        s.style.transitionDelay = (i * T.stagger) + "ms";
        s.style.strokeDashoffset = "0";
      });
      const drawEnd = T.draw + (strokes.length - 1) * T.stagger;

      // mise en couleur
      setTimeout(() => {
        fills.forEach((f, i) => {
          f.style.transition = `opacity ${T.fill}ms ease`;
          f.style.transitionDelay = (i * 40) + "ms";
          f.style.opacity = "1";
        });
      }, drawEnd + 160);
      const fillEnd = drawEnd + 160 + T.fill + (fills.length - 1) * 40;

      // disparition
      setTimeout(() => {
        svg.style.transition = `opacity ${T.fade}ms ease`;
        svg.style.opacity = "0";
      }, fillEnd + T.hold);

      // boucle
      setTimeout(cycle, fillEnd + T.hold + T.fade + T.gap);
    }
    cycle();
  }

  function init() {
    document.querySelectorAll("[data-motif]").forEach((host, idx) => {
      const name = host.getAttribute("data-motif");
      const markup = LIB[name];
      if (!markup) return;
      host.innerHTML = `<svg viewBox="${VB}" fill="none" aria-hidden="true">${markup}</svg>`;
      const svg = host.querySelector("svg");
      svg.querySelectorAll(".mstk").forEach((s) => s.setAttribute("pathLength", "1"));
      if (reduce) return; // état final figé via CSS
      // léger décalage pour désynchroniser les sections
      setTimeout(() => run(svg), idx * 350 + Math.random() * 600);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
