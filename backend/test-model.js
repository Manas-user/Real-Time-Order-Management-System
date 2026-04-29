const Product = require('./src/models/productModel');

async function test() {
    try {
        console.log("Testing getAllWithInventory...");
        const res = await Product.getAllWithInventory();
        console.log("SUCCESS:", res);
    } catch (e) {
        console.error("ERROR CAUGHT:");
        console.error(e);
    } finally {
        process.exit(0);
    }
}

test();
