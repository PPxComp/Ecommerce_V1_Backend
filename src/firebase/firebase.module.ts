import { Module } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";
import { FirebaseController } from "./firebase.controller";
import { StockModule } from "src/stock/stock.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
