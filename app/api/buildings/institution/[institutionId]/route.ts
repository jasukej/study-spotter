import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { institutionId: string } }
) {
    const { institutionId } = params;

    const institutionBuildings = await prisma.building.findMany({
        where: {
            institutionId: institutionId,
        },
    });

    return NextResponse.json(institutionBuildings);
}
