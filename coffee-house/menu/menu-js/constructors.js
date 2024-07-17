// Карточка продукта
class Product {
  constructor({ id, name, description, price, imageUrl }, onclickHandler) {
    this.id = id,
    this.name = name,
    this.description = description,
    this.price = price,
    this.imageUrl = imageUrl,
    this.onclickHandler = onclickHandler
  }

  createProduct() {
    const product = document.createElement('div');
    product.setAttribute('data-id', this.id);
    product.className = 'menu__item';

    const innerHtml = `
      <div class="menu-item__img-wrapper">
        <img class="menu-item__img" src="${this.imageUrl}" alt="${this.name}">
      </div>
      <div class="menu-item__content-wrapper">
        <h3 class="menu-item__title">${this.name}</h3>
        <p class="menu-item__desc">${this.description}</p>
        <span class="menu-item__price">$${this.price}</span>
      </div>
    `;

    product.innerHTML = innerHtml;
    product.addEventListener('click', () => this.onclickHandler(this.id));
    return product;
  }
}

// Модальная карточка
class ModalProduct {
  constructor(data, closeBtnHandler) {
    this.data = data,
    this.closeBtnHandler = closeBtnHandler
  }

  createModalProduct() {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const sizes = ['small', 'medium', 'large'].map((size, index) => {
      return `
        <input
          class="menu__input"
          type="radio"
          id="size-${size}"
          name="size"
          value="${size.at(0)}"
          ${index === 0 ? "checked" : ""}
        >
        <label class="tab" for="size-${size}">
          <span class="tab__icon tab__icon_modal">${size.at(0).toUpperCase()}</span>
          <span class="tab__name"></span>
        </label>
      `;
    });

    const additives = `
      <input
        class="menu__input"
        type="checkbox"
        id="add-"
        name="additives"
        value=" "
      >
      <label class="tab" for="add-">
        <span class="tab__icon tab__icon_modal"></span>
        <span class="tab__name"></span>
      </label>
    `;

    const innerHtml = `
      <div class="modal__inner">
        <div class="menu-item__img-wrapper">
          <img src="/" alt=" ">
        </div>
        <div class="modal__content">
          <div class="modal__content-title">
            <h3 class="menu-item__title"></h3>
            <p class="menu-item__desc"></p>
          </div>
          <form action="/">
            <h4 class="order__title">Size</h4>
            <div class="order">
              ${sizes.join('')}
            </div>
            <h4 class="order__title">Additives</h4>
            <div class="order">
              ${additives.repeat(3)}
            </div>
            <div class="order__price">
              <h3 class="menu-item__title">Total:</h3>
              <h3 class="menu-item__price"></h3>
            </div>
          </form>
          <p class="order__alert">
            The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
          </p>
          <button class="button button_order">Close</button>
        </div>
      </div>
    `;

    modal.innerHTML = innerHtml;

    const closeBtn = modal.querySelector('.button_order');
    closeBtn.addEventListener('click', this.closeBtnHandler);

    modal.querySelectorAll('.modal .menu__input').forEach(input => {
      input.addEventListener('click', () => this.recalculation(this.data));
    });

    return modal;
  }

  recalculation(data) {
    const inputs = Array.from(document.querySelectorAll('.modal .menu__input'));
    const selectedInputs = inputs.filter(input => input.checked);

    const itemId = document.querySelector('.modal').dataset.id;
    const itemObject = data.find(el => el.id === itemId);

    let totalPrice = +itemObject.price;

    selectedInputs.forEach(item => {
      const value = item.value;

      if (item.name === 'size') {
        const objSize = itemObject.sizes;
        totalPrice += Number(objSize[value]['add-price']);
      }

      if (item.name === 'additives') {
        const objAdd = itemObject.additives;
        totalPrice += Number(objAdd.find(el => el.name.toLowerCase() === value)['add-price']);
      }
    });
    
    document.querySelector('.modal .menu-item__price').textContent = `$${totalPrice.toFixed(2)}`;
  }

}

// Фон модального окна
function Overlay(clickHandler) {
  const div = document.createElement('div');
  div.className = 'overlay';
  div.addEventListener('click', (event) => clickHandler(event));
  return div;
}

export { Product, ModalProduct, Overlay }