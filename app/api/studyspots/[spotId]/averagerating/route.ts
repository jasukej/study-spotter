import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request, 
    { params }: { params: {spotId: string} }
) {
    const spotId = params.spotId

    const reviews = await prisma.review.findMany({
        where: {
            studySpotId: spotId
        }
    })

    const total = reviews.reduce((sum, review) => 
        sum + review.rating, 0
    )

    const averageRating = (total/reviews.length).toFixed(2)

    console.log(averageRating)

    return NextResponse.json(averageRating);
}
