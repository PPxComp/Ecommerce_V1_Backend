import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

import { Injectable } from "@nestjs/common";

import { jwtSecretFromConfig } from "./auth.module";
import { JwtPayload, userLogin } from "./auth.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretFromConfig(config),
    });
  }
  validate(payload: JwtPayload) {
    return { username: payload.username };
  }
}
