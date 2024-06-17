'use client'

import { User } from '@prisma/client'
import Container from '../Container'
import React from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import InstitutionButton from '../InstitutionButton'

interface NavbarProps {
  currentUser?: User | null
}

const Navbar = ({ currentUser }:NavbarProps) => {

  return (
    <div className="fixed w-full bg-orange-main z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container color="orange-main">
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            ">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <div 
        className='
          flex 
          w-full 
          bg-white 
          justify-center
          gap-x-6
          items-center
          sm:pr-6
          md:pr-14
        '>
        <Categories />
        {currentUser &&
        <div className='hidden sm:block'>
          <InstitutionButton 
            institutionId='66559c06ff51564b55a92d7d'
            // !!! should be currentUser.institutionId
          />
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar