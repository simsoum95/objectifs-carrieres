/* =================================================================
   INTERACTIONS — Objectifs Carrières
   Explorateur de diplômes à onglets (et autres petits modules).
   ================================================================= */
(function () {
  // —— Explorateur : onglets qui filtrent les panneaux ——
  document.querySelectorAll("[data-explorer]").forEach(function (ex) {
    var tabs = ex.querySelectorAll(".explorer__tab");
    var panels = ex.querySelectorAll(".explorer__panel");
    function activate(key) {
      tabs.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-tab") === key); });
      panels.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-panel") === key); });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { activate(tab.getAttribute("data-tab")); });
    });
  });
})();
