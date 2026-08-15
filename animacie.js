/* ==========================================================
   SCROLL ANIMÁCIE — logika
   Postavené na IntersectionObserver, žiadna knižnica, ~2 kB.
   Funguje vo všetkých prehliadačoch od roku 2019.
   ========================================================== */
(function () {
  "use strict";

  /* Kto má v systéme vypnuté animácie, dostane obsah rovno. */
  var pokoj = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Ak by IntersectionObserver chýbal, ukáž všetko a skonči. */
  if (pokoj || !("IntersectionObserver" in window)) {
    document.documentElement.classList.add("no-js");
    return;
  }

  /* ---------- 1. Objavovanie prvkov pri scrolle ---------- */
  var prvky = document.querySelectorAll(".an, .an-stagger");

  var oko = new IntersectionObserver(function (zaznamy) {
    zaznamy.forEach(function (z) {
      if (z.isIntersecting) {
        var delay = z.target.getAttribute("data-an-delay");
        if (delay) {
          setTimeout(function () { z.target.classList.add("je"); }, parseInt(delay, 10));
        } else {
          z.target.classList.add("je");
        }
        /* bez data-an-repeat sledovanie končí — šetrí výkon */
        if (!z.target.hasAttribute("data-an-repeat")) { oko.unobserve(z.target); }
      } else if (z.target.hasAttribute("data-an-repeat")) {
        z.target.classList.remove("je");
      }
    });
  }, {
    /* spustí sa, keď je prvok 12 % nad spodnou hranou obrazovky */
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.01
  });

  Array.prototype.forEach.call(prvky, function (p) { oko.observe(p); });

  /* Poistka: čo je pri načítaní už na obrazovke, ukáž hneď bez čakania. */
  requestAnimationFrame(function () {
    Array.prototype.forEach.call(prvky, function (p) {
      var r = p.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) { p.classList.add("je"); }
    });
  });

  /* ---------- 2. Počítadlá čísel ---------- */
  var cisla = document.querySelectorAll("[data-count]");

  function pocitaj(el) {
    var ciel = parseFloat(el.getAttribute("data-count"));
    var des = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var trvanie = parseInt(el.getAttribute("data-count-time") || "1400", 10);
    var zaciatok = null;

    function krok(cas) {
      if (!zaciatok) { zaciatok = cas; }
      var p = Math.min((cas - zaciatok) / trvanie, 1);
      var e = 1 - Math.pow(1 - p, 3);           /* spomalenie na konci */
      var v = (ciel * e).toFixed(des);
      el.textContent = des ? v.replace(".", ",") : Math.round(ciel * e).toLocaleString("sk-SK");
      if (p < 1) { requestAnimationFrame(krok); }
    }
    requestAnimationFrame(krok);
  }

  if (cisla.length) {
    var okoCisla = new IntersectionObserver(function (zaznamy) {
      zaznamy.forEach(function (z) {
        if (z.isIntersecting) { pocitaj(z.target); okoCisla.unobserve(z.target); }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(cisla, function (c) {
      c.textContent = "0";
      okoCisla.observe(c);
    });
  }

  /* ---------- 3. Ukazovateľ scrollu ---------- */
  var pruh = document.querySelector(".an-progress");

  /* ---------- 4. Jemný parallax ---------- */
  var para = document.querySelectorAll(".an-parallax");

  if (pruh || para.length) {
    var caka = false;

    function prekresli() {
      if (pruh) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pomer = max > 0 ? window.scrollY / max : 0;
        pruh.style.transform = "scaleX(" + Math.min(Math.max(pomer, 0), 1) + ")";
      }
      Array.prototype.forEach.call(para, function (p) {
        var sila = parseFloat(p.getAttribute("data-an-parallax") || "0.15");
        var r = p.getBoundingClientRect();
        var stred = r.top + r.height / 2 - window.innerHeight / 2;
        p.style.transform = "translate3d(0," + (-stred * sila).toFixed(1) + "px,0)";
      });
      caka = false;
    }

    window.addEventListener("scroll", function () {
      if (!caka) { caka = true; requestAnimationFrame(prekresli); }
    }, { passive: true });

    window.addEventListener("resize", prekresli, { passive: true });
    prekresli();
  }
})();
