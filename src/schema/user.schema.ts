import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { required: true, type: String },
  password: { required: true, type: String },
  isAdmin: { required: false, type: Boolean, default: false },
  refreshToken: { required: false, type: String },
});
export default UserSchema;
