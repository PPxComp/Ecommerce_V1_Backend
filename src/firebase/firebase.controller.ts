import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { IsAdmin, IsObjectId } from "src/app.guard";
import { FirebaseService } from "./firebase.service";

@Controller("firebase")
@ApiTags("firebase")
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  //-------------------------------------------------------------------------//
  // TODO : Get ADmin frebase token
  //-------------------------------------------------------------------------//
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

  //-------------------------------------------------------------------------//
  // TODO : Check is image exist ?
  //-------------------------------------------------------------------------//
  @ApiOperation({
    summary: "Check is image exist",
  })
  @ApiOkResponse({ description: "OK" })
  @Get(":id")
  async CheckImage(@Param("id") id: string) {
    return this.firebaseService.hasStockPicture(id);
  }
}
