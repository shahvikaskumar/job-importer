import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { FeedSourceEntity } from './feed-source.entity';

@Injectable()
export class FeedSourceRepository {
    constructor(@InjectModel(FeedSourceEntity.name) private readonly feedSourceModel: Model<FeedSourceEntity>) { }
    async createOrUpdate(feedSource: FeedSourceEntity) {
        const result = await this.feedSourceModel.updateOne(
            { url: feedSource.url },
            { $set: feedSource },
            { upsert: true }
        );

        return {
            isNew: result.upsertedCount > 0,
        };
    }

    async getAllFeedSources() {
        return this.feedSourceModel.find();
    }
}