// src/controllers/orderController.js
/**
 * Order Controller
 * Xử lý các logic liên quan đến đơn hàng
 * Database: MySQL (Sequelize)
 */
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

/**
 * Tạo đơn hàng
 * POST /api/orders
 * Body: { items, totalPrice, customerInfo, paymentMethod }
 */
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, customerInfo, paymentMethod } = req.body

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Đơn hàng phải chứa ít nhất một sản phẩm',
      })
    }

    if (!customerInfo || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin',
      })
    }

    // Tính toán tổng tiền
    const shippingFee = 30000
    const discount = 0
    const finalAmount = totalPrice + shippingFee - discount

    // Tạo đơn hàng
    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      items: items.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      totalAmount: totalPrice,
      shippingFee,
      discount,
      finalAmount,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address,
      paymentMethod,
      userId: customerInfo.userId || null,
    })

    // Cập nhật tồn kho
    for (const item of items) {
      const product = await Product.findByPk(item.id)
      if (product) {
        await product.update({
          stock: product.stock - item.quantity,
        })
      }
    }

    res.status(201).json({
      success: true,
      message: 'Đơn hàng đã tạo thành công',
      orderId: order.id,
      orderNumber: order.orderNumber,
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message,
    })
  }
}

/**
 * Lấy danh sách đơn hàng (Admin)
 * GET /api/orders?status=pending&page=1&limit=20
 */
exports.getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    let where = {}
    if (status) {
      where.status = status
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
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
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: error.message,
    })
  }
}

/**
 * Lấy chi tiết đơn hàng
 * GET /api/orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Đơn hàng không tồn tại',
      })
    }

    res.json({
      success: true,
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết đơn hàng',
      error: error.message,
    })
  }
}

/**
 * Cập nhật trạng thái đơn hàng (Admin)
 * PUT /api/orders/:id
 * Body: { status, paymentStatus, trackingNumber }
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus, trackingNumber } = req.body

    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Đơn hàng không tồn tại',
      })
    }

    // Cập nhật
    await order.update({
      status: status || order.status,
      paymentStatus: paymentStatus || order.paymentStatus,
      trackingNumber: trackingNumber || order.trackingNumber,
    })

    res.json({
      success: true,
      message: 'Trạng thái đơn hàng được cập nhật thành công',
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái',
      error: error.message,
    })
  }
}

/**
 * Hủy đơn hàng
 * DELETE /api/orders/:id
 */
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Đơn hàng không tồn tại',
      })
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Không thể hủy đơn hàng đã được vận chuyển',
      })
    }

    // Hoàn tồn kho
    if (order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        const product = await Product.findByPk(item.productId)
        if (product) {
          await product.update({
            stock: product.stock + item.quantity,
          })
        }
      }
    }

    // Cập nhật trạng thái thành cancelled
    await order.update({
      status: 'cancelled',
    })

    res.json({
      success: true,
      message: 'Đơn hàng đã được hủy',
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi hủy đơn hàng',
      error: error.message,
    })
  }
}
