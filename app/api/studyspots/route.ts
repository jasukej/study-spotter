import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { generateAndStoreEmbedding } from "@/lib/generateAndStoreEmbeddings";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const {
            name,
            description,
            imgSrc,
            category,
            location,
            features,
            noiseLevel,
            capacity,
            institutionId,
            building,
            openHours,
            address
        } = body;

        console.log("Request body:", body);

        const studySpot = await prisma.studySpot.create({
            data: {
                name,
                description,
                imgSrc,
                category,
                location,
                features,
                noiseLevel,
                capacity: parseInt(capacity, 10),
                institutionId,
                buildingId: building, // should be buildingId bruh
                openHours,
                address,
                userId: currentUser.id
            }
        })

        await generateAndStoreEmbedding(studySpot.id);

        return NextResponse.json(studySpot);

    } catch (error) {
        console.error("Error creating study spot:", error);
            return NextResponse.error();
    }
}