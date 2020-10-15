import {
  Body,
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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { IsAdmin, IsObjectId } from "src/app.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { getAll, stockInfo } from "./stock.dto";

import { StockService } from "./stock.service";

@Controller("stock")
@ApiTags("stock")
@ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
@ApiBadRequestResponse({ description: "User didn't have permission" })
@ApiNotFoundResponse({ description: "Not found this stock" })
export class StockController {
  constructor(private stockService: StockService) {}
  @ApiOperation({
    summary: "Get all stock",
  })
  @ApiOkResponse({ description: "OK" })
  @Get()
  async getAllStock(@Query() data: getAll) {
    return this.stockService.getAll(data.catagory, data.start);
  }

  @ApiOperation({
    summary: "Get stock by id",
  })
  @ApiOkResponse({ description: "OK" })
  @UseGuards(IsObjectId)
  @Get(":id")
  async getStockById(@Param("id") id: string) {
    return this.stockService.getStockById(id);
  }

  ///////////////////////////////////////////////
  ///////     only add min and need jwt   ///////
  ///////////////////////////////////////////////
  @ApiOperation({
    summary: "delete stock",
  })
  @ApiOkResponse({ description: "Deleted" })
  @ApiBearerAuth()
  @UseGuards(IsAdmin)
  @ApiHeader({ name: "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsObjectId)
  @Delete(":id")
  async deleteStock(@Param("id") id: string) {
    return this.stockService.deleteStockById(id);
  }

  @ApiOperation({
    summary: "add stock",
  })
  @ApiOkResponse({ description: "Added" })
  @ApiBearerAuth()
  @UseGuards(IsAdmin)
  @ApiHeader({ name: "Authorization" })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addStock(@Body() data: stockInfo) {
    return this.stockService.createStock(data);
  }

  @ApiOperation({
    summary: "update stock",
  })
  @ApiOkResponse({ description: "Updated" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsObjectId)
  @Put(":id")
  async updateStock(@Param("id") id: string, @Body() data: stockInfo) {
    return this.stockService.updateStock(data, id);
  }
}
