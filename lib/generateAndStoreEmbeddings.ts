import prisma from '@/app/libs/prismadb'
import PipelineSingleton from './pipelineSingleton';
import { pipeline } from '@xenova/transformers';
import { cacheEmbedding, getEmbeddingFromCache } from '@/lib/redis';

// Initialize and load the embedding pipeline
let embeddingPipeline: any;

/**
 * Uses bert-base-multilingual-uncased-sentiment to generate embeddings from input text
 * @param text input for text -> embedding 
 * @returns embeddings array
 */
async function generateEmbedding(text: string): Promise<number[]> {
    const embeddingPipeline = await PipelineSingleton.getInstance();
    const embeddings = await embeddingPipeline(text);
    // Flatten nested array to single vector
    console.log(`model generated: ${JSON.stringify(embeddings.data)}`);
    
    return Object.values(embeddings.data);
}

/**
 * Get embeddings from cache, if not found initialize new embedding.
 * Used in process of returning recommendations
 * @param studySpotId as key for redis cache + pull spot info
 */
export async function generateAndStoreEmbedding(studySpotId: string) {
    const spot = await prisma.studySpot.findUnique({
        where: { id: studySpotId }
    })

    if (!spot) {
        throw new Error('Study spot not found.');
    }

    let embedding = spot.embedding // await getEmbeddingFromCache(studySpotId);

    console.log(`cached embedding: ${embedding}`);

    if (!embedding) {
        const description = `${spot.name} - ${spot.description} - the spot is a ${spot.category} - on a scale of 1 to 5, noise is ${spot.noiseLevel} - the spot fits ${spot.capacity} people`;
        embedding = await generateEmbedding(description);
        // await cacheEmbedding(studySpotId, embedding);
    }

    await prisma.studySpot.update({
        where: { id: spot.id },
        data: { embedding: embedding },
    })
}

