const db = require('../config/db');

const Product = {

    getAllWithInventory: async () => {
        const result = await db.query(`
            SELECT 
                p.id AS product_id,
                p.name,
                p.price,
                p.category,
                p.image_url,
                p.updated_at,
                COALESCE(i.available_stock, 0) AS available_stock
            FROM products p
            LEFT JOIN inventory i ON p.id = i.product_id
            ORDER BY p.updated_at DESC
        `);
        return result.rows;
    },

    getById: async (id) => {
        const result = await db.query(`
            SELECT p.*, i.available_stock
            FROM products p
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE p.id = $1
        `, [id]);
        return result.rows[0];
    },

    updateStock: async (id, quantity) => {
        const result = await db.query(`
            UPDATE inventory
            SET 
                available_stock = available_stock - $2,
                reserved_stock = reserved_stock + $2,
                last_updated = NOW()
            WHERE product_id = $1
            AND available_stock >= $2
            RETURNING *
        `, [id, quantity]);

        return result.rows[0];
    }

};

module.exports = Product;