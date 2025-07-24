import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { JobService } from "../../features/job/job.service";
import { FeedSourceService } from "../../features/feed-source/feed-source.services";

@Injectable()
export class CronService {
    constructor(
        private readonly jobService: JobService,
        private readonly feedSourceService: FeedSourceService
    ) {}
    
    @Cron(CronExpression.EVERY_HOUR) 
    async handleCron() {
        console.log('CRON Running hourly job...');
    
        
        const feeds = await this.feedSourceService.getAllFeedSources();
        if(!feeds || feeds.length === 0) {
            console.log('No feeds found in feed-source collection.');
            return;
        }

        const feedUrls = feeds.map(feed => feed.url);
        await this.jobService.fetchAndQueueJobs(feedUrls);
        
        console.log('CRON Feed job queued successfully');
    }
}