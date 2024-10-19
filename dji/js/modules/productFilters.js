import { renderProductCards } from "./productCards.js";

export const filter = (products, productsContainer) => {
  const seriesFilterEl = document.querySelector(".js-filter-series");
  const seriesFilterItemsEl = document.querySelectorAll(".js-series-item");
  //const btnShowMore = document.querySelector('.js-btn-show-more')
  
  let currentSeriesFilter = null;

  const filterProducts = (filterSeries) => {
    let filteredProducts = products.filter((product) => {
      if (filterSeries && product.series !== filterSeries) {
        return false;
      }
      return true;
    });
    return filteredProducts;
  };

  const handleSeriesFilterClick = () => {
    seriesFilterEl.addEventListener("click", (event) => {
      if (!event.target.matches(".js-series-item")) {
        return;
      }
      seriesFilterItemsEl.forEach((item) => {
        item.classList.remove("active");
      });
      event.target.classList.add("active");
      if (event.target.dataset.value !== "all") {
        currentSeriesFilter = event.target.dataset.value;
      } else {
        currentSeriesFilter = null;
      }
      const filteredProducts = filterProducts(currentSeriesFilter);
      renderProductCards(filteredProducts, productsContainer)
    });
  };
  handleSeriesFilterClick();
};
