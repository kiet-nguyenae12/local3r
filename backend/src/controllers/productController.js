// src/controllers/productController.js
/**
 * Product Controller
 * Xử lý các logic liên quan đến sản phẩm
 * Database: MySQL (Sequelize)
 */
const Product = require('../models/Product')
const { Op } = require('sequelize')

/**
 * Lấy danh sách sản phẩm theo vùng miền
 * GET /api/products?region=Bắc&page=1&limit=20
 */
exports.getProductsByRegion = async (req, res) => {
  try {
    const { region, page = 1, limit = 20, search } = req.query
    const offset = (page - 1) * limit

    let where = { isActive: true }
    
    if (region) {
      where.region = region
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ]
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
    })

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error.message,
    })
  }
}

/**
 * Lấy chi tiết sản phẩm
 * GET /api/products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không tồn tại',
      })
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết sản phẩm',
      error: error.message,
    })
  }
}

/**
 * Thêm sản phẩm (Admin)
 * POST /api/products
 * Body: { name, description, price, region, stock, category, mainImage }
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, region, stock, category, mainImage, originalPrice } = req.body

    // Validation
    if (!name || !price || !region || !category) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin (name, price, region, category)',
      })
    }

    const product = await Product.create({
      name,
      description,
      price,
      region,
      stock: stock || 0,
      category,
      mainImage,
      originalPrice: originalPrice || price,
      sku: `SKU-${Date.now()}`,
    })

    res.status(201).json({
      success: true,
      message: 'Sản phẩm được tạo thành công',
      data: product,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm',
      error: error.message,
    })
  }
}

/**
 * Cập nhật sản phẩm (Admin)
 * PUT /api/products/:id
 * Body: { name, description, price, region, stock, category, mainImage, isActive }
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không tồn tại',
      })
    }

    // Cập nhật chỉ những field được cung cấp
    await product.update(req.body)

    res.json({
      success: true,
      message: 'Sản phẩm được cập nhật thành công',
      data: product,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật sản phẩm',
      error: error.message,
    })
  }
}

/**
 * Xóa sản phẩm (Admin)
 * DELETE /api/products/:id
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không tồn tại',
      })
    }

    await product.destroy()

    res.json({
      success: true,
      message: 'Sản phẩm được xóa thành công',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm',
      error: error.message,
    })
  }
}

/**
 * Lấy tất cả sản phẩm
 * GET /api/products/all
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
    })

    res.json({
      success: true,
      data: products,
      total: products.length,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error.message,
    })
  }
}
