'use client'

import Image from 'next/image'
import React from 'react'
import Button from './Button'
import Link from 'next/link'

const NoSpotsView = () => {
  return (
    <div className="
        h-[72vh]
        flex
        flex-col
        justify-center
        items-center
    ">
        <Image 
            src="/images/nospotsfound.png"
            width="400"
            height="400"
            alt="No spots found."
        />
        
        <div className="w-[10rem]">
            <Link href="/">
                <Button
                    label="Remove all filters"
                    onClick={() => {}}
                    outline
                />
            </Link>
        </div>
    </div>
  )
}

export default NoSpotsView