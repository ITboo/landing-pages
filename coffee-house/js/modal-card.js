
import data from '../assets/menu/products.json' assert { type: 'json' };

const openCardModel = (item) => { 
const modalWindow = document.getElementById('modal');
const copyData = data;
let closeBtn;
const body = document.body;
openModel(item);


function openModel(item) {
    const itemName = item.getElementsByTagName("h3")[0].innerHTML;
    const itemImage = item.querySelector('.menu-item__card_image-wrapper');
    const result = copyData.find(element => element.name === itemName);
    const rowHTML = generateRowHTML(result, itemImage);
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.insertAdjacentHTML('beforeend', rowHTML);
    openModelWindow();
}

function generateRowHTML(element, itemImage) {
    let buttonsHTML = '';
    for (const key in element.sizes) {
        if (Object.hasOwnProperty.call(element.sizes, key)) {
            const sizeObj = element.sizes[key];
            const size = sizeObj.size;
            const addPrice = sizeObj['add-price'];
            if (key === 's') {
                buttonsHTML += `
                  <div class="menu-btn modal-wrapper__btn-set_item menu-btn-checked btn-size" data-attribute="${String(addPrice)}">
                      <span class="menu-btn__cicle single-modal">${key}</span>
                      <span class="single-modal description__ml">${size}</span>
                  </div>`;
              } else {
                buttonsHTML += `
                  <div class="menu-btn modal-wrapper__btn-set_item btn-size" data-attribute="${String(addPrice)}">
                      <span class="menu-btn__cicle single-modal">${key}</span>
                      <span class="single-modal description__ml">${size}</span>
                  </div>`;
              }
        }
    }

    let additivesHTML = '';

    for (const [index, additive] of element.additives.entries()) {
        const additiveName = additive.name;
        const additivePrice = additive['add-price'];
        additivesHTML += `
            <div class="menu-btn modal-wrapper__btn-set_item btn-additive" data-attribute="${String(additivePrice)}">
                <span class="menu-btn__cicle single-modal">${index+1}</span>
                <span class="single-modal smallcase">${additiveName}</span>
            </div>`;
    }

    const image =  `<div class="modal-wrapper__card-img"> 
    <img src="${element.img}" alt="${String(element.category)}"></div> `;

    return `
    ${image}
    <div class="modal-wrapper__text">
        <h3>${element.name}</h3>
        <p class="coffee-description">${element.description}</p>
        <p class="coffee-description size-additive">Size</p>
        <div class="modal-wrapper__btn-set">${buttonsHTML}</div>
        <p class="coffee-description size-additive">Additives</p>
        <div class="modal-wrapper__btn-set">${additivesHTML}</div>
        <div class="total-price">
        <p class="slider-item__price">Total:</p>
        <p class="slider-item__price card-display" id="item-price">$${element.price}</p>   
        </div>
        <hr>
        <div class="static-block__ads">
            <img class="info-empty" src="assets/icons/info-empty.svg" alt="info empty">
            <p class="mobile-btn__wrapper_sub-title modal-window_description">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
        </div>
        <button class="modal__close-btn link-btn" id="close_modal">Close</button>
    </div>
`;
}


function openModelWindow(){
    modalWindow.classList.add('modal_visibility');
    body.classList.add('scroll_block');
    closeBtn = document.getElementById('close_modal');
    closeBtn.addEventListener('click', closeModal);
    setButtons();
}



function closeModal(){
    modalWindow.classList.add('modal_hide');
    body.classList.remove('scroll_block');

    setTimeout(function () {
    modalWindow.classList.remove('modal_visibility');
    modal.classList.remove('modal_hide');
    document.querySelector('.modal-wrapper').innerHTML = '';
  }, 800);

}

modalWindow.addEventListener('click', function (event) {
    if (event.target === modal) {
        modalWindow.classList.add('modal_hide');
  
        setTimeout(function () {
            modalWindow.classList.remove('modal_visibility');
            modal.classList.remove('modal_hide');
            body.classList.remove('scroll_block');
            document.querySelector('.modal-wrapper').innerHTML = '';
          }, 300);
        }
});

function setButtons() {
    let btnSizes = document.querySelectorAll('.btn-size');
    let btnAdditives = document.querySelectorAll('.btn-additive');
    let productPrice = document.getElementById('item-price');
    const initialValue = productPrice.textContent.substring(1);
    let price = parseFloat(initialValue);
    btnSizes.forEach(btn => {
        btn.addEventListener('click', () => {
            let size = parseFloat(btn.getAttribute('data-attribute'));
            if (btn.classList.contains('menu-btn-checked')){
                price -= size;
            }
            btnSizes.forEach(button => {
                if (button !== btn && button.classList.contains('menu-btn-checked')) {
                button.classList.remove('menu-btn-checked');
                price -= parseFloat(button.getAttribute('data-attribute'));
                }
            });
            btn.classList.add('menu-btn-checked');
            price += size;
            setTimeout(() => {
                productPrice.innerHTML = '$' + price.toFixed(2);
              }, 300);
        });
    });


    btnAdditives.forEach(btn => {
        btn.addEventListener('click', () => {
            let additive = parseFloat(btn.getAttribute('data-attribute'));
            btn.classList.toggle('menu-btn-checked');
            if (btn.classList.contains('menu-btn-checked')){
                price += additive;
            } else {
                price -= additive;
            }
            productPrice.innerHTML = '$' + price.toFixed(2);
        });
    });
 }
}

export default openCardModel;