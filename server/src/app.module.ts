import { Module } from '@nestjs/common';
import { MongoConfig } from './infrastructure/config/mongodb.config';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './features/job/job.module';
import { ImportLogModule } from './features/import-log/import-log.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { FeedSourceModule } from './features/feed-source/feed-source.module';
import { CronModule } from './infrastructure/scheduler/cron.module';


@Module({
  imports: [
    ...MongoConfig,
    ScheduleModule.forRoot(),
    FeedSourceModule,
    JobModule,
    ImportLogModule,
    QueueModule,
    CronModule
  ],
  
})
export class AppModule {}
