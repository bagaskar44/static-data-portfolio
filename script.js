/* ============================================================
   PORTFOLIO SCRIPT — Dafa Fajar Bagaskara
   ============================================================ */

/* ── Canvas particle / grid background ── */
(function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, dots = [], animId;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function buildDots() {
        dots = [];
        const cols = Math.ceil(W / 56);
        const rows = Math.ceil(H / 56);
        for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
                dots.push({
                    x: c * 56,
                    y: r * 56,
                    base: Math.random(),
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.008 + Math.random() * 0.012
                });
            }
        }
    }

    function draw(t) {
        ctx.clearRect(0, 0, W, H);

        // Draw connecting lines first
        ctx.strokeStyle = 'rgba(59,130,246,0.04)';
        ctx.lineWidth = 1;

        const cols = Math.ceil(W / 56) + 1;
        dots.forEach((d, i) => {
            const right = dots[i + 1];
            const below = dots[i + cols];
            if (right && Math.floor(i / cols) === Math.floor((i + 1) / cols)) {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(right.x, right.y);
                ctx.stroke();
            }
            if (below) {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(below.x, below.y);
                ctx.stroke();
            }
        });

        // Draw dots
        dots.forEach(d => {
            const alpha = 0.06 + 0.2 * (0.5 + 0.5 * Math.sin(t * d.speed + d.phase));
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59,130,246,${alpha})`;
            ctx.fill();
        });

        animId = requestAnimationFrame(draw);
    }

    resize();
    buildDots();
    requestAnimationFrame(draw);

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animId);
        resize();
        buildDots();
        requestAnimationFrame(draw);
    });
})();

/* ── Nav scroll effect ── */
(function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

/* ── Scroll reveal ── */
(function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings slightly
                const siblings = [...entry.target.parentElement.children];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.07}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => observer.observe(el));
})();

/* ── Smooth scroll for nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('%cDafa Fajar Bagaskara — Portfolio loaded ✓', 'color:#60a5fa;font-weight:700;font-size:13px');
