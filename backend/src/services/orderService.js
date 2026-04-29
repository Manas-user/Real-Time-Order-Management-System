const db = require('../config/db');

const orderService = {
    createOrder: async (user_id, product_id, quantity) => {
        const client = await db.pool.connect();

        try {
            await client.query('BEGIN');

            // 1. Fetch product price
            const productRes = await client.query('SELECT price FROM products WHERE id = $1', [product_id]);
            if (productRes.rows.length === 0) {
                throw new Error('Product not found');
            }
            const price = parseFloat(productRes.rows[0].price);

            // 2. Lock and Check inventory availability (Pessimistic Locking)
            const inventoryRes = await client.query('SELECT available_stock FROM inventory WHERE product_id = $1 FOR UPDATE', [product_id]);
            if (inventoryRes.rows.length === 0) {
                throw new Error('Inventory record not found for this product');
            }
            const available_stock = inventoryRes.rows[0].available_stock;
            if (available_stock < quantity) {
                throw new Error('Insufficient stock');
            }

            // 3. Atomic stock reservation
            const updateInventoryRes = await client.query(
                `UPDATE inventory 
                 SET available_stock = available_stock - $2, 
                     reserved_stock = reserved_stock + $2 
                 WHERE product_id = $1 AND available_stock >= $2 
                 RETURNING available_stock`,
                [product_id, quantity]
            );

            if (updateInventoryRes.rows.length === 0) {
                throw new Error('Stock unavailable during update'); // Safety check
            }
            
            const remainingStock = updateInventoryRes.rows[0].available_stock;

            // 4. Calculate total price
            const total_price = price * quantity;

            // 5. Create order
            const orderRes = await client.query(
                `INSERT INTO orders (user_id, total_price, status) 
                 VALUES ($1, $2, 'Pending') 
                 RETURNING id`,
                [user_id, total_price]
            );
            const order_id = orderRes.rows[0].id;

            // 6. Insert order_items record
            await client.query(
                `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) 
                 VALUES ($1, $2, $3, $4)`,
                [order_id, product_id, quantity, price]
            );

            // 7. Create payment record (status = Pending)
            await client.query(
                `INSERT INTO payments (order_id, amount, status) 
                 VALUES ($1, $2, 'Pending')`,
                [order_id, total_price]
            );

            // 8. Commit transaction
            await client.query('COMMIT');

            return { orderId: order_id, remainingStock };

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },
    getOrderStatus: async (orderId) => {
        const result = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
        return result.rows[0];
    }
};

module.exports = orderService;
