import React, { useEffect } from 'react'
import Heading from '../Heading'
import axios from 'axios'
import SpotCard from '../studyspots/SpotCard'

interface SpotRecommendationsProps {
  spotId: string
}

const SpotRecommendations = async({
  spotId,
}: SpotRecommendationsProps) => {
  const recommendations = await axios.get(`/api/recommendations/${spotId}`)

  return (
    <div>
        <Heading 
            title="Like studying here?"
            subtitle="Check out some similar spaces"
        />
        {recommendations ? (
        <div 
        className="
          flex 
          flex-row 
          gap-x-4
          overflow-x-scroll
        ">
          {recommendations.map((spot, index) => {
            <SpotCard 
              key={index}
              data={spot}
            />
          })}
        </div>
        ) : (
          <div>
            Whoops! No recommendations found.
          </div>
        )}
    </div>
  )
}

export default SpotRecommendations