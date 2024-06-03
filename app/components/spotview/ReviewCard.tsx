import { Review, User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Avatar from '../Avatar'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'

interface ReviewCardProps {
    review: Review,
    user: User,
}

const ReviewCard = ({ review, user }:ReviewCardProps) => {
    const {
        rating, 
        content,
        accessibility,
        availability,
        comfort,
        wifi, 
        plugs, 
        atmosphere,
        datePosted,
        userId,
        studySpotId,
    } = review

    // const [user, setUser] = useState<{ name: string; image: string | null } | null>(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get(`/api/user/${userId}`)
    //             setUser(response.data);
    //         } catch (error) {
    //             console.error('Error fetching user: ', error);
    //         }
    //     }

    //     fetchUser();
    // }, [userId])

    function formatDate(dateString:Date) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
        };
        // @ts-ignore
        return date.toLocaleDateString('en-US', options);
    }

    if (!user) {
        return (
            <div>
                <Skeleton 
                    className="
                    h-[250px]
                    min-w-[350px]
                    max-w-[530px]
                    rounded-xl
                    "
                />
            </div>
        )
    }
  
    return (

    <div className="
        border 
        border-neutral-800 
        rounded-xl
        sm:max-w-[530px]
        animate
        ease-out
        hover:ease-in
        hover:transition
        hover:duration-40
        hover:-translate-y-2
        hover:-translate-x-2
        hover:shadow-block-shadow
        p-4
        min-h-[250px]
        max-h-auto
        relative
    ">
        <div className="flex flex-col gap-y-2 pb-10">
            <div>
                <div className="flex-row font-semibold flex gap-x-2 items-center">
                    {rating} 
                    <FaStar size={12}/>
                </div>
                <div className="text-sm text-neutral-500"> {formatDate(datePosted)} </div>
            </div>
            <div className="
                max-h-[50%] 
                text-sm 
                w-full 
                overflow-y-hidden">
                {content}
            </div>
        </div>
        <div className="
            flex 
            flex-row
            absolute 
            bottom-4 
            gap-x-4">
            <Avatar 
                src={user.image || '/images/placeholder.jpeg'}
                alt={`${user.name}'s avatar`}
                height={30}
                width={30}
            />
            <div>{user.name}</div>
        </div>
    </div>
  )
}

export default ReviewCard