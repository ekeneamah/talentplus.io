const ProductModel = require('../model/productModel');

class ProductService {
  
  async getAllProducts() {
    const products = await ProductModel.find();
    return products;
  }

  async getProduct(productId) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(productData) {
    // Validate product data before creating a new product
    if (!productData.name || !productData.price) {
      throw new Error('Product name and price are required');
    }

    const product = await ProductModel.create(productData);
    return product;
  }

  async updateProduct(productId, productData) {
    const product = await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async deleteProduct(productId) {
    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

module.exports = new ProductService();
