const OrderModel = require('../model/orderModel');

class OrderService {
  async getOrders(userId) {
    const orders = await OrderModel.find({ userId });
    return orders;
  }

  async createOrder(orderData) {
    // Validate order data before creating a new order
    if (!orderData.userId || !orderData.items || orderData.items.length === 0) {
      throw new Error('Invalid order data');
    }

    const order = await OrderModel.create(orderData);
    return order;
  }
}

module.exports = new OrderService();
