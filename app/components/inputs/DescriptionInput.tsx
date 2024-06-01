import React, { useEffect, useState } from 'react'

interface DescriptionInputProps {
    title?: string;
    subtitle?: string;
    value: string;
    onChange: (value: string) => void;
}

const DescriptionInput = ({
    title, 
    subtitle, 
    value, 
    onChange}: DescriptionInputProps) => {
        const [isFocused, setIsFocused] = useState(false);
  return (

    <div className='flex flex-col gap-3'>
    <div>
        <div className="text-xl text-semibold">
            {title}
        </div>
    </div>
    <div className="relative">
    <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={4}
        className="
            flex 
            w-full
            border
            border-neutral-400
            focus:border-black
            rounded-md
            p-2
            overflow-y-auto
            resize-none
            max-h-[6em] 
        "
        style={{ lineHeight: '1.5em' }}  
    />
        <label
            className={`
                absolute
                left-2
                top-2
                text-neutral-400
                transition-all
                duration-300
                pointer-events-none
                ${isFocused || value ? 
                    'transform -translate-y-6 -translate-x-7 scale-75 bg-white p-1' : ''}
            `}>
                {subtitle}
        </label>
    </div>
    </div>
  )
}

export default DescriptionInput