# ⚡ QUICK FIX - LOCALHOST KHÔNG KẾT NỐI

Hãy làm theo từng bước này trong **2 phút**

---

## 🎯 BƯỚC 1: ĐẢM BẢO XAMPP CHẠY

**Trong XAMPP Control Panel của bạn:**

```
✅ Apache    → Nút "Stop" (tức là đang chạy)
✅ MySQL     → Nút "Stop" (tức là đang chạy)
```

**Nếu thấy nút "Start":**
1. Click "Start" để khởi động
2. Chờ 2-3 giây
3. Nút sẽ đổi thành "Stop"

---

## 🎯 BƯỚC 2: KIỂM TRA MYSQL KẾT NỐI

**Mở PowerShell và chạy:**

```powershell
netstat -ano | findstr :3306
```

**Bạn sẽ thấy:**
```
TCP  127.0.0.1:3306  0.0.0.0:0  LISTENING
```

✅ **Nếu có kết quả** → MySQL OK
❌ **Nếu không có** → Khởi động MySQL trong XAMPP

---

## 🎯 BƯỚC 3: KIỂM TRA DATABASE TỒN TẠI

**Mở browser:**
```
http://localhost/phpmyadmin
```

**Kiểm tra:**
- Bên trái có database tên `local3r` không?
- Nếu **không có** → Tạo mới:
  1. Click "New"
  2. Database name: `local3r`
  3. Click "Create"

---

## 🎯 BƯỚC 4: CHẠY BACKEND

**Mở PowerShell và chạy:**

```powershell
cd d:\Website\Local3R\backend
npm run dev
```

**Chờ cho đến khi thấy:**
```
✅ MySQL kết nối thành công!
✅ Database sync hoàn tất!
🚀 Running on http://localhost:5000
```

✅ **Nếu thấy "🚀"** → Backend OK
❌ **Nếu có lỗi đỏ** → Đọc lỗi, báo cho tôi

---

## 🎯 BƯỚC 5: TEST API

**Mở Browser hoặc Postman:**

```
http://localhost:5000/api/health
```

**Bạn sẽ thấy:**
```json
{
  "status": "success",
  "message": "...",
  "database": "connected"
}
```

✅ **Nếu thấy JSON** → Thành công!
❌ **Nếu "Cannot GET"** → Backend chưa chạy

---

## ✅ HOÀN THÀNH!

Nếu bạn làm xong tất cả 5 bước trên mà vẫn có lỗi, hãy:

1. **Chụp ảnh PowerShell** - Ghi rõ dòng lỗi
2. **Báo cho tôi** - Tôi sẽ sửa ngay

---

**🆘 LỖI PHỔ BIẾN & QUICK FIX**

| Lỗi | Quick Fix |
|-----|-----------|
| MySQL refused to connect | Bấm "Start" MySQL trong XAMPP |
| Cannot GET localhost:5000 | Chạy `npm run dev` trong backend folder |
| Port 5000 in use | `netstat -ano \| findstr :5000` rồi `taskkill /PID <number> /F` |
| Cannot find module | `npm install` trong backend folder |
| phpmyadmin không kết nối | Click "Start" MySQL trong XAMPP, refresh page |

---

**Hãy làm từng bước và báo cáo kết quả! 🚀**
