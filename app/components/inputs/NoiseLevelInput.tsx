import React, { useEffect, useState } from 'react';

interface NoiseLevelInputProps {
  title: string;
  subtitle: string;
  onChange: (value: number) => void;
  value: number;
}

const noiseLevels = [
    {
        level: 1,
        label: "Quiet",
        description: "This is a designated quiet space."
    },
    {
        level: 2,
        label: "Moderately Quiet",
        description: "This space is normally quiet."
    },
    {
        level: 3, 
        label: "Moderate",
        description: "This space can occassionally be noisy."
    },
    {
        level: 4,
        label: "Moderately Noisy",
        description: "This space can be used for discussions."
    },
    {
        level: 5,
        label: "Constantly Noisy",
        description: "This space has a lot of traffic and noise."
    }
];

const NoiseLevelInput = ({ title, subtitle, onChange, value }:NoiseLevelInputProps) => {
    
    const [description, setDescription] = useState("");

    useEffect(() => {
        const selectedNoiseLevel = noiseLevels.find(noiseLevel => noiseLevel.level === value);
        if (selectedNoiseLevel) {
            setDescription(selectedNoiseLevel.description);
        } else {
            setDescription("");
        }
    }, [value])
  
  return (
    <div className="
        sm:flex 
        sm:justify-between 
        sm:align-items
    ">
        <div>
            <div className="
                text-xl 
                font-semibold
                md:mt-4"
            >
                {title}
            </div>
            <div className="
                text-neutral-400 
                md:hidden"
            >
                {subtitle}
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <select 
                onChange={(e) => {
                    console.log(e.target.value)
                    onChange(parseInt(e.target.value))}}
                value={value}
                className="
                border
                border-neutral-200
                rounded-md
                min-w-[200px]
                max-w-[260px]
                sm:max-w-[200px]
                sm:overflow-x-hidden
                min-h-[40px]
                sm:min-h-[50px]
                mt-2
                sm:mt-0
            "
            >
            {noiseLevels.map((noiseLevel, index) => (
                <option
                    key={`noiseLevel-${index}`}
                    value={noiseLevel.level}
                >
                    {noiseLevel.label}
                </option>
            ))}
            </select>
            {description && (
                <div 
                className="
                    mt-2
                    bg-orange-700
                    text-sm
                    text-yellow-light
                    p-2
                    rounded-lg
                ">
                    {description}
                </div>
            )}
        </div>
    </div>
  );
};

export default NoiseLevelInput;
