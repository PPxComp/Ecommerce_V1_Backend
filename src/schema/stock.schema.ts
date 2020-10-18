import { Schema } from "mongoose";

//-------------------------------------------------------------------------//
// TODO : Userschema
//-------------------------------------------------------------------------//

export const UserSchema = new Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
  isAdmin: { required: false, type: Boolean, default: false },
  refreshToken: { required: false, type: String },
});

//-------------------------------------------------------------------------//
// TODO : StockSchma
//-------------------------------------------------------------------------//
export const StockSchema = new Schema(
  {
    name: { required: true, type: String },
    price: { required: true, type: Number },
    count: { required: true, type: Number },
    description: { required: false, type: String, default: null },
    catagory: { required: false, type: [String], default: [] },
  },
  { timestamps: true }
);
