# 📬 Local3R API — Hướng Dẫn CRUD Postman

> **Base URL:** `http://localhost:8080/api`
> **Content-Type:** `application/json`
> **Đảm bảo XAMPP (MySQL + Apache) và backend đang chạy trước khi test**

---

## 🔍 Health Check

### Kiểm tra server hoạt động

```
GET http://localhost:8080/api/health
```

**Response mong đợi:**
```json
{
  "success": true,
  "message": "✅ Server is running",
  "timestamp": "2026-04-01T00:00:00.000Z",
  "database": "MySQL (Sequelize)"
}
```

---

## 📦 PRODUCTS — Sản Phẩm Đặc Sản

### 1. [GET] Lấy danh sách sản phẩm

```
GET http://localhost:8080/api/products
```

**Query Params (tuỳ chọn):**

| Param    | Giá trị ví dụ | Mô tả                                 |
|----------|--------------|---------------------------------------|
| `region` | `Bắc`        | Lọc theo vùng: `Bắc` / `Trung` / `Nam` |
| `search` | `miến`       | Tìm kiếm theo tên hoặc mô tả          |
| `page`   | `1`          | Trang (mặc định: 1)                   |
| `limit`  | `10`         | Số lượng mỗi trang (mặc định: 20)     |

**Ví dụ lọc theo vùng:**
```
GET http://localhost:8080/api/products?region=Bắc
GET http://localhost:8080/api/products?region=Trung
GET http://localhost:8080/api/products?search=mật ong&page=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Miến Dong Khoai Sâm",
      "price": "95000.00",
      "region": "Bắc",
      "stock": 50,
      "isActive": true
    }
  ],
  "pagination": {
    "total": 4,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

---

### 2. [GET] Lấy chi tiết sản phẩm theo ID

```
GET http://localhost:8080/api/products/:id
```

**Ví dụ:**
```
GET http://localhost:8080/api/products/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Miến Dong Khoai Sâm",
    "description": "Miến dong khoai sâm được làm từ củ khoai sâm tươi, nghiền lọc lấy tinh bột, phơi sấy tự nhiên...",
    "price": "95000.00",
    "originalPrice": "115000.00",
    "region": "Bắc",
    "stock": 50,
    "category": "Thực phẩm khô",
    "ratingAverage": 4.9,
    "ratingCount": 52,
    "isActive": true,
    "sku": "SKU-1743436800000",
    "createdAt": "2026-04-01T00:00:00.000Z",
    "updatedAt": "2026-04-01T00:00:00.000Z"
  }
}
```

---

### 3. [POST] Thêm sản phẩm mới

```
POST http://localhost:8080/api/products
```

**Headers:**
```
Content-Type: application/json
```

**Ví dụ 1 — Miến Dong Khoai Sâm:**
```json
{
  "name": "Miến Dong Khoai Sâm",
  "description": "Miến dong khoai sâm được làm từ củ khoai sâm tươi, nghiền lọc lấy tinh bột, phơi sấy tự nhiên. Sợi miến có độ trong cao, dai giòn tự nhiên, không bở nát khi nấu lâu.",
  "price": 95000,
  "originalPrice": 115000,
  "region": "Bắc",
  "stock": 100,
  "category": "Thực phẩm khô",
  "mainImage": "/Mien_Dong.png"
}
```

**Ví dụ 2 — Ba Kích Tím Rừng:**
```json
{
  "name": "Ba Kích Tím Rừng – Ngâm Rượu",
  "description": "Ba kích tím rừng tự nhiên, lõi tím đậm, thơm đặc trưng. Tăng cường sinh lực – Bổ thận – Mạnh gân cốt.",
  "price": 320000,
  "originalPrice": 390000,
  "region": "Trung",
  "stock": 60,
  "category": "Dược liệu",
  "mainImage": "/Sam.png"
}
```

**Ví dụ 3 — Mật Ong Ruồi:**
```json
{
  "name": "Mật Ong Ruồi Nguyên Chất",
  "description": "Kháng sinh tự nhiên lành tính nhất mà đất trời ban tặng. Không pha đường, không chất bảo quản.",
  "price": 670000,
  "originalPrice": 800000,
  "region": "Bắc",
  "stock": 40,
  "category": "Mật ong",
  "mainImage": "/Mat_Ong.png"
}
```

**Ví dụ 4 — Thịt Trâu Gác Bếp:**
```json
{
  "name": "Thịt Trâu Gác Bếp",
  "description": "Tự tay tẩm ướp và gác bếp truyền thống. Không phẩm màu, không chất bảo quản. Đặc sản vùng núi phía Bắc chính thống.",
  "price": 470000,
  "originalPrice": 560000,
  "region": "Bắc",
  "stock": 30,
  "category": "Thịt khô",
  "mainImage": "/Trau_gac_bep.png"
}
```

**Ví dụ 5 — Bánh Pía Sóc Trăng:**
```json
{
  "name": "Bánh Pía Sóc Trăng",
  "description": "Bánh pía Sóc Trăng – đặc sản miền Tây nổi tiếng với lớp vỏ mỏng giòn tan, nhân sầu riêng thơm béo đậm đà. Được làm thủ công theo công thức gia truyền, không phẩm màu, không chất bảo quản.",
  "price": 65000,
  "originalPrice": 80000,
  "region": "Nam",
  "stock": 200,
  "category": "Bánh kẹo đặc sản",
  "mainImage": "/Banh_pia.png",
  "ratingAverage": 4.7,
  "ratingCount": 33
}
```

**Ví dụ 6 — Mè Xửng Thiên Hương:**
```json
{
  "name": "Mè Xửng Thiên Hương – Đặc Sản Huế",
  "description": "Mè xửng Thiên Hương (Established 1978) - Ngọt lịm hương nhớ Cố Đô. Sự kết hợp tinh tế của mạch nha dẻo, đậu phộng giòn tan và lớp mè thơm bùi. Sản phẩm không phẩm màu, không chất bảo quản, giữ trọn hương vị truyền thống Huế.",
  "price": 35000,
  "originalPrice": 45000,
  "region": "Trung",
  "stock": 150,
  "category": "Bánh kẹo đặc sản",
  "mainImage": "/Keo_me_xung.png",
  "ratingAverage": 4.6,
  "ratingCount": 28
}
```

**Ví dụ 7 — Nem Chua Tứ Phương:**
```json
{
  "name": "Nem Chua Tứ Phương – Đặc Sản Thanh Hóa",
  "description": "Nem chua Tứ Phương được làm từ thịt lợn nạc tuyển chọn, bì lợn thái sợi nhỏ, thính gạo rang thơm cùng các gia vị đặc trưng như tỏi, ớt, lá đinh lăng. Trải qua quá trình lên men tự nhiên, nem có vị chua thanh, giòn sần sật của bì và mùi thơm nồng nàn.",
  "price": 35000,
  "originalPrice": 45000,
  "region": "Trung",
  "stock": 150,
  "category": "Đặc sản Thanh Hóa",
  "mainImage": "/Nem_chua.png",
  "ratingAverage": 3,
  "ratingCount": 1
}
```

**Ví dụ 8 — Rượu Táo Mèo Tây Bắc:**
```json
{
  "name": "Rượu Táo Mèo Tây Bắc",
  "description": "Rượu táo mèo được ngâm ủ từ quả táo mèo (sơn tra) thu hái trên vùng núi Tây Bắc. Vị chua ngọt tự nhiên, hương thơm đặc trưng, màu đỏ đẹp mắt. Tốt cho tiêu hóa, hỗ trợ giảm mỡ máu. Nồng độ nhẹ, phù hợp mọi đối tượng.",
  "price": 180000,
  "originalPrice": 220000,
  "region": "Bắc",
  "stock": 80,
  "category": "Đồ uống đặc sản",
  "mainImage": "/Ruou_tao_meo.png",
  "ratingAverage": 4.8,
  "ratingCount": 45
}
```

**Ví dụ 9 — Cà Phê Chồn Buôn Mê Thuột:**
```json
{
  "name": "Cà Phê Chồn Buôn Mê Thuột",
  "description": "Cà phê chồn (Kopi Luwak Việt Nam) – loại cà phê hiếm và đặc biệt nhất thế giới. Hạt cà phê được chồn hương ăn và thải ra tự nhiên, qua quá trình lên men trong dạ dày tạo nên hương vị độc đáo: đắng nhẹ, hậu vị ngọt dài, thơm phức. Thu hái và chế biến thủ công tại Buôn Mê Thuột – thủ phủ cà phê Việt Nam.",
  "price": 450000,
  "originalPrice": 550000,
  "region": "Trung",
  "stock": 50,
  "category": "Cà phê đặc sản",
  "mainImage": "/Ca_phe_chon.png",
  "ratingAverage": 4.9,
  "ratingCount": 61
}
```

**Các trường bắt buộc:** `name`, `price`, `region`, `category`

**`region` chỉ chấp nhận:** `Bắc` | `Trung` | `Nam`

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Sản phẩm được tạo thành công",
  "data": {
    "id": 1,
    "name": "Miến Dong Khoai Sâm",
    "sku": "SKU-1743436800001",
    ...
  }
}
```

