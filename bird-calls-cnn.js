document.addEventListener('DOMContentLoaded', () => {
  const birds = [
    {
      id: 'robin',
      name: 'American Robin',
      scientific: 'Turdus migratorius',
      audioUrl: './files/audio/robin.wav',
      duration: 3.5,
      description: 'A cheerful, warbling song featuring rising and falling pitches.',
      annotations: [
        { time: 0.5, label: 'Introductory warble (3.2 kHz)' },
        { time: 1.8, label: 'Rising pitch phrase (4.5 kHz)' },
        { time: 2.9, label: 'Falling pitch tail' }
      ],
      drawSpectrogram: (ctx, width, height) => {
        // Draw background grid
        drawGrid(ctx, width, height);

        // Draw Robin calls (warbling arched segments)
        ctx.strokeStyle = '#d65d30';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#d65d30';

        // Warble 1
        ctx.beginPath();
        ctx.moveTo(width * 0.1, height * 0.6);
        ctx.bezierCurveTo(width * 0.15, height * 0.5, width * 0.2, height * 0.5, width * 0.25, height * 0.6);
        ctx.stroke();

        // Warble 2
        ctx.strokeStyle = '#ff8f5a';
        ctx.shadowColor = '#ff8f5a';
        ctx.beginPath();
        ctx.moveTo(width * 0.35, height * 0.65);
        ctx.bezierCurveTo(width * 0.42, height * 0.35, width * 0.48, height * 0.35, width * 0.55, height * 0.6);
        ctx.stroke();

        // Warble 3
        ctx.strokeStyle = '#d65d30';
        ctx.shadowColor = '#d65d30';
        ctx.beginPath();
        ctx.moveTo(width * 0.65, height * 0.5);
        ctx.bezierCurveTo(width * 0.7, height * 0.6, width * 0.75, height * 0.6, width * 0.8, height * 0.75);
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;
      }
    },
    {
      id: 'sparrow',
      name: 'Fox Sparrow',
      scientific: 'Passerella iliaca',
      audioUrl: './files/audio/sparrow.wav',
      duration: 4.2,
      description: 'A rich, musical song featuring clear, whistling notes followed by short slurs and a final buzz.',
      annotations: [
        { time: 0.6, label: 'Clear introductory whistles (2.8 kHz)' },
        { time: 1.8, label: 'Steep frequency sweeps and slurs' },
        { time: 3.2, label: 'Terminating buzzy notes (4.2 kHz)' }
      ],
      drawSpectrogram: (ctx, width, height) => {
        drawGrid(ctx, width, height);

        ctx.strokeStyle = '#d65d30';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#d65d30';

        // Whistle 1 (Intro)
        ctx.beginPath();
        ctx.moveTo(width * 0.08, height * 0.6);
        ctx.bezierCurveTo(width * 0.12, height * 0.52, width * 0.18, height * 0.52, width * 0.22, height * 0.6);
        ctx.stroke();

        // Whistle 2 (Intro)
        ctx.beginPath();
        ctx.moveTo(width * 0.25, height * 0.55);
        ctx.bezierCurveTo(width * 0.28, height * 0.47, width * 0.32, height * 0.47, width * 0.35, height * 0.55);
        ctx.stroke();

        // Steep sweeps (slurs)
        ctx.strokeStyle = '#ff8f5a';
        ctx.shadowColor = '#ff8f5a';
        ctx.lineWidth = 4;

        // Sweep 1
        ctx.beginPath();
        ctx.moveTo(width * 0.42, height * 0.35);
        ctx.lineTo(width * 0.48, height * 0.7);
        ctx.stroke();

        // Sweep 2
        ctx.beginPath();
        ctx.moveTo(width * 0.52, height * 0.3);
        ctx.lineTo(width * 0.58, height * 0.65);
        ctx.stroke();

        // Final buzz (thick, noisy horizontal bars)
        ctx.strokeStyle = '#d65d30';
        ctx.shadowColor = '#d65d30';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(width * 0.68, height * 0.5);
        ctx.lineTo(width * 0.85, height * 0.5);
        ctx.stroke();

        // Add some high frequency harmonics on top of the buzz
        ctx.strokeStyle = 'rgba(255, 143, 90, 0.4)';
        ctx.shadowBlur = 0;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.68, height * 0.35);
        ctx.lineTo(width * 0.85, height * 0.35);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }
    },
    {
      id: 'chickadee',
      name: 'Chestnut-backed Chickadee',
      scientific: 'Poecile rufescens',
      audioUrl: './files/audio/chickadee.wav',
      duration: 2.8,
      description: 'A rapid, buzzy, and husky "chick-a-dee" call.',
      annotations: [
        { time: 0.4, label: '"Chick" raspy note (5.0 kHz)' },
        { time: 1.2, label: '"A" transition sweep' },
        { time: 2.0, label: '"Dee-dee-dee" rapid trill' }
      ],
      drawSpectrogram: (ctx, width, height) => {
        drawGrid(ctx, width, height);

        // "Chick" notes (thin vertical spikes)
        ctx.strokeStyle = '#d65d30';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#d65d30';
        ctx.lineWidth = 3;

        const drawSpike = (x) => {
          ctx.beginPath();
          ctx.moveTo(x, height * 0.2);
          ctx.lineTo(x, height * 0.7);
          ctx.stroke();
        };

        drawSpike(width * 0.08);
        drawSpike(width * 0.12);
        drawSpike(width * 0.16);

        // "A" transition sweep (short diagonal line)
        ctx.strokeStyle = '#ff8f5a';
        ctx.shadowColor = '#ff8f5a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width * 0.3, height * 0.65);
        ctx.lineTo(width * 0.42, height * 0.35);
        ctx.stroke();

        // "Dee-dee-dee" trill (horizontal blocks)
        ctx.fillStyle = '#d65d30';
        ctx.shadowColor = '#d65d30';
        ctx.shadowBlur = 10;

        const drawDee = (startX) => {
          ctx.fillRect(startX, height * 0.4, width * 0.06, height * 0.1);
          ctx.fillRect(startX, height * 0.55, width * 0.06, height * 0.1);
        };

        drawDee(width * 0.52);
        drawDee(width * 0.62);
        drawDee(width * 0.72);
        drawDee(width * 0.82);

        ctx.shadowBlur = 0;
      }
    },
    {
      id: 'jay',
      name: "Steller's Jay",
      scientific: 'Cyanocitta stelleri',
      audioUrl: './files/audio/jay.wav',
      duration: 2.5,
      description: "A harsh, raspy scolding sound.",
      annotations: [
        { time: 0.4, label: 'Harsh wideband scold (1.5 - 7 kHz)' },
        { time: 1.2, label: 'Vertical harmonic scratch patterns' },
        { time: 2.0, label: 'Terminating raspy burst' }
      ],
      drawSpectrogram: (ctx, width, height) => {
        drawGrid(ctx, width, height);

        // Wideband scratchy blocks
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#d65d30';

        const drawScold = (startX, endX) => {
          for (let x = startX; x < endX; x += 4) {
            ctx.strokeStyle = Math.random() > 0.3 ? '#d65d30' : '#ff8f5a';
            ctx.lineWidth = 1.5 + Math.random() * 2;

            // Draw multiple short fragments vertically to simulate noise
            for (let y = height * 0.15; y < height * 0.85; y += 15) {
              if (Math.random() > 0.25) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + 10 + Math.random() * 8);
                ctx.stroke();
              }
            }
          }
        };

        drawScold(width * 0.1, width * 0.25);
        drawScold(width * 0.4, width * 0.55);
        drawScold(width * 0.7, width * 0.85);

        ctx.shadowBlur = 0;
      }
    },
    {
      id: 'junco',
      name: 'Dark-eyed Junco',
      scientific: 'Junco hyemalis',
      audioUrl: './files/audio/junco.wav',
      duration: 3.0,
      description: 'A fast, ringing trill that lasts around 2 seconds.',
      annotations: [
        { time: 0.3, label: 'Rapid trill onset' },
        { time: 1.5, label: 'Repetitive high-speed pulses (4.5 kHz)' },
        { time: 2.6, label: 'Gradual decay of trill intensity' }
      ],
      drawSpectrogram: (ctx, width, height) => {
        drawGrid(ctx, width, height);

        ctx.strokeStyle = '#ff8f5a';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff8f5a';
        ctx.lineWidth = 3;

        // Draw a series of diagonal downward-sweeping elements (rapid pulses)
        const pulseStart = width * 0.15;
        const pulseEnd = width * 0.85;
        for (let x = pulseStart; x < pulseEnd; x += 18) {
          ctx.beginPath();
          ctx.moveTo(x, height * 0.4);
          ctx.lineTo(x + 8, height * 0.65);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
      }
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
  const annotationEl = document.getElementById('spectrogram-annotation');
  const tabsContainer = document.getElementById('bird-tabs');
  const infoPanel = document.getElementById('info-panel');

  // Set logical size for canvas to ensure sharpness
  function resizeCanvas() {
    canvas.width = 800;
    canvas.height = 250;
    renderActiveSpectrogram();
  }

  // Draw background grid lines
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

  function renderActiveSpectrogram() {
    const activeBird = birds[activeBirdIndex];
    if (activeBird && activeBird.drawSpectrogram) {
      activeBird.drawSpectrogram(ctx, canvas.width, canvas.height);
    }
  }

  function updateInfoPanel() {
    const bird = birds[activeBirdIndex];
    infoPanel.innerHTML = `
      <div>
        <div class="info-title">${bird.name}</div>
        <span class="info-sci">${bird.scientific}</span>
      </div>
      <div class="info-desc">${bird.description}</div>
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
    annotationEl.style.opacity = 0;

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
        annotationEl.classList.remove('active');
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        return;
      }

      const progress = audio.currentTime / duration;
      const percent = Math.min(progress * 100, 100);

      playhead.style.left = `${percent}%`;

      // Check for active annotations
      const currentTime = audio.currentTime;
      let activeAnnotation = null;

      for (const ann of activeBird.annotations) {
        // Annotation is active within 0.8 seconds of its trigger time
        if (currentTime >= ann.time && currentTime <= ann.time + 0.8) {
          activeAnnotation = ann;
          break;
        }
      }

      if (activeAnnotation) {
        annotationEl.textContent = activeAnnotation.label;
        // Position annotation card above playhead (centered)
        const visualizerWidth = document.getElementById('visualizer-box').offsetWidth;
        let leftPos = (activeAnnotation.time / duration) * visualizerWidth - 90;

        // Boundaries checks
        if (leftPos < 10) leftPos = 10;
        if (leftPos > visualizerWidth - 190) leftPos = visualizerWidth - 190;

        annotationEl.style.left = `${leftPos}px`;
        annotationEl.style.top = `15px`;
        annotationEl.classList.add('active');
      } else {
        annotationEl.classList.remove('active');
      }

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
        annotationEl.classList.remove('active');
        playBtn.querySelector('span').textContent = 'Listen to Song';
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      } else {
        playhead.style.left = `${progress * 100}%`;

        // Annotation logic
        const currentTime = (elapsed / 1000);
        const activeBird = birds[activeBirdIndex];
        let activeAnnotation = null;
        for (const ann of activeBird.annotations) {
          if (currentTime >= ann.time && currentTime <= ann.time + 0.8) {
            activeAnnotation = ann;
            break;
          }
        }

        if (activeAnnotation) {
          annotationEl.textContent = activeAnnotation.label;
          const visualizerWidth = document.getElementById('visualizer-box').offsetWidth;
          let leftPos = (activeAnnotation.time / activeBird.duration) * visualizerWidth - 90;
          if (leftPos < 10) leftPos = 10;
          if (leftPos > visualizerWidth - 190) leftPos = visualizerWidth - 190;
          annotationEl.style.left = `${leftPos}px`;
          annotationEl.style.top = `15px`;
          annotationEl.classList.add('active');
        } else {
          annotationEl.classList.remove('active');
        }

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
    annotationEl.classList.remove('active');
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
