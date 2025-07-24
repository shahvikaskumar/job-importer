import { Body, Controller, Get, Post } from "@nestjs/common";
import { FeedSourceService } from "./feed-source.services";

@Controller('feed-source')
export class FeedSourceController{
    constructor(private readonly feedSourceService:FeedSourceService){}

    @Post()
    async createorupdate(@Body() feedSource: any) {
        return await this.feedSourceService.createOrUpdateFeedSource(feedSource);
    }

    @Get()
    async getAll() {
        return await this.feedSourceService.getAllFeedSources();
    }
}