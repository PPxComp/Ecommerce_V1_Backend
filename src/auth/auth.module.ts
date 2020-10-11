import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: jwtSecretFromConfig(config),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
export const jwtSecretFromConfig = (config: ConfigService) => {
  return (
    config.get<string>("JWT_SECRET") || config.get<string>("googlesecrets.jwt")
  );
};
