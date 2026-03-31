// src/models/Product.js
/**
 * Product Model
 * Schema cho sản phẩm đặc sản Việt
 */
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Thông tin cơ bản
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      trim: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Giá
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
      },
    },

    // Vùng miền
    region: {
      type: DataTypes.ENUM('Bắc', 'Trung', 'Nam'),
      allowNull: false,
    },

    // Tồn kho
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    // Hình ảnh
    mainImage: DataTypes.STRING(500),
    images: {
      type: DataTypes.JSON,
      defaultValue: [],
    },

    // Đánh giá
    ratingAverage: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    // Danh mục
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // SKU
    sku: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },

    // Trạng thái
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'products',
  }
)

module.exports = Product
