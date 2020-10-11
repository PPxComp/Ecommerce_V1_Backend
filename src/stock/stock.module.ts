import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StockSchema } from "src/schema/stock.schema";
import { UserModule } from "src/user/user.module";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "stocks", schema: StockSchema }]),
    UserModule,
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
