import "../src/styles/style.scss";
import { products } from "./products.js";
import { renderCard } from "./card.js";
import { renderCart } from "./cartView.js";

renderCart();

function renderProductList() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = renderCard(product);
    container.appendChild(card);
  });
}

renderProductList();
