const db = require('../config/db');

const Payment = {
    create: async (orderId, amount, status) => {
        const result = await db.query(
            'INSERT INTO payments (order_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
            [orderId, amount, status]
        );
        return result.rows[0];
    },
    updateStatus: async (orderId, status) => {
        const result = await db.query(
            'UPDATE payments SET status = $2, updated_at = NOW() WHERE order_id = $1 RETURNING *',
            [orderId, status]
        );
        return result.rows[0];
    }
};

module.exports = Payment;
