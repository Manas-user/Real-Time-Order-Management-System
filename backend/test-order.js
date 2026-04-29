const Order = require('./src/models/orderModel');

async function testOrder() {
    try {
        console.log("Testing Order.create...");
        // Assuming userId 1, productId 1, quantity 2, totalPrice 50.00
        const order = await Order.create(1, 1, 2, 50.00);
        console.log("Order created:", order);

        console.log("Testing Order.getById...");
        const retrieved = await Order.getById(order.id);
        console.log("Order retrieved:", retrieved);

    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        process.exit();
    }
}

testOrder();
