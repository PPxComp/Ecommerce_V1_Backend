import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
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

  @Get("/info/:username")
  @ApiOperation({
    summary: "Get User Info",
  })
  @ApiOkResponse({ description: "OK" })
  async getUserInfo(@Param("username") name: string) {
    const { username, isAdmin } = await this.userService.findUserByUsername(
      name
    );
    return { username, isAdmin };
  }

  @ApiOperation({
    summary: "Give admin ",
  })
  @ApiCreatedResponse({ description: "Add permission !" })
  @Put(":username")
  async giveAdmin(@Param("username") username: string) {
    const result = await this.userService.giveAdmin(username);
    return result;
  }
}
