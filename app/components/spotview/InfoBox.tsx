import React from 'react'
import { IconType } from 'react-icons'

interface InfoBoxParams {
    title: string,
    description: string,
    value: any,
    icon: IconType
}

const InfoBox = ({
    title,
    description,
    value,
    icon:Icon,
}:InfoBoxParams) => {
  return (
    <div className="
        flex
        flex-row
        p-4
        px-6
        border-[1px]
        border-b-[0px]
        border-neutral-800
        items-center
        justify-between
        min-w-[160px]
        text-lg
    ">
        <div className="flex flex-row items-center gap-x-2 text-neutral-500">
            <Icon size={24}/>
            <div className="
                font-bold
            ">
                {title}
            </div>
        </div>
        <div className="
            font-semibold
            text-black
        ">
            {value}
        </div>
    </div>
  )
}

export default InfoBox