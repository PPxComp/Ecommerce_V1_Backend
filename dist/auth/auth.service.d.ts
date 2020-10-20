import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { JwtPayload, userLogin, WebappTokensDTO } from "./auth.dto";
import { FirebaseService } from "src/firebase/firebase.service";
export declare class AuthService {
  private userService;
  private jwtService;
  private firebaseService;
  constructor(
    userService: UserService,
    jwtService: JwtService,
    firebaseService: FirebaseService
  );
  signJwt(payload: JwtPayload): string;
  userFromRefreshToken(refreshToken: string): Promise<string>;
  login(data: userLogin): Promise<import("../user/user.dto").userInfo>;
  generateTokensForUser(username: string): Promise<WebappTokensDTO>;
}
