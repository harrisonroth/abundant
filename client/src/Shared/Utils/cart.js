export const getCartContents = () => {
  return JSON.parse(localStorage.getItem('cart'));
};

export const clearCartContents = () => {
  localStorage.removeItem('cart');
};

export const removeItemFromCart = index => {
  var cart = getCartContents();
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addItemToCart = item => {
  var cart = getCartContents();
  if (cart == null) {
    cart = [];
  }
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
};
