import React from 'react'
import { IconType } from 'react-icons'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { reviewCriteria } from '@/app/libs/reviewCriteriaData'

interface RatingBoxInterface {
    title: string, 
    value: string,
    icon: IconType
}

const RatingBox = ({
    title,
    value,
    icon:Icon,
}:RatingBoxInterface) => {

    const criteria = reviewCriteria.find((criteria) => 
        criteria.category == title
    )
    
    if (!criteria) return;

    const {
        description,
        1: desc1,
        2: desc2,
        3: desc3,
        4: desc4,
        5: desc5,
    } = criteria

    const starDescriptions = [desc1, desc2, desc3, desc4, desc5];

  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="
                    flex 
                    flex-col 
                    min-h-[100px]
                    min-w-[100px]
                    w-full
                    gap-y-2 
                    border-r-[1px]
                    px-2
                    xl:px-2">
                    <div>
                        <div className="
                            text-neutral-500
                            text-xs
                            cursor-pointer
                        ">
                            {title}
                        </div>
                        <div className="
                            lg:text-xl
                            text-lg 
                            font-semibold">
                            {value}
                        </div>
                    </div>
                    <div className="mt-4 lg:mt-6 block lg:hidden">
                        <Icon size={30} />
                    </div>
                    <div className="mt-4 lg:mt-6 hidden lg:block">
                        <Icon size={40} />
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <div>{starDescriptions[Math.round(parseFloat(value)) - 1]}</div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)
}

export default RatingBox