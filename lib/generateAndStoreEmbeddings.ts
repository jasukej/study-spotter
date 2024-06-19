import prisma from '@/app/libs/prismadb'
import OpenAI from 'openai';
import { cacheEmbedding, getEmbeddingFromCache } from '@/lib/redis';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAndStoreEmbedding(studySpotId: string) {
    const spot = await prisma.studySpot.findUnique({
        where: { id: studySpotId }
    })

    if (!spot) {
        throw new Error('Study spot not found.');
    }

    let embedding = await getEmbeddingFromCache(studySpotId);

    console.log(`cached embedding: ${embedding}`);

    if (!embedding) {
        const description = `${spot.name} - ${spot.description} - the spot is a ${spot.category} - on a scale of 1 to 5, noise is ${spot.noiseLevel} - the spot fits ${spot.capacity} people`;
        const response = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: description,
        })

        embedding = response.data[0].embedding;
        console.log(`new embedding: ${embedding}`);
        await cacheEmbedding(studySpotId, embedding);

        console.log(embedding);
    }

    await prisma.studySpot.update({
        where: { id: spot.id },
        data: { embedding },
    })
}

