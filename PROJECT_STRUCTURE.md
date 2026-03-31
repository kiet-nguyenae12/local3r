# 📁 Project Structure Documentation

## Complete Folder Tree

```
Local3R/
│
├── 📄 README.md                   # Main documentation
├── 📄 QUICK_START.md             # Quick start guide
├── 📄 API_REFERENCE.md           # Detailed API documentation
├── 📄 .gitignore                 # Git ignore rules
├── 🔧 setup.sh                   # Linux/macOS setup script
├── 🔧 setup.bat                  # Windows setup script
│
├── 📦 frontend/                   # React/Next.js Application
│   │
│   ├── 📄 package.json           # NPM dependencies
│   ├── 📄 tsconfig.json          # TypeScript configuration
│   ├── 📄 next.config.js         # Next.js configuration
│   ├── 📄 tailwind.config.js     # Tailwind CSS configuration
│   ├── 📄 postcss.config.js      # PostCSS configuration
│   ├── 📄 .env.example           # Environment variables example
│   │
│   ├── 📁 public/                # Static assets
│   │   └── (images, fonts, etc.)
│   │
│   └── 📁 src/                   # Source code
│       │
│       ├── 📁 components/        # Reusable React components
│       │   ├── Header.tsx        # Navigation header with cart
│       │   ├── HeroSection.tsx   # Hero banner section
│       │   ├── ProductCard.tsx   # Product card component
│       │   ├── ProductGrid.tsx   # Product grid layout
│       │   └── Footer.tsx        # Footer component
│       │
│       ├── 📁 pages/             # Next.js pages (routes)
│       │   ├── _app.tsx          # App wrapper with Header/Footer
│       │   ├── index.tsx         # Homepage with hero + products
│       │   ├── cart.tsx          # Shopping cart page
│       │   └── 📁 admin/         # Admin pages
│       │       ├── index.tsx     # Admin dashboard
│       │       ├── products.tsx  # Product management
│       │       └── orders.tsx    # Order management
│       │
│       ├── 📁 store/             # State management (Zustand)
│       │   └── cartStore.ts      # Shopping cart store logic
│       │       ├── addItem()
│       │       ├── removeItem()
│       │       ├── updateQuantity()
│       │       ├── clearCart()
│       │       ├── getTotalPrice()
│       │       └── getTotalItems()
│       │
│       ├── 📁 styles/            # Global styles
│       │   └── globals.css       # Tailwind directives + custom CSS
│       │
│       └── 📁 utils/             # Utility functions
│           ├── api.ts           # API client utilities
│           ├── formatters.ts    # Formatting functions
│           └── validators.ts    # Form validators
│
├── 🔙 backend/                   # Express.js API Server
│   │
│   ├── 📄 package.json          # NPM dependencies
│   ├── 📄 .env.example          # Environment variables example
│   │
│   └── 📁 src/                  # Source code
│       │
│       ├── 📄 server.js         # Express app entry point
│       │   ├── Middleware setup
│       │   ├── Routes registration
│       │   ├── Error handlers
│       │   └── Server listener
│       │
│       ├── 📁 config/           # Configuration files
│       │   └── database.js      # MongoDB connection setup
│       │
│       ├── 📁 models/           # Database schemas
│       │   ├── User.js          # User collection schema
│       │   │   ├── name
│       │   │   ├── email
│       │   │   ├── password
│       │   │   ├── address
│       │   │   └── orderHistory
│       │   ├── Product.js       # Product collection schema
│       │   │   ├── name
│       │   │   ├── price
│       │   │   ├── region
│       │   │   ├── stock
│       │   │   ├── images
│       │   │   └── rating
│       │   └── Order.js         # Order collection schema
│       │       ├── orderNumber
│       │       ├── items
│       │       ├── totalAmount
│       │       ├── paymentStatus
│       │       └── shippingStatus
│       │
│       ├── 📁 controllers/      # Business logic handlers
│       │   ├── productController.js
│       │   │   ├── getProductsByRegion()
│       │   │   ├── getProductById()
│       │   │   ├── createProduct()
│       │   │   ├── updateProduct()
│       │   │   └── deleteProduct()
│       │   └── orderController.js
│       │       ├── createOrder()
│       │       ├── getOrders()
│       │       ├── getOrderById()
│       │       ├── updateOrderStatus()
│       │       └── cancelOrder()
│       │
│       ├── 📁 routes/           # API route definitions
│       │   ├── productRoutes.js # Product API endpoints
│       │   │   ├── GET /
│       │   │   ├── GET /:id
│       │   │   ├── POST /
│       │   │   ├── PUT /:id
│       │   │   └── DELETE /:id
│       │   └── orderRoutes.js   # Order API endpoints
│       │       ├── GET /
│       │       ├── GET /:id
│       │       ├── POST /
│       │       ├── PUT /:id
│       │       └── DELETE /:id
│       │
│       ├── 📁 middleware/       # Custom middleware
│       │   ├── auth.js         # JWT authentication
│       │   └── errorHandler.js # Global error handling
│       │
│       └── 📁 uploads/          # File upload directory (for images)
│           └── products/
│               └── (product images)
└──
```

