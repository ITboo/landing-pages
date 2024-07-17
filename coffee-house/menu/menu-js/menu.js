import { data } from './data.js';
import { Product, ModalProduct, Overlay } from './constructors.js';

const wrapper = document.querySelector('.wrapper');
const menuWrapper = document.querySelector('.menu__wrapper');
const tabs = document.querySelectorAll('.tab');
const showMoreBtn = document.querySelector('.button-more');
let selectedCategory = '';

// Init
window.onload = () => {
  generateMenu('coffee');
  checkVisibleItems();
  wrapper.append(new Overlay(closeModal));

  const overlay =  document.querySelector('.overlay');
  const modal = new ModalProduct(data, closeModal).createModalProduct();
  overlay.append(modal);
};

// Generator
const generateMenu = (category) => {
  if (!Array.isArray(data)) return;

  const menu = data.filter(el => el.category === category);
  const createdItems = menu.map(el => el = new Product(el, openModal).createProduct());

  menuWrapper.innerHTML = '';
  createdItems.forEach(item => menuWrapper.append(item));
};

// Check for 4 visible items on mobile devices
function checkVisibleItems() {
  if (document.documentElement.clientWidth <= 768) {
    menuWrapper.classList.add('mobile-version');
    if (document.querySelectorAll('.menu__item').length > 4) {
      showMoreBtn.classList.add('visible');
    } else {
      showMoreBtn.classList.remove('visible');
    }
  } else {
    menuWrapper.classList.remove('mobile-version');
    showMoreBtn.classList.remove('visible');
  }
}

// Switch category
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    selectedCategory = tab.previousElementSibling.getAttribute('value');
    if (getComputedStyle(menuWrapper).opacity !== '0') {
      menuWrapper.classList.add('faded');
    }
    menuWrapper.addEventListener('transitionend', fadeOut);
  });
});

function fadeOut() {
  menuWrapper.removeEventListener('transitionend', fadeOut);
  menuWrapper.classList.remove('faded');
  generateMenu(selectedCategory);
  checkVisibleItems();
}

// Show more items
showMoreBtn.addEventListener('click', () => {
  menuWrapper.classList.remove('mobile-version');
  showMoreBtn.classList.remove('visible');
});

window.addEventListener('resize', checkVisibleItems);

// Modal open
function openModal(id) {
  const overlay =  document.querySelector('.overlay');
  overlay.classList.add('visible');
  document.querySelector('body').classList.add('stop-scroll');

  fillModalWithContent(id);
}

// Modal close
function closeModal(event) {
  if (event.target === event.currentTarget) {
    document.querySelector('.overlay').classList.remove('visible');
    document.querySelector('body').classList.remove('stop-scroll');
    resetOrder();
  }
}

// Clear choosen inputs
function resetOrder() {
  const form =  document.querySelector('.overlay form');
  form.querySelector('.menu__input[name="size"]').checked = true;
  form.querySelectorAll('.menu__input[name="additives"]').forEach(input => input.checked = false);
}

// Generate modal content for choosen item
function fillModalWithContent(id) {
  const item = data.find(el => el.id === id);

  document.querySelector('.modal').setAttribute('data-id', id);

  const img = document.querySelector('.modal .menu-item__img-wrapper img');
  img.src = item.imageUrl;
  img.alt = item.name;

  document.querySelector('.modal__content-title .menu-item__title').textContent = item.name;
  document.querySelector('.modal__content-title .menu-item__desc').textContent = item.description;

  document.querySelector('.tab[for="size-small"] .tab__name').textContent = item.sizes.s.size;
  document.querySelector('.tab[for="size-medium"] .tab__name').textContent = item.sizes.m.size;
  document.querySelector('.tab[for="size-large"] .tab__name').textContent = item.sizes.l.size;

  const additives = document.querySelectorAll('.menu__input[id^="add"]');
  additives.forEach((el, index) => {
    el.id = `add-${item.additives[index].name.toLowerCase()}`;
    el.value = item.additives[index].name.toLowerCase();

    const label = el.nextElementSibling;
    label.setAttribute('for', `add-${item.additives[index].name.toLowerCase()}`);
    label.querySelector('.tab__icon_modal').textContent = index + 1;
    label.querySelector('.tab__name').textContent = item.additives[index].name;
  });

  document.querySelector('.modal .menu-item__price').textContent = `$${item.price}`;
}