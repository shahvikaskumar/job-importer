import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import {Document} from 'mongoose'

@Schema({collection: 'jobs', timestamps:true})
export class JobEntity extends Document {
  @Prop()
  title: string;

  @Prop()
  company: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop()
  pubDate: Date;

  @Prop({ required: true, unique: true })
  externalId: string;

  
   @Prop({
    type: {
      _: { type: String },
      isPermaLink: { type: String },
    },
  })
  guid?: {
    _: string;
    isPermaLink: string;
  };

 
   @Prop({
    type: {
      url: { type: String },
      medium: { type: String },
    },
  })
  mediaContent?: {
    url: string;
    medium: string;
  }; 
}

export const JobSchema = SchemaFactory.createForClass(JobEntity);
