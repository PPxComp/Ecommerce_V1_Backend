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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const LIMIT = 10;
let StockService = class StockService {
  constructor(stockModel) {
    this.stockModel = stockModel;
  }
  async getAll(catagory, at) {
    let data = [];
    let count = 0;
    if (catagory) {
      data = await this.stockModel
        .find({ catagory: { $all: [catagory] } })
        .sort({ _id: -1 });
    } else {
      data = await this.stockModel.find({}).sort({ _id: -1 });
    }
    count = data.length;
    const min = at < count ? at : count;
    const max = min + 10 < count ? min + 10 : count;
    let result = [];
    for (let i = min; i < max; i++) {
      result.push(data[i]);
    }
    return { data: result, count };
  }
  async getStockById(id) {
    return this.stockModel.findById(id);
  }
  async createStock(data) {
    return this.stockModel.create(data);
  }
  async updateStock(data, id) {
    return this.stockModel.findByIdAndUpdate(id, data);
  }
  async deleteStockById(id) {
    return this.stockModel.findByIdAndRemove(id);
  }
};
StockService = __decorate(
  [
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("stocks")),
    __metadata("design:paramtypes", [mongoose_2.Model]),
  ],
  StockService
);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map
