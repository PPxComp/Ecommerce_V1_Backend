"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../user/user.dto");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const REFRESH_TOKEN_COOKIE_NAME = "cookie_for_refresh";
let AuthController = class AuthController {
  constructor(authService, configService) {
    this.authService = authService;
    this.configService = configService;
  }
  async getJwt(data, res) {
    const user = await this.authService.login(data);
    const result = await this.authService.generateTokensForUser(user.username);
    await this.setRefreshCookie(res, result.refreshToken);
    return res.json(result);
  }
  getRefreshCookieOpt() {
    const opt = {
      httpOnly: true,
    };
    if (this.configService.get("SECURE_COOKIE") !== "no") {
      opt.secure = true;
      opt.sameSite = "none";
    }
    return opt;
  }
  setRefreshCookie(res, refreshToken) {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      path: "/",
    });
  }
  async getUserFromRefreshCookie(req) {
    const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
    if (!token)
      throw new common_1.UnauthorizedException("No refresh cookie found");
    const user = await this.authService.userFromRefreshToken(token);
    if (!user)
      throw new common_1.UnauthorizedException("Refresh token revoked");
    return user;
  }
  async refreshToken(res, req) {
    const user = await this.getUserFromRefreshCookie(req);
    const {
      accessToken,
      refreshToken,
    } = await this.authService.generateTokensForUser(user);
    this.setRefreshCookie(res, refreshToken);
    res.json({ accessToken });
  }
  async clearRefreshToken(res, req) {
    try {
      const user = await this.getUserFromRefreshCookie(req);
      await this.authService.generateTokensForUser(user);
    } catch (e) {
      if (e instanceof common_1.HttpException) {
      } else {
        throw e;
      }
    }
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, this.getRefreshCookieOpt());
    res.status(201).send("Refresh Token revoked");
  }
};
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "Login Exchange ticket",
    }),
    swagger_1.ApiOkResponse({ type: auth_dto_1.JwtPayload, description: "OK" }),
    common_1.Post("login"),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.userLogin, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "getJwt",
  null
);
__decorate(
  [
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "getUserFromRefreshCookie",
  null
);
__decorate(
  [
    common_1.Post("refresh_token"),
    swagger_1.ApiCreatedResponse({ type: auth_dto_1.WebappTokensDTO }),
    swagger_1.ApiUnauthorizedResponse({
      description: "Refresh token expired or no refresh token",
    }),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "refreshToken",
  null
);
__decorate(
  [
    common_1.Post("logout"),
    swagger_1.ApiCreatedResponse({ description: "RefreshToken revoked" }),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise),
  ],
  AuthController.prototype,
  "clearRefreshToken",
  null
);
AuthController = __decorate(
  [
    swagger_1.ApiTags("auth"),
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [
      auth_service_1.AuthService,
      config_1.ConfigService,
    ]),
  ],
  AuthController
);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
