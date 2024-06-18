'use client'

import Image from 'next/image'
import React from 'react'
import Button from './Button'

const NoSpotsView = () => {
  return (
    <div className="
        h-screen
        flex
        flex-col
        justify-center
    ">
        <Image 
            src="/images/nospotsfound.png"
            width="100"
            height="100"
            alt="No spots found."
        />
        <div className="
            text-neutral-500
            text-sm
        ">
            No spots here.
        </div>
        <Button
            label="Remove all filters"
            onClick={() => {}}
            outline
        />
    </div>
  )
}

export default NoSpotsView