# 📚 API Reference - Local3R

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently using JWT (to be implemented in next phase)

---

## 📦 Products API

### 1. Get All Products
**Endpoint:** `GET /products`

**Query Parameters:**
```
region?:   string  - "Bắc" | "Trung" | "Nam"
page?:     number  - Default: 1
limit?:    number  - Default: 20
search?:   string  - Search by name
```

**Example Request:**
```bash
GET /products?region=Nam&page=1&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Nước mắm Phú Quốc Đặc Biệt",
      "description": "Nước mắm nguyên chất 100% từ Phú Quốc",
      "price": 85000,
      "originalPrice": 95000,
      "region": "Nam",
      "stock": 45,
      "category": "Gia vị",
      "mainImage": "https://...",
      "rating": {
        "average": 4.8,
        "count": 45
      },
      "isActive": true,
      "createdAt": "2024-03-31T00:00:00Z",
      "updatedAt": "2024-03-31T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

---

### 2. Get Product Details
**Endpoint:** `GET /products/:id`

**Example Request:**
```bash
GET /products/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Nước mắm Phú Quốc Đặc Biệt",
    "description": "Nước mắm nguyên chất 100% từ Phú Quốc",
    "price": 85000,
    "region": "Nam",
    "stock": 45,
    "images": [
      {"url": "https://...", "alt": "Item 1"},
      {"url": "https://...", "alt": "Item 2"}
    ],
    "rating": {
      "average": 4.8,
      "count": 45
    }
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Sản phẩm không tồn tại"
}
```

---

### 3. Create Product (Admin)
**Endpoint:** `POST /products`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}  // To be implemented
```

**Request Body:**
```json
{
  "name": "Nước mắm Phú Quốc",
  "description": "Nước mắm nguyên chất từ Phú Quốc",
  "price": 85000,
  "originalPrice": 95000,
  "region": "Nam",
  "stock": 50,
  "category": "Gia vị",
  "mainImage": "https://..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Sản phẩm được tạo thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Nước mắm Phú Quốc",
    "sku": "SKU-1711891200000",
    ...
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Vui lòng cung cấp đầy đủ thông tin"
}
```

---

### 4. Update Product (Admin)
**Endpoint:** `PUT /products/:id`

**Request Body:**
```json
{
  "stock": 30,
  "price": 79000,
  "isActive": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sản phẩm được cập nhật thành công",
  "data": { ... }
}
```

---

### 5. Delete Product (Admin)
**Endpoint:** `DELETE /products/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sản phẩm được xóa thành công"
}
```

---

## 🛒 Orders API

### 1. Create Order
**Endpoint:** `POST /orders`

**Request Body:**
```json
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Nước mắm Phú Quốc",
      "price": 85000,
      "quantity": 2,
      "image": "https://...",
      "region": "Nam"
    }
  ],
  "totalPrice": 170000,
  "customerInfo": {
    "name": "Nguyễn Văn A",
    "email": "customer@example.com",
    "phone": "0243123456",
    "address": "123 Đường ABC, Hà Nội"
  },
  "paymentMethod": "credit_card"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Đơn hàng đã tạo thành công",
  "orderId": "507f1f77bcf86cd799439012",
  "orderNumber": "ORD-1711891200000-1",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "orderNumber": "ORD-1711891200000-1",
    "items": [...],
    "totalAmount": 170000,
    "shippingFee": 30000,
    "discount": 15000,
    "finalAmount": 185000,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-03-31T00:00:00Z"
  }
}
```

---

### 2. Get All Orders (Admin)
**Endpoint:** `GET /orders`

**Query Parameters:**
```
status?:  string  - "pending" | "processing" | "shipped" | "delivered"
page?:    number  - Default: 1
limit?:   number  - Default: 20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "orderNumber": "ORD-001",
      "customerInfo": {
        "name": "Nguyễn Văn A",
        "phone": "0243123456"
      },
      "totalAmount": 170000,
      "finalAmount": 185000,
      "status": "pending",
      "paymentStatus": "completed",
      "createdAt": "2024-03-31T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

---

### 3. Get Order Details
**Endpoint:** `GET /orders/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "orderNumber": "ORD-001",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "productName": "Nước mắm Phú Quốc",
        "quantity": 2,
        "price": 85000,
        "subtotal": 170000
      }
    ],
    "customerInfo": {
      "name": "Nguyễn Văn A",
      "email": "customer@example.com",
      "phone": "0243123456",
      "address": "123 Đường ABC, Hà Nội"
    },
    "totalAmount": 170000,
    "shippingFee": 30000,
    "discount": 15000,
    "finalAmount": 185000,
    "paymentMethod": "credit_card",
    "paymentStatus": "completed",
    "shippingStatus": "pending",
    "status": "pending",
    "createdAt": "2024-03-31T00:00:00Z"
  }
}
```

---

### 4. Update Order Status (Admin)
**Endpoint:** `PUT /orders/:id`

**Request Body:**
```json
{
  "status": "shipped",
  "shippingStatus": "shipped",
  "trackingNumber": "VN123456789"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Trạng thái đơn hàng được cập nhật thành công",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "shipped",
    "shippingStatus": "shipped",
    "trackingNumber": "VN123456789",
    "updatedAt": "2024-03-31T10:00:00Z"
  }
}
```

---

### 5. Cancel Order
**Endpoint:** `DELETE /orders/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Đơn hàng đã được hủy",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "cancelled"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Không thể hủy đơn hàng đã được vận chuyển"
}
```

---

## 🏥 Health Check

**Endpoint:** `GET /health`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "✅ Backend Local3R đang chạy bình thường",
  "timestamp": "2024-03-31T00:00:00Z"
}
```

---

## ⚠️ Error Handling

### Common Error Responses

**400 - Bad Request:**
```json
{
  "success": false,
  "message": "Vui lòng cung cấp đầy đủ thông tin"
}
```

**404 - Not Found:**
```json
{
  "success": false,
  "message": "Sản phẩm không tồn tại"
}
```

**500 - Server Error:**
```json
{
  "success": false,
  "message": "Lỗi khi xử lý yêu cầu",
  "error": "Error details"
}
```

---

## 📊 Pagination

All list endpoints support pagination:

```json
{
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

Default values:
- **page**: 1
- **limit**: 20
- **maxLimit**: 100

---

## 🔑 Status Values

### Order Status
- `pending` - Chờ xử lý
- `processing` - Đang xử lý
- `shipped` - Đã gửi
- `delivered` - Đã giao
- `cancelled` - Đã hủy

### Payment Status
- `pending` - Chờ thanh toán
- `completed` - Đã thanh toán
- `failed` - Thất bại

### Shipping Status
- `pending` - Chờ gửi
- `shipped` - Đã gửi
- `delivered` - Đã giao
- `cancelled` - Đã hủy

---

## 📝 Notes

1. All timestamps are in ISO 8601 format
2. All prices are in Vietnamese Dong (VND)
3. Authentication will be added in the next phase
4. Rate limiting will be implemented for production
5. All endpoints support CORS requests

---

## 🔗 Related Documentation

- [Main README](./README.md)
- [Quick Start](./QUICK_START.md)
- [Database Schema](./README.md#-database-schema)
