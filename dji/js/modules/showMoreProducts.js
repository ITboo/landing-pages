import { renderInitialProducts } from "./renderInitialProducts.js";

export const showMoreProducts = (
  products,
  productsContainer,
  firstProductIndex,
  lastProductIndex
) => {
  const btnShowMore = document.querySelector(".js-btn-show-more");
  let productIncrement = 4;
  const hideBtnShowMore = () => {
    if (lastProductIndex >= products.length) {
      btnShowMore.classList.add("hidden");
    }
  };
  btnShowMore.addEventListener("click", () => {
    firstProductIndex = lastProductIndex;
    lastProductIndex += productIncrement;
    renderInitialProducts(
      products,
      productsContainer,
      firstProductIndex,
      lastProductIndex
    );
    btnShowMore.scrollIntoView({
        behavior:'smooth'
    })
    hideBtnShowMore()
  });
  hideBtnShowMore()
};
