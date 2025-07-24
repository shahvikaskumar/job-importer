import { Module, OnModuleInit } from "@nestjs/common";
import { jobQueue } from "./bullmq.service";

@Module({
    
    providers:[]
})

export class QueueModule implements OnModuleInit{
    onModuleInit() {
        jobQueue.waitUntilReady()
        .then(() => console.log('Job Queue is ready'))
        .catch((err) => console.error('Failed to connect to Redis queue',err))

    }
}
    