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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async register(data) {
    const result = await this.userService.resister(data);
    return result;
  }
  async getMyInfo(req) {
    const {
      isAdmin,
      username,
      refreshToken,
    } = await this.userService.findUserByUsername(req.user.username);
    return { isAdmin, username, refreshToken };
  }
  async getUserInfo(name) {
    const { username, isAdmin } = await this.userService.findUserByUsername(
      name
    );
    return { username, isAdmin };
  }
  async giveAdmin(username) {
    const result = await this.userService.giveAdmin(username);
    return result;
  }
};
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "Register ",
    }),
    swagger_1.ApiCreatedResponse({ description: "Registered" }),
    swagger_1.ApiBadRequestResponse({
      description: "already have this user !",
    }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userRegister]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "register",
  null
);
__decorate(
  [
    common_1.Get("me"),
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
  UserController.prototype,
  "getMyInfo",
  null
);
__decorate(
  [
    common_1.Get("/info/:username"),
    swagger_1.ApiOperation({
      summary: "Get User Info",
    }),
    swagger_1.ApiOkResponse({ description: "OK" }),
    __param(0, common_1.Param("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "getUserInfo",
  null
);
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "Give admin ",
    }),
    swagger_1.ApiCreatedResponse({ description: "Add permission !" }),
    common_1.Put(":username"),
    __param(0, common_1.Param("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "giveAdmin",
  null
);
UserController = __decorate(
  [
    common_1.Controller("user"),
    swagger_1.ApiTags("user"),
    __metadata("design:paramtypes", [user_service_1.UserService]),
  ],
  UserController
);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
