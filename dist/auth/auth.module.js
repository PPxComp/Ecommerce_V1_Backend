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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecretFromConfig = exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {};
AuthModule = __decorate(
  [
    common_1.Module({
      controllers: [auth_controller_1.AuthController],
      imports: [
        jwt_1.JwtModule.registerAsync({
          useFactory: (config) => ({
            secret: exports.jwtSecretFromConfig(config),
          }),
          inject: [config_1.ConfigService],
        }),
        user_module_1.UserModule,
      ],
      providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
      exports: [jwt_1.JwtModule],
    }),
  ],
  AuthModule
);
exports.AuthModule = AuthModule;
exports.jwtSecretFromConfig = (config) => {
  return config.get("JWT_SECRET") || config.get("googlesecrets.jwt");
};
//# sourceMappingURL=auth.module.js.map
