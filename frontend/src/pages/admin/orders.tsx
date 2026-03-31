// src/pages/admin/orders.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, ArrowLeft } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  paymentStatus: 'pending' | 'completed' | 'failed'
  date: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'Nguyễn Văn A',
      totalAmount: 250000,
      status: 'pending',
      paymentStatus: 'completed',
      date: '2024-03-31',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Trần Thị B',
      totalAmount: 185000,
      status: 'processing',
      paymentStatus: 'completed',
      date: '2024-03-30',
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerName: 'Phạm Văn C',
      totalAmount: 420000,
      status: 'shipped',
      paymentStatus: 'pending',
      date: '2024-03-29',
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: '⏳ Chờ xử lý',
      processing: '⚙️ Đang xử lý',
      shipped: '📦 Đã gửi',
      delivered: '✅ Đã giao',
    }
    return labels[status] || status
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <Link href="/admin" className="text-primary hover:text-orange-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            📋 Quản Lý Đơn Hàng
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Mã Đơn
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Khách Hàng
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Tổng Tiền
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Trạng Thái
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Thanh Toán
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Ngày
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-bold text-gray-800">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-3 text-sm text-primary font-bold">
                    {order.totalAmount.toLocaleString('vi-VN')}₫
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        order.paymentStatus === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.paymentStatus === 'completed' ? '✅ Đã TT' : '❌ Chưa TT'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="px-6 py-3 text-sm text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-500 hover:text-blue-700 transition inline-flex items-center gap-1"
                    >
                      <Eye size={18} />
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Chi Tiết Đơn Hàng
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Order Info */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Mã Đơn Hàng</p>
                      <p className="font-bold text-gray-900">
                        {selectedOrder.orderNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Khách Hàng</p>
                      <p className="font-bold text-gray-900">
                        {selectedOrder.customerName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Trạng Thái</p>
                      <span className={`px-3 py-1 rounded text-xs font-semibold inline-block ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ngày</p>
                      <p className="font-bold text-gray-900">
                        {selectedOrder.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Tổng Cộng:
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {selectedOrder.totalAmount.toLocaleString('vi-VN')}₫
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-orange-700 transition">
                    Cập Nhật Trạng Thái
                  </button>
                  <button className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-400 transition">
                    In Đơn
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
