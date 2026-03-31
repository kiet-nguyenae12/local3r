// src/pages/index.tsx
'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  const router = useRouter()
  const { region } = router.query

  return (
    <>
      <HeroSection />
      <ProductGrid region={region as string | undefined} />
    </>
  )
}
