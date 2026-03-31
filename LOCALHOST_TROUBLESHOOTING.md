# 🔧 LOCALHOST TROUBLESHOOTING GUIDE

Hướng dẫn sửa tất cả lỗi localhost cho Local3R

---

## ⚡ KIỂM TRA NHANH - 2 PHÚT

### **Step 1: Kiểm tra XAMPP**
```
✅ Apache: Phải có nút "Stop" (nghĩa là đang chạy)
✅ MySQL: Phải có nút "Stop" (nghĩa là đang chạy)
✅ Port Apache: 80, 443
✅ Port MySQL: 3306
```

### **Step 2: Kiểm tra MySQL**
```powershell
# Mở PowerShell và chạy:
netstat -ano | findstr :3306
```

**Kết quả bình thường:**
```
TCP  127.0.0.1:3306  0.0.0.0:0  LISTENING  21456
```

Nếu **không có kết quả** → MySQL không chạy

### **Step 3: Kiểm tra Backend**
```powershell
cd d:\Website\Local3R\backend
npm run dev
```

**Kết quả bình thường:**
```
✅ MySQL kết nối thành công!
✅ Database sync hoàn tất!
🚀 Running on http://localhost:5000
```

### **Step 4: Kiểm tra port 5000**
```powershell
netstat -ano | findstr :5000
```

Nếu **không có kết quả** → Backend không chạy

---

## ❌ LỖI & GIẢI PHÁP

### **LỖI 1: "Connection refused" trên port 3306**

**Triệu chứng:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Giải pháp:**

**Cách 1: Khởi động MySQL từ XAMPP**
1. Mở XAMPP Control Panel
2. Click nút "Start" cạnh MySQL
3. Chờ cho đến khi chuyển thành "Stop"
4. Chạy lại backend: `npm run dev`

**Cách 2: Khởi động MySQL từ Services (Windows)**
```powershell
# Chạy PowerShell as Administrator
Start-Service MySQL
```

**Cách 3: Kiểm tra MySQL đang chạy**
```powershell
Get-Service MySQL
```

Kết quả phải là: `Running`

---

### **LỖI 2: "Port 3306 already in use"**

**Triệu chứng:**
```
Error: listen EADDRINUSE: address already in use :::3306
```

**Giải pháp:**

**Cách 1: Tìm process chiếm port 3306**
```powershell
netstat -ano | findstr :3306
```

Lấy **PID** (số cuối), ví dụ: 21456

**Cách 2: Tắt process đó**
```powershell
# Thay 21456 bằng PID thực tế
taskkill /PID 21456 /F
```

**Cách 3: Cấu hình cổng khác (nếu cần)**

Sửa `.env`:
```
DB_PORT=3307  # Cổng khác
```

---

### **LỖI 3: "localhost refused to connect"**

**Triệu chứng:**
```
Error: Failed to fetch from http://localhost:5000
```

**Giải pháp:**

**1. Kiểm tra npm run dev chạy chưa**
```powershell
cd d:\Website\Local3R\backend
npm run dev
```

**2. Kiểm tra terminal có lỗi không**
- Xem thông báo lỗi
- Nếu có lỗi database, xem LỖI 1

**3. Kiểm tra firewall Windows**
- Start menu → Windows Defender Firewall
- Click "Allow an app through firewall"
- Thêm Node.js vào danh sách

**4. Kiểm tra port 5000 bị chiếm**
```powershell
netstat -ano | findstr :5000
```

Nếu có kết quả, dùng `taskkill /PID <number> /F`

---

### **LỖI 4: phpmyadmin không kết nối MySQL**

**Triệu chứng:**
```
Cannot connect to MySQL server
```

**Giải pháp:**

1. **Mở XAMPP Start MySQL**
   - Mở XAMPP Control Panel
   - Click "Start" cạnh MySQL

2. **Refresh phpmyadmin**
   - http://localhost/phpmyadmin
   - Ctrl+Shift+R (xóa cache)

3. **Kiểm tra MySQL credentials** (`.env`)
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=local3r
```

4. **Reset MySQL password** (nếu cần)
   - Trong XAMPP Control Panel
   - Click "Admin" cạnh MySQL
   - phpmyadmin sẽ mở
   - User Account → Change Password

---

### **LỖI 5: "npm run dev" không chạy**

**Triệu chứng:**
```
nodemon: command not found
hoặc
Cannot find module 'express'
```

**Giải pháp:**

```powershell
# 1. Xóa cache npm
npm cache clean --force

# 2. Xóa node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 3. Cài lại tất cả
npm install