---

### 4. [PUT] Cập nhật sản phẩm

```
PUT http://localhost:8080/api/products/:id
```

**Ví dụ — Cập nhật giá và tồn kho Thịt Trâu Gác Bếp:**
```
PUT http://localhost:8080/api/products/4
```

```json
{
  "price": 850000,
  "stock": 20,
  "description": "Túi 1kg: 850.000đ | Túi 500gram: 470.000đ. Tự tay tẩm ướp và gác bếp truyền thống."
}
```

**Ví dụ — Ẩn sản phẩm (isActive = false):**
```json
{
  "isActive": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sản phẩm được cập nhật thành công",
  "data": { ... }
}
```

---

### 5. [DELETE] Xóa sản phẩm

```
DELETE http://localhost:8080/api/products/:id
```

**Ví dụ:**
```
DELETE http://localhost:8080/api/products/1
```

**Response:**
```json
{
  "success": true,
  "message": "Sản phẩm được xóa thành công"
}
```

---

## 🛒 ORDERS — Đơn Hàng

### 1. [GET] Lấy danh sách đơn hàng

```
GET http://localhost:8080/api/orders
```

**Query Params (tuỳ chọn):**

| Param    | Giá trị ví dụ | Mô tả                                              |
|----------|--------------|---------------------------------------------------|
| `status` | `pending`    | Lọc theo trạng thái đơn hàng                      |
| `page`   | `1`          | Trang                                              |
| `limit`  | `10`         | Số lượng mỗi trang                                 |

