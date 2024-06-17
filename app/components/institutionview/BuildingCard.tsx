import { getOpenHoursToday } from '@/lib/formatTime';
import { Building } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { getOpenHoursTextColor } from '@/lib/formatTime';

interface BuildingCardProps {
    building: Building,
    highlighted: boolean
}

const BuildingCard = React.forwardRef<HTMLDivElement, BuildingCardProps>(({
    building,
    highlighted
}, ref) => {

    const {
        id,
        name,
        alias,
        openHours,
        facilities,
        address
    } = building
    
    // @ts-ignore
    console.log(openHours);
    // @ts-ignore !!!make type for this later
    const openHoursToday = getOpenHoursToday(openHours);

  return (
    <Link 
    href={`/building/${id}`}>
    <div
    ref={ref}
    className={`
        flex
        flex-row
        items-center
        py-4
        px-8
        group
        bg-white
        border-[1px]
        border-black
        transition
        duration-200
        cursor-pointer
        transition-translate
        active:opacity-[80%]
        ${highlighted ? 'mr-2 translate-x-1 bg-neutral-900 text-slate-200' : 'hover:mr-2 hover:translate-x-1 hover:bg-neutral-900 hover:text-slate-200'}
    `}>
        <div className="flex flex-col max-w-[90%]">
            <div
            className="
                text-2xl
                font-semibold
            ">
                {name}
            </div>
            <div 
            className={`text-md ${getOpenHoursTextColor(openHoursToday)}`}>
                {openHoursToday}
            </div>
        </div>
        <div className={`
            ml-auto
            opacity-0
            ${highlighted ? 
                'opacity-100 visible translate-x-2 text-slate-200' 
                : 
                'group-hover:opacity-100 text-slate-200 group-hover:visible group-hover:translate-x-2'}
            transition
            duration-200
        `}>
            <IoIosArrowForward size={24}/>
        </div>
    </div>
    </Link>
  )
})

BuildingCard.displayName = 'BuildingCard';

export default BuildingCard