import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { classToPlain } from "class-transformer";
import { UserService } from "src/user/user.service";
import { JwtPayload, userLogin } from "./auth.dto";
const bcrypt = require("bcrypt");
import { v4 as uuid4 } from "uuid";
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  signJwt(payload: JwtPayload): string {
    return this.jwtService.sign(classToPlain(payload), { expiresIn: "1h" });
  }

  async userFromRefreshToken(refreshToken: string) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);
    if (user) {
      return user.username;
    } else {
      return null;
    }
  }

  async login(data: userLogin) {
    const user = await this.userService.findUserByUsername(data.username);

    if (user) {
      const isValid: boolean = await bcrypt.compare(
        data.password,
        user.password
      );

      if (isValid) {
        return user;
      }
    }

    throw new NotFoundException("invalid username or password");
  }

  async generateTokensForUser(username: string): Promise<InternalTokenDTO> {
    const jwtToken = this.signJwt({
      username,
    });

    //Invalidate refresh token
    const refreshToken: string = uuid4();
    await this.userService.findUserAndUpdateToken(username, refreshToken);

    return {
      accessToken: jwtToken,
      refreshToken: refreshToken,
    };
  }
}
export interface InternalTokenDTO {
  accessToken: string;
  refreshToken: string;
}
