// src/components/Footer.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo_3R.png" alt="Local3R" className="w-12 h-12 object-contain" />
              <h3 className="text-white text-lg font-bold">Local3R</h3>
            </div>
            <p className="text-sm mb-5">
              Mang đặc sản Việt đến gần hơn với bạn. Chất lượng, uy tín, giá tốt.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61578445540054"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                title="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@local3r_vn?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-black border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                title="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Danh Mục</h4>
            <div className="space-y-2 text-sm flex flex-col">
              <Link href="/?region=north" className="hover:text-primary transition">
                Đặc Sản Vùng Bắc
              </Link>
              <Link href="/?region=central" className="hover:text-primary transition">
                Đặc Sản Vùng Trung
              </Link>
              <Link href="/?region=south" className="hover:text-primary transition">
                Đặc Sản Vùng Nam
              </Link>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold mb-4">Chính Sách</h4>
            <div className="space-y-2 text-sm flex flex-col">
              <Link href="#" className="hover:text-primary transition">
                Chính Sách Đổi Trả
              </Link>
              <Link href="#" className="hover:text-primary transition">
                Hướng Dẫn Mua Hàng
              </Link>
              <Link href="#" className="hover:text-primary transition">
                Điều Khoản Sử Dụng
              </Link>
              <Link href="#" className="hover:text-primary transition">
                Bảo Vệ Dữ Liệu
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Liên Hệ</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:0865584465" className="flex items-center gap-2 hover:text-primary transition">
                <Phone size={16} />
                <span>0865 584 465</span>
              </a>
              <a href="mailto:hkhoi624@gmail.com" className="flex items-center gap-2 hover:text-primary transition">
                <Mail size={16} />
                <span>hkhoi624@gmail.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Đà Nẵng, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 Local3R. Curated with for Vietnam.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition">
              Về Chúng Tôi
            </Link>
            <Link href="#" className="hover:text-primary transition">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
