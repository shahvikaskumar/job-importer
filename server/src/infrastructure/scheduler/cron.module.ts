import { Module } from "@nestjs/common";
import { CronService } from "./cron.service";
import { JobModule } from "../../features/job/job.module";
import { FeedSourceModule } from "../../features/feed-source/feed-source.module";

@Module({
  imports: [JobModule, FeedSourceModule],
  providers: [CronService],
})
export class CronModule {}