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
const mongodb_1 = require("mongodb");
const LIMIT = 12;
let StockService = class StockService {
  constructor(stockModel) {
    this.stockModel = stockModel;
  }
  async getAll(catagory, at) {
    let data = [];
    let count = 0;
    if (catagory.length > 0) {
      data = await this.stockModel
        .find({ catagory: { $all: catagory }, count: { $gt: 0 } })
        .sort({ _id: -1 });
    } else {
      data = await this.stockModel
        .find({ count: { $gt: 0 } })
        .sort({ _id: -1 });
    }
    count = data.length;
    const min = at < count ? at : count;
    let max = min + LIMIT;
    max = max < count ? max : count;
    let result = [];
    for (let i = min; i < max; i++) {
      result.push(data[i]);
    }
    return { data: result, count };
  }
  async getAdminStockAll(catagory, at) {
    let data = [];
    let count = 0;
    if (catagory.length > 0) {
      data = await this.stockModel
        .find({ catagory: { $all: catagory } })
        .sort({ id: -1 });
    } else {
      data = await this.stockModel.find({}).sort({ _id: -1 });
    }
    count = data.length;
    const min = at < count ? at : count;
    let max = min + LIMIT;
    max = max < count ? max : count;
    let result = [];
    for (let i = min; i < max; i++) {
      data[i]._doc.id = data[i]._id;
      const tmp = Object.assign({}, data[i]);
      result.push(Object.assign({ id: data[i].id }, tmp._doc));
    }
    return { data: result, count };
  }
  async getStockById(id) {
    const result = await this.stockModel.findById(id);
    if (result) return result;
    throw new common_1.NotFoundException("Not found this stock");
  }
  async createStock(data) {
    const result = await this.stockModel.create(data);
    if (result) return result;
    throw new common_1.NotFoundException("Not found this stock");
  }
  async updateStock(data, id) {
    const result = await this.stockModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (result) return result;
    throw new common_1.NotFoundException("Not found this stock");
  }
  async deleteStockById(data) {
    const id = data.map((element) => {
      return new mongodb_1.ObjectId(element);
    });
    const result = await this.stockModel.deleteMany({ _id: { $in: id } });
    if (result) return result;
    throw new common_1.NotFoundException("Not found this stock");
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
