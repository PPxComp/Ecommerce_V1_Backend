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
exports.getAll = exports.stockInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class stockInfo {}
__decorate(
  [
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String),
  ],
  stockInfo.prototype,
  "name",
  void 0
);
__decorate(
  [
    swagger_1.ApiProperty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number),
  ],
  stockInfo.prototype,
  "price",
  void 0
);
__decorate(
  [
    swagger_1.ApiProperty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number),
  ],
  stockInfo.prototype,
  "count",
  void 0
);
__decorate(
  [swagger_1.ApiProperty(), __metadata("design:type", String)],
  stockInfo.prototype,
  "img",
  void 0
);
__decorate(
  [swagger_1.ApiProperty(), __metadata("design:type", Array)],
  stockInfo.prototype,
  "catagory",
  void 0
);
exports.stockInfo = stockInfo;
class getAll {}
__decorate(
  [swagger_1.ApiPropertyOptional(), __metadata("design:type", String)],
  getAll.prototype,
  "catagory",
  void 0
);
__decorate(
  [
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number),
  ],
  getAll.prototype,
  "start",
  void 0
);
exports.getAll = getAll;
//# sourceMappingURL=stock.dto.js.map