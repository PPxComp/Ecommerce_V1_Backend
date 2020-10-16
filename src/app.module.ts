import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { StockModule } from "./stock/stock.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,

    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongo.uri"),
      }),
      inject: [ConfigService],
    }),
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
