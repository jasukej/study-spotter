import prisma from "@/app/libs/prismadb"

export default async function getBuildingById(
    buildingId: string 
) {
    try {
        const building = await prisma.building.findUnique({
            where: {
                id: buildingId
            },
            include: {
                studySpot: true,
                institution: true
            }
        })

        if (!building) {
            return null;
        }

        return building;

    } catch (error:any) {
        throw new Error(error);
    }
}