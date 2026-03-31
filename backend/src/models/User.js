// src/models/User.js
/**
 * User Model
 * Schema cho người dùng của hệ thống Local3R
 */
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const bcrypt = require('bcryptjs')

const User = sequelize.define(
  'User',
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    // Địa chỉ
    street: DataTypes.STRING(255),
    district: DataTypes.STRING(255),
    city: DataTypes.STRING(255),
    zipCode: DataTypes.STRING(20),

    // Vai trò
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },

    // Trạng thái
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10)
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10)
        }
      },
    },
  }
)

// Method để kiểm tra password
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = User
