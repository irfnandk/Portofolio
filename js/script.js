

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. LOADING SCREEN ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', function () {
    setTimeout(function () {
      loadingScreen.classList.add('hide');
    }, 400);
  });

  /* ---------- 2. AOS INIT ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- 3. SCROLL PROGRESS BAR ---------- */
  const scrollProgress = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateScrollProgress);

  /* ---------- 4. NAVBAR SCROLL EFFECT + ACTIVE LINK ---------- */
  const navbar = document.getElementById('mainNavbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight based on scroll position
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', handleNavbarScroll);

  // Collapse mobile menu after clicking a link
  document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const collapseEl = document.getElementById('navMenu');
      if (collapseEl.classList.contains('show') && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- 5. TYPING ANIMATION ---------- */
  const typedTextEl = document.getElementById('typed-text');
  const typingWords = ['Web Developer', 'UI Designer', 'Programmer', 'Freelancer'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const currentWord = typingWords[wordIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    typedTextEl.textContent = currentWord.substring(0, charIndex);

    let typeSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      typeSpeed = 300;
    }
    setTimeout(typeLoop, typeSpeed);
  }
  if (typedTextEl) typeLoop();

  /* ---------- 6. PARTICLE BACKGROUND (Hero only, canvas) ---------- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas && window.innerWidth > 767) {
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('home');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, ' + p.alpha + ')';
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ---------- 7. COUNTER ANIMATION (triggers on scroll into view) ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const increment = Math.max(target / 60, 1);
        const updateCounter = function () {
          current += increment;
          if (current < target) {
            el.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target;
          }
        };
        updateCounter();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { counterObserver.observe(c); });

  /* ---------- 8. SKILL PROGRESS BAR ANIMATION ---------- */
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width') + '%';
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  progressBars.forEach(function (bar) { progressObserver.observe(bar); });

  /* ---------- 9. PROJECT FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(function (item) {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  /* ---------- 10. CERTIFICATE MODAL ---------- */
  const certModal = document.getElementById('certModal');
  if (certModal) {
    certModal.addEventListener('show.bs.modal', function (event) {
      const trigger = event.relatedTarget;
      const imgSrc = trigger.getAttribute('data-img');
      const title = trigger.getAttribute('data-title');
      document.getElementById('certModalImg').src = imgSrc;
      document.getElementById('certModalImg').alt = 'Sertifikat ' + title;
      document.getElementById('certModalTitle').textContent = title;
    });
  }

  /* ---------- 11. CONTACT FORM (client-side validation, no backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Mohon lengkapi semua kolom dengan benar.';
        formStatus.className = 'form-status error';
        contactForm.classList.add('was-validated');
        return;
      }

      // Simulate sending (no backend connected)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Mengirim...';
      submitBtn.disabled = true;

      setTimeout(function () {
        formStatus.textContent = 'Terima kasih! Pesan Anda berhasil terkirim.';
        formStatus.className = 'form-status success';
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  /* ---------- 12. BACK TO TOP ---------- */
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 13. DARK / LIGHT MODE TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('portfolio-theme');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  // Default to system preference if no saved theme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  /* ---------- 14. BUTTON RIPPLE EFFECT ---------- */
  document.querySelectorAll('.ripple').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();

      circle.style.width = circle.style.height = diameter + 'px';
      circle.style.left = (e.clientX - rect.left - radius) + 'px';
      circle.style.top = (e.clientY - rect.top - radius) + 'px';
      circle.classList.add('ripple-circle');

      const existingRipple = btn.querySelector('.ripple-circle');
      if (existingRipple) existingRipple.remove();

      btn.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 600);
    });
  });

  /* ---------- 15. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
