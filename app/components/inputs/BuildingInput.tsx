import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Building {
  id: string;
  name: string;
  alias: string;
}

interface BuildingInputProps {
  title: string;
  subtitle: string;
  onChange: (value: string | null) => void;
  selectedBuildingId: string | null;
  institutionId?: string | null;
}

const BuildingInput: React.FC<BuildingInputProps> = ({ 
  title, 
  subtitle, 
  onChange, 
  selectedBuildingId,
  institutionId
}) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CHECK IF INSTITUTION IS NULL
    if(!institutionId) {
      setBuildings([]);
      setLoading(false);
      return;
    }

    const fetchBuildings = async () => {
      try {
        const response = await axios.get(`/api/buildings/institution/${institutionId}`);
        setBuildings(response.data);
      } catch (error) {
        console.error('Error fetching buildings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, [institutionId]);

  return (
    <div className="
        sm:flex 
        sm:justify-between 
        sm:align-items
    ">
      <div>
        <div className="
            text-xl 
            text-semibold
        ">
            {title}
        </div>
      </div>
      {loading ? (
        <div className="min-w-[200px] mt-2 text-neutral-400">Loading buildings...</div>
      ) : (
        <select 
            onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)} 
            value={selectedBuildingId || ''}
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
            <option 
            value=""
            className="text-neutral-500"
            >
                Select a building
            </option>
            {buildings.length == 0 
            ? (
            <option disabled>
                No buildings found
            </option>
            ) : (
            buildings.map((building) => (
            <option key={building.id} value={building.id}>
                {building.name.length <= 30 ? building.name : building.alias}
            </option>
            )))
            }
        </select>
      )}
    </div>
  );
};

export default BuildingInput;
