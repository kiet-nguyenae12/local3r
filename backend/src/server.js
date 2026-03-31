// src/server.js
/**
 * Express Server - Main Entry Point
 * Backend cho ứng dụng Local3R
 */
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectDB, sequelize } = require('./config/database')

// Khởi tạo models
require('./models/User')
require('./models/Product')
require('./models/Order')

// Load environment variables
dotenv.config()

// Khởi tạo Express app
const app = express()

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Connect to Database
connectDB()

/**
 * Routes
 */
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

// API Routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Server is running',
    timestamp: new Date().toISOString(),
    database: 'MySQL (Sequelize)',
  })
})

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại',
  })
})

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi server',
  })
})

/**
 * Start Server
 */
const PORT = process.env.PORT || 8080

const startServer = async () => {
  try {
    // Chạy migrations/force sync
    await sequelize.sync({ alter: false })

    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════╗
║     🎉 Local3R Backend Server        ║
║     Server đang chạy trên port ${PORT} ║
║     http://localhost:${PORT}          ║
╚══════════════════════════════════════╝
      `)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

module.exports = app
