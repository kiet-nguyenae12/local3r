// src/components/HeroSection.tsx
'use client'
import React from 'react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary h-96 md:h-[500px] flex items-center justify-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: 'linear-gradient(45deg, #d97706 25%, #f59e0b 25%, #f59e0b 50%, #d97706 50%, #d97706 75%, #f59e0b 75%, #f59e0b)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Tinh hoa đặc sản Việt
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Khám phá hương vị độc đáo từ khắp ba miền Bắc - Trung - Nam
        </p>
        <Link
          href="#products"
          className="inline-block bg-white text-primary px-8 py-3 md:px-12 md:py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          🛒 Mua ngay
        </Link>
      </div>
    </section>
  )
}
