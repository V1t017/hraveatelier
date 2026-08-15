/* ==========================================================
   HRAVÉ ATELIÉR — register projektov
   1) náhľad, ktorý sleduje kurzor nad riadkom
   2) filter podľa typológie
   ========================================================== */
(function () {
  "use strict";

  var riadky = document.querySelectorAll(".riadok");
  if (!riadky.length) { return; }

  /* ---------- náhľad pri kurzore ---------- */
  var dotyk = window.matchMedia && window.matchMedia("(hover: none)").matches;
  var pokoj = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!dotyk) {
    var box = document.createElement("div");
    box.className = "nahlad ph";
    document.body.appendChild(box);

    var cx = 0, cy = 0, x = 0, y = 0, aktivny = false;

    Array.prototype.forEach.call(riadky, function (r) {
      r.addEventListener("mouseenter", function () {
        box.innerHTML = "<b>" + (r.getAttribute("data-nazov") || "") + "</b>" +
                        "hlavná fotografia · doplní klientka";
        box.style.background = r.style.getPropertyValue("--rc") || "#1D1D1D";
        box.style.color = "rgba(19,19,19,.7)";
        box.querySelector("b").style.color = "#131313";
        box.classList.add("vidno");
        aktivny = true;
      });
      r.addEventListener("mouseleave", function () {
        box.classList.remove("vidno");
        aktivny = false;
      });
    });

    document.addEventListener("mousemove", function (e) { cx = e.clientX; cy = e.clientY; }, { passive: true });

    (function plyn() {
      requestAnimationFrame(plyn);
      if (!aktivny) { return; }
      if (pokoj) { x = cx; y = cy; }          /* bez dobiehania */
      else { x += (cx - x) * 0.14; y += (cy - y) * 0.14; }
      box.style.transform = "translate(" + (x - box.offsetWidth / 2) + "px," +
                            (y - box.offsetHeight / 2) + "px)";
    })();
  }

  /* ---------- filter ---------- */
  var filtre = document.getElementById("filtre");
  if (!filtre) { return; }
  var btns = filtre.querySelectorAll("button");

  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-t");
      Array.prototype.forEach.call(btns, function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      Array.prototype.forEach.call(riadky, function (r) {
        r.classList.toggle("hide", t !== "vsetky" && r.getAttribute("data-typ") !== t);
      });
    });
  });
})();
