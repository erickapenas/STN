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
    window.addEventListener("resize", syncActiveNavIndicator);
    window.addEventListener("load", syncActiveNavIndicator);
    requestAnimationFrame(syncActiveNavIndicator);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncActiveNavIndicator);
    }
  }

  // =========================================================
  // 2. CARD MOUSE-TRACKING SPOTLIGHT GLOW
  // =========================================================
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest ? e.target.closest(".card") : null;
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }
  }, { passive: true });

  // =========================================================
  // 3. CLICK RIPPLE EFFECT ON BUTTONS
  // =========================================================
  document.addEventListener("click", (e) => {
    if (prefersReducedMotion) return;
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
    setTimeout(() => ripple.remove(), 580);
  });

  if (prefersReducedMotion) return;

  // =========================================================
  // 4. 3D TILT ON BRAND LOGO EMBLEM
  // =========================================================
  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo) {
    brandLogo.addEventListener("mousemove", (e) => {
      const rect = brandLogo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      brandLogo.style.transform = `perspective(420px) rotateX(${(-y * 18).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg) scale(1.06)`;
    });
    brandLogo.addEventListener("mouseleave", () => {
      brandLogo.style.transform = "";
    });
  }

  // =========================================================
  // 5. SUBTLE AMBIENT PARALLAX ON HERO ARTWORK
  // =========================================================
  const bgArtwork = document.getElementById("bgArtwork");
  const heroBg = document.querySelector(".hero-banner-bg");
  let pointerX = 0.5;
  let pointerY = 0.5;
  let mouseClientX = -9999;
  let mouseClientY = -9999;

  window.addEventListener("mousemove", (e) => {
    pointerX = e.clientX / Math.max(window.innerWidth, 1);
    pointerY = e.clientY / Math.max(window.innerHeight, 1);
    mouseClientX = e.clientX;
    mouseClientY = e.clientY;

    const dx = (pointerX - 0.5) * -22;
    const dy = (pointerY - 0.5) * -16;
    if (bgArtwork) {
      bgArtwork.style.setProperty("--bg-px", `${dx.toFixed(1)}px`);
      bgArtwork.style.setProperty("--bg-py", `${dy.toFixed(1)}px`);
    }
    if (heroBg) {
      heroBg.style.setProperty("--hero-px", `${(dx * 0.45).toFixed(1)}px`);
      heroBg.style.setProperty("--hero-py", `${(dy * 0.45).toFixed(1)}px`);
    }
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    mouseClientX = -9999;
    mouseClientY = -9999;
  });

  // =========================================================
  // 6. INTERACTIVE FLOATING EMBER / SPARK PARTICLE CANVAS
  // =========================================================
  const canvas = document.getElementById("emberCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];

  const COLORS = [
    { r: 251, g: 191, b: 36 },  // Turret Gold
    { r: 245, g: 158, b: 11 },  // Ember Amber
    { r: 249, g: 115, b: 22 },  // Spark Orange
    { r: 96,  g: 165, b: 250 }  // Night Cobalt
  ];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticle(randomY = false) {
    const color = COLORS[Math.random() < 0.78 ? Math.floor(Math.random() * 3) : 3];
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.28 + Math.random() * 0.65),
      radius: 1.1 + Math.random() * 2.2,
      alpha: 0.22 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.015 + Math.random() * 0.025,
      color
    };
  }

  function initParticles() {
    const count = Math.min(54, Math.max(24, Math.floor(width / 28)));
    particles = Array.from({ length: count }, () => createParticle(true));
  }

  resizeCanvas();
  initParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.phase += p.phaseSpeed;
      p.x += p.vx + Math.sin(p.phase) * 0.22;
      p.y += p.vy;

      // Subtle cursor repulsion for tactile interactivity
      const dx = p.x - mouseClientX;
      const dy = p.y - mouseClientY;
      const distSq = dx * dx + dy * dy;
      if (distSq < 16000 && distSq > 1) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 126) * 0.9;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      if (p.y < -20 || p.x < -30 || p.x > width + 30) {
        particles[i] = createParticle(false);
        continue;
      }

      const twinkle = 0.65 + 0.35 * Math.sin(p.phase * 1.7);
      const a = p.alpha * twinkle;
      const { r, g, b } = p.color;

      // Soft outer glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.8);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3.8, 0, Math.PI * 2);
      ctx.fill();

      // Crisp core
      ctx.fillStyle = `rgba(255, 250, 235, ${Math.min(1, a * 1.25)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
