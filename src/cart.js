// import { cartItems } from "./card";

import { renderCard } from "./card";

export function renderCart() {
  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  const container = document.getElementById("cart");
  container.innerHTML = `
  <h2>Your Cart (${totalItems})</h2>
  <div class="emptyPlaceholder">
    <img src="/images/illustration-empty-cart.svg" >
    <p>Your added items will appear here</p>
  </div>
  <div>
    <ul id="cartItemsArea" ></ul>
  </div>
  
  <p class="totalPrice" style="display: none;">${totalPrice}</p>

  <p class="carbonNaturalInfo" style="display: none;">This is a <span>carbon-natural</span> delivery</p>
  `;

  //初期状態の画像＋メッセージとカートに昇進を追加した時の中身の表示の切り替え
  const isEmpty = cartItems.length === 0;
  document.querySelector(".emptyPlaceholder").style.display = isEmpty
    ? "block"
    : "none";
  document.querySelector(".totalPrice").style.display = isEmpty
    ? "none"
    : "block";
  document.querySelector(".carbonNaturalInfo").style.display = isEmpty
    ? "none"
    : "block";

  cartItems.forEach((cartItem) => {
    const cartItemsArea = document.getElementById("cartItemsArea");
    const item = renderCartItems(cartItem);
    if (item) {
      cartItemsArea.appendChild(item);
    }
    // cartItemsArea.appendChild(item);
  });
}

function renderCartItems(cartItem) {
  const item = document.createElement("li");
  item.innerHTML = `
    <p>${cartItem.name}</p>
    <span>x${cartItem.quantity}</span>
    <span>@$${cartItem.price}</span>
    <span>$${cartItem.quantity * cartItem.price}</span>
    <div class="removeButtonArea" ></div>    
  `;
  const button = renderRemoveButton(cartItem);
  const buttonArea = item.querySelector(".removeButtonArea");
  buttonArea.appendChild(button);

  return item;
}

function renderRemoveButton(cartItem) {
  const button = document.createElement("button");
  button.innerHTML = `
    <img src="/images/icon_removeItem.svg" alt="remove icon">
  `;
  button.addEventListener("click", () => {
    const index = cartItems.findIndex((item) => item.id === cartItem.id);
    cartItems.splice(index, 1);
    console.log(cartItems);
  });
  return button;
}

const cartItems = [];

export function getQuantity(product) {
  const item = cartItems.find((item) => item.id === product.id);
  return item.quantity;
}

// export function addToCart(product) {
//   const existingItem = cartItems.find((item) => item.id === product.id);

//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cartItems.push({ ...product, quantity: 1 });
//   }

//   renderCart(cartItems);
// }

export function addToCart(product) {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  renderCart(cartItems);
}

export function reduceFromCart(product) {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem.quantity === 1) {
    const index = cartItems.findIndex((item) => existingItem.id === product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
  } else {
    existingItem.quantity -= 1;
  }

  renderCart(cartItems);
}
