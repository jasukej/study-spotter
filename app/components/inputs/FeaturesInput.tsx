import React, { useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { FaChalkboard, FaRegLightbulb, FaWheelchair, FaWifi } from 'react-icons/fa';
import { FaPlug } from 'react-icons/fa6';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiProjector2Fill } from 'react-icons/ri';
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

export const features = [
    {
        label: "Lots of working plugs",
        icon: FaPlug
    },
    {
        label: "Good lighting",
        icon: FaRegLightbulb
    },
    {
        label: "Comfortable seating",
        icon: MdAirlineSeatReclineNormal
    },
    {
        label: "Projector available",
        icon: RiProjector2Fill
    },
    {
        label: "Whiteboard available",
        icon: FaChalkboard
    },
    {
        label: "High-speed WiFi",
        icon: FaWifi
    },
    {
        label: "Wheelchair accessible",
        icon: FaWheelchair
    },
    {
        label: "Printer available",
        icon: AiFillPrinter
    },
];

interface Feature {
  label: string;
  icon: React.ComponentType;
}

interface FeaturesInputProps {
  selectedFeatures: string[];
  onChange: (features: string[]) => void;
}

const FeaturesInput: React.FC<FeaturesInputProps> = ({ selectedFeatures, onChange }) => {
  const handleFeatureToggle = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    onChange(newFeatures);
  };

  return (
    <div className="max-h-[50vh] overflow-y-auto">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isSelected = selectedFeatures.includes(feature.label);
        return (
            <div 
                key={index} 
                className="
                    flex 
                    items-center 
                    justify-between
                    gap-2 
                    p-2 
                    border-b"
            >
                <div className="flex flex-row gap-2">
                    <Icon size={24} />
                    <span>{feature.label}</span>
                </div>
                <button 
                  onClick={() => handleFeatureToggle(feature.label)}>
                    <div>
                      {isSelected ? <FaCircleCheck size={24}/> : <RxCrossCircled size={24}/>}
                    </div>
                </button>
            </div>
        );
      })}
    </div>
  );
};

export default FeaturesInput;
