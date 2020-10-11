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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = exports.ProposalIdGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const proposal_service_1 = require("../proposal/proposal.service");
let ProposalIdGuard = class ProposalIdGuard {
  constructor(proposalService) {
    this.proposalService = proposalService;
  }
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const proposalId = request.params.proposalId;
    if (proposalId === "all") return true;
    return this.proposalService
      ._findProposal(proposalId)
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw new common_1.NotFoundException("No proposal found");
      });
  }
};
ProposalIdGuard = __decorate(
  [
    common_1.Injectable(),
    __metadata("design:paramtypes", [
      typeof (_a =
        typeof proposal_service_1.ProposalService !== "undefined" &&
        proposal_service_1.ProposalService) === "function"
        ? _a
        : Object,
    ]),
  ],
  ProposalIdGuard
);
exports.ProposalIdGuard = ProposalIdGuard;
let AdminGuard = class AdminGuard {
  constructor(configService) {
    this.configService = configService;
  }
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["x-admin-token"];
    const { method, url } = request;
    if (
      token ==
      (this.configService.get("googlesecrets.admin_token") ||
        this.configService.get("__ADMIN_TOKEN"))
    ) {
      return true;
    }
    throw new common_1.NotFoundException(`Cannot ${method} ${url}`);
  }
};
AdminGuard = __decorate(
  [
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService]),
  ],
  AdminGuard
);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=voice.guard.js.map
