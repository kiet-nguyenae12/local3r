// src/pages/admin/products.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Edit2, Trash2, Plus, ArrowLeft } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  region: string
  stock: number
  category: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Nước mắm Phú Quốc',
      price: 85000,
      region: 'Nam',
      stock: 45,
      category: 'Gia vị',
    },
    {
      id: '2',
      name: 'Cà phê Buôn Mê Thuột',
      price: 125000,
      region: 'Trung',
      stock: 32,
      category: 'Thức uống',
    },
    {
      id: '3',
      name: 'Xôi Vài Hạ Long',
      price: 155000,
      region: 'Bắc',
      stock: 18,
      category: 'Bánh',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    region: 'Nam',
    stock: '',
    category: '',
  })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: String(products.length + 1),
      name: formData.name,
      price: parseInt(formData.price),
      region: formData.region,
      stock: parseInt(formData.stock),
      category: formData.category,
    }
    setProducts([...products, newProduct])
    setFormData({ name: '', price: '', region: 'Nam', stock: '', category: '' })
    setShowForm(false)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-primary hover:text-orange-700">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              📦 Quản Lý Sản Phẩm
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-orange-700 transition"
          >
            <Plus size={20} />
            Thêm Sản Phẩm
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add Product Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ➕ Thêm Sản Phẩm Mới
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên Sản Phẩm
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="VD: Nước mắm Phú Quốc"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá (VNĐ)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="VD: 85000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vùng Miền
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Bắc">Bắc</option>
                    <option value="Trung">Trung</option>
                    <option value="Nam">Nam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tồn Kho
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="VD: 50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh Mục
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="VD: Gia vị"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Tên Sản Phẩm
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Vùng
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Tồn Kho
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Danh Mục
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-primary font-bold">
                    {product.price.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {product.region}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        product.stock > 20
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-6 py-3 text-sm text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
