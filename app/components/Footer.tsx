import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="
      p-4 
      z-10
      bg-gray-100 
      w-full 
      text-center 
      text-black">
      <div>Made with 🫶 |&nbsp;
      <Link
          href="https://github.com/jasukej/study-spotter"
          className="
            inline-flex
            items-center
            group
            hover:underline-offset-2
            hover:text-amber-600
            "
        >
          Contribute 
      <span className="
        ml-2 
        mt-[1px]
        transition-transform 
        transform 
        group-hover:translate-x-1">
        →
      </span>
      </Link>
      </div>
    </footer>
  )
}

export default Footer