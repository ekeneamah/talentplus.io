const express = require('express');
const router = express.Router();
const paymentService = require('../service/paymentService');

router.post('/payment', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    // In a real-world scenario, you would verify the user's token or perform OAuth2 validation here.
    // For simplicity, we're assuming the user is authenticated to make a payment.

    const paymentResult = await paymentService.processPayment(userId, amount);
    res.json(paymentResult);
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

module.exports = router;
