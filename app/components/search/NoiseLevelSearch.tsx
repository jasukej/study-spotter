'use client';

import React, { useCallback, useEffect, useState } from "react";
import { noiseLevels } from "@/app/libs/noiseData";
import { Slider } from "@mantine/core";
import Button from "../Button";
import { RxCross2 } from "react-icons/rx";

interface NoiseLevelSearchProps {
  onChange: (value: number | undefined) => void;
  value: number | undefined;
}

const NoiseLevelSearch = ({
  value,
  onChange
}: NoiseLevelSearchProps) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (value !== undefined) {
        const selectedNoiseLevel = noiseLevels.find(
        (noiseLevel) => noiseLevel.level === value
        );
        if (selectedNoiseLevel) {
            setDescription(selectedNoiseLevel.description);
        } 
    } else {
        setDescription("Noise level filter not applied.");
    }
  }, [value]);

  return (
    <div
      className="
        flex
        flex-col
        w-full
        gap-2
        px-6
    "
    >
        <div className="
        flex 
        flex-row
        justify-between
        items-center
        ">
        <Slider 
            className="w-[90%]"
            value={value != undefined ? value : undefined}
            onChange={onChange}
            color={value === undefined ? "grey" : "yellow"}
            min={1}
            max={5}
            step={1}
            marks={[
                { value: 1, label: 'Quiet' },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5, label: 'Very Loud' },
              ]}
        />
        <button 
            onClick={() => onChange(undefined)}
            className="
            hover:opacity-[70%]
            rounded-full 
            max-w-[5%]
            aspect-square
            p-1
            flex 
            justify-center
            items-center">
            <RxCross2 
                color="black"
                size={16}/>
        </button>
        </div>
            {description && (
                <div className={
                        `mt-6 
                        ${value !== undefined ? "bg-orange-main" : "bg-gray-600"}
                        text-sm 
                        font-semibold
                        text-yellow-light
                        p-2 
                        rounded-lg`}>
                    {description}
                </div>
            )}
            
    </div>
  );
};

export default NoiseLevelSearch;