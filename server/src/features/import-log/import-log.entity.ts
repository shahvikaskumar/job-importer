import { Prop, SchemaFactory, Schema, } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema({ collection: 'import-logs', timestamps: true })
export class ImportLogEntity extends Document {
    @Prop()
    filename: string;

    @Prop()
    timestamp: Date;

    @Prop()
    totalFetched: number;

    @Prop()
    newJobs: number;

    @Prop()
    updatedJobs: number;

    @Prop([
        {
            job: { type: String },
            reason: { type: String },
        },
    ])
    failedJobs: { job: string; reason: string }[];
}

export const ImportLogSchema = SchemaFactory.createForClass(ImportLogEntity);



