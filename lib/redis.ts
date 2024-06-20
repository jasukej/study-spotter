import { Redis } from "ioredis"

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL
    }

    throw new Error('REDIS_URL not defined.')
}

export const redis = new Redis(getRedisUrl());

/**
 * Cache key-value pairs for each spot's embeddings
 * @param studySpotId spotId as key
 * @param embedding embedding as value
 */
export async function cacheEmbedding(studySpotId: string, embedding: number[]) {
    await redis.set(`embedding:${studySpotId}`, JSON.stringify(embedding))
}

/**
 * Gets embedding from redis cache
 * @param studySpotId spotId as key 
 * @returns embedding as number array or null if not found
 */
export async function getEmbeddingFromCache(studySpotId: string) {
    const embedding = await redis.get(`embedding:${studySpotId}`);
    return embedding ? JSON.parse(embedding) : null
}

export default redis;