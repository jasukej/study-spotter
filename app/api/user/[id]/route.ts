import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string }}
) {
    const userId = params.id

    const userData = await prisma.user.findUnique({
        where: {
            id: userId as string
        }
    }) 

    if (!userId) {
        return NextResponse.json({
            error: 'User not found'
        }, { status: 404 })
    }

    return NextResponse.json(userData);


}