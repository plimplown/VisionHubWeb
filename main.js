document.addEventListener('DOMContentLoaded', () => {
  const App = {
    init() {
      this.initCopyToClipboard();
      this.initScrollAnimations();
      this.initHeaderScroll();
      this.initCursorGlow();
      this.initParticleCanvas();
      this.updateCopyright();
      this.updateStatusTime();
    },

    initCopyToClipboard() {
      const code = document.getElementById('script-code');
      const btn = document.getElementById('copy-button');
      if (!code || !btn) return;

      const doCopy = () => {
        if (!navigator.clipboard) {
          alert('Clipboard API not supported. Please copy manually.');
          return;
        }

        navigator.clipboard.writeText(code.textContent.trim())
          .then(() => {
            btn.classList.add('copied');
            btn.querySelector('.copy-text').classList.add('hidden');
            btn.querySelector('.copied-text').classList.remove('hidden');
            setTimeout(() => {
              btn.classList.remove('copied');
              btn.querySelector('.copy-text').classList.remove('hidden');
              btn.querySelector('.copied-text').classList.add('hidden');
            }, 2000);
          })
          .catch(console.error);
      };

      code.addEventListener('click', doCopy);
      btn.addEventListener('click', doCopy);
    },

    initScrollAnimations() {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-on-scroll')
        .forEach(el => observer.observe(el));
    },

    initHeaderScroll() {
      const hdr = document.getElementById('main-header');
      window.addEventListener('scroll', () => {
        hdr.classList.toggle('scrolled', window.scrollY > 20);
      });
    },

    initCursorGlow() {
      const glow = document.getElementById('cursor-glow');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        glow.style.display = 'none';
        return;
      }

      window.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    },

    initParticleCanvas() {
      const canvas = document.getElementById('particle-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let W, H, particles = [];

      class Particle {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * W;
          this.y = Math.random() * H;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.r = 1 + Math.random() * 2;
          this.alpha = 0.1 + Math.random() * 0.3;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59,130,246,${this.alpha})`;
          ctx.fill();
        }
      }

      function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }

      function initParticles() {
        const count = Math.min(100, Math.floor(W * H / 10000));
        particles = Array.from({ length: count }, () => new Particle());
      }

      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          resize();
          initParticles();
        }, 200);
      });

      resize();
      initParticles();
      (function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
      })();
    },

    updateStatusTime() {
      const el = document.getElementById('last-update-time');
      if (!el) return;

      const versionUrl = 'https://raw.githubusercontent.com/plimplown/VisionHub/refs/heads/main/v.txt';
      fetch(versionUrl)
        .then(response => response.ok ? response.text() : Promise.reject('Fetch failed'))
        .then(version => el.textContent = `${version.trim()}`)
        .catch(() => el.textContent = 'Version unavailable');
    },

    updateCopyright() {
      const el = document.getElementById('copyright-year');
      if (el) {
        el.textContent = new Date().getFullYear();
      }
    }
  };

  App.init();
});
