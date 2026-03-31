# 🏪 Local3R - Nơi Trải Nghiệm Đặc Sản Việt

> **📢 NOTE:** Dự án này đã được **chuyển từ MongoDB sang MySQL** với XAMPP. Xem [MYSQL_SETUP_GUIDE.md](MYSQL_SETUP_GUIDE.md) để thiết lập.

**Local3R** là một nền tảng thương mại điện tử hiện đại dành cho việc mua bán đặc sản Việt từ ba miền Bắc - Trung - Nam. Được xây dựng bằng công nghệ web hiện đại, nó mang lại trải nghiệm mua sắm suôn sẻ và an toàn cho khách hàng.

![Local3R Banner](https://img.shields.io/badge/Local3R-Đặc%20Sản%20Việt-orange)
![Status](https://img.shields.io/badge/Status-Development-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Database](https://img.shields.io/badge/Database-MySQL-blue)

---

## 📋 Mục Lục

1. [Tính Năng Chính](#tính-năng-chính)
2. [Tech Stack](#tech-stack)
3. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
4. [Cài Đặt & Chạy](#cài-đặt--chạy)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
8. [Đóng Góp](#đóng-góp)
9. [Liên Hệ](#liên-hệ)

---

## ✨ Tính Năng Chính

### 👥 Cho Khách Hàng
- ✅ Duyệt sản phẩm theo vùng miền (Bắc/Trung/Nam)
- ✅ Tìm kiếm sản phẩm theo tên, giá, danh mục
- ✅ Xem chi tiết sản phẩm và đánh giá
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Quản lý giỏ hàng (thêm, bớt, xóa)
- ✅ Đặt hàng một cách dễ dàng
- ✅ Thanh toán trực tuyến an toàn
- ✅ Theo dõi đơn hàng real-time
- ✅ Lịch sử mua hàng

### 🛠️ Cho Quản Lý (Admin)
- ✅ Dashboard thống kê bán hàng
- ✅ Quản lý danh sách sản phẩm
- ✅ Thêm/Sửa/Xóa sản phẩm
- ✅ Quản lý tồn kho
- ✅ Quản lý đơn hàng
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Phân tích doanh số
- ✅ Xuất báo cáo

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (Sequelize ORM)
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Bcryptjs, CORS

### Database Management
- **Database**: MySQL 8.0+
- **ORM**: Sequelize
- **Client**: MySQL CLI, phpMyAdmin
- **Local Development**: XAMPP

### Tools & Deployment
- **Version Control**: Git/GitHub
- **Package Manager**: npm/yarn
- **Local Server**: XAMPP
- **API Testing**: Postman
- **Deployment**: Vercel/Heroku/DigitalOcean

---

## 📁 Cấu Trúc Dự Án

```
Local3R/
├── frontend/                      # Frontend application
│   ├── public/                    # Static files
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/                 # Next.js pages
│   │   │   ├── index.tsx          # Homepage
│   │   │   ├── cart.tsx           # Shopping cart page
│   │   │   ├── _app.tsx           # App wrapper
│   │   │   └── admin/
│   │   │       ├── index.tsx      # Admin dashboard
│   │   │       ├── products.tsx   # Product management
│   │   │       └── orders.tsx     # Order management
│   │   ├── store/                 # State management
│   │   │   └── cartStore.ts       # Zustand cart store
│   │   ├── styles/
│   │   │   └── globals.css        # Global styles
│   │   └── utils/                 # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── postcss.config.js
│
├── backend/                       # Backend API
│   ├── src/
│   │   ├── models/                # Database models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── controllers/           # Logic handlers
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── routes/                # API routes
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── middleware/            # Custom middleware
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── config/                # Configuration
│   │   │   └── database.js
│   │   └── server.js              # Main entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md                      # Project documentation
```

---

## 🚀 Cài Đặt & Chạy

### Yêu Cầu Hệ Thống
- Node.js >= 16.0.0
- npm >= 8.0.0 hoặc yarn >= 3.0.0
- MongoDB >= 4.0
- Git

### Bước 1: Clone Repository
```bash
git clone https://github.com/yourusername/Local3R.git
cd Local3R
```

### Bước 2: Cài Đặt Frontend
```bash
cd frontend
npm install
# hoặc
yarn install
```

### Bước 3: Cài Đặt Backend
```bash
cd ../backend
npm install
# hoặc
yarn install
```

### Bước 4: Cấu Hình Environment
#### Backend (.env)
```bash
cd backend
cp .env.example .env

# Chỉnh sửa .env với thông tin của bạn:
MONGODB_URI=mongodb://localhost:27017/local3r
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### Frontend (.env.local)
```bash
cd ../frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
```

### Bước 5: Khởi Động MongoDB
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo service mongod start
```

### Bước 6: Chạy Ứng Dụng

#### Terminal 1: Backend
```bash
cd backend
npm run dev
# Server sẽ chạy trên http://localhost:5000
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# Next.js app sẽ chạy trên http://localhost:3000
```

### Truy Cập Ứng Dụng
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Dashboard**: http://localhost:3000/admin
- **API Health**: http://localhost:5000/api/health

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints Chính

#### 🛍️ Products (Sản Phẩm)

**GET** `/products` - Lấy danh sách sản phẩm
```bash
curl "http://localhost:5000/api/products?region=Nam&page=1&limit=20"
```

Query Parameters:
- `region` (optional): `Bắc`, `Trung`, `Nam`
- `page` (optional): Trang (default: 1)
- `limit` (optional): Số item trên trang (default: 20)

Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Nước mắm Phú Quốc",
      "price": 85000,
      "region": "Nam",
      "stock": 45,
      "category": "Gia vị",
      "rating": { "average": 4.8, "count": 45 }
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

**GET** `/products/:id` - Lấy chi tiết sản phẩm
```bash
curl "http://localhost:5000/api/products/507f1f77bcf86cd799439011"
```

**POST** `/products` - Tạo sản phẩm (Admin)
```bash
curl -X POST "http://localhost:5000/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nước mắm Phú Quốc",
    "description": "Nước mắm truyền thống từ Phú Quốc",
    "price": 85000,
    "region": "Nam",
    "stock": 50,
    "category": "Gia vị",
    "mainImage": "https://..."
  }'
```

**PUT** `/products/:id` - Cập nhật sản phẩm (Admin)
```bash
curl -X PUT "http://localhost:5000/api/products/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -d '{ "stock": 30 }'
```

**DELETE** `/products/:id` - Xóa sản phẩm (Admin)
```bash
curl -X DELETE "http://localhost:5000/api/products/507f1f77bcf86cd799439011"
```

---

#### 📦 Orders (Đơn Hàng)

**POST** `/orders` - Tạo đơn hàng
```bash
curl -X POST "http://localhost:5000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Nước mắm Phú Quốc",
        "price": 85000,
        "quantity": 2
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
  }'
```

**GET** `/orders` - Lấy danh sách đơn hàng (Admin)
```bash
curl "http://localhost:5000/api/orders?status=pending&page=1"
```

**GET** `/orders/:id` - Lấy chi tiết đơn hàng
```bash
curl "http://localhost:5000/api/orders/507f1f77bcf86cd799439011"
```

**PUT** `/orders/:id` - Cập nhật trạng thái đơn hàng (Admin)
```bash
curl -X PUT "http://localhost:5000/api/orders/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped",
    "shippingStatus": "shipped",
    "trackingNumber": "VN123456789"
  }'
```

**DELETE** `/orders/:id` - Hủy đơn hàng
```bash
curl -X DELETE "http://localhost:5000/api/orders/507f1f77bcf86cd799439011"
```

---

## 💾 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    district: String,
    city: String,
    zipCode: String
  },
  orderHistory: [ObjectId],
  role: String ("user" | "admin"),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String (indexed),
  description: String,
  price: Number,
  originalPrice: Number,
  region: String (enum: ["Bắc", "Trung", "Nam"]),
  stock: Number,
  images: [
    {
      url: String,
      alt: String
    }
  ],
  mainImage: String,
  rating: {
    average: Number (0-5),
    count: Number
  },
  category: String,
  sku: String (unique),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique, auto-generated),
  userId: ObjectId (ref: User),
  items: [
    {
      productId: ObjectId (ref: Product),
      productName: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  totalAmount: Number,
  shippingFee: Number,
  discount: Number,
  finalAmount: Number,
  paymentMethod: String,
  paymentStatus: String (enum: ["pending", "completed", "failed"]),
  shippingStatus: String (enum: ["pending", "shipped", "delivered", "cancelled"]),
  trackingNumber: String,
  status: String (enum: ["pending", "processing", "shipped", "delivered", "cancelled"]),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📖 Hướng Dẫn Sử Dụng

### 🏠 Trang Chủ (Homepage)

1. **Duyệt Sản Phẩm**: Cuộn xuống phần "Sản Phẩm Nổi Bật"
2. **Lọc Theo Vùng**: Nhấp vào "Vùng Bắc/Trung/Nam" ở header
3. **Tìm Kiếm**: Sử dụng thanh tìm kiếm ở phía trên

### 🛒 Giỏ Hàng (Cart)

1. **Thêm Vào Giỏ**: Nhấp nút "Thêm vào giỏ" trên sản phẩm
2. **Quản Lý Giỏ**: Nhấp biểu tượng giỏ hàng ở header
3. **Chỉnh Sửa Số Lượng**: Sử dụng nút +/- 
4. **Xóa Sản Phẩm**: Nhấp biểu tượng thùng rác
5. **Thanh Toán**: Nhấp nút "Thanh Toán"

### 👨‍💼 Admin Dashboard

1. **Truy Cập**: Vào http://localhost:3000/admin
2. **Quản Lý Sản Phẩm**: 
   - Xem danh sách
   - Thêm sản phẩm mới
   - Sửa/Xóa sản phẩm
3. **Quản Lý Đơn Hàng**:
   - Xem danh sách đơn hàng
   - Cập nhật trạng thái
   - Xem chi tiết đơn hàng

---

## 🚸 Troubleshooting

### Lỗi: MongoDB connection refused
**Giải pháp**: 
- Kiểm tra MongoDB đang chạy
- Kiểm tra MONGODB_URI trong .env
- Cài đặt lại MongoDB nếu cần

### Lỗi: CORS error
**Giải pháp**:
- Kiểm tra FRONTEND_URL trong backend .env
- Xoá cache trình duyệt
- Restart backend server

### Lỗi: Port already in use
**Giải pháp**:
```bash
# Tìm process sử dụng port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Frontend không kết nối được API
**Giải pháp**:
- Kiểm tra NEXT_PUBLIC_API_URL
- Kiểm tra backend đang chạy
- Kiểm tra CORS settings

---

## 🧪 Testing

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Get product by region
curl "http://localhost:5000/api/products?region=Nam"
```

---

## 📦 Build & Deployment

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Build Backend
```bash
cd backend
npm run build
npm start
```

### Docker Deployment (Optional)
```bash
# Build image
docker build -t local3r:latest .

# Run container
docker run -p 3000:3000 -p 5000:5000 local3r:latest
```

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL/NoSQL injection prevention
- ✅ Rate limiting
- ✅ Secure headers

---

## 📊 Performance Optimization

- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Database indexing
- ✅ Caching strategies
- ✅ CDN for static files

---

## 📝 Roadmap

- [ ] User authentication & authorization
- [ ] Payment gateway integration (Stripe, Paypal)
- [ ] Email notifications
- [ ] SMS tracking
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Recommendation engine
- [ ] Subscription plans
- [ ] Loyalty program

---

## 🤝 Đóng Góp

Chúng tôi rất hoan nghênh các đóng góp! Hãy:

1. Fork repository
2. Tạo branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Dự án này được cấp phép dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết chi tiết.

---

## 👥 Team

- **Founder**: Your Name
- **Lead Developer**: Your Name
- **Designer**: Your Name
- **QA**: Your Name

---

## 📞 Liên Hệ

- **Email**: support@local3r.com
- **Phone**: 0243 123 456
- **Website**: https://local3r.com
- **Facebook**: https://facebook.com/Local3r
- **Twitter**: https://twitter.com/Local3r

---

## ❤️ Cảm Ơn

Cảm ơn bạn đã quan tâm đến Local3R! 

**Hãy ⭐ repository nếu bạn thích dự án này!**

---

**Tạo bởi Local3R Team © 2024**

*Tinh hoa đặc sản Việt - Nơi trải nghiệm tuyệt vời*
