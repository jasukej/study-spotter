import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function GET() {

    const institutions = await prisma.institution.findMany();

    return NextResponse.json(institutions);
}