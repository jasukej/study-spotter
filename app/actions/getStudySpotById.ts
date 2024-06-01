import prisma from "@/app/libs/prismadb"

interface IParams {
    spotId?: string;
}

export default async function getStudySpotById(
    params:IParams
) {
    try {
        const { spotId } = params;
        const studySpot = await prisma.studySpot.findUnique({
            where: {
                id: spotId
            },
        })

        if (!studySpot) {
            return null;
        }

        return studySpot
    } catch (error: any) {
        throw new Error(error);
    }
}