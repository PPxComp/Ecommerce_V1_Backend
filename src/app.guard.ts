import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isValidObjectId } from "mongoose";

import { userInfo } from "src/user/user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class IsAdmin implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: userInfo = await this.userService.findUserByUsername(
      request.user.username
    );
    if (!user.isAdmin) {
      throw new BadRequestException("User didn't have permission");
    }
    return user.isAdmin;
  }
}

export class IsObjectId implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id: string = request.params.id;
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid Object Id");
    }

    return true;
  }
}
