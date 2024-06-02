import React from 'react'
import RatingBox from './RatingBox';
import { TbAccessible } from "react-icons/tb";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdChair } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { LuPlug2 } from "react-icons/lu";
import { TbBrandFunimation } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa6";

interface AggregateReviews {
    reviews: any[];
}

const AggregateReviews = ({ reviews }:AggregateReviews) => {
    if (reviews.length == 0) return null;

    const calculateAverage = (key:string) => {
        const total = reviews.reduce((sum, review) => 
            sum + review[key], 0
        )
        return (total/reviews.length).toFixed(1);
    }

    const averageRating = calculateAverage('rating');
    const averageAccessibility = calculateAverage('accessibility');
    const averageAvailability = calculateAverage('availability');
    const averageComfort = calculateAverage('comfort');
    const averageWifi = calculateAverage('wifi');
    const averagePlugs = calculateAverage('plugs');
    const averageAtmosphere = calculateAverage('atmosphere');

  
    return (
        <div className="
            my-4 
            p-4 
            border 
            rounded-md 
            shadow-sm">
            <div className="
                flex 
                flex-row
                gap-x-2
                justify-between
                overflow-x-scroll
            ">
                <RatingBox 
                    title='Overall'
                    value={averageRating}
                    icon={FaRegStar}
                />
                <RatingBox 
                    title='Accessibility'
                    value={averageAccessibility}
                    icon={TbAccessible}
                />
                <RatingBox 
                    title='Availability'
                    value={averageAvailability}
                    icon={MdOutlineEventAvailable}
                />
                <RatingBox 
                    title='Comfort'
                    value={averageComfort}
                    icon={MdChair}
                />
                <RatingBox 
                    title='WiFi'
                    value={averageWifi}
                    icon={FaWifi}
                />
                <RatingBox 
                    title='Plugs'
                    value={averagePlugs}
                    icon={LuPlug2}
                />
                <RatingBox 
                    title='Atmosphere'
                    value={averageAtmosphere}
                    icon={TbBrandFunimation}
                />
            </div>
        </div>
    )
}

export default AggregateReviews