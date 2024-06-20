'use client'
import { User } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import useFavourite from '../hooks/useFavourite';

interface BookmarkButtonProps {
    spotId: string;
    currentUser: User | null;
    large: boolean;
}  

const BookmarkButton = ({ 
    spotId, 
    currentUser,
    large
}:BookmarkButtonProps) => {
  
    const { hasFavourited, toggleFavourite } = useFavourite({
        spotId,
        currentUser
    }); 

    return (
        <div
            onClick={toggleFavourite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <div className="
                absolute
                top-[2px]
                right-[2px]
                z-10
            ">
                <IoBookmarkOutline
                    size={large? 33 : 28}
                    color="white"
                />
            </div> 
            <div className="
                absolute
                top-[3.5px]
                right-[3.9px]
            ">  
                <IoBookmark
                    size={large ? 30 : 24}
                    // @ts-ignore
                    style={{ color: hasFavourited ? "orange" : "878c94" }}
                />
            </div>
        </div>
    )
}

export default BookmarkButton