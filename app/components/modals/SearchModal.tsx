'use client';

import qs from 'query-string';
import useSearchModal from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal';
import Heading from '../Heading';
import InstitutionSelect from '../inputs/InstitutionSelect';
import BuildingInput from '../inputs/BuildingInput';
import FeaturesInput from '../inputs/FeaturesInput';
import LocationSearch from '../search/LocationSearch';
import { Location } from '../search/LocationSearch';
import { Slider } from '@mantine/core';
import { CSSTransition } from 'react-transition-group';
import NoiseLevelSearch from '../search/NoiseLevelSearch';
import { RxCross2 } from "react-icons/rx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

enum STEPS {
    LOCATION = 0,
    BUILDING = 1, 
    NOISELEVEL = 2,
    FEATURES = 3
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [progress, setProgress] = useState(4);

    const [distance, setDistance] = useState<number | undefined>(undefined); // in km
    const [location, setLocation] = useState<Location | null>(null);
    const [institution, setInstitution] = useState<string | null>(null)
    const [building, setBuilding] = useState<string | null>(null);
    const [noiseLevel, setNoiseLevel] = useState<number | undefined>(undefined);
    const [features, setFeatures] = useState<string[]>([]);

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1)
        setProgress((prev) => prev - 24)
    }, [])

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1)
        setProgress((prev) => prev + 24)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.FEATURES) {
            return onNext();
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery, 
            distanceValue: distance, // coordinate position
            location: location ? `${location.lat}, ${location.lng}` : undefined,
            institution, 
            building,
            noiseLevel,
            features,
        };

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        setProgress(2);
        searchModal.onClose();

        router.push(url);
    }, [
        step, 
        searchModal,
        distance, 
        router,
        institution,
        building,
        noiseLevel,
        features,
        location,
        onNext, 
        params
    ])

    const actionLabel = useMemo(() => {
        if (step == STEPS.FEATURES) {
            return 'Search';
        }
        
        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.LOCATION) {
            return undefined;
        }

        return 'Back';
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Rise and grind!"
                subtitle="Find a study spot nearby"
            />
            <LocationSearch
                onSelectLocation={(location) => setLocation(location)}
                position={location}
                radius={distance}
            />
            <div className="
                flex 
                flex-row 
                gap-x-4
                items-center
                ">
                <div className="
                    font-semibold 
                    text-md
                    w-[120px]">
                        Radius: {distance ? distance : '??'} km
                </div>
                <Slider 
                    className="w-[70%]"
                    value={distance || 0}  
                    onChange={setDistance} 
                    min={0.1}
                    max={10}
                    step={0.1}
                    color="#F79F08"
                    marks={[
                        { value: 1 },
                        { value: 5 }, 
                        { value: 10 }
                    ]} 
                />
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                        onClick={() => setDistance(undefined)}
                        className="
                        hover:text-orange-main
                        rounded-full 
                        p-1
                        flex 
                        justify-center
                        items-center">
                        <RxCross2
                            size={16}/>
                    </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div>Clear filter</div>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
               
            </div>
        </div>
    )

    if (step === STEPS.BUILDING) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading
                    title="Searching for an institution?"
                />
                <InstitutionSelect 
                    onSelectInstitution={(institutionId) => {
                        setInstitution(institutionId)
                    }}
                    selectedInstitutionId={institution}
                />
                <CSSTransition 
                    in={!!institution}
                    timeout={300}
                    classNames={{
                        enter: 'animate-slideIn',
                        enterActive: 'animate-slideIn',
                        exit: 'animate-slideOut',
                        exitActive: 'animate-slideOut',
                    }}
                    unmountOnExit
                >   
                    <div className="flex flex-col gap-6 mt-4">
                        <Heading 
                            title="Looking in a specific building?"
                        />
                        <BuildingInput 
                            title="Building"
                            subtitle="Looking in a specific building?"
                            onChange={(value) => setBuilding(value)}
                            selectedBuildingId={building}
                            institutionId={institution}
                        />
                    </div>
                </CSSTransition>
            </div>
        )
    }

    if (step === STEPS.NOISELEVEL) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Noise level"
                    subtitle="Silent study? Or de facto yap session?"
                />
                <NoiseLevelSearch
                    onChange={(value) => setNoiseLevel(value)}
                    value={noiseLevel}
                />
            </div>
        )
    } 

    if (step === STEPS.FEATURES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Features"
                    subtitle="Select all applicable features"
                />
                <FeaturesInput 
                    onChange={(value) => setFeatures(value)}
                    selectedFeatures={features}
                />
            </div>
        )
    } 
        
    return (
        <Modal 
            progress={progress}
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default SearchModal