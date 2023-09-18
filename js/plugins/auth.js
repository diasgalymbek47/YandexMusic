const authBtn = document.querySelector('#auth-btn'),
    authForm = document.querySelector('#auth-form');

authBtn.addEventListener('click', () => authForm.classList.remove('hidden'))

authForm.addEventListener('click', (e) => {
    if (e.target.classList.contains('form__close') || e.target.classList.contains('form')) {
        authForm.classList.add('hidden');
    }
})