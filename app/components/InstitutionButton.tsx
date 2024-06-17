import React, { useCallback } from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import { FaMapMarkedAlt } from "react-icons/fa";
import Button from './Button';
import { usePathname, useRouter } from 'next/navigation';
import useUpdateInstitutionModal from '../hooks/useUpdateInstitutionModal';
import UpdateInstitutionModal from './modals/UpdateInstitutionModal';

interface InstitutionButtonProps {
    institutionId?: string | null
}

const InstitutionButton = ({ institutionId }:InstitutionButtonProps) => {
    
    const router = useRouter();
    const updateInstitutionModal = useUpdateInstitutionModal();
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    
    const onClick = useCallback(() => {
        if(!institutionId) {
            return updateInstitutionModal.onOpen();
        }

        router.push(`/institution/${institutionId}`)
    }, [institutionId, updateInstitutionModal, router])
    
    if (!isMainPage) {
        return null;
    }
    
  return (
    <div>
        <button 
            className="
                border-[2px]
                rounded-lg
                border-black
                bg-yellow-light
                px-2
                py-2
                text-gray-900
                text-sm
                flex
                flex-row
                items-center
                font-semibold
                gap-x-4
                group
                hover:bg-black
                hover:text-white
                transition
                duration-200
            "
            onClick={onClick}
            >
            <FaMapMarkedAlt
            //@ts-ignore
            className="
                text-gray-900 
                group-hover:text-yellow-light
                transition
                duration-200
            "
            size={26}/>
            <span 
            className="
                hidden 
                md:block
                group-hover:text-yellow-light
                gtoup-hover:text-black
            ">Explore campus</span>
        </button>
    </div>
  )
}

export default InstitutionButton