const CartModel = require('../model/cartModel');

class CartService {
  async getCart(userId) {
    const cart = await CartModel.findOne({ userId });
    return cart;
  }

  async addToCart(userId, cartItem) {
    // Validate cart item data before adding to the cart
    if (!cartItem.productId || !cartItem.quantity || cartItem.quantity <= 0) {
      throw new Error('Invalid cart item data');
    }

    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $push: { items: cartItem } },
      { new: true, upsert: true }
    );
    return cart;
  }

  async updateCartItem(userId, cartItemId, quantity) {
    if (!quantity || quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    const cart = await CartModel.findOneAndUpdate(
      { userId, 'items._id': cartItemId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );
    return cart;
  }

  async removeCartItem(userId, cartItemId) {
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: cartItemId } } },
      { new: true }
    );
    return cart;
  }

  async clearCart(userId) {
    const cart = await CartModel.findOneAndDelete({ userId });
    return cart;
  }
}

module.exports = new CartService();
