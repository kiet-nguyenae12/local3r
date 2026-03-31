// src/config/database.js
/**
 * Database Configuration
 * Cấu hình kết nối MySQL
 */
const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

// Cấu hình Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'local3r',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

// Test kết nối
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ MySQL kết nối thành công!')
    
    // Tạo bảng nếu chưa tồn tại
    await sequelize.sync({ alter: true })
    console.log('✅ Database sync hoàn tất!')
    
    return sequelize
  } catch (error) {
    console.error(`❌ Lỗi kết nối MySQL: ${error.message}`)
    process.exit(1)
  }
}

module.exports = { sequelize, connectDB }
