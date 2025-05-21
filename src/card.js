import { products } from "./products";
import {
  addItemToCart,
  getQuantity,
  reduceItemFromCart,
  getCartItems,
  isExistingInCart,
} from "./cartState";
import { renderCart } from "./cartView";

export function renderCard(product) {
  const li = document.createElement("li");
  li.className = `c-card`;
  li.dataset.id = `${product.id}`;

  li.innerHTML = `
    <div class="c-card__wrapper">
      <div class="c-card__productImage">
        <picture>
          <source media="(min-width: 1024px)" srcset="${product.imagePc}">
          <source media="(min-width: 768px)" srcset="${product.imageTb}">
          <img src="${product.imageSp}" alt="${product.name}">
        </picture>
      </div>
      <div class="c-card__btnArea" ></div>
    </div>
    
    <span class="c-card__productCat">${product.cat}</span>
    <h2 class="c-card__productName">${product.name}</h2>
    <span class="c-card__productPrice">$${product.price.toFixed(2)}</span>
  `;

  const btnArea = li.querySelector(".c-card__btnArea");
  const isInCart = isExistingInCart(product.id);
  if (isInCart) {
    btnArea.appendChild(createQuantityButton(product));
  } else {
    btnArea.appendChild(createDefaultButton(product));
  }

  return li;
}

function createDefaultButton(product) {
  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.className = "addToCartBtn c-buttonPrimary";

  button.addEventListener("click", () => {
    addItemToCart(product);
    updataCard(product.id);
    renderCart();
  });
  return button;
}

function createQuantityButton(product) {
  const button = document.createElement("div");
  button.className = "quantityButton c-buttonPrimary c-buttonPrimary--rev ";

  const minus = document.createElement("span");
  minus.className = "minusIcon";
  minus.innerHTML = `<img src="images/Subtract-Icon.svg" alt="minus icon" tabindex="0">`;

  ["mouseover", "focus"].forEach((event) => {
    minus.firstElementChild.addEventListener(event, () => {
      minus.firstElementChild.src = "images/Subtract-Icon-hover.svg";
    });
  });

  ["mouseleave", "blur"].forEach((event) => {
    minus.firstElementChild.addEventListener(event, () => {
      minus.firstElementChild.src = "images/Subtract-Icon.svg";
    });
  });

  const quantity = document.createElement("span");
  quantity.className = "itemQuantity";
  quantity.textContent = getQuantity(product);

  const plus = document.createElement("span");
  plus.className = "plusIcon";
  plus.innerHTML = `<img src="images/Add-Icon.svg" alt="plus icon" tabindex="0">`;

  ["mouseover", "focus"].forEach((event) => {
    plus.firstElementChild.addEventListener(event, () => {
      plus.firstElementChild.src = "images/Add-Icon-hover.svg";
    });
  });

  ["mouseleave", "blur"].forEach((event) => {
    plus.firstElementChild.addEventListener(event, () => {
      plus.firstElementChild.src = "images/Add-Icon.svg";
    });
  });

  ["click", "keydown"].forEach((eventType) => {
    button.addEventListener(eventType, (e) => {
      if (eventType === "keydown" && e.key !== "Enter") return;

      const activeElement = document.activeElement;
      const isPlus = activeElement.closest(".plusIcon");
      const isMinus = activeElement.closest(".minusIcon");

      if (e.target.closest(".plusIcon")) {
        addItemToCart(product);
        updataCard(product.id);
        restoreFocusAfterUpdate(product.id, "plusIcon");
      } else if (e.target.closest(".minusIcon")) {
        reduceItemFromCart(product);
        updataCard(product.id);
        restoreFocusAfterUpdate(product.id, "minusIcon");
      }

      renderCart();
    });
  });

  button.append(minus, quantity, plus);

  return button;
}

export function updataCard(productId) {
  const card = document.querySelector(`[data-id="${productId}"]`);
  if (!card) return;

  const btnArea = card.querySelector(".c-card__btnArea");
  btnArea.innerHTML = ``;

  const product = products.find((p) => p.id === productId);

  if (isExistingInCart(productId)) {
    btnArea.appendChild(createQuantityButton(product));
    card.classList.add("js-isInCart");
  } else {
    btnArea.appendChild(createDefaultButton(product));
    card.classList.remove("js-isInCart");
  }
}

//フォーカス復元関数
function restoreFocusAfterUpdate(productId, iconClass) {
  const activeButton = document.querySelector(
    `[data-id="${productId}"] .quantityButton`
  );
  if (!activeButton) return;
  const icon = activeButton.querySelector(`.${iconClass} img`);
  if (icon) icon.focus();
}
