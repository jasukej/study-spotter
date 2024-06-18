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
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu = ({ currentUser }:UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [spinDirection, setSpinDirection] = useState<'forward' | 'backward'>('forward');
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setSpinDirection(isOpen ? 'backward' : 'forward')
        setIsOpen((prev) => !prev)
    }, [isOpen]);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const addSpotModal = useAddSpotModal();

    const onAdd = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
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
                hover:bg-amber-600
                duration-30
                rounded-full
                py-2
                px-2
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
                <SettingsIcon 
                    className={`
                        text-black 
                        hidden 
                        md:block 
                        ${spinDirection === 'forward' ? 
                                            "animate-spin-forward" : 
                                            "animate-spin-backward"}`}/>
                <div className="">
                    <Avatar 
                        src={currentUser?.image}
                        height={30}
                        width={30}
                    />
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
                    z-999
                    text-sm
                "
            >
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={() => {router.push('/profile')}}
                                label="My Profile"
                            />
                            <MenuItem 
                                onClick={() => {router.push('/favourites')}}
                                label="My Favourites"
                            />
                            <MenuItem 
                                onClick={() => {router.push('/reviews')}}
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