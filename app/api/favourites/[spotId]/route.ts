import { NextResponse } from 'next/server';
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
    { params }: { params: { spotId: string }}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { spotId } = params;

    if (!spotId || typeof spotId !== "string") {
        throw new Error('Invalid ID');
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])]

    favouriteIds.push(spotId)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    })

    console.log(user.favouriteIds);
    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: { spotId: string } }
) {
    const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

    const { spotId } = params;

        if (!spotId || typeof spotId !== 'string') {
            throw new Error('Invalid ID');
        }

    let favouriteIds = [...(currentUser.favouriteIds || [])]
    favouriteIds = favouriteIds.filter((id) => id !== spotId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        }, 
        data: {
            favouriteIds
        }
    })

    console.log(user.favouriteIds);
    return NextResponse.json(user);

}