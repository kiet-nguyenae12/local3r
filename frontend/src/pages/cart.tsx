// src/pages/cart.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCart } from '@/store/cartStore'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const totalPrice = getTotalPrice()

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsProcessing(true)
    try {
      // Call backend API to create order
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          totalPrice,
          customerInfo: {
            name: 'Customer Name',
            email: 'customer@email.com',
            phone: '0243123456',
            address: 'Customer Address',
          },
          paymentMethod: 'credit_card',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Đơn hàng đã tạo thành công! Mã đơn: ${data.orderId}`)
        clearCart()
        // Redirect to order confirmation
      } else {
        alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Lỗi kết nối. Vui lòng thử lại!')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="text-primary hover:text-orange-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            🛒 Giỏ Hàng Của Bạn
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl mb-4">
              Giỏ hàng của bạn trống rỗng
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 p-6 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    {/* Product Info */}
                    <div className="flex-1 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{item.region}</p>
                        <p className="text-primary font-bold">
                          {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mr-6">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800 mb-2">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                {/* Summary Details */}
                <div className="space-y-3 text-gray-700 mb-6">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>30,000₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá:</span>
                    <span className="text-green-600">-15,000₫</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {(totalPrice + 30000 - 15000).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {isProcessing ? 'Đang xử lý...' : '💳 Thanh Toán'}
                </button>

                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-primary border-2 border-primary py-2 rounded-lg font-semibold hover:bg-orange-50 transition"
                >
                  Xóa Giỏ
                </button>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="block text-center mt-4 text-primary hover:underline"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
