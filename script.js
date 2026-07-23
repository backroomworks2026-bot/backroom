const menu = document.querySelector('.menu');
const nav = document.querySelector('.header nav');

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.textContent = isOpen ? 'CLOSE' : 'MENU';
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.textContent = 'MENU';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');

    const counter = entry.target.querySelector?.('[data-count]') || (entry.target.matches?.('[data-count]') ? entry.target : null);
    if (counter && !counter.dataset.done) {
      counter.dataset.done = '1';
      const target = Number(counter.dataset.count);
      const duration = 1200;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        counter.textContent = Math.floor(target * eased).toLocaleString('ja-JP');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll(".price-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;

    button.classList.toggle("is-open");
    detail.classList.toggle("is-open");
  });
});
