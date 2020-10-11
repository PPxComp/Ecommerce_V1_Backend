import { userInfo, userRegister } from "./user.dto";
import { Model } from "mongoose";
export declare class UserService {
  private userModel;
  constructor(userModel: Model<any>);
  resister(data: userRegister): Promise<any>;
  findUserByUsername(username: string): Promise<userInfo>;
  findUserAndUpdateToken(
    username: string,
    refreshToken: string
  ): Promise<userInfo>;
  findUserByRefreshToken(refreshToken: string): Promise<userInfo>;
  countUser(
    filterMode: "ALL" | "HASINFO" | "HASGROUPCONFIRMED"
  ): Promise<number>;
}
