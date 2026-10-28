(function () {
  'use strict';
  var NUMBER = '917339387556';

  function line(label, value) { return label + (value ? ' ' + value : ''); }

  /* Message layout follows the approved enquiry template exactly; blank fields stay blank. */
  function buildEnquiryMessage(v) {
    return [
      'Hi Bakers Delight, I\u2019d like to enquire about a customised cake.',
      '',
      line('Occasion:', v.occasion),
      line('Required date:', v.date),
      line('Approximate size/servings:', v.size),
      line('Preferred design or reference:', v.design),
      line('Delivery area in Pondicherry:', v.area)
    ].join('\n');
  }

  function formatDate(iso) {
    if (!iso) { return ''; }
    var p = iso.split('-');
    if (p.length !== 3) { return iso; }
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var m = months[parseInt(p[1], 10) - 1];
    return m ? (parseInt(p[2], 10) + ' ' + m + ' ' + p[0]) : iso;
  }

  function val(id) {
    var el = document.getElementById(id);
    return el && el.value ? String(el.value).replace(/\s+/g, ' ').trim() : '';
  }

  /* The enquiry button is a real link (like every other WhatsApp button), so it works inside
     sandboxed previews and in-app browsers that block form submission or window.open.
     Its address is kept in sync with the form so the link always carries the typed details. */
  var form = document.getElementById('inquiryForm');
  var link = document.getElementById('formWhatsApp');

  function currentUrl() {
    return 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(buildEnquiryMessage({
      occasion: val('occasion'), date: formatDate(val('edate')),
      size: val('size'), design: val('design'), area: val('area')
    }));
  }
  function refreshLink() {
    if (!link) { return ''; }
    link.href = currentUrl();
    return link.href;
  }

  if (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });   /* never reload the page */
    form.addEventListener('input', refreshLink);
    form.addEventListener('change', refreshLink);
  }
  if (link) {
    refreshLink();
    link.addEventListener('mousedown', refreshLink);
    link.addEventListener('touchstart', refreshLink);
    link.addEventListener('focus', refreshLink);
    link.addEventListener('click', function () {
      var url = refreshLink();                                               /* runs before the browser follows the link */
      var status = document.getElementById('formStatus');
      if (status) {
        status.textContent = 'Opening WhatsApp with your details. If nothing opens, ';
        var a = document.createElement('a');
        a.href = url; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'tap here to open WhatsApp';
        status.appendChild(a);
        status.appendChild(document.createTextNode('.'));
      }
    });
    window.addEventListener('pageshow', refreshLink);
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Subtle hero parallax (skipped when the visitor prefers reduced motion) */
  var heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto && !reduce) {
    window.addEventListener('scroll', function () {
      heroPhoto.style.transform = 'translateY(' + Math.min(window.scrollY * 0.08, 32) + 'px)';
    }, { passive: true });
  }

  /* Gentle scroll-reveal for section content */
  var targets = document.querySelectorAll('.section-head, .celeb-card, .gcard, .testi, .trust-statement, .insta-item, .story-inner, .flavour-inner');
  if (targets.length && 'IntersectionObserver' in window) {
    for (var i = 0; i < targets.length; i++) { targets[i].classList.add('reveal'); }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    for (var j = 0; j < targets.length; j++) { io.observe(targets[j]); }
  }
})();
