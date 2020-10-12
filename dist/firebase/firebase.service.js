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
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const config_1 = require("@nestjs/config");
function parseServiceAccount(jsonOrBase64) {
  try {
    return JSON.parse(jsonOrBase64);
  } catch (ignored) {
    try {
      return JSON.parse(Buffer.from(jsonOrBase64, "base64").toString("ascii"));
    } catch (e) {
      console.log("Unable to parse FIREBASE_SERVICE_ACCOUNT");
    }
  }
}
let FirebaseService = class FirebaseService {
  constructor(configService) {
    const serviceAccount = configService.get("firebase.serviceAccount");
    const storageBucketName = configService.get("firebase.storageBucketName");
    console.log("Service account path  : ", serviceAccount);
    console.log("storageBucketName  : ", storageBucketName);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${storageBucketName}.appspot.com`,
    });
    this.bucket = admin.storage().bucket();
  }
  async createToken(id) {
    return await admin.auth().createCustomToken(id);
  }
  stockPicture(id) {
    return this.bucket.file(`img/${id}`);
  }
  async hasStockPicture(id) {
    const [exists] = await this.stockPicture(id).exists();
    return exists;
  }
};
FirebaseService = __decorate(
  [
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService]),
  ],
  FirebaseService
);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map
