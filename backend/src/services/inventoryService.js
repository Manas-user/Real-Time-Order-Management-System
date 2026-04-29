const Product = require('../models/productModel');

const inventoryService = {
    checkAvailability: async (productId, quantity) => {
        const product = await Product.getById(productId);
        return product && product.available_stock >= quantity;
    },
    reserveStock: async (productId, quantity) => {
        return await Product.updateStock(productId, quantity);
    }
};

module.exports = inventoryService;
