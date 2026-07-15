document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Before/after slider
const baAfter = document.getElementById('ba-after');
const baHandle = document.getElementById('ba-handle');
const baRange = document.getElementById('ba-range');
function setBaPosition(percent) {
  const clamped = Math.min(100, Math.max(0, percent));
  baAfter.style.clipPath = `inset(0 0 0 ${clamped}%)`;
  baHandle.style.left = `${clamped}%`;
}
baRange.addEventListener('input', (e) => setBaPosition(Number(e.target.value)));

// Count-up stats on scroll into view
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = Number(el.dataset.target);
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach((counter) => animateCounter(counter));
}
