// main.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Animated Typewriter Effect (Advanced) ---
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
  const words = [
    'Aimbot and ESP',
    'Automation Features',
    'Trolling Tools',
    'Mobile Support',
    'This is VisionHub.'
  ];
    let wordIndex = 0, charIndex = 0, deleting = false;
    let typingSpeed = 48, deletingSpeed = 24, pauseTyping = 1200, pauseDeleting = 550;

    function type() {
      const word = words[wordIndex];
      if (!deleting) {
        typewriter.textContent = word.slice(0, charIndex++);
        if (charIndex > word.length) {
          deleting = true;
          setTimeout(type, pauseTyping);
          return;
        }
      } else {
        typewriter.textContent = word.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, pauseDeleting);
          return;
        }
      }
      setTimeout(type, deleting ? deletingSpeed : typingSpeed);
    }
    // Accessibility: announce on change
    const observer = new MutationObserver(() => {
      typewriter.setAttribute('aria-live', 'polite');
    });
    observer.observe(typewriter, { childList: true });
    type();
  }

  // --- Interactive FAQ Accordion (Keyboard Accessible) ---
  document.querySelectorAll('.faq-card').forEach(card => {
    const summary = card.querySelector('summary');
    summary.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        summary.click();
      }
    });
  });

  // --- Advanced Responsive Background Particles ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = 0,
      height = 0,
      particles = [],
      mouse = { x: -1000, y: -1000, radius: 90 };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 1.7 + 0.7;
        this.dx = (Math.random() - 0.5) * 0.7;
        this.dy = (Math.random() - 0.5) * 0.7;
        this.opacity = Math.random() * 0.4 + 0.3;
        this.color = `rgba(59,130,246,${this.opacity})`;
      }
      move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > width) this.dx *= -1;
        if (this.y < 0 || this.y > height) this.dy *= -1;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }
      interact() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle);
          this.y += Math.sin(angle);
        }
      }
    }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const density = Math.min(60, Math.floor((width * height) / 25000));
      for (let i = 0; i < density; i++) particles.push(new Particle());
    }

    window.addEventListener('resize', resize);
    resize();

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function connectParticles() {
      const maxDist = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.save();
            ctx.globalAlpha = 0.06;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.move();
        p.interact();
        p.draw(ctx);
      }
      connectParticles();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- Smooth Scroll for Anchor Links (if any) ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 48,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Accessibility: Focus ring for keyboard users only ---
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});