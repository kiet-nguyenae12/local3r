// src/pages/admin/index.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Tổng Sản Phẩm',
      value: '245',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Đơn Hàng Hôm Nay',
      value: '18',
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      label: 'Người Dùng',
      value: '1,240',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'Doanh Thu',
      value: '25.4M',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📊 Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📦 Quản Lý Sản Phẩm
            </h2>
            <p className="text-gray-600 mb-4">
              Thêm, chỉnh sửa hoặc xóa sản phẩm từ kho
            </p>
            <Link
              href="/admin/products"
              className="inline-block bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition"
            >
              Quản Lý Sản Phẩm
            </Link>
          </div>

          {/* Orders Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📋 Quản Lý Đơn Hàng
            </h2>
            <p className="text-gray-600 mb-4">
              Xem và xử lý các đơn hàng từ khách hàng
            </p>
            <Link
              href="/admin/orders"
              className="inline-block bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition"
            >
              Quản Lý Đơn Hàng
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