# 4. Chạy lại
npm run dev
```

---

### **LỖI 6: CORS Error**

**Triệu chứng:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Giải pháp:**

Kiểm tra [`backend/src/server.js`](../backend/src/server.js):

```javascript
// Phải có dòng này:
const cors = require('cors');
app.use(cors());
```

Nếu không có, thêm vào.

---

### **LỖI 7: "Cannot GET /api/products"**

**Triệu chứng:**
```
404 Not Found
```

**Giải pháp:**

1. **Kiểm tra route đúng chưa**
   - Đúng: `http://localhost:5000/api/products`
   - Sai: `http://localhost:5000/products`

2. **Kiểm tra route file có lỗi**
   - [`backend/src/routes/productRoutes.js`](../backend/src/routes/productRoutes.js)
   - [`backend/src/routes/orderRoutes.js`](../backend/src/routes/orderRoutes.js)

3. **Chạy benchmark health check**
   ```
   GET http://localhost:5000/api/health
   ```
   
   Nếu không output, API không chạy.

---

## ✅ KIỂM TRA TOÀN BỘ HỆ THỐNG

### **Fresh Start - từ đầu**

**1. Tắt tất cả services**
```powershell
# Tắt backend (nếu chạy)
# Ctrl+C trong PowerShell

# Tắt MySQL (XAMPP Control Panel)
# Click "Stop" cạnh MySQL

# Tắt Apache (XAMPP Control Panel)
# Click "Stop" cạnh Apache
```

**2. Xóa cache**
```powershell
npm cache clean --force
```

**3. Khởi động lại XAMPP**
- Mở XAMPP Control Panel (admin)
- Click "Start" Apache
- Click "Start" MySQL
- Chờ cho đến khi đổi thành "Stop"

**4. Xóa node_modules và cài lại**
```powershell
cd d:\Website\Local3R\backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**5. Tạo database**
```
- http://localhost/phpmyadmin
- Click "New"
- Database name: local3r
- Click "Create"
```

**6. Chạy seeder data**
```powershell
npm run seed
```

**7. Chạy backend**
```powershell
npm run dev
```

**8. Kiểm tra API**
```
GET http://localhost:5000/api/health
```

---

## 🧪 POSTMAN TESTING

### **1. Import Postman Collection**
- Mở Postman
- Click "Import"
- Chọn file: `Local3R_API_MySQL.postman_collection.json`

### **2. Test API Health**
```
Method: GET
URL: http://localhost:5000/api/health
```

**Kết quả mong đợi:**
```json
{
  "status": "success",
  "message": "API is running",
  "database": "connected"
}
```

### **3. Test Get Products**
```
Method: GET
URL: http://localhost:5000/api/products
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "data": [...],
  "total": 12
}
```

---

## 🔌 CỔNG (PORTS) CẦN KIỂM TRA

| Service | Port | Status | Command |
|---------|------|--------|---------|
| Apache (Frontend) | 80 | http://localhost | Mở XAMPP Start |
| Apache HTTPS | 443 | https://localhost | Mở XAMPP Start |
| MySQL Database | 3306 | Backend only | Mở XAMPP Start |
| Backend API | 5000 | http://localhost:5000 | `npm run dev` |
| Frontend (Dev) | 3000 | http://localhost:3000 | `npm run dev` (frontend folder) |

---

## 📋 CHECKLIST STARTUP

Trước khi báo cáo lỗi, hãy kiểm tra:

- [ ] Mở XAMPP Control Panel
- [ ] Click "Start" Apache (nếu chưa chạy)
- [ ] Click "Start" MySQL (nếu chưa chạy)
- [ ] Chờ cho đến khi chuyển thành "Stop"
- [ ] Mở PowerShell
- [ ] `cd d:\Website\Local3R\backend`
- [ ] `npm install` (nếu chưa cài)
- [ ] `npm run dev`
- [ ] Xem console có lỗi gì không
- [ ] Nếu thấy "✅" và "🚀" → Thành công!
- [ ] Mở http://localhost:5000/api/health
- [ ] Nếu thấy JSON response → API OK!

---

## 🆘 CẦN GIÚP TỪ ĐÂU?

**Nếu vẫn gặp lỗi:**

1. **Chụp ảnh màn hình PowerShell** - Ghi rõ lỗi
2. **Chụp ảnh XAMPP Control Panel** - Show trạng thái services
3. **Nêu URL bạn đang cố mở** - Ví dụ: localhost:5000/...
4. **Nêu thời gian xảy ra lỗi** - Sau bước nào

**Sau khi cung cấp thông tin, tôi sẽ giúp bạn sửa! 🔧**

---

**Chúc bạn thành công! 🚀**
