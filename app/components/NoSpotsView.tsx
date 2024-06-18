'use client'

import Image from 'next/image'
import React from 'react'
import Button from './Button'

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
            <Button
                label="Remove all filters"
                onClick={() => {}}
                outline
            />
        </div>
    </div>
  )
}

export default NoSpotsView