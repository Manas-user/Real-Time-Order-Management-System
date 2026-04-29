const orderService = require('../services/orderService');
const db = require('../config/db'); // Needed for getOrderStatus fallback

const orderController = {
    createOrder: async (req, res, next) => {
        try {
            const { user_id, product_id, quantity } = req.body;

            // Basic validation
            if (!user_id || !product_id || !quantity) {
                return res.status(400).json({ message: "Missing required fields: user_id, product_id, quantity" });
            }

            if (quantity <= 0) {
                return res.status(400).json({ message: "Quantity must be greater than zero" });
            }

            console.log(`Creating order for user ${user_id}, product ${product_id}, quantity ${quantity}`);

            const { orderId, remainingStock } = await orderService.createOrder(user_id, product_id, quantity);
            
            return res.status(201).json({
                message: "Order created successfully",
                order_id: orderId,
                remainingStock: remainingStock
            });
        } catch (error) {
            if (error.message === 'Insufficient stock' || error.message === 'Stock unavailable during update' || error.message === 'Product not found') {
                return res.status(409).json({ message: error.message });
            }
            next(error);
        }
    },
    getOrderStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderStatus(id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Map database fields to the requested frontend format
            const formattedOrder = {
                order_id: order.id,
                product_name: order.product_name,
                quantity: order.quantity,
                total_price: order.total_price,
                payment_status: order.payment_status || 'Pending',
                order_status: order.status,
                created_at: order.created_at
            };

            res.json(formattedOrder);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = orderController;
