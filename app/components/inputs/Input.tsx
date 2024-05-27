'use client'

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors
}:InputProps) => {
  return (
    <div className="relative w-full">
        <input
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type}
            className={`
              peer
              w-full
              p-4
              pt-6
              font-light
              bg-white
              text-black
              border-2
              rounded-md
              outline-none
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              ${errors[id] ? 'border-red-500' : 'border-neutral-300'}
              ${errors[id] ? 'focus:border-orange-main' : 'focus:border-black'}
            `}
        />
        <label
          className="
            absolute
            text-md
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            left-4
            text-neutral-400
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
          ">
          {label}
        </label>
    </div>
  )
}

export default Input