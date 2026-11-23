// Stagger sections: each item waits a little longer than the one before it
document.querySelectorAll('[data-reveal="stagger"]').forEach(function (sec) {
  sec.querySelectorAll('.rv').forEach(function (el, i) { el.style.setProperty('--i', i); });
});

// Play each section's transition the first time it scrolls into view
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (sec) { io.observe(sec); });
} else {
  document.querySelectorAll('[data-reveal]').forEach(function (sec) { sec.classList.add('in'); });
}

// Mobile menu
var menuBtn = document.getElementById('menu-btn');
var menu = document.getElementById('mobile-menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; });
  });
}

// Experience filters
var filters = document.querySelectorAll('[data-filter]');
filters.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var f = btn.getAttribute('data-filter');
    filters.forEach(function (b) { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
    document.querySelectorAll('.tl-item').forEach(function (item) {
      var show = f === 'all' || item.getAttribute('data-cat') === f;
      item.classList.toggle('hide', !show);
    });
  });
});
