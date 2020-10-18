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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let UserService = class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async resister(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const createUser = { username: data.username, password: hash };
    const user = await this.userModel.find({ username: data.username });
    if (user.length != 0) {
      throw new common_1.BadRequestException("already have this user !");
    } else {
      return this.userModel.create({ username: data.username, password: hash });
    }
  }
  async giveAdmin(username) {
    return this.userModel.findOneAndUpdate(
      { username },
      { isAdmin: true },
      { new: true }
    );
  }
  async findUserByUsername(username) {
    return this.userModel.findOne({ username });
  }
  async findUserAndUpdateToken(username, refreshToken) {
    return this.userModel.findOneAndUpdate(
      { username },
      { refreshToken },
      { upsert: true, new: true }
    );
  }
  async findUserByRefreshToken(refreshToken) {
    return this.userModel.findOne({ refreshToken });
  }
};
UserService = __decorate(
  [
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("users")),
    __metadata("design:paramtypes", [mongoose_2.Model]),
  ],
  UserService
);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
