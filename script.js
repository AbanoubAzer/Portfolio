/**
 * Abanoub Gerges Azer Soliman - Portfolio Interactive Logic
 * High-performance, zero-dependency Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initCairoClock();
  initProjectModal();
  initProjectFilter();
  initContactForm();
  initCopyActions();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('aga-theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('aga-theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;
  toggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
  toggleBtn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
}

/* ==========================================================================
   2. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '☰';
    };

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }
}

/* ==========================================================================
   3. ScrollSpy & Sticky Navbar Shadows
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active Section Detection
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. Live Timezone Clock (Cairo UTC+2 / EET)
   ========================================================================== */
function initCairoClock() {
  const clockEl = document.getElementById('cairoLiveClock');
  if (!clockEl) return;

  function updateClock() {
    try {
      const options = {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const cairoTime = new Intl.DateTimeFormat([], options).format(new Date());
      clockEl.textContent = `${cairoTime} (Cairo, UTC+2)`;
    } catch (e) {
      clockEl.textContent = 'GMT+2 (Egypt)';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   5. Project Deep-Dive Modal Data & Handler
   ========================================================================== */
const projectData = {
  amlak: {
    title: 'Amlak Personal Finance App',
    category: 'FinTech & Mobile Architecture',
    image: 'assets/amlak.jpg',
    role: 'Lead Mobile Architect & Senior React Native Engineer',
    period: '2023 - 2024',
    overview: 'A high-security, consumer-facing FinTech and credit analytics application designed to help consumers assess credit viability, calculate real-time loan schedules, and connect securely with financial institutions.',
    challenge: 'Legacy mobile codebase suffered from slow initial boot times (over 4.2 seconds), high crash rates in biometric authentication handshakes, and unoptimized re-renders across heavy financial chart visualizations.',
    solution: 'Re-architected the entire application utilizing React Native with TypeScript and TanStack Query for stale-while-revalidate client caching. Implemented native hardware-backed biometric authentication (KeyStore & Secure Enclave), and restructured navigation with lazy-loaded stacks.',
    outcomes: [
      '⚡ 25% Increase in core application cold-boot and screen rendering speeds.',
      '🛡️ 100% compliance with local financial and data encryption standards.',
      '📉 Reduced production crash rate from 2.1% to less than 0.12%.',
      '🌟 4.7-star average rating across App Store and Google Play.'
    ],
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'TanStack Query', 'FaceID/Biometrics', 'Jest', 'CI/CD']
  },
  trevi: {
    title: 'Trevi Financials Wallet & Micro-Finance',
    category: 'FinTech & Digital Wallets',
    image: 'assets/trevi.jpg',
    role: 'Senior React Native Developer & Agile Scrum Master',
    period: '2022 - 2023',
    overview: 'Full-cycle greenfield development of a modern digital micro-finance wallet supporting instant money transfers, QR payment requests, multi-currency balances, and automated KYC verification.',
    challenge: 'Building a compliant, instant-sync FinTech wallet from zero to production launch in under 6 months while navigating stringent KYC identity requirements and unpredictable network conditions.',
    solution: 'Engineered an offline-first mobile architecture powered by Expo and WatermelonDB for local caching. Integrated seamless micro-animations with React Native Reanimated 3, and led two-week sprint cycles using Scrum practices (PSM I) to maintain 98% sprint velocity.',
    outcomes: [
      '🚀 Shipped from concept to App Store / Google Play in 5 months.',
      '📲 Scaled to 100,000+ active mobile wallet transactions within 90 days.',
      '🔄 Offline-resilient transaction queue preventing double-submission drops.',
      '⏱️ Sprint delivery predictability increased by 30% under agile stewardship.'
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'Reanimated 3', 'KYC APIs', 'Scrum / PSM I']
  },
  vodafone: {
    title: 'Ana Vodafone Mobile Ecosystem (VOIS)',
    category: 'Enterprise Telecom & Mega Scale',
    image: 'assets/vodafone.jpg',
    role: 'Senior React Native Specialist / Technical Lead',
    period: '2020 - 2022',
    overview: 'The primary telecommunications self-care app for Vodafone, serving millions of daily active users managing billings, prepaid recharge, roaming packs, and high-frequency digital services.',
    challenge: 'Managing feature velocity across a large distributed engineering team without regressing app bundle size, performance, or memory usage on budget Android devices across emerging markets.',
    solution: 'Introduced modular feature packaging and decoupled state slices. Established automated performance profiling and integrated Fastlane/GitHub Actions pipelines to run automated Detox E2E tests before release tags.',
    outcomes: [
      '👥 Supported 1M+ daily active mobile sessions with 99.8% crash-free stability.',
      '📦 Optimized bundle splitting, decreasing Android APK size by 18MB.',
      '🛠️ Streamlined release cycle from 4 weeks down to 10-day bi-weekly cadences.',
      '🤝 Mentored 8 junior and mid-level engineers in clean code and testing best practices.'
    ],
    stack: ['React Native', 'TypeScript', 'Redux Saga', 'GraphQL', 'Fastlane', 'Detox E2E', 'Bitrise']
  },
  architecture_kit: {
    title: 'Production React Native Architecture Blueprint',
    category: 'Developer Tooling & Open Source',
    image: 'assets/amlak.jpg',
    role: 'Creator & Mobile Systems Designer',
    period: '2024 - Present',
    overview: 'An opinionated enterprise-grade starter kit embodying clean architecture principles, typed navigation, scalable state management, and CI/CD pipelines for distributed mobile teams.',
    challenge: 'Remote teams often suffer from inconsistent codebase structures, fragmented test coverage, and tedious manual build/deploy steps.',
    solution: 'Created an open, modular template combining TypeScript, TanStack Query, Zustand, absolute path aliases, pre-configured ESLint/Prettier, Husky git hooks, and automated GitHub Actions for iOS TestFlight and Android Internal tracks.',
    outcomes: [
      '⏱️ Slashes new project kickoff setup from 3 weeks to under 2 days.',
      '🧪 Pre-configured 80%+ unit and component test coverage scaffolds.',
      '🌐 Adopted across 4 remote commercial projects as standard foundation.'
    ],
    stack: ['React Native', 'Expo Config Plugins', 'Zustand', 'TypeScript', 'GitHub Actions', 'Jest']
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalDynamicContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('[data-project-key]');

  if (!modal || !modalContent) return;

  function openModal(key) {
    const data = projectData[key];
    if (!data) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="section-tag">${data.category}</span>
        <h2 style="font-size: 1.85rem; margin-top: 0.5rem; margin-bottom: 0.25rem;">${data.title}</h2>
        <p style="color: var(--accent-cyan); font-weight: 600; font-size: 0.95rem;">${data.role} • ${data.period}</p>
      </div>

      <img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.75rem; border: 1px solid var(--border-glass);" />

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Executive Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.7;">${data.overview}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem;">
        <div style="background: rgba(255, 255, 255, 0.03); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <h5 style="color: var(--accent-amber); font-size: 0.95rem; margin-bottom: 0.5rem;">The Challenge</h5>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">${data.challenge}</p>
        </div>
        <div style="background: rgba(56, 189, 248, 0.04); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid rgba(56, 189, 248, 0.2);">
          <h5 style="color: var(--accent-cyan); font-size: 0.95rem; margin-bottom: 0.5rem;">The Solution</h5>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">${data.solution}</p>
        </div>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.75rem;">Measurable Outcomes & Business Impact</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
          ${data.outcomes.map(item => `<li style="font-size: 0.925rem; color: var(--text-primary); display: flex; align-items: flex-start; gap: 0.5rem;"><span>${item}</span></li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.6rem;">Technology Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.stack.map(tag => `<span class="stack-chip" style="font-size: 0.85rem; padding: 0.3rem 0.75rem;">${tag}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center;">
        <a href="https://www.linkedin.com/in/abanoubgergesazer/" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Discuss this project on LinkedIn ↗
        </a>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">Close</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      openModal(key);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. Project Filtering (Category Switcher)
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Contact Form Handling (Direct WhatsApp Integration)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim() || 'General Inquiry / Opportunity';
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Opening WhatsApp...</span> <span>💬</span>';
      submitBtn.disabled = true;

      // Construct formatted WhatsApp message text
      const fullText = 
`*New Portfolio Inquiry* 🚀
*From:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}`;

      const whatsappUrl = `https://wa.me/201271617780?text=${encodeURIComponent(fullText)}`;

      setTimeout(() => {
        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank');

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();

        if (statusMsg) {
          statusMsg.innerHTML = `✓ Thank you, <strong>${name}</strong>! Opening WhatsApp with your message now...`;
          statusMsg.className = 'form-status success';
          setTimeout(() => {
            statusMsg.style.display = 'none';
          }, 8000);
        }

        showToast('Redirecting to WhatsApp! 💬');
      }, 600);
    });
  }
}

/* ==========================================================================
   8. Copy-to-Clipboard & Toast Message
   ========================================================================== */
function initCopyActions() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('Abanoubgazer96@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+201271617780').then(() => {
        showToast('Phone number copied to clipboard!');
      });
    });
  }
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   9. Smooth Scroll & Back to Top
   ========================================================================== */
function initSmoothScroll() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* Global CV print / download helper */
window.printResume = function() {
  window.print();
};
