const paymentService = require('../services/paymentService');

const paymentController = {
    processPayment: async (req, res, next) => {
        try {
            const { order_id } = req.body;
            
            if (!order_id) {
                return res.status(400).json({ message: "order_id is required" });
            }

            const payment = await paymentService.processPayment(order_id);
            res.json({
                message: payment.status === 'Completed' ? "Payment processed successfully" : "Payment failed",
                payment_id: payment.id,
                status: payment.status
            });
        } catch (error) {
            if (error.message === 'Order not found') {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    }
};

module.exports = paymentController;
