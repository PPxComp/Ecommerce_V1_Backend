import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { MeController } from "./me.controller";
import { MeService } from "./me.service";

@Module({
  imports: [UserModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
