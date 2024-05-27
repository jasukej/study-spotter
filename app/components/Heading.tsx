'use client'

import React from 'react'

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading = ({
    title,
    subtitle,
    center
}: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-2xl font-bold text-black">
            {title}
        </div>
        <div className="font-light text-neutral-400 mt-1">
            {subtitle}
        </div>
    </div>
  )
}

export default Heading