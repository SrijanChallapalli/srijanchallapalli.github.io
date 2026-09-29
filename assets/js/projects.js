/* Srijan Challapalli — /projects interactions
   Hand-written, dependency-free. Drifting embers (shared with the homepage)
   and the current year in the footer. No scroll-reveal — the page stands on
   its own the moment it loads. */
(function () {
  'use strict';

  /* --- drifting embers --- */
  var host = document.getElementById('embers');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (host && !reduce) {
    var N = window.innerWidth < 560 ? 16 : 30;
    for (var i = 0; i < N; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      var size = 1.5 + Math.random() * 2.5;
      e.style.left = (Math.random() * 100) + 'vw';
      e.style.width = e.style.height = size.toFixed(1) + 'px';
      e.style.setProperty('--drift', (Math.random() * 80 - 40).toFixed(0) + 'px');
      e.style.animationDuration = (8 + Math.random() * 11).toFixed(1) + 's';
      e.style.animationDelay = (-Math.random() * 16).toFixed(1) + 's';
      if (Math.random() > 0.55) {
        e.style.background = 'var(--gold)';
        e.style.boxShadow = '0 0 6px 1px rgba(185,151,91,.6)';
      }
      host.appendChild(e);
    }
  }

  /* --- current year --- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
