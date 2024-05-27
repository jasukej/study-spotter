import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}:ButtonProps) => {
  return (
    <button 
        onClick={onClick}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            py-2
            w-full
            ${outline ? 'bg-white' : 'bg-orange-main'}
            ${outline ? 'border-black' : 'border-orange-main'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'py-1' : 'text-md'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `}>
            {Icon && (
                <div 
                className="
                        absolute
                        left-4
                        top-2
                    ">
                <Icon
                    size={24}
                />
                </div>
            )}
            {label}
    </button>
  )
}

export default Button