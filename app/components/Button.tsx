import React from 'react';
import { IconType } from 'react-icons';
import { FaPlus } from 'react-icons/fa';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    addCircle?: boolean;
}

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    addCircle
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                md:rounded-lg
                hover:opacity-80
                transition
                flex
                justify-center
                items-center
                md:py-2
                md:w-full
                ${addCircle ? `w-[50px]
                h-[50px] rounded-full` : `w-full py-2 rounded-lg`}
                ${outline ? 'bg-white' : 'bg-orange-main'}
                ${outline ? 'border-black' : 'border-orange-main'}
                ${outline ? 'text-black' : 'text-white'}
                ${small ? 'py-1' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}
        >
            {Icon && (
                <div className="
                    absolute 
                    w-[30px]
                    h-[30px]
                    ">
                    <Icon size={24} />
                </div>
            )}
            <span className={addCircle ? `md:hidden block` : `hidden`}>
                <FaPlus size={24} />
            </span>
            <span className={addCircle ? `hidden md:block` : ``}>
                {label}
            </span>
        </button>
    );
};

export default Button;
