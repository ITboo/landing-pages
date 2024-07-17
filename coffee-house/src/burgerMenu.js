const body = document.querySelector('body');
const burgerBtn = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__list-item');
const menuLink = document.querySelector('.header__menu-btn');

burgerBtn.addEventListener('click', () => {
  const offset = nav.getBoundingClientRect().top;

  if (!nav.classList.contains('active')) {
    nav.style.height = `calc(100vh - ${offset}px)`;
  }

  nav.classList.toggle('active');
  body.classList.toggle('stop-scroll');
});

navLink.forEach((link) => link.addEventListener('click', closeBurgerMenu));
menuLink.addEventListener('click', closeBurgerMenu);
window.addEventListener('resize', (e) => {
  nav.removeAttribute('style');
  closeBurgerMenu(e);
});

function closeBurgerMenu(event) {
  if (event.currentTarget !== window && event.currentTarget.getAttribute('href') === '#') {
    event.preventDefault();
  }
  nav.classList.remove('active');
  body.classList.remove('stop-scroll');
}