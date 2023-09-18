// Login - Signup transition
const formWindow = document.querySelector('.form');
const loginSignupLink = document.querySelectorAll('.form .form__bottom-link a');

loginSignupLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        formWindow.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
})


// Open - Close form
const formBg = document.querySelector('.form__wrap');
const userAuthButton = document.querySelector('.header__user-auth-button');
const formCloseButton = document.querySelector('.form__close');

function toggleForm() {
    document.body.classList.toggle('show-form');
    formBg.classList.toggle('show-form');
    document.body.classList.toggle('no-scroll', formBg.classList.contains('show-form'));
}

userAuthButton.addEventListener('click', toggleForm);
formCloseButton.addEventListener('click', toggleForm);
formBg.addEventListener('click', toggleForm);
