'use client'

import React from 'react'

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem = ({
    onClick, 
    label
}:MenuItemProps) => {
  return (
    <div 
        onClick={onClick}
        className="
            px-4
            py-3
            hover:bg-neutral-100
            transition
            font-semibold
            text-black
        "
    >
        {label}
    </div>
  )
}

export default MenuItem