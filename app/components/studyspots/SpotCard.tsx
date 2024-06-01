'use client'

import axios from 'axios';
import { StudySpot, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { FaRegClock, FaStar } from "react-icons/fa"
import { getDistance } from 'geolib';
import Image from 'next/image';
import BookmarkButton from '../BookmarkButton'
import { Skeleton } from '@/components/ui/skeleton';

interface Location {
    lat: number;
    lng: number;
}

interface SpotCardProps {
    data: StudySpot & { 
        location: Location; 
        buildingId: string; 
        imgSrc: string[];
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
        if (data.buildingId) fetchBuilding();
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

    const getOpenHoursToday = (openHours: any) => {
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
    <div 
    key={data.id}
    onClick={() => {router.push(`/studyspot/${data.id}`)}}
    className="
    rounded-lg
    border
    border-black
    bg-white
    flex-col
    flex
    h-full
    gap-y-2
    transition-transform
    hover:shadow-lg
    hover:-translate-x-1
    hover:-translate-y-1
    transform 
    duration-50
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
                src = {data.imgSrc[0]} // revise to include multiple images
            />
            <div className="mt-2 mr-2">
                <BookmarkButton 
                    spotId = {data.id}
                    // @ts-ignore
                    currentUser = {currentUser} 
                />
            </div>
        </div>
        <div className="">
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
                    md:min-h-[50px]
                ">
                    <div className="
                        text-lg
                        font-bold
                        leading-tight
                    ">
                        {data.name}
                    </div>
                    <div className="
                        flex
                        flex-row
                        gap-1
                        text-sm
                        items-start
                        h-peer
                    ">
                        <div className="
                            -mt-1
                        ">
                            4.87
                        </div>
                            <FaStar 
                                size={12}
                            />
                    </div>
                </div>
                <div className="
                    text-neutral-500
                    flex 
                    flex-row
                    gap-x-2
                    text-sm
                    md:flex-col
                ">
                    {data.buildingId && (
                        <div className="flex gap-2">
                            {building ? 
                                building.name : 
                                <Skeleton 
                                className="
                                    w-[100px]
                                    h-[15px]
                                "
                                />
                            }
                            <div className="md:hidden"> | </div>
                        </div>
                    )}
                    
                        {distance ? 
                            <div>
                                `${distance.toFixed(2)} km away`
                            </div> : 
                        <Skeleton 
                            className="
                                h-[15px]
                                w-[200px]
                            "
                        />}
                    
                </div>
                    {openStatus ?
                        <div className="
                        flex
                        flex-row
                        gap-x-1
                        items-center
                        text-sm
                        h-[30px]">
                            <FaRegClock />
                            {openStatus} 
                        </div>
                        : 
                        <Skeleton 
                            className="
                                w-full
                                h-[20px]
                                rounded-full
                            "
                        />
                    }
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
    </div>
  )
}

export default SpotCard;