// src/components/Header.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/store/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Tránh hydration mismatch: chỉ hiển thị badge sau khi client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const regions = [
    { name: 'Bắc', category: 'north' },
    { name: 'Trung', category: 'central' },
    { name: 'Nam', category: 'south' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-14 h-14 relative">
              <img
                src="/logo_3R.png"
                alt="Local3R Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">Local3R</h1>
              <p className="text-xs text-gray-500">Đặc sản Việt</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="text-primary" size={24} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:border-t border-gray-200 py-3 md:py-0`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {regions.map((region) => (
              <Link
                key={region.category}
                href={`/?region=${region.category}`}
                className="text-gray-700 hover:text-primary font-medium transition"
              >
                Vùng {region.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
