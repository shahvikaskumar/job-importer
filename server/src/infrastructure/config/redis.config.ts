import IORedis from 'ioredis';

import { QueueOptions } from "bullmq";

const redisUrl = new IORedis(process.env.REDIS_URL!,{
    maxRetriesPerRequest: null, // Disable automatic retries
    enableReadyCheck: true, // Enable ready check to ensure Redis is ready before using
    connectTimeout: 10000, // Set a connection timeout of 10 seconds
});

redisUrl.on('connect', () => console.log('🔌 Redis connecting...'));
redisUrl.on('ready', () => console.log('✅ Redis connected'));
redisUrl.on('error', (err) => console.error('❌ Redis error:', err));

export const bullQueueOptions: QueueOptions = {
    connection:redisUrl,
}

