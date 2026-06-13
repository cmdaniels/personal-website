document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Header
  const header = document.getElementById('site-header');
  if (header) {
    const activePage = header.getAttribute('data-active');
    header.innerHTML = `
      <div class="header-container">
        <div class="title-area">
          <h1>Cody Daniels</h1>
          <p class="subtitle">Computational Linguist</p>
        </div>
        <nav class="nav-links">
          <a href="./index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="./projects.html" class="${activePage === 'projects' ? 'active' : ''}">Projects</a>
          <a href="./cv.html" class="${activePage === 'cv' ? 'active' : ''}">CV</a>
        </nav>
      </div>
    `;
  }

  // 2. Render Academic Portfolios Section
  const portfolios = document.getElementById('academic-portfolios');
  if (portfolios) {
    portfolios.innerHTML = `
      <div class="section-header">
        <h2>Academic Portfolios</h2>
        <span class="section-line"></span>
      </div>
      <div class="links-grid">
        <a href="https://github.com/cmdaniels" class="portfolio-link" target="_blank" rel="noopener">
          <div class="portfolio-link-header">
            <div class="link-title">GitHub Portfolio</div>
            <span class="link-arrow">↗</span>
          </div>
          <p class="link-desc">Complete source code repositories, NLP utilities, and academic linguistics libraries.</p>
        </a>
        <a href="https://codepen.io/cmdaniels" class="portfolio-link" target="_blank" rel="noopener">
          <div class="portfolio-link-header">
            <div class="link-title">CodePen Sandbox</div>
            <span class="link-arrow">↗</span>
          </div>
          <p class="link-desc">Small interactive front-end layouts, animations, and quick UI prototypes.</p>
        </a>
      </div>
    `;
  }

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
