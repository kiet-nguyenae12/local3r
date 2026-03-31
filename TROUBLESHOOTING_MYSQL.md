# 🔧 TROUBLESHOOTING GUIDE - Local3R Backend

## 🐛 Danh Sách Lỗi Thường Gặp & Giải Pháp

---

## 1️⃣ Lỗi Kết Nối MySQL

### ❌ Error: "Can't get writer connection from the pool"

**Nguyên Nhân:**
- MySQL chưa chạy hoặc bị tắt
- Cấu hình host/port/password sai
- Firewall chặn MySQL

**Giải Pháp:**

```bash
# Kiểm tra XAMPP MySQL status
# Windows: Mở XAMPP Control Panel → kiểm tra MySQL (phải xanh)

# Nếu không chạy, click "Start"

# Hoặc khởi động MySQL từ command line
# Windows:
sc start MySQL80

# Mac/Linux:
sudo /opt/xampp/bin/mysql.server start

# Kiểm tra kết nối
mysql -u root -h localhost
# Nếu thành công, sẽ vào MySQL prompt (mysql>)
# Gõ: EXIT;
```

### ❌ Error: "Access denied for user 'root'@'localhost'"

**Nguyên Nhân:**
- Password MySQL sai trong `.env`

**Giải Pháp:**

```bash
# Kiểm tra password MySQL
# XAMPP mặc định: root không có password

# File .env:
DB_USER=root
DB_PASSWORD=          # Để trống nếu không có password

# Nếu có password, nhập vào:
DB_PASSWORD=your_password

# Nếu quên password, reset:
# Windows - cmd.exe:
cd C:\xampp\mysql\bin
mysqld --skip-grant-tables

# Sau đó:
mysql -u root
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

---

## 2️⃣ Lỗi Database

### ❌ Error: "Unknown database 'local3r'"

**Nguyên Nhân:**
- Database chưa được tạo

**Giải Pháp:**

```bash
# Cách 1: Dùng phpMyAdmin (dễ nhất)
# 1. Mở: http://localhost/phpmyadmin
# 2. Nhấp vào "New"
# 3. Nhập: local3r
# 4. Chọn Collation: utf8mb4_unicode_ci
# 5. Nhấn "Create"

# Cách 2: Dùng MySQL command line
mysql -u root

# Trong MySQL prompt:
CREATE DATABASE local3r CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Kiểm tra:
SHOW DATABASES;

# Thoát:
EXIT;
```

### ❌ Error: "Table 'local3r.products' doesn't exist"

**Nguyên Nhân:**
- Database tồn tại nhưng table chưa được tạo
- Server chưa chạy `sequelize.sync()`

**Giải Pháp:**

```bash
# Xóa database cũ (nếu có vấn đề)
mysql -u root
DROP DATABASE local3r;
CREATE DATABASE local3r CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Restart server để Sequelize tự tạo table
npm run dev

# Hoặc kiểm tra console output, nên có "✅ Database sync hoàn tất!"
```

---

## 3️⃣ Lỗi Node.js / Dependencies

### ❌ Error: "Cannot find module 'sequelize'"

**Nguyên Nhân:**
- Dependencies chưa được cài

**Giải Pháp:**

```bash
cd backend
rm -rf node_modules package-lock.json

# Cài lại
npm install

# Kiểm tra:
npm list sequelize

# Nếu vẫn lỗi:
npm install sequelize mysql2 --save
```

### ❌ Error: "Cannot find module 'dotenv'"

**Giải Pháp:**

```bash
npm install dotenv --save
```

### ❌ Error: "npm ERR! code ERESOLVE"

**Nguyên Nhân:**
- Version npm quá cũ hoặc xung đột package

**Giải Pháp:**

```bash
# Cập nhật npm
npm install -g npm@latest

# Hoặc cài lại với legacy flag
npm install --legacy-peer-deps

# Hoặc xóa cache
npm cache clean --force
npm install
```

---

## 4️⃣ Lỗi Port

### ❌ Error: "EADDRINUSE: address already in use :::5000"

**Nguyên Nhân:**
- Port 5000 đã bị chiếm bởi process khác

**Giải Pháp:**

```bash
# Windows PowerShell:
# Tìm process sử dụng port 5000
netstat -ano | findstr :5000

# Output: TCP ... 5000 ... LISTENING PID (số)
# Kill process:
taskkill /PID <số_PID> /F

# Hoặc dùng port khác
# File .env:
PORT=5001

npm run dev
```

```bash
# Mac/Linux:
# Tìm process
lsof -i :5000

# Kill process:
kill -9 <PID>

# Hoặc:
sudo lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

---

## 5️⃣ Lỗi API Response

### ❌ Error: "ERR_BAD_REQUEST"

**Nguyên Nhân:**
- Đang gửi request không có body khi POST/PUT
- Content-Type header sai

**Giải Pháp:**

```bash
# Postman:
# 1. Chọn tab "Headers"
# 2. Thêm: Content-Type: application/json

# 3. Chọn tab "Body"
# 4. Chọn "raw"
# 5. Chọn "JSON" từ dropdown
# 6. Nhập JSON data
```

### ❌ Error: "404 Not Found"

**Nguyên Nhân:**
- URL endpoint sai
- Server không đang chạy

**Giải Pháp:**

```bash
# Kiểm tra URL
# GET http://localhost:5000/api/health

# Nếu "Connection refused" → Server không chạy
npm run dev

# Kiểm tra endpoint trong routes/productRoutes.js
```

### ❌ Error: "ValidationError"

**Nguyên Nhân:**
- Dữ liệu gửi không đúng format
- Thiếu required fields

**Giải Pháp:**

