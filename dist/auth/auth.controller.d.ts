import { ConfigService } from "@nestjs/config";
import { userLogin } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Response, Request } from "express";
export declare class AuthController {
  private authService;
  private configService;
  constructor(authService: AuthService, configService: ConfigService);
  getJwt(data: userLogin, res: Response): Promise<Response<any>>;
  private getRefreshCookieOpt;
  private setRefreshCookie;
  private getUserFromRefreshCookie;
  refreshToken(res: Response, req: Request): Promise<void>;
  clearRefreshToken(res: Response, req: Request): Promise<void>;
}
