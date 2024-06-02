import prisma from '@/app/libs/prismadb'

export default async function getReviewsByUserId(userId: string)  {
    try {
        const myReviews = prisma.review.findMany({
            where: {
                userId: userId
            },
        })

        return myReviews;
    } catch (error: any) {
        throw new Error(error);
    }
}