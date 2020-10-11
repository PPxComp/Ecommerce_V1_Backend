import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { JwtPayload, userLogin } from "./auth.dto";
export declare class AuthService {
  private jwtService;
  private userService;
  constructor(jwtService: JwtService, userService: UserService);
  signJwt(payload: JwtPayload): string;
  userFromRefreshToken(refreshToken: string): Promise<string>;
  login(data: userLogin): Promise<import("../user/user.dto").userInfo>;
  generateTokensForUser(username: string): Promise<InternalTokenDTO>;
}
export interface InternalTokenDTO {
  accessToken: string;
  refreshToken: string;
}
