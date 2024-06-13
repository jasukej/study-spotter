import getBuildingById from '@/app/actions/getBuildingById'
import { JsonObject } from '@prisma/client/runtime/library'
import React from 'react'
import NoSpotsView from '@/app/components/NoSpotsView'
import Container from '@/app/components/Container'
import { FaLocationPin } from 'react-icons/fa6'
import { MdOutlineSchool } from "react-icons/md";
import getInstitutionById from '@/app/actions/getInstitutionById'
import SpotCard from '@/app/components/studyspots/SpotCard'
import Heading from '@/app/components/Heading'
import FacilitiesDisplay from '@/app/components/buildingview/FacilitiesDisplay'
import OpenHoursDisplay from '@/app/components/spotview/OpenHoursDisplay'
import BackButton from '@/app/components/BackButton'
import LocationDisplay from '@/app/components/spotview/LocationDisplay'
import { Location } from '@/app/components/search/LocationSearch'
import Link from 'next/link'
import BuildingMap from '@/app/components/buildingview/BuildingMap'
import { Diversity2Sharp } from '@mui/icons-material'
import { DivIcon } from 'leaflet'

interface BuildingProps {
    name: string,
    alias: string,
    description: string,
    address: string,
    location: Location,
    openHours: JsonObject,
    facilities: string,
    institutionId: string,
}

interface BuildingPageParams {
    buildingId: string
}

const BuildingPage = async ({ params }:{ params: BuildingPageParams }) => {
    
    const building = await getBuildingById(params.buildingId);

    console.log(building)

  if (!building) {
    return <NoSpotsView />
  }

  const {
    name,
    alias,
    description,
    address,
    location,
    openHours,
    facilities,
    institutionId,
    studySpot
  } = building

  const institution = await getInstitutionById(institutionId);

  const locationData:Location = {
    // @ts-ignore
    lat: location?.latitude,
    // @ts-ignore
    lng: location?.longitude
  }
  
    return (
    <Container>
        <div 
        className="
            absolute
            top-6
            left-12">
            <BackButton />
        </div>
        <div>
            <BuildingMap />
        </div>
        <div
            className="
            pt-14
            px-8
            flex
            flex-col
            gap-y-5
            xl:px-16
        ">
            <div className="
                flex
                flex-col
                gap-y-8
            ">
                <div className="
                    flex
                    flex-col
                    gap-y-4
                ">
                    <div
                    className="
                        text-4xl
                        font-bold
                    "
                    >
                    {name}
                    </div>
                    {institution &&
                    <div className="
                        flex
                        flex-row
                        gap-x-4
                        text-lg
                        items-center
                        text-neutral-500
                    ">
                        <MdOutlineSchool size={24}/>
                        <div
                            className="
                            cursor-pointer
                            hover:text-neutral-900
                            active:text-neutral-500
                            hover:underline
                            inline
                        ">
                        <Link href={`/institution/${institutionId}`}> {institution.name}</Link>
                        </div>
                    </div>
                    }
                </div>
                <OpenHoursDisplay 
                    openHours={openHours}
                />
                <div className="
                    flex
                    flex-col
                    gap-y-4
                ">
                    <Heading 
                        title="Study Spots"
                    />
                    <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-8
                        gap-8
                    ">
                        {studySpot.map((spot:any) => {
                            return (
                            <SpotCard
                                noDetail
                                key={spot.id}
                                data={spot}
                            />
                            )
                        })}
                    </div>
                </div>
                <div>
                    <FacilitiesDisplay facilitiesData={facilities}/>
                </div>
                {location &&
                <div>
                    <LocationDisplay 
                        location={locationData}
                        address={address}
                    />
                </div>}
            </div>
        </div>
    </Container>
  )
}

export default BuildingPage