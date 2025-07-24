import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { ImportLogEntity } from "./import-log.entity";

@Injectable()
export class ImportLogRepository{
    constructor(@InjectModel(ImportLogEntity.name) private readonly logModel:Model<any>){}

    async createLog(logData:any){
        return this.logModel.create(logData);
    }

    async getAllLogs(){
        return this.logModel.find().sort({timestamp:-1}).exec();
    }
}