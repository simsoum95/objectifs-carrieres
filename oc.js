/* =================================================================
   INTERACTIONS — Objectifs Carrières
   Explorateur de diplômes à onglets + accroche « métier qui défile ».
   ================================================================= */
(function () {
  // —— Explorateur : onglets qui filtrent les panneaux ——
  document.querySelectorAll("[data-explorer]").forEach(function (ex) {
    var tabs = ex.querySelectorAll(".explorer__tab");
    var panels = ex.querySelectorAll(".explorer__panel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-tab");
        tabs.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-tab") === key); });
        panels.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-panel") === key); });
      });
    });
  });

  // —— Hero : le métier qui défile (« Devenez … ») ——
  var rot = document.querySelector(".hero-rotate");
  if (rot) {
    var words = (rot.getAttribute("data-words") || "").split("|").filter(Boolean);
    if (words.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var idx = 0;
      setInterval(function () {
        rot.classList.add("is-out");
        setTimeout(function () {
          idx = (idx + 1) % words.length;
          rot.textContent = words[idx];
          rot.classList.remove("is-out");
        }, 300);
      }, 2300);
    }
  }
})();
