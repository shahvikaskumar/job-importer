import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

export const MongoConfig = [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.MONGODB_URL!),
    
];
