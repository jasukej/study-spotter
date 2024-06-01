
import React, { ServerContextJSONValue } from 'react'
import Heading from '../Heading'
import { JsonObject, JsonValue } from '@prisma/client/runtime/library'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { IoMdArrowDropdown } from "react-icons/io";

interface OpenHoursDisplay {
    openHours:JsonValue
}

const OpenHoursDisplay = ({ openHours }:OpenHoursDisplay) => {
    
    if (!openHours) {
        return (
            <div>
                No information given
            </div>
        )
    }

    const daysOfWeek = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ]

    const formatOpenHours = (openHours: any) => {
        return daysOfWeek.map((day) => (
          <div key={day} className="flex justify-between">
            <span>{day}</span>
            <span>{openHours[day.toLowerCase()]}</span>
          </div>
        ));
    };

    const getOpenHoursToday = (openHours: any) => {
        const today = new Date();
        const dayIndex = today.getDay();
        const todayDayName = daysOfWeek[dayIndex];
        const openHoursToday = openHours[todayDayName.toLowerCase()];

        if (openHoursToday === "Closed") {
            return 'Closed today'
        }

        return `${openHoursToday} ${todayDayName}`
    }
    
    const openHoursToday = getOpenHoursToday(openHours);
  
    return (
        <div className="
            flex 
            flex-row 
            justify-between
            items-center"
        >
            <Heading
                title="Open Hours"
            />
            <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <div className="flex flex-row items-center gap-2">
                            {openHoursToday}
                            <IoMdArrowDropdown size={14}/>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                    {formatOpenHours(openHours)}
                </PopoverContent>
            </Popover>
            </div>
        </div>
    )
}

export default OpenHoursDisplay