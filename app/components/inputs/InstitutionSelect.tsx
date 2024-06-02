import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FaCircleInfo } from "react-icons/fa6";

interface Institution {
    id: string;
    name: string;
}

interface InsitutionSelectProps {
    onSelectInstitution: (institutionId: string | null) => void;

    selectedInstitutionId?: string | null;
}

const InstitutionSelect = ({
    onSelectInstitution,
    selectedInstitutionId
}:InsitutionSelectProps) => {

    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/institutions')
                setInstitutions(response.data);
            } catch (error) {
                console.error('Error fetching institutions.')
            } finally {
                setLoading(false);
            }
        }

        fetchInstitutions();
     }, [])

  return (
    <div className="
        sm:flex
        sm:justify-between
        sm:align-items
    ">
        <div className="flex flex-row items-center gap-2">
            <div className="text-xl text-semibold">
                Institution
            </div>
            <HoverCard>
                <HoverCardTrigger>
                    <div className="
                        hover:text-neutral-700
                    ">
                        <FaCircleInfo size={18}/>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-neutral-100 bg-gray-800">
                Select <span className="font-bold">'none'</span> if your spot does not belong to an institution
                </HoverCardContent>
            </HoverCard>
        </div>
        {loading ? (
            <div className="
                min-w-[200px]
                mt-2
                text-neutral-400
                italic
            ">
                Loading institutions...
            </div>
        ) : (
            <select
                onChange={(e) => onSelectInstitution(e.target.value === '' ? null : e.target.value)}
                value={selectedInstitutionId || ''}
                className="
                    border
                    border-neutral-200
                    rounded-md
                    min-w-[260px]
                    sm:min-w-[200px]
                    sm:overflow-x-hidden
                    min-h-[40px]
                    mt-2
                    sm:mt-0
                "
            >
                <option value = "" className="text-nautral-500">No Institution</option>
                {institutions.map((institution: Institution) => (
                    <option key={institution.id} value={institution.id}>
                        {institution.name}
                    </option>
                ))}
            </select>
        )}
    </div>
  )
}

export default InstitutionSelect