# 🔄 MongoDB → MySQL Migration Summary

## 📊 Những Gì Đã Thay Đổi

### Database Transition
```
❌ MongoDB (No SQL Document Database)
✅ MySQL (Relational SQL Database)
```

### ORM/Adapter
```
❌ Mongoose
✅ Sequelize
```

---

## 📝 Chi Tiết Thay Đổi

### 1. Dependencies Updated

**Trước (MongoDB):**
```json
{
  "mongoose": "^7.0.0",
}
```

**Sau (MySQL):**
```json
{
  "mysql2": "^3.6.0",
  "sequelize": "^6.34.0"
}
```

---

### 2. Database Configuration

**Trước (`config/database.js`):**
```javascript
const mongoose = require('mongoose')
const connectDB = async () => {
  await mongoose.connect(mongoURI, {...})
}
```

**Sau (`config/database.js`):**
```javascript
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('local3r', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})
const connectDB = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
}
```

---

### 3. Models - Product

**Trước (Mongoose):**
```javascript
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  region: { type: String, enum: ['Bắc', 'Trung', 'Nam'] }
})
module.exports = mongoose.model('Product', productSchema)
```

**Sau (Sequelize):**
```javascript
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  region: { type: DataTypes.ENUM('Bắc', 'Trung', 'Nam'), allowNull: false }
})
module.exports = Product
```

---

### 4. Controllers - CRUD Operations

#### CREATE
**Trước:**
```javascript
const product = new Product({ name, price, ... })
await product.save()
```

**Sau:**
```javascript
const product = await Product.create({ name, price, ... })
```

#### READ
**Trước:**
```javascript
const product = await Product.findById(id)
const products = await Product.find(query).skip(10).limit(20)
```

**Sau:**
```javascript
const product = await Product.findByPk(id)
const { rows, count } = await Product.findAndCountAll({
  offset: 10, limit: 20
})
```

#### UPDATE
**Trước:**
```javascript
const product = await Product.findByIdAndUpdate(id, updates, { new: true })
```

**Sau:**
```javascript
const product = await Product.findByPk(id)
await product.update(updates)
```

#### DELETE
**Trước:**
```javascript
await Product.findByIdAndDelete(id)
```

**Sau:**
```javascript
const product = await Product.findByPk(id)
await product.destroy()
```

---

### 5. Database Tables

**Tự động tạo bởi Sequelize:**

```sql
-- Products Table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  region ENUM('Bắc', 'Trung', 'Nam') NOT NULL,
  stock INT DEFAULT 0,
  category VARCHAR(255),
  sku VARCHAR(255) UNIQUE,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderNumber VARCHAR(255) UNIQUE NOT NULL,
  userId INT,
  totalAmount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 6. Query Operators

| Tính Năng | MongoDB | MySQL (Sequelize) |
|-----------|---------|-------------------|
| Equals | `{ name: 'John' }` | `{ name: { [Op.eq]: 'John' } }` |
| Like | `{ name: /john/i }` | `{ name: { [Op.like]: '%john%' } }` |
| Greater Than | `{ age: { $gt: 18 } }` | `{ age: { [Op.gt]: 18 } }` |
| AND | `{ $and: [...] }` | `{ [Op.and]: [...] }` |
| OR | `{ $or: [...] }` | `{ [Op.or]: [...] }` |
| IN | `{ id: { $in: [1,2,3] } }` | `{ id: { [Op.in]: [1,2,3] } }` |
| NOT IN | `{ id: { $nin: [1,2,3] } }` | `{ id: { [Op.notIn]: [1,2,3] } }` |

---

### 7. Associations/Relations

**Trước (Mongoose):**
```javascript
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}

await Order.findById(id).populate('userId', 'name email')
```

**Sau (Sequelize):**
```javascript
userId: {
  type: DataTypes.INTEGER,
  references: { model: User, key: 'id' }
}

Order.belongsTo(User, { foreignKey: 'userId' })

await Order.findByPk(id, { 
  include: [{ model: User, as: 'user' }]
})
```

---

## 🎯 Migration Steps Done

### ✅ Completed
- [x] Update `package.json` with new dependencies
- [x] Replace MongoDB config with MySQL config
- [x] Convert all models from Mongoose to Sequelize
- [x] Update all controllers with Sequelize methods
- [x] Create database initialization scripts
- [x] Create seed data file
- [x] Create `.env` file for configuration
- [x] Update `server.js` for Sequelize setup
- [x] Create comprehensive setup guide
- [x] Create troubleshooting guide
- [x] Create Postman collection

### 📋 To Do (Manual)
- [ ] Test all endpoints with Postman
- [ ] Verify CRUD operations work correctly
- [ ] Add seed data to database: `npm run seed`
- [ ] Deploy to production server
- [ ] Set up database backup strategy
- [ ] Configure environment variables on server

---

## 💾 Data Migration (If Needed)

If you had existing MongoDB data to migrate:

```bash
# 1. Export from MongoDB
mongoexport --db local3r --collection products --out products.json

# 2. Transform to MySQL format
# (Write custom script to transform JSON)

# 3. Import to MySQL
# (Use LOAD DATA INFILE or insert scripts)

# 4. Verify data
# Use phpMyAdmin or MySQL CLI
```

---

## 🔍 Verification Commands

### Check MySQL Connection
```bash
mysql -u root
mysql> SELECT VERSION();
mysql> SHOW DATABASES;
mysql> USE local3r;
mysql> SHOW TABLES;
mysql> EXIT;
```

### Check Sequelize Models
```bash
npm run dev
# Should show: ✅ Database sync hoàn tất!
```

### Test API Endpoints
```bash
# Health check
GET http://localhost:5000/api/health

# Get products
GET http://localhost:5000/api/products

# Create product
POST http://localhost:5000/api/products
```

---

## 📚 Resources

- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [XAMPP Guide](https://www.apachefriends.org/)
- [Migration Best Practices](https://sequelize.org/docs/v6/other-topics/migrations/)

---

## ⚠️ Important Notes

1. **ID Format**: MongoDB used `_id` (ObjectId), MySQL uses `id` (INT)
2. **Timestamps**: MySQL uses explicit timestamps, Sequelize handles automatically
3. **Relationships**: Foreign keys now explicit in MySQL
4. **Data Types**: Stricter types in SQL vs flexible MongoDB documents
5. **Performance**: SQL queries optimized for relationships

---

**Migration Completed:** 31-03-2026
