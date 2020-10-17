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
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { log } from "console";
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
    const catagory = data.catagory ? data.catagory.split(",") : [];
    const at: number = parseInt(data.start);
    return this.stockService.getAll(catagory, at);
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
  @Get("admin/stock")
  @ApiOperation({
    summary: "Get all  Admin stock",
  })
  @ApiOkResponse({ description: "OK", type: getStockDto })
  @ApiBearerAuth()
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: "Authorization" })
  async getAdminStock(@Query() data: getAll) {
    const catagory = data.catagory ? data.catagory.split(",") : [];
    const at: number = parseInt(data.start);
    return this.stockService.getAdminStockAll(catagory, at);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "delete stock",
  })
  @ApiCreatedResponse({ description: "Deleted" })
  @ApiBearerAuth()
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: "Authorization" })
  @UseGuards(IsObjectId)
  async deleteStock(@Param("id") id: string): Promise<stockInfo> {
    return this.stockService.deleteStockById(id);
  }

  @Post()
  @ApiOperation({
    summary: "add stock",
  })
  @ApiCreatedResponse({ description: "Added" })
  @ApiBearerAuth()
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(IsAdmin)
  @UseGuards(JwtAuthGuard)
  @UseGuards(IsObjectId)
  async updateStock(@Param("id") id: string, @Body() data: stockInfo) {
    return this.stockService.updateStock(data, id);
  }
}
