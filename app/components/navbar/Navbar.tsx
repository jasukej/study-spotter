'use client'

import { User } from '@prisma/client'
import Container from '../Container'
import React from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'

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
      <Categories />
    </div>
  )
}

export default Navbar