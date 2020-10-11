import { userRegister } from "./user.dto";
import { UserService } from "./user.service";
export declare class UserController {
  private userService;
  constructor(userService: UserService);
  register(data: userRegister): Promise<any>;
}
