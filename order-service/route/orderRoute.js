const express = require('express');
const router = express.Router();
const orderService = require('../service/orderService');

router.get('/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await orderService.getOrders(userId);
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/orders', async (req, res) => {
  const orderData = req.body;
  try {
    const order = await orderService.createOrder(orderData);
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
