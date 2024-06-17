import Image from "next/image";
import Container from "./components/Container";
import NoSpotsView from "./components/NoSpotsView";
import getStudySpots from "./actions/getStudySpots";
import SpotCard from "./components/studyspots/SpotCard";
import getCurrentUser from "./actions/getCurrentUser";
import { ISpotsParams } from "./actions/getStudySpots";
import { Suspense, useState } from 'react';
import { Pagination } from '@mantine/core';
import HomeClient from "./components/HomeClient";

interface HomeProps {
  searchParams: ISpotsParams;
}

/**
 * This component renders a one-page view of study spots. It 
 * passes in the total number and data of filtered spots to the client
 * component, which chunks and paginates this data. 
 * @param searchParams user's search filters
 * @returns {ReactNode} A one-page render of study spots
 */
export default async function Home({ searchParams }:HomeProps) {
  const {data: spots, total: totalSpots} = await getStudySpots({ ...searchParams, page: 1, limit: 10 });
  const currentUser = await getCurrentUser() || undefined;

  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeClient 
          totalSpots={totalSpots}
          allSpots={spots}
          currentUser={currentUser}
          searchParams={searchParams}
        />
      </Suspense>
    </Container>
    
  );
}
