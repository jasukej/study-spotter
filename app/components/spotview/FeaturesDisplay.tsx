import React from 'react'
import Heading from '../Heading'
import { features } from '@/app/libs/featuresData'

interface FeaturesDisplayProps {
  featuresData: string[]
}

const FeaturesDisplay = ({ featuresData }:FeaturesDisplayProps) => {

  return (
    <div className="flex flex-col gap-y-2">
      <Heading 
        title="Features"
        subtitle="This spot offers the following"
      />
      <div className="
        flex
        flex-col
      ">
        {featuresData.map((feature, index) => {
          const featureDetail = features.find(({ label }) => label === feature);

          if (!featureDetail) return null;

          const { icon: Icon } = featureDetail;

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
                {feature}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeaturesDisplay