// src/components/ProductCard.tsx
'use client'
import React, { useState } from 'react'
import { ShoppingCart, Star, X, ChevronRight } from 'lucide-react'
import { useCart } from '@/store/cartStore'

interface ProductCardProps {
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

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  region,
  rating = 4.8,
  reviews = 12,
  description = '',
  details = '',
  priceNote = '',
}: ProductCardProps) {
  const { addItem } = useCart()
  const [showModal, setShowModal] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({ id, name, price, image, quantity: 1, region })
  }

  const displayOriginalPrice = originalPrice ?? Math.round(price * 1.2)

  return (
    <>
      {/* Card */}
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        {/* Product Image */}
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold shadow">
            {region}
          </span>
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
            -17%
          </span>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-primary font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-1 shadow-lg">
              Xem chi tiết <ChevronRight size={14} />
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Name */}
          <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xl font-bold text-primary">
                {price.toLocaleString('vi-VN')}₫
              </p>
              <p className="text-xs text-gray-400 line-through">
                {displayOriginalPrice.toLocaleString('vi-VN')}₫
              </p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow hover:shadow-md"
          >
            <ShoppingCart size={16} />
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {/* Modal Chi Tiết */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1.5 transition"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative h-64 bg-gray-100 rounded-t-2xl overflow-hidden">
              <img src={image} alt={name} className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                {region}
              </span>
            </div>

            {/* Info */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">{rating} ({reviews} đánh giá)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-gray-100">
                <span className="text-3xl font-bold text-primary">
                  {price.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {displayOriginalPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">-17%</span>
              </div>

              {/* Price Note (nếu có) */}
              {priceNote && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800">
                  {priceNote}
                </div>
              )}

              {/* Description */}
              {description && (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{description}</p>
                </div>
              )}

              {/* Details */}
              {details && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{details}</p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={(e) => { handleAddToCart(e); setShowModal(false) }}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingCart size={18} />
                  Thêm vào giỏ
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-semibold transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
