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
const app_guard_1 = require("../app.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const stock_dto_1 = require("./stock.dto");
const stock_service_1 = require("./stock.service");
let StockController = class StockController {
  constructor(stockService) {
    this.stockService = stockService;
  }
  async getAllStock(data) {
    const catagory = data.catagory ? data.catagory.split(",") : [];
    const at = parseInt(data.start);
    return this.stockService.getAll(catagory, at);
  }
  async getStockById(id) {
    return this.stockService.getStockById(id);
  }
  async getAdminStock(data) {
    const catagory = data.catagory ? data.catagory.split(",") : [];
    const at = parseInt(data.start);
    return this.stockService.getAdminStockAll(catagory, at);
  }
  async deleteStock(data) {
    const input = data.split(",");
    return this.stockService.deleteStockById(input);
  }
  async addStock(data) {
    return this.stockService.createStock(data);
  }
  async updateStock(id, data) {
    return this.stockService.updateStock(data, id);
  }
};
__decorate(
  [
    common_1.Get(),
    swagger_1.ApiOperation({
      summary: "Get all stock",
    }),
    swagger_1.ApiOkResponse({
      description: "OK",
      type: stock_dto_1.getStockDto,
    }),
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
    common_1.Get(":id"),
    swagger_1.ApiOperation({
      summary: "Get stock by id",
    }),
    swagger_1.ApiOkResponse({ description: "OK", type: stock_dto_1.stockInfo }),
    common_1.UseGuards(app_guard_1.IsObjectId),
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
    common_1.Get("admin/stock"),
    swagger_1.ApiOperation({
      summary: "Get all  Admin stock",
    }),
    swagger_1.ApiOkResponse({
      description: "OK",
      type: stock_dto_1.getStockDto,
    }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(app_guard_1.IsAdmin),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiHeader({ name: "Authorization" }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_dto_1.getAll]),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "getAdminStock",
  null
);
__decorate(
  [
    common_1.Delete(""),
    swagger_1.ApiOperation({
      summary: "delete stock",
    }),
    swagger_1.ApiCreatedResponse({ description: "Deleted" }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(app_guard_1.IsAdmin),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiHeader({ name: "Authorization" }),
    __param(0, common_1.Query("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "deleteStock",
  null
);
__decorate(
  [
    common_1.Post(),
    swagger_1.ApiOperation({
      summary: "add stock",
    }),
    swagger_1.ApiCreatedResponse({ description: "Added" }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(app_guard_1.IsAdmin),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiHeader({ name: "Authorization" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_dto_1.stockInfo]),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "addStock",
  null
);
__decorate(
  [
    common_1.Put(":id"),
    swagger_1.ApiOperation({
      summary: "update stock",
    }),
    swagger_1.ApiOkResponse({ description: "Updated" }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiHeader({ name: "Authorization" }),
    common_1.UseGuards(app_guard_1.IsAdmin),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseGuards(app_guard_1.IsObjectId),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stock_dto_1.stockInfo]),
    __metadata("design:returntype", Promise),
  ],
  StockController.prototype,
  "updateStock",
  null
);
StockController = __decorate(
  [
    common_1.Controller("stock"),
    swagger_1.ApiTags("stock"),
    swagger_1.ApiUnauthorizedResponse({ description: "invalid bearer jwt" }),
    swagger_1.ApiBadRequestResponse({
      description: "User didn't have permission",
    }),
    swagger_1.ApiNotFoundResponse({ description: "Not found this stock" }),
    __metadata("design:paramtypes", [stock_service_1.StockService]),
  ],
  StockController
);
exports.StockController = StockController;
//# sourceMappingURL=stock.controller.js.map