**Các giá trị `status`:**

| Giá trị       | Ý nghĩa         |
|---------------|-----------------|
| `pending`     | Chờ xử lý       |
| `processing`  | Đang xử lý      |
| `shipped`     | Đã giao vận     |
| `delivered`   | Đã giao hàng    |
| `cancelled`   | Đã hủy          |

**Ví dụ:**
```
GET http://localhost:8080/api/orders?status=pending
GET http://localhost:8080/api/orders?status=delivered&page=1&limit=10
```

---

### 2. [GET] Lấy chi tiết đơn hàng

```
GET http://localhost:8080/api/orders/:id
```

**Ví dụ:**
```
GET http://localhost:8080/api/orders/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "orderNumber": "ORD-1743436800000",
    "items": [
      {
        "productId": 1,
        "productName": "Miến Dong Khoai Sâm",
        "quantity": 2,
        "price": 95000,
        "subtotal": 190000
      },
      {
        "productId": 3,
        "productName": "Mật Ong Ruồi Nguyên Chất",
        "quantity": 1,
        "price": 670000,
        "subtotal": 670000
      }
    ],
    "totalAmount": 860000,
    "shippingFee": 30000,
    "discount": 0,
    "finalAmount": 890000,
    "customerName": "Nguyễn Văn A",
    "customerEmail": "hkhoi624@gmail.com",
    "customerPhone": "0865584465",
    "customerAddress": "123 Đà Nẵng, Việt Nam",
    "paymentMethod": "cash_on_delivery",
    "paymentStatus": "pending",
    "status": "pending"
  }
}
```

