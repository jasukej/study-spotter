import React from 'react';

interface CapacityInputProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const CapacityInput = ({ 
    title, 
    subtitle, 
    value, 
    onChange }:CapacityInputProps) => {
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
                md:mt-4
            ">{title}</div>
            <div className="
                text-neutral-400
                md:hidden
            ">
                {subtitle}
            </div>
        </div>
        <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            placeholder="0"
            className="
                mt-2 
                p-2 
                border 
                focus:border-black
                focus:outline-nonw
                focus:ring-shadow-none
                focus:ring-0
                rounded 
                min-w-[200px]
                sm:max-w-[200px]
                sm:overflow-x-hidden
                min-h-[40px]
                sm:mt-0
            "
        />
    </div>
  );
};

export default CapacityInput;
