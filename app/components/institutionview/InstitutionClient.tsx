'use client'

import { Building, Institution } from '@prisma/client'
import React, { useRef, useState } from 'react'
import BackButton from '../BackButton'
import InstitutionMap from './InstitutionMap'
import Container from '../Container'
import Heading from '../Heading'
import BuildingCard from './BuildingCard'

interface InstitutionClientProps {
    institution: Institution & {
        buildings: Building[];
    }
}

const InstitutionClient = ({
    institution
}: InstitutionClientProps) => {

    const {
        name,
        country,
        city,
        alias,
        type,
        buildings
    } = institution;

    const [highlighted, setHighlighted] = useState<string | null>(null);
    // keeping a dictionary of key value pairs, buildingId: DOMElement
    const buildingRefs = useRef<{ [key: string]: HTMLDivElement | null}>({})

    const handleMarkerClick = (buildingId: string) => {
        setHighlighted(buildingId);

        // .current is a mutable reference, calling it returns a dictionary of all building card elements
        // index by [buildingId] to get the specific DOM element (as key is buildingId)
        const element = buildingRefs.current[buildingId];
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        

    }

  return (
    <div className='
    relative
    flex 
    flex-col
    md:grid
    md:grid-cols-2
    md:mx-0
    gap-x-10
    '>
        <div 
        className="
            z-9
            absolute
            top-6
            left-12">
            <BackButton />
        </div>
        <div className="
            block
            md:hidden
            min-h-[300px]
        ">
            <InstitutionMap
                topView
                buildings={buildings}
                onMarkerClick={handleMarkerClick}/>
        </div>

        <div className="
            mx-auto
            xl:pl-20
            md:pl-10
            sm:px-2
            px-4
            pt-4
        ">
        <div
            className="
            pt-14
            px-8
            flex
            flex-col
            gap-y-5
            xl:pl-16
            xl:px-4
        ">
            <div>
                <div className="text-4xl font-bold">
                    {name}
                </div>
                <div className="text-lg text-neutral-500">
                    {city}, {country}
                </div>
            </div>
            <div className="
                mt-4
                flex
                flex-col
                gap-y-4
                ">
                <Heading
                    title="Places"
                />
                <div 
                className="
                    md:max-h-[376px]
                    overflow-y-scroll
                    pr-2
                    border-black
                ">
                    {buildings.map((building) => (
                        <BuildingCard
                            key={building.id}
                            building={building}
                            highlighted={highlighted === building.id}
                            ref={(el) => {buildingRefs.current[building.id] = el}}
                            // initializing reference dict by assigning DOM element to reference
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
    <div className="
        hidden
        md:!block
        overflow-hidden 
        md:overflow-visible
    ">
        <InstitutionMap
            buildings={buildings}
            onMarkerClick={handleMarkerClick}
            />
    </div>
    </div>
  )
}

export default InstitutionClient