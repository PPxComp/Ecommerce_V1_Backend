import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { getAll } from "./stock.dto";

@Controller("stock")
@ApiTags("stock")
export class StockController {
  @ApiOperation({
    summary: "Get all stock",
  })
  @ApiOkResponse({ description: "OK" })
  @Get()
  async getAllStock(@Query() data: getAll) {
    return data;
  }

  @ApiOperation({
    summary: "Get stock by id",
  })
  @ApiOkResponse({ description: "OK" })
  @Get(":id")
  async getStockById(@Param("id") id: string) {
    return id;
  }

  ///////////////////////////////////////////////
  ///////     only add min and need jwt   ///////
  ///////////////////////////////////////////////
  @ApiOperation({
    summary: "delete stock",
  })
  @ApiOkResponse({ description: "Deleted" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteStock() {
    return 1;
  }

  @ApiOperation({
    summary: "add stock",
  })
  @ApiOkResponse({ description: "Added" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addStock() {
    return 1;
  }

  @ApiOperation({
    summary: "update stock",
  })
  @ApiOkResponse({ description: "Updated" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateStock() {
    return 1;
  }
}
