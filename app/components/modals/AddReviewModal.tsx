'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useAddReviewModal from '@/app/hooks/useAddReviewModal';
import Heading from '../Heading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import RatingInput from '../inputs/RatingInput';
import DescriptionInput from '../inputs/DescriptionInput';

enum STEPS {
    OVERALL = 0,
    CATEGORIES = 1,
    TEXTREVIEW = 2,
}

const AddReviewModal = () => {
    const addReviewModal = useAddReviewModal();
    const [step, setStep] = useState(STEPS.OVERALL);
    const [progress, setProgress] = useState(2);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            rating: 0,
            accessibility: 0,
            availability: 0,
            comfort: 0,
            wifi: 0,
            plugs: 0,
            atmosphere: 0,
            content: ''
        }
    });

    const rating = watch('rating');
    const accessibility = watch('accessibility');
    const availability = watch('availability');
    const comfort = watch('comfort');
    const wifi = watch('wifi');
    const plugs = watch('plugs');
    const atmosphere = watch('atmosphere');
    const content = watch('content');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        console.log(step);
        setStep((value) => value - 1);
        setProgress((value) => value - 33);
    };

    const onNext = () => {
        console.log(step);
        setStep((value) => value + 1);
        setProgress((value) => value + 33);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.TEXTREVIEW) {
            return 'Post';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.OVERALL) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.TEXTREVIEW) {
            return onNext();
        }

        setIsLoading(true);
        axios.post(`/api/reviews/${addReviewModal.studySpotId}`)
            .then(() => {
                toast({
                    title: "Review posted."
                });
                router.refresh();
                reset();
                setStep(STEPS.OVERALL);
                addReviewModal.onClose();
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Failed to post review."
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Review time!"
                subtitle="How was studying at this study spot?"
            />
            <div className="">
                <RatingInput
                    value={rating}
                    onChange={(value) => setCustomValue('rating', value)}
                />
            </div>
        </div>
    );

    if (step === STEPS.CATEGORIES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Rate your spot"
                    subtitle="Consider the following categories:"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 max-h-[60vh] overflow-y-auto">
                    <RatingInput
                        category="Accessibility"
                        value={accessibility}
                        onChange={(value) => setCustomValue('accessibility', value)}
                    />
                    <RatingInput
                        category="Availability"
                        value={availability}
                        onChange={(value) => setCustomValue('availability', value)}
                    />
                    <RatingInput
                        category="Comfort"
                        value={comfort}
                        onChange={(value) => setCustomValue('comfort', value)}
                    />
                    <RatingInput
                        category="WiFi"
                        value={wifi}
                        onChange={(value) => setCustomValue('wifi', value)}
                    />
                    <RatingInput
                        category="Plugs"
                        value={plugs}
                        onChange={(value) => setCustomValue('plugs', value)}
                    />
                    <RatingInput
                        category="Atmosphere"
                        value={atmosphere}
                        onChange={(value) => setCustomValue('atmosphere', value)}
                    />
                </div>
                <div className="text-sm text-neutral-500">
                    * Hover or click on a category for more info.
                </div>
            </div>
        );
    }

    if (step === STEPS.TEXTREVIEW) {
        bodyContent = (
            <div>
                <Heading
                    title="Add an additional note"
                    subtitle="What did you like or dislike most?"
                />
                <DescriptionInput 
                    value={content}
                    onChange={(value) => setCustomValue('content', value)}
                />
            </div>
        );
    }

    return (
        <Modal
            progress={progress}
            isOpen={addReviewModal.isOpen}
            onClose={addReviewModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step !== STEPS.OVERALL ? onBack : undefined}
            title="Add a Review"
        />
    );
};

export default AddReviewModal;
