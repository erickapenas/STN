(() => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EFFECTS_KEY = "td_3d_effects_v1";

  // =========================================================
  // 1. SLIDING NAV TAB INDICATOR
  // =========================================================
  const navTabs = document.getElementById("mainNavTabs");
  const navIndicator = document.getElementById("navIndicator");

  function moveNavIndicator(btn) {
    if (!navTabs || !navIndicator || !btn) return;
    const navRect = navTabs.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - navRect.left;
    const top = btnRect.top - navRect.top;

    navIndicator.style.width = `${btnRect.width}px`;
    navIndicator.style.height = `${btnRect.height}px`;
    navIndicator.style.transform = `translate3d(${left - 6}px, ${top - 6}px, 0)`;
    navIndicator.style.opacity = "1";
    navTabs.classList.add("indicator-ready");
  }

  function syncActiveNavIndicator() {
    const activeBtn = navTabs ? navTabs.querySelector(".tab-btn.active") : null;
    if (activeBtn) moveNavIndicator(activeBtn);
  }

  if (navTabs) {
    navTabs.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        moveNavIndicator(btn);
        if (window.STNEffects && btn.dataset.tab) {
          window.STNEffects.setTheme(btn.dataset.tab);
          window.STNEffects.pulse(0.65);
        }
      });
    });
    window.addEventListener("resize", syncActiveNavIndicator, { passive: true });
    window.addEventListener("load", syncActiveNavIndicator);
    requestAnimationFrame(syncActiveNavIndicator);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncActiveNavIndicator);
    }
  }

  // =========================================================
  // 2. CLICK RIPPLE EFFECT ON BUTTONS
  // =========================================================
  if (!prefersReducedMotion) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest ? e.target.closest(".btn, .status-toggle-btn, .loadout-tab-btn") : null;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 0.65;
      const ripple = document.createElement("span");
      ripple.className = "ripple-wave";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 560);

      if (window.STNEffects) window.STNEffects.pulse(0.45);
    });
  }

  // =========================================================
  // 3. 3D TILT ON BRAND LOGO EMBLEM (rAF throttled)
  // =========================================================
  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo && !prefersReducedMotion) {
    let tiltRaf = 0;
    brandLogo.addEventListener("mousemove", (e) => {
      if (tiltRaf) return;
      tiltRaf = requestAnimationFrame(() => {
        tiltRaf = 0;
        const rect = brandLogo.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        brandLogo.style.transform = `perspective(420px) rotateX(${(-y * 16).toFixed(1)}deg) rotateY(${(x * 16).toFixed(1)}deg) scale(1.05)`;
      });
    }, { passive: true });
    brandLogo.addEventListener("mouseleave", () => {
      brandLogo.style.transform = "";
    });
  }

  // =========================================================
  // 4. GPU-ACCELERATED THREE.JS 3D ATMOSPHERE & EMBERS
  //    (100% GPU shaders, 2 draw calls total, capped DPR <= 1.5)
  // =========================================================
  const canvas = document.getElementById("emberCanvas");
  const toggleBtn = document.getElementById("btn3dEffectsToggle");

  let effectsEnabled = !prefersReducedMotion;
  try {
    const saved = localStorage.getItem(EFFECTS_KEY);
    if (saved === "0") effectsEnabled = false;
    else if (saved === "1" && !prefersReducedMotion) effectsEnabled = true;
  } catch {}

  const TAB_THEMES = {
    inventoryTab:  { c1: [0.96, 0.62, 0.05], c2: [0.98, 0.45, 0.09] }, // Amber / Fire
    indexTab:      { c1: [0.13, 0.77, 0.37], c2: [0.66, 0.33, 0.97] }, // Emerald / Arcane
    clanBattleTab: { c1: [0.22, 0.74, 0.97], c2: [0.96, 0.62, 0.05] }, // Cobalt / Gold
    doorTab:       { c1: [0.66, 0.33, 0.97], c2: [0.22, 0.74, 0.97] }, // Mystic / Cyan
    settingsTab:   { c1: [0.58, 0.64, 0.72], c2: [0.96, 0.62, 0.05] }  // Slate / Amber
  };

  let activeTheme = TAB_THEMES.inventoryTab;
  let paused = false;
  let pulseEnergy = 0;
  let runningEngine = null; // { start, stop, setTheme, pulse }

  function updateToggleBtn() {
    if (!toggleBtn) return;
    toggleBtn.className = `status-toggle-btn ${effectsEnabled ? "active" : "inactive"}`;
    toggleBtn.textContent = effectsEnabled ? "✨ 3D Background Effects: ON" : "🚫 3D Background Effects: OFF";
  }

  window.STNEffects = {
    setTheme(tabId) {
      activeTheme = TAB_THEMES[tabId] || TAB_THEMES.inventoryTab;
      if (runningEngine && runningEngine.setTheme) runningEngine.setTheme(activeTheme);
    },
    pulse(amount = 0.5) {
      pulseEnergy = Math.min(1.0, pulseEnergy + amount);
    },
    setPaused(flag) {
      paused = !!flag;
    },
    setEnabled(flag) {
      effectsEnabled = !!flag;
      try { localStorage.setItem(EFFECTS_KEY, effectsEnabled ? "1" : "0"); } catch {}
      updateToggleBtn();
      if (!canvas) return;
      canvas.style.display = effectsEnabled ? "" : "none";
      if (effectsEnabled) {
        if (runningEngine) runningEngine.start();
        else bootEffects();
      } else if (runningEngine) {
        runningEngine.stop();
      }
    }
  };

  if (toggleBtn) {
    updateToggleBtn();
    toggleBtn.addEventListener("click", () => {
      window.STNEffects.setEnabled(!effectsEnabled);
    });
  }

  if (!canvas || !effectsEnabled) {
    if (canvas && !effectsEnabled) canvas.style.display = "none";
    return;
  }

  // Fallback lightweight 2D ember canvas (only if WebGL / Three.js unavailable)
  function startFallback2D() {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const COLORS = [[251, 191, 36], [245, 158, 11], [249, 115, 22], [96, 165, 250]];
    const SPRITE_SIZE = 24;
    const sprites = COLORS.map(([r, g, b]) => {
      const off = document.createElement("canvas");
      off.width = SPRITE_SIZE;
      off.height = SPRITE_SIZE;
      const octx = off.getContext("2d");
      const half = SPRITE_SIZE / 2;
      const grad = octx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, "rgba(255,250,235,0.95)");
      grad.addColorStop(0.28, `rgba(${r},${g},${b},0.75)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      octx.fillStyle = grad;
      octx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      return off;
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const makeP = (randY) => ({
      x: Math.random() * width,
      y: randY ? Math.random() * height : height + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(0.45 + Math.random() * 0.9),
      size: 10 + Math.random() * 14,
      alpha: 0.25 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      spriteIdx: Math.random() < 0.78 ? Math.floor(Math.random() * 3) : 3
    });

    let particles = Array.from({ length: 20 }, () => makeP(true));
    let rafId = 0;
    let lastFrame = 0;

    function loop(now) {
      if (!effectsEnabled) { rafId = 0; return; }
      rafId = requestAnimationFrame(loop);
      if (document.hidden || paused || now - lastFrame < 33) return;
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += 0.04;
        p.x += p.vx + Math.sin(p.phase) * 0.3;
        p.y += p.vy;
        if (p.y < -24) { particles[i] = makeP(false); continue; }
        ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.phase));
        const half = p.size * 0.5;
        ctx.drawImage(sprites[p.spriteIdx], p.x - half, p.y - half, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    }

    runningEngine = {
      start() { if (!rafId) rafId = requestAnimationFrame(loop); },
      stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } ctx.clearRect(0, 0, width, height); }
    };
    runningEngine.start();
  }

  // Primary GPU-accelerated Three.js WebGL Engine
  function startThreeEngine() {
    if (typeof THREE === "undefined") {
      startFallback2D();
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false
      });
    } catch {
      startFallback2D();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 18;

    // ---------------------------------------------------------
    // Draw Call 1: Atmospheric Glow Quad (procedural GLSL)
    // ---------------------------------------------------------
    const curC1 = new THREE.Color(activeTheme.c1[0], activeTheme.c1[1], activeTheme.c1[2]);
    const curC2 = new THREE.Color(activeTheme.c2[0], activeTheme.c2[1], activeTheme.c2[2]);
    const tgtC1 = curC1.clone();
    const tgtC2 = curC2.clone();

    const bgUniforms = {
      uTime:  { value: 0 },
      uPulse: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: curC1 },
      uColor2: { value: curC2 }
    };

    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.999, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uPulse;
        uniform vec2 uMouse;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        void main() {
          vec2 p = vUv - 0.5;
          vec2 m = uMouse * 0.08;

          // Two soft breathing atmospheric light pools
          vec2 c1Pos = vec2(-0.32 + sin(uTime * 0.22) * 0.06, 0.30 + cos(uTime * 0.17) * 0.05) + m;
          vec2 c2Pos = vec2( 0.34 + cos(uTime * 0.19) * 0.07, -0.24 + sin(uTime * 0.21) * 0.06) - m * 0.7;

          float g1 = exp(-dot(p - c1Pos, p - c1Pos) * 4.8);
          float g2 = exp(-dot(p - c2Pos, p - c2Pos) * 5.2);

          // Subtle rising heat shimmer near bottom edge
          float bottomGlow = smoothstep(0.55, -0.5, p.y) * (0.06 + 0.03 * sin(uTime * 0.8 + p.x * 5.0));

          vec3 col = uColor1 * (g1 * 0.13 + bottomGlow) + uColor2 * (g2 * 0.11);
          float boost = 1.0 + uPulse * 0.35;
          float alpha = clamp((g1 * 0.16 + g2 * 0.14 + bottomGlow) * boost, 0.0, 0.28);
          gl_FragColor = vec4(col * boost, alpha);
        }
      `
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.frustumCulled = false;
    scene.add(bgMesh);

    // ---------------------------------------------------------
    // Draw Call 2: 3D GPU Rising Embers & Sparks (THREE.Points)
    // ---------------------------------------------------------
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 85 : 165;
    const SPREAD_X = 34;
    const SPREAD_Y = 24;
    const SPREAD_Z = 18;

    const positions = new Float32Array(COUNT * 3);
    const aScale = new Float32Array(COUNT);
    const aSpeed = new Float32Array(COUNT);
    const aPhase = new Float32Array(COUNT);
    const aMix   = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z;
      aScale[i] = 16.0 + Math.random() * 28.0;
      aSpeed[i] = 0.65 + Math.random() * 1.45;
      aPhase[i] = Math.random() * Math.PI * 2;
      aMix[i]   = Math.random();
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    ptGeo.setAttribute("aScale",   new THREE.BufferAttribute(aScale, 1));
    ptGeo.setAttribute("aSpeed",   new THREE.BufferAttribute(aSpeed, 1));
    ptGeo.setAttribute("aPhase",   new THREE.BufferAttribute(aPhase, 1));
    ptGeo.setAttribute("aMix",     new THREE.BufferAttribute(aMix, 1));

    const ptUniforms = {
      uTime:   { value: 0 },
      uPulse:  { value: 0 },
      uPixelRatio: { value: dpr },
      uSpreadY: { value: SPREAD_Y },
      uColor1: { value: curC1 },
      uColor2: { value: curC2 }
    };

    const ptMat = new THREE.ShaderMaterial({
      uniforms: ptUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aScale;
        attribute float aSpeed;
        attribute float aPhase;
        attribute float aMix;

        uniform float uTime;
        uniform float uPulse;
        uniform float uPixelRatio;
        uniform float uSpreadY;

        varying float vAlpha;
        varying float vMix;

        void main() {
          vec3 pos = position;
          float halfY = uSpreadY * 0.5;

          // Infinite vertical wrap-around 100% on GPU
          float yTravel = pos.y + uTime * aSpeed * (1.0 + uPulse * 0.4);
          pos.y = mod(yTravel + halfY, uSpreadY) - halfY;

          // Organic 3D drift
          pos.x += sin(uTime * 0.75 * aSpeed + aPhase) * 0.95;
          pos.z += cos(uTime * 0.55 * aSpeed + aPhase) * 0.65;

          // Smooth fade-in at bottom and fade-out at top
          float normY = (pos.y + halfY) / uSpreadY;
          float edgeFade = smoothstep(0.0, 0.14, normY) * smoothstep(1.0, 0.82, normY);
          float flicker = 0.68 + 0.32 * sin(uTime * 3.2 + aPhase * 3.0);

          vAlpha = edgeFade * flicker * (0.58 + uPulse * 0.35);
          vMix = aMix;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aScale * uPixelRatio * (14.0 / max(1.0, -mvPosition.z)) * (1.0 + uPulse * 0.25);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        varying float vAlpha;
        varying float vMix;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;

          float core = smoothstep(0.24, 0.0, dist);
          float halo = pow(1.0 - dist * 2.0, 2.2);

          vec3 baseCol = mix(uColor1, uColor2, vMix);
          vec3 finalCol = mix(baseCol, vec3(1.0, 0.97, 0.90), core * 0.85);
          gl_FragColor = vec4(finalCol, halo * vAlpha);
        }
      `
    });

    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // Smooth mouse parallax + subtle scroll parallax (passive listeners)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;
    let targetScrollY = 0;

    window.addEventListener("mousemove", (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    }, { passive: true });

    window.addEventListener("scroll", () => {
      targetScrollY = window.scrollY || 0;
    }, { passive: true });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const newDpr = Math.min(window.devicePixelRatio || 1, 1.5);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(newDpr);
        renderer.setSize(w, h, false);
        ptUniforms.uPixelRatio.value = newDpr;
      }, 150);
    }, { passive: true });

    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      if (runningEngine) runningEngine.stop();
    }, false);

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    function animate(now) {
      if (!effectsEnabled) { rafId = 0; return; }
      rafId = requestAnimationFrame(animate);
      if (document.hidden || paused) {
        lastTime = now;
        return;
      }

      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      elapsed += dt;

      // Smoothly lerp theme colors, mouse parallax, and click pulse
      curC1.lerp(tgtC1, dt * 2.8);
      curC2.lerp(tgtC2, dt * 2.8);
      curMouseX += (targetMouseX - curMouseX) * Math.min(1, dt * 3.5);
      curMouseY += (targetMouseY - curMouseY) * Math.min(1, dt * 3.5);
      pulseEnergy = Math.max(0, pulseEnergy - dt * 1.8);

      camera.position.x = curMouseX * 1.15;
      camera.position.y = curMouseY * 0.75 - Math.min(targetScrollY * 0.0025, 2.5);
      camera.lookAt(0, camera.position.y * 0.25, 0);

      bgUniforms.uTime.value = elapsed;
      bgUniforms.uPulse.value = pulseEnergy;
      bgUniforms.uMouse.value.set(curMouseX, curMouseY);

      ptUniforms.uTime.value = elapsed;
      ptUniforms.uPulse.value = pulseEnergy;

      renderer.render(scene, camera);
    }

    runningEngine = {
      start() {
        lastTime = performance.now();
        if (!rafId) rafId = requestAnimationFrame(animate);
      },
      stop() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        renderer.clear();
      },
      setTheme(theme) {
        tgtC1.setRGB(theme.c1[0], theme.c1[1], theme.c1[2]);
        tgtC2.setRGB(theme.c2[0], theme.c2[1], theme.c2[2]);
      }
    };

    runningEngine.start();
  }

  let booted = false;
  function bootEffects() {
    if (booted || !effectsEnabled) return;
    booted = true;
    if (typeof THREE !== "undefined") {
      startThreeEngine();
      return;
    }
    // Load Three.js asynchronously so initial page paint is 100% unblocked
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.min.js";
    script.async = true;
    script.onload = () => {
      if (effectsEnabled) startThreeEngine();
    };
    script.onerror = () => {
      if (effectsEnabled) startFallback2D();
    };
    document.head.appendChild(script);
  }

  // Defer boot slightly until after initial layout
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(bootEffects, { timeout: 400 });
  } else {
    setTimeout(bootEffects, 120);
  }
})();
