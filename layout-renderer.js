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
