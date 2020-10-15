import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { JwtPayload, userLogin, WebappTokensDTO } from "./auth.dto";
export declare class AuthService {
  private userService;
  private jwtService;
  constructor(userService: UserService, jwtService: JwtService);
  signJwt(payload: JwtPayload): string;
  userFromRefreshToken(refreshToken: string): Promise<string>;
  login(data: userLogin): Promise<import("../user/user.dto").userInfo>;
  generateTokensForUser(username: string): Promise<WebappTokensDTO>;
}
export interface InternalTokenDTO {
  accessToken: string;
  refreshToken: string;
}
