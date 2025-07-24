import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FeedSourceController } from "./feed-source.controller";
import { FeedSourceSchema, FeedSourceEntity } from "./feed-source.entity";
import { FeedSourceRepository } from "./feed-source.repository";
import { FeedSourceService } from "./feed-source.services";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: FeedSourceEntity.name, schema: FeedSourceSchema }]),
    ],
    controllers :[FeedSourceController],
    providers: [FeedSourceService, FeedSourceRepository],
    exports: [FeedSourceService, FeedSourceRepository]
})
export class FeedSourceModule {}