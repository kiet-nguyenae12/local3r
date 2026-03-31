// src/routes/orderRoutes.js
/**
 * Order Routes
 * Định nghĩa các endpoint liên quan đến đơn hàng
 */
const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

/**
 * Order management
 */
router.post('/', orderController.createOrder)
router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.put('/:id', orderController.updateOrderStatus)
router.delete('/:id', orderController.cancelOrder)

module.exports = router
