import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { create } from "domain";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { createCatDto } from "./cat.dto";

import { CatService } from "./cat.service";
@ApiTags("auth")
@Controller("cat")
export class CatController {
  constructor(private catService: CatService) {}

  @ApiOperation({
    summary: "test auth with jwt",
  })
  @ApiOkResponse({ description: "OK" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @UseGuards(JwtAuthGuard)
  @Get()
  testAuthCat(@Req() req) {
    return req.user;
  }
}
