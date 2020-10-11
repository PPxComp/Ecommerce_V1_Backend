import { getAll } from "./stock.dto";
export declare class StockController {
  getAllStock(data: getAll): Promise<getAll>;
  getStockById(id: string): Promise<string>;
  deleteStock(): Promise<number>;
  addStock(): Promise<number>;
  updateStock(): Promise<number>;
}
