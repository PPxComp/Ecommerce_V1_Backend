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
exports.MeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const me_service_1 = require("./me.service");
let MeController = class MeController {
  constructor(meService) {
    this.meService = meService;
  }
  async getUserInfo(req) {
    const {
      isAdmin,
      username,
      refreshToken,
    } = await this.meService.getUserInfo(req.user.username);
    return { isAdmin, username, refreshToken };
  }
};
__decorate(
  [
    common_1.Get("mexxxx"),
    swagger_1.ApiOperation({
      summary: "Get My Info",
    }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiHeader({ name: "Authorization" }),
    swagger_1.ApiOkResponse({ description: "OK" }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  MeController.prototype,
  "getUserInfo",
  null
);
MeController = __decorate(
  [
    common_1.Controller("user"),
    swagger_1.ApiTags("user"),
    __metadata("design:paramtypes", [me_service_1.MeService]),
  ],
  MeController
);
exports.MeController = MeController;
//# sourceMappingURL=me.controller.js.map
