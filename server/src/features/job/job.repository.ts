import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { JobEntity } from './job.entity';


@Injectable()
export class JobRepository {
    constructor(@InjectModel(JobEntity.name) private readonly jobModel: Model<any>) { }
    async upsertjob(job: any) {
        const result = await this.jobModel.updateOne(
            { externalId: job.externalId },
            { $set: job },
            { upsert: true }
        );

        return {
            isNew: result.upsertedCount > 0,           
        };
    }
    
    async findAll() {
        return this.jobModel.find();
    }

    async findByExternalId(externalId: string) {
        return this.jobModel.findOne({ externalId });
    }
}