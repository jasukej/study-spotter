import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string }}
) {
    const buildingId = params.id

    const buildingData = await prisma.building.findUnique({
        where: {
            id: buildingId as string
        }
    }) 

    if (!buildingData) {
        return NextResponse.json({
            error: 'Building not found'
        }, { status: 404 })
    }

    return NextResponse.json(buildingData);


}