import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MeService } from "./me.service";

@Controller("user")
@ApiTags("user")
export class MeController {
  constructor(private meService: MeService) {}
  @Get("me")
  @ApiOperation({
    summary: "Get My Info",
  })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @ApiOkResponse({ description: "OK" })
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req) {
    const {
      isAdmin,
      username,
      refreshToken,
    } = await this.meService.getUserInfo(req.user.username);
    return { isAdmin, username, refreshToken };
  }
}
