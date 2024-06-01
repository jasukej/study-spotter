import React, { useState } from 'react';
import { Rating } from '@mantine/core';
import { reviewCriteria } from '@/app/libs/reviewCriteriaData';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  

interface RatingInputProps {
    category?: string;
    onChange?: (value: number) => void;
    value: number;
}

const RatingInput = ({ 
    category, 
    onChange, 
    value,
}: RatingInputProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const criteria = reviewCriteria.find((criteria) => 
        criteria.category == category
    )

    const handleHover = (hoveredValue: number) => {
        setHoverValue(hoveredValue);
    };

    if (!criteria) return (
        <div className="
            flex 
            md:flex-col 
            flex-row
            gap-y-4 
            justify-between
            md:justify-center
            md:gap-y-2
            items-center 
            w-full"
        >
            <Rating
                value={value}
                onChange={onChange}
                size="xl"
            />
        </div>
    );

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
        <div className="
            flex 
            md:flex-col 
            flex-row
            gap-y-4 
            justify-between
            md:justify-center
            md:gap-y-2
            items-center 
            w-full">
            {category && (
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="font-semibold text-lg cursor-pointer">
                            {category}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div>{description}</div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            )}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div>
                            <Rating
                                value={value}
                                onChange={onChange}
                                onHover={handleHover}
                                size="xl"
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div>{hoverValue && starDescriptions[hoverValue - 1]}</div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default RatingInput;
