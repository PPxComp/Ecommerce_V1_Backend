import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/user/user.service";
export declare class IsAdmin implements CanActivate {
  private userService;
  constructor(userService: UserService);
  canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class IsObjectId implements CanActivate {
  private userService;
  constructor(userService: UserService);
  canActivate(context: ExecutionContext): Promise<boolean>;
}