```bash
# Postman - tạo sản phẩm
POST http://localhost:5000/api/products

# Body phải có:
{
  "name": "...",          # Bắt buộc
  "description": "...",   # Bắt buộc
  "price": 100000,        # Bắt buộc (number)
  "region": "Bắc",        # Bắt buộc (Bắc|Trung|Nam)
  "category": "..."       # Bắt buộc
}
```

---

## 6️⃣ Lỗi Sequelize

### ❌ Error: "Op is not exported"

**Giải Pháp:**

```javascript
// File cần import:
const { Op } = require('sequelize')
```

### ❌ Error: "Cannot read property 'findByPk' of undefined"

**Nguyên Nhân:**
- Model không được import đúng

**Giải Pháp:**

```javascript
// server.js phải có:
require('./models/Product')
require('./models/User')
require('./models/Order')

// Trước khi gọi API
```

### ❌ Error: "FOREIGN KEY constraint failed"

**Nguyên Nhân:**
- Dữ liệu referenced không tồn tại
- Xóa parent khi still có child

**Giải Pháp:**

```bash
# Kiểm tra dữ liệu tồn tại
mysql -u root
USE local3r;
SELECT * FROM users WHERE id = 1;

# Hoặc tắt constraint tạm thời:
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM orders;
SET FOREIGN_KEY_CHECKS = 1;
```

---

## 7️⃣ Lỗi Package XAMPP

### ❌ XAMPP MySQL không khởi động

**Nguyên Nhân:**
- Port 3306 bị chiếm
- MySQL config sai
- Dịch vụ Windows bị disable

**Giải Pháp:**

```bash
# Windows - cmd.exe:
# Kiểm tra port 3306
netstat -ano | findstr :3306

# Kill process nếu cẩn:
taskkill /PID <số> /F

# Restart MySQL service:
net stop MySQL80
net start MySQL80

# Hoặc từ XAMPP shell:
cd C:\xampp\mysql\bin
mysqld --datadir="C:\xampp\mysql\data"
```

### ❌ Error: "The app has crashed"

**Giải Pháp:**

```bash
# Mở XAMPP Shell
# Windows: click "Shell" button

# Xóa lock file
cd C:\xampp\mysql\data
rm -f ib_logfile* ibdata1

# Restart MySQL
# Hoặc restart XAMPP service
```

---

## 8️⃣ Performance Issues

### 🐌 Query quá chậm

**Giải Pháp:**

```javascript
// Trong server.js:
const { sequelize } = require('./config/database')

// Bật logging để xem SQL query:
const sequelize = new Sequelize(..., {
  logging: console.log  // Bất tất cả queries
});

// Ngoài ra:
const sequelize = new Sequelize(..., {
  logging: (sql) => console.log(`[${new Date().toISOString()}] ${sql}`)
});
```

### 💾 Database size lớn

**Giải Pháp:**

```bash
# Optimize database
mysql -u root local3r

# Trong MySQL:
OPTIMIZE TABLE products;
OPTIMIZE TABLE orders;
OPTIMIZE TABLE users;

# Backup:
mysqldump -u root local3r > local3r_backup.sql
```

---

## 🆘 Khi Hoàn Toàn Stuck

### ⚡ Giải Pháp Cuối Cùng

```bash
# 1. Tắt tất cả (Ctrl+C trong terminal)

# 2. Xóa database
mysql -u root
DROP DATABASE local3r;
EXIT;

# 3. Tạo database mới
mysql -u root
CREATE DATABASE local3r CHARACTER SET utf8mb4;
EXIT;

# 4. Xóa node_modules
cd backend
rm -rf node_modules package-lock.json

# 5. Cài lại
npm install

# 6. Khởi động lại
npm run dev

# 7. Chạy seed data (optional)
npm run seed
```

---

## 📞 Cách Lấy Error Log Chi Tiết

### Capture Error

```bash
# Chạy server và save log vào file
npm run dev > server.log 2>&1

# Khi lỗi xảy ra, mở file:
cat server.log

# Hoặc trên Windows PowerShell:
npm run dev | Out-File server.log

# Xem log:
Get-Content server.log
```

### Xem Database Activity

```bash
# Trong MySQL:
mysql -u root

# Xem process đang chạy:
SHOW PROCESSLIST;

# Xem MySQL version:
SELECT VERSION();

# Xem current user:
SELECT USER();

# Xem tất cả table:
USE local3r;
SHOW TABLES;

# Xem structure table:
DESCRIBE products;

# Exit:
EXIT;
```

---

## ✅ Kiểm Tra Trước Khỏi Động

```bash
# 1. Kiểm tra XAMPP MySQL status
# Nên xanh (Running)

# 2. Kiểm tra node version
node --version

# 3. Kiểm tra npm version
npm --version

# 4. Kiểm tra file .env tồn tại
# backend/.env

# 5. Kiểm tra port 5000 trống
# Windows: netstat -ano | findstr :5000

# 6. Kiểm tra database tồn tại
# Truy cập phpmyadmin

# 7. Khởi động server
npm run dev

# 8. Kiểm tra health endpoint
# GET http://localhost:5000/api/health
```

---

## 📝 Ghi Chép Chủ Động

Nếu gặp lỗi mới:

1. **Ghi lại error message đầy đủ**
2. **Kiểm tra file/line gây lỗi**
3. **Tìm kiếm error message trên Google**
4. **Kiểm tra documentation**
5. **Thử reset (delete cache, reinstall)**

---

## 🔗 Liên Kết Hỗ Trợ

- **Sequelize Docs:** https://sequelize.org/docs/v6/
- **MySQL Docs:** https://dev.mysql.com/doc/refman/8.0/en/
- **Express.js:** https://expressjs.com/
- **Node.js:** https://nodejs.org/docs/

---

**Cập nhật:** 31-03-2026
