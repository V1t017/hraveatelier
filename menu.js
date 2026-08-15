(function () {
  "use strict";
  var chk = document.getElementById("navtoggle");
  var list = document.getElementById("navLinks");
  if (!chk || !list) { return; }
  function close() { chk.checked = false; }
  Array.prototype.forEach.call(list.querySelectorAll("a"), function (a) { a.addEventListener("click", close); });
  document.addEventListener("click", function (e) {
    if (!chk.checked) { return; }
    if (list.contains(e.target)) { return; }
    if (e.target.closest && e.target.closest(".nav-toggle")) { return; }
    close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) { close(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 900) { close(); } });
})();
