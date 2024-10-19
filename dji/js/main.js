import { renderProductCards } from "./modules/productCards.js";
//import { paginate } from "./modules/paginate.js";
import { closeCart, openCart } from "./modules/cartPopup.js";

import products from "./products.js";
import { filter } from "./modules/productFilters.js";
import { renderInitialProducts } from "./modules/renderInitialProducts.js";
import { showMoreProducts } from "./modules/showMoreProducts.js";

window.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".js-products-list");
  let firstProductIndex = 0;
  let lastProductIndex = 8;
  //renderProductCards(products, productsContainer);
  //paginate(products);
  openCart();
  closeCart();
  filter(products, productsContainer);
  renderInitialProducts(
    products,
    productsContainer,
    firstProductIndex,
    lastProductIndex
  );
  showMoreProducts(products,
    productsContainer,
    firstProductIndex,
    lastProductIndex)
});
