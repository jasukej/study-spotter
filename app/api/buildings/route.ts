import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const buildings = await prisma.building.findMany();

    return NextResponse.json(buildings)
}

