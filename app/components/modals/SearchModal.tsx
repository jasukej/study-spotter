'use client'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import Modal from './Modal';

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
        
    return (
        <div>
            
        </div>
    )
}

export default SearchModal