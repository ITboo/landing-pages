import data from '../assets/menu/products.json' assert { type: 'json' };
import './burger.js';
import openCardModel from  './modal-card.js';
const loadData = document.querySelector('.oncount');
const menuButtons = document.querySelectorAll('.menu-btn');
const copyData = data;

createMenu(data, 'coffee');

window.addEventListener('resize', adjustScreenLength);

function adjustScreenLength() {
    const menuWrapperItemCount = document.querySelectorAll('.menu-item__card');
    console.log(menuWrapperItemCount.length);
    if (menuWrapperItemCount.length > 4) {
        menuWrapperItemCount.forEach((item, index) => {
            if (index >= 4 &&  (window.innerWidth <= 768)) {
                item.style.display = 'none';
                loadData.style.display = 'block'; 
            } else {
                loadData.style.display = 'none'; 
                item.style.display = 'block';
            }
        });
    } else {
        loadData.style.display = 'none'; 
    }
}


function createMenu(data, type){
    const menuSlider = document.querySelector('.menu-items__slider');
    menuSlider.innerHTML = '';
    const orderData = data.filter(element => element.category === type);
    const rowsHTML = orderData.map((element, index) => {
        const image =  `<div class="menu-item__card_image-wrapper"> 
        <img src="${element.img}" alt="${String(element.category)}${String(index+1)}"></div> `;

        return `
        <div class="menu-item__card" id="menu-item__card-${String(index+1)}">
        ${image}
        <div class="menu-item__card_description-wrapper">
        <h3>${element.name}</h3>
        <p class="coffee-description">${element.description}</p>
        <p class="slider-item__price card-display">$${element.price}</p>  
        </div>
        </div>
        `;
        }).join('');
    menuSlider.insertAdjacentHTML('beforeend', rowsHTML);
    adjustScreenLength();
    setModalBtn();
}


menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        menuButtons.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('menu-btn-checked');
            }
        });
        const menuItems = document.querySelectorAll('.menu-item__card');
        menuItems.forEach(element => {
            element.classList.add("elementToFadeInAndOut");
            setTimeout(function () {
                checkType(btn.id);
              }, 200);
        })
        btn.classList.add('menu-btn-checked');
    });
});

function checkType(id) {
    let type = 'coffee';

    if (id === 'tea-menu') {
        type = 'tea';
    } else if (id === 'dessert-menu') {
        type = 'dessert';
    }

    createMenu(copyData, type);
}

loadData.addEventListener('click', () => {
    const menuItems = document.querySelectorAll('.menu-item__card');
        if (menuItems.length > 4) {
            menuItems.forEach((item, index) => {
                if (index >= 4) {
                    item.style.display = 'block';
                }
            });
        }
    loadData.style.display = 'none'; 
});

document.getElementById('disable-default-menu').addEventListener('click', function(event) {
    event.preventDefault(); 
});

function setModalBtn(){
    const menuItems = document.querySelectorAll('.menu-item__card');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            openCardModel(item);
        });
    });
}
