document.addEventListener('DOMContentLoaded', () => {
  // Update mouse position for ambient cursor glow
  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // Reveal Animation on Scroll
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  
  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass, h1, .section-title').forEach(el => {
    el.classList.add('reveal-init');
    revealOnScroll.observe(el);
  });
});

// Add these animation classes dynamically
const style = document.createElement('style');
style.textContent = `
  .reveal-init { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
  .is-visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
