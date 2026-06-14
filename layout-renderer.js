document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Header
  const header = document.getElementById('site-header');
  if (header) {
    const activePage = header.getAttribute('data-active');
    header.innerHTML = `
      <div class="header-container">
        <div class="title-area">
          <a href="./index.html" class="title-link">
            <h1>Cody Daniels</h1>
            <p class="subtitle">Computational Linguist</p>
          </a>
        </div>
        <nav class="nav-links">
          <a href="./index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="./projects.html" class="${activePage === 'projects' ? 'active' : ''}">Projects</a>
          <a href="./cv.html" class="${activePage === 'cv' ? 'active' : ''}">CV</a>
          <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
        </nav>
      </div>
    `;
  }

  // 2. Theme Toggle Logic
  const initThemeToggle = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Sync with system preferences if user hasn't explicitly chosen a theme yet
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    });
  };

  initThemeToggle();



  // 3. Render Footer
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
      <p>&copy; 2026 Cody Daniels</p>
    `;
  }

  // 4. Email Obfuscation Helper
  document.querySelectorAll('.email-link').forEach(link => {
    const name = link.getAttribute('data-name');
    const domain = link.getAttribute('data-domain');
    const tld = link.getAttribute('data-tld');
    if (name && domain && tld) {
      link.setAttribute('href', `mailto:${name}@${domain}.${tld}`);
    }
  });
});
