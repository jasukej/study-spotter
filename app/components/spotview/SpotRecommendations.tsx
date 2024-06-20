'use client'
import React, { useEffect, useState } from 'react'
import Heading from '../Heading'
import axios from 'axios'
import SpotCard from '../studyspots/SpotCard'
import { Skeleton } from '@mantine/core'

interface SpotRecommendationsProps {
  spotId: string
}

// Reminder to not use async functions directly as components
// literally what useEffect is for 
const SpotRecommendations = ({
  spotId,
}: SpotRecommendationsProps) => {

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/api/recommendations/${spotId}`)
        setRecommendations(response.data);
      } catch (error) {
        setError('Whoops! No recommendations found.')
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [spotId])

  if (loading) {
    return <Skeleton className="w-full h-full"/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="
      py-4
    ">
        <Heading 
            title="Like studying here?"
            subtitle="Check out some similar spaces"
        />
        {recommendations ? (
          <div className="relative">
          <div className="
            absolute
            right-0
            w-[20%]
            opacity-80
            bg-gradient-r
            from-transparent
            to-white
            "></div>
          <div 
            className="
              flex
              flex-row
              overflow-x-scroll
              gap-x-4
              gap-y-4
              py-4
              px-2
            ">
            {recommendations.map((spot, index) => (
              <div
                key={index}
                className="
                  min-w-[18rem]
                "
              >
                <SpotCard 
                  data={spot}
                />
              </div>
            ))}
          </div>
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