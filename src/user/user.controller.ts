import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { userRegister } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @ApiOperation({
    summary: "Register ",
  })
  async register(@Body() data: userRegister) {
    const result = await this.userService.resister(data);
    return result;
  }
}
