import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatService } from "./cat/cat.service";
import { CatModule } from "./cat/cat.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { StockModule } from "./stock/stock.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    CatModule,
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI"),
      }),
      inject: [ConfigService],
    }),
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService, CatService],
})
export class AppModule {}
