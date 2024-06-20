'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter();

  return (
    <>
    <Image 
        onClick={() => router.push('/')}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        src="/images/LogoAlt.png"
        height="140"
        width="150"
    />
    <Image 
        onClick={() => router.push('/')}
        alt="Logo"
        className="md:hidden cursor-pointer"
        src="/favicon.png"
        height="140"
        width="50"
    />
    </>
  )
}

export default Logo