import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { userRegister } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: "Register ",
  })
  @ApiOkResponse({ description: "Registered" })
  @ApiBadRequestResponse({ description: "already have this user !" })
  @Post()
  async register(@Body() data: userRegister) {
    const result = await this.userService.resister(data);
    return result;
  }
}
