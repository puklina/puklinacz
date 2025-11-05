document.addEventListener('DOMContentLoaded', function () {
	const carousels = document.querySelectorAll('.carousel-wrapper');

	carousels.forEach((wrapper) => {
		const carousel = wrapper.querySelector('.carousel');
		const leftArrow = wrapper.querySelector('.arrow.left');
		const rightArrow = wrapper.querySelector('.arrow.right');

		if (!carousel || !leftArrow || !rightArrow) return;

		const scrollAmount = carousel.clientWidth * 0.8;

		leftArrow.addEventListener('click', () => {
			carousel.scrollBy({
				left: -scrollAmount,
				behavior: 'smooth',
			});
		});

		rightArrow.addEventListener('click', () => {
			carousel.scrollBy({
				left: scrollAmount,
				behavior: 'smooth',
			});
		});
	});
});

document.querySelector('.hero-bg').playbackRate = 0.3;
