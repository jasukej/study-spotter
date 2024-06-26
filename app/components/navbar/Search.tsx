'use client'

import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useSearchModal from '@/app/hooks/useSearchModal';

const Search = () => {
    const searchModal = useSearchModal();
  return (
    <div
        onClick={() => {
            searchModal.onOpen()
        }}
        className="
            border-[1px]
            md:max-w-[600px]
            sm:max-w-[300px]
            max-w-[250px]
            w-full
            md:w-auto
            py-1
            rounded-full
            shadow-md
            hover:shadow-md
            transition
            cursor-pointer
            bg-white
            text-black
            text-semibold
        "
    >
        <div
        className="
            flex
            flex-row
            items-center
            justify-between
        ">
            <div
            className="
                text-sm
                font-semibold
                px-6
                w-full
            ">
                Where <span className="inline-block md:hidden">to study?</span>
            </div>
            <div
            className="
                hidden 
                md:block
                text-sm
                font-semibold
                px-4
                md:px-6
                border-x-[1px]
                flex-1
                text-center
            ">
                Noise
            </div>
            <div
            className="
                hidden 
                md:block
                text-sm
                font-semibold
                px-4
                md:px-6
                border-r-[1px]
                flex-1
                text-center
            ">
                Features
            </div>
            <div
            className="
                text-sm
                font-semibold
                pl-6
                pr-2
                px-4
                md:px-6
                flex
                flex-row
                items-center
                gap-3
            ">
                <div 
                    className="
                    hidden
                    md:block
                    pr-3
                    ">
                        Hours
                </div>
                <div
                    className="
                    p-2
                    rounded-full
                    text-black
                    hover:bg-orange-1
                    "
                >
                    <SearchIcon />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search