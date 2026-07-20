\
const progress = document.querySelector('.page-progress');
const cursor = document.querySelector('.cursor-dot');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

const updateScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  progress.style.width = `${ratio * 100}%`;

  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = Number(el.dataset.parallax || 0);
    const rect = el.parentElement.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - innerHeight / 2) * speed;
    el.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
};
addEventListener('scroll', updateScroll, { passive: true });
addEventListener('resize', updateScroll);
updateScroll();

if (matchMedia('(pointer:fine)').matches) {
  addEventListener('mousemove', e => {
    cursor.style.opacity = '1';
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

menuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'CLOSE' : 'MENU';
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.textContent = 'MENU';
  menuButton.setAttribute('aria-expanded', 'false');
}));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');

    const counter = entry.target.querySelector?.('[data-count]') ||
      (entry.target.matches?.('[data-count]') ? entry.target : null);

    if (counter && !counter.dataset.animated) {
      counter.dataset.animated = 'true';
      const target = Number(counter.dataset.count);
      const duration = 1500;
      const start = performance.now();

      const animate = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        counter.textContent = Math.floor(target * eased).toLocaleString('ja-JP');
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }

    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal,.reveal-text').forEach(el => io.observe(el));

const titleSpans = document.querySelectorAll('.split-title span');
titleSpans.forEach((span, i) => {
  span.animate(
    [
      { transform: 'translateY(110%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    {
      duration: 1100,
      delay: 180 + i * 130,
      easing: 'cubic-bezier(.2,.7,.2,1)',
      fill: 'both'
    }
  );
});
