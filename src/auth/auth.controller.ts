import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { userInfo, userRegister } from "src/user/user.dto";
import { JwtPayload, userLogin, WebappTokensDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Response, Request, CookieOptions } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UserService } from "src/user/user.service";
const REFRESH_TOKEN_COOKIE_NAME = "cookie_for_refresh";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  //-------------------------------------------------------------------------//
  // TODO : Contructor
  //-------------------------------------------------------------------------//
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  //-------------------------------------------------------------------------//
  // TODO : Login With Username and Password
  //-------------------------------------------------------------------------//
  @ApiOperation({
    summary: "Login Exchange ticket",
  })
  @ApiOkResponse({ type: WebappTokensDTO, description: "OK" })
  @Post("login")
  async getJwt(@Body() data: userLogin, @Res() res: Response) {
    const user: userInfo = await this.authService.login(data);

    const result: WebappTokensDTO = await this.authService.generateTokensForUser(
      user.username
    );

    await this.setRefreshCookie(res, result.refreshToken);

    return res.json(result as WebappTokensDTO);
  }

  //-------------------------------------------------------------------------//
  // TODO : Refresh_token
  //-------------------------------------------------------------------------//

  @Post("refresh_token")
  @ApiCreatedResponse({ type: WebappTokensDTO })
  @ApiUnauthorizedResponse({
    description: "Refresh token expired or no refresh token",
  })
  async refreshToken(@Res() res: Response, @Req() req: Request) {
    const user = await this.getUserFromRefreshCookie(req);

    const result = await this.authService.generateTokensForUser(user);

    this.setRefreshCookie(res, result.refreshToken);
    res.json(result);
  }

  //-------------------------------------------------------------------------//
  // TODO : Logout
  //-------------------------------------------------------------------------//
  @Post("logout")
  @ApiCreatedResponse({ description: "RefreshToken revoked" })
  async clearRefreshToken(@Res() res: Response, @Req() req: Request) {
    try {
      const user = await this.getUserFromRefreshCookie(req);
      await this.authService.generateTokensForUser(user);
    } catch (e) {
      if (e instanceof HttpException) {
        //Nothing
      } else {
        throw e;
      }
    }

    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    res.status(201).send("Refresh Token revoked");
  }

  //-------------------------------------------------------------------------//
  // TODO : fucntion to manage Cookie
  //-------------------------------------------------------------------------//
  private setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      path: "/",
    });
  }
  private async getUserFromRefreshCookie(@Req() req: Request): Promise<string> {
    const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!token) throw new UnauthorizedException("No refresh cookie found");
    const user = await this.authService.userFromRefreshToken(token);
    if (!user) throw new UnauthorizedException("Refresh token revoked");
    return user;
  }
}
