"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockSchema = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
  isAdmin: { required: false, type: Boolean, default: false },
  refreshToken: { required: false, type: String },
});
exports.StockSchema = new mongoose_1.Schema(
  {
    name: { required: true, type: String },
    price: { required: true, type: Number },
    count: { required: true, type: Number },
    img: { required: false, type: String, default: null },
    catagory: { required: false, type: [String], default: [] },
  },
  { timestamps: true }
);
//# sourceMappingURL=stock.schema.js.map
