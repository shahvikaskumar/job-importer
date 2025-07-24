import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class MongooseService{
    async connect(uri:string){
        await mongoose.connect(uri);
        console.log('MongoDB Connected')
    }
}