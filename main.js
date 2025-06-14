document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const blobs = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 6 + 2,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      t: Math.random() * 100,
      color: `rgba(52, 148, 250, ${Math.random() * 0.4 + 0.2})`
    }));

    const raf = window.requestAnimationFrame?.bind(window)
              || window.webkitRequestAnimationFrame?.bind(window)
              || ((cb) => setTimeout(cb, 1000 / 60));

    function drawBlobs() {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach(blob => {
        const { x, y, r, color } = blob;
        const grad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(13,19,33,0)');

        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.shadowColor = '#3494fa';
        ctx.shadowBlur = 60;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        blob.x += Math.sin(blob.t / 60) * blob.dx;
        blob.y += Math.cos(blob.t / 60) * blob.dy;
        blob.t += 0.8;

        if (blob.x - r > width)  blob.x = -r;
        if (blob.x + r < 0)      blob.x = width + r;
        if (blob.y - r > height) blob.y = -r;
        if (blob.y + r < 0)      blob.y = height + r;
      });

      raf(drawBlobs);
    }

    drawBlobs();
  }

  const menuBtn  = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      document.querySelectorAll('.faq-item.open')
        .forEach(i => i !== item && i.classList.remove('open'));
      item.classList.toggle('open');
    });
  });

  const typewriterTexts = [
    'Aimbot and ESP',
    'Automation Features',
    'Trolling Tools',
    'Mobile Support',
    'This is VisionHub.'
  ];
  let twIndex = 0, charIndex = 0;
  const twEl = document.getElementById('typewriter');

  function type() {
    if (!twEl) return;
    const text = typewriterTexts[twIndex];
    if (charIndex < text.length) {
      twEl.textContent += text[charIndex++];
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (!twEl) return;
    if (charIndex > 0) {
      twEl.textContent = twEl.textContent.slice(0, -1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      twIndex = (twIndex + 1) % typewriterTexts.length;
      setTimeout(type, 300);
    }
  }

  if (twEl) {
    setTimeout(type, 500);
  }
});
