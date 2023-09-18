const search = document.querySelector('#search-field');
const searchBtn = document.querySelector('#search-btn');
const form = searchBtn.closest('#search-form');


form.onclick = (e) => {
    e.preventDefault();
}

searchBtn.addEventListener('click', (e) => {
    search.classList.toggle('hidden');
    search.focus();
})

document.addEventListener('click', (e) => {
    const target = e.target;

    if (!target.closest('#search-form')) {
        search.classList.add('hidden');
    }
})

const searchWidth = document.querySelector('.header__navbar').scrollWidth;

if (window.innerWidth <= 865) {
    search.style.width = `${searchWidth}px`;
} else {
    search.style.width = `380px`;
}

window.addEventListener('resize', () => {
    const searchWidth = document.querySelector('.header__navbar').scrollWidth;

    if (window.innerWidth <= 865) {
        search.style.width = `${searchWidth}px`;
    } else {
        search.style.width = `380px`;
    }
})