document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');

  // Enhanced Theme Toggle with Icons
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    // Save preference
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  // Comprehensive Project Data
  const projectData = {
    "no-code-ml": {
      title: "No-Code ML Pipeline",
      tech: "React • Django • TensorFlow • Docker",
      desc: "An end-to-end platform enabling non-technical users to build ML models. Features include automated outlier detection, feature scaling, and one-click deployment via Docker containers.",
      link: "https://github.com/project-2-2-2/testoo"
    },
    "flight-predictor": {
      title: "Flight Crash Predictor",
      tech: "PyTorch • LSTM • Attention • Flask",
      desc: "A safety-critical AI system using multimodal telemetry data. Employs Attention-based LSTMs to identify risk patterns in time-series flight data with high explainability.",
      link: "https://github.com/project-2-2-2/flight-crash-predictor"
    },
    "ev-booker": {
        title: "EV Booker (ANTZHACKATHON)",
        tech: "Node.js • Socket.IO • MongoDB",
        desc: "Real-time infrastructure for EV station management. Prevented double-booking via atomic slot-locking and provided live status updates via WebSockets.",
        link: "https://github.com/project-2-2-2/ANTZHACKATHON"
    }
    // Add others as needed...
  };

  // Open Modal Logic
  document.querySelectorAll('.btn-sm.view').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const data = projectData[id] || { title: "Project Details", desc: "Details coming soon..." };
      
      modalContent.innerHTML = `
        <div style="padding: 10px;">
          <span style="color:var(--accent2); font-weight:bold; font-size:0.8rem;">${data.tech || ''}</span>
          <h2 style="margin: 10px 0 20px 0; font-family:var(--font-space); font-size:2rem;">${data.title}</h2>
          <p style="color:var(--muted); font-size:1.1rem; line-height:1.7;">${data.desc}</p>
          <div style="margin-top:30px">
            <a href="${data.link || '#'}" target="_blank" class="btn primary">View Source Code</a>
          </div>
        </div>
      `;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });
  });

  // Close Modal Logic
  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  };

  modalClose.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Scroll Reveal Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});
