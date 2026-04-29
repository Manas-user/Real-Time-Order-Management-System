const Product = require('../models/productModel');

const productController = {

    getAllProducts: async (req, res, next) => {
        try {
            const products = await Product.getAllWithInventory();
            res.status(200).json(products);
        } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
}
    }

};

module.exports = productController;