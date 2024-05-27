'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    <Image 
        onClick={() => router.push('/')}
        alt="Logo"
        className="md:block cursor-pointer"
        src="/images/Logo.png"
        height="100"
        width="120"
    />
  )
}

export default Logo