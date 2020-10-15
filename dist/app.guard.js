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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectId = exports.IsAdmin = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const user_dto_1 = require("./user/user.dto");
const user_service_1 = require("./user/user.service");
let IsAdmin = class IsAdmin {
  constructor(userService) {
    this.userService = userService;
  }
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findUserByUsername(
      request.user.username
    );
    if (!user.isAdmin) {
      throw new common_1.BadRequestException("User didn't have permission");
    }
    return user.isAdmin;
  }
};
IsAdmin = __decorate(
  [
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService]),
  ],
  IsAdmin
);
exports.IsAdmin = IsAdmin;
class IsObjectId {
  constructor(userService) {
    this.userService = userService;
  }
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    if (!mongoose_1.isValidObjectId(id)) {
      throw new common_1.BadRequestException("Invalid Object Id");
    }
    return true;
  }
}
exports.IsObjectId = IsObjectId;
//# sourceMappingURL=app.guard.js.map
