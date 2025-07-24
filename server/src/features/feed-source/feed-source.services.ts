import { Injectable } from "@nestjs/common";
import { FeedSourceRepository } from "./feed-source.repository";

@Injectable()
export class FeedSourceService {
    constructor(private readonly feedSourceRepo: FeedSourceRepository) {}

    async createOrUpdateFeedSource(feedSource: any) {
        return this.feedSourceRepo.createOrUpdate(feedSource);
    }

    async getAllFeedSources() {
        return this.feedSourceRepo.getAllFeedSources();
    }
}