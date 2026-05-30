/* DATA FORGE OFFICIAL WEBSITE - INTERACTIVE TERMINAL ENGINE */

document.addEventListener('DOMContentLoaded', () => {

  // Text Scrambler Class for futuristic resolving text animations
  class TextScrambler {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________010101';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText || '';
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // ==========================================
  // 1. CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('custom-cursor');
  const glow = document.getElementById('cursor-glow');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;
  
  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Hide custom cursor on touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    cursor.style.display = 'none';
    glow.style.display = 'none';
    document.body.classList.add('touch-device');
  }

  // Smooth Interpolated Follower (Lerp)
  function updateCursor() {
    if (!isTouchDevice) {
      // Reticle follows almost instantly
      cursorX += (mouseX - cursorX) * 0.4;
      cursorY += (mouseY - cursorY) * 0.4;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      // Shadow glow trails with lag
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Click Particle Burst Effect
  window.addEventListener('click', (e) => {
    if (isTouchDevice) return;
    
    // Spawn ripple
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Spawn 4-6 particles
    const particleCount = 5 + Math.floor(Math.random() * 2);
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);

      // Random direction vectors
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      let px = e.clientX;
      let py = e.clientY;
      let opacity = 1;
      let scale = 1;
      
      const particleAnim = () => {
        px += vx;
        py += vy;
        opacity -= 0.05;
        scale -= 0.03;
        
        particle.style.transform = `translate(${px - e.clientX}px, ${py - e.clientY}px) scale(${Math.max(0, scale)})`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(particleAnim);
        } else {
          particle.remove();
        }
      };
      
      requestAnimationFrame(particleAnim);
    }
  });

  // Hover states logic for custom cursor
  const hoverSelectors = 'a, button, .event-card, .org-node, .cta-button, .nav-toggle, .wa-btn';
  
  function bindCursorHovers() {
    if (isTouchDevice) return;
    document.querySelectorAll(hoverSelectors).forEach(elem => {
      // Avoid duplicate binding
      if (elem.dataset.cursorBound) return;
      elem.dataset.cursorBound = true;
      
      elem.addEventListener('mouseenter', () => {
        glow.classList.add('cursor-hover');
      });
      elem.addEventListener('mouseleave', () => {
        glow.classList.remove('cursor-hover');
      });
    });
  }
  bindCursorHovers();


  // ==========================================
  // 2. BACKGROUND CANVAS ANIMATION
  // ==========================================
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    setupConstellationCenters();
    drawOrgConnectors(); // Redraw leadership tree paths on resize
  });

  const nodeCount = 90;
  const nodes = [];
  const maxConnectDist = 110;
  
  // Animation state controls
  let animationTime = 0;
  let morphTimer = 0;
  let currentShape = 'scatter'; // 'scatter', 'morphing', 'constellation', 'dissolving'
  let targetShapeName = 'scatter'; // 'bell', 'scatter_plot', 'kmeans', 'sine'
  const shapeNames = ['bell', 'scatter_plot', 'kmeans', 'sine'];
  let shapeIndex = 0;
  
  // Shape coordinates anchors
  let shapeCenters = {
    centerX: width / 2,
    centerY: height / 2,
    bellStdDev: 120,
    bellAmp: 180,
    sineAmp: 100,
    sineFreq: 0.005,
    kmeansCenters: []
  };

  function setupConstellationCenters() {
    const cx = width / 2;
    const cy = height / 2;
    shapeCenters = {
      centerX: cx,
      centerY: cy,
      bellStdDev: width * 0.12,
      bellAmp: height * 0.28,
      sineAmp: height * 0.2,
      sineFreq: (Math.PI * 2) / (width * 0.8),
      kmeansCenters: [
        { x: cx - width * 0.2, y: cy - height * 0.15, r: 8, color: '#00FF27' },
        { x: cx + width * 0.2, y: cy - height * 0.15, r: 8, color: '#76E876' },
        { x: cx, y: cy + height * 0.2, r: 8, color: '#2DBA2D' }
      ]
    };
  }
  setupConstellationCenters();

  // Initialize nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      // Scatter kinematics
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      
      // Interpolation target positions
      tx: 0,
      ty: 0,
      lerpDelay: Math.random() * 0.3, // organic assembly delay
      
      // Unique particle signature
      size: 1 + Math.random() * 2,
      clusterIdx: i % 3 // Assigned cluster for k-means
    });
  }

  // Data Science Drifting Mathematical Symbols (drifts slowly upwards)
  const symbolChars = ['Σ', 'μ', 'σ', 'f(x)', 'R²', 'β', 'λ', 'θ', 'P(A|B)', 'dy/dx', '√x', 'log(n)', 'matrix[N]', 'ŷ', 'H₀', 'x̄', 'χ²', 'z-score'];
  const mathSymbols = [];
  const symbolCount = 20;
  
  for (let i = 0; i < symbolCount; i++) {
    mathSymbols.push({
      x: Math.random() * width,
      y: Math.random() * height,
      text: symbolChars[Math.floor(Math.random() * symbolChars.length)],
      size: 11 + Math.random() * 14,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -0.15 - Math.random() * 0.25,
      opacity: 0.03 + Math.random() * 0.04
    });
  }

  // Data spark packets running along connected nodes
  const sparks = [];

  // Sonar Rings
  const sonarRings = [];
  function spawnSonar() {
    sonarRings.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0,
      maxR: 150 + Math.random() * 150,
      opacity: 0.12,
      speed: 0.8 + Math.random() * 0.8
    });
    // Reschedule next sonar
    setTimeout(spawnSonar, 5000 + Math.random() * 3000);
  }
  // Start sonar pings
  setTimeout(spawnSonar, 2000);

  // Computes shape coordinate targets for each particle
  function assignShapeTargets(shapeName) {
    const cx = shapeCenters.centerX;
    const cy = shapeCenters.centerY;

    nodes.forEach((node, idx) => {
      if (shapeName === 'bell') {
        // Normal Distribution Bell Curve
        // Distribute along X axis from 15% to 85% width
        const fraction = (idx / nodeCount);
        const xPos = width * 0.15 + fraction * (width * 0.7);
        // Gaussian Formula: y = A * e^(-(x-x0)^2 / 2c^2)
        const diff = xPos - cx;
        const gaussian = Math.exp(-Math.pow(diff, 2) / (2 * Math.pow(shapeCenters.bellStdDev, 2)));
        const yPos = cy + height * 0.1 - (gaussian * shapeCenters.bellAmp);
        node.tx = xPos;
        node.ty = yPos;
      } 
      else if (shapeName === 'scatter_plot') {
        // Multi-cluster scatter plot (3 dense clusters)
        const cluster = idx % 3;
        let cCenterX = cx;
        let cCenterY = cy;
        
        if (cluster === 0) {
          cCenterX = cx - width * 0.2;
          cCenterY = cy - height * 0.1;
        } else if (cluster === 1) {
          cCenterX = cx + width * 0.2;
          cCenterY = cy - height * 0.1;
        } else {
          cCenterX = cx;
          cCenterY = cy + height * 0.15;
        }
        
        // Random gaussian dispersion
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 1.5) * (width * 0.08); // denser center
        node.tx = cCenterX + Math.cos(angle) * radius;
        node.ty = cCenterY + Math.sin(angle) * radius;
      } 
      else if (shapeName === 'kmeans') {
        // Similar to scatter plot but closer to centroids
        const cluster = node.clusterIdx;
        const centroid = shapeCenters.kmeansCenters[cluster];
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 2) * (width * 0.06); 
        node.tx = centroid.x + Math.cos(angle) * radius;
        node.ty = centroid.y + Math.sin(angle) * radius;
      } 
      else if (shapeName === 'sine') {
        // Sine wave
        const fraction = (idx / nodeCount);
        const xPos = width * 0.15 + fraction * (width * 0.7);
        const angle = (xPos - (width * 0.15)) * shapeCenters.sineFreq;
        const yPos = cy + Math.sin(angle) * shapeCenters.sineAmp;
        node.tx = xPos;
        node.ty = yPos;
      }
    });
  }

  // State Controller for Morphing Constellations
  // Scatter (10s) -> Morphing (2s) -> Constellation (3s) -> Dissolving (2s)
  function manageConstellationState() {
    morphTimer += 16.67; // approx ms per frame
    
    if (currentShape === 'scatter') {
      if (morphTimer > 10000) {
        // Move to morphing state
        targetShapeName = shapeNames[shapeIndex];
        assignShapeTargets(targetShapeName);
        currentShape = 'morphing';
        morphTimer = 0;
      }
    } 
    else if (currentShape === 'morphing') {
      if (morphTimer > 2500) {
        currentShape = 'constellation';
        morphTimer = 0;
      }
    } 
    else if (currentShape === 'constellation') {
      if (morphTimer > 3500) {
        currentShape = 'dissolving';
        morphTimer = 0;
      }
    } 
    else if (currentShape === 'dissolving') {
      if (morphTimer > 2000) {
        currentShape = 'scatter';
        morphTimer = 0;
        // Cycle shape
        shapeIndex = (shapeIndex + 1) % shapeNames.length;
      }
    }
  }

  // Core background draw loop
  function drawBackground() {
    animationTime += 0.015;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // A. Draw Drifting Data Science Symbols
    mathSymbols.forEach(symbol => {
      symbol.x += symbol.speedX;
      symbol.y += symbol.speedY;
      
      // Wrap-around screen bounds
      if (symbol.y < -30) {
        symbol.y = height + 30;
        symbol.x = Math.random() * width;
      }
      if (symbol.x < -30 || symbol.x > width + 30) {
        symbol.x = Math.random() * width;
        symbol.y = height + 30;
      }
      
      ctx.font = `italic 500 ${symbol.size}px 'Share Tech Mono', monospace`;
      ctx.fillStyle = `rgba(0, 255, 39, ${symbol.opacity})`;
      ctx.fillText(symbol.text, symbol.x, symbol.y);
    });

    // B. Spawn Spark Packets along connection lines
    if (Math.random() < 0.018 && sparks.length < 15) {
      const i = Math.floor(Math.random() * nodeCount);
      const neighbors = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxConnectDist) {
          neighbors.push(j);
        }
      }
      if (neighbors.length > 0) {
        const targetIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
        sparks.push({
          startNode: nodes[i],
          endNode: nodes[targetIdx],
          progress: 0,
          speed: 0.012 + Math.random() * 0.02
        });
      }
    }

    // C. Draw and Update Spark Packets
    sparks.forEach((spark, idx) => {
      spark.progress += spark.speed;
      if (spark.progress >= 1) {
        sparks.splice(idx, 1);
        return;
      }
      
      const x = spark.startNode.x + (spark.endNode.x - spark.startNode.x) * spark.progress;
      const y = spark.startNode.y + (spark.endNode.y - spark.startNode.y) * spark.progress;
      
      ctx.shadowColor = '#00FF27';
      ctx.shadowBlur = 6;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    });

    manageConstellationState();

    // 1. Draw Grid Overlay with slow breathing breathing pulse
    // Breathe amplitude: 0.12 to 0.22 opacity
    const gridOpacity = 0.14 + Math.sin(animationTime * 0.8) * 0.05;
    ctx.strokeStyle = `rgba(10, 92, 10, ${gridOpacity})`;
    ctx.lineWidth = 0.5;
    
    const gridSize = 40;
    // Vertical grid lines
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    // Horizontal grid lines
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Draw Sonar Rings
    sonarRings.forEach((ring, idx) => {
      ring.r += ring.speed;
      ring.opacity = 0.12 * (1 - ring.r / ring.maxR);
      
      ctx.strokeStyle = `rgba(45, 186, 45, ${Math.max(0, ring.opacity)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.stroke();
      
      // Remove rings that expanded fully
      if (ring.r >= ring.maxR) {
        sonarRings.splice(idx, 1);
      }
    });

    // 3. Draw K-Means Centroids if in K-Means constellation
    if (targetShapeName === 'kmeans' && (currentShape === 'morphing' || currentShape === 'constellation')) {
      const animFade = currentShape === 'morphing' ? (morphTimer / 2500) : (currentShape === 'constellation' ? 1 : 0);
      
      shapeCenters.kmeansCenters.forEach(centroid => {
        ctx.fillStyle = centroid.color;
        ctx.shadowColor = '#00FF27';
        ctx.shadowBlur = 10 * animFade;
        ctx.beginPath();
        // Draw centroid as a glowing crosshair node
        ctx.arc(centroid.x, centroid.y, centroid.r * animFade, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        ctx.strokeStyle = 'rgba(0, 255, 39, ' + (0.3 * animFade) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centroid.x - 15, centroid.y);
        ctx.lineTo(centroid.x + 15, centroid.y);
        ctx.moveTo(centroid.x, centroid.y - 15);
        ctx.lineTo(centroid.x, centroid.y + 15);
        ctx.stroke();
      });
    }

    // 4. Update Node coordinates
    nodes.forEach(node => {
      if (currentShape === 'scatter') {
        // Natural drift kinematics
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce bounds
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      } 
      else if (currentShape === 'morphing') {
        // Smooth lerping with staggered organic delay
        const delayFactor = Math.max(0, (morphTimer / 2500) - node.lerpDelay);
        const progress = Math.min(1, delayFactor / (1 - node.lerpDelay));
        
        // Quad ease out formula
        const ease = 1 - Math.pow(1 - progress, 2);
        
        // Target lerp positions
        node.x = node.x + (node.tx - node.x) * ease * 0.15;
        node.y = node.y + (node.ty - node.y) * ease * 0.15;
      } 
      else if (currentShape === 'constellation') {
        // Gently sway in morph target positions
        const driftX = Math.sin(animationTime + node.lerpDelay * 10) * 0.15;
        const driftY = Math.cos(animationTime + node.lerpDelay * 10) * 0.15;
        node.x = node.tx + driftX;
        node.y = node.ty + driftY;
      } 
      else if (currentShape === 'dissolving') {
        // Drift outwards from constellation position back to scatter kinematics
        node.x += node.vx * 1.5;
        node.y += node.vy * 1.5;
        
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    });

    // 5. Draw Network connections
    // Node connects to neighbors with line opacity representing proximity
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxConnectDist) {
          // Opacity depends on proximity
          let baseOpacity = (1 - dist / maxConnectDist) * 0.12;
          
          // Boost lines drawing to k-means centroids
          if (targetShapeName === 'kmeans' && (currentShape === 'morphing' || currentShape === 'constellation')) {
            const centroid1 = shapeCenters.kmeansCenters[nodes[i].clusterIdx];
            const centroid2 = shapeCenters.kmeansCenters[nodes[j].clusterIdx];
            // If they belong to same cluster, connect them slightly brighter
            if (nodes[i].clusterIdx === nodes[j].clusterIdx) {
              baseOpacity *= 1.8;
            }
          }
          
          ctx.strokeStyle = `rgba(0, 255, 39, ${baseOpacity})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // 6. Draw Nodes
    nodes.forEach(node => {
      ctx.fillStyle = 'rgba(0, 255, 39, 0.5)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawBackground);
  }
  drawBackground();


  // ==========================================
  // 3. HERO GLITCH & TYPEWRITER TAGLINE
  // ==========================================
  const heroHeading = document.getElementById('hero-heading');
  const taglineElem = document.getElementById('typewriter-tagline');
  
  // Tagline Typing Setup
  const taglineText = "Forging Data Scientists. One Dataset at a Time.";
  let taglineIdx = 0;
  
  function startTypewriter() {
    taglineElem.innerHTML = '';
    taglineElem.classList.add('typewriter-cursor');
    
    function typeChar() {
      if (taglineIdx < taglineText.length) {
        taglineElem.innerHTML += taglineText.charAt(taglineIdx);
        taglineIdx++;
        setTimeout(typeChar, 40 + Math.random() * 20); // human-like typing jitter
      } else {
        taglineElem.classList.remove('typewriter-cursor');
      }
    }
    typeChar();
  }

  // Trigger typewriter 500ms after load
  setTimeout(startTypewriter, 500);

  // Text scramble on hero heading on load and loop
  const heroScrambler = new TextScrambler(heroHeading);
  
  function triggerHeroGlitch() {
    heroScrambler.setText('DATA FORGE');
    heroHeading.classList.add('glitch-active');
    setTimeout(() => {
      heroHeading.classList.remove('glitch-active');
    }, 400); // match animation duration
  }

  // Run glitch on load and trigger every 10 seconds
  setTimeout(triggerHeroGlitch, 150);
  setInterval(triggerHeroGlitch, 10000);


  // ==========================================
  // 4. STAT COUNTERS COUNT UP
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const duration = 1200; // ms
      const stepTime = Math.max(10, Math.floor(duration / target));
      
      const timer = setInterval(() => {
        count++;
        stat.textContent = count;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, stepTime);
    });
  }

  // ==========================================
  // 5. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTS
  // ==========================================
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // 1. Shrink nav height on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 2. Section scroll tracking
    let currentActiveId = '';
    const scrollPos = window.scrollY + 120; // offset for nav header height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveId}`) {
        link.classList.add('active');
      }
    });
    
    // 3. Counter trigger check (Hero section is always in viewport first, run if within scroll bounds)
    if (!statsTriggered && window.scrollY < 200) {
      statsTriggered = true;
      runCounters();
    }

    // 4. Draw timeline progress on scroll
    drawTimelineProgress();
  });

  // Mobile Hamburger menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });

  // Close nav menu on link clicks (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });

  // Nav links text scramble animation on hover
  navLinks.forEach(link => {
    const originalText = link.innerText;
    const linkScrambler = new TextScrambler(link);
    link.addEventListener('mouseenter', () => {
      linkScrambler.setText(originalText);
    });
  });

  // Explore button smooth scroll
  document.getElementById('hero-cta').addEventListener('click', () => {
    const eventsSection = document.getElementById('events');
    window.scrollTo({
      top: eventsSection.offsetTop - 60,
      behavior: 'smooth'
    });
  });


  // ==========================================
  // 6. TIMELINE PROGRESS DRAWING ON SCROLL
  // ==========================================
  const eventsSection = document.getElementById('events');
  const timelineProgressFill = document.getElementById('timeline-progress-fill');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  function drawTimelineProgress() {
    if (!eventsSection) return;
    
    const secTop = eventsSection.offsetTop;
    const secHeight = eventsSection.offsetHeight;
    const scrollY = window.scrollY;
    const viewHeight = window.innerHeight;
    
    // Calculate progress as scroll moves through events section
    // Start progress when top of events section enters viewport
    // End progress when bottom of events section leaves viewport
    const startPoint = secTop - viewHeight / 2;
    const endPoint = secTop + secHeight - viewHeight / 2;
    
    let progress = (scrollY - startPoint) / (endPoint - startPoint);
    progress = Math.max(0, Math.min(1, progress));
    
    // Convert to percentage
    const fillPercent = progress * 100;
    timelineProgressFill.style.width = `${fillPercent}%`;
    
    // Check nodes reached (CH.01 = 0% progress, CH.02 = ~33%, CH.03 = ~66%, CH.04 = 100%)
    const thresholds = [0, 0.28, 0.62, 0.95];
    timelineNodes.forEach((node, index) => {
      if (progress >= thresholds[index]) {
        node.classList.add('reached');
      } else {
        node.classList.remove('reached');
      }
    });
  }


  // ==========================================
  // 7. INTERSECTION OBSERVER - SCROLL FADEUPS
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // If it's a section header, trigger text scramble and glitch resolution
        const title = entry.target.querySelector('.glitch-hover');
        if (title) {
          const originalText = title.getAttribute('data-text') || title.innerText;
          const titleScrambler = new TextScrambler(title);
          titleScrambler.setText(originalText);
          
          title.classList.add('glitch-active');
          setTimeout(() => title.classList.remove('glitch-active'), 500);
        }

        // If it's the about section mission-block, animate objectives list
        if (entry.target.classList.contains('mission-block')) {
          animateObjectives();
        }

        // If it's the about section leadership chart, animate tree nodes
        if (entry.target.classList.contains('leadership-block')) {
          animateLeadershipNodes();
        }
        
        // Stop observing once visible
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-fade class
  document.querySelectorAll('.scroll-fade').forEach(item => {
    observer.observe(item);
  });
  
  // Stagger animate chapters in events list
  const chapterBlocks = document.querySelectorAll('.chapter-block');
  const chapterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chapterBlocks.forEach((block, idx) => {
          setTimeout(() => {
            block.classList.add('visible');
          }, idx * 180); // Stagger 180ms apart
        });
        obs.disconnect(); // Stagger load once for all chapters
      }
    });
  }, observerOptions);
  
  if (chapterBlocks.length > 0) {
    chapterObserver.observe(document.querySelector('.chapters-container'));
  }

  // Animate bullet list in Mission section
  function animateObjectives() {
    const listItems = document.querySelectorAll('.objective-item');
    listItems.forEach((item, idx) => {
      setTimeout(() => {
        item.classList.add('animate-in');
      }, idx * 120); // Stagger 120ms
    });
  }

  // Animate org chart nodes in Leadership section
  function animateLeadershipNodes() {
    const nodes = document.querySelectorAll('.org-node');
    nodes.forEach((node, idx) => {
      setTimeout(() => {
        node.classList.add('visible');
        
        // If last batch loaded, draw paths
        if (idx === nodes.length - 1) {
          setTimeout(drawOrgConnectors, 250);
        }
      }, idx * 120); // Stagger 120ms top-to-bottom
    });
  }


  // ==========================================
  // 8. INTERACTIVE LEADERSHIP ORG CHART
  // ==========================================
  const tooltip = document.getElementById('org-tooltip');
  const orgNodes = document.querySelectorAll('.org-node');
  const orgContainer = document.querySelector('.org-chart-container');
  const connectorsSvg = document.getElementById('org-connectors-svg');

  // Hover node tooltip positions and text
  orgNodes.forEach(node => {
    node.addEventListener('mouseenter', (e) => {
      const roleName = node.getAttribute('data-role');
      const roleDesc = node.getAttribute('data-desc');
      
      tooltip.innerHTML = `<strong>${roleName}</strong><br>${roleDesc}`;
      tooltip.style.opacity = 1;
      
      // Compute tooltip coordinates
      const containerRect = orgContainer.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      
      const x = (nodeRect.left - containerRect.left) + nodeRect.width / 2;
      const y = (nodeRect.top - containerRect.top) - 10;
      
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.style.transform = `scale(1) translate(-50%, -100%)`;
      
      // Node glow effect expansion
      node.style.borderColor = 'var(--accent-glow)';
    });

    node.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
      tooltip.style.transform = `scale(0.9) translate(-50%, -100%)`;
      node.style.borderColor = 'var(--accent-soft)';
    });
  });

  // Dynamically draw connector paths between nodes on desktop
  function drawOrgConnectors() {
    // Empty connectors SVG first
    connectorsSvg.innerHTML = '';
    
    // Skip SVG rendering on mobile viewports
    if (window.innerWidth <= 768) return;
    
    const containerRect = orgContainer.getBoundingClientRect();
    const rows = document.querySelectorAll('.org-row');
    if (rows.length < 4) return;
    
    // Nodes references
    const presNode = rows[0].querySelector('.org-node');
    const vpNode = rows[1].querySelector('.org-node');
    const secNode = rows[2].querySelector('.org-node');
    const leadNodes = rows[3].querySelectorAll('.org-node');
    
    if (!presNode || !vpNode || !secNode || leadNodes.length === 0) return;

    // Helper to get relative coordinates
    const getRelCoords = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
        cx: (rect.left - containerRect.left) + rect.width / 2,
        cy: (rect.top - containerRect.top) + rect.height / 2
      };
    };

    const pres = getRelCoords(presNode);
    const vp = getRelCoords(vpNode);
    const sec = getRelCoords(getRelCoords(secNode).width > 0 ? secNode : rows[2].querySelector('.org-node')); // safe-check
    const secCoords = getRelCoords(secNode);

    // 1. Line: President Bottom -> VP Top
    createPath(pres.cx, pres.top + pres.height, vp.cx, vp.top);
    
    // 2. Line: VP Bottom -> Secretary Top
    createPath(vp.cx, vp.top + vp.height, secCoords.cx, secCoords.top);

    // 3. Branching lines from Secretary Bottom to 7 leads
    // Draw a single main horizontal stem and vertical drop branches to each lead
    const secBottomX = secCoords.cx;
    const secBottomY = secCoords.top + secCoords.height;
    
    // Determine bounds for horizontal stem line
    let minX = Infinity;
    let maxX = -Infinity;
    const leadCoords = [];

    leadNodes.forEach(node => {
      const coords = getRelCoords(node);
      leadCoords.push(coords);
      if (coords.cx < minX) minX = coords.cx;
      if (coords.cx > maxX) maxX = coords.cx;
    });

    const stemY = secBottomY + (leadCoords[0].top - secBottomY) / 2;

    // Line from Secretary down to horizontal stem
    createPath(secBottomX, secBottomY, secBottomX, stemY);
    
    // Horizontal stem line connecting extremes
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${minX} ${stemY} L ${maxX} ${stemY}`);
    connectorsSvg.appendChild(path);
    
    // Vertical branches down to each lead top
    leadCoords.forEach(lead => {
      createPath(lead.cx, stemY, lead.cx, lead.top);
    });
  }

  function createPath(x1, y1, x2, y2) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
    connectorsSvg.appendChild(path);
  }

  // Initial draw delay to ensure layouts are settled
  setTimeout(drawOrgConnectors, 500);


  // ==========================================
  // 9. DYNAMIC CYCLING WHOCANJOIN BRANCH STRIP
  // ==========================================
  const words = document.querySelectorAll('.carousel-word');
  let currentWordIdx = 0;

  function cycleWhoCanJoin() {
    const currentWord = words[currentWordIdx];
    currentWord.classList.remove('active');
    currentWord.classList.add('exit');
    
    // Delay to let exit transition finish
    setTimeout(() => {
      currentWord.classList.remove('exit');
    }, 500);

    currentWordIdx = (currentWordIdx + 1) % words.length;
    words[currentWordIdx].classList.add('active');
  }

  // Cycle word every 2 seconds
  if (words.length > 0) {
    setInterval(cycleWhoCanJoin, 2000);
  }


  // ==========================================
  // 10. INFINITE SCROLLING BINARY FOOTER STRIP
  // ==========================================
  const marquee = document.getElementById('binary-marquee');
  
  function generateBinaryString() {
    let binary = '';
    // Generate a long binary string to fill multiple screen widths
    const charCount = 350;
    for (let i = 0; i < charCount; i++) {
      binary += Math.round(Math.random()) + (Math.random() > 0.85 ? ' ' : '');
    }
    // Repeat it twice to allow seamless loop scrolling
    marquee.textContent = `${binary}  ${binary}`;
  }
  
  if (marquee) {
    generateBinaryString();
  }

  // Re-bind hover events for dynamically added buttons/elements if any
  setInterval(bindCursorHovers, 2000);
});
