import { ObjectId } from "mongodb";
export declare class stockInfo {
  _id: ObjectId;
  id: String;
  name: String;
  price: number;
  count: number;
  description: String;
  catagory?: String[];
}
export declare class getAll {
  catagory: string;
  start: string;
}
export declare class deleteDto {
  data: string[];
}
export declare class getStockDto {
  data: stockInfo[];
  count: number;
}
