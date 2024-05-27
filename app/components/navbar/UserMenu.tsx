'use client'

import React, { useCallback, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useAddSpotModal from '@/app/hooks/useAddSpotModel';

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu = ({ currentUser }:UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, []);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const addSpotModal = useAddSpotModal();

    const onAdd = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen;
        }

        addSpotModal.onOpen()
    }, [currentUser, loginModal, addSpotModal])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-4">
            <div
                onClick={onAdd}
                className="
                hidden
                lg:block
                font-semibold
                text-sm
                hover:bg-neutral-300
                transition 
                cursor-pointer
                text-yellow-light
                "
            >
                Add a Spot
            </div>
            <div
                onClick={toggleOpen}
                className="
                py-2
                px-2
                md:px-2
                flex
                flex-row
                coursor-pointer
                hover:shadow-md
                transition
                items-center
                gap-3
                border 
                border-black
                rounded-full
                bg-white
                "
            >   
                <SettingsIcon className="text-black hidden md:block" />
                <div className="">
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>

        {isOpen && (
            <div
                className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[25vw]
                    md:w-[20vw]
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    mt-1
                    text-sm
                "
            >
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={() => {}}
                                label="My Profile"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="My Favourites"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="My Reviews"
                            />
                            <MenuItem 
                                onClick={addSpotModal.onOpen}
                                label="Add a study spot"
                            />
                            <hr/>
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Log out"
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem 
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="Sign Up"
                            />
                        </>
                    )}
                </div>
            </div>
        )}

    </div>
  )
}

export default UserMenu