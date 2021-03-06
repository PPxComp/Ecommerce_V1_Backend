import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "./auth.dto";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
  private config;
  constructor(config: ConfigService);
  validate(
    payload: JwtPayload
  ): {
    username: string;
  };
}
export {};
