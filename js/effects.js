(() => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      btn.addEventListener("click", () => moveNavIndicator(btn));
    });
    window.addEventListener("resize", syncActiveNavIndicator, { passive: true });
    window.addEventListener("load", syncActiveNavIndicator);
    requestAnimationFrame(syncActiveNavIndicator);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncActiveNavIndicator);
    }
  }

  if (prefersReducedMotion) return;

  // =========================================================
  // 2. CLICK RIPPLE EFFECT ON BUTTONS
  // =========================================================
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
  });

  // =========================================================
  // 3. 3D TILT ON BRAND LOGO EMBLEM (rAF throttled)
  // =========================================================
  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo) {
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
  // 4. LIGHTWEIGHT PRE-RENDERED SPRITE EMBER CANVAS (30 FPS)
  // =========================================================
  const canvas = document.getElementById("emberCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const COLORS = [
    [251, 191, 36], // Turret Gold
    [245, 158, 11], // Ember Amber
    [249, 115, 22], // Spark Orange
    [96, 165, 250]  // Night Cobalt
  ];

  // Pre-render tiny 24x24 glow sprites ONCE (avoids createRadialGradient every frame!)
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

  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticle(randomY = false) {
    const spriteIdx = Math.random() < 0.78 ? Math.floor(Math.random() * 3) : 3;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(0.45 + Math.random() * 0.9),
      size: 10 + Math.random() * 14,
      alpha: 0.25 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      spriteIdx
    };
  }

  function initParticles() {
    const count = Math.min(24, Math.max(12, Math.floor(width / 65)));
    particles = Array.from({ length: count }, () => createParticle(true));
  }

  resizeCanvas();
  initParticles();

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      initParticles();
    }, 150);
  }, { passive: true });

  let lastFrame = 0;
  const FRAME_INTERVAL = 1000 / 30; // Smooth 30 FPS cap for ambient embers

  function animate(now) {
    requestAnimationFrame(animate);
    if (document.hidden || now - lastFrame < FRAME_INTERVAL) return;
    lastFrame = now;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.phase += 0.04;
      p.x += p.vx + Math.sin(p.phase) * 0.3;
      p.y += p.vy;

      if (p.y < -24 || p.x < -30 || p.x > width + 30) {
        particles[i] = createParticle(false);
        continue;
      }

      ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.phase));
      const half = p.size * 0.5;
      ctx.drawImage(sprites[p.spriteIdx], p.x - half, p.y - half, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  requestAnimationFrame(animate);
})();
