 /* ===========================
     THEME TOGGLE
  =========================== */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('cpess-theme', theme);
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Load saved theme
  const saved = localStorage.getItem('cpess-theme');
  if (saved) applyTheme(saved);

  /* ===========================
     NAVBAR SCROLL
  =========================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ===========================
     ACTIVE NAV LINK
  =========================== */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));

  /* ===========================
     HAMBURGER
  =========================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ===========================
     FAQ ACCORDION
  =========================== */
  function toggleFaq(el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  /* ===========================
     SCROLL REVEAL
  =========================== */
  const revealEls = document.querySelectorAll('.card, .hero-content, .section-title, .section-label');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp .65s ease both';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===========================
     EVENT MODAL
  =========================== */
  function openModal(id) {
    const overlay = document.getElementById('modal-' + id);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    const overlay = document.getElementById('modal-' + id);
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    // Reset gallery to placeholder
    const main = document.getElementById('main-' + id);
    main.innerHTML = `
      <div class="gallery-placeholder">
        <div class="gallery-placeholder-icon">🖼️</div>
        <div class="gallery-placeholder-text">SELECT A PHOTO BELOW</div>
      </div>`;
    document.querySelectorAll('#thumbs-' + id + ' .gallery-thumb').forEach(t => t.classList.remove('active'));
  }
  function handleOverlayClick(e, id) {
    if (e.target === document.getElementById('modal-' + id)) closeModal(id);
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(o => {
        const id = o.id.replace('modal-', '');
        closeModal(id);
      });
    }
  });

  /* ===========================
     GALLERY PHOTO SELECT
  =========================== */
  function selectPhoto(eventId, thumbIdx, imgSrc) {
    const main = document.getElementById('main-' + eventId);
    // Fade transition
    main.style.opacity = '0';
    main.style.transition = 'opacity .2s';
    setTimeout(() => {
      main.innerHTML = `<img src="${imgSrc}" alt="Event photo" loading="lazy" style="width:100%;height:100%;object-fit:cover;"/>`;
      main.style.opacity = '1';
    }, 180);

    // Update active thumb
    const thumbs = document.querySelectorAll('#thumbs-' + eventId + ' .gallery-thumb');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === thumbIdx));
  }