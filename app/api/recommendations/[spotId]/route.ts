import { generateAndStoreEmbedding } from "@/lib/generateAndStoreEmbeddings";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { getEmbeddingFromCache } from "@/lib/redis";

export async function GET(
    request: Request,
    { params }: { params: { spotId:string }}
) {
    const { spotId } = params;

    try {
        // Extract embedding for THIS SPOT
        await generateAndStoreEmbedding(spotId);
        
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

        // A check to generate embeddings of spots with no embeddings 
        for (const s of spots) {
            if (!s.embedding) {
                await generateAndStoreEmbedding(s.id);           
            }
        }

        // const spotEmbedding = await getEmbeddingFromCache(spotId);
        // console.log(`Embeddings for comparison: ${JSON.stringify(spotEmbedding)}`);

        // Calculate similarity between this spot's embedding and other spots' embeddings
        const similarSpots = spots
            ?.map(s => ({
                ...s,
                similarity: cosineSimilarity(spot.embedding, s.embedding)
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5); 
        
        return NextResponse.json(similarSpots);
    } catch {
        return NextResponse.json({ error: 'an error occured' }, { status: 500 })
    }
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}