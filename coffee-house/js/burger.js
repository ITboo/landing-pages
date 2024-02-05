const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-list__wrapper');
const navLinks = document.querySelectorAll('.menu__link');
const body = document.body;

if (burger) {

burger.addEventListener('click', function () {
    this.classList.toggle('active');
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      nav.classList.add('open');
      body.classList.add('scroll_block');
      nav.classList.add('open-script');
    }
  });

function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    nav.classList.add('close');
    body.classList.remove('scroll_block');
  
    setTimeout(() => {
      nav.classList.remove('close');
    }, 300);
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if ( document.querySelector('.nav-list__wrapper').classList.contains('open')) {
    document.querySelector('.nav-list__wrapper').classList.remove('open');
    nav.classList.add('close');
    body.classList.remove('scroll_block');
    document.querySelector('.burger').classList.remove('active');
    setTimeout(() => {
      nav.classList.remove('close');
      nav.classList.remove('open-script');
    }, 300);
  }
  });
});
}