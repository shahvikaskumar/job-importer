import IORedis from 'ioredis';

import { QueueOptions } from "bullmq";

const redisUrl = new IORedis(process.env.REDIS_URL!,{
    maxRetriesPerRequest: null, 
    enableReadyCheck: true, 
    connectTimeout: 10000,
});

redisUrl.on('connect', () => console.log('Redis connecting...'));
redisUrl.on('ready', () => console.log('Redis connected'));
redisUrl.on('error', (err) => console.error('Redis error:', err));

export const bullQueueOptions: QueueOptions = {
    connection:redisUrl,
}

