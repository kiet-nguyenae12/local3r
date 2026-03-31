// src/seeders/seedData.js
/**
 * Database Seeder
 * Cấp dữ liệu mẫu cho database
 * Chạy: npm run seed
 */
const { sequelize } = require('../config/database')
const Product = require('../models/Product')
const User = require('../models/User')

const seedDatabase = async () => {
  try {
    console.log('🌱 Bắt đầu tạo dữ liệu mẫu...')

    // Đảm bảo database đã sync
    await sequelize.sync({ alter: false })
    console.log('✅ Database synced')

    // Kiểm tra dữ liệu đã tồn tại
    const productCount = await Product.count()
    if (productCount > 0) {
      console.log(`⚠️  Đã có ${productCount} sản phẩm trong database. Bỏ qua seed.`)
      process.exit(0)
    }

    // Dữ liệu mẫu - Sản Phẩm Đặc Sản Việt
    const sampleProducts = [
      // Bắc - 4 sản phẩm
      {
        name: 'Cà Phê Đắk Lắk Thượng Hạng',
        description:
          'Cà phê hạt nguyên chất 100% từ các vùng cao Đắk Lắk. Rang thủ công, hương vị đậm đà, độc đáo.',
        price: 150000,
        originalPrice: 180000,
        region: 'Bắc',
        stock: 150,
        category: 'Cà Phê',
        mainImage: 'https://via.placeholder.com/400x300?text=Ca+phe+Dak+Lak',
        ratingAverage: 4.8,
        ratingCount: 245,
      },
      {
        name: 'Sâm Ngọc Linh Khánh Hòa',
        description:
          'Sâm Ngọc Linh độc lập từ vùng đất mầu nhiệm Khánh Hòa. Tốt cho sức khỏe, tăng cường miễn dịch.',
        price: 380000,
        originalPrice: 450000,
        region: 'Bắc',
        stock: 80,
        category: 'Thuốc Bổ',
        mainImage: 'https://via.placeholder.com/400x300?text=Sam+Ngoc+Linh',
        ratingAverage: 4.9,
        ratingCount: 189,
      },
      {
        name: 'Mật Ong Hoa Rừng Tây Bắc',
        description:
          'Mật ong nguyên chất từ các đàn ong hoang nơi rừng nguyên sinh Tây Bắc. Không pha trộn, chứa các chất dinh dưỡng cao.',
        price: 280000,
        originalPrice: 320000,
        region: 'Bắc',
        stock: 120,
        category: 'Mật Ong',
        mainImage: 'https://via.placeholder.com/400x300?text=Mat+Ong',
        ratingAverage: 4.7,
        ratingCount: 312,
      },
      {
        name: 'Trà Thái Nguyên Premium',
        description:
          'Trà xanh Thái Nguyên hảo hạng, lý tưởng nhất cho những ai yêu trà. Hương vị tao nhã, tươi mới.',
        price: 95000,
        originalPrice: 120000,
        region: 'Bắc',
        stock: 200,
        category: 'Trà',
        mainImage: 'https://via.placeholder.com/400x300?text=Tra+Thai+Nguyen',
        ratingAverage: 4.6,
        ratingCount: 156,
      },

      // Trung - 4 sản phẩm
      {
        name: 'Nước Mắm Phú Quốc Cách Truyền Thống',
        description:
          'Nước mắm Phú Quốc truyền thống, ủ cách công thức bí mật của gia đình. Vị mặn tự nhiên, không tạp chất.',
        price: 85000,
        originalPrice: 100000,
        region: 'Trung',
        stock: 300,
        category: 'Gia Vị',
        mainImage: 'https://via.placeholder.com/400x300?text=Nuoc+Mam',
        ratingAverage: 4.9,
        ratingCount: 567,
      },
      {
        name: 'Bánh Hoai Hội An',
        description:
          'Bánh hoai truyền thống Hội An, nóng hổi fresh, lâu lâu phải ăn một lần để nhớ hương vị này.',
        price: 45000,
        originalPrice: 55000,
        region: 'Trung',
        stock: 250,
        category: 'Bánh',
        mainImage: 'https://via.placeholder.com/400x300?text=Banh+Hoai',
        ratingAverage: 4.5,
        ratingCount: 234,
      },
      {
        name: 'Gạo Thơm Tà Xùa',
        description:
          'Gạo thơm Tà Xùa được cấp đông tự nhiên, giống lúa quý hiếm. Cơm dẻo, thơm lưỡi.',
        price: 125000,
        originalPrice: 150000,
        region: 'Trung',
        stock: 180,
        category: 'Lương Thực',
        mainImage: 'https://via.placeholder.com/400x300?text=Gao+Thom',
        ratingAverage: 4.7,
        ratingCount: 198,
      },
      {
        name: 'Chè Shan Tuyết Phú Thọ',
        description:
          'Chè Shan Tuyết từ đồi cao 1000 mét của Phú Thọ. Hương thơm nhẹ nhàng, vị chát ngọt tự nhiên.',
        price: 250000,
        originalPrice: 300000,
        region: 'Trung',
        stock: 90,
        category: 'Trà',
        mainImage: 'https://via.placeholder.com/400x300?text=Che+Shan+Tuyet',
        ratingAverage: 4.8,
        ratingCount: 145,
      },

      // Nam - 4 sản phẩm
      {
        name: 'Dừa Xiêm Bến Tre Ngọt',
        description:
          'Dừa xiêm ngon nhất từ Bến Tre, nước dừa ngọt tự nhiên, thịt dừa mềm. Tươi sạch, giao hàng nhanh.',
        price: 35000,
        originalPrice: 45000,
        region: 'Nam',
        stock: 400,
        category: 'Trái Cây',
        mainImage: 'https://via.placeholder.com/400x300?text=Dua+Xiem',
        ratingAverage: 4.6,
        ratingCount: 423,
      },
      {
        name: 'Khô Mực Nha Trang Premium',
        description:
          'Khô mực được phơi nắng tự nhiên ở Nha Trang. Dai ngon, mặn vừa, vị umami sâu.',
        price: 280000,
        originalPrice: 350000,
        region: 'Nam',
        stock: 110,
        category: 'Hải Sản',
        mainImage: 'https://via.placeholder.com/400x300?text=Kho+Muc',
        ratingAverage: 4.8,
        ratingCount: 267,
      },
      {
        name: 'Cá Cơm Thiêu Hải Dương',
        description:
          'Cá cơm thiêu sấy khô từ Hải Dương, vị mặn tự nhiên từ biển. Để lâu không hỏng, ăn ngon.',
        price: 165000,
        originalPrice: 200000,
        region: 'Nam',
        stock: 140,
        category: 'Hải Sản',
        mainImage: 'https://via.placeholder.com/400x300?text=Ca+Com+Thieu',
        ratingAverage: 4.7,
        ratingCount: 189,
      },
      {
        name: 'Kẹo Sâm Dứa Đà Lạt',
        description:
          'Kẹo sâm dứa Đà Lạt kết hợp hương dứa tươi với sâm bổ. Ăn vừa ngon, vừa tốt cho sức khỏe.',
        price: 75000,
        originalPrice: 90000,
        region: 'Nam',
        stock: 220,
        category: 'Kẹo',
        mainImage: 'https://via.placeholder.com/400x300?text=Keo+Sam+Dua',
        ratingAverage: 4.5,
        ratingCount: 156,
      },
    ]

    // Tạo sản phẩm
    const createdProducts = await Product.bulkCreate(sampleProducts)
    console.log(`✅ Đã tạo ${createdProducts.length} sản phẩm`)

    console.log('\n🌱 Dữ liệu mẫu đã được tạo thành công!')
    console.log('📊 Dữ liệu được thêm:')
    console.log('   - 4 sản phẩm vùng Bắc')
    console.log('   - 4 sản phẩm vùng Trung')
    console.log('   - 4 sản phẩm vùng Nam')

    process.exit(0)
  } catch (error) {
    console.error('❌ Lỗi khi tạo dữ liệu:', error)
    process.exit(1)
  }
}

// Chạy seeder
seedDatabase()
