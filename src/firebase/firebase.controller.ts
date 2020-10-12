import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
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
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getToken(@Req() req) {
    return this.firebaseService.createToken(req.user.username);
  }
}
