import prisma from '@/app/libs/prismadb';

export default async function getReviewsBySpotId(spotId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                studySpotId: spotId
            },
            include: {
                user: true
            }
        })

        return reviews;

    } catch (error: any) {
        throw new Error(error);
    }
} 