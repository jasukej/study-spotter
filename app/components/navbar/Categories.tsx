import React from 'react'
import { IoLibrary } from "react-icons/io5";
import { FaHouseUser } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdCafe } from "react-icons/io";
import { PiParkFill } from "react-icons/pi";
import CategoryBox from '../CategoryBox';
import Container from '../Container';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        label: 'Library',
        icon: IoLibrary,
        description: 'This study spot is in a library.'
    },
    {
        label: 'Commons',
        icon: FaHouseUser,
        description: 'This study spot is in a student commons or public area.'

    },
    {
        label: 'Private',
        icon: RiGitRepositoryPrivateFill,
        description: 'This study spot is a bookable private room.'
    },
    {
        label: 'Classroom',
        icon: FaChalkboardTeacher,
        description: 'This study spot is in a classroom.'

    },
    {
        label: 'Cafe',
        icon: IoMdCafe,
        description: 'This study spot is in a cafe.'
    }, 
    {
        label: 'Outdoors',
        icon: PiParkFill,
        description: 'This study spot is outdoors.'
    }
] 

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

  return (
    <Container color="white">
        <div 
        className="
        flex
        pt-4
        flex-row
        gap-4
        bg-white
        justify-center
        overflow-x-auto
        ">
            {categories.map((item) => {
                return <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={params?.get('category') === item.label}
                        icon={item.icon}
                        />
            })}
        </div>
    </Container>
  )
}

export default Categories