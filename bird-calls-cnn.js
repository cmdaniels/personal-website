document.addEventListener('DOMContentLoaded', () => {
  const birds = [
    {
      id: 'robin',
      name: 'American Robin',
      scientific: 'Turdus migratorius',
      audioUrl: './files/audio/robin.wav',
      spectrogramUrl: './files/audio/robin_spec.png',
      imageUrl: './images/birds/robin.jpg',
      duration: 3.5,
      description: 'A cheerful, warbling song featuring rising and falling pitches.'
    },
    {
      id: 'sparrow',
      name: 'Fox Sparrow',
      scientific: 'Passerella iliaca',
      audioUrl: './files/audio/sparrow.wav',
      spectrogramUrl: './files/audio/sparrow_spec.png',
      imageUrl: './images/birds/sparrow.jpg',
      duration: 4.2,
      description: 'A rich, musical song featuring clear, whistling notes followed by short slurs and a final buzz.'
    },
    {
      id: 'chickadee',
      name: 'Chestnut-backed Chickadee',
      scientific: 'Poecile rufescens',
      audioUrl: './files/audio/chickadee.wav',
      spectrogramUrl: './files/audio/chickadee_spec.png',
      imageUrl: './images/birds/chickadee.jpg',
      duration: 2.8,
      description: 'A rapid, buzzy, and husky "chick-a-dee" call.'
    },
    {
      id: 'jay',
      name: "Steller's Jay",
      scientific: 'Cyanocitta stelleri',
      audioUrl: './files/audio/jay.wav',
      spectrogramUrl: './files/audio/jay_spec.png',
      imageUrl: './images/birds/jay.jpg',
      duration: 2.5,
      description: "A harsh, raspy scolding sound."
    },
    {
      id: 'junco',
      name: 'Dark-eyed Junco',
      scientific: 'Junco hyemalis',
      audioUrl: './files/audio/junco.wav',
      spectrogramUrl: './files/audio/junco_spec.png',
      imageUrl: './images/birds/junco.jpg',
      duration: 3.0,
      description: 'A fast, ringing trill that lasts around 2 seconds.'
    }
  ];

  let activeBirdIndex = 0;
  let animationId = null;
  const audio = document.getElementById('bird-audio');
  const canvas = document.getElementById('spectrogram-canvas');
  const ctx = canvas.getContext('2d');
  const playBtn = document.getElementById('play-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const playhead = document.getElementById('playhead');
  const tabsContainer = document.getElementById('bird-tabs');
  const infoPanel = document.getElementById('info-panel');

  // Cache for loaded spectrogram images
  const spectrogramImageCache = {};

  // Set logical size for canvas to ensure sharpness
  function resizeCanvas() {
    canvas.width = 800;
    canvas.height = 250;
    const activeBird = birds[activeBirdIndex];
    loadAndRenderSpectrogram(activeBird);
  }

  // Draw background grid lines (used for fallback procedural drawing)
  function drawGrid(ctx, width, height) {
    ctx.fillStyle = '#0c0a08';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(245, 237, 224, 0.08)';
    ctx.lineWidth = 1;

    // Horizontal grid lines (Frequencies: 2kHz, 4kHz, 6kHz, 8kHz)
    const labels = ['8 kHz', '6 kHz', '4 kHz', '2 kHz'];
    for (let i = 1; i <= 4; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // Small grey text beside label
      ctx.fillStyle = 'rgba(245, 237, 224, 0.3)';
      ctx.font = '10px "Inter", sans-serif';
      ctx.fillText(labels[i - 1], 15, y - 6);
    }

    // Vertical grid lines (Time: 1s, 2s, 3s, 4s)
    for (let i = 1; i <= 4; i++) {
      const x = (width / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      ctx.fillStyle = 'rgba(245, 237, 224, 0.3)';
      ctx.font = '10px "Inter", sans-serif';
      ctx.fillText(`${i}s`, x + 6, height - 10);
    }
  }

  function loadAndRenderSpectrogram(bird) {
    if (spectrogramImageCache[bird.id]) {
      drawSpectrogramImage(spectrogramImageCache[bird.id]);
      return;
    }

    // Show loading state
    ctx.fillStyle = '#0c0a08';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(245, 237, 224, 0.5)';
    ctx.font = '13px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Loading spectrogram...', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'left';

    const img = new Image();
    img.onload = () => {
      spectrogramImageCache[bird.id] = img;
      drawSpectrogramImage(img);
    };
    img.onerror = (err) => {
      console.warn('Failed to load static spectrogram image, falling back to procedural:', err);
      renderActiveProceduralSpectrogram();
    };
    img.src = bird.spectrogramUrl;
  }

  function drawSpectrogramImage(img) {
    const W = canvas.width;
    const H = canvas.height;
    ctx.drawImage(img, 0, 0, W, H);
    drawSpectrogramOverlay(W, H);
  }

  function drawSpectrogramOverlay(width, height) {
    ctx.strokeStyle = 'rgba(245, 237, 224, 0.08)';
    ctx.lineWidth = 1;
    
    const labels = ['8 kHz', '6 kHz', '4 kHz', '2 kHz'];
    for (let i = 1; i <= 4; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(245, 237, 224, 0.4)';
      ctx.font = '10px "Inter", sans-serif';
      ctx.fillText(labels[i - 1], 15, y - 6);
    }
    
    for (let i = 1; i <= 4; i++) {
      const x = (width / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      ctx.fillStyle = 'rgba(245, 237, 224, 0.4)';
      ctx.font = '10px "Inter", sans-serif';
      ctx.fillText(`${i}s`, x + 6, height - 10);
    }
  }

  function renderActiveProceduralSpectrogram() {
    drawGrid(ctx, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(245, 237, 224, 0.4)';
    ctx.font = '13px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Spectrogram image failed to load', canvas.width / 2, canvas.height / 2);
    ctx.textAlign = 'left';
  }

  function renderActiveSpectrogram() {
    const activeBird = birds[activeBirdIndex];
    loadAndRenderSpectrogram(activeBird);
  }

  function updateInfoPanel() {
    const bird = birds[activeBirdIndex];
    infoPanel.innerHTML = `
      <div>
        <div class="info-title">${bird.name}</div>
        <span class="info-sci">${bird.scientific}</span>
      </div>
      <div class="info-desc">${bird.description}</div>
      <div class="bird-photo-container">
        <img class="bird-photo" src="${bird.imageUrl}" alt="${bird.name}" onload="this.classList.add('loaded')">
      </div>
    `;
  }

  function renderTabs() {
    tabsContainer.innerHTML = '';
    birds.forEach((bird, idx) => {
      const tab = document.createElement('button');
      tab.className = `bird-tab ${idx === activeBirdIndex ? 'active' : ''}`;
      tab.textContent = bird.name;
      tab.addEventListener('click', () => {
        if (idx === activeBirdIndex) return;
        selectBird(idx);
      });
      tabsContainer.appendChild(tab);
    });
  }

  function selectBird(index) {
    // Stop current audio and animation
    audio.pause();
    audio.currentTime = 0;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    activeBirdIndex = index;
    renderTabs();
    updateInfoPanel();
    renderActiveSpectrogram();

    // Reset play/pause states
    playBtn.querySelector('span').textContent = 'Listen to Song';
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    playhead.style.display = 'none';

    // Load new audio source
    audio.src = birds[activeBirdIndex].audioUrl;
    audio.load();
  }

  function updatePlayhead() {
    if (!audio.paused) {
      const activeBird = birds[activeBirdIndex];
      const duration = activeBird.duration;

      // Stop playback when reaching the end of the visualizer duration
      if (audio.currentTime >= duration) {
        audio.pause();
        audio.currentTime = 0;
        playBtn.querySelector('span').textContent = 'Listen to Song';
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        playhead.style.display = 'none';
        playhead.style.left = '0%';
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        return;
      }

      const progress = audio.currentTime / duration;
      const percent = Math.min(progress * 100, 100);

      playhead.style.left = `${percent}%`;

      animationId = requestAnimationFrame(updatePlayhead);
    }
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      // Chrome/Safari AudioContext unlock
      const audioCtx = window.AudioContext || window.webkitAudioContext;
      if (audioCtx) {
        const tempCtx = new audioCtx();
        if (tempCtx.state === 'suspended') {
          tempCtx.resume();
        }
      }

      audio.play()
        .then(() => {
          playBtn.querySelector('span').textContent = 'Pause Song';
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'inline';
          playhead.style.display = 'block';
          updatePlayhead();
        })
        .catch(err => {
          console.warn('Audio playback failed: ', err);
          // If public Wikimedia links block due to connection/CORS, we simulate playback!
          simulatePlayback();
        });
    } else {
      audio.pause();
      playBtn.querySelector('span').textContent = 'Listen to Song';
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }
  });

  // Simulated playback fallback if audio files are offline/blocked
  let simStartTime = 0;
  let simDuration = 0;
  let isSimulating = false;

  function simulatePlayback() {
    isSimulating = true;
    playhead.style.display = 'block';
    playBtn.querySelector('span').textContent = 'Pause (Simulated)';
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';

    simStartTime = Date.now();
    simDuration = birds[activeBirdIndex].duration * 1000;

    function step() {
      if (!isSimulating) return;

      const elapsed = Date.now() - simStartTime;
      const progress = elapsed / simDuration;

      if (progress >= 1.0) {
        // Stop
        isSimulating = false;
        playhead.style.left = '0%';
        playhead.style.display = 'none';
        playBtn.querySelector('span').textContent = 'Listen to Song';
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      } else {
        playhead.style.left = `${progress * 100}%`;
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Audio completion handler
  audio.addEventListener('ended', () => {
    playBtn.querySelector('span').textContent = 'Listen to Song';
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    playhead.style.display = 'none';
    playhead.style.left = '0%';
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  // Handle manual pause if audio breaks or pauses externally
  audio.addEventListener('pause', () => {
    if (!isSimulating) {
      playBtn.querySelector('span').textContent = 'Listen to Song';
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
    }
  });

  // Handle window resize or layout changes
  window.addEventListener('resize', () => {
    // Spectrogram doesn't change on simple resize but keep playhead synced
    renderActiveSpectrogram();
  });

  // Initialize
  resizeCanvas();
  renderTabs();
  updateInfoPanel();
  audio.src = birds[activeBirdIndex].audioUrl;
  audio.load();
});
