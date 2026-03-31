# ⚡ QUICK START - Local3R Backend (MySQL)

## 🎯 Bước Nhanh (5 Phút)

### 1️⃣ Chuẩn Bị (Lần Đầu)

```bash
# Bước 1: Mở XAMPP → Click "Start" MySQL button

# Bước 2: Tạo database
# Truy cập: http://localhost/phpmyadmin
# → New → Database name: local3r → Create

# Bước 3: Cài dependencies backend
cd d:\Website\Local3R\backend
npm install

# Chờ khoảng 5-10 phút...
```

### 2️⃣ Khởi Động Server

```bash
# Từ thư mục backend
npm run dev

# Nếu thành công, sẽ thấy:
# ✅ MySQL kết nối thành công!
# ✅ Database sync hoàn tất!
# 🚀 Running on http://localhost:5000
```

### 3️⃣ Kiểm Tra API (Mở Postman)

```
GET http://localhost:5000/api/health
```

**✅ Nếu thấy JSON response → Server chạy OK!**

---

## 📦 Postman Collection

**Import Collection:**
1. Mở Postman
2. Click **Import** (left side)
3. Chọn file: `Local3R_API_MySQL.postman_collection.json`
4. Bây giờ bạn có tất cả API endpoints

---

## 📝 API Endpoints Chính

| Tác Vụ | Endpoint | Method |
|--------|----------|--------|
| Lấy sản phẩm | `/api/products` | GET |
| Tạo sản phẩm | `/api/products` | POST |
| Cập nhật sản phẩm | `/api/products/:id` | PUT |
| Xóa sản phẩm | `/api/products/:id` | DELETE |
| Lấy đơn hàng | `/api/orders` | GET |
| Tạo đơn hàng | `/api/orders` | POST |
| Cập nhật đơn hàng | `/api/orders/:id` | PUT |
| Hủy đơn hàng | `/api/orders/:id` | DELETE |

---

## 🔧 Thay Đổi Cấu Hình

**File:** `backend/.env`

```env
# Thay đổi database name
DB_NAME=local3r

# Thay đổi password MySQL (nếu có)
DB_PASSWORD=your_password

# Thay đổi port
PORT=5001
```

---

## 🐛 Lỗi Thường Gặp

### ❌ "Can't connect to MySQL"
```bash
# Kiểm tra MySQL chạy chưa?
# - Mở XAMPP, click Start MySQL
# - Nếu status không xanh → chưa chạy
```

### ❌ "Database not found"
```bash
# Kiểm tra database tồn tại?
# Truy cập phpmyadmin → tạo database "local3r"
```

### ❌ "Port 5000 already in use"
```bash
# Thay port trong .env
PORT=5001

# Hoặc kill process
# Windows: netstat -ano | findstr :5000
```

---

## 📊 Database Tables

Sequelize tự tạo khi server khởi động:

- ✅ products
- ✅ orders
- ✅ users

**Xem dữ liệu:**
1. Truy cập: http://localhost/phpmyadmin
2. Chọn database: local3r
3. Xem các bảng

---

## 🚀 Tiếp Theo

1. ✅ Backend chạy
2. 📱 Frontend sẽ kết nối tới `http://localhost:5000/api`
3. 🧪 Test API bằng Postman
4. 🎯 Thêm dữ liệu test vào database

---

## 📚 Tài Liệu Chi Tiết

👉 Đọc: `MYSQL_SETUP_GUIDE.md` (hướng dẫn đầy đủ)

---

**Hoan hô! 🎉 Backend Local3R với MySQL đã sẵn sàng!**
