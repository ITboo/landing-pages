import { renderProductCards } from "./modules/productCards.js";
import { paginate } from "./modules/paginate.js";
import { closeCart, openCart } from "./modules/cartPopup.js";

import products from "./products.js";

window.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".js-products-list");
  renderProductCards(products, productsContainer);
  paginate(products);
  openCart();
  closeCart();
});
