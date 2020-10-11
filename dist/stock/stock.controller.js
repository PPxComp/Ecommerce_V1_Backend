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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const stock_dto_1 = require("./stock.dto");
let StockController = class StockController {
  async getAllStock(data) {
    return data;
  }
  async getStockById(id) {
    return id;
  }
  async deleteStock() {
    return 1;
  }
  async addStock() {
    return 1;
  }
  async updateStock() {
    return 1;
  }
};
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "Get all stock",
    }),
    swagger_1.ApiOkResponse({ description: "OK" }),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_dto_1.getAll]),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "getAllStock",
  null
);
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "Get stock by id",
    }),
    swagger_1.ApiOkResponse({ description: "OK" }),
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "getStockById",
  null
);
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "delete stock",
    }),
    swagger_1.ApiOkResponse({ description: "Deleted" }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiHeader({ name: "Authorization" }),
    swagger_1.ApiUnauthorizedResponse({ description: "invalid bearer jwt" }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "deleteStock",
  null
);
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "add stock",
    }),
    swagger_1.ApiOkResponse({ description: "Added" }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiHeader({ name: "Authorization" }),
    swagger_1.ApiUnauthorizedResponse({ description: "invalid bearer jwt" }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "addStock",
  null
);
__decorate(
  [
    swagger_1.ApiOperation({
      summary: "update stock",
    }),
    swagger_1.ApiOkResponse({ description: "Updated" }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiHeader({ name: "Authorization" }),
    swagger_1.ApiUnauthorizedResponse({ description: "invalid bearer jwt" }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "updateStock",
  null
);
StockController = __decorate(
  [common_1.Controller("stock"), swagger_1.ApiTags("stock")],
  StockController
);
exports.StockController = StockController;
//# sourceMappingURL=stock.controller.js.map
