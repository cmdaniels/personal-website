document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  const filter = grid.getAttribute('data-filter');
  const filteredProjects = filter === 'featured'
    ? projectsData.filter(p => p.featured)
    : projectsData;

  grid.innerHTML = filteredProjects.map(project => `
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
        <a href="${project.link}" target="_blank" rel="noopener" class="project-card-link">View Project ↗</a>
      </div>
    </article>
  `).join('');
});
