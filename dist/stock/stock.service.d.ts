import { Model } from "mongoose";
import { stockInfo } from "./stock.dto";
export declare class StockService {
  private stockModel;
  constructor(stockModel: Model<any>);
  getAll(
    catagory: string,
    at: number
  ): Promise<{
    data: stockInfo[];
    count: number;
  }>;
  getStockById(id: string): Promise<any>;
  createStock(data: stockInfo): Promise<any>;
  updateStock(data: stockInfo, id: string): Promise<any>;
  deleteStockById(id: string): Promise<any>;
}
