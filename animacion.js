// Las obras y los textos aparecen suavemente al bajar por la página.
// Lo usan todas las páginas: <script src="animacion.js" defer></script>
// Lo que ya se ve al abrir la página no se esconde nunca.
(function () {
  if (!('IntersectionObserver' in window)) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

  var piezas = Array.prototype.slice.call(document.querySelectorAll('.aparece'));
  var alto = window.innerHeight || 800;
  var porMostrar = piezas.filter(function (p) { return p.getBoundingClientRect().top > alto * 0.9; });
  if (!porMostrar.length) { return; }

  // Las obras de una misma fila entran una detrás de otra
  var cuenta = new Map();
  porMostrar.forEach(function (p) {
    var n = cuenta.get(p.parentNode) || 0;
    p.style.setProperty('--retraso', (n % 3) * 120 + 'ms');
    cuenta.set(p.parentNode, n + 1);
  });

  document.documentElement.classList.add('anima');
  piezas.forEach(function (p) { if (porMostrar.indexOf(p) === -1) { p.classList.add('visto'); } });

  var io = new IntersectionObserver(function (filas) {
    filas.forEach(function (f) {
      if (f.isIntersecting) { f.target.classList.add('visto'); io.unobserve(f.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  porMostrar.forEach(function (p) { io.observe(p); });

  // Red de seguridad: si algo falla, a los 2,5 s se ve todo igualmente.
  setTimeout(function () { piezas.forEach(function (p) { p.classList.add('visto'); }); }, 2500);
})();
