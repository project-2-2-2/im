document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');

  // Theme Logic
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌙' : '✨';
  });

  // Project Details
  const projectData = {
    "no-code-ml": {
      title: "No-Code ML Pipeline",
      desc: "Built a complete system where users upload CSVs and get a deployed model. Features include automated handling of missing values and hyperparameter tuning using TensorFlow."
    },
    "flight-predictor": {
      title: "Flight Crash Predictor",
      desc: "An advanced Deep Learning project using LSTMs to process aircraft telemetry. Achieved high reliability in forecasting risk thresholds."
    }
  };

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const data = projectData[id];
      modalContent.innerHTML = `
        <h2 style="margin-bottom:15px">${data.title}</h2>
        <p style="color:var(--text-muted)">${data.desc}</p>
        <div style="margin-top:20px">
          <a href="#" class="btn primary">View Code</a>
        </div>
      `;
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  
  // Close modal on background click
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });
});