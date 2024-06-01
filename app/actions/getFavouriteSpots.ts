import prisma from "@/app/libs/prismadb";

import getCurrentUser from './getCurrentUser';

export default async function getFavouriteSpots() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favourites = await prisma.studySpot.findMany({
            where: {
                id: {
                    in: currentUser.favouriteIds || []
                }
            }
        })

        return favourites;
    } catch (error:any) {
        throw new Error(error)
    }
}