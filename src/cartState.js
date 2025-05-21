const cartItems = [];

export function getCartItems() {
  return cartItems;
}

export function addItemToCart(product) {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
}

export function reduceItemFromCart(product) {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem.quantity === 1) {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
  } else {
    existingItem.quantity -= 1;
  }
}

export function isExistingInCart(productId) {
  if (cartItems.find((item) => item.id === productId)) {
    return true;
  } else {
    return false;
  }
}

export function getQuantity(product) {
  const item = cartItems.find((item) => item.id === product.id);
  if (item) {
    return item.quantity;
  } else {
    return 0;
  }
}

export function removeItemInCart(cartItem) {
  const index = cartItems.findIndex((item) => item.id === cartItem.id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
}
