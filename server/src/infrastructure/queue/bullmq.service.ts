import { Queue } from "bullmq";
import { bullQueueOptions } from "../config/redis.config";

export const jobQueue = new Queue('JobQueue', bullQueueOptions)

jobQueue.waitUntilReady()
.then(() => console.log('Redis queue connected'))
.catch((err) => console.error('Redis connection failed', err))