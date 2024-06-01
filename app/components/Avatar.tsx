import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src: string | null | undefined
  alt?: string
  height?: number
  width?: number
}

const Avatar = ({ src, alt, height, width }:AvatarProps) => {
  return (
    <Image 
        className="rounded-full"
        height={height}
        width={width}
        alt={alt || "Avatar"} 
        src={src || "/images/placeholder.jpeg"}
    />
  )
}

export default Avatar