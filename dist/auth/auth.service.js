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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const firebase_service_1 = require("../firebase/firebase.service");
let AuthService = class AuthService {
  constructor(userService, jwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  signJwt(payload) {
    return this.jwtService.sign(class_transformer_1.classToPlain(payload), {
      expiresIn: "1h",
    });
  }
  async userFromRefreshToken(refreshToken) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);
    if (user) {
      return user.username;
    } else {
      return null;
    }
  }
  async login(data) {
    const user = await this.userService.findUserByUsername(data.username);
    if (user) {
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new common_1.NotFoundException("invalid username or password");
  }
  async generateTokensForUser(username) {
    const jwtToken = this.signJwt({
      username,
    });
    const refreshToken = uuid_1.v4();
    await this.userService.findUserAndUpdateToken(username, refreshToken);
    return {
      accessToken: jwtToken,
      refreshToken: refreshToken,
    };
  }
};
AuthService = __decorate(
  [
    common_1.Injectable(),
    __param(
      0,
      common_1.Inject(common_1.forwardRef(() => user_service_1.UserService))
    ),
    __metadata("design:paramtypes", [
      user_service_1.UserService,
      jwt_1.JwtService,
    ]),
  ],
  AuthService
);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