---

## 🔄 Data Flow

### User Journey: Product → Cart → Order

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. User browses homepage (index.tsx)                   │
│     ↓                                                    │
│  2. ProductGrid displays products from API              │
│     ↓                                                    │
│  3. User clicks "Add to Cart" on ProductCard            │
│     ↓                                                    │
│  4. cartStore (Zustand) updates state                   │
│     └─→ Data saved to localStorage                      │
│     ↓                                                    │
│  5. User navigates to cart.tsx (cart page)              │
│     ↓                                                    │
│  6. User reviews items and clicks "Checkout"            │
│     ↓                                                    │
│  7. Frontend sends POST /api/orders to Backend          │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
      ┌──────────────────────────────┐
      │    Backend (Express.js)      │
      ├──────────────────────────────┤
      │                              │
      │ 1. Route: POST /api/orders   │
      │    ↓                          │
      │ 2. orderController.          │
      │    createOrder()              │
      │    ↓                          │
      │ 3. Validate request body      │
      │    ↓                          │
      │ 4. Create Order document      │
      │    in MongoDB                 │
      │    ↓                          │
      │ 5. Update Product stock       │
      │    ↓                          │
      │ 6. Return orderNumber &       │
      │    response                   │
      │                              │
      └──────────────────────────────┘
                     │
                     ↓
      ┌──────────────────────────────┐
      │    MongoDB Database          │
      ├──────────────────────────────┤
      │                              │
      │ Collections:                 │
      │ - users                      │
      │ - products                   │
      │ - orders                     │
      │                              │
      └──────────────────────────────┘
```

---

## 📊 Component Architecture

### Frontend Components Hierarchy

```
App (_app.tsx)
│
├── Header (Sticky)
│   ├── Logo
│   ├── Search Bar
│   ├── Shopping Cart Badge
│   └── Navigation Menu (Bắc/Trung/Nam)
│
├── Main Content
│   ├── HomePage OR AdminPage
│   │   │
│   │   ├── HomePage
│   │   │   ├── HeroSection
│   │   │   └── ProductGrid
│   │   │       └── ProductCard[]
│   │   │
│   │   └── AdminPage
│   │       ├── AdminDashboard
│   │       │   └── Stats Cards
│   │       ├── AdminProducts
│   │       │   ├── ProductForm
│   │       │   └── ProductsTable
│   │       └── AdminOrders
│   │           └── OrdersTable
│   │
│   └── CartPage
│       ├── CartItems List
│       └── Order Summary
│
└── Footer (Sticky)
    ├── About
    ├── Links
    └── Social Media
```

---

## 🗄️ Database Schema Relationships

```
┌─────────────────────────────────────────────────┐
│              USER                               │
├─────────────────────────────────────────────────┤
│ _id (ObjectId)                                  │
│ name (String)                                   │
│ email (String, unique)                          │
│ password (String, hashed)                       │
│ phone (String)                                  │
│ address (Object)                                │
│ orderHistory (Array of Order._id) ──────────┐  │
│ role (String: "user" | "admin")            │  │
│ isActive (Boolean)                         │  │
│ timestamps                                 │  │
└─────────────────────────────────────────────┼──┘
                                              │
                                              │
┌─────────────────────────────────────────────┼──┐
│              ORDER                          │  │
├─────────────────────────────────────────────┼──┤
│ _id (ObjectId)                              │  │
│ orderNumber (String, unique, auto)          │  │
│ userId (User._id) ◄──────────────────────────┘  │
│ items (Array)                               │   │
│   ├─ productId (Product._id) ──────────┐   │   │
│   ├─ quantity (Number)                  │   │   │
│   └─ price (Number)                     │   │   │
│ totalAmount (Number)                    │   │   │
│ shipingStatus (String)                  │   │   │
│ paymentStatus (String)                  │   │   │
│ timestamps                              │   │   │
└─────────────────────────────────────────────┼───┘
                                              │
                                              │
