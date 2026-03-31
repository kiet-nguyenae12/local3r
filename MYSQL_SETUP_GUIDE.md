# 🗄️ HƯỚNG DẪN CHUYỂN TỪ MONGODB SANG MySQL - Local3R Project

## 📋 Mục Lục
1. [Mô Tả Thay Đổi](#mô-tả-thay-đổi)
2. [Chuẩn Bị Môi Trường](#chuẩn-bị-môi-trường)
3. [Cài Đặt XAMPP và MySQL](#cài-đặt-xampp-và-mysql)
4. [Khởi Động Backend](#khởi-động-backend)
5. [Kiểm Tra với Postman](#kiểm-tra-với-postman)
6. [Ghi Chú Kỹ Thuật](#ghi-chú-kỹ-thuật)

---

## 🔄 Mô Tả Thay Đổi

### Những Gì Đã Thay Đổi

| Thành Phần | MongoDB | MySQL + Sequelize |
|-----------|---------|-------------------|
| **ORM** | Mongoose | Sequelize |
| **Driver** | mongoose | mysql2 |
| **Database** | local3r (collection) | local3r (database) |
| **Bảng** | collections | tables |
| **Kiểu ID** | ObjectId | INT (auto increment) |
| **Dữ Liệu** | JSON documents | SQL records |

### File Đã Cập Nhật
✅ `backend/package.json` - Thay đổi dependencies (mongoose → sequelize + mysql2)
✅ `backend/src/config/database.js` - Cấu hình Sequelize
✅ `backend/src/models/Product.js` - Model Sequelize
✅ `backend/src/models/Order.js` - Model Sequelize
✅ `backend/src/models/User.js` - Model Sequelize
✅ `backend/src/controllers/productController.js` - Sequelize queries
✅ `backend/src/controllers/orderController.js` - Sequelize queries
✅ `backend/src/server.js` - Khởi động với Sequelize
✅ `backend/.env` - Cấu hình MySQL

---

## 🛠️ Chuẩn Bị Môi Trường

### Yêu Cầu Hệ Thống
- ✅ Node.js v16+ 
- ✅ XAMPP hoặc MySQL Server standalone
- ✅ Postman (để kiểm tra API)
- ✅ Terminal/PowerShell

### Kiểm Tra Version
```bash
# Kiểm tra Node.js
node --version
npm --version

# Nên có: Node v16+, npm v7+
```

---

## 📥 Cài Đặt XAMPP và MySQL

### Bước 1: Tải Và Cài XAMPP

**Windows:**
1. Truy cập https://www.xampp.org/
2. Tải phiên bản Windows (PHP 8+ với MySQL)
3. Cài đặt vào thư mục mặc định (thường là `C:\xampp`)
4. Chạy `xampp-control.exe`

**macOS:**
```bash
# Cài qua Homebrew
brew install xampp

# Hoặc tải từ https://www.xampp.org/
```

**Linux:**
```bash
# Ubuntu/Debian
wget https://www.xampp.org/installer.run
chmod +x installer.run
sudo ./installer.run
```

### Bước 2: Khởi Động XAMPP

**Windows:**
1. Mở `xampp-control.exe`
2. Nhấn **Start** cho MySQL
3. Chờ cho đến khi MySQL status = **Running** (xanh)

**macOS/Linux:**
```bash
# Khởi động XAMPP
sudo /Applications/XAMPP/Manager-osx.app/Contents/MacOS/manager-osx

# Hoặc từ terminal
sudo /opt/xampp/bin/mysql.server start
```

### Bước 3: Tạo Database

**Cách 1: Dùng phpMyAdmin (Dễ Nhất)**

1. Mở trình duyệt → nhập: `http://localhost/phpmyadmin`
2. Login (username: `root`, password: không có)
3. Nhấn **New** ở phía bên trái
4. Nhập Database name: `local3r`
5. Chọn Collation: `utf8mb4_unicode_ci`
6. Nhấn **Create**

**Cách 2: Dùng MySQL Command Line**

```bash
# Mở MySQL command line (hoặc terminal)
# Windows: Mở CMD hoặc PowerShell
# Sau đó gõ:

mysql -u root

# Tạo database
CREATE DATABASE local3r CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Xác nhận
SHOW DATABASES;

# Thoát
EXIT;
```

✅ **Database tạo thành công!**

---

## 🚀 Khởi Động Backend

### Bước 1: Cài Đặt Dependencies

```bash
# Điều hướng vào thư mục backend
cd d:\Website\Local3R\backend

# Cài đặt packages
npm install

# Chờ khoảng 5-10 phút...
```

### Bước 2: Cập Nhật .env (Nếu Cần)

Mở file `backend/.env`:

```env
# Backend Configuration - MySQL
PORT=5000
FRONTEND_URL=http://localhost:3000

# MySQL Database Configuration
DB_HOST=localhost          # Nơi MySQL chạy
DB_PORT=3306              # Port mặc định của MySQL
DB_USER=root              # Username MySQL (mặc định root)
DB_PASSWORD=              # Password (để trống nếu chưa set)
DB_NAME=local3r           # Tên database

NODE_ENV=development
```

**⚠️ GHI CHÚ:** Nếu bạn đã set password cho MySQL, thay đổi `DB_PASSWORD=` thành password của bạn

### Bước 3: Khởi Động Server

```bash
# Từ thư mục d:\Website\Local3R\backend

# Chế độ development (dùng nodemon - tự reset khi code thay đổi)
npm run dev

# HOẶC chế độ production
npm start
```

**Output Mong Đợi:**
```
✅ MySQL kết nối thành công!
✅ Database sync hoàn tất!

============================================================
  🚀 Local3R Backend Server
  ✅ Running on http://localhost:5000
  🗄️  Database: MySQL
============================================================
```

✅ **Server chạy thành công!**

---

## 📮 Kiểm Tra API với Postman

### Cài Đặt Postman

1. Tải từ https://www.postman.com/downloads/
2. Cài đặt và khởi động
3. Tạo tài khoản hoặc đăng nhập

### Collection Postman

#### 1️⃣ **GET - Kiểm Tra Health**

```
URL: http://localhost:5000/api/health
Method: GET
```

**Expected Response:**
```json
{
  "success": true,
  "message": "✅ Server is running",
  "timestamp": "2026-03-31T10:00:00.000Z",
  "database": "MySQL (Sequelize)"
}
```

---

#### 2️⃣ **POST - Tạo Sản Phẩm**

```
URL: http://localhost:5000/api/products
Method: POST
Headers: Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Cà Phê Đắk Lắk",
  "description": "Cà phê hạt nguyên chất từ Đắk Lắk",
  "price": 150000,
  "originalPrice": 180000,
  "region": "Bắc",
  "stock": 100,
  "category": "Cà Phê",
  "mainImage": "https://example.com/coffee.jpg"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Sản phẩm được tạo thành công",
  "data": {
    "id": 1,
    "name": "Cà Phê Đắk Lắk",
    "price": "150000.00",
    "region": "Bắc",
    "stock": 100,
    "category": "Cà Phê",
    "sku": "SKU-1711869600000",
    "isActive": true,
    "createdAt": "2026-03-31T10:00:00.000Z",
    "updatedAt": "2026-03-31T10:00:00.000Z"
  }
}
```

---

#### 3️⃣ **GET - Lấy Danh Sách Sản Phẩm**

```
URL: http://localhost:5000/api/products?region=Bắc&page=1&limit=10
Method: GET
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Cà Phê Đắk Lắk",
      "price": "150000.00",
      "region": "Bắc",
      "stock": 100,
      ...
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

---

#### 4️⃣ **GET - Lấy Chi Tiết Sản Phẩm**

```
URL: http://localhost:5000/api/products/1
Method: GET
```

---

#### 5️⃣ **PUT - Cập Nhật Sản Phẩm**

```
URL: http://localhost:5000/api/products/1
Method: PUT
Headers: Content-Type: application/json
```

**Body (JSON):**
```json
{
  "price": 140000,
  "stock": 85,
  "isActive": true
}
```

---

#### 6️⃣ **POST - Tạo Đơn Hàng**

```
URL: http://localhost:5000/api/orders
Method: POST
Headers: Content-Type: application/json
```

**Body (JSON):**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Cà Phê Đắk Lắk",
      "quantity": 2,
      "price": 150000
    }
  ],
  "totalPrice": 300000,
  "paymentMethod": "cash_on_delivery",
  "customerInfo": {
    "name": "Nguyễn Văn A",
    "email": "email@example.com",
    "phone": "0123456789",
    "address": "123 Đường ABC, Hà Nội"
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Đơn hàng đã tạo thành công",
  "orderId": 1,
  "orderNumber": "ORD-1711869600000",
  "data": {
    "id": 1,
    "orderNumber": "ORD-1711869600000",
    "totalAmount": "300000.00",
    "shippingFee": "30000.00",
    "finalAmount": "330000.00",
    "status": "pending",
    ...
  }
}
```

---

#### 7️⃣ **GET - Lấy Danh Sách Đơn Hàng**

```
URL: http://localhost:5000/api/orders?status=pending&page=1&limit=10
Method: GET
```

---

#### 8️⃣ **PUT - Cập Nhật Trạng Thái Đơn Hàng**

```
URL: http://localhost:5000/api/orders/1
Method: PUT
Headers: Content-Type: application/json
```

**Body (JSON):**
```json
{
  "status": "shipped",
  "paymentStatus": "paid",
  "trackingNumber": "VT123456789"
}
```

---

#### 9️⃣ **DELETE - Hủy Đơn Hàng**

```
URL: http://localhost:5000/api/orders/1
Method: DELETE
```

---

#### 🔟 **DELETE - Xóa Sản Phẩm**

```
URL: http://localhost:5000/api/products/1
Method: DELETE
```

---

## 📊 Cấu Trúc Database MySQL

### Bảng Products
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  originalPrice DECIMAL(10, 2),
  region ENUM('Bắc', 'Trung', 'Nam') NOT NULL,
  stock INT DEFAULT 0,
  mainImage VARCHAR(500),
  images JSON,
  ratingAverage FLOAT DEFAULT 0,
  ratingCount INT DEFAULT 0,
  category VARCHAR(255) NOT NULL,
  sku VARCHAR(255) UNIQUE NOT NULL,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bảng Orders
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderNumber VARCHAR(255) UNIQUE NOT NULL,
  userId INT,
  items JSON NOT NULL,
  customerName VARCHAR(255),
  customerEmail VARCHAR(255),
  customerPhone VARCHAR(20),
  customerAddress VARCHAR(500),
  totalAmount DECIMAL(10, 2) NOT NULL,
  shippingFee DECIMAL(10, 2) DEFAULT 30000,
  discount DECIMAL(10, 2) DEFAULT 0,
  finalAmount DECIMAL(10, 2) NOT NULL,
  paymentMethod ENUM('credit_card', 'bank_transfer', 'cash_on_delivery') NOT NULL,
  paymentStatus ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  trackingNumber VARCHAR(255),
  estimatedDelivery DATE,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Bảng Users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  street VARCHAR(255),
  district VARCHAR(255),
  city VARCHAR(255),
  zipCode VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🐛 Khắc Phục Sự Cố

### ❌ Lỗi: "Can't Connect to MySQL"

**Giải Pháp:**
1. Kiểm tra XAMPP MySQL status (phải xanh)
2. Kiểm tra .env: `DB_HOST=localhost`, `DB_PORT=3306`
3. Nếu XAMPP trong thư mục khác, update `.env`

```bash
# Kiểm tra kết nối MySQL
mysql -u root

# Nếu lỗi "Access denied", kiểm tra password trong .env
```

---

### ❌ Lỗi: "Database Not Found"

**Giải Pháp:**
```bash
# Tạo database trong phpMyAdmin hoặc command line
mysql -u root
CREATE DATABASE local3r CHARACTER SET utf8mb4;
EXIT;
```

---

### ❌ Lỗi: "Port 5000 Already in Use"

**Giải Pháp:**
```bash
# Thay đổi PORT trong .env
PORT=5001

# HOẶC kill process đang sử dụng port 5000
# Windows PowerShell:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

---

### ❌ Lỗi: "Cannot find module 'mysql2'"

**Giải Pháp:**
```bash
# Cài lại dependencies
cd backend
npm install

# Hoặc cài riêng
npm install mysql2 sequelize
```

---

## 📝 Danh Sách Lệnh Hữu Ích

### Chạy Backend

```bash
# Khởi động development mode (tự reload)
npm run dev

# Khởi động production mode
npm start

# Dừng server
# Nhấn Ctrl + C trong terminal
```

### Tương Tác với Database

```bash
# Kết nối MySQL
mysql -u root

# Xem tất cả database
SHOW DATABASES;

# Sử dụng database
USE local3r;

# Xem tất cả bảng
SHOW TABLES;

# Xem cấu trúc bảng
DESCRIBE products;

# Xem dữ liệu
SELECT * FROM products;

# Thoát
EXIT;
```

---

## ✅ Checklist Hành Động

Trước khi sử dụng, hãy đảm bảo:

- [ ] XAMPP đã cài đặt và khởi động MySQL
- [ ] Database `local3r` đã tạo
- [ ] File `backend/.env` đã cập nhật với thông tin DB
- [ ] Chạy `npm install` trong thư mục backend
- [ ] Server chạy thành công (`npm run dev`)
- [ ] Postman đã cài đặt
- [ ] Kiểm tra health endpoint: `GET http://localhost:5000/api/health`

---

## 🎯 Kế Tiếp

1. ✅ **Xác nhận Backend chạy ok** với Postman
2. 📝 **Thêm dữ liệu test** vào database
3. 🔗 **Kết nối Frontend** với Backend (update API endpoints nếu khác port)
4. 🚀 **Deploy** lên server thực tế (Heroku, DigitalOcean, etc.)

---

## 📞 Hỗ Trợ

Nếu gặp lỗi:
1. Kiểm tra terminal output (error message cụ thể)
2. Kiểm tra các files: `.env`, `config/database.js`
3. Đảm bảo MySQL đang chạy
4. Thử restart server

---

## 📚 Tài Liệu Tham Khảo

- Sequelize Docs: https://sequelize.org/
- MySQL Docs: https://dev.mysql.com/doc/
- XAMPP: https://www.xampp.org/
- Express.js: https://expressjs.com/
- Postman: https://learning.postman.com/

---

**Cập nhật lần cuối:** 31-03-2026
