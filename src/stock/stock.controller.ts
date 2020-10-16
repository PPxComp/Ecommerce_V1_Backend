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
import { getAll, getStockDto, stockInfo } from "./stock.dto";

import { StockService } from "./stock.service";

@Controller("stock")
@ApiTags("stock")
@ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
@ApiBadRequestResponse({ description: "User didn't have permission" })
@ApiNotFoundResponse({ description: "Not found this stock" })
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  @ApiOperation({
    summary: "Get all stock",
  })
  @ApiOkResponse({ description: "OK", type: getStockDto })
  async getAllStock(@Query() data: getAll) {
    return this.stockService.getAll(data.catagory, data.start);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get stock by id",
  })
  @ApiOkResponse({ description: "OK", type: stockInfo })
  @UseGuards(IsObjectId)
  async getStockById(@Param("id") id: string): Promise<stockInfo> {
    return this.stockService.getStockById(id);
  }

  ///////////////////////////////////////////////
  ///////     only add min and need jwt   ///////
  ///////////////////////////////////////////////

  @Delete(":id")
  @ApiOperation({
    summary: "delete stock",
  })
  @ApiOkResponse({ description: "Deleted" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdmin)
  @ApiHeader({ name: "Authorization" })
  @UseGuards(IsObjectId)
  async deleteStock(@Param("id") id: string): Promise<stockInfo> {
    return this.stockService.deleteStockById(id);
  }

  @Post()
  @ApiOperation({
    summary: "add stock",
  })
  @ApiOkResponse({ description: "Added" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdmin)
  @ApiHeader({ name: "Authorization" })
  async addStock(@Body() data: stockInfo) {
    return this.stockService.createStock(data);
  }

  @Put(":id")
  @ApiOperation({
    summary: "update stock",
  })
  @ApiOkResponse({ description: "Updated" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdmin)
  @UseGuards(IsObjectId)
  async updateStock(@Param("id") id: string, @Body() data: stockInfo) {
    return this.stockService.updateStock(data, id);
  }
}
