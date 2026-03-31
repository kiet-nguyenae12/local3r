// src/routes/productRoutes.js
/**
 * Product Routes
 * Định nghĩa các endpoint liên quan đến sản phẩm
 */
const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

/**
 * Public routes
 */
router.get('/', productController.getProductsByRegion)
router.get('/:id', productController.getProductById)

/**
 * Admin routes (cần authentication)
 */
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
