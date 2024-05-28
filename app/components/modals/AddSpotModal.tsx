'use client'

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useAddSpotModal from '@/app/hooks/useAddSpotModel'
import Heading from '../Heading';
import { categories } from '../navbar/Categories'; 
import { InsertEmoticon } from '@mui/icons-material';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import LocationSelect from '../inputs/LocationSelect';
import FeaturesInput from '../inputs/FeaturesInput';
import ImageUpload from '../inputs/ImageUpload';
import NoiseLevelInput from '../inputs/NoiseLevelInput';
import BuildingInput from '../inputs/BuildingInput';
import CapacityInput from '../inputs/CapacityInput';

import { FaPeopleLine } from 'react-icons/fa6';
import { BiSolidBuildings } from "react-icons/bi";
import { IoVolumeMedium } from "react-icons/io5";
import DescriptionInput from '../inputs/DescriptionInput';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import NameInput from '../inputs/NameInput';
import InstitutionSelect from '../inputs/InstitutionSelect';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INSTITUTION = 2,
    INFO = 3,
    IMAGES = 4, 
    DESCRIPTION = 5,
    FEATURES = 6,
}

const AddSpotModal = () => {
    const addSpotModal = useAddSpotModal();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedInsitutionId, setSelectedInstitutionId] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            imgSrc: '',
            name: '',
            description: '',
            features: [],
            noiseLevel: 0,
            capacity: 0, 
            building: null,
            institution: null
        }
    })

    // track inputs
    const category = watch('category');
    const location = watch('location');
    const imgSrc = watch('imgSrc');
    const noiseLevel = watch('noiseLevel');
    const building = watch('building');
    const capacity = watch('capacity');
    const features = watch('features');
    const name = watch('name');
    const description = watch('description');
    const insitution = watch('institution');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,      // Whether to compute if your input is dirty or not against your defaultValues (subscribed to dirtyFields).
            shouldTouch: true,      // Whether to set the input itself to be touched.
            shouldValidate: true,   // Whether to compute if your input is valid or not (subscribed to errors).
        })
    }

    const onBack = () => {
        console.log(step);
        setStep((value) => value - 1)
    }
    
    const onNext = () => {
        console.log(step);
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.FEATURES) {
            return 'Create';
        }

        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.FEATURES) {
            return onNext();
        }

        setIsLoading(true);
        axios.post('/api/studyspots', data)
        .then(() => {
            toast({ 
                title: "Study spot created."
            })
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            addSpotModal.onClose();
        })
        .catch(() => {
            toast({ 
                variant: "destructive",
                title: "Study spot created."
            })
        }).finally (() => {setIsLoading(false)});
        
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your spot?"
                subtitle="Pick a category"
            />
            <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            ">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Where is the spot located?"
                    subtitle="Help others find this spot!"
                />
                <LocationSelect 
                    onSelectLocation={(location) => {
                        setCustomValue('location', location)
                        setPosition(location);
                    }}
                    position={location}
                    register={register}
                    setValue={setValue}
                />
            </div>
        )
    }

    if (step === STEPS.INSTITUTION) {
        bodyContent = (
            <div>
                <div className="flex flex-col gap-8">
                    <Heading 
                        title="Does the spot belong to an institution?"
                    />
                    <InstitutionSelect 
                        onSelectInstitution={(institutionId) => {
                            setSelectedInstitutionId(institutionId)
                        }}
                        selectedInstitutionId={selectedInsitutionId}
                    />
                    <BuildingInput 
                        title="Building"
                        subtitle="Which building is this study spot in?"
                        onChange={(value) => setCustomValue('building', value)}
                        selectedBuildingId={building}
                        institutionId={selectedInsitutionId}
                    />
                </div>
            </div>
        )
    }

    // PT 1: Noise Level
    // PT 2: Building (take select options from mongodb database)
    // PT 3: Capacity (optional)
    // PT 4: Area-specific open hours (optional)

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading 
                    title="Share some basics about the spot"
                    subtitle="Help others decide if it's right for them!"
                />
                <div className="">
                    <div className="md:hidden">
                    <IoVolumeMedium
                        size={30} 
                    />
                    </div>
                    <NoiseLevelInput 
                        title="Noise Level"
                        subtitle="How much noise is permitted?"
                        value={noiseLevel}
                        onChange={(value) => setCustomValue('noiseLevel', value)}
                    />
                </div>
                
                <div className="h-[1px] bg-neutral-300"></div>
                
                <div className="">
                    <div className="md:hidden">
                    <FaPeopleLine
                        size={30}
                    />
                    </div>
                    <CapacityInput
                        title="Capacity"
                        subtitle="Enter an estimate capacity (optional)"
                        value={capacity}
                        onChange={(value) => setCustomValue('capacity', value)}
                    />
                </div>

                <div className="h-[1px] bg-neutral-300"></div>
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Add some photos of the spot"
                    subtitle="Show others what it looks like"
                />
                <ImageUpload
                    value={imgSrc}
                    onChange={(value) => setCustomValue('imgSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Add a name and description"
                />
                <NameInput 
                    title="Spot Name"
                    subtitle="This spot is known as..."
                    value={name}
                    onChange={(value) => setCustomValue('name', value)}
                />
                <DescriptionInput 
                    title="Description"
                    subtitle="This spot is known for..."
                    value={description}
                    onChange={(value) => setCustomValue('description', value)}
                />
            </div>
        )
    }

    if (step === STEPS.FEATURES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="What features does the spot have?"
                    subtitle="Select all applicable features"
                />
                <FeaturesInput 
                    selectedFeatures={features}
                    onChange={(value) => setCustomValue('features', value)}
                />
            </div>
        )
    }

  return (
    <Modal 
        isOpen={addSpotModal.isOpen}
        onClose={addSpotModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step !== STEPS.CATEGORY ? onBack : undefined}
        title="Add a Study Spot"
    />
  )
}

export default AddSpotModal;