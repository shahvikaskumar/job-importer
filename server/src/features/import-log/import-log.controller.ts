import { Controller, Get } from "@nestjs/common";
import { ImportLogService } from "./import-log.service";

@Controller('import-logs')
export class ImportLogController{
    constructor(private readonly importLogService:ImportLogService){}

    @Get()
    async all(){
        return await this.importLogService.getAllLogs()
    }
}