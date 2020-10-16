import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class MeService {
  constructor(private userSerivce: UserService) {}

  async getUserInfo(username: string) {
    return this.userSerivce.findUserByUsername(username);
  }
}
