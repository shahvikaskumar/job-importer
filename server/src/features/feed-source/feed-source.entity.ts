import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({collection:'feed-source', timestamps: true })
export class FeedSourceEntity extends Document {
    @Prop({ required: true })
    url: string;

    @Prop({ default: false })
    isActive: boolean;
}

export const FeedSourceSchema = SchemaFactory.createForClass(FeedSourceEntity);