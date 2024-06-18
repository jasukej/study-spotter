'use client'

import React, { useEffect, useMemo, useState } from 'react'
import SpotCard from './studyspots/SpotCard'
import getStudySpots, { ISpotsParams } from "../actions/getStudySpots";
import getCurrentUser from '../actions/getCurrentUser';
import NoSpotsView from './NoSpotsView';
import axios from 'axios';
import { useMediaQuery } from '@mantine/hooks';
import { Pagination } from '@mantine/core';

interface HomeClientProps {
    currentUser: any;
    allSpots: any[];
    totalSpots: number;
    searchParams: ISpotsParams;
}

/**
 * Chunks and renders each page's spot cards in a grid. 
 * 
 * @param currentUser 
 * @param allSpots
 * @param totalSpots
 * @param searchParams
 * @returns SpotCard components in a grid layout
 */
const HomeClient = ({ 
  currentUser,
  allSpots,
  totalSpots,
  searchParams,
 }:HomeClientProps) => {
    const [spots, setSpots] = useState(allSpots);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);

    const isSmallScreen = useMediaQuery('(max-width: 640px)')
    const isMediumScreen = useMediaQuery('(min-width: 641px) and (max-width:768px)')
    const isLargeScreen = useMediaQuery('(min-width: 769px) and (max-width:1024px)')
    const isXLargeScreen = useMediaQuery('(max-width:1025px)')

    const limit = useMemo(() => {
      switch (true) {
        case isSmallScreen:
          return 10;
        case isMediumScreen:
          return 9;
        case isLargeScreen:
          return 12;
        case isXLargeScreen:
          return 15;
        default: return 10
      }
    }, [isSmallScreen, isMediumScreen, isLargeScreen, isXLargeScreen]);

    useEffect(() => {
      const fetchSpots = async () => {
        setLoading(true);
        try {
          const response = await axios.get('/api/study-spots', {
            params: { ...searchParams, page: activePage, limit}
          });
          setSpots(response.data);
        } catch (error) {
          console.error('Error fetching study spots.')
        } finally {
          setLoading(false);
        }
      }

      if (activePage !== 1) {
        fetchSpots();
      } else {
        setSpots(allSpots);
      }
    }, [activePage, searchParams, allSpots, limit]);
    
    if (spots.length == 0 && !loading) {
        return (
          <NoSpotsView />
        )
    }

  return (
    <div className="
      flex
      flex-col
      justify-start
      gap-y-10
      items-center
      min-h-[73vh]
    ">
    <div
      className="
        pt-24
        mt-2
        px-2
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-8
        mx-2
      ">
          {spots.map((spot:any) => {
            return (
              <SpotCard
                currentUser={currentUser}
                key={spot.id}
                data={spot}
              />
            )
          })}
      </div>
      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={Math.ceil(totalSpots / limit)}
        color="#F79F08"
      />
    </div>
  )
}

export default HomeClient