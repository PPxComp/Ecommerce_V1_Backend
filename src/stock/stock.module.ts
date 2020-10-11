import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StockSchema } from "src/schema/stock.schema";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "stocks", schema: StockSchema }]),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
