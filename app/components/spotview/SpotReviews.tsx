'use client'

import React, { useCallback } from 'react'
import Heading from '../Heading'
import { User } from '@prisma/client';
import { Reviews, ReviewsRounded } from '@mui/icons-material'
import useAddReviewModal from '@/app/hooks/useAddReviewModal';
import getCurrentUser from '@/app/actions/getCurrentUser';
import useLoginModal from '@/app/hooks/useLoginModal';
import Button from '../Button';
import ReviewCard from './ReviewCard';
import AggregateReviews from './AggregateReviews';

interface SpotReviewsProps {
    currentUser?: User | null;
    reviews: any;
    spotId: string;
}

const SpotReviews = ({ currentUser, reviews, spotId }:SpotReviewsProps) => {
    const addReviewModal = useAddReviewModal();
    const loginModal = useLoginModal();

    const onAdd = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        addReviewModal.onOpen(spotId);
    }, [currentUser, loginModal, addReviewModal]);

  return (
    <div 
    className="py-4 flex flex-col">
        <div className="flex flex-row justify-between">
            <Heading
                title="Reviews"
                subtitle="See what other students have to say:"
            />
            <div className="
                flex 
                justify-items-end
                md:flex-none
                md:w-[20%] 
                md:h-[40px]">
                <Button 
                    label={"Add a review"}
                    onClick={onAdd}
                    addCircle
                />
            </div>
        </div>
        <div>
            <AggregateReviews 
                reviews={reviews}
            />
        </div>
        <div className="
            flex 
            flex-row 
            gap-x-2 
            py-4
            ">
                {reviews.map((review:any , index:number) => (
                        <ReviewCard
                            key={index}
                            review={review}
                            user={review.user}
                        />
                ))}
        </div>
    </div>
  )
}

export default SpotReviews