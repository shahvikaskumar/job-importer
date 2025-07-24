import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { parseXmlToJson } from '../../shared/utils/xml-parser.utils';
import { jobQueue } from '../../infrastructure/queue/bullmq.service';
import { JobRepository } from './job.repository';
import { FeedSourceService } from '../feed-source/feed-source.services';

@Injectable()
export class JobService {
    constructor(private readonly jobRepo: JobRepository) { }
    async fetchAndQueueJobs(feedurls: string | string[]) {
        const feeds = Array.isArray(feedurls) ? feedurls : [feedurls];
         const result: { feedurl: string; queued: number; error?: string }[] = [];

        for (const feedurl of feeds) {
            try {
                const { data } = await axios.get(feedurl);
                const parsed = await parseXmlToJson(data);

                const items = parsed?.rss?.channel?.item;

                const job = await jobQueue.add('import-job', {items, feedurl}, {attempts: 3, backoff: { type: 'exponential', delay: 3000 }});                
                result.push({ feedurl, queued: items.length });
            }
            catch (err) {
                console.error(`Failed to process feed:${feedurl}`, err.message)
                result.push({ feedurl: feedurl, queued: 0, error: err.message });
            }
        }



        return { feeds: result }
    }

    async createOrUpdate(job: any) {
        return this.jobRepo.upsertjob(job);
    }

    async getAll() {
        return this.jobRepo.findAll();
    }

    async getByExternalId(externalId: string) {
        return this.jobRepo.findByExternalId(externalId);
    }







}

