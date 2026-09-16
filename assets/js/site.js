/* Srijan Challapalli — portfolio interactions
   Minimal, dependency-free: sticky-nav state, mobile menu, scroll reveal. */
(function () {
  'use strict';

  /* --- sticky nav border on scroll --- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* --- mobile menu --- */
    var toggle = nav.querySelector('.nav-toggle');
    var links = nav.querySelector('.nav-links');
    if (toggle && links) {
      var setOpen = function (open) {
        nav.setAttribute('data-open', open ? 'true' : 'false');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      };
      toggle.addEventListener('click', function () {
        setOpen(nav.getAttribute('data-open') !== 'true');
      });
      links.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
      });
      /* close menu if resized up to desktop */
      var mq = window.matchMedia('(min-width:821px)');
      (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
        if (mq.matches) setOpen(false);
      });
    }
  }

  /* --- scroll reveal --- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --- current year --- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
