document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header-nav');

    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function () {
            headerNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        headerNav.querySelectorAll('a').forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', () => {
                    headerNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            }
        });
    }

    // Showcase tabs
    const tabs = document.querySelectorAll('.showcase-tab');
    const screens = document.querySelectorAll('.mockup-screen');
    let autoplayInterval = null;
    let currentIndex = 0;

    function switchTo(target) {
        tabs.forEach(t => t.classList.remove('active'));
        screens.forEach(s => {
            s.classList.remove('active');
            s.querySelectorAll('[style*="animation"],.mock-msg,.mock-deal-card,.mock-kpi-card,.mock-funnel-bar,.mock-bar,.mock-table-row,.mock-camp-stat,.mock-ia-section').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight;
                el.style.animation = '';
            });
        });

        const activeTab = document.querySelector('.showcase-tab[data-target="' + target + '"]');
        const activeScreen = document.querySelector('.mockup-screen[data-screen="' + target + '"]');

        if (activeTab) activeTab.classList.add('active');
        if (activeScreen) activeScreen.classList.add('active');

        currentIndex = Array.from(tabs).findIndex(t => t.dataset.target === target);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            switchTo(this.dataset.target);
            resetAutoplay();
        });
    });

    function autoplay() {
        currentIndex = (currentIndex + 1) % tabs.length;
        switchTo(tabs[currentIndex].dataset.target);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(autoplay, 5000);
    }

    if (tabs.length > 0) {
        resetAutoplay();
    }

    // Bento metric counter animation
    const metricValues = document.querySelectorAll('.bento-metric-value[data-count]');
    if (metricValues.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.querySelectorAll('.bento-metric-value[data-count]').forEach(function (el) {
                    if (el.dataset.animated) return;
                    el.dataset.animated = '1';
                    const target = parseInt(el.dataset.count);
                    const prefix = el.dataset.prefix || '';
                    const suffix = el.dataset.suffix || '';
                    const isCurrency = el.dataset.format === 'currency';
                    const duration = 1200;
                    const start = performance.now();
                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        var current = Math.round(target * eased);
                        if (isCurrency) {
                            el.textContent = prefix + (current / 1000).toFixed(1) + suffix;
                        } else {
                            el.textContent = prefix + current + suffix;
                        }
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.3 });

        var metricsContainer = document.querySelector('.bento-metrics');
        if (metricsContainer) observer.observe(metricsContainer);
    }
});
