import { getAll, stockInfo } from "./stock.dto";
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
  getStockById(id: string): Promise<any>;
  deleteStock(id: string): Promise<any>;
  addStock(data: stockInfo): Promise<any>;
  updateStock(id: string, data: stockInfo): Promise<any>;
}