---

### 3. [POST] Tạo đơn hàng mới

```
POST http://localhost:8080/api/orders
```

**Headers:**
```
Content-Type: application/json
```

**Ví dụ 1 — Đặt Miến Dong + Mật Ong:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Miến Dong Khoai Sâm",
      "quantity": 2,
      "price": 95000
    },
    {
      "id": 3,
      "name": "Mật Ong Ruồi Nguyên Chất",
      "quantity": 1,
      "price": 670000
    }
  ],
  "totalPrice": 860000,
  "customerInfo": {
    "name": "Nguyễn Văn A",
    "email": "hkhoi624@gmail.com",
    "phone": "0865584465",
    "address": "123 Đà Nẵng, Việt Nam",
    "userId": null
  },
  "paymentMethod": "cash_on_delivery"
}
```

**Ví dụ 2 — Đặt Thịt Trâu Gác Bếp + Ba Kích Tím:**
```json
{
  "items": [
    {
      "id": 4,
      "name": "Thịt Trâu Gác Bếp",
      "quantity": 1,
      "price": 470000
    },
    {
      "id": 2,
      "name": "Ba Kích Tím Rừng – Ngâm Rượu",
      "quantity": 1,
      "price": 320000
    }
  ],
  "totalPrice": 790000,
  "customerInfo": {
    "name": "Trần Thị B",
    "email": "tranb@gmail.com",
    "phone": "0901234567",
    "address": "456 Hà Nội, Việt Nam",
    "userId": null
  },
  "paymentMethod": "bank_transfer"
}
```

**`paymentMethod` chấp nhận:** `cash_on_delivery` | `bank_transfer` | `credit_card`

> 💡 **Lưu ý:** Tổng tiền thực tế = `totalPrice` + phí ship **30,000₫** (tự động cộng)

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Đơn hàng đã tạo thành công",
  "orderId": 1,
  "orderNumber": "ORD-1743436800000",
  "data": { ... }
}
```

---

### 4. [PUT] Cập nhật trạng thái đơn hàng

```
PUT http://localhost:8080/api/orders/:id
```

**Ví dụ — Xác nhận đơn hàng:**
```
PUT http://localhost:8080/api/orders/1
```
```json
{
  "status": "processing",
  "paymentStatus": "paid"
}
```

**Ví dụ — Giao vận + mã tracking:**
```json
{
  "status": "shipped",
  "trackingNumber": "GHN-123456789"
}
```

**Ví dụ — Hoàn thành đơn:**
```json
{
  "status": "delivered",
  "paymentStatus": "paid"
}
```

**Luồng trạng thái:**
```
pending → processing → shipped → delivered
                    ↘ cancelled  (chỉ khi chưa shipped)
```

---

### 5. [DELETE] Hủy đơn hàng

```
DELETE http://localhost:8080/api/orders/:id
```

**Ví dụ:**
```
DELETE http://localhost:8080/api/orders/1
```

> ⚠️ Chỉ hủy được khi đơn ở trạng thái `pending` hoặc `processing`.
> Khi hủy, tồn kho sản phẩm sẽ được **hoàn lại tự động**.

**Response thành công:**
```json
{
  "success": true,
  "message": "Đơn hàng đã được hủy",
  "data": { "status": "cancelled", ... }
}
```

**Response thất bại (đã shipped):**
```json
{
  "success": false,
  "message": "Không thể hủy đơn hàng đã được vận chuyển"
}
```

---

## ❌ Mã Lỗi HTTP

| Code | Ý nghĩa | Nguyên nhân thường gặp |
|------|---------|------------------------|
| `200` | OK | Thành công |
| `201` | Created | Tạo mới thành công |
| `400` | Bad Request | Thiếu trường bắt buộc hoặc sai giá trị `region`/`paymentMethod` |
| `404` | Not Found | ID sản phẩm hoặc đơn hàng không tồn tại |
| `500` | Server Error | Lỗi kết nối MySQL hoặc lỗi code |

