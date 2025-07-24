import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImportLogSchema, ImportLogEntity } from "../../features/import-log/import-log.entity";
import { ImportLogService } from "./import-log.service";
import { ImportLogController } from "./import-log.controller";
import { ImportLogRepository } from "./import-log.repository";

@Module({
    imports:[
        MongooseModule.forFeature([{name:ImportLogEntity.name, schema:ImportLogSchema}])
    ],
    controllers:[ImportLogController],
    providers:[ImportLogService, ImportLogRepository],
    exports: [ImportLogService, ImportLogRepository], 
    
})
export class ImportLogModule {}