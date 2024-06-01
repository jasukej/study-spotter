import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(
    request: Request,
    { params }: { params: { spotId: string }}
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const { spotId } = params;

        const body = await request.json();

        const {
            rating,
            accessibility,
            availability,
            comfort,
            wifi,
            plugs,
            atmosphere,
            content,
        } = body

        console.log("Request body:", body);

        const review = await prisma.review.create({
            data: {
                rating,
                accessibility,
                availability,
                comfort,
                wifi,
                plugs,
                atmosphere,
                content,
                studySpotId: spotId, 
                userId: currentUser.id,
            }
        })

        return NextResponse.json(review);

    } catch (error) {
        return NextResponse.error();
    }
}