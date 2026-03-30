// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- Locked Screen Timer ---
    const lockedScreen = document.getElementById('locked-screen');
    const enterSiteBtn = document.getElementById('enter-site-btn');

    if (lockedScreen) {
        // Simple countdown logic (e.g., to next Friday)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 5);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('mins');
        const secsEl = document.getElementById('secs');

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
            if (minsEl) minsEl.innerText = minutes.toString().padStart(2, '0');
            if (secsEl) secsEl.innerText = seconds.toString().padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000);

        // Bypass or Submit handler
        if (enterSiteBtn) {
            enterSiteBtn.addEventListener('click', () => {
                lockedScreen.classList.add('hidden');
                document.body.style.overflow = 'auto'; // allow scroll
            });
        }
    }

    // Initialize Scroll Reveal Elements
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top <= windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load

    // --- Shop Category Filtering ---
    const filterBtns = document.querySelectorAll('#shop-filters .btn');
    const productCards = document.querySelectorAll('#shop-grid .product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // If it's the size button, just toggle visually
                if (btn.dataset.filter === 'size') {
                    btn.classList.toggle('active');
                    return;
                }

                // Remove active class from category buttons
                filterBtns.forEach(b => {
                    if (b.dataset.filter !== 'size') b.classList.remove('active');
                });
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.style.display = 'flex';
                        // Re-trigger animation
                        setTimeout(() => card.classList.add('visible'), 10);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('visible');
                    }
                });
            });
        });
    }
});
