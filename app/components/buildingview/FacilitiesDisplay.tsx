import React from 'react'
import Heading from '../Heading'
import { facilities } from '@/app/libs/facilitiesData'

interface FacilitiesDisplayProps {
  facilitiesData: string[]
}

const FacilitiesDisplay = ({ facilitiesData }:FacilitiesDisplayProps) => {

    console.log(facilitiesData)
  return (
    <div className="flex flex-col gap-y-2">
      <Heading 
        title="Facilities"
        subtitle="This building offers the following"
      />
      <div className="
        flex
        flex-col
      ">
        {facilitiesData.map((facility, index) => {
          const facilityDetail = facilities.find(({ label }) => label === facility);

          if (!facilityDetail) return null;

          const { icon: Icon } = facilityDetail;

          return (
            <div 
              key={index}
              className="
              border-black
              p-2
              flex
              flex-row
              gap-x-2
              text-sm
            ">
              {<Icon
                size={20}
              />}
              <div>
                {facility}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FacilitiesDisplay