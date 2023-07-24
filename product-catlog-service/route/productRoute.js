const express = require('express');
const router = express.Router();
const productService = require('../service/productService')

router.get('/products', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.post('/products', async (req, res) => {
  const productData = req.body;
  try {
    const product = await productService.createProduct(productData);
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const productData = req.body;
  try {
    const product = await productService.updateProduct(productId, productData);
    res.json({ success: true, product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.deleteProduct(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

module.exports = router;