┌─────────────────────────────────────────────┼───┐
│           PRODUCT                           │    │
├─────────────────────────────────────────────┼───┤
│ _id (ObjectId)                              │    │
│ name (String, indexed)                      │    │
│ description (String)                        │    │
│ price (Number)                              │    │
│ originalPrice (Number)                      │    │
│ region (String enum)                        │    │
│ stock (Number)                              │    │
│ images (Array)                              │    │
│ rating (Object)                             │    │
│ category (String)                           │    │
│ sku (String, unique)                        │    │
│ isActive (Boolean)                          │    │
│ timestamps                                  │    │
└─────────────────────────────────────────────────┘
```

---

## 🔌 API Route Map

```
Local3R API (Port 5000)
│
├── GET /api/health
│   └─→ Health check endpoint
│
├── /api/products
│   ├── GET / [?region=Nam&page=1&limit=20]
│   │   └─→ Get products list with pagination
│   ├── GET /:id
│   │   └─→ Get single product details
│   ├── POST / (Admin)
│   │   └─→ Create new product
│   ├── PUT /:id (Admin)
│   │   └─→ Update product info
│   └── DELETE /:id (Admin)
│       └─→ Delete product
│
└── /api/orders
    ├── GET / [?status=pending]
    │   └─→ Get orders list (Admin dashboard)
    ├── GET /:id
    │   └─→ Get order details
    ├── POST /
    │   └─→ Create new order (from cart checkout)
    ├── PUT /:id (Admin)
    │   └─→ Update order status
    └── DELETE /:id
        └─→ Cancel order
```

---

## 🎯 Key Features Location

| Feature | File | Component |
|---------|------|-----------|
| Homepage | `frontend/src/pages/index.tsx` | HeroSection + ProductGrid |
| Shopping Cart | `frontend/src/store/cartStore.ts` | Zustand Store |
| Cart Page | `frontend/src/pages/cart.tsx` | CartPage |
| Add/Remove Items | `frontend/src/components/ProductCard.tsx` | Button handlers |
| Checkout | `frontend/src/pages/cart.tsx` | handleCheckout() |
| Admin Dashboard | `frontend/src/pages/admin/index.tsx` | Stats display |
| Manage Products | `frontend/src/pages/admin/products.tsx` | Product table |
| Manage Orders | `frontend/src/pages/admin/orders.tsx` | Orders table |
| Product API | `backend/src/routes/productRoutes.js` | Endpoints |
| Order API | `backend/src/routes/orderRoutes.js` | Endpoints |
| Database Models | `backend/src/models/*.js` | Schemas |
| Business Logic | `backend/src/controllers/*.js` | Controllers |

---

## 📝 Development Workflow

```
1. Frontend Development
   ├── Create/Edit components in src/components/
   ├── Create/Edit pages in src/pages/
   ├── Update state in src/store/
   └── Style with Tailwind CSS

2. Backend Development
   ├── Define routes in src/routes/
   ├── Implement controllers in src/controllers/
   ├── Create/Update models in src/models/
   └── Add middleware if needed

3. API Integration
   ├── Frontend calls backend API
   ├── Frontend stores response in Zustand
   ├── UI re-renders based on state
   └── User sees updates

4. Testing
   ├── Test frontend UI
   ├── Test API endpoints with curl/Postman
   ├── Test database operations
   └── Test full user flow
```

---

## 🚀 Performance Optimization

```
Frontend
├── Code Splitting (Next.js automatic)
├── Image Optimization (next/image)
├── Lazy Loading (React.lazy)
└── Caching (SWR, React Query ready)

Backend
├── Database Indexing (Mongoose)
├── Query Optimization
├── Response Compression
└── Rate Limiting (to add)
```

---

## 🔐 Security Layers

```
Frontend
├── Input validation
├── XSS prevention
└── CORS handling

Backend
├── Input validation
├── SQL/NoSQL injection prevention
├── Password hashing (bcryptjs)
├── JWT authentication (to add)
└── Error handling (no sensitive data)

Database
├── Authentication required
└── Indexed queries
```

---

For more details, refer to:
- [README.md](./README.md)
- [API_REFERENCE.md](./API_REFERENCE.md)
- [QUICK_START.md](./QUICK_START.md)
