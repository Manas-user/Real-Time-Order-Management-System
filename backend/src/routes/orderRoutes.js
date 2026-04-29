const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/create', orderController.createOrder);
router.get('/status/:id', orderController.getOrderStatus);

module.exports = router;
