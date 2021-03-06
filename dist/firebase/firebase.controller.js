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
exports.FirebaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const app_guard_1 = require("../app.guard");
const firebase_service_1 = require("./firebase.service");
let FirebaseController = class FirebaseController {
  constructor(firebaseService) {
    this.firebaseService = firebaseService;
  }
  async CheckImage(id) {
    return this.firebaseService.hasStockPicture(id);
  }
};
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "Check is image exist",
    }),
    swagger_1.ApiOkResponse({ description: "OK" }),
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  FirebaseController.prototype,
  "CheckImage",
  null
);
FirebaseController = __decorate(
  [
    common_1.Controller("firebase"),
    swagger_1.ApiTags("firebase"),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService]),
  ],
  FirebaseController
);
exports.FirebaseController = FirebaseController;
//# sourceMappingURL=firebase.controller.js.map
