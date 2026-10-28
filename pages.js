(function () {
  'use strict';
  /* Gentle scroll-reveal, same behaviour as the homepage. Skipped for reduced motion. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section-head, .pg-item, .pg-point, .pg-step');
  if (!targets.length || reduce || !('IntersectionObserver' in window)) { return; }
  for (var i = 0; i < targets.length; i++) { targets[i].classList.add('reveal'); }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  for (var j = 0; j < targets.length; j++) { io.observe(targets[j]); }
})();
