(function () {
  'use strict';
  /* Shared site menu for all three pages (header nav + mobile hamburger).
     Opens/closes the panel, moves focus into and out of it, closes on
     Escape, on outside click, on link click and when leaving the mobile
     layout. Tab focus is trapped inside the open menu. */
  var MOBILE_QUERY = '(max-width: 960px)';

  var header = document.querySelector('header.site');
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('siteNav');
  if (!header || !toggle || !panel) { return; }

  var mq = window.matchMedia ? window.matchMedia(MOBILE_QUERY) : null;
  var isOpen = false;
  var focusBeforeOpen = null;

  function open() {
    if (isOpen) { return; }
    isOpen = true;
    focusBeforeOpen = document.activeElement;
    panel.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-lock');
    var first = panel.querySelector('a');
    if (first) { first.focus(); }
  }

  function close(refocus) {
    if (!isOpen) { return; }
    isOpen = false;
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-lock');
    if (refocus && focusBeforeOpen && focusBeforeOpen.focus) { focusBeforeOpen.focus(); }
    focusBeforeOpen = null;
  }

  toggle.addEventListener('click', function () {
    if (isOpen) { close(true); } else { open(); }
  });

  /* A menu link was followed: close without moving focus (the page is
     scrolling or navigating). */
  panel.addEventListener('click', function (e) {
    var el = e.target;
    var link = el && el.closest ? el.closest('a') : null;
    if (link) { close(false); }
  });

  /* Escape closes and returns focus to the button; Tab is trapped inside
     the open menu (button + links). */
  document.addEventListener('keydown', function (e) {
    if (!isOpen) { return; }
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      close(true);
      return;
    }
    if (e.key !== 'Tab') { return; }
    var links = panel.querySelectorAll('a');
    var chain = [toggle];
    var i;
    for (i = 0; i < links.length; i++) { chain.push(links[i]); }
    var at = -1;
    for (i = 0; i < chain.length; i++) {
      if (chain[i] === document.activeElement) { at = i; break; }
    }
    var next;
    if (at === -1) {
      next = e.shiftKey ? chain.length - 1 : 0;
    } else {
      next = e.shiftKey ? at - 1 : at + 1;
      if (next < 0) { next = chain.length - 1; }
      if (next >= chain.length) { next = 0; }
    }
    e.preventDefault();
    chain[next].focus();
  });

  /* A click on the page behind the open panel closes it. */
  document.addEventListener('click', function (e) {
    if (!isOpen) { return; }
    var el = e.target;
    if (!el || !el.closest) { return; }
    if (header.contains(el)) { return; }
    close(false);
  });

  /* Leaving the mobile layout closes the panel without moving focus. */
  function onLayoutChange(e) {
    if (!e.matches) { close(false); }
  }
  if (mq) {
    if (mq.addEventListener) { mq.addEventListener('change', onLayoutChange); }
    else if (mq.addListener) { mq.addListener(onLayoutChange); }
  }
})();
