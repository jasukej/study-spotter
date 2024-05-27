import prisma from '@/app/libs/prismadb'

export default async function getStudySpots() {
    try {
        const spots = await prisma.studySpot.findMany({
            where: {
                
            },
            orderBy: {
                name: 'asc'
            }
        });

        return spots;
    } catch (error: any) {
        throw new Error(error);
    }
}