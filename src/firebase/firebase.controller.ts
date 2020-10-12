import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { IsAdmin } from "src/stock/stock.guard";
import { FirebaseService } from "./firebase.service";

@Controller("firebase")
@ApiTags("firebase token")
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @ApiOperation({
    summary: "Get Admin firebase token",
  })
  @ApiOkResponse({ description: "OK" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @ApiBadRequestResponse({ description: "User didn't have permission" })
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getToken(@Req() req) {
    return this.firebaseService.createToken(req.user.username);
  }
}
