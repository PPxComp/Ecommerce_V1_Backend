import { deleteDto, getAll, stockInfo } from "./stock.dto";
import { StockService } from "./stock.service";
export declare class StockController {
  private stockService;
  constructor(stockService: StockService);
  getAllStock(
    data: getAll
  ): Promise<{
    data: stockInfo[];
    count: number;
  }>;
  getStockById(id: string): Promise<stockInfo>;
  getAdminStock(
    data: getAll
  ): Promise<{
    data: any[];
    count: number;
  }>;
  deleteStock(
    data: deleteDto
  ): Promise<
    {
      ok?: number;
      n?: number;
    } & {
      deletedCount?: number;
    }
  >;
  addStock(data: stockInfo): Promise<any>;
  updateStock(id: string, data: stockInfo): Promise<any>;
}
