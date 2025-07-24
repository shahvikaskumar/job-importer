import { Injectable } from "@nestjs/common";
import { ImportLogRepository } from "./import-log.repository";

@Injectable()
export class ImportLogService{
    constructor(private readonly logRepo:ImportLogRepository){}
    
    async logImport(details:any){
        return this.logRepo.createLog(details)
    }

    async getAllLogs(){
        return this.logRepo.getAllLogs();
    }
}