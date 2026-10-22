(function () {
  'use strict';

  function initNavToggle() {
    var toggle = document.querySelector('.site-header__toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      nav.classList.toggle('is-open', isOpen);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  function initActiveLink() {
    var links = document.querySelectorAll('.site-nav__link[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var linkById = {};
    links.forEach(function (link) {
      linkById[link.getAttribute('href').slice(1)] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove('is-active'); });
        var active = linkById[entry.target.id];
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (section) {
      observer.observe(section);
    });
  }

  function initPrintButton() {
    var button = document.querySelector('[data-print]');
    if (button) button.addEventListener('click', function () { window.print(); });
  }

  function initYear() {
    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }

  initNavToggle();
  initActiveLink();
  initPrintButton();
  initYear();
})();
