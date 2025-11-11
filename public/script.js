document.addEventListener('DOMContentLoaded', function () {
	// Carousel functionality
	const carousels = document.querySelectorAll('.carousel-wrapper');
	carousels.forEach((wrapper) => {
		const carousel = wrapper.querySelector('.carousel');
		const leftArrow = wrapper.querySelector('.arrow.left');
		const rightArrow = wrapper.querySelector('.arrow.right');
		if (!carousel || !leftArrow || !rightArrow) return;

		const scrollAmount = carousel.clientWidth * 0.8;
		leftArrow.addEventListener('click', () => {
			carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		});
		rightArrow.addEventListener('click', () => {
			carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		});
	});

	// Slow hero video playback if exists
	const heroBg = document.querySelector('.hero-bg');
	if (heroBg && heroBg.playbackRate !== undefined) {
		heroBg.playbackRate = 0.5;
	}

	// Gallery modal functionality
	const modal = document.getElementById('imageModal');
	const modalImg = document.getElementById('modalImage');
	const closeBtn = document.querySelector('.image-modal__close');
	const galleryItems = document.querySelectorAll('.gallery__item');

	if (modal && modalImg && closeBtn && galleryItems.length > 0) {
		galleryItems.forEach((item) => {
			item.addEventListener('click', () => {
				const full = item.dataset.full;
				if (!full) return;
				modalImg.src = full;
				modal.classList.add('open');
				document.body.style.overflow = 'hidden';
			});
		});

		closeBtn.addEventListener('click', () => {
			modal.classList.remove('open');
			document.body.style.overflow = '';
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.classList.remove('open');
				document.body.style.overflow = '';
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.classList.contains('open')) {
				modal.classList.remove('open');
				document.body.style.overflow = '';
			}
		});
	}
});
