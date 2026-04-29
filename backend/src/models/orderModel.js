const db = require('../config/db');

const Order = {
    create: async (userId, productId, quantity, totalPrice) => {
        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');
            
            // Create order
            const orderResult = await client.query(
                'INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *',
                [userId, totalPrice, 'Pending']
            );
            const order = orderResult.rows[0];

            // Insert into order_items (supporting future multi-item, but matching current request)
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
                [order.id, productId, quantity, totalPrice / quantity]
            );

            await client.query('COMMIT');
            return order;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },
    getById: async (id) => {
        const result = await db.query(`
            SELECT o.*, p.name as product_name, oi.quantity, pay.status as payment_status
            FROM orders o 
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id 
            LEFT JOIN payments pay ON o.id = pay.order_id
            WHERE o.id = $1
        `, [id]);
        return result.rows[0];
    },
    updateStatus: async (id, status) => {
        const result = await db.query(
            'UPDATE orders SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *',
            [id, status]
        );
        return result.rows[0];
    }
};

module.exports = Order;
