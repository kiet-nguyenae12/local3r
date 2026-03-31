// src/models/Order.js
/**
 * Order Model
 * Schema cho đơn hàng
 */
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const User = require('./User')
const Product = require('./Product')

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Thông tin đơn hàng
    orderNumber: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },

    // Người dùng
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },

    // Sản phẩm
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    // Thông tin khách hàng
    customerName: DataTypes.STRING(255),
    customerEmail: DataTypes.STRING(255),
    customerPhone: DataTypes.STRING(20),
    customerAddress: DataTypes.STRING(500),

    // Giá cả
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 30000,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    finalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    // Thanh toán
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'bank_transfer', 'cash_on_delivery'),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending',
    },

    // Trạng thái đơn hàng
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending',
    },

    // Vận chuyển
    trackingNumber: DataTypes.STRING(255),
    estimatedDelivery: DataTypes.DATE,

    // Ghi chú
    notes: DataTypes.TEXT,
  },
  {
    timestamps: true,
    tableName: 'orders',
  }
)

// Định nghĩa quan hệ (Relations)
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' })
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' })

module.exports = Order
