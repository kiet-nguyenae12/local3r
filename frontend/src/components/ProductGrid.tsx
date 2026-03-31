// src/components/ProductGrid.tsx
'use client'
import React, { useMemo, useEffect, useState } from 'react'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  region: string
  rating?: number
  reviews?: number
  description?: string
  details?: string
  priceNote?: string
}

interface ApiProduct {
  id: number
  name: string
  price: string | number
  originalPrice?: string | number
  mainImage?: string
  region: string
  ratingAverage?: number
  ratingCount?: number
  description?: string
  isActive: boolean
}

interface ProductGridProps {
  region?: string
}

// Bản đồ vùng từ API sang hiển thị
const REGION_DISPLAY: Record<string, string> = {
  'Bắc': 'Vùng Bắc',
  'Trung': 'Vùng Trung',
  'Nam': 'Vùng Nam',
}

// Sản phẩm mặc định (hiển thị nếu chưa có dữ liệu từ API)
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'local-1',
    name: 'Miến Dong Khoai Sâm',
    price: 95000,
    originalPrice: 115000,
    image: '/Mien_Dong.png',
    region: 'Vùng Bắc',
    rating: 4.9,
    reviews: 52,
    description: 'Miến dong khoai sâm được làm từ củ khoai sâm tươi, nghiền lọc lấy tinh bột, phơi sấy tự nhiên. Sợi miến có độ trong cao, dai giòn tự nhiên, không bở nát khi nấu lâu.',
    details: '🎁 Cam kết chất lượng\n✅ Miến dong khoai sâm sạch – không hóa chất\n✅ Không pha trộn bột khác\n✅ Hoàn tiền nếu không đúng mô tả',
  },
  {
    id: 'local-2',
    name: 'Ba Kích Tím Rừng – Ngâm Rượu',
    price: 320000,
    originalPrice: 390000,
    image: '/Sam.png',
    region: 'Vùng Trung',
    rating: 4.8,
    reviews: 38,
    description: 'BA KÍCH TÍM RỪNG – NGÂM RƯỢU CỰC NGON 🔥\n💪 Tăng cường sinh lực – Bổ thận – Mạnh gân cốt\n🌿 Hàng rừng tự nhiên – lõi tím đậm – thơm đặc trưng',
    details: '✅ Hàng rừng tự nhiên 100%\n✅ Lõi ba kích tím đậm, thơm đặc trưng\n✅ Phơi khô tự nhiên, không chất bảo quản',
  },
  {
    id: 'local-3',
    name: 'Mật Ong Ruồi Nguyên Chất',
    price: 670000,
    originalPrice: 800000,
    image: '/Mat_Ong.png',
    region: 'Vùng Bắc',
    rating: 4.9,
    reviews: 76,
    description: 'Trong tủ thuốc của mỗi gia đình, nhất định nên có một chai Mật Ong Ruồi. Đây được coi là "kháng sinh tự nhiên" lành tính nhất mà đất trời ban tặng.',
    details: '✅ Mật ong ruồi rừng 100% tự nhiên\n✅ Kháng sinh tự nhiên – tốt cho sức khỏe\n✅ Không pha đường, không chất bảo quản\n✅ Kiểm nghiệm chất lượng đầy đủ',
    priceNote: 'Giá từ: 670,000₫ / chai',
  },
  {
    id: 'local-4',
    name: 'Thịt Trâu Gác Bếp',
    price: 470000,
    originalPrice: 560000,
    image: '/Trau_gac_bep.png',
    region: 'Vùng Bắc',
    rating: 4.9,
    reviews: 94,
    description: 'Thịt Trâu Gác Bếp do anh chị em chúng tôi đi tìm, ngả trâu, tự tay tẩm ướp, gác bếp và cung cấp đến tận tay các bác.',
    details: '✅ Tự tay tẩm ướp và gác bếp truyền thống\n✅ Không phẩm màu, không chất bảo quản\n✅ Đặc sản vùng núi phía Bắc chính thống',
    priceNote: '📦 Túi 500g: 470,000₫  |  Túi 1kg: 850,000₫',
  },
]

// Chuyển sản phẩm từ API sang định dạng hiển thị
function mapApiProduct(p: ApiProduct): Product {
  return {
    id: String(p.id),
    name: p.name,
    price: Number(p.price),
    originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
    image: p.mainImage || '/logo_3R.png',
    region: REGION_DISPLAY[p.region] ?? p.region,
    rating: p.ratingAverage ?? 4.5,
    reviews: p.ratingCount ?? 0,
    description: p.description ?? '',
  }
}

export default function ProductGrid({ region }: ProductGridProps) {
  const [apiProducts, setApiProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/products?limit=100`)
        const json = await res.json()
        if (json.success && Array.isArray(json.data)) {
          const mapped = (json.data as ApiProduct[])
            .filter((p) => p.isActive)
            .map(mapApiProduct)
          setApiProducts(mapped)
          setError(false)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Dùng API nếu có, fallback sang mặc định nếu lỗi/rỗng
  const allProducts = apiProducts.length > 0 ? apiProducts : DEFAULT_PRODUCTS

  const filteredProducts = useMemo(() => {
    if (!region) return allProducts

    const regionMap: Record<string, string> = {
      north: 'Vùng Bắc',
      central: 'Vùng Trung',
      south: 'Vùng Nam',
    }

    return allProducts.filter((p) => p.region === regionMap[region])
  }, [allProducts, region])

  return (
    <section id="products" className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🏆 Sản Phẩm Nổi Bật
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá những đặc sản tuyệt vời từ khắp nơi Việt Nam — Nhấn vào sản phẩm để xem chi tiết
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Đang tải sản phẩm...</p>
            </div>
          </div>
        )}

        {/* Error notice (nhỏ, không block UI) */}
        {!loading && error && (
          <div className="text-center mb-6">
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 inline-block px-4 py-2 rounded-full">
              ⚠️ Không thể kết nối API — Hiển thị sản phẩm mẫu
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Không có sản phẩm nào trong vùng này. Vui lòng chọn vùng khác!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
