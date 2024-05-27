'use client'

import axios from 'axios';
import { StudySpot, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { FaRegClock, FaStar } from "react-icons/fa"
import { getDistance } from 'geolib';
import Image from 'next/image';

interface Location {
    lat: number;
    lng: number;
}

interface SpotCardProps {
    data: StudySpot & { 
        location: Location | null; 
        buildingId: string; 
        imgSrc: string 
    };
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: User;
}

const SpotCard = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser
}:SpotCardProps) => {
    const router = useRouter();
    const [building, setBuilding] = useState<any>(null);
    const [openStatus, setOpenStatus] = useState<string>('');
    const [distance, setDistance] = useState<number | null>(null);

    const location = data.location

    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                const response = await axios.get(`/api/buildings/${data.buildingId}`)
                setBuilding(response.data);
            } catch (error) {
                console.error('Error fetching building: ', error);
            }
        }

        fetchBuilding();
    }, [data.buildingId]);

    useEffect(() => {
        if (building) {
            const status = getOpenHoursToday(building.openHours);
            setOpenStatus(status);
        }
    }, [building])

    useEffect(() => {
        if (navigator.geolocation && data.location) {
            navigator.geolocation.getCurrentPosition(position => {

                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                const spotLocation = {
                    latitude: data.location.lat,
                    longitude: data.location.lng
                };

                const calculatedDistance = getDistance(userLocation, spotLocation) / 1000;
                setDistance(calculatedDistance)
            }, error => {
                setDistance(null);
            });    
        } else {
            setDistance(null);
        }
            
    }, [data.location])

    const getOpenHoursToday = (openHours: any): string => {
        const daysOfWeek = [
            "sunday", 
            "monday", 
            "tuesday", 
            "wednesday", 
            "thursday", 
            "friday", 
            "saturday"
        ]
        const today = new Date();
        const dayIndex = today.getDay();
        const todayDayName = daysOfWeek[dayIndex];
        const openHoursToday = openHours[todayDayName];

        if (openHoursToday === "Closed") {
            return 'Closed today'
        }

        const [openTime, closeTime] = openHoursToday.split(' - ');
        const currentTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

        if (currentTime < openTime) {
            return `Opens at ${openTime}`
        } else if (currentTime > closeTime) {
            return `Closed since ${closeTime}`
        } else {
            return `Closes at ${closeTime}`
        }
    }

    function getNoiseDescription(noiseLevel: number): string {
        const noiseLevelMap: { [key: number]: string } = {
            "1": 'SILENT STUDY',
            "2": 'USUALLY QUIET',
            "3": 'MODERATE',
            "4": 'DISCUSSION SPACE',
            "5": 'ALWAYS NOISY'
        };

        return noiseLevelMap[noiseLevel] || 'UNKNOWN';
    }

  return (
    <div className="
    rounded-lg
    border
    border-black
    flex-col
    flex
    gap-y-2
    ">
        <div
        className="
            relative
            w-full
            h-48
        ">
            <Image 
                fill={true}
                objectFit="cover"
                alt = {data.name}
                src = {data.imgSrc} // revise to include multiple images
            />
        </div>
        <div className="
            px-4
            flex-col
            pb-3
        ">
            <div className="
                flex
                flex-row
                justify-between
                items-center
            ">
                <div className="
                    text-lg
                    font-bold
                ">
                    {data.name}
                </div>
                <div className="
                    flex
                    flex-row
                    gap-1
                    items-center
                ">
                    <div>
                        4.87
                    </div>
                        <FaStar />
                </div>
            </div>
            <div className="
                text-neutral-500
                flex 
                flex-row
                gap-x-2
                text-sm
            ">
                <div className="

                ">
                    {building ? building.name : 'Loading...'}
                </div>
                |
                <div>
                    {distance !== null ? `${distance.toFixed(2)} km away` : 'Calculating...'}
                </div>
            </div>
            <div className="
                flex
                flex-row
                gap-x-2
                items-center
                text-sm
                h-[30px]
            ">
                <FaRegClock />
                <div>
                    {openStatus}
                </div>
            </div>
            <div className="
                rounded-full
                bg-orange-main
                text-yellow-light
                text-sm
                font-semibold
                px-3
                py-[3px]
                w-auto
                flex
                flex-row
                justify-between
            ">
                <div>
                    {getNoiseDescription(data.noiseLevel)}
                </div>
                <div>
                    busy {/* PLACEHOLDER */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpotCard;