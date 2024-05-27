import React, { useEffect, useState } from 'react'

interface NameInputProps {
    title: string;
    subtitle: string;
    value: string;
    onChange: (value: string) => void;
}

const NameInput = ({
    title, 
    subtitle, 
    value, 
    onChange}: NameInputProps) => {
  return (
    <div className="
        flex
        justify-between

    ">
    <div>
        <div className="text-xl text-semibold">
            {title}
        </div>
        <div className="text-neutral-400"> 
            {subtitle}
        </div>
    </div>
    <input 
        type="text"
        value={value || ''}
        placeholder="e.g. Macmillan Biodel Atrium"
        onChange={(e) => onChange(e.target.value)}
        className="
            h-[40px]
            border
            focus: border-neutral-400
            rounded-md
            p-2
            min-w-[300px]
        "
    ></input>
    </div>
  )
}

export default NameInput