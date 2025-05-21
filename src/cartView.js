import { getCartItems, removeItemInCart } from "./cartState";
import { updataCard } from "./card";

export function renderCart() {
  const cartItems = getCartItems();

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const container = document.getElementById("cart");
  container.innerHTML = `
  <h2>Your Cart (${totalItems})</h2>
  <div class="p-cart__emptyPlaceholder">
    <img src="/images/illustration-empty-cart.svg" >
    <p>Your added items will appear here</p>
  </div>
  <div>
    <ul id="cartItemsArea" class="p-cart__cartItemsArea" ></ul>
  </div>
  
  <p class="p-cart__totalPrice" style="display: none;">Order Total<span class="">$${totalPrice.toFixed(
    2
  )}</span></p>
  <p class="p-cart__deliveryInfo" style="display: none;"><span>This is a <span class="u-fw600">carbon-natural </span>delivery</span></p>
  <div id="confirmButtonArea" class="p-cart__confirmButtonArea"></div>
  `;

  //初期状態の画像＋メッセージとカートに商品を追加した時の中身の表示の切り替え
  const isEmpty = cartItems.length === 0;
  document.querySelector(".p-cart__emptyPlaceholder").style.display = isEmpty
    ? "block"
    : "none";
  document.querySelector(".p-cart__totalPrice").style.display = isEmpty
    ? "none"
    : "flex";
  document.querySelector(".p-cart__deliveryInfo").style.display = isEmpty
    ? "none"
    : "flex";
  document.querySelector("#confirmButtonArea").style.display = isEmpty
    ? "none"
    : "block";

  document
    .getElementById("confirmButtonArea")
    .appendChild(createConfirmButton());

  cartItems.forEach((cartItem) => {
    const li = document.createElement("li");
    li.className = "p-cart__cartItem";
    const total = cartItem.quantity * cartItem.price;

    li.innerHTML = `
      <div class="p-cart__itemDetails">
        <p class="p-cart__itemName">${cartItem.name}</p>
        <span class="p-cart__itemQuantity">${cartItem.quantity}x</span>
        <span class="p-cart__itemPrice">@ $${cartItem.price.toFixed(2)}</span>
        <span class="p-cart__itemTotal">$${total.toFixed(2)}</span>
      </div>
      <div class="p-cart__removeButtonArea"></div>      
    `;

    const buttonArea = document.querySelector(".p-cart__removeButtonArea");
    const button = document.createElement("button");
    button.className = "p-cart__removeButton";
    button.innerHTML = `
      <!-- <img src="/images/icon_removeItem.svg" alt="remove icon"> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z" fill="currentColor"/>
      <path d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z" fill="currentColor"/>
      </svg>
    `;

    button.addEventListener("click", () => {
      removeItemInCart(cartItem);
      renderCart();
      updataCard(cartItem.id);
    });

    const container = document.getElementById("cartItemsArea");
    container.appendChild(li);
    li.querySelector(".p-cart__removeButtonArea").appendChild(button);
  });
}

function createConfirmButton() {
  const button = document.createElement("button");
  button.className =
    "p-cart__confirmButton  c-buttonPrimary c-buttonPrimary--rev";
  button.textContent = "Confirm Order";

  button.addEventListener("click", () => {
    renderModal();
    const overlayElement = document.getElementById("overlayElement");
    overlayElement.classList.add("is-active");
  });

  return button;
}

function createOderTotalPrice() {
  const cartItems = getCartItems();
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const totalPriceElement = document.createElement("p");
  totalPriceElement.className = "p-confirmationModal__totalPrice";
  totalPriceElement.innerHTML = `Order Total: <span>$${totalPrice.toFixed(
    2
  )}</span>`;
  return totalPriceElement;
}

function createConfirmedItemsList() {
  const cartItems = getCartItems();
  const itemList = document.createElement("ul");

  cartItems.forEach((cartItem) => {
    const total = cartItem.quantity * cartItem.price;
    const item = document.createElement("li");
    item.className = "c-modalItem";

    item.innerHTML = `
      <img class=c-modalItem__img src="${cartItem.imageTb}" alt="${
      cartItem.name
    }">
      <div class="c-modalItem__itemDetails">
        <p class="c-modalItem__itemName">${cartItem.name}</p>
        <span class="c-modalItem__itemQuantity">${cartItem.quantity}x</span>
        <span class="c-modalItem__itemPrice">@ $${cartItem.price.toFixed(
          2
        )}</span>
      </div>
      
      <span class="c-modalItem__itemTotal">$${total.toFixed(2)}</span>
    `;

    itemList.appendChild(item);
  });

  return itemList;
}

function createNewOderButton() {
  const button = document.createElement("button");
  button.textContent = "Start New Order";
  button.className = "newOderButton c-buttonPrimary c-buttonPrimary--rev";

  button.addEventListener("click", () => {
    location.reload();
  });

  return button;
}

function renderModal() {
  const modalContainer = document.getElementById("confirmationModal");
  modalContainer.style.display = "block";
  document.body.style.position = "fixed";
  modalContainer.innerHTML = `
    <div class="p-confirmationModal__messages">
      <h2>Order <br class="u-hiddenTb">Confirmed</h2>
      <p>We hope you enjoy your food!</p>
    </div>
    <div class="p-confirmationModal__itemsArea">
    </div>
    <div class=p-confirmationModal__newOderButtonArea></div>
  `;

  const itemsArea = document.querySelector(".p-confirmationModal__itemsArea");
  itemsArea.append(createConfirmedItemsList(), createOderTotalPrice());

  const buttonArea = document.querySelector(
    ".p-confirmationModal__newOderButtonArea"
  );
  buttonArea.appendChild(createNewOderButton());
}
