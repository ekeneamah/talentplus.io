const express = require('express');
const router = express.Router();
const cartService = require('../service/cartService');

router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartService.getCart(userId);
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const cartItem = req.body;
  try {
    const cart = await cartService.addToCart(userId, cartItem);
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/cart/:userId/:cartItemId', async (req, res) => {
  const { userId, cartItemId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartService.updateCartItem(userId, cartItemId, quantity);
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/cart/:userId/:cartItemId', async (req, res) => {
  const { userId, cartItemId } = req.params;
  try {
    const cart = await cartService.removeCartItem(userId, cartItemId);
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartService.clearCart(userId);
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
