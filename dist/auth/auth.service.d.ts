import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { JwtPayload, userLogin, WebappTokensDTO } from "./auth.dto";
import { FirebaseService } from "src/firebase/firebase.service";
export declare class AuthService {
  private jwtService;
  private userService;
  private firebaseSerive;
  constructor(
    jwtService: JwtService,
    userService: UserService,
    firebaseSerive: FirebaseService
  );
  signJwt(payload: JwtPayload): string;
  userFromRefreshToken(refreshToken: string): Promise<string>;
  login(data: userLogin): Promise<import("../user/user.dto").userInfo>;
  generateTokensForUser(username: string): Promise<InternalTokenDTO>;
}
export interface InternalTokenDTO {
  webappToken: WebappTokensDTO;
  refreshToken: string;
}
