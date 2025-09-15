// IntersectionObserver to reveal elements on scroll
(function(){
  const revealEls = [];
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealEls.push(el));
    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal all
      revealEls.forEach(el => el.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15 });

    revealEls.forEach(el => io.observe(el));
  });
})();
