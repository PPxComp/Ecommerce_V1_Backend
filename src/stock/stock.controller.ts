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
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { getAll, stockInfo } from "./stock.dto";
import { StockService } from "./stock.service";

@Controller("stock")
@ApiTags("stock")
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
  @ApiHeader({ name: "Authorization" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteStock(@Param("id") id: string) {
    return this.stockService.deleteStockById(id);
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
  async addStock(@Body() data: stockInfo) {
    return this.stockService.createStock(data);
  }

  @ApiOperation({
    summary: "update stock",
  })
  @ApiOkResponse({ description: "Updated" })
  @ApiBearerAuth()
  @ApiHeader({ name: "Authorization" })
  @ApiUnauthorizedResponse({ description: "invalid bearer jwt" })
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateStock(@Param("id") id: string, @Body() data: stockInfo) {
    return this.stockService.updateStock(data, id);
  }
}
