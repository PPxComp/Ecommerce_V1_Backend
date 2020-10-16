import { UserService } from "src/user/user.service";
export declare class MeService {
  private userSerivce;
  constructor(userSerivce: UserService);
  getUserInfo(username: string): Promise<import("../user/user.dto").userInfo>;
}
