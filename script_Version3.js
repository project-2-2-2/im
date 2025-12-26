// Interactive behaviors: theme toggle, mobile menu, project modal, contact form (client-side mailto)
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('.nav');
  const projectButtons = Array.from(document.querySelectorAll('.project .view'));
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  // Persist theme in localStorage
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'light') document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', next);
  });

  // Mobile nav
  mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Project modal content map (expanded details)
  const projectMap = {
    "no-code-ml": {
      title: "No-Code ML Pipeline (testoo)",
      body: `<p><strong>Overview:</strong> End-to-end no-code ML platform for learners and rapid prototyping. Upload CSVs, auto-engineer features, try multiple models, and deploy the best one as an API or Docker container.</p>
             <p><strong>Key Features:</strong></p>
             <ul><li>Automatic preprocessing & feature engineering</li><li>Model selection & hyperparameter tuning</li><li>One-click deployment (Django + Docker)</li><li>Real-time analytics dashboard</li></ul>
             <p><strong>Tech:</strong> React, Django, TensorFlow, Docker, PostgreSQL</p>
             <p><a href="https://github.com/project-2-2-2/testoo" target="_blank">Open on GitHub</a></p>`
    },
    "flight-predictor": {
      title: "Flight Crash Predictor",
      body: `<p><strong>Overview:</strong> Deep learning model for forecasting flight risk using telemetry time-series and historical incident data. Emphasizes explainability and robust validation.</p>
             <p><strong>Highlights:</strong></p><ul><li>LSTM + attention for time-series</li><li>Explainable outputs for decision support</li><li>Validated on holdout flight datasets</li></ul>
             <p><strong>Tech:</strong> PyTorch, LSTM, Attention, Flask, Docker</p>
             <p><a href="https://github.com/project-2-2-2/flight-crash-predictor" target="_blank">Open on GitHub</a></p>`
    },
    "ev-booker": {
      title: "Electronic Vehicle Booker (ANTZHACKATHON)",
      body: `<p><strong>Overview:</strong> EV booking application — browse EVs, reserve charging/ride slots, manage bookings, and handle payments. Built for low-latency booking flows and real-time slot locking.</p>
             <p><strong>Features:</strong></p>
             <ul><li>Real-time availability & booking with Socket.IO</li><li>Reservation history & user dashboard</li><li>Payment integration & booking confirmations</li><li>Admin dashboard for vehicle & slot management</li></ul>
             <p><strong>Tech:</strong> React, Node.js, MongoDB, Socket.IO</p>
             <p><a href="https://github.com/project-2-2-2/ANTZHACKATHON" target="_blank">Open on GitHub</a></p>`
    },
    "ai-interview": {
      title: "RAG-based Interview (meetingapp)",
      body: `<p><strong>Overview:</strong> Retrieval-Augmented Generation (RAG) based interview assistant — indexes job descriptions and documents to power context-aware interview sessions and feedback.</p>
             <p><strong>Highlights:</strong></p><ul><li>Document indexing and retrieval pipeline</li><li>LLM-based question and feedback generation</li><li>Session recording and analytics</li></ul>
             <p><strong>Tech:</strong> React, Node.js, LangChain, Vector DBs</p>
             <p><a href="https://github.com/project-2-2-2/meetingapp" target="_blank">Open on GitHub</a></p>`
    },
    "sportsjob": {
      title: "Sports Job (Sportsjob)",
      body: `<p><strong>Overview:</strong> Platform for athletes and clubs — profiles, listings, real-time chat, and an AI-driven chatbot for discovery and support.</p>
             <p><strong>Tech:</strong> MERN, Socket.IO, Tailwind</p>
             <p><a href="https://github.com/project-2-2-2/Sportsjob" target="_blank">Open on GitHub</a></p>`
    }
  };

  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-project') || btn.closest('.project')?.dataset?.project;
      if (!id || !projectMap[id]) return;
      modalContent.innerHTML = `<h2>${projectMap[id].title}</h2>` + projectMap[id].body;
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden','true') });

  // Simple contact form behavior: opens mailto in client
  const sendBtn = document.getElementById('send-btn');
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const message = document.getElementById('c-message').value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\nEmail: ${email}`);
    window.location.href = `mailto:srimanstudyforever@gmail.com?subject=${subject}&body=${body}`;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

});