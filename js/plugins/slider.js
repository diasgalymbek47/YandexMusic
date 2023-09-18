const slider = document.querySelector('.interesting__slider-line');
const slides = document.querySelectorAll('.interesting__slider-slide');
const btnPrev = document.querySelector('.interesting__slider-btn-prev');
const btnNext = document.querySelector('.interesting__slider-btn-next');
const slideWidth = slides[0].scrollWidth;

btnPrev.addEventListener('click', () => {
    slider.scrollLeft -= slideWidth;
})

btnNext.addEventListener('click', () => {
    slider.scrollLeft += slideWidth;
})
