"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";

const BackButton = () => {
    const router = useRouter();
  return (
    <div 
        onClick = {() => router.back()}
        className="
            flex
            items-center
            justify-center
            p-2
            z-2
            rounded-full
            aspect-square
            w-[40px]
            h-[40px]
            hover:shadow-slight
            transition-shadow-transform
            duration-200 ease
            transform
            hover:-translate-x-[2px]
            hover:-translate-y-[2px]
            active:translate-x-[2px]
            active:translate-y-[2px]
            active:shadow-none
            border-black
            border-[1px]
            bg-white
        "
    >   
        <IoArrowBackOutline size={40}/>
    </div>
  )
}

export default BackButton