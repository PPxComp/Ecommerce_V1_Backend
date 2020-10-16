import { userRegister } from "./user.dto";
import { UserService } from "./user.service";
export declare class UserController {
  private userService;
  constructor(userService: UserService);
  register(data: userRegister): Promise<any>;
  getMyInfo(
    req: any
  ): Promise<{
    isAdmin: boolean;
    username: string;
    refreshToken: string;
  }>;
  getUserInfo(
    name: string
  ): Promise<{
    username: string;
    isAdmin: boolean;
  }>;
  giveAdmin(username: string): Promise<import("./user.dto").userInfo>;
}
