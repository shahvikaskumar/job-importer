import { Controller, Get, Post, Query, Body, Param } from "@nestjs/common";
import { JobService } from "./job.service";

@Controller('jobs')
export class JobController{
    constructor(private readonly jobservice:JobService) {}
    @Get('fetch')
    fetch(@Query('feed') feed:string | string[]){
        return this.jobservice.fetchAndQueueJobs(feed)
    }

    @Post()
    async createOrUpdate(@Body() job: any) {
        return this.jobservice.createOrUpdate(job);
    }

    @Get()
    async getAll() {
        return this.jobservice.getAll();
    }

    @Get(':externalId')
    async getByExternalId(@Param('externalId') externalId: string) {
        return this.jobservice.getByExternalId(externalId);
    }

    
}