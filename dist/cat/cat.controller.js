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
exports.CatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const cat_service_1 = require("./cat.service");
let CatController = class CatController {
  constructor(catService) {
    this.catService = catService;
  }
  testAuthCat(req) {
    return req.user;
  }
};
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "test auth with jwt",
    }),
    swagger_1.ApiOkResponse({ description: "OK" }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiHeader({ name: "Authorization" }),
    swagger_1.ApiUnauthorizedResponse({ description: "invalid bearer jwt" }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0),
  ],
  CatController.prototype,
  "testAuthCat",
  null
);
CatController = __decorate(
  [
    swagger_1.ApiTags("auth"),
    common_1.Controller("cat"),
    __metadata("design:paramtypes", [cat_service_1.CatService]),
  ],
  CatController
);
exports.CatController = CatController;
//# sourceMappingURL=cat.controller.js.map
