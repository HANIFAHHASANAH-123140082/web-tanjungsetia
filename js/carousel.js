// Carousel Script untuk Profil Desa
let currentSlide = 0;
const totalSlides = 6;
const slidePercent = 100 / totalSlides;
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.carousel-dots span');
let autoSlideInterval;

/**
 * Navigasi ke slide tertentu
 * @param {number} index - Index slide tujuan
 */
function goToSlide(index) {
    // Wrap around logic
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    // Reset animation dan pindah slide
    track.style.animation = 'none';
    track.style.transform = `translateX(-${currentSlide * slidePercent}%)`;

    // Update dot indicators
    dots.forEach((dot, i) => {
        dot.style.animation = 'none';
        dot.style.background = i === currentSlide ? 'white' : 'rgba(255,255,255,0.35)';
        dot.style.borderColor = i === currentSlide ? 'white' : 'rgba(255,255,255,0.5)';
    });

    // Restart auto slide setelah interaksi manual
    clearTimeout(autoSlideInterval);
    autoSlideInterval = setTimeout(restartAutoSlide, 5000);
}

/**
 * Pindah slide (relatif)
 * @param {number} direction - -1 untuk kiri, +1 untuk kanan
 */
function moveSlide(direction) {
    goToSlide(currentSlide + direction);
}

/**
 * Restart animasi auto slide
 */
function restartAutoSlide() {
    // Reset dot animations
    dots.forEach(dot => {
        dot.style.animation = '';
        dot.style.background = '';
        dot.style.borderColor = '';
    });

    // Reset track animation
    track.style.animation = 'none';
    track.style.transform = `translateX(-${currentSlide * slidePercent}%)`;
    void track.offsetWidth; // Force reflow

    // Start animation based on current position
    if (currentSlide === 0) {
        track.style.animation = 'slideCarousel 30s infinite';
    } else {
        const remaining = totalSlides - currentSlide;
        const duration = (remaining / totalSlides) * 30;
        track.style.animation = `slideCarouselFrom${currentSlide} ${duration}s linear forwards`;

        // Loop back setelah animasi selesai
        setTimeout(() => {
            currentSlide = 0;
            track.style.animation = 'slideCarousel 30s infinite';
            dots.forEach(dot => {
                dot.style.animation = '';
            });
        }, duration * 1000);
    }
}

// Event listener untuk dot indicators
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Inisialisasi carousel saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    restartAutoSlide();
});