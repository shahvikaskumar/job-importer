import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JobSchema, JobEntity} from "../../features/job/job.entity";
import { JobService } from "./job.service";
import { JobRepository } from "./job.repository";
import { JobController } from "./job.controller";

@Module({
    imports :[
        MongooseModule.forFeature([{name:JobEntity.name, schema:JobSchema}])
    ],
    controllers:[JobController],
    providers:[JobService, JobRepository],
    exports: [JobService, JobRepository]
})
export class JobModule {}