---

## 🚀 Workflow Test Nhanh (thứ tự khuyên dùng)

```
1. GET  /api/health                → Kiểm tra server sống

── PRODUCTS ──────────────────────────────────────────────
2. POST /api/products              → Tạo "Miến Dong Khoai Sâm"     (Ví dụ 1)
3. POST /api/products              → Tạo "Ba Kích Tím Rừng"         (Ví dụ 2)
4. POST /api/products              → Tạo "Mật Ong Ruồi"             (Ví dụ 3)
5. POST /api/products              → Tạo "Thịt Trâu Gác Bếp"        (Ví dụ 4)
6. POST /api/products              → Tạo "Bánh Pía Sóc Trăng"       (Ví dụ 5)
7. POST /api/products              → Tạo "Mè Xửng Thiên Hương"      (Ví dụ 6)
8. POST /api/products              → Tạo "Nem Chua Tứ Phương"        (Ví dụ 7)
9. POST /api/products              → Tạo "Rượu Táo Mèo Tây Bắc"     (Ví dụ 8)
10. POST /api/products             → Tạo "Cà Phê Chồn BMT"           (Ví dụ 9)
11. GET  /api/products             → Xem toàn bộ danh sách
12. GET  /api/products?region=Bắc  → Lọc vùng Bắc
13. PUT  /api/products/:id         → Cập nhật giá/tồn kho
14. DELETE /api/products/:id       → Xóa sản phẩm

── ORDERS ────────────────────────────────────────────────
13. POST /api/orders               → Đặt hàng (dùng id thực từ bước 9)
14. GET  /api/orders               → Xem danh sách đơn
15. GET  /api/orders/:id           → Chi tiết đơn
16. PUT  /api/orders/:id           → Cập nhật trạng thái
17. DELETE /api/orders/:id         → Hủy đơn (khi còn pending/processing)
```

---

## 📞 Thông Tin Liên Hệ Local3R

| Kênh | Thông tin |
|------|-----------|
| 📧 Gmail | hkhoi624@gmail.com |
| 📱 SĐT | 0865 584 465 |
| 📘 Facebook | https://www.facebook.com/profile.php?id=61578445540054 |
| 🎵 TikTok | https://www.tiktok.com/@local3r_vn |
| 📍 Địa chỉ | Đà Nẵng, Việt Nam |

---

## 🖼️ Danh Sách Ảnh Có Sẵn

| File ảnh | Dùng trong `mainImage` | Sản phẩm |
|----------|------------------------|----------|
| `logo_3R.png` | `/logo_3R.png` | Logo |
| `Mien_Dong.png` | `/Mien_Dong.png` | Miến Dong Khoai Sâm |
| `Sam.png` | `/Sam.png` | Ba Kích Tím Rừng |
| `Mat_Ong.png` | `/Mat_Ong.png` | Mật Ong Ruồi |
| `Trau_gac_bep.png` | `/Trau_gac_bep.png` | Thịt Trâu Gác Bếp |
| `Keo_me_xung.png` | `/Keo_me_xung.png` | Mè Xửng Thiên Hương |
| `Nem_chua.png` | `/Nem_chua.png` | Nem Chua Tứ Phương |
| `Banh_pia.png` | `/Banh_pia.png` | Bánh Pía Sóc Trăng |
| `Ruou_tao_meo.png` | `/Ruou_tao_meo.png` | Rượu Táo Mèo Tây Bắc |
| `Ca_phe_chon.png` | `/Ca_phe_chon.png` | Cà Phê Chồn Buôn Mê Thuột |

> 💡 Muốn thêm ảnh mới: copy file vào `D:\Website\Local3R\assets\images\` rồi báo để đồng bộ vào `public/`

---

*Local3R Backend v1.0.0 — Port: 8080 — MySQL (Sequelize)*
*Cập nhật: 2026-04-01*
