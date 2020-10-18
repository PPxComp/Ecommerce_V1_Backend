import { BadRequestException, Injectable } from "@nestjs/common";
import { userInfo, userRegister } from "./user.dto";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { UserInfo } from "os";
const bcrypt = require("bcrypt");

const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel("users") private userModel: Model<any>) {}
  //-------------------------------------------------------------------------//
  // TODO : Regiter by username and password encode with brcypt
  //-------------------------------------------------------------------------//
  async resister(data: userRegister) {
    const hash = await bcrypt.hash(data.password, 10);
    const createUser = { username: data.username, password: hash };
    const user = await this.userModel.find({ username: data.username });
    if (user.length != 0) {
      throw new BadRequestException("already have this user !");
    } else {
      return this.userModel.create({ username: data.username, password: hash });
    }
  }

  //-------------------------------------------------------------------------//
  // TODO : give admin
  //-------------------------------------------------------------------------//
  async giveAdmin(username: string): Promise<userInfo> {
    return this.userModel.findOneAndUpdate(
      { username },
      { isAdmin: true },
      { new: true }
    );
  }

  //-------------------------------------------------------------------------//
  // TODO : find user by username
  //-------------------------------------------------------------------------//
  async findUserByUsername(username: string): Promise<userInfo> {
    return this.userModel.findOne({ username });
  }

  //-------------------------------------------------------------------------//
  // TODO : finduser And update user token
  //-------------------------------------------------------------------------//
  async findUserAndUpdateToken(
    username: string,
    refreshToken: string
  ): Promise<userInfo> {
    return this.userModel.findOneAndUpdate(
      { username },
      { refreshToken },
      { upsert: true, new: true }
    );
  }

  //-------------------------------------------------------------------------//
  // TODO : find user by refresh token ( call this function in refreshtoken api)
  //-------------------------------------------------------------------------//
  async findUserByRefreshToken(refreshToken: string): Promise<userInfo> {
    return this.userModel.findOne({ refreshToken });
  }
}
