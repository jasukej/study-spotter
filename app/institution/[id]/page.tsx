import getInstitutionById from '@/app/actions/getInstitutionById'
import BackButton from '@/app/components/BackButton';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import NoSpotsView from '@/app/components/NoSpotsView';
import BuildingCard from '@/app/components/institutionview/BuildingCard';
import InstitutionClient from '@/app/components/institutionview/InstitutionClient';
import InstitutionMap from '@/app/components/institutionview/InstitutionMap';
import React, { useState } from 'react'

interface InstitutionPageProps {
    id: string
}

const InstitutionPage = async({ params }: { params: InstitutionPageProps }) => {
    
    const institution = await getInstitutionById(params.id);
    console.log(institution)

    if(!institution) {
        return <NoSpotsView />
    }

  return (
    <div className="relative">
      
    <InstitutionClient
        institution={institution}
    />
    </div>
  )
}

export default InstitutionPage