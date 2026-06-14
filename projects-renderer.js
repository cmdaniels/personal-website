document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  const filter = grid.getAttribute('data-filter');
  const filteredProjects = filter === 'featured'
    ? projectsData.filter(p => p.featured)
    : projectsData;

  if (filteredProjects.length === 3) {
    grid.classList.add('cols-3');
  } else {
    grid.classList.remove('cols-3');
  }

  grid.innerHTML = filteredProjects.map(project => {
    const isExternalOrFile = project.link.startsWith('http') || project.link.endsWith('.pdf') || project.link.includes('/files/');
    const targetAttr = isExternalOrFile ? ' target="_blank" rel="noopener"' : '';
    return `
      <article class="project-card">
        <img src="${project.image}" alt="${project.imageAlt}" class="project-image">
        <div class="project-card-header">
          <h3>${project.title}</h3>
        </div>
        <div class="project-card-body">
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <a href="${project.link}"${targetAttr} class="project-card-link">View Project ↗</a>
        </div>
      </article>
    `;
  }).join('');

  // Handle touch interactions for mobile/touch screens
  grid.addEventListener('click', (e) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    const card = e.target.closest('.project-card');
    if (!card) return;

    // Allow navigating if the user clicked the link directly
    if (e.target.closest('.project-card-link')) {
      return;
    }

    // Toggle active state for touch screens
    e.preventDefault();
    const isActive = card.classList.contains('touch-active');

    // Remove active state from all other cards
    grid.querySelectorAll('.project-card').forEach(c => {
      if (c !== card) {
        c.classList.remove('touch-active');
      }
    });

    if (isActive) {
      card.classList.remove('touch-active');
    } else {
      card.classList.add('touch-active');
    }
  });

  // Close active cards when tapping outside the grid
  document.addEventListener('click', (e) => {
    if (!grid.contains(e.target)) {
      grid.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('touch-active');
      });
    }
  });
});
