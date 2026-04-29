const axios = require('axios');

// 1. Configuration 
const CONFIG = {
    url: 'http://localhost:5000/api/orders/create', // Updated to exact endpoint
    productId: 1, 
    concurrentRequests: 10 
};

async function runTest() {
    console.log(`--- 🚀 Starting Concurrency Test ---`);
    console.log(`Sending ${CONFIG.concurrentRequests} simultaneous orders for Product ID: ${CONFIG.productId}\n`);

    // Create an array of simultaneous promises
    const tasks = Array.from({ length: CONFIG.concurrentRequests }).map((_, i) => {
        return axios.post(CONFIG.url, {
            product_id: CONFIG.productId,  
            quantity: 1,
            user_id: 1                     
        }).catch(err => {
            return err.response || { status: 503, data: err.message }; 
        }); 
    });

    // Execute all at the EXACT same time
    const responses = await Promise.all(tasks);

    // 2. Analyze Results
    const success = responses.filter(r => r.status === 201 || r.status === 200).length;
    const failed = responses.filter(r => r.status === 409 || r.status === 400).length;

    console.log("------------------------------------");
    console.log(`✅ SUCCESSFUL ORDERS: ${success}`);
    console.log(`❌ REJECTED (RACE CONDITION PREVENTED): ${failed}`);
    console.log("------------------------------------");
    
    // Check if there are other kinds of errors (e.g. 500 server error)
    const otherErrors = responses.filter(r => r.status !== 201 && r.status !== 200 && r.status !== 409 && r.status !== 400);
    if (otherErrors.length > 0) {
        console.log(`⚠️ OTHER ERRORS: ${otherErrors.length}`);
        console.log("Sample Error Response:", otherErrors[0].data || otherErrors[0].statusText);
    }

    if (success === 1) {
        console.log("RESULT: PASSED. Database integrity maintained via Row-Level Locking.");
    } else if (success > 1) {
        console.log("RESULT: FAILED. Race condition occurred! Multiple orders processed for 1 item.");
    } else if (success === 0 && failed > 0) {
        console.log("RESULT: FAILED TO PLACE ANY ORDER. Perhaps the initial stock is not exactly 1, or another error occurred.");
    }
}

runTest();
