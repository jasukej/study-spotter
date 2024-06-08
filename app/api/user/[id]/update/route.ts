import { NextResponse } from "next/server";


export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = params.id;
        const { image, institutionId } = await request.json();

        const updateData: { image?:string, institutionId?:string } = {};
        if (image) {
            updateData.image = image;
        }
        if (institutionId) {
            updateData.institutionId = institutionId;
        }

        const updatedUser = await prisma?.user.update({
            where: {
                id: userId,
            },
            data: updateData,
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        return NextResponse.error();
    }
}