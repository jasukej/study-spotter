import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { spotId:string }}
) {
    const { spotId } = params;

    const spot = await prisma?.studySpot.findUnique({
        where: { id: spotId }
    })

    // FIRST CHECK
    if (!spot || !spot.embedding) {
        return NextResponse.json({ error: 'Study spot not found.' }, { status: 404 })
    }

    const spots = await prisma?.studySpot.findMany({
        where: { id: { not: spotId }},
    });

    const similarSpots = spots
        ?.map(s => ({
            ...s,
            similarity: cosineSimilarity(spot.embedding, s.embedding)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5); 
    
    return NextResponse.json(similarSpots);
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}