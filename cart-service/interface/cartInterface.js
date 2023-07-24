class CartInterface {
    getCart(userId) {}
    addToCart(userId, cartItem) {}
    updateCartItem(userId, cartItemId, quantity) {}
    removeCartItem(userId, cartItemId) {}
    clearCart(userId) {}
  }
  
  module.exports = CartInterface;
